export interface User {
  _id: string;
  username: string;
  name: string;
  lastName: string;
  email: string;
  role: "user" | "moderator" | "admin";
  image?: string;
  phone?: string;
  address?: string;
}