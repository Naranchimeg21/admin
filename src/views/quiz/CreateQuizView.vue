<script setup lang="ts">
import { reactive, onMounted } from 'vue'

// Vue Router
import { RouterLink } from 'vue-router'

// Api
import { getQuizByPagination } from '../../api/quiz'

// Components
import Button from 'primevue/button'
</script>

<template>
  <main class="h-full flex flex-col p-5">
    <div class="space-y-5"></div>
  </main>
</template>
