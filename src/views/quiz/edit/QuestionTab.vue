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
  data() {
    return {
      open: false,
      questions: [],
    }
  },
  watch: {
    questions() {
      console.log(this.questions)
    },
    questionsArray(newValue) {
      this.questions = newValue
    },
  },
  methods: {
    removeQuestion(question) {
      for (let i = 0; i < this.questions.length; i++) {
        if (this.questions[i] === question) {
          this.questions.splice(i, 1)

          if (this.questions.length > 1) {
            for (let index = i; index < this.questions.length; index++) {
              this.questions[index].order--
            }
          }
        }
      }
    },
    addNewQuestion() {
      let orderNumber = 0

      if (this.questions.length > 0) {
        orderNumber = this.questions[this.questions.length - 1].order + 1
      }

      this.questions.push({
        text: '',
        type: 'fill_in',
        options: [],
        order: orderNumber,
      })
    },
    print() {
      console.log(this.questions)
    },
  },
  mounted() {
    let el = document.getElementById('order-option')

    let that = this

    Sortable.create(el, {
      animation: 150,
      handle: '.question-handle',
      ghostClass: 'shadow-lg',
      swapThreshold: 0.4,
      onChange: function (evt) {
        let temp = that.questions[evt.oldIndex]

        that.questions.splice(evt.oldIndex, 1)
        that.questions.splice(evt.newIndex, 0, temp)
      },
    })
  },
}
</script>

<template>
  <div class="flex flex-col space-y-5">
    <button type="button" class="py-2 px-5 bg-red-500" @click="print">
      hewleh
    </button>
    <ul id="order-option" class="space-y-2">
      <QuestionCard
        v-for="question in questions"
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
