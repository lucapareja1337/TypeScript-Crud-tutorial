export interface User{
    id?: number;
    email: string;
    password: string;
    name : string;
    profilePhoto?: string;
    isAdmin: boolean;
}