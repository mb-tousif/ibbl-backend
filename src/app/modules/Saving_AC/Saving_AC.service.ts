import { IDeposits } from "./Saving_AC.interfaces";
import { Deposits } from "./Saving_AC.schema";

const createDeposit =  async ( payload: IDeposits ) => {
    const isExits = await Deposits.findOne({ userId: payload.userId });
    if ( isExits){
        const deposit = await Deposits.updateOne({ userId: payload.userId }, { $push: { amount: payload.amount }, 
        $inc: { totalDeposit: payload.amount } }).populate("userId");
        return deposit;
    }

    return (await Deposits.create(payload)).populate("userId");
}

export const DepositsService = {
    createDeposit
};
