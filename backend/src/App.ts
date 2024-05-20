import express from 'express';
import cors from 'cors';
import authRoutes from './main/routes/AuthRoutes';
import userMovieListRoutes from './main/routes/UserMovieListRoutes';

const app = express();
const port = 8000;


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use('/auth', authRoutes);
app.use('/userMovieList', userMovieListRoutes);

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});