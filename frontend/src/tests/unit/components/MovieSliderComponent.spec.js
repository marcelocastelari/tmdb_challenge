import { mount } from '@vue/test-utils';
import MovieList from '../../../main/components/MovieSliderComponent.vue';

describe('MovieList.vue', () => {
    
  const createComponent = (props) => {
    return mount(MovieList, {
      props,
    });
  };

  it('renders title correctly', () => {
    const title = 'Favorite Movies';
    const wrapper = createComponent({ title, movies: [] });

    expect(wrapper.find('h2').text()).toBe(title);
  });

  it('shows message when no movies are added', () => {
    const wrapper = createComponent({ title: 'No Movies', movies: [] });

    expect(wrapper.find('p').text()).toBe('Ainda não foi adicionado nenhum filme.');
  });

  it('renders movies correctly', () => {
    const movies = [
      { id: 1, title: 'Movie 1', poster_path: '/path1.jpg' },
    ];
    const wrapper = createComponent({ title: 'Movies List', movies });

    const movieElements = wrapper.findAll('div > div > div');

    movies.forEach((movie, index) => {
      const movieElement = movieElements.at(index);
      expect(movieElement.find('h3').text()).toBe(movie.title);
      expect(movieElement.find('img').attributes('src')).toBe(`https://image.tmdb.org/t/p/w500${movie.poster_path}`);
    });
  });

  it('handles movie click correctly', async () => {
    const movies = [{ id: 1, title: 'Movie 1', poster_path: '/path1.jpg' }];
    const wrapper = createComponent({ title: 'Movies List', movies });

    await wrapper.find('img').trigger('click');

    expect(wrapper.emitted('movie-clicked')).toBeTruthy();
    expect(wrapper.emitted('movie-clicked')[0]).toEqual([movies[0]]);
  });
});
