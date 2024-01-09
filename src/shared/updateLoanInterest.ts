import { LoanAC } from "../app/modules/LoanAC/LoanAC.schema";

export const updateLoanInterest = async () => {
  try {
    // Fetch all savings accounts from the database
    const loanAccounts = await LoanAC.find({});
    loanAccounts.forEach(async (account) => {
      // Calculate interest for each account
      const loanInterest = Math.ceil(
        ((account?.loanAmount * (account?.interestRate ?? 0)) / 100) * 12
      );
      // Update the interest in the database
      await LoanAC.findByIdAndUpdate(account._id, {
        $inc: { totalLoan: loanInterest, interest: loanInterest },
      });
      console.log("Interest updated successfully!");
    });
  } catch (error) {
    console.error("Error updating interest:", error);
  }
};