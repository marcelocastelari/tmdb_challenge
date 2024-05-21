import { mount } from '@vue/test-utils';
import MovieDetailComponent from '../../../main/components/MovieDetailComponent.vue';

describe('MovieDetailComponent.vue', () => {
  it('renders label and value correctly when value is provided', () => {
    const label = 'Title';
    const value = 'Inception';
    const wrapper = mount(MovieDetailComponent, {
      props: {
        label,
        value
      }
    });

    expect(wrapper.text()).toContain(label);
    expect(wrapper.text()).toContain(value);
  });

});
