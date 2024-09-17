export interface User {
  id?: string;
  name: string;
  email: string;
}

export type UserUpdateInfo = Pick<User, "name" | "email">;
