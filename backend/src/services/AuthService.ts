import { IAuth } from "../interfaces/AuthInterface";
import { UserRepository } from "../repositories/UserRepository";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';

export class AuthService  {
    static async register(email: string, password: string): Promise<string> {
        const existingUser = await UserRepository.findByEmail(email);
        if(existingUser) {
            throw new Error("User already exists");
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        await UserRepository.createUser({ email, password: hashedPassword });
        return "User registered successfully";
    }

    static async login(email: string, password: string): Promise<string> {
        const user = await UserRepository.findByEmail(email);
        if (!user) {
            throw new Error("User not found");
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if(!isPasswordValid) {
            console.log('caiu aqui');
            throw new Error("Invalid credentials"); 
        }
        const token = jwt.sign({ userId: user.id }, "secret", { expiresIn: "1h" });
        return token;
    }
}