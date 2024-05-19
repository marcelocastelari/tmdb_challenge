<template>
  <div>
    <HeaderComponent />
    <main>
      <div class="md:py-20 bg-neutral-900 overflow-y-auto">
        <h1 class="flex justify-center text-3xl text-yellow-400 font-semibold my-8">Seus Filmes</h1>
        <MovieSlider title="Favoritos" :movies="favoriteMovies" />
        <MovieSlider title="Assistir Mais Tarde" :movies="watchLaterMovies" />
        <MovieSlider title="Assistidos" :movies="watchedMovies" />
      </div>
    </main>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useStore } from 'vuex';
import HeaderComponent from '@/components/HeaderComponent.vue';
import MovieSlider from '@/components/MovieSliderComponent.vue';

const store = useStore();

const favoriteMovies = computed(() => store.getters['movies/getFavorites']);
const watchLaterMovies = computed(() => store.getters['movies/getWatchLater']);
const watchedMovies = computed(() => store.getters['movies/getWatched']);
</script>

<style scoped>
</style>
