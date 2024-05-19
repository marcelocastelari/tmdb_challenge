import { Model, DataTypes } from 'sequelize';
import { sequelize } from "../../config/database"; 
import { IMovie } from '../interfaces/MovieInterface';

export class MovieModel extends Model<IMovie> implements IMovie {
    public id!: number;
    public title!: string;
    public releaseDate!: string;
    public posterPath!: string;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

MovieModel.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        releaseDate: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        posterPath: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    { 
        tableName: "movies",
        sequelize,
        timestamps: true,
    }
);