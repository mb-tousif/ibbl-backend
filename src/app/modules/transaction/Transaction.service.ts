import { User } from "../user/User.schema";
import { ITransaction } from "./Transaction.interfaces";
import { Transaction } from "./Transaction.schema";

const saveTransaction = async (transaction: ITransaction) => {
    // 4. Create a document using the Model's create method.
    const user = await User.findById(transaction.userId);
    if (!user) throw new Error('User not found');
    console.log(user);
    return transaction;
    
    // const data = (await Transaction.create(transaction)).populated('userId');
    // return data;
}

export const TransactionService = {
    saveTransaction
};
