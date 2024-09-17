export interface User{
    id?:number;
    name: string;
    email:string;
    profile: UserProfile
}

export interface UserProfile{
    id?: number;
    gender:string;
    bio: string
}

export type UserUpdateInfo = Pick<User, "name" | "email">;
