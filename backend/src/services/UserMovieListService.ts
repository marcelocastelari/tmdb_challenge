import { MovieRepository } from "../repositories/MovieRepository";
import { UserMovieListRepository } from "../repositories/UserMovieListRepository";
import { MovieModel } from "../models/MovieModel";
import { UserMovieListModel } from "../models/UserMovieListModel";

export class UserMovieListService {
    static async addMovieToList(userId: number, movieData: Partial<MovieModel>, listType: string): Promise<string> {
        console.log(`chegou no service addMovieTiList ${userId} - ${JSON.stringify(movieData)} - ${listType}`);
        const movie = await MovieRepository.createOrUpdate(movieData);
        console.log(`${userId} - ${movie.id} - ${listType}`);
        
        await UserMovieListRepository.addMovieToList(userId, movie.id, listType);
        return "Movie added to list";
    }

    static async removeMovieFromList(userId: number, movieId: number, listType: string): Promise<string> {
        await UserMovieListRepository.removeMovieFromList(userId, movieId, listType);
        return "Movie removed from list";
    }

    static async getMoviesByList(userId: number, listType: string): Promise<UserMovieListModel[]> {
        return UserMovieListRepository.getMoviesByList(userId, listType);
    }
}
