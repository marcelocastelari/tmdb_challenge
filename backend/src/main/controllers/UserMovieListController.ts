import { Request, Response } from "express";
import { UserMovieListService } from "../services/UserMovieListService";

export class UserMovieListController {
    static async addMovieToList(req: Request, res: Response): Promise<void> {       
        const userId = req.userId;
        if (userId == null) {
            res.status(401).json({ error: 'Token de autenticação inválido' });
            return;
        }

        const { movie, listType } = req.body;

        try {
            const message = await UserMovieListService.addMovieToList(userId, movie, listType);
            res.status(200).json({ message });
        } catch (error) {
            res.status(500).json({ error: error });
        }
    }

    static async removeMovieFromList(req: Request, res: Response): Promise<void> {
        const userId = req.userId;
        if (userId == null) {
            res.status(401).json({ error: 'Token de autenticação inválido' });
            return;
        }

        const { movie, listType } = req.body;

        try {
            const message = await UserMovieListService.removeMovieFromList(userId, movie, listType);
            res.status(200).json({ message });
        } catch (error) {
            res.status(500).json({ error: error });
        }
    }

    static async getMoviesByList(req: Request, res: Response): Promise<void> {
        const userId = req.userId;
        if (userId == null) {
            res.status(401).json({ error: 'Token de autenticação inválido' });
            return;
        }

        const { listType } = req.params;

        try {
            const movieId = await UserMovieListService.getMoviesByList(userId, listType);
            res.status(200).json(movieId);
        } catch (error) {
            res.status(500).json({ error: error });
        }
    }
}
