import { AuthService } from '../../../main/services/AuthService';
import { UserRepository } from '../../../main/repositories/UserRepository';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

jest.mock('../../../main/repositories/UserRepository');
jest.mock('bcrypt');
jest.mock('jsonwebtoken');

describe('AuthService', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('register', () => {
        it('should register a new user', async () => {
            const email = 'test@example.com';
            const password = 'password123';

            (UserRepository.findByEmail as jest.Mock).mockResolvedValue(null);
            (bcrypt.hash as jest.Mock).mockResolvedValue('hashedPassword');
            (UserRepository.createUser as jest.Mock).mockResolvedValue({});

            const result = await AuthService.register(email, password);

            expect(UserRepository.findByEmail).toHaveBeenCalledWith(email);
            expect(bcrypt.hash).toHaveBeenCalledWith(password, 10);
            expect(UserRepository.createUser).toHaveBeenCalledWith({ email, password: 'hashedPassword' });
            expect(result).toBe('User registered successfully');
        });

        it('should throw an error if the user already exists', async () => {
            const email = 'test@example.com';
            const password = 'password123';

            (UserRepository.findByEmail as jest.Mock).mockResolvedValue({ id: 1, email, password: 'hashedPassword' });

            await expect(AuthService.register(email, password)).rejects.toThrow('User already exists');
            expect(UserRepository.findByEmail).toHaveBeenCalledWith(email);
        });
    });

    describe('login', () => {
        it('should log in an existing user and return a token', async () => {
            const email = 'test@example.com';
            const password = 'password123';
            const user = { id: 1, email, password: 'hashedPassword' };

            (UserRepository.findByEmail as jest.Mock).mockResolvedValue(user);
            (bcrypt.compare as jest.Mock).mockResolvedValue(true);
            (jwt.sign as jest.Mock).mockReturnValue('token');

            const result = await AuthService.login(email, password);

            expect(UserRepository.findByEmail).toHaveBeenCalledWith(email);
            expect(bcrypt.compare).toHaveBeenCalledWith(password, user.password);
            expect(jwt.sign).toHaveBeenCalledWith({ userId: user.id }, 'secret', { expiresIn: '1h' });
            expect(result).toBe('token');
        });

        it('should throw an error if the user is not found', async () => {
            const email = 'test@example.com';
            const password = 'password123';

            (UserRepository.findByEmail as jest.Mock).mockResolvedValue(null);

            await expect(AuthService.login(email, password)).rejects.toThrow('User not found');
            expect(UserRepository.findByEmail).toHaveBeenCalledWith(email);
        });

        it('should throw an error if the password is invalid', async () => {
            const email = 'test@example.com';
            const password = 'password123';
            const user = { id: 1, email, password: 'hashedPassword' };

            (UserRepository.findByEmail as jest.Mock).mockResolvedValue(user);
            (bcrypt.compare as jest.Mock).mockResolvedValue(false);

            await expect(AuthService.login(email, password)).rejects.toThrow('Invalid credentials');
            expect(UserRepository.findByEmail).toHaveBeenCalledWith(email);
            expect(bcrypt.compare).toHaveBeenCalledWith(password, user.password);
        });
    });
});
