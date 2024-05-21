import request from 'supertest';
import express, { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { authMiddleware } from '../../main/middlewares/AuthMiddleware';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Endpoint de teste para usar o middleware
app.get('/test', authMiddleware, (req: Request, res: Response) => {
    res.sendStatus(200);
});

describe('AuthMiddleware', () => {
    it('should pass through with valid token', async () => {
        const token = jwt.sign({ userId: 1 }, 'secret');
        const response = await request(app)
            .get('/test')
            .set('Authorization', `Bearer ${token}`);
        
        expect(response.status).toBe(200);
    });

    it('should return 401 with missing token', async () => {
        const response = await request(app).get('/test');
        expect(response.status).toBe(401);
    });

    it('should return 401 with invalid token', async () => {
        const token = 'invalid_token';
        const response = await request(app)
            .get('/test')
            .set('Authorization', `Bearer ${token}`);
        
        expect(response.status).toBe(401);
    });
});
