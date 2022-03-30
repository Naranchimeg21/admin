<script setup lang="ts">
import { reactive } from 'vue'
import Dialog from 'primevue/dialog'
import Button from 'primevue/button'

const state = reactive({
  open: false,
})
</script>

<template>
  <main class="h-full flex">
    <Dialog v-model:visible="state.open" :modal="true">
      <template #header>
        <h3>Header</h3>
      </template>

      Content

      <template #footer>
        <Button
          label="No"
          @click="state.open = false"
          icon="pi pi-times"
          class="p-button-text"
        />
        <Button label="Yes" icon="pi pi-check" autofocus />
      </template>
    </Dialog>
    <button
      type="button"
      @click="state.open = true"
      class="py-2 px-5 rounded bg-blue-400 font-semibold uppercase m-auto text-white"
    >
      Open
    </button>
  </main>
</template>
