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

            (UserMovieListModel.create as jest.Mock).mockResolvedValueOnce(expectedResult);

            const result = await UserMovieListRepository.addMovieToList(userId, movieId, listType);
            expect(result).toEqual(expectedResult);
        });

        it('should throw an error when addMovieToList fails', async () => {
            const userId = 1;
            const movieId = 101;
            const listType = 'watched';
            const errorMessage = 'Database error';

            (UserMovieListModel.create as jest.Mock).mockRejectedValueOnce(new Error(errorMessage));

            await expect(UserMovieListRepository.addMovieToList(userId, movieId, listType)).rejects.toThrowError(errorMessage);
        });
    });

    describe('removeMovieFromList', () => {
        it('should remove a movie from the user list', async () => {
            const userId = 1;
            const movieId = 101;
            const listType = 'watched';

            await expect(UserMovieListRepository.removeMovieFromList(userId, movieId, listType)).resolves.not.toThrow();
        });

        it('should throw an error when removeMovieFromList fails', async () => {
            const userId = 1;
            const movieId = 101;
            const listType = 'watched';
            const errorMessage = 'Database error';

            (UserMovieListModel.destroy as jest.Mock).mockRejectedValueOnce(new Error(errorMessage));

            await expect(UserMovieListRepository.removeMovieFromList(userId, movieId, listType)).rejects.toThrowError(errorMessage);
        });
    });

    describe('getMoviesByList', () => {
        it('should return an array of movieIds for the user list', async () => {
            const userId = 1;
            const listType = 'watched';
            const expectedResult = [101, 102, 103];

            (UserMovieListModel.findAll as jest.Mock).mockResolvedValueOnce(expectedResult.map(movieId => ({ movieId })));

            const result = await UserMovieListRepository.getMoviesByList(userId, listType);
            expect(result).toEqual(expectedResult);
        });

        it('should throw an error when getMoviesByList fails', async () => {
            const userId = 1;
            const listType = 'watched';
            const errorMessage = 'Database error';

            (UserMovieListModel.findAll as jest.Mock).mockRejectedValueOnce(new Error(errorMessage));

            await expect(UserMovieListRepository.getMoviesByList(userId, listType)).rejects.toThrowError(errorMessage);
        });
    });
});
