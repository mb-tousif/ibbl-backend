import { User } from "../app/modules/user/User.schema";

const getLastUserAccount = async () => {
  const lastAccountNo = await User.findOne(
    {
      role: "account_holder",
    },
    { id: 1, _id: 0 }
  )
    .sort({ createdAt: -1 })
    .lean();
  return lastAccountNo?.accountNo
    ? lastAccountNo?.accountNo.substring(3)
    : null;
};

const generateUserAccount = async (payload:string) => {
  const lastUserAccount: string =
    (await getLastUserAccount()) || (0).toString().padStart(5, "0");
  const userId = `${payload} + (parseInt(${lastUserAccount}) + 1).toString().padStart(5, "0")`;
  return userId;
};

export default generateUserAccount;
