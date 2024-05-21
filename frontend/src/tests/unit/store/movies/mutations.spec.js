import mutations from '../../../../main/store/movies/mutations';

describe('mutations', () => {
  let state;

  beforeEach(() => {
    state = {
      movies: [],
      loading: false,
      favorites: [],
      watchLater: [],
      watched: [],
      listType: {
        favorite: [],
        watchLater: [],
        watched: []
      }
    };
  });

  it('setMovies sets the movies state', () => {
    const movies = [{ id: 1, title: 'Inception' }, { id: 2, title: 'The Matrix' }];
    mutations.setMovies(state, movies);
    expect(state.movies).toEqual(movies);
  });

  it('setLoading sets the loading state', () => {
    mutations.setLoading(state, true);
    expect(state.loading).toBe(true);
  });

  it('addFavorite adds a movie to favorites if not already present', () => {
    const movieId = 1;
    mutations.addFavorite(state, movieId);
    expect(state.favorites).toContain(movieId);
  });

  it('addFavorite does not add a movie to favorites if already present', () => {
    const movieId = 1;
    state.favorites.push(movieId);
    mutations.addFavorite(state, movieId);
    expect(state.favorites).toHaveLength(1);
  });

  it('removeFromFavorites removes a movie from favorites', () => {
    const movieId = 1;
    state.favorites.push(movieId);
    mutations.removeFromFavorites(state, movieId);
    expect(state.favorites).not.toContain(movieId);
  });

  it('addWatchLater adds a movie to watchLater if not already present', () => {
    const movieId = 1;
    mutations.addWatchLater(state, movieId);
    expect(state.watchLater).toContain(movieId);
  });

  it('addWatchLater does not add a movie to watchLater if already present', () => {
    const movieId = 1;
    state.watchLater.push(movieId);
    mutations.addWatchLater(state, movieId);
    expect(state.watchLater).toHaveLength(1);
  });

  it('removeToWatchLater removes a movie from watchLater', () => {
    const movieId = 1;
    state.watchLater.push(movieId);
    mutations.removeToWatchLater(state, movieId);
    expect(state.watchLater).not.toContain(movieId);
  });

  it('markAsWatched adds a movie to watched if not already present', () => {
    const movieId = 1;
    mutations.markAsWatched(state, movieId);
    expect(state.watched).toContain(movieId);
  });

  it('markAsWatched does not add a movie to watched if already present', () => {
    const movieId = 1;
    state.watched.push(movieId);
    mutations.markAsWatched(state, movieId);
    expect(state.watched).toHaveLength(1);
  });

  it('removeFromWatched removes a movie from watched', () => {
    const movieId = 1;
    state.watched.push(movieId);
    mutations.removeFromWatched(state, movieId);
    expect(state.watched).not.toContain(movieId);
  });

  it('setListType sets the movies for a specific listType', () => {
    const listType = 'favorite';
    const movies = [{ id: 1, title: 'Inception' }];
    mutations.setListType(state, { listType, movies });
    expect(state.listType[listType]).toEqual(movies);
  });
});

