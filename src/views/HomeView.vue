<script setup lang="ts">
import { ref } from 'vue'

const chartData = ref({
  labels: ['A', 'B', 'C'],
  datasets: [
    {
      data: [300, 50, 100],
      backgroundColor: ['#42A5F5', '#66BB6A', '#FFA726'],
      hoverBackgroundColor: ['#64B5F6', '#81C784', '#FFB74D'],
    },
  ],
})

const lightOptions = ref({
  plugins: {
    legend: {
      labels: {
        color: '#495057',
      },
    },
  },
})
</script>

<template>
  <main class="w-full flex flex-col p-5">
    <div class="bg-white">this is dashboard</div>
  </main>
</template>
