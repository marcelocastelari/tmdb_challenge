import { IAuth } from "../interfaces/AuthInterface";
import { UserRepository } from "../repositories/UserRepository";
import bcrypt from "bcrypt";

export class AuthService implements IAuth {
    async register(username: string, password: string): Promise<string> {
        console.log(username);
        const existingUser = await UserRepository.findByUsername(username);
        if(existingUser) {
            throw new Error("User already exists");
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        await UserRepository.createUser({ username, password: hashedPassword });
        return "User registered successfully";
    }

    async login(username: string, password: string): Promise<string> {
        const user = await UserRepository.findByUsername(username);
        if (!user) {
            throw new Error("User not found");
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if(!isPasswordValid) {
            throw new Error("Invalid credentials"); 
        }
        return "Login successful";
    }
}