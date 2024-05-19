import express from 'express';
import cors from 'cors';
import { AuthController } from './controllers/AuthController';

const app = express();
const port = 8000;

const authController = new AuthController();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const result = await authController.login(username, password);
    res.status(result.status).json({ message: result.message });
});

app.post('/register', async (req, res) => {
    const { username, password } = req.body;
    console.log(req.body);
    const result = await authController.register(username, password);
    res.status(result.status).json({ message: result.message });
});

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});