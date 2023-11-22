import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import ServerAPIError from "../../errorHandling/serverApiError";
import config from "../../config";
import { JwtPayload, Secret } from "jsonwebtoken";
import { jwtHelpers } from "../../shared/jwtHelper";

declare global {
  namespace Express {
    interface Request {
      user: JwtPayload | null;
    }
  }
}

const Authenticate =
  (...requiredRoles: string[]) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      //get authorization token
      const token = req.headers.authorization;
      if (!token) {
        throw new ServerAPIError(
          httpStatus.UNAUTHORIZED,
          "You are not authorized"
        );
      }
      // verify token
      let verifiedUser = null;
      verifiedUser = jwtHelpers.verifyToken(token, config.jwt.secret as Secret);
      // set user to req.user
      req.user = verifiedUser;

      if (requiredRoles.length && !requiredRoles.includes(verifiedUser.role)) {
        throw new ServerAPIError(httpStatus.FORBIDDEN, "Forbidden");
      }
      next();
    } catch (error) {
      next(error);
    }
  };

export default Authenticate
