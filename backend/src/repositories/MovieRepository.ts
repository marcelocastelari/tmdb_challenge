import { MovieModel } from "../models/MovieModel";

export class MovieRepository {
    static async createOrUpdate(movie: Partial<MovieModel>): Promise<MovieModel> {
        console.log(`chegou no Repository MovieRepository - ${JSON.stringify(movie)}`);
        
        const [movieInstance] = await MovieModel.upsert(movie);
        return movieInstance;
    }

    static async findById(movieId: number): Promise<MovieModel | null> {
        return MovieModel.findByPk(movieId);
    }
}
