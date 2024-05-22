<template>
  <router-view />
</template>

<script>
import 'vue3-toastify/dist/index.css';
import { onMounted  } from 'vue';

export default {
  name: 'App',
  components: {
  }
}

onMounted(async () => {
  return process.env.VUE_APP_API_KEY;
})



</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
}
</style>
