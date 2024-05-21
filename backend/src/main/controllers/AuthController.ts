import { Request, Response } from "express";
import { AuthService } from "../services/AuthService";
import { UserAlreadyExistsError } from "../utils/UserAlreadyExistsError";

export class AuthController {

    static async register(req: Request, res: Response): Promise<void> {
        const { email, password } = req.body;
        try {
            const message = await AuthService.register(email, password);
            res.status(201).json({ message });
        } catch (error) {
            if (error instanceof UserAlreadyExistsError) {
                res.status(409).json({ error: (error as Error).message });
            } else if (error instanceof Error) {
                res.status(400).json({ error: error.message });
            } else {
                res.status(400).json({ error: "An unknown error occurred" });
            }
        }
    }

    static async login(req: Request, res: Response): Promise<void> {
        const { email, password } = req.body;
        try {
            const result = await AuthService.login(email, password);
            res.status(200).json({ token: result });
        } catch (error) {
            if (error instanceof Error) {
                res.status(401).json({ error: error.message });
            } else {
                res.status(401).json({ error: "An unknown error occurred" });
            }
        }
    }
}
