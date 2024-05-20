<template>
  <div>
    <HeaderComponent />
    <main>
      <div class=" bg-neutral-900 flex flex-col items-center justify-center h-full">
          <div class="px-4 md:px-5">
            <div class="max-w-6xl mx-auto text-center text-yellow-500">
              <h1 class="text-3xl md:text-6xl font-black tracking-tight">Encontre seu filme favorito</h1>
              <div class="flex mx-auto items-center mt-10">
                <span class="relative inline-block mx-auto w-2/3">
                  <input
                    v-model="query"
                    type="text"
                    class="rounded border outline-none border-gray-300 px-2 py-4 w-full pl-10 md:pl-12 pr-10 md:pr-12"
                    placeholder="Digite o filme desejado"
                  />
                  <div class="absolute inset-y-0 left-0 md:flex items-center pl-2 mt-14 md:mt-1">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-gray-400" aria-hidden="true" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-width="1" d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14"/>
                    </svg>
                  </div>
                  <div class="md:absolute md:inset-y-0 md:right-0 md:flex items-center md:pr-2">
                    <button @click="searchMovies" class="w-full inline-flex items-center justify-center focus:outline-none transition ease-in-out duration-1000 hover:duration-300 font-semibold rounded-lg text-neutral-800 bg-yellow-500 hover:bg-yellow-500 hover:shadow-lg hover:shadow-yellow-500/50 text-base px-4 h-10">
                      Buscar
                    </button>
                  </div>
                </span>
              </div>
            </div>
          </div>
        </div>
      <div class="md:py-20 bg-neutral-900 overflow-y-auto">
        <h1 class="flex justify-center text-3xl text-yellow-400 font-semibold my-8">Seus Filmes</h1>
        <MovieSlider title="Favoritos" :movies="favoriteMovies" @movie-clicked="openModal" />
        <MovieSlider title="Assistir Mais Tarde" :movies="watchLaterMovies" @movie-clicked="openModal" />
        <MovieSlider title="Assistidos" :movies="watchedMovies" @movie-clicked="openModal" />
      </div>
    </main>

    <div v-if="showModal" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div class="bg-white p-6 rounded-lg w-3/4 max-w-4xl relative modal-content"> <!-- Aumentei para w-3/4 max-w-4xl -->
        <button @click="closeModal" class="absolute top-2 right-2 bg-yellow-500 text-black font-bold rounded-full w-8 h-8 flex items-center justify-center modal-close-button">x</button>
        <div class="flex flex-col">
          <div class="flex mb-4">
            <div class="w-1/3">
              <img :src="getMoviePosterUrl(selectedMovie.poster_path)" alt="Movie Poster" class="w-full h-auto rounded-lg p-2 object-cover movie-poster" />
            </div>
            <div class="w-2/3 pl-4">
              <h2 class="text-2xl font-bold mb-4">{{ selectedMovie.title }}</h2>
              <MovieDetailComponent label="Diretor:" :value="selectedMovie.director" />
              <MovieDetailComponent label="Sinopse:" :value="selectedMovie.overview" />
              <MovieDetailComponent label="Duração:" :value="`${selectedMovie.runtime} minutos`" />
              <MovieDetailComponent label="Ano de Lançamento:" :value="selectedMovie.release_year" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import HeaderComponent from '@/components/HeaderComponent.vue';
import MovieSlider from '@/components/MovieSliderComponent.vue';
import MovieDetailComponent from '@/components/MovieDetailComponent.vue'

const store = useStore();
const router = useRouter();
const query = ref('')
const favoriteMovies = computed(() => store.getters['movies/getFavorites']);
const watchLaterMovies = computed(() => store.getters['movies/getWatchLater']);
const watchedMovies = computed(() => store.getters['movies/getWatched']);

const showModal = ref(false);
const selectedMovie = ref(null);

const openModal = (movie) => {
  selectedMovie.value = movie;
  showModal.value = true;
};

const closeModal = () => {
  showModal.value = false;
  selectedMovie.value = null;
};

const getMoviePosterUrl = (posterPath) => {
  return posterPath 
    ? `https://image.tmdb.org/t/p/w500${posterPath}`
    : 'https://via.placeholder.com/500x750?text=No+Image';
};

const getMoviesByList = async () => {
  await store.dispatch('movies/getMoviesByList');
};

const searchMovies = async () => {
  await store.dispatch('movies/fetchMovies', query.value);
  router.push({ path: '/feed' });
};

onMounted(() => {
  getMoviesByList();
});
</script>

<style scoped>
.modal-content {
  width: 75%;
  max-width: 1024px;
}

.modal-close-button {
  position: absolute;
  top: 8px;
  right: 8px;
  background-color: #fbbf24;
  color: #000;
  border-radius: 50%;
  padding: 4px 8px;
  transition: background-color 0.3s ease;
}

.modal-close-button:hover {
  background-color: #e0a800;
}

.movie-poster {
  width: 100%;
  height: auto;
  border-radius: 8px;
  padding: 8px;
  object-cover: cover;
}
</style>
