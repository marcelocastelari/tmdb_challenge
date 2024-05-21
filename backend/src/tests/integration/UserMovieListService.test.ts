import request from 'supertest';
import app from '../../App';
import { sequelize } from '../../../config/database';
import { UserMovieListModel } from '../../main/models/UserMovieListModel';
import { MovieModel } from '../../main/models/MovieModel';
import { AuthService } from '../../main/services/AuthService';



describe('UserMovieListRepository', () => {
    let server: any;
    let token: string;
    
    beforeAll(async () => {

        await sequelize.sync({ force: true });
        server = app.listen(3000); 

    });

    afterAll(async () => {
        server.close();
        await sequelize.close();
    });

    beforeEach(async () => {
        await UserMovieListModel.destroy({ where: {} });
        await MovieModel.destroy({ where: {} });
    });

    describe('POST /userMovieList/add', () => {
        
        it('should add a movie to the user list', async () => {
            await AuthService.register('user@user.com', '123456');
            token = await AuthService.login('user@user.com', '123456');

            const movie = {
                "id": 2658,
                "title": "teste",
                "overview": "teste ovw",
                "releaseDate": "2024-05-19",
                "posterPath": "url"
            }

            const res = await request(app)
                .post('/userMovieList/add')
                .set('Authorization', `Bearer ${token}`)
                .send({ movie, listType: 'watched' });

            expect(res.status).toBe(200);
            expect(res.body).toHaveProperty('message', 'Movie added to list');
        });
    });

    describe('GET /userMovieList/:listType', () => {
        
        it('should add a movie to the user list', async () => {

            let listType: string;
            listType = 'watched';
            const res = await request(app)
                .get(`/userMovieList/${listType}`)
                .set('Authorization', `Bearer ${token}`)

            expect(res.status).toBe(200);
            expect(res.body).toEqual([]);
        });
    });

    describe('DELETE /userMovieList/remove', () => {
        
        it('should delete a movie from the user list', async () => {
            const movie = {
                "id": 2658,
                "title": "teste",
                "overview": "teste ovw",
                "releaseDate": "2024-05-19",
                "posterPath": "url"
            }

            const add = await request(app)
                .post('/userMovieList/add')
                .set('Authorization', `Bearer ${token}`)
                .send({ movie, listType: 'watched' });

            let listType: string;
            listType = 'watched';
            const res = await request(app)
                .delete(`/userMovieList/remove`)
                .set('Authorization', `Bearer ${token}`)
                .send({ movieId: 2658, listType });

            expect(add.status).toBe(200)
            expect(res.status).toBe(200);
            expect(res.body).toEqual({"message": "Movie removed from list"});
        });
    });

});
