import { ISaving } from "./Saving_AC.interfaces";
import { SavingAC } from "./Saving_AC.schema";


const createSavingAC = async (payload: ISaving) => {
  const isExits = await SavingAC.findOne({ userId: payload.userId });
  if (isExits) {
    const savingAC = await SavingAC.updateOne(
      { userId: payload.userId },
      {
        $push: { depositAmount: payload.depositAmount },
        $inc: { totalBalance: payload.totalBalance },
      }
    ).populate("userId");
    return savingAC;
  }

  return (await SavingAC.create(payload)).populate("userId");
};

export const SavingACService = {
  createSavingAC,
};
