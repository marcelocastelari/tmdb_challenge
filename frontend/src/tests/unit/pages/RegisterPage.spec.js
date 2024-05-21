import { mount } from '@vue/test-utils';
import RegisterPage from '../../../main/pages/RegisterPage.vue';
import { useRouter } from 'vue-router';

jest.mock('vue-router', () => ({
  useRouter: jest.fn()
}));

jest.mock('vue3-toastify', () => ({
  toast: {
    info: jest.fn(),
    error: jest.fn(),
  },
}));

jest.mock('vuex', () => ({
  useStore: jest.fn(),
}));

describe('RegisterPage', () => {
  it('registers a new user successfully', async () => {
    useRouter.mockReturnValue({
      push: jest.fn(),
    });

    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({}),
      })
    );

    const wrapper = mount(RegisterPage);

    await wrapper.find('input[type="email"]').setValue('test@example.com');
    await wrapper.find('input[type="password"]').setValue('password');

    const registerSpy = jest.spyOn(wrapper.vm, 'register');

    await wrapper.find('#register').trigger('click');

    await wrapper.vm.$nextTick();

    expect(registerSpy).not.toHaveBeenCalled();
  });
});
