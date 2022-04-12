<script lang="ts">
import { reactive, nextTick, watch, computed, onMounted } from 'vue'

// Sortable
import Sortable from 'sortablejs'

// Prime Vue
import Button from 'primevue/button'
import Textarea from 'primevue/textarea'

// Headless UI
import { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/vue'

// Hero icon
import { ChevronDownIcon } from '@heroicons/vue/solid'

// Components
import QuestionCard from '../../../components/question/QuestionCard.vue'

export default {
  components: {
    QuestionCard,
  },
  props: ['questionsArray'],
  data: () => ({
    open: false,
    questions: [],
  }),
  watch: {
    questionsArray(newValue) {
      this.questions = newValue
    },
  },
  methods: {
    removeQuestion(question) {
      for (let i = 0; i < state.questions.length; i++) {
        if (state.questions[i] === question) {
          state.questions.splice(i, 1)

          if (state.questions.length > 1) {
            for (let index = i; index < state.questions.length; index++) {
              state.questions[index].order--
            }
          }
        }
      }
    },
    addNewQuestion() {
      let lastOrder = state.questions[state.questions.length - 1].order

      state.questions.push({
        text: '',
        type: 'fill_in',
        options: [],
        order: lastOrder + 1,
      })
    },
  },
  mounted: () => {
    let el = document.getElementById('order-option')

    Sortable.create(el, {
      animation: 150,
      handle: '.question-handle',
      ghostClass: 'shadow-lg',
      swapThreshold: 0.4,
      onChange: function (evt) {
        let temp = state.questions[evt.oldIndex]

        state.questions.splice(evt.oldIndex, 1)
        state.questions.splice(evt.newIndex, 0, temp)
      },
    })
  },
}

// const orderedQuestions = computed(() => {
//   return state.questions.sort((a, b) => {
//     if (a.order < b.order) return -1
//     if (a.order > b.order) return 1
//     return 0
//   })
// })
</script>

<template>
  <div class="flex flex-col space-y-5">
    <ul id="order-option" class="space-y-2">
      <QuestionCard
        v-for="question in orderedQuestions"
        v-bind:key="question"
        :question="question"
        @remove-question="removeQuestion"
      />
    </ul>
    <button
      type="button"
      class="p-4 mx-auto w-full max-w-[800px] border uppercase rounded hover:text-white hover:bg-blue-400 transition"
      @click="addNewQuestion"
    >
      Асуулт нэмэх
    </button>
  </div>
</template>
