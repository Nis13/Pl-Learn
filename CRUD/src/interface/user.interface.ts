export interface User {
  id?: string;
  name: string;
  email: string;
  profile: UserProfile;
}

export interface UserProfile {
  id?: string;
  gender: string;
  bio: string;
}

export type UserUpdateInfo = Pick<User, "name" | "email">;
