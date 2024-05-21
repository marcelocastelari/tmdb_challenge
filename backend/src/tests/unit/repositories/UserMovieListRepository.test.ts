import { UserMovieListModel } from '../../../main/models/UserMovieListModel';
import { UserMovieListRepository } from '../../../main/repositories/UserMovieListRepository';

jest.mock('../../../main/models/UserMovieListModel');

describe('UserMovieListRepository', () => {
    describe('addMovieToList', () => {
        it('should add a movie to the user list', async () => {
            const userId = 1;
            const movieId = 101;
            const listType = 'watched';

            const expectedResult = { userId, movieId, listType };

            // Mock implementation for UserMovieListModel.create
            (UserMovieListModel.create as jest.Mock).mockResolvedValueOnce(expectedResult);

            // Assertions
            const result = await UserMovieListRepository.addMovieToList(userId, movieId, listType);
            expect(result).toEqual(expectedResult);
        });

        it('should throw an error when addMovieToList fails', async () => {
            const userId = 1;
            const movieId = 101;
            const listType = 'watched';
            const errorMessage = 'Database error';

            // Mock implementation for UserMovieListModel.create to throw an error
            (UserMovieListModel.create as jest.Mock).mockRejectedValueOnce(new Error(errorMessage));

            // Assertions
            await expect(UserMovieListRepository.addMovieToList(userId, movieId, listType)).rejects.toThrowError(errorMessage);
        });
    });

    describe('removeMovieFromList', () => {
        it('should remove a movie from the user list', async () => {
            const userId = 1;
            const movieId = 101;
            const listType = 'watched';

            // Assertions
            await expect(UserMovieListRepository.removeMovieFromList(userId, movieId, listType)).resolves.not.toThrow();
        });

        it('should throw an error when removeMovieFromList fails', async () => {
            const userId = 1;
            const movieId = 101;
            const listType = 'watched';
            const errorMessage = 'Database error';

            // Mock implementation for UserMovieListModel.destroy to throw an error
            (UserMovieListModel.destroy as jest.Mock).mockRejectedValueOnce(new Error(errorMessage));

            // Assertions
            await expect(UserMovieListRepository.removeMovieFromList(userId, movieId, listType)).rejects.toThrowError(errorMessage);
        });
    });

    describe('getMoviesByList', () => {
        it('should return an array of movieIds for the user list', async () => {
            const userId = 1;
            const listType = 'watched';
            const expectedResult = [101, 102, 103];

            // Mock implementation for UserMovieListModel.findAll
            (UserMovieListModel.findAll as jest.Mock).mockResolvedValueOnce(expectedResult.map(movieId => ({ movieId })));

            // Assertions
            const result = await UserMovieListRepository.getMoviesByList(userId, listType);
            expect(result).toEqual(expectedResult);
        });

        it('should throw an error when getMoviesByList fails', async () => {
            const userId = 1;
            const listType = 'watched';
            const errorMessage = 'Database error';

            // Mock implementation for UserMovieListModel.findAll to throw an error
            (UserMovieListModel.findAll as jest.Mock).mockRejectedValueOnce(new Error(errorMessage));

            // Assertions
            await expect(UserMovieListRepository.getMoviesByList(userId, listType)).rejects.toThrowError(errorMessage);
        });
    });
});
