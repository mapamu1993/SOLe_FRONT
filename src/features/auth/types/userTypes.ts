export interface User {
  _id: string;
  username: string;
  name: string;
  lastName: string;
  email: string;
  role: "user" | "moderator" | "admin";
  profilePicture?: string;
  phone?: string;
  address?: string;
}