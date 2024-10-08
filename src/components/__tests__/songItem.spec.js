import { test, expect, describe } from 'vitest'
import SongItem from '@/components/SongItem.vue'
import { shallowMount, RouterLinkStub } from '@vue/test-utils' //Shallow pour éviter que tous les children soient montés

describe('SongItem.vue', () => {
  test('Render song.display_name', () => {
    const song = {
      display_name: 'test'
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
    const compositionAuthor = wrapper.find('.text-gray-500')
    expect(compositionAuthor.text()).toBe(song.display_name)
  })

  test('Render song.docID in id attribute', () => {
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
    expect(wrapper.attributes().id).toBe(`song-id-${song.docID}`)
  })
})
