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

    static async findByEmail(email: string): Promise<UserModel | null> {
        try {
            const user = await UserModel.findOne({ where: { email } });
            return user;
        } catch (error) {
            throw new Error(`Error on find user by email ${error}`)
        }
    }

    static async updateUser(userId: number, userData: Partial<IUser>): Promise<void> {
        try {
            const [rowsUpdated] = await UserModel.update(userData, { where: { id: userId } });
            if (rowsUpdated === 0) {
                throw new Error(`User with ID ${userId} not found`);
            }
        } catch (error) {
            throw new Error(`Error on update user ${error}`);
        }
    }
    

    static async deleteUser(userId: number): Promise<void> {
        try {
            const rowsDeleted = await UserModel.destroy({ where: { id: userId } });
            if (rowsDeleted === 0) {
                throw new Error(`User with ID ${userId} not found`);
            }
        } catch (error) {
            throw new Error(`Error on delete user ${error}`);
        }
    }
    

}