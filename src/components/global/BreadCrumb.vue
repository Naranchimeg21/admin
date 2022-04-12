<script setup lang="ts">
import { reactive, watch } from 'vue'

// Vue Router
import { useRoute } from 'vue-router'

// Prime Vue
import Breadcrumb from 'primevue/breadcrumb'

const route = useRoute()

const state = reactive({
  items: [],
})

watch(route, () => {
  state.items = []

  switch (route.name) {
    case 'home':
      state.items = []
      break
    case 'category':
      state.items = [{ label: 'Ангилал' }]
      break
    case 'quiz':
      state.items = [{ label: 'Асуулга' }]
      break
    case 'quiz_main':
      state.items = [{ label: 'Асуулга' }, { label: 'Дэлгэрэнгүй' }]
      break
    case 'quiz_question':
      state.items = [{ label: 'Асуулга' }, { label: 'Асуулт' }]
      break
  }
})
</script>

<template>
  <div class="p-5">
    <Breadcrumb
      class="!border-none !rounded-lg"
      :home="{ icon: 'pi pi-home', to: '/' }"
      :model="state.items"
    />
  </div>
</template>
