<script lang="ts">
// Api
import { createQuiz } from '../../api/quiz'

// Store
import store from '../../store'

// Components
import Dialog from 'primevue/dialog'
import Button from 'primevue/button'
import InputText from 'primevue/inputtext'
import InputNumber from 'primevue/inputnumber'
import Calendar from 'primevue/calendar'
import Checkbox from 'primevue/checkbox'
import SelectButton from 'primevue/selectbutton'
import ProgressSpinner from 'primevue/progressspinner'

function initialState() {
  return {
    text: '',
    type: 'fill_in',
    order: 0,
    isRequired: false,
    options: [],
    correct_fill_in: '',
    optionText: '',
    submitting: false,
  }
}

export default {
  components: {
    Dialog,
    Button,
    InputText,
    InputNumber,
    Calendar,
    Checkbox,
    SelectButton,
    ProgressSpinner,
  },
  props: ['open'],
  emits: {
    close: null,
    refreshTable: null,
  },
  data: () => initialState(),
  methods: {
    resetState() {
      Object.assign(this.$data, initialState())
    },
    enterOption() {
      this.options.push({
        text: this.optionText,
        is_correct: false,
      })
    },
    saveQuestion() {
      this.submitting = true

      createQuiz({
        name: this.name,
        time_limit: this.duration,
        start_date: this.startDate,
        end_date: this.endDate,
        is_published: this.isPublish,
        use_points: this.usePoints,
        participation_method: this.method,
      })
        .then((response) => {
          console.log(response)

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

          if (response.status === 401) {
            store.setMessage({
              type: 'warn',
              text: response.data,
              open: true,
            })
          }
        })
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
      <h3 class="font-semibold text-lg">Асуулт үүсгэх</h3>
    </template>

    <div class="space-y-5">
      <div class="space-y-2">
        <label for=""><span class="text-red-500">*</span> Асуулт</label>
        <InputText type="text" v-model="text" class="w-full" />
      </div>
      <div class="space-y-2">
        <label for=""><span class="text-red-500">*</span> Дараалал</label>
        <InputNumber
          v-model="order"
          mode="decimal"
          :useGrouping="false"
          class="w-full"
        />
      </div>
      <div class="space-y-2">
        <label for=""><span class="text-red-500">*</span> Төрөл</label>
        <SelectButton
          v-model="type"
          class="w-full"
          :options="['fill_in', 'choice', 'multiple_choice']"
        />
      </div>
      <div v-if="type === 'fill_in'" class="space-y-2">
        <label for=""><span class="text-red-500">*</span> Зөв хариулт</label>
        <InputText type="text" v-model="correct_fill_in" class="w-full" />
      </div>
      <div v-else class="space-y-5">
        <form class="space-y-2" @submit.prevent="enterOption">
          <label for="">Сонголт оруулах</label>
          <InputText type="text" class="w-full" v-model="optionText" />
        </form>
        <div v-for="option in options" v-bind:key="option">
          <div class="bg-gray-200 p-2">{{ option.text }}</div>
        </div>
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
        @click="saveQuestion()"
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
