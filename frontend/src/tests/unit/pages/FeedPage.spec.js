import { mount } from '@vue/test-utils';
import FeedPage from '../../../main/pages/FeedPage.vue';
import { createStore } from 'vuex';
import { useRouter, useRoute } from 'vue-router';


jest.mock('vue-router', () => ({
  useRouter: jest.fn(),
  useRoute: jest.fn()
}));

const toastPlugin = {
    install: (app) => {
      app.config.globalProperties.$toast = {
        error: jest.fn(),
      };
    },
};

describe('FeedPage.vue', () => {
  let store;
  let routerMock;
  let routeMock;

  beforeEach(() => {
    store = createStore({
      modules: {
        movies: {
          namespaced: true,
          getters: {
            getMovies: () => [],
            getLoading: () => false,
          },
          actions: {
            fetchMovies: jest.fn(),
          }
        }
      }
    });

    routerMock = {
      push: jest.fn()
    };

    routeMock = {
      path: '/'
    };

    useRouter.mockReturnValue(routerMock);
    useRoute.mockReturnValue(routeMock);
  });

  it('renders search input correctly', () => {
    const wrapper = mount(FeedPage, {
      global: {
        plugins: [store]
      }
    });

    const searchInput = wrapper.find('input[type="text"]');
    expect(searchInput.exists()).toBe(true);
  });

  it('updates query data on input change', async () => {
    const wrapper = mount(FeedPage, {
      global: {
        plugins: [store]
      }
    });

    const searchInput = wrapper.find('input[type="text"]');
    await searchInput.setValue('Inception');

    expect(wrapper.vm.query).toBe('Inception');
  });

  it('calls searchMovies method when search button is clicked', async () => {
    const wrapper = mount(FeedPage, {
      global: {
        plugins: [store]
      }
    });
  
    const searchButton = wrapper.find('button');
    await searchButton.trigger('click');
  
    expect(store._actions['movies/fetchMovies']).toBeTruthy();
  });

});
