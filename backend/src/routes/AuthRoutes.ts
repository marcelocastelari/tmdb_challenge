import express, { Request, Response } from 'express';
import { AuthController } from '../controllers/AuthController';

const router = express.Router();
const authController = new AuthController();


router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const data = await authController.login(email, password);
    res.status(data.status).json(data);
});

router.post('/register', async (req, res) => {
    const { email, password } = req.body;
    const result = await authController.register(email, password);
    res.status(result.status).json({ message: result.message });
});

export default router;