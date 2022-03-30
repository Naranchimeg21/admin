<script setup lang="ts">
// Vue Router
import { RouterLink } from 'vue-router'

// Components
import AvatarVue from '../Avatar.vue'
</script>

<template>
  <header
    class="bg-white flex justify-between px-5 sticky top-0 w-full z-10 h-16 shadow-lg"
  >
    <ul class="flex space-x-5 font-semibold h-full">
      <li class="my-auto">
        <RouterLink to="/">Dashboard</RouterLink>
      </li>
    </ul>
    <ul class="h-full flex space-x-5 font-semibold">
      <li class="my-auto text-black">
        <AvatarVue />
      </li>
    </ul>
  </header>
</template>
