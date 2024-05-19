import express from "express";
import { UserMovieListController } from "../controllers/UserMovieListController";
import { authMiddleware } from "../middlewares/AuthMiddleware";


const router = express.Router();

router.post('/add', authMiddleware, UserMovieListController.addMovieToList);
router.delete('/remove', authMiddleware, UserMovieListController.removeMovieFromList);
router.get('/:listType', authMiddleware, UserMovieListController.getMoviesByList);

export default router;
