<script setup lang="ts">
import { onMounted } from 'vue'

// Prime Vue
import InputText from 'primevue/inputtext'
import InputNumber from 'primevue/inputnumber'
import Calendar from 'primevue/calendar'
import SelectButton from 'primevue/selectbutton'
import Checkbox from 'primevue/checkbox'

const props = defineProps({
  main: Object,
})

onMounted(() => {
  console.log(props.main)
})
</script>

<template>
  <div class="grid grid-cols-2 gap-5 grid-rows-1">
    <div class="space-y-5">
      <div class="flex flex-col space-y-4">
        <label><span class="text-red-500">*</span> Нэр</label>
        <InputText type="text" class="flex-grow" />
      </div>
      <div class="flex flex-col space-y-4">
        <label><span class="text-red-500">*</span> Эхлэх огноо</label>
        <Calendar :showTime="true" :showSeconds="true" class="w-full" />
      </div>
      <div class="flex flex-col space-y-4">
        <label><span class="text-red-500">*</span> Дуусах огноо</label>
        <Calendar :showTime="true" :showSeconds="true" class="w-full" />
      </div>
    </div>
    <div class="space-y-5">
      <div class="flex flex-col space-y-4">
        <label><span class="text-red-500">*</span> Үргэлжлэх хугацаа</label>
        <InputNumber type="text" class="flex-grow" />
      </div>
      <div class="flex flex-col space-y-4">
        <label><span class="text-red-500">*</span> Оролцооны арга</label>
        <SelectButton
          class="w-full"
          :options="['Аnonymous', 'Single use link']"
        />
      </div>
      <div class="grid grid-cols-2 gap-5 pt-12">
        <div class="field-checkbox space-x-2">
          <Checkbox id="isPublish" :binary="true" />
          <label for="isPublish">Нийтлэх эсэх</label>
        </div>
        <div class="field-checkbox space-x-2">
          <Checkbox id="isPublish" :binary="true" />
          <label for="isPublish">Оноотой эсэх</label>
        </div>
      </div>
    </div>
  </div>
</template>
