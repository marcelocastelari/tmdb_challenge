import { UserMovieListService } from '../../../main/services/UserMovieListService';
import { MovieRepository } from '../../../main/repositories/MovieRepository';
import { UserMovieListRepository } from '../../../main/repositories/UserMovieListRepository';
import { MovieModel } from '../../../main/models/MovieModel';

jest.mock('../../../main/repositories/MovieRepository');
jest.mock('../../../main/repositories/UserMovieListRepository');

describe('UserMovieListService', () => {
    describe('addMovieToList', () => {
        it('should add a movie to the user list', async () => {
            const userId = 1;
            const movieData: Partial<MovieModel> = { title: 'Inception' };
            const listType = 'watchlist';

            (MovieRepository.createOrUpdate as jest.Mock).mockResolvedValueOnce({ id: 1 });

            (UserMovieListRepository.addMovieToList as jest.Mock).mockResolvedValueOnce({});

            const result = await UserMovieListService.addMovieToList(userId, movieData, listType);

            expect(MovieRepository.createOrUpdate).toHaveBeenCalledWith(movieData);
            expect(UserMovieListRepository.addMovieToList).toHaveBeenCalledWith(userId, 1, listType);
            expect(result).toBe('Movie added to list');
        });
    });

    describe('removeMovieFromList', () => {
        it('should remove a movie from the user list', async () => {
            const userId = 1;
            const movieId = 101;
            const listType = 'watched';

            (UserMovieListRepository.removeMovieFromList as jest.Mock).mockResolvedValueOnce({});

            const result = await UserMovieListService.removeMovieFromList(userId, movieId, listType);

            expect(UserMovieListRepository.removeMovieFromList).toHaveBeenCalledWith(userId, movieId, listType);
            expect(result).toBe('Movie removed from list');
        });
    });

    describe('getMoviesByList', () => {
        it('should get movies by list type for the user', async () => {
            const userId = 1;
            const listType = 'watched';
            const expectedMovies = [101, 102, 103];

            (UserMovieListRepository.getMoviesByList as jest.Mock).mockResolvedValueOnce(expectedMovies);

            const result = await UserMovieListService.getMoviesByList(userId, listType);

            expect(UserMovieListRepository.getMoviesByList).toHaveBeenCalledWith(userId, listType);
            expect(result).toEqual(expectedMovies);
        });
    });

});
