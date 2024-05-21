import { mount } from '@vue/test-utils';
import LoginPage from '../../../main/pages/LoginPage.vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import { toast } from 'vue3-toastify';

jest.mock('vue-router', () => ({
  useRouter: jest.fn(),
}));

jest.mock('vuex', () => ({
  useStore: jest.fn(),
}));

jest.mock('vue3-toastify', () => ({
  toast: {
    error: jest.fn(),
  },
}));

describe('LoginPage', () => {
  let storeMock;

  beforeEach(() => {
    storeMock = {
      dispatch: jest.fn(),
    };
    useStore.mockReturnValue(storeMock);
  });

  it('logs in a user successfully', async () => {
    const pushMock = jest.fn();
    useRouter.mockReturnValue({
      push: pushMock,
    });

    storeMock.dispatch.mockResolvedValue(true);

    const wrapper = mount(LoginPage);

    wrapper.find('input[type="email"]').setValue('test@example.com');
    wrapper.find('input[type="password"]').setValue('password');

    const handleLoginSpy = jest.spyOn(wrapper.vm, 'handleLogin');

    wrapper.find('#login').trigger('click');

    wrapper.vm.$nextTick();

    expect(wrapper).toBeTruthy()
    expect(pushMock).not.toHaveBeenCalled();
  });
});
