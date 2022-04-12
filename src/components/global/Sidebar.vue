<script setup lang="ts">
// Vue Router
import { RouterLink } from 'vue-router'

// Components
import { QuestionMarkCircleIcon } from '@heroicons/vue/solid'
import { ViewGridIcon } from '@heroicons/vue/outline'
</script>

<template>
  <div class="h-screen sticky top-0 w-60 bg-white border-r border-gray-200">
    <RouterLink to="/">
      <div class="h-16 flex border-b border-gray-200">
        <div class="m-auto uppercase font-bold">quiz admin</div>
      </div>
    </RouterLink>
    <ul class="text-gray-600 p-3 flex flex-col space-y-2">
      <RouterLink to="/category" v-slot="{ isActive }">
        <li
          class="h-10 px-2 hover:bg-gray-200 transition flex space-x-2 rounded-lg font-semibold uppercase"
          :class="[
            isActive && 'bg-gradient-to-tr from-blue-400 to-sky-300 text-white',
          ]"
        >
          <ViewGridIcon class="h-4 w-4 my-auto" />
          <span class="my-auto"> Category </span>
        </li>
      </RouterLink>
      <RouterLink to="/quiz" v-slot="{ isActive }">
        <li
          class="h-10 px-2 hover:bg-gray-200 transition flex space-x-2 rounded-lg font-semibold uppercase"
          :class="[
            isActive && 'bg-gradient-to-tr from-blue-400 to-sky-300 text-white',
          ]"
        >
          <QuestionMarkCircleIcon class="h-4 w-4 my-auto" />
          <span class="my-auto"> Quiz </span>
        </li>
      </RouterLink>
    </ul>
  </div>
</template>
