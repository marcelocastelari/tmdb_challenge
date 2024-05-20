import { UserMovieListModel } from "../models/UserMovieListModel";

export class UserMovieListRepository {
    static async addMovieToList(userId: number, movieId: number, listType: string): Promise<UserMovieListModel> {
        return UserMovieListModel.create({ userId, movieId, listType });
    }

    static async removeMovieFromList(userId: number, movieId: number, listType: string): Promise<void> {
        await UserMovieListModel.destroy({ where: { userId, movieId, listType } });
    }

    static async getMoviesByList(userId: number, listType: string): Promise<number[]> {
        const userMovieList = await UserMovieListModel.findAll({
            where: { userId, listType },
            attributes: ['movieId']
        });
        return userMovieList.map(record => record.movieId);
    }
}
