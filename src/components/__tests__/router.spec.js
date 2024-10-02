import { test, expect, describe } from 'vitest'
import SongItem from '@/components/SongItem.vue'
import { shallowMount, RouterLinkStub } from '@vue/test-utils' //Shallow pour éviter que tous les children soient montés

describe('Router', () => {
  test('Renders router-link', () => {
    const song = {
      docID: 'ABC'
    }
    const wrapper = shallowMount(SongItem, {
      propsData: {
        song
      },
      global: {
        components: {
          'router-link': RouterLinkStub
        }
      }
    })
    expect(wrapper.findComponent(RouterLinkStub).props().to).toEqual({
      name: 'song',
      params: { id: song.docID }
    })
  })
})
