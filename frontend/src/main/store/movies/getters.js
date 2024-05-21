export default {
    getMovies: (state) => state.movies,
    getLoading: (state) => state.loading,
    getFavorites: (state) => state.listType.favorite,
    getWatchLater: (state) => state.listType.watchLater,
    getWatched: (state) => state.listType.watched,
    getListType: (state) => state.listType 
}