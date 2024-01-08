import { SavingAC } from "../app/modules/Saving_AC/Saving_AC.schema";

export const updateInterest = async () => {
try {
    // Fetch all savings accounts from the database
    const savingsAccounts = await SavingAC.find({});
    savingsAccounts.forEach(async (account) => {
        // Calculate interest for each account
        const interest = (account?.totalBalance * (account?.interestRate ?? 0)) / 100;
        // Update the interest in the database
        await SavingAC.findByIdAndUpdate(account._id, { interest, $inc: { totalBalance: interest } });
        console.log('Interest updated successfully!');
    });

} catch (error) {
    console.error('Error updating interest:', error);
}
};

