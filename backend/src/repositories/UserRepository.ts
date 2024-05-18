import { UserModel } from "../models/UserModel";
import { IUser } from "../interfaces/UserInterface";

export class UserRepository {
    static async createUser(user: IUser): Promise<UserModel> {
        try {
            const newUser = await UserModel.create(user);
            return newUser;
        } catch (error) {
            throw new Error(`Erro on create user ${error}`)
        }
    }

    static async findById(userId: number): Promise<UserModel | null> {
        try {
            const user = await UserModel.findByPk(userId);
            return user;
        } catch (error) {
            throw new Error(`Error on find user by id ${error}`)
        }
    }

    static async findByUsername(username: string): Promise<UserModel | null> {
        try {
            const user = await UserModel.findOne({ where: { username } });
            return user;
        } catch (error) {
            throw new Error(`Error on find user by username ${error}`)
        }
    }

    static async updateUser(userId: number, userData: Partial<IUser>): Promise<void> {
        try {
            await UserModel.update(userData, { where: { id: userId } })
        } catch (error) {
            throw new Error(`Error on update user ${error}`)
        }
    }

    static async deleteUser(userId: number): Promise<void> {
        try {
            await UserModel.destroy({ where: { id: userId } })
        } catch (error) {
            throw new Error(`Error on delete user ${error}`)
        }
    }

}