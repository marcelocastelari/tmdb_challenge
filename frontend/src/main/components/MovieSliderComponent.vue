<template>
  <div class="p-10">
    <h2 class="text-white text-2xl underline underline-offset-8 decoration-yellow-500">{{ title }}</h2>
    <div v-if="!movies.length">
      <p class="text-white mt-5">Ainda não foi adicionado nenhum filme.</p>
    </div>
    <div class="flex flex-wrap mt-10 w-full" v-else>
      <div v-for="movie in movies" :key="movie.id" class="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/6 p-1">
        <div @click="handleClick(movie)" class="bg-white rounded-lg shadow-md cursor-pointer">
          <img :src="getMoviePosterUrl(movie.poster_path)" alt="Movie Poster" class="w-full h-96 rounded-t-lg object-cover" />
          <div class="p-2">
            <h3 class="font-bold text-base mb-1 truncate">{{ movie.title }}</h3>
          </div>
        </div>
      </div>
    </div>
    
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';
// eslint-disable-next-line
const props = defineProps({
  title: {
    type: String,
    required: true
  },
  movies: {
    type: Array,
    required: true
  }
});

const emits = defineEmits(['movie-clicked']);

const getMoviePosterUrl = (posterPath) => {
  return posterPath 
    ? `https://image.tmdb.org/t/p/w500${posterPath}`
    : 'https://via.placeholder.com/500x750?text=No+Image';
};

const handleClick = (movie) => {
  emits('movie-clicked', movie);
};
</script>

<style scoped>
</style>
