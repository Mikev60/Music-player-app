import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/HomeView.vue'
import About from '@/views/AboutView.vue'
import Manage from '@/views/ManageView.vue'
import useUserStore from '@/stores/user'
import Song from '@/components/Song.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/about',
    component: About,
    name: 'about'
  },
  {
    path: '/manage-music',
    alias: '/manage', // Pareil que redirection (dessous)
    component: Manage,
    name: 'manage',
    meta: {
      requiresAuth: true
    }
  },
  {
    name: 'song',
    path: '/song/:id',
    component: Song
  },
  {
    // Redirection example
    /*path: '/manage',
    redirect: { name: 'manage' }*/
  },
  {
    path: '/:catchAll(.*)*',
    redirect: { name: 'home' }
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  linkExactActiveClass: 'text-yellow-500'
})

router.beforeEach((to, from, next) => {
  if (!to.meta.requiresAuth) {
    next()
    return
  }

  //Car on a pas accès avant, on utilise le store comme fonction
  const store = useUserStore()
  if (store.userLoggedIn) {
    next()
    return
  } else {
    next({ name: 'home' })
  }
})

export default router
