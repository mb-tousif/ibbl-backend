 
 export enum ENUM_USER_STATUS {
    PENDING = "Pending",
    ACTIVE = "Active",
    INACTIVE = "Inactive",
    BLOCKED = "Blocked",
}

export  const userSearchableFields = [ "NID", "accountNo", "email" ];

export const userFilterableFields = [
  "search",
  "role",
  "email",
  "status",
  "accountNo",
  "NID",
  "contactNo",
];