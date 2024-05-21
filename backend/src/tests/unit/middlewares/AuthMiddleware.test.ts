import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { authMiddleware } from '../../../main/middlewares/AuthMiddleware';

const JWT_SECRET = "secret";

const mockAuthMiddleware = (req: Request, res: Response, next: NextFunction) => {
    jest.spyOn(jwt, 'verify').mockImplementation((token: string) => {
        if (token === 'validToken') {
            return { userId: 123 };
        } else {
            throw new Error('Invalid token');
        }
    });

    authMiddleware(req, res, next);
};

describe('Auth Middleware', () => {
    let req: Partial<Request>;
    let res: Partial<Response>;
    let next: jest.Mock;

    beforeEach(() => {
        req = { header: jest.fn(), userId: undefined };
        res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
        next = jest.fn();
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should call next() if valid token is provided', () => {
        req.header = jest.fn().mockReturnValue('Bearer validToken');

        mockAuthMiddleware(req as Request, res as Response, next);

        expect(next).toHaveBeenCalled();
        expect(req.userId).toEqual(123);
    });

    it('should return 401 if no token is provided', () => {
        req.header = jest.fn().mockReturnValue(undefined);

        mockAuthMiddleware(req as Request, res as Response, next);

        expect(res.status).toHaveBeenCalledWith(401);
        expect(res.json).toHaveBeenCalledWith({ error: 'Token de autenticação ausente' });
        expect(next).not.toHaveBeenCalled();
    });

    it('should return 401 if token is invalid', () => {
        req.header = jest.fn().mockReturnValue('Bearer invalidToken');

        mockAuthMiddleware(req as Request, res as Response, next);

        expect(res.status).toHaveBeenCalledWith(401);
        expect(res.json).toHaveBeenCalledWith({ error: 'Token de autenticação inválido' });
        expect(next).not.toHaveBeenCalled();
    });
});
