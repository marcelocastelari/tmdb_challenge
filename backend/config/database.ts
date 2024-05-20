import { Sequelize } from 'sequelize';

export const sequelize = new Sequelize({
  dialect: 'mysql',
  host: 'localhost',
  port: 3308,
  database: 'movies',
  username: 'root',
  password: 'root',
  logging: false,
});

sequelize.authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch((err) => {
    console.log('Unable to connect to the database.', err);
  });

export default sequelize;