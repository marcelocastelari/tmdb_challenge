import { MovieModel } from '../../../main/models/MovieModel';
import { MovieRepository } from '../../../main/repositories/MovieRepository';

jest.mock('../../../main/models/MovieModel');

describe('MovieRepository', () => {
    describe('createOrUpdate', () => {
        it('should create or update a movie successfully', async () => {
            const movieData = { title: 'Inception', year: 2010 };

            (MovieModel.upsert as jest.Mock).mockResolvedValueOnce([movieData]);

            const result = await MovieRepository.createOrUpdate(movieData);
            expect(result).toEqual(movieData);
        });

        it('should throw an error when createOrUpdate fails', async () => {
            const movieData = { title: 'Inception', year: 2010 };
            const errorMessage = 'Database error';

            (MovieModel.upsert as jest.Mock).mockRejectedValueOnce(new Error(errorMessage));

            await expect(MovieRepository.createOrUpdate(movieData)).rejects.toThrowError(errorMessage);
        });
    });

    describe('findById', () => {
        it('should find a movie by its id successfully', async () => {
            const movieId = 101;
            const movieData = { id: movieId, title: 'Inception', year: 2010 };

            (MovieModel.findByPk as jest.Mock).mockResolvedValueOnce(movieData);

            const result = await MovieRepository.findById(movieId);
            expect(result).toEqual(movieData);
        });

        it('should return null when movie is not found', async () => {
            const movieId = 101;

            (MovieModel.findByPk as jest.Mock).mockResolvedValueOnce(null);

            const result = await MovieRepository.findById(movieId);
            expect(result).toBeNull();
        });

        it('should throw an error when findById fails', async () => {
            const movieId = 101;
            const errorMessage = 'Database error';

            (MovieModel.findByPk as jest.Mock).mockRejectedValueOnce(new Error(errorMessage));

            await expect(MovieRepository.findById(movieId)).rejects.toThrowError(errorMessage);
        });
    });
});
