<script setup lang="ts">
import { onMounted, watch } from 'vue'

// Vue Router
import { RouterView } from 'vue-router'

// Store
import store from './store'

// Utils
import { checkAcessTokenIsExpired } from './utils/jwt_helper'
import { getAccessToken } from './utils/cookie_helper'

// Prime Vue
import Message from 'primevue/message'

// Components
import Navbar from './components/global/Navbar.vue'
import Sidebar from './components/global/Sidebar.vue'
import Breadcrumb from './components/global/BreadCrumb.vue'

// Views
import LoginView from './views/LoginView.vue'

onMounted(() => {
  store.setIsUserLoggedIn(checkAcessTokenIsExpired(<string>getAccessToken()))
})

watch(
  () => store.message.open,
  () => {
    if (store.message.open) {
      setTimeout(() => (store.message.open = false), 10000)
    }
  }
)
</script>

<template>
  <div class="relative flex justify-center">
    <Message
      v-show="store.message.open"
      v-on:close="store.message.open = false"
      class="absolute z-30"
      :severity="store.message.type"
    >
      <div class="px-5">{{ store.message.text }}</div>
    </Message>
  </div>
  <div v-if="store.isUserLoggedIn" class="flex">
    <Sidebar />
    <div class="relative flex-grow">
      <Navbar />
      <Breadcrumb />
      <div>
        <RouterView />
      </div>
    </div>
  </div>
  <LoginView v-else />
</template>
