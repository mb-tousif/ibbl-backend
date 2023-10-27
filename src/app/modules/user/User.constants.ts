 
 export enum ENUM_USER_STATUS {
    PENDING = "Pending",
    ACTIVE = "Active",
    INACTIVE = "Inactive",
    BLOCKED = "Blocked",
}

export  const userSearchableFields = [ "NID", "accountNo", "email", "contactNo", "role", "status" ];

export const userFilterableFields = [
  "search",
  "role",
  "status",
  "accountType",
  "accountNo",
  "NID",
  "contactNo",
];