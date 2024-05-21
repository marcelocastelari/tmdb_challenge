import { Model, DataTypes } from "sequelize";
import { IUser } from "../interfaces/UserInterface";
import sequelize from "../../../config/database"; 

export class UserModel extends Model<IUser> implements IUser {
    public id!: number;
    public email!: string;
    public password!: string;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

UserModel.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        tableName: "users",
        sequelize,
        timestamps: true,
    }
);
