import { MovieRepository } from "../repositories/MovieRepository";
import { UserMovieListRepository } from "../repositories/UserMovieListRepository";
import { MovieModel } from "../models/MovieModel";
import { UserMovieListModel } from "../models/UserMovieListModel";

export class UserMovieListService {
    static async addMovieToList(userId: number, movieData: Partial<MovieModel>, listType: string): Promise<string> {
        const movie = await MovieRepository.createOrUpdate(movieData);
        
        await UserMovieListRepository.addMovieToList(userId, movie.id, listType);
        return "Movie added to list";
    }

    static async removeMovieFromList(userId: number, movieId: number, listType: string): Promise<string> {
        await UserMovieListRepository.removeMovieFromList(userId, movieId, listType);
        return "Movie removed from list";
    }

    static async getMoviesByList(userId: number, listType: string): Promise<number[]> {
        return UserMovieListRepository.getMoviesByList(userId, listType);
    }
}
