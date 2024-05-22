import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

export const sequelize = new Sequelize({
  dialect: 'mysql',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '3307'),
  database: process.env.DB_NAME || 'movies',
  username: process.env.DB_USERNAME || 'root',
  password: process.env.DB_PASSWORD || 'root',
  logging: false,
  dialectOptions: {
    charset: 'utf8mb4'
  }
});

export const connectDatabase = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.',);
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};

connectDatabase();

export default sequelize;
