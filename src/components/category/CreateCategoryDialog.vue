<script setup lang="ts">
import { reactive } from 'vue'

// Api
import { createQuiz } from '../../api/quiz'

// Components
import Dialog from 'primevue/dialog'
import Button from 'primevue/button'
import InputText from 'primevue/inputtext'
import InputNumber from 'primevue/inputnumber'
import Calendar from 'primevue/calendar'
import Checkbox from 'primevue/checkbox'
import SelectButton from 'primevue/selectbutton'
import ProgressSpinner from 'primevue/progressspinner'
import { stat } from 'fs/promises'

defineProps({
  open: Boolean,
})

const initialState = {
  name: '',
  startDate: '',
  endDate: '',
  duration: 0,
  isPublish: false,
  usePoints: false,
  method: 'Аnonymous',
  submitting: false,
}

let state = reactive({ ...initialState })

function resetState() {
  Object.assign(state, initialState)
}

function saveQuiz() {
  state.submitting = true

  createQuiz({
    name: state.name,
    time_limit: state.duration,
    start_date: state.startDate,
    end_date: state.endDate,
    is_published: state.isPublish,
    use_points: state.usePoints,
    participation_method: state.method,
  })
    .then((response) => {
      console.log(response)

      resetState()
    })
    .catch((error) => {
      console.log(error)
    })
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
        <InputText type="text" v-model="state.name" class="w-full" />
      </div>
      <div class="space-y-2">
        <label for=""><span class="text-red-500">*</span> Эхлэх огноо</label>
        <Calendar
          v-model="state.startDate"
          :showTime="true"
          :showSeconds="true"
          class="w-full"
        />
      </div>
      <div class="space-y-2">
        <label for=""><span class="text-red-500">*</span> Дуусах огноо</label>
        <Calendar
          v-model="state.endDate"
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
          v-model="state.duration"
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
          v-model="state.method"
          class="w-full"
          :options="['Аnonymous', 'Single use link']"
        />
      </div>
      <div class="flex space-x-5">
        <div class="field-checkbox space-x-2">
          <Checkbox id="isPublish" v-model="state.isPublish" :binary="true" />
          <label for="isPublish">Нийтлэх эсэх</label>
        </div>
        <div class="field-checkbox space-x-2">
          <Checkbox id="isPublish" v-model="state.usePoints" :binary="true" />
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
        @click=";[saveQuiz(), $emit('close'), $emit('refreshTable')]"
        autofocus
        :disabled="state.submitting"
        class="space-x-2"
      >
        <ProgressSpinner v-if="state.submitting" class="h-[20px] w-[20px]" />
        <span>Хадгалах</span>
      </Button>
    </template>
  </Dialog>
</template>
