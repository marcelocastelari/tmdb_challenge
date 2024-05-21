import { Request, Response } from "express";
import { UserMovieListController } from "../../../main/controllers/UserMovieListController";
import { UserMovieListService } from "../../../main/services/UserMovieListService";

jest.mock('../../../main/services/UserMovieListService');

describe('UserMovieListController', () => {
    let req: Partial<Request>;
    let res: Partial<Response>;

    beforeEach(() => {
        req = { userId: 123, body: {}, params: {} };
        res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('addMovieToList', () => {
        it('should add a movie to the user list', async () => {
            (UserMovieListService.addMovieToList as jest.Mock).mockResolvedValueOnce('Movie added to list');
            req.body = { movie: { title: 'Inception' }, listType: 'watchlist' };

            await UserMovieListController.addMovieToList(req as Request, res as Response);

            expect(UserMovieListService.addMovieToList).toHaveBeenCalledWith(123, { title: 'Inception' }, 'watchlist');
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({ message: 'Movie added to list' });
        });

        it('should handle errors', async () => {
            (UserMovieListService.addMovieToList as jest.Mock).mockRejectedValueOnce('Internal Server Error');
            req.body = { movie: { title: 'Inception' }, listType: 'watchlist' };

            await UserMovieListController.addMovieToList(req as Request, res as Response);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ error: 'Internal Server Error' });
        });

        it('should return 401 if userId is null', async () => {
            req.userId = undefined;
            await UserMovieListController.addMovieToList(req as Request, res as Response);

            expect(res.status).toHaveBeenCalledWith(401);
            expect(res.json).toHaveBeenCalledWith({ error: 'Token de autenticação inválido' });
            expect(UserMovieListService.addMovieToList).not.toHaveBeenCalled();
        });
    });

    describe('removeMovieFromList', () => {
        it('should remove a movie from the user list', async () => {
            (UserMovieListService.removeMovieFromList as jest.Mock).mockResolvedValueOnce('Movie removed from list');
            req.body = { movie: { id: 123 }, listType: 'watchlist' };

            await UserMovieListController.removeMovieFromList(req as Request, res as Response);

            expect(res.status).toHaveBeenCalledWith(200);
        });

        it('should handle errors', async () => {
            (UserMovieListService.removeMovieFromList as jest.Mock).mockRejectedValueOnce('Internal Server Error');
            req.params = { listType: 'watchlist' };

            await UserMovieListController.removeMovieFromList(req as Request, res as Response);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ error: 'Internal Server Error' });
        });

        it('should return 401 if userId is null', async () => {
            req.userId = undefined;
            await UserMovieListController.removeMovieFromList(req as Request, res as Response);

            expect(res.status).toHaveBeenCalledWith(401);
            expect(res.json).toHaveBeenCalledWith({ error: 'Token de autenticação inválido' });
            expect(UserMovieListService.removeMovieFromList).not.toHaveBeenCalled();
        });
    });

    describe('getMoviesByList', () => {
        it('should get movies by list type', async () => {
            (UserMovieListService.getMoviesByList as jest.Mock).mockResolvedValueOnce([1, 2, 3]);
            req.params = { listType: 'watchlist' };

            await UserMovieListController.getMoviesByList(req as Request, res as Response);

            expect(UserMovieListService.getMoviesByList).toHaveBeenCalledWith(123, 'watchlist');
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith([1, 2, 3]);
        });

        it('should handle errors', async () => {
            (UserMovieListService.getMoviesByList as jest.Mock).mockRejectedValueOnce('Internal Server Error');
            req.params = { listType: 'watchlist' };

            await UserMovieListController.getMoviesByList(req as Request, res as Response);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ error: 'Internal Server Error' });
        });

        it('should return 401 if userId is null', async () => {
            req.userId = undefined;
            await UserMovieListController.getMoviesByList(req as Request, res as Response);

            expect(res.status).toHaveBeenCalledWith(401);
            expect(res.json).toHaveBeenCalledWith({ error: 'Token de autenticação inválido' });
            expect(UserMovieListService.getMoviesByList).not.toHaveBeenCalled();
        });
    });
});
