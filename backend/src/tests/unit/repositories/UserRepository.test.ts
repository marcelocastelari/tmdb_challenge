import { UserRepository } from '../../../main/repositories/UserRepository';
import { UserModel } from '../../../main/models/UserModel';

jest.mock('../../../main/models/UserModel');

describe('UserRepository', () => {
    describe('createUser', () => {
        it('should create a new user', async () => {
            const userData = { email: 'test@example.com', password: 'password' };

            (UserModel.create as jest.Mock).mockResolvedValueOnce(userData as UserModel);

            const result = await UserRepository.createUser(userData);

            expect(UserModel.create).toHaveBeenCalledWith(userData);
            expect(result).toEqual(userData as UserModel);
        });

        it('should throw an error when createUser fails', async () => {
            const userData = { email: 'test@example.com', password: 'password' };
            const errorMessage = 'Database error';

            (UserModel.create as jest.Mock).mockRejectedValueOnce(new Error(errorMessage));

            await expect(UserRepository.createUser(userData)).rejects.toThrow(errorMessage);
        });
    });

    describe('findById', () => {
        it('should find a user by id', async () => {
            const userId = 1;
            const userData = { id: userId, email: 'test@example.com', password: 'password' };

            (UserModel.findByPk as jest.Mock).mockResolvedValueOnce(userData as UserModel);

            const result = await UserRepository.findById(userId);

            expect(UserModel.findByPk).toHaveBeenCalledWith(userId);
            expect(result).toEqual(userData as UserModel);
        });

        it('should throw an error when findById fails', async () => {
            const userId = 1;
            const errorMessage = 'Database error';

            (UserModel.findByPk as jest.Mock).mockRejectedValueOnce(new Error(errorMessage));

            await expect(UserRepository.findById(userId)).rejects.toThrow(errorMessage);
        });
    });

    describe('findByEmail', () => {
        it('should find a user by email', async () => {
            const email = 'test@example.com';
            const userData = { id: 1, email, password: 'password' };

            (UserModel.findOne as jest.Mock).mockResolvedValueOnce(userData as UserModel);

            const result = await UserRepository.findByEmail(email);

            expect(UserModel.findOne).toHaveBeenCalledWith({ where: { email } });
            expect(result).toEqual(userData as UserModel);
        });

        it('should throw an error when findByEmail fails', async () => {
            const email = 'test@example.com';
            const errorMessage = 'Database error';

            (UserModel.findOne as jest.Mock).mockRejectedValueOnce(new Error(errorMessage));

            await expect(UserRepository.findByEmail(email)).rejects.toThrow(errorMessage);
        });
    });

    describe('updateUser', () => {
        it('should update a user', async () => {
            const userId = 1;
            const userData = { email: 'test@example.com', password: 'newPassword' };

            (UserModel.update as jest.Mock).mockResolvedValueOnce([1]);

            await UserRepository.updateUser(userId, userData);

            expect(UserModel.update).toHaveBeenCalledWith(userData, { where: { id: userId } });
        });

        it('should throw an error when updateUser fails', async () => {
            const userId = 1;
            const userData = { email: 'test@example.com', password: 'newPassword' };
            const errorMessage = 'Database error';

            (UserModel.update as jest.Mock).mockRejectedValueOnce(new Error(errorMessage));

            await expect(UserRepository.updateUser(userId, userData)).rejects.toThrowError(errorMessage);
        });
    });

    describe('deleteUser', () => {
        it('should delete a user', async () => {
            const userId = 1;

            (UserModel.destroy as jest.Mock).mockResolvedValueOnce(1);

            await UserRepository.deleteUser(userId);

            expect(UserModel.destroy).toHaveBeenCalledWith({ where: { id: userId } });
        });

        it('should throw an error when deleteUser fails', async () => {
            const userId = 1;
            const errorMessage = 'Database error';

            (UserModel.destroy as jest.Mock).mockRejectedValueOnce(new Error(errorMessage));

            await expect(UserRepository.deleteUser(userId)).rejects.toThrow(errorMessage);
        });
    });
});
