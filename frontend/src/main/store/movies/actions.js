import axios from 'axios';

const API_KEY = process.env.VUE_APP_API_KEY || 'api_key';
const PORT = process.env.PORT || 8000;

const getJwt = () => {
  const jwt = localStorage.getItem('token');
  if (jwt) {
    return jwt;
  }
  return null;
}

const getMovieCredits = (id) => {
  const credits = axios.get(`https://api.themoviedb.org/3/movie/${id}/credits`, {
    headers: {
      Authorization: `Bearer ${API_KEY}`
    }
  });
  return credits;
}

const getMovieDirector = (movie) => {
  const director = movie.credits.crew.find((crewMember) => crewMember.job === 'Director');
  return director ? director.name : 'Unknown Director';
}

const getMovieDetails = (movieIds) => movieIds.map(async (id) => {
  const movieResponse = await axios.get(`https://api.themoviedb.org/3/movie/${id}`, {
    headers: {
      Authorization: `Bearer ${API_KEY}`
    }
  });
  return movieResponse.data;
});

export default {
      async fetchMovies({ commit }, query) {

        try {
          commit('setLoading', true);
          const auth = `Bearer ${API_KEY}`
          const response = await axios.get('https://api.themoviedb.org/3/search/movie', {
            headers: {
              Authorization: `${auth}`
            },
            params: {
              query: query
            }
          });
          commit('setMovies', response.data.results);
          commit('setLoading', false);
        } catch (error) {
          commit('setLoading', false);
          return error;
        }
      },
      async addToFavorites({ commit }, data) {
        try {
          commit('addFavorite', data);
          const token = getJwt();
          const { id, title, poster_path, release_date } = data;
          const movie = { id, title, posterPath: poster_path, releaseDate:release_date };
          const body = { movie, listType: 'favorite' };

          const config = { headers: { Authorization: `Bearer ${token}` } };
          const response = await axios.post(`http://localhost:${PORT}/userMovieList/add`, body, config)
          return response.data;
        } catch (error) {
          return error;
        }
      },
      removeFromFavorites({ commit }, movieId) {
        commit('removeFromFavorites', movieId);
      },
      async addToWatchLater({ commit }, data) {
        try {
          commit('addWatchLater', data);
          const token = getJwt();
          const { id, title, poster_path, release_date } = data;
          const movie = { id, title, posterPath: poster_path, releaseDate:release_date };
          const body = { movie, listType: 'watchLater' };

          const config = { headers: { Authorization: `Bearer ${token}` } };
          const response = await axios.post(`http://localhost:${PORT}/userMovieList/add`, body, config)
          return response.data;
        } catch (error) {
          return error;
        }
      },
      removeToWatchLater({ commit }, movieId) {
        commit('removeToWatchLater', movieId);
      },
      async markMovieAsWatched({ commit }, data) {
        try {
          commit('markAsWatched', data);
          const token = getJwt();
          const { id, title, poster_path, release_date } = data;
          const movie = { id, title, posterPath: poster_path, releaseDate:release_date };
          const body = { movie, listType: 'watched' };

          const config = { headers: { Authorization: `Bearer ${token}` } };
          const response = await axios.post(`http://localhost:${PORT}/userMovieList/add`, body, config)
          return response.data;
        } catch (error) {
          return error;
        }
      },
      removeFromWatched({ commit }, movieId) {
        commit('removeFromWatched', movieId);
      },

      async getMoviesByList({ commit }) {
        commit('setLoading', true);
        const listTypes = ['favorite', 'watched', 'watchLater'];
        try {
          const token = getJwt();
          const config = { headers: { Authorization: `Bearer ${token}` } };
      
          const promises = listTypes.map(async (listType) => {
            const response = await axios.get(`http://localhost:${PORT}/userMovieList/${listType}`, config);
            const movieIds = response.data;
      
            const movieDetailsPromises = getMovieDetails(movieIds);
            const movies = await Promise.all(movieDetailsPromises);
      
            for (let movie of movies) {
              const creditsResponse = await getMovieCredits(movie.id);
              movie.credits = creditsResponse.data;
      
              movie.director = getMovieDirector(movie);
            }
      
            return { listType, movies };
          });
      
          const results = await Promise.all(promises);
      
          results.forEach(({ listType, movies }) => {
            commit('setListType', { listType, movies });
          });
          commit('setLoading', false);
        } catch (error) {
          commit('setLoading', false);
          return error;
        }
      },
}