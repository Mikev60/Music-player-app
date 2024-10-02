import { test, expect, describe } from 'vitest'
import Home from '@/views/HomeView.vue'
import SongItem from '@/components/SongItem.vue'
import { shallowMount } from '@vue/test-utils' //Shallow pour éviter que tous les children soient montés

describe('Home.vue', () => {
  test('Renders list of songs', () => {
    const songs = [{}, {}, {}]
    const wrapper = shallowMount(Home, {
      data() {
        return {
          songs
        }
      }
    })

    const items = wrapper.findAllComponents(SongItem)
    expect(items).toHaveLength(songs.length)

    items.forEach((wrapper, i) => {
      expect(wrapper.props().song).toStrictEqual(songs[i])
    })
  })
})
