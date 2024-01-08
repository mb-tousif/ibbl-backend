# This project is for <em>Investment Bank of Bangladesh Ltd ( IBBL )</em>

## Description
<p>A bank website provides online banking services, account management, fund transfers, bill payments, and account information. It typically features security measures, customer support, loan and investment information, branch locators, and resources for financial education and services.</p>

<!-- ### This project [Live Site](https://painting-service-roan.vercel.app/) -->

### Key Features

- [x] Developed multi user Role Based Access Control ( RBAC) system.
- [x] Implemented CRUD operations like update user, change password by
getting email confirmation, create A/C, do several transaction like deposit,
withdraw, investment and get investment return after maturity of
completion.
- [x] Maintained role based Authentication and Authorization with OTP.
- [x] Integrated mongoose session and aggregation for processing for mongodb
data manipulation

### Technologies Used

- [x] Express.js
- [x] Typescript
- [x] MongoDB
- [x] Mongoose
- [x] Zod
- [x] JWT
- [x] Bcrypt

<!-- ### Entity Relationship Diagram -->

<!-- <p>
<img src="./ERD.svg" align="center" width="100%" height="100%" style="border-radius: 30px;">
</p> -->

### Database Schema

#### User

- id
- name
- email
- password
- DOB
- img
- NID
- accountNo
- contactNo
- gender
- OTP
- confirmedAccount
- role
- failedLoginAttempts
- changePassword
- status
- address
- createdAt
- updatedAt

#### Bank Summary

- id
- totalUser
- totalAccountHolder
- totalInvestment
- totalCredit
- totalLiability
- totalCapital
- totalProfit
- totalExpense

#### Bank Account
##### Savings Account (SVG)

- id
- userId
- accountType
- accountNo
- interestRate
- totalBalance
- interest
- depositAmount
- withdrawAmount
- maturityDate
- status
- createdAt
- updatedAt

##### Staff Account (STF)

- id
- userId
- accountType
- accountNo
- interestRate
- totalBalance
- interest
- depositAmount
- withdrawAmount
- company
- duration
- maturityDate
- transactionRef
- status
- createdAt
- updatedAt

##### Loan Account (LON)

- id
- userId
- accountType
- accountNo
- interestRate
- totalLoan
- interest
- depositAmount
- withdrawAmount
- duration
- maturityDate
- transactionRef
- status
- createdAt
- updatedAt

#### Current Account (CRT)

- id
- userId
- accountType
- accountNo
- interestRate
- totalBalance
- interest
- depositAmount
- withdrawAmount
- company
- transactionRef
- status
- createdAt
- updatedAt

#### Transaction

- id
- userId
- receiverId
- amount
- description
- createdAt
- updatedAt

#### API Endpoints

#### Bank Summary

- [x] Get Bank Summary `GET /api/v1/bank-main/current-summary` [ Only Admin, Manager and CEO ]
- [x] Post Bank Capital Transaction `POST /api/v1/bank-main/capital-transactions` [ Only CEO ]
- [x] Update Bank Statement `PATCH /api/v1/bank-main/update-statement` [ Only CEO ]

#### User

- [x] Get All Users `GET /api/v1/users/all-users` [ Only Admin, Manager and CEO ]
- [x] Get User By Id `GET /api/v1/users/user/:id` [ Only Admin, Manager and CEO ]
- [x] Post create User `POST /api/v1/users/create-user` [ All User ]
- [x] Post create Management `POST /api/v1/users/create-mgt` [ Only Admin, Manager and CEO ]
- [x] Update User By Id `PATCH /api/v1/users/update-user/:id` [ Only User]
- [x] Delete User By Id `DELETE /api/v1/users/delete-profile/:id` [ Only Admin and Super Admin ]

#### Auth

- [x] Login `POST /api/v1/auth/login` [ All User ]
- [x] Verify OTP `POST /api/v1/auth/verify-otp` [ All User ]
- [x] Forgot Password `POST /api/v1/auth/forgot-password` [ All User ]
- [x] Reset Password `POST /api/v1/auth/reset-password` [ All User ]

#### Bank Account
##### Savings Account (SVG)

- [x] Get All Savings Account `GET /api/v1/saving-ac/get-all-savings-ac` [ Only Admin, Manager and CEO ]
- [x] Get Savings Account By Id `GET /api/v1/saving-ac/get-saving-ac/:id` [ Only Admin, Cashier, Manager and CEO ]
- [x] Get My Account By Id `GET /api/v1/saving-ac/my-account` [ Account Holder, Manager, Cashier, Admin and CEO]
- [x] Post create Savings Account `POST /api/v1/saving-ac/create-saving-ac` [ Only Manager, Admin, Cashier and CEO ]
- [x] Update Savings Account By Id `PATCH /api/v1/saving-ac/update-saving-ac/:id` [ Only Manager, Admin, Cashier and CEO ]

##### Staff Account (STF)

- [x] Get All Staff Account `GET /api/v1/staff-ac/get-all-staffs-ac` [ Only Admin, Manager and CEO ]
- [x] Get Staff Account By Id `GET /api/v1/staff-ac/get-staff-ac/:id` [ Only Admin, Manager and CEO ]
- [x] Get My Account By Id `GET /api/v1/staff-ac/my-account` [ Account Holder, Manager, Admin, Cashier and CEO]
- [x] Post create Staff Account `POST /api/v1/staff-ac/create-staff-ac` [ Only Manager, Admin, Cashier and CEO ]
- [x] Update Staff Account By Id `PATCH /api/v1/staff-ac/update-staff-ac/:id` [ Only Manager, Admin, Cashier and CEO ]

##### Loan Account (LON)

- [x] Get All Loan Account `GET /api/v1/loan-ac/get-all-loans-ac` [ Only Admin, Manager, Cashier and CEO ]
- [x] Get Loan Account By Id `GET /api/v1/loan-ac/get-loan-ac/:id` [ Only Admin, Manager, Cashier and CEO ]
- [x] Get My Account By Id `GET /api/v1/loan-ac/my-account` [ Account Holder, Manager, Admin, Cashier and CEO]
- [x] Post create Loan Account `POST /api/v1/loan-ac/create-loan-ac` [ Only Manager, Admin, Cashier and CEO ]
- [x] Update Loan Account By Id `PATCH /api/v1/loan-ac/update-loan-ac/:id` [ Only Manager, Admin, Cashier and CEO ]

##### Current Account (CRT)

- [x] Get All Current Account `GET /api/v1/current-ac/get-all-currents-ac` [ Only Admin, Manager, Cashier and CEO ]
- [x] Get Current Account By Id `GET /api/v1/current-ac/get-current-ac/:id` [ Only Admin, Manager, Cashier and CEO ]
- [x] Get My Account By Id `GET /api/v1/current-ac/my-account` [ Account Holder, Manager, Admin, Cashier and CEO]
- [x] Post create Current Account `POST /api/v1/current-ac/create-current-ac` [ Only Manager, Admin, Cashier and CEO ]
- [x] Update Current Account By Id `PATCH /api/v1/current-ac/update-current-ac/:id` [ Only Manager, Admin, Cashier and CEO ]

#### Transaction

- [x] Get All Transactions `GET /api/v1/transactions/all-transactions` [ Only Admin, Manager, Cashier and CEO ]
- [x] Get Transaction By Id `GET /api/v1/transactions/transaction/:id` [ Only Admin, Manager, Cashier and CEO ]
- [x] Get My Transactions `GET /api/v1/transactions/my-transactions` [ Account Holder, Manager, Admin, Cashier and CEO]
- [x] Post create Transaction `POST /api/v1/transactions/save-transaction` [All User]
- [x] Update Transaction By Id `PATCH /api/v1/transactions/update-transaction/:id` [ Only Admin, Manager, Cashier and CEO ]
- [x] Delete Transaction By Id `DELETE /api/v1/transactions/delete-transaction/:id` [ Only Admin, Manager, Cashier and CEO ]