import { shallowMount } from '@vue/test-utils';

import HeaderComponent from '../../../main/components/HeaderComponent.vue';
import { createStore } from 'vuex';
import { useRouter, useRoute } from 'vue-router';

jest.mock('vue-router', () => ({
  useRouter: jest.fn(),
  useRoute: jest.fn()
}));

describe('HeaderComponent.vue', () => {
  let store;
  let routerMock;
  let routeMock;

  beforeEach(() => {
    store = createStore({
      actions: {
        'user/logout': jest.fn()
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

  it('renders the component correctly', () => {
    const wrapper = shallowMount(HeaderComponent, {
      global: {
        plugins: [store]
      }
    });

    expect(wrapper.find('header').exists()).toBe(true);
    expect(wrapper.find('div').text()).toContain('Movies Finder');
  });

  it('renders correct icon based on route /user', async () => {
    routeMock.path = '/user';
    const wrapper = shallowMount(HeaderComponent, {
      global: {
        plugins: [store]
      }
    });

    expect(wrapper.find('i').classes()).toContain('fa-search');

  });

  it('renders correct icon based on route /feed', async () => {
    routeMock.path = '/feed';
    const wrapper = shallowMount(HeaderComponent, {
      global: {
        plugins: [store]
      }
    });

    expect(wrapper.find('i').classes()).toEqual(["fas", "fa-user"]);
  });

});
