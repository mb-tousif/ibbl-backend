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


#### API Endpoints

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
