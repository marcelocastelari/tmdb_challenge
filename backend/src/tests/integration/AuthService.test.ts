import request from 'supertest';
import app from '../../App';
import { sequelize } from '../../../config/database';
import { UserModel } from '../../../src/main/models/UserModel';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

describe('AuthService Integration Tests', () => {

    beforeAll(async () => {
        await sequelize.sync({ force: true });
    });

    beforeEach(async () => {
        await UserModel.destroy({ where: {} });
    });

    afterAll(async () => {
        await sequelize.close();
    });

    describe('POST /auth/register', () => {
        it('should register a new user', async () => {
            const res = await request(app)
                .post('/auth/register')
                .send({ email: 'test@example.com', password: 'password123' });

            expect(res.status).toBe(201);
            expect(res.body).toHaveProperty('message', 'User registered successfully');
        });

        it('should not register an existing user', async () => {
            await UserModel.create({ email: 'test@example.com', password: 'password123' });

            const res = await request(app)
                .post('/auth/register')
                .send({ email: 'test@example.com', password: 'password123' });

            expect(res.status).toBe(400);
            expect(res.body).toEqual({ error: {} });
        });
    });

    describe('POST /auth/login', () => {
        beforeEach(async () => {
            const hashedPassword = await bcrypt.hash('password123', 10);
            await UserModel.create({ email: 'test@example.com', password: hashedPassword });
        });

        it('should login a user with valid credentials', async () => {
            const res = await request(app)
                .post('/auth/login')
                .send({ email: 'test@example.com', password: 'password123' });

            expect(res.status).toBe(200);
            expect(res.body).toHaveProperty('token');
        });

        it('should not login a user with invalid credentials', async () => {
            const res = await request(app)
                .post('/auth/login')
                .send({ email: 'test@example.com', password: 'wrongpassword' });

            expect(res.status).toBe(401);
            expect(res.body).toEqual({ error: {} });
        });

        it('should not login a non-existent user', async () => {
            const res = await request(app)
                .post('/auth/login')
                .send({ email: 'nonexistent@example.com', password: 'password123' });

            expect(res.status).toBe(401);
            expect(res.body).toEqual({ error: {} });
        });
    });
});
