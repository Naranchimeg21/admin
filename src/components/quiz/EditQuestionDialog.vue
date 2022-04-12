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
    name: '',
    startDate: '',
    endDate: '',
    duration: 0,
    isPublish: false,
    usePoints: false,
    method: 'Аnonymous',
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
    saveQuiz() {
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
      <h3 class="font-semibold text-lg">Асуулга үүсгэх</h3>
    </template>

    <div class="space-y-5">
      <div class="space-y-2">
        <label for=""><span class="text-red-500">*</span> Нэр</label>
        <InputText type="text" v-model="name" class="w-full" />
      </div>
      <div class="space-y-2">
        <label for=""><span class="text-red-500">*</span> Эхлэх огноо</label>
        <Calendar
          v-model="startDate"
          :showTime="true"
          :showSeconds="true"
          class="w-full"
        />
      </div>
      <div class="space-y-2">
        <label for=""><span class="text-red-500">*</span> Дуусах огноо</label>
        <Calendar
          v-model="endDate"
          :showTime="true"
          :showSeconds="true"
          class="w-full"
        />
      </div>
      <div class="space-y-2">
        <label for="">
          <span class="text-red-500">*</span> Үргэлжлэх хугацаа
          <span class="text-gray-400">/зөвхөн тоо оруулна уу!/</span></label
        >
        <InputNumber
          v-model="duration"
          mode="decimal"
          :useGrouping="false"
          class="w-full"
        />
      </div>
      <div class="space-y-2">
        <label for=""
          ><span class="text-red-500">*</span> Оролцооны арга
        </label>
        <SelectButton
          v-model="method"
          class="w-full"
          :options="['Аnonymous', 'Single use link']"
        />
      </div>
      <div class="flex space-x-5">
        <div class="field-checkbox space-x-2">
          <Checkbox id="isPublish" v-model="isPublish" :binary="true" />
          <label for="isPublish">Нийтлэх эсэх</label>
        </div>
        <div class="field-checkbox space-x-2">
          <Checkbox id="isPublish" v-model="usePoints" :binary="true" />
          <label for="isPublish">Оноотой эсэх</label>
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
        @click="saveQuiz()"
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
