import { Request, Response } from "express";
import { AuthService } from "../services/AuthService";

export class AuthController {
 
    static async register(req: Request, res: Response): Promise<void> {
        const { email, password } = req.body;
        try {
            const message = await AuthService.register(email, password);
            res.status(201).json({ message });
        } catch (error) {
            res.status(400).json({ error });
        }
    }

    static async login(req: Request, res: Response): Promise<void> {
        const { email, password } = req.body;
        try {
            const result = await AuthService.login(email, password);
            res.status(200).json({ token: result });
        } catch (error) {
            res.status(401).json({ error });
        }
    }
}