type User = {
  username: string;
  pwdHash: string;
  email: string;
  userType: "USER" | "ADMIN";
  accountType: "BASIC" | "PREMIUM";
  firstName?: string;
  lastName?: string;
};
