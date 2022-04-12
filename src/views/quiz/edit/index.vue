<script setup lang="ts">
import { reactive, onBeforeMount } from 'vue'

// Vue Router
import { useRoute } from 'vue-router'

// Api
import { getSingleQuiz } from '../../../api/quiz'

// Prime Vue
import Button from 'primevue/button'

// Components
import { HomeIcon, QuestionMarkCircleIcon } from '@heroicons/vue/solid'

const route = useRoute()

let state = reactive({
  main: {
    name: '',
    startDate: '',
    endDate: '',
    duration: 0,
    method: 'Anonymous',
    isPublished: false,
    usePoints: false,
  },
  question: [],
})

function getSingleQuizData() {
  getSingleQuiz(<string>route.params.id)
    .then((response) => {
      if (response.status === 200) {
        let { data } = response

        state.main.name = data?.name
        state.main.startDate = data?.start_date
        state.main.endDate = data?.end_date
        state.main.duration = data?.time_limit_by_minutes
        state.main.method = data?.participation_method
        state.main.isPublished = data?.is_published
        state.main.usePoints = data?.use_points

        state.question = data?.questions
      }
    })
    .catch((error) => {
      console.log(error)
    })
}

function saveQuiz() {
  console.log(state)
}

onBeforeMount(() => {
  getSingleQuizData()
})
</script>

<template>
  <main class="h-full flex flex-col p-5">
    <div class="space-y-5">
      <div class="bg-white p-5 space-y-5 rounded-lg shadow-lg">
        <ul class="flex border-b border-blue-300">
          <router-link to="main" v-slot="{ isActive }">
            <li
              class="px-8 py-4 transition font-semibold text-sm flex space-x-2"
              :class="[
                isActive
                  ? 'border-b-2 border-blue-400 text-blue-400'
                  : 'text-gray-700 hover:border-b-2 hover:border-b-gray-300',
              ]"
            >
              <span>
                <HomeIcon class="h-5 w-5" />
              </span>
              <div>Дэлгэрэнгүй</div>
            </li>
          </router-link>
          <router-link to="question" v-slot="{ isActive }">
            <li
              class="px-8 py-4 transition font-semibold text-sm flex space-x-2"
              :class="[
                isActive
                  ? 'border-b-2 border-blue-400 text-blue-400'
                  : 'text-gray-700 hover:border-b-2 hover:border-b-gray-300',
              ]"
            >
              <QuestionMarkCircleIcon class="h-5 w-5" />
              <div>Асуулт</div>
            </li>
          </router-link>
        </ul>
        <router-view
          :main="state.main"
          :questionsArray="state.question"
          @get-data="getSingleQuizData"
        />
        <div class="flex flex-row-reverse">
          <Button label="Хадгалах" class="!ml-5" @click="saveQuiz" />
          <Button label="Цуцлах" class="p-button-outlined" />
        </div>
      </div>
    </div>
  </main>
</template>
