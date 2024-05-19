import { Model, DataTypes } from "sequelize";
import { sequelize } from "../../config/database"; 
import { UserModel } from "./UserModel";
import { MovieModel } from "./MovieModel";
import { IUserMovieList } from "../interfaces/UserMovieListInterface";

export class UserMovieListModel extends Model<IUserMovieList> implements IUserMovieList {
    public id!: number;
    public userId!: number;
    public movieId!: number;
    public listType!: string;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

UserMovieListModel.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: UserModel,
                key: 'id',
            },
        },
        movieId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: MovieModel,
                key: 'id',
            },
        },
        listType: {
            type: DataTypes.ENUM('favorite', 'watched', 'watchLater'),
            allowNull: false,
        },
    },
    {
        tableName: "user_movie_lists",
        sequelize,
        timestamps: true,
    }
);

UserModel.hasMany(UserMovieListModel, { foreignKey: 'userId' });
MovieModel.hasMany(UserMovieListModel, { foreignKey: 'movieId' });
UserMovieListModel.belongsTo(UserModel, { foreignKey: 'userId' });
UserMovieListModel.belongsTo(MovieModel, { foreignKey: 'movieId' });
