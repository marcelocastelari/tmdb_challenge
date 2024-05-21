import { config as dotenvConfig } from 'dotenv';
dotenvConfig();

interface DBConfig {
  username: string;
  password: string;
  database: string;
  host: string;
  port: number;
}

interface Config {
  [key: string]: DBConfig;
}

const dbConfig: Config = {
  development: {
    username: process.env.DB_USERNAME || 'root',
    password: process.env.DB_PASSWORD || 'root',
    database: process.env.DB_NAME || 'movies',
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '3306', 10),
  },
  test: {
    username: process.env.DB_USERNAME || 'root',
    password: process.env.DB_PASSWORD || 'root',
    database: process.env.DB_NAME || 'movies',
    host: 'localhost',
    port: parseInt(process.env.DB_PORT || '3306', 10),
  },
  production: {
    username: process.env.DB_USERNAME || 'root',
    password: process.env.DB_PASSWORD || 'root',
    database: process.env.DB_NAME || 'movies',
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '3306', 10),
  },
};

export default dbConfig;
