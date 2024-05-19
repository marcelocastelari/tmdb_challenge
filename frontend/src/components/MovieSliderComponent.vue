<template>
  <div class="p-10">
    <h2 class="text-white text-2xl">{{ title }}</h2>
    <div class="flex flex-wrap mt-10 w-full">
      <div v-for="movie in movies" :key="movie.id" class="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/6 p-1">
        <div class="bg-white rounded-lg shadow-md">
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
import { defineProps } from 'vue';

/* eslint-disable */
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

const getMoviePosterUrl = (posterPath) => {
  return posterPath 
    ? `https://image.tmdb.org/t/p/w500${posterPath}`
    : 'https://via.placeholder.com/500x750?text=No+Image';
};
</script>

<style scoped>
</style>
