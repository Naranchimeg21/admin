<script setup lang="ts">
import { ref, watch } from 'vue'

// Components
import Dialog from 'primevue/dialog'
import Button from 'primevue/button'
import ProgressSpinner from 'primevue/progressspinner'

const props = defineProps({
  open: Boolean,
  title: String,
  paragraph: String,
})

const submitting = ref(false)
</script>

<template>
  <Dialog
    v-model:visible="open"
    :modal="true"
    :closable="false"
    class="w-full max-w-[500px]"
  >
    <template #header>
      <h3 class="font-semibold text-lg">{{ title }}</h3>
    </template>

    <div>{{ paragraph }}</div>

    <template #footer class="mt-5">
      <Button
        label="Үгүй"
        @click="$emit('close')"
        icon="pi pi-times"
        class="p-button-text !text-red-400 !border !border-red-400 !rounded"
      />
      <Button
        @click=";[$emit('submit', quizId), (submitting = true)]"
        class="space-x-2"
      >
        <ProgressSpinner v-if="submitting" class="h-[20px] w-[20px]" />
        <span>Тийм</span>
      </Button>
    </template>
  </Dialog>
</template>
