import request from 'supertest';
import app from '../../App';
import { sequelize } from '../../../config/database';
import { UserModel } from '../../../src/main/models/UserModel';
import { UserRepository } from '../../../src/main/repositories/UserRepository';
import { IUser } from '../../../src/main/interfaces/UserInterface';
import { UserMovieListModel } from '../../main/models/UserMovieListModel';
import { MovieModel } from '../../main/models/MovieModel';

describe('UserRepository Integration Tests', () => {
    let server: any;

    beforeAll(async () => {

        await sequelize.sync({ force: true });
        server = app.listen(3000); 

    });

    afterAll(async () => {
        server.close();
        await sequelize.close();
    });

    beforeEach(async () => {
        await UserMovieListModel.destroy({ where: {} });
        await MovieModel.destroy({ where: {} });
    });

    describe('createUser', () => {
        it('should create a new user', async () => {
            const userData: IUser = { email: 'test@example.com', password: 'password123' };
            const newUser = await UserRepository.createUser(userData);

            expect(newUser).toBeDefined();
            expect(newUser.email).toBe(userData.email);
        });

        it('should throw an error if user creation fails', async () => {
            await expect(UserRepository.createUser({} as IUser)).rejects.toThrow();
        });
    });

    describe('findById', () => {
        it('should find a user by ID', async () => {
            const user = await UserModel.create({ email: 'test@example.com', password: 'password123' });
            const foundUser = await UserRepository.findById(user.id);

            expect(foundUser).toBeDefined();
            expect(foundUser?.id).toBe(user.id);
        });

        it('should return null if user is not found', async () => {
            const foundUser = await UserRepository.findById(9999);
            expect(foundUser).toBeNull();
        });

        it('should throw an error if database query fails', async () => {
            jest.spyOn(UserModel, 'findByPk').mockRejectedValueOnce(new Error());
            await expect(UserRepository.findById(1)).rejects.toThrow();
        });
    });

    describe('findByEmail', () => {
        it('should find a user by email', async () => {
            const user = await UserModel.create({ email: 'test@example.com', password: 'password123' });
            const foundUser = await UserRepository.findByEmail(user.email);

            expect(foundUser).toBeDefined();
            expect(foundUser?.email).toBe(user.email);
        });

        it('should return null if user is not found', async () => {
            const foundUser = await UserRepository.findByEmail('nonexistent@example.com');
            expect(foundUser).toBeNull();
        });

        it('should throw an error if database query fails', async () => {
            jest.spyOn(UserModel, 'findOne').mockRejectedValueOnce(new Error());
            await expect(UserRepository.findByEmail('test@example.com')).rejects.toThrow();
        });
    });

    describe('updateUser', () => {
        it('should update an existing user', async () => {
            const user = await UserModel.create({ email: 'test@example.com', password: 'password123' });
            const newUserData = { email: 'updated@example.com' };

            await UserRepository.updateUser(user.id, newUserData);
            const updatedUser = await UserRepository.findById(user.id);

            expect(updatedUser).toBeDefined();
            expect(updatedUser?.email).toBe(newUserData.email);
        });

        it('should throw an error if user update fails', async () => {
            await expect(UserRepository.updateUser(9999, {} as Partial<IUser>)).rejects.toThrow();
        });

    });

    describe('deleteUser', () => {
        it('should delete an existing user', async () => {
            const user = await UserModel.create({ email: 'test@example.com', password: 'password123' });
            await UserRepository.deleteUser(user.id);
            const foundUser = await UserRepository.findById(user.id);

            expect(foundUser).toBeNull();
        });

        it('should throw an error if user deletion fails', async () => {
            await expect(UserRepository.deleteUser(9999)).rejects.toThrow();
        });
    });
});
