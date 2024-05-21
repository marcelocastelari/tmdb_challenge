export default {
    setMovies(state, payload) {
        state.movies = payload;
      },
      setLoading(state, payload) {
        state.loading = payload;
      },
      addFavorite(state, movieId) {
        if (!state.favorites.includes(movieId)) {
          state.favorites.push(movieId);
        }
      },
      removeFromFavorites(state, movieId) {
        const index = state.favorites.indexOf(movieId);
        if (index !== -1) {
          state.favorites.splice(index, 1);
        }
      },
      addWatchLater(state, movieId) {
        if (!state.watchLater.includes(movieId)) {
          state.watchLater.push(movieId);
        }
      },
      removeToWatchLater(state, movieId) {
        const index = state.watchLater.indexOf(movieId);
        if (index !== -1) {
          state.watchLater.splice(index, 1);
        }
      },
      markAsWatched(state, movieId) {
        if (!state.watched.includes(movieId)) {
          state.watched.push(movieId);
        }
      },
      removeFromWatched(state, movieId) {
        const index = state.watched.indexOf(movieId);
        if (index !== -1) {
          state.watched.splice(index, 1);
        }
      },
      setListType(state, { listType, movies }) {
        state.listType[listType] = movies;
      },
}