<template>
  <div class="movie-card bg-white shadow-md rounded-lg w-full md:w-1/3 lg:w-1/4 p-4 m-2">
    <img :src="movieImageUrl" alt="Movie Poster" class="movie-poster w-full h-64 object-cover" />
    <div class="movie-details p-4">
      <h2 class="movie-title font-bold text-xl mb-2 truncate">{{ movie.title }}</h2>
    </div>
    <div class="button-container">
      <div class="button-item">
        <button 
          class="icon-button" 
          :class="{ active: isInList('watched', movie.id) }"
          @click="markAsWatched" 
          :disabled="isInList('watched', movie.id) || isInList('watchLater', movie.id)">
          <i class="fas fa-check"></i>
        </button>
        <span>Assistido</span>
      </div>
      <div class="button-item">
        <button 
          class="icon-button" 
          :class="{ active: isInList('favorites', movie.id) }"
          @click="handleFavorites" 
          :disabled="isInList('favorites', movie.id) || isInList('watchLater', movie.id)">
          <i class="far fa-heart"></i>
        </button>
        <span>Favoritos</span>
      </div>
      <div class="button-item">
        <button 
          class="icon-button" 
          :class="{ active: isInList('watchLater', movie.id) }"
          @click="handleWatchLater" 
          :disabled="isInList('watchLater', movie.id)">   
          <i class="far fa-clock"></i>
        </button>
        <span>Pretende assistir</span>
      </div>
    </div>
  </div>
</template>


<script setup>
import { defineProps, computed } from 'vue';
import { useStore } from 'vuex';

const props = defineProps({
  movie: {
    type: Object,
    required: true,
  },
});

const store = useStore();

const movieImageUrl = computed(() => {
  return props.movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${props.movie.poster_path}`
    : 'https://via.placeholder.com/500x750?text=No+Image';
});

const isInList = (listName, movieId) => {
  const list = store.state.movies[listName];
  return list.some(movie => movie.id === movieId);
};

const handleFavorites = async () => {
  if (!isInList('favorites', props.movie.id)) {
    await store.dispatch('movies/addToFavorites', props.movie);
  }
};

const handleWatchLater = async () => {
  if (!isInList('watchLater', props.movie.id)) {
    await store.dispatch('movies/addToWatchLater', props.movie);
    await store.dispatch('movies/removeFromFavorites', props.movie);
    await store.dispatch('movies/removeFromWatched', props.movie);
  }
};

const markAsWatched = async () => {
  if (!isInList('watched', props.movie.id)) {
    await store.dispatch('movies/markMovieAsWatched', props.movie);
    if (isInList('watchLater', props.movie.id)) {
      await store.dispatch('movies/removeFromWatchLater', props.movie);
    }
  }
};
</script>


<style scoped>
.movie-card {
  max-width: 300px;
  position: relative;
}
.movie-title {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.movie-overview {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.button-container {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
  margin-top: 10px;
}

.button-item {
  display: flex;
  align-items: center;
  gap: 5px;
}

.icon-button {
  background: none;
  border: none;
  cursor: pointer;
  font-size: 20px;
}

.icon-button:hover {
  color: #ffcc00;
}

.icon-button[disabled] {
  cursor: not-allowed;
  opacity: 0.5;
}

.active {
  color: #ffcc00;
}
</style>
