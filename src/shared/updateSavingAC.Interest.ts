import { SavingAC } from "../app/modules/Saving_AC/Saving_AC.schema";

export const updateSavingInterest = async () => {
try {
    // Fetch all savings accounts from the database
    const savingsAccounts = await SavingAC.find({});
    savingsAccounts.forEach(async (account) => {
        // Calculate interest for each account
        const savingInterest = Math.ceil(
          ((account?.depositAmount * (account?.interestRate ?? 0)) / 100) * 365
        );
        // Update the interest in the database
        await SavingAC.findByIdAndUpdate(account._id, { $inc: { totalBalance: savingInterest, interest: savingInterest } });
        console.log('Interest updated successfully!');
    });

} catch (error) {
    console.error('Error updating interest:', error);
}
};

