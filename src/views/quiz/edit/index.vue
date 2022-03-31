<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'

// Vue Router
import { useRoute } from 'vue-router'

// Api
import { getSingleQuiz } from '../../../api/quiz'

// Prime Vue
import Button from 'primevue/button'

// Components
import { HomeIcon, QuestionMarkCircleIcon } from '@heroicons/vue/solid'

const route = useRoute()

let activeIndex = ref(null)
let main = ref(null)
let question = ref(null)

onMounted(() => {
  getSingleQuiz(<string>route.params.id)
    .then((response) => {
      if (response.status === 200) {
        let { data } = response

        main.value = {
          name: data?.name,
          timeLimit: data?.time_limit,
          startDate: data?.start_date,
          endDate: data?.start_date,
          isPublished: data?.is_published,
          usePoints: data?.use_points,
          method: data?.participation_method,
        }
      }
    })
    .catch((error) => {
      console.log(error)
    })
})

watch(main, () => {
  console.log(main, 'lalriin main')
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
              <div>main</div>
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
              <div>question</div>
            </li>
          </router-link>
        </ul>
        <router-view :main="main" />
        <div class="flex flex-row-reverse">
          <Button label="Хадгалах" class="!ml-5" />
          <Button label="Цуцлах" class="p-button-outlined" />
        </div>
      </div>
    </div>
  </main>
</template>
