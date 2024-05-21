// MovieCardComponent.spec.js

import { mount } from '@vue/test-utils';
import MovieCard from '../../../main/components/MovieCardComponent.vue';
import { createStore } from 'vuex';

const store = createStore({
  state() {
    return {
      movies: {
        favorites: [],
        watched: [],
        watchLater: []
      }
    };
  }
});

describe('MovieCard.vue', () => {
  it('renders movie title and poster correctly', () => {
    const movie = { id: 1, title: 'Movie 1', poster_path: '/path1.jpg' };
    const wrapper = mount(MovieCard, {
      props: {
        movie: movie
      },
      global: {
        plugins: [store]
      }
    });

    expect(wrapper.find('.movie-title').text()).toBe(movie.title);
    expect(wrapper.find('.movie-poster').attributes('src')).toBe(`https://image.tmdb.org/t/p/w500${movie.poster_path}`);
  });
});
