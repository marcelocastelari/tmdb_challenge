import { mount } from '@vue/test-utils'
import ComponentLoading from '../../../main/components/LoadingComponent.vue'

describe('ComponentLoading', () => {
  it('should validate default props', () => {
    const wrapper = mount(ComponentLoading)
    const { vm } = wrapper

    expect(vm.$options.name).toBe('ComponentLoading')
    expect(vm.height).toBe('5vh')
    expect(vm.backgroundColor).toBe('#fff')
    expect(vm.spinnerColor).toBe('#facc15')
    expect(vm.spinnerColorSecondary).toBe('rgba(0, 0, 0, 0.2)')
    expect(vm.spinnerSize).toBe('2.375rem')
    expect(vm.spinnerWeight).toBe('5px')
  })

  it('should validate customStyle correctly', () => {
    const wrapper = mount(ComponentLoading, {
      propsData: {
        height: '200px',
        backgroundColor: '#fff'
      },
    })

    expect(wrapper.vm.customStyle).toBe(`background-color: #fff;height: 200px;`)
  })

  it('should validate spinnerCustomStyle correctly', () => {
    const wrapper = mount(ComponentLoading, {
      propsData: {
       spinnerColorSecondary: '#000',
       spinnerColor: '#000',
       spinnerWeight: '4px',
       spinnerSize: '1.5rem'
      },
    })

    expect(wrapper.vm.spinnerCustomStyle).toBe('border-color: #000;border-top-color: #000;border-width: 4px;height: 1.5rem;width: 1.5rem;')
  })
})