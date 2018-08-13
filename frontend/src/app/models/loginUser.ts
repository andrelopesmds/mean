import { User } from "./user";

export class LoginUser {
    auth: boolean;
    token: string;
    message: string;
    data: User;
}