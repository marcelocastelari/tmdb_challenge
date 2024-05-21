<template>
  <div>
    <HeaderComponent />
    <main>
      <div class="h-screen min-h-screen flex flex-col md:py-20 bg-neutral-900 overflow-y-auto">
        <div class="flex flex-col items-center justify-center h-full">
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
                    <button id="searchButton" @click="searchMovies" class="w-full inline-flex items-center justify-center focus:outline-none transition ease-in-out duration-1000 hover:duration-300 font-semibold rounded-lg text-neutral-800 bg-yellow-500 hover:bg-yellow-500 hover:shadow-lg hover:shadow-yellow-500/50 text-base px-4 h-10">
                      Buscar
                    </button>
                  </div>
                </span>
              </div>
            </div>
          </div>
        </div>
        <div v-if="loading" class="text-center text-white mt-10">
          <LoadingComponent backgroundColor="" />
        </div>
        <div v-else-if="movies.length" class="movies-grid mt-10 flex flex-wrap">
          <MovieCard v-for="movie in movies" :key="movie.id" :movie="movie" />
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useStore } from 'vuex';
import HeaderComponent from '../components/HeaderComponent.vue';
import MovieCard from '../components/MovieCardComponent.vue';
import LoadingComponent from '../components/LoadingComponent.vue';
import { toast } from 'vue3-toastify'


const query = ref('');
const store = useStore();
const movies = computed(() => store.getters['movies/getMovies']);
const loading = computed(() => store.getters['movies/getLoading']);

const searchMovies = async () => {
  await store.dispatch('movies/fetchMovies', query.value);

  if (movies.value.length === 0) {
    toast.error('Nenhum filme encontrado.', { autoClose: 3000 });
  }

}
</script>

<style scoped>
.movies-grid {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  padding: 20px;
}
</style>
