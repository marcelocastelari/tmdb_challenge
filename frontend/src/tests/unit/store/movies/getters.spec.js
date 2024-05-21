import getters from '../../../../main/store/movies/getters';

describe('getters', () => {
  const state = {
    movies: [
      { id: 1, title: 'Inception' },
      { id: 2, title: 'The Matrix' }
    ],
    loading: true,
    listType: {
      favorite: [
        { id: 1, title: 'Inception' }
      ],
      watchLater: [
        { id: 2, title: 'The Matrix' }
      ],
      watched: [
        { id: 3, title: 'Interstellar' }
      ]
    }
  };

  it('getMovies returns the list of movies', () => {
    const result = getters.getMovies(state);
    expect(result).toEqual(state.movies);
  });

  it('getLoading returns the loading state', () => {
    const result = getters.getLoading(state);
    expect(result).toBe(state.loading);
  });

  it('getFavorites returns the list of favorite movies', () => {
    const result = getters.getFavorites(state);
    expect(result).toEqual(state.listType.favorite);
  });

  it('getWatchLater returns the list of watch later movies', () => {
    const result = getters.getWatchLater(state);
    expect(result).toEqual(state.listType.watchLater);
  });

  it('getWatched returns the list of watched movies', () => {
    const result = getters.getWatched(state);
    expect(result).toEqual(state.listType.watched);
  });

  it('getListType returns the entire listType object', () => {
    const result = getters.getListType(state);
    expect(result).toEqual(state.listType);
  });
});
