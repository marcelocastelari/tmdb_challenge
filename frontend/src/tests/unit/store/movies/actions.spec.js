import actions from '../../../../main/store/movies/actions';
import axios from 'axios';
import { createStore } from 'vuex';

jest.mock('axios');

describe('Vuex Actions', () => {
  let store;
  let state;
  let commit;

  beforeEach(() => {
    state = {
      movies: {
        favorite: [],
        watched: [],
        watchLater: []
      },
    };

    commit = jest.fn();

    store = createStore({
      modules: {
        movies: {
          namespaced: true,
          state,
          actions,
          mutations: {
            setLoading: jest.fn(),
            setMovies: jest.fn(),
            addFavorite: jest.fn(),
            removeFromFavorites: jest.fn(),
            addWatchLater: jest.fn(),
            removeToWatchLater: jest.fn(),
            markAsWatched: jest.fn(),
            removeFromWatched: jest.fn(),
            setListType: jest.fn()
          },
        },
      },
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('fetches movies and commits them correctly', async () => {
    const responseData = { data: { results: [{ id: 1, title: 'Inception' }] } };
    axios.get.mockResolvedValue(responseData);

    await actions.fetchMovies({ commit }, 'Inception');

    expect(commit).toHaveBeenCalledWith('setLoading', true);
    expect(commit).toHaveBeenCalledWith('setMovies', responseData.data.results);
    expect(commit).toHaveBeenCalledWith('setLoading', false);
  });

  it('fetches movies and commits them error', async () => {
    axios.get.mockRejectedValue(new Error('error'));

    await actions.fetchMovies({ commit }, 'Inception');

    expect(commit).toHaveBeenCalledWith('setLoading', false);
  });
  

  it('adds a movie to favorites', async () => {
    const token = 'dummy-jwt';
    const movieData = { id: 1, title: 'Inception', poster_path: '/inception.jpg', release_date: '2010-07-16' };
    axios.post.mockResolvedValue({ data: {} });
    localStorage.setItem('token', token);

    await actions.addToFavorites({ commit }, movieData);

    expect(commit).toHaveBeenCalledWith('addFavorite', movieData);
    expect(axios.post).toHaveBeenCalledWith(
      'http://localhost:8000/userMovieList/add',
      {
        movie: {
          id: 1,
          title: 'Inception',
          posterPath: '/inception.jpg',
          releaseDate: '2010-07-16',
        },
        listType: 'favorite',
      },
      { headers: { Authorization: `Bearer ${token}` } }
    );
  });

  it('fails on add a movie to favorites', async () => {
    const movieData = { id: 1, title: 'Inception', poster_path: '/inception.jpg', release_date: '2010-07-16' };
    axios.post.mockRejectedValue({});

    await actions.addToFavorites({ commit }, movieData);

    expect(axios.post).toHaveBeenCalled();
  });

  it('commits removeFromFavorites mutation with correct movieId', () => {
    const commit = jest.fn();
    const movieId = 1;

    actions.removeFromFavorites({ commit }, movieId);

    expect(commit).toHaveBeenCalledWith('removeFromFavorites', movieId);
  });

  it('adds a movie to watch later', async () => {
    const token = 'dummy-jwt';
    const movieData = { id: 1, title: 'Inception', poster_path: '/inception.jpg', release_date: '2010-07-16' };
    axios.post.mockResolvedValue({ data: {} });
    localStorage.setItem('token', token);

    await actions.addToWatchLater({ commit }, movieData);

    expect(commit).toHaveBeenCalledWith('addWatchLater', movieData);
    expect(axios.post).toHaveBeenCalledWith(
      'http://localhost:8000/userMovieList/add',
      {
        movie: {
          id: 1,
          title: 'Inception',
          posterPath: '/inception.jpg',
          releaseDate: '2010-07-16',
        },
        listType: 'watchLater',
      },
      { headers: { Authorization: `Bearer ${token}` } }
    );
  });

  it('returns error when axios.post fails', async () => {
    const commit = jest.fn();
    const mockError = new Error('Failed to add movie to watch later');
    axios.post.mockRejectedValue(mockError);
    const movieData = { id: 1, title: 'Inception', poster_path: '/inception.jpg', release_date: '2010-07-16' };

    const result = await actions.addToWatchLater({ commit }, movieData);

    expect(result).toBe(mockError);
    expect(commit).toHaveBeenCalledWith('addWatchLater', movieData);
  });

  it('commits removeToWatchLater mutation with correct movieId', () => {
    const commit = jest.fn();
    const movieId = 1;

    actions.removeToWatchLater({ commit }, movieId);

    expect(commit).toHaveBeenCalledWith('removeToWatchLater', movieId);
  });

  it('marks a movie as watched', async () => {
    const token = 'dummy-jwt';
    const movieData = { id: 1, title: 'Inception', poster_path: '/inception.jpg', release_date: '2010-07-16' };
    axios.post.mockResolvedValue({ data: {} });
    localStorage.setItem('token', token);

    await actions.markMovieAsWatched({ commit }, movieData);

    expect(commit).toHaveBeenCalledWith('markAsWatched', movieData);
    expect(axios.post).toHaveBeenCalledWith(
      'http://localhost:8000/userMovieList/add',
      {
        movie: {
          id: 1,
          title: 'Inception',
          posterPath: '/inception.jpg',
          releaseDate: '2010-07-16',
        },
        listType: 'watched',
      },
      { headers: { Authorization: `Bearer ${token}` } }
    );
  });

  it('handles errors correctly', async () => {
    const commit = jest.fn();
    const error = new Error('API Error');
    const data = { id: 1, title: 'Inception', poster_path: '/inception.jpg', release_date: '2010-07-16' };

    axios.post.mockRejectedValueOnce(error);

    const result = await actions.markMovieAsWatched({ commit }, data);

    expect(commit).toHaveBeenCalledWith('markAsWatched', data);
    expect(result).toEqual(error);
  });

  it('commits removeFromWatched mutation with correct movieId', () => {
    const commit = jest.fn();
    const movieId = 123;

    actions.removeFromWatched({ commit }, movieId);

    expect(commit).toHaveBeenCalledWith('removeFromWatched', movieId);
  });

  it('fetches movies by list and commits them correctly', async () => {
    const token = 'dummy-jwt';
    const listTypes = ['favorite', 'watched', 'watchLater'];
    const responseData = { data: [1, 2, 3] }; 
    const movieDetailsData = { 
      data: { 
        id: 1, 
        title: 'Inception', 
        credits: { crew: [{ job: 'Director', name: 'Christopher Nolan' }] } 
      } 
    };

    axios.get.mockImplementation((url) => {
      if (url.includes('/userMovieList/')) {
        return Promise.resolve(responseData);
      } else if (url.includes('/credits')) {
        return Promise.resolve({ data: { crew: [{ job: 'Director', name: 'Christopher Nolan' }] } });
      } else {
        return Promise.resolve(movieDetailsData);
      }
    });

    localStorage.setItem('token', token);

    await actions.getMoviesByList({ commit });

    expect(axios.get).toHaveBeenCalledTimes(21);

    listTypes.forEach((listType) => {
      expect(commit).toHaveBeenCalledWith('setListType', {
        listType,
        movies: expect.arrayContaining([expect.objectContaining({ id: 1, director: 'Christopher Nolan' })]),
      });
    });
  });

  it('handles errors correctly', async () => {
    const commit = jest.fn();
    const error = new Error('Network Error');
    
    axios.get.mockRejectedValueOnce(error);

    const result = await actions.getMoviesByList({ commit });

    expect(result).toEqual(error);
    expect(commit).toHaveBeenCalled();
  });

});
