import { test, expect, describe } from 'vitest'
import About from '@/views/AboutView.vue'
import { mount } from '@vue/test-utils' //Shallow pour éviter que tous les children soient montés

describe('About.vue', () => {
  test('Renders inner text', () => {
    const wrapper = mount(About)
    expect(wrapper.text()).toContain('about')
  })
})
