<template>
  <header>
    <div class="fixed top-0 w-full z-10 px-4 md:px-5 bg-neutral-800 text-white drop-shadow-md">
      <div class="flex items-center justify-between h-16">
        <div>Movies Finder</div>
        <div class="flex items-center">
          <div class="items-center space-x-4 hidden sm:flex">
              <button @click="handleButtonClick" class="inline-flex items-center justify-center focus:outline-none transition ease-in-out duration-1000 hover:duration-300 font-semibold rounded-lg text-neutral-800 bg-yellow-500 hover:bg-yellow-500 hover:shadow-lg hover:shadow-yellow-500/50 text-base px-4 h-10">
                <i :class="iconClass"></i>
              </button>
              <button @click="logout" class="text-sm text-white font-bold hover:underline">Sair</button>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
import { computed } from 'vue';
import { useStore } from 'vuex';
import { useRouter, useRoute } from 'vue-router';

const store = useStore();
const router = useRouter();
const route = useRoute();

const iconClass = computed(() => {
  return route.path === '/user' ? 'fas fa-search' : 'fas fa-user';
});

const handleButtonClick = () => {
  if (route.path === '/user') {
    search();
  } else {
    goToUser();
  }
};

const logout = () => {
  store.dispatch('user/logout');
  router.push('/');
}

const search = () => {
  router.push('/feed')
}

const goToUser = () => {
  router.push('/user');
}
</script>

<style scoped>
</style>
