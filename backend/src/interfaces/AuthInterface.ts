import { IUser } from "./UserInterface";

export interface IAuth {
    register(username: string, password: string): Promise<string>;
    login(username: string, password: string): Promise<string>;
}