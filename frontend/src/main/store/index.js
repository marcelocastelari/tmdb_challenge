import { createStore } from 'vuex';
import user from './user';
import movies from './movies';

export default createStore({
  modules: {
    user,
    movies
  }
});
