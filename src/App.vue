<script setup lang="ts">
import { onMounted } from 'vue'

// Vue Router
import { RouterLink, RouterView } from 'vue-router'

// Store
import store from './store'

// Utils
import { checkAcessTokenIsExpired } from './utils/jwt_helper'
import { getAccessToken } from './utils/cookie_helper'

// Components
import Navbar from './components/global/Navbar.vue'
import Sidebar from './components/global/Sidebar.vue'
import LoginView from './views/LoginView.vue'

onMounted(() => {
  store.setIsUserLoggedIn(checkAcessTokenIsExpired(<string>getAccessToken()))
})
</script>

<template>
  <div v-if="store.isUserLoggedIn" class="flex">
    <Sidebar />
    <div class="relative flex-grow">
      <Navbar />
      <div>
        <RouterView />
      </div>
    </div>
  </div>
  <LoginView v-else />
</template>
