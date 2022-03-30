<script setup lang="ts">
// Vue Router
import { RouterLink } from 'vue-router'
</script>

<template>
  <div class="h-screen sticky top-0 w-60 bg-gray-500">
    <RouterLink to="/">
      <div class="h-16 bg-gray-800 text-white flex">
        <div class="m-auto uppercase font-bold">quiz admin</div>
      </div>
    </RouterLink>
    <ul class="text-white">
      <RouterLink to="/quiz">
        <li class="p-3 hover:bg-gray-400 transition">Category</li>
      </RouterLink>
      <RouterLink to="/quiz">
        <li class="p-3 hover:bg-gray-400 transition">Quiz</li>
      </RouterLink>
    </ul>
  </div>
</template>
