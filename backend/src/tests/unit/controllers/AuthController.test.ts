import { Request, Response } from "express";
import { AuthController } from "../../../main/controllers/AuthController";
import { AuthService } from "../../../main/services/AuthService";

jest.mock('../../../main/services/AuthService');

describe('AuthController', () => {
    let req: Partial<Request>;
    let res: Partial<Response>;

    beforeEach(() => {
        req = { body: {} };
        res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('register', () => {
        it('should call AuthService.register and return 201 if registration is successful', async () => {
            req.body.email = 'test@example.com';
            req.body.password = 'password123';

            (AuthService.register as jest.Mock).mockResolvedValueOnce('User registered successfully');

            await AuthController.register(req as Request, res as Response);

            expect(AuthService.register).toHaveBeenCalledWith('test@example.com', 'password123');
            expect(res.status).toHaveBeenCalledWith(201);
            expect(res.json).toHaveBeenCalledWith({ message: 'User registered successfully' });
        });

        it('should return 400 if registration fails', async () => {
            req.body.email = 'test@example.com';
            req.body.password = 'password123';

            (AuthService.register as jest.Mock).mockRejectedValueOnce('Error registering user');

            await AuthController.register(req as Request, res as Response);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({ error: 'Error registering user' });
        });
    });

    describe('login', () => {
        it('should call AuthService.login and return 200 with token if login is successful', async () => {
            req.body.email = 'test@example.com';
            req.body.password = 'password123';

            (AuthService.login as jest.Mock).mockResolvedValueOnce('token123');

            await AuthController.login(req as Request, res as Response);

            expect(AuthService.login).toHaveBeenCalledWith('test@example.com', 'password123');
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({ token: 'token123' });
        });

        it('should return 401 if login fails', async () => {
            req.body.email = 'test@example.com';
            req.body.password = 'password123';

            (AuthService.login as jest.Mock).mockRejectedValueOnce('Invalid credentials');

            await AuthController.login(req as Request, res as Response);

            expect(res.status).toHaveBeenCalledWith(401);
            expect(res.json).toHaveBeenCalledWith({ error: 'Invalid credentials' });
        });
    });
});
