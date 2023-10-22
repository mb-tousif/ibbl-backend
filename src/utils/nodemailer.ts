/* eslint-disable @typescript-eslint/no-explicit-any */
import nodemailer from "nodemailer";
import config from "../config";

const sendResetPasswordEmail = (
  name: string,
  email: string,
  token: string
) => {
  const transporter = nodemailer.createTransport({
    host: config.emailHost,
    port: 25,
    secure: false,
    requireTLS: true,
    auth: {
      user: config.emailUser,
      pass: config.emailPassword,
    },
  });

  const mailOptions = {
    from: config.emailUser,
    to: email,
    subject:
      "Investment Bank Bangladesh Ltd (IBBL) Password Reset Confirmation",
    html: `
        <div><h4>Dear ${name},</h4>
        <p>We hope this message finds you well. In an effort to enhance your online security, Investment Bank Bangladesh Ltd (IBBL) has received a request to reset the password for your account.</p>

        <p>Do you want to change your password? Please click on the following link to <a style="color: blue, font-weight: bold" href = "http://localhost:3000/auth/reset-password/?token=${token}"> Reset your password </a> on IBBL.</p></div>

        <p>If you did not request this password reset, please contact us immediately at support@ibbl.com or 1234.</p>

        <p>Thank you for choosing IBBL. We're committed to your secure banking.</p>

        <p>Regards,</p>
        <p>IBBL Team</p>
        <p>1205, Dhaka, Bangladesh</p>
    `,
  };

  transporter.sendMail(
    mailOptions,
    function (error: any, info: { response: any }) {
      if (error) {
        console.error("Error sending email:", error);
      } else {
        console.info("Email sent:", info.response);
      }
    }
  );
};

const sendOTPCode = (name: string, email: string, code: number | null) => {
  const transporter = nodemailer.createTransport({
    host: config.emailHost,
    port: 25,
    secure: false,
    requireTLS: true,
    auth: {
      user: config.emailUser,
      pass: config.emailPassword,
    },
  });

  const mailOptions = {
    from: config.emailUser,
    to: email,
    subject: "Investment Bank Bangladesh Ltd (IBBL) OTP Code Confirmation",
    html: `
        <div style="width: 50%; margin: 0 auto; text-align: center;">
            <h2>Dear ${name},</h2>
            <p>We prioritize your security at Investment Bank Bangladesh Ltd (IBBL). We've generated a one-time password (OTP) for your account. Your OTP code is: <h1 style="font-size: 2rem; background-color: #007bff; color: #fff; padding: 10px; border-radius: 5px;">${code}</h1>. This code enhances transaction security.</p>
            
            <p>Never share this OTP; it's for your protection. If you didn't request it, contact Customer Support at support@ibbl.com or 1234. IBBL won't ask for your OTP via email or phone.</p>

            <p>Thank you for choosing IBBL. We're committed to your secure banking.</p>

            <p>Regards,</p>
            <p>IBBL Team</p>
            <p>1205, Dhaka, Bangladesh</p>
        </div>
        `,
  };

  transporter.sendMail(
    mailOptions,
    function (error: any, info: { response: any }) {
      if (error) {
        console.error("Error sending email:", error);
      } else {
        console.info("Email sent:", info.response);
      }
    }
  );
};

const sendAccountNumber = (name: string, email: string, accountNo: string | null) => {
  const transporter = nodemailer.createTransport({
    host: config.emailHost,
    port: 25,
    secure: false,
    requireTLS: true,
    auth: {
      user: config.emailUser,
      pass: config.emailPassword,
    },
  });

  const mailOptions = {
    from: config.emailUser,
    to: email,
    subject: "Regarding your account number.",
    html: `
        <div style="width: 50%; margin: 0 auto; text-align: center;">
            <h2>Dear ${name},</h2>
            <p>We hope this message finds you in good health. We are writing to provide you with the account number associated with your Investment Bank Bangladesh Ltd (IBBL) account:

            <h1 style="font-size: 2rem; background-color: #007bff; color: #fff; padding: 10px; border-radius: 5px;">Account Number: ${accountNo}</h1>. This code enhances transaction security.</p>
            
            <p>Your account number is a crucial piece of information for conducting various financial transactions and operations related to your account. Please safeguard this information carefully and refrain from sharing it with anyone. It is essential for maintaining the security and privacy of your account.</p>

            <p>Thank you for choosing IBBL. We're committed to your secure banking.</p>

            <p>Regards,</p>
            <p>IBBL Team</p>
            <p>1205, Dhaka, Bangladesh</p>
        </div>
        `,
  };

  transporter.sendMail(
    mailOptions,
    function (error: any, info: { response: any }) {
      if (error) {
        console.error("Error sending email:", error);
      } else {
        console.info("Email sent:", info.response);
      }
    }
  );
};

export const EmailService = {
    sendResetPasswordEmail,
    sendOTPCode,
    sendAccountNumber,
};
