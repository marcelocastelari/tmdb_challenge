import { IUser } from "./UserInterface";

export interface IAuth {
    register(email: string, password: string): Promise<string>;
    login(email: string, password: string): Promise<string>;
}