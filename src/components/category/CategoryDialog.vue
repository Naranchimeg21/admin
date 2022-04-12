<script lang="ts">
// Api
import { createCategory, updateCategory } from '../../api/category'

// Store
import store from '../../store'

// Components
import Dialog from 'primevue/dialog'
import Button from 'primevue/button'
import InputText from 'primevue/inputtext'
import ProgressSpinner from 'primevue/progressspinner'

function initialState() {
  return {
    name: '',
    submitting: false,
  }
}

export default {
  components: {
    Dialog,
    Button,
    InputText,
    ProgressSpinner,
  },
  props: ['open', 'category'],
  data: () => initialState(),
  emits: ['close', 'refreshTable'],
  methods: {
    resetState() {
      Object.assign(this.$data, initialState())
    },
    saveCategory() {
      this.submitting = true

      createCategory({
        name: this.name,
      })
        .then((response) => {
          if (response.status === 200) {
            let { data } = response

            store.setMessage({
              type: 'success',
              text: data,
              open: true,
            })
          }

          this.resetState()

          this.$emit('close')

          this.$emit('refreshTable')
        })
        .catch((error) => {
          let { response } = error

          if (response.status === 403) {
            store.setMessage({
              type: 'warn',
              text: response.data,
              open: true,
            })
          }
        })
    },
    updateCategory() {
      this.submitting = true

      updateCategory(this.category._id, this.name)
        .then((response) => {
          if (response.status === 200) {
            store.setMessage({
              type: 'success',
              text: response.data,
              open: true,
            })
          }

          this.resetState()

          this.$emit('close')

          this.$emit('refreshTable')
        })
        .catch((error) => {
          let { response } = error

          if (response.status === 403) {
            store.setMessage({
              type: 'warn',
              text: response.data,
              open: true,
            })
          }
        })
    },
  },
  watch: {
    category(newValue) {
      this.name = newValue.name
    },
  },
}
</script>

<template>
  <Dialog
    v-model:visible="open"
    :modal="true"
    :closable="false"
    class="w-full max-w-[500px]"
  >
    <template #header>
      <h3 class="font-semibold text-lg">Асуулга үүсгэх</h3>
    </template>

    <div class="space-y-5">
      <div class="space-y-2">
        <label for=""><span class="text-red-500">*</span> Нэр</label>
        <InputText type="text" v-model="name" class="w-full" />
      </div>
    </div>

    <template #footer class="mt-5">
      <Button
        label="Цуцлах"
        @click=";[resetState(), $emit('close')]"
        icon="pi pi-times"
        class="p-button-text !text-red-400 !border !border-red-400 !rounded"
      />
      <Button
        v-if="category"
        @click="updateCategory"
        autofocus
        :disabled="submitting"
        class="space-x-2"
      >
        <ProgressSpinner v-if="submitting" class="h-[20px] w-[20px]" />
        <span>Хадгалах</span>
      </Button>
      <Button
        v-else
        @click="saveCategory"
        autofocus
        :disabled="submitting"
        class="space-x-2"
      >
        <ProgressSpinner v-if="submitting" class="h-[20px] w-[20px]" />
        <span>Хадгалах</span>
      </Button>
    </template>
  </Dialog>
</template>
