<template>
  <app-header></app-header>

  <router-view>

  </router-view>

  <player></player>
  <app-auth></app-auth>
</template>

<script>
import AppHeader from "@/components/AppHeader.vue"
import AppAuth from "@/components/AppAuth.vue"
import Player from "./components/Player.vue";
import { mapWritableState } from "pinia";
import useUserStore from '@/stores/user'
import { auth } from '@/includes/firebase'
export default {
  name: 'App',
  components: {
    AppHeader,
    AppAuth,
    Player
  },
  computed: {
    ...mapWritableState(useUserStore, ['userLoggedIn'])
  },
  created() {
    if (auth.currentUser) {
      this.userLoggedIn = true
    }
  }
}
</script>

<style>
.fade-enter-from {
  opacity: 0
}

.fade-enter-active {
  transition: all 0.5s linear;
}

.fade-leave-to {
  transition: all 0.5s linear;
  opacity: 0
}
</style>