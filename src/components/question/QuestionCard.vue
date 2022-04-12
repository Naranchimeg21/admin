<script setup lang="ts">
import { ref } from 'vue'

// Prime Vue
import Button from 'primevue/button'
import Textarea from 'primevue/textarea'
import InputSwitch from 'primevue/inputswitch'
import Checkbox from 'primevue/checkbox'
import InputText from 'primevue/inputtext'

// Headless UI
import {
  Listbox,
  ListboxLabel,
  ListboxButton,
  ListboxOptions,
  ListboxOption,
  Switch,
} from '@headlessui/vue'

// Hero icon
import {
  CheckIcon,
  ChevronDownIcon,
  DotsHorizontalIcon,
} from '@heroicons/vue/solid'

let props = defineProps({
  question: Object,
})

const questionTypes = ['fill_in', 'choice', 'multiple_choice']

const enabled = ref(true)

function addNewOption() {
  let question = props.question

  if (question.options && question.options.length > 0) {
    let lastOrder = question.options[question.options.length - 1].order

    question.options.push({
      text: '',
      image: '',
      is_correct: false,
      points: 0,
      order: lastOrder + 1,
    })
  } else {
    question.options = [
      {
        text: '',
        image: '',
        is_correct: false,
        points: 0,
        order: 1,
      },
    ]
  }
}

function removeOption(option) {
  for (let i = 0; i < props.question.options.length; i++) {
    if (props.question.options[i] === option) {
      props.question.options.splice(i, 1)

      if (props.question.options.length > 1) {
        for (let index = i; index < props.question.options.length; index++) {
          props.question.options[index].order--
        }
      }
    }
  }
}
</script>

<template>
  <li
    class="w-full max-w-[800px] mx-auto rounded-lg border border-gray-200 border-l-4 border-l-blue-400"
  >
    <div class="flex justify-center">
      <DotsHorizontalIcon class="h-6 w-6 cursor-grab question-handle" />
    </div>
    <div class="p-4 space-y-5 divide-y">
      <div class="grid grid-cols-8 gap-5">
        <div class="col-span-5">
          <Textarea
            :autoResize="true"
            rows="1"
            placeholder="Асуулт"
            cols="30"
            class="w-full"
            v-model="question.text"
          />
        </div>
        <div class="col-span-3">
          <Listbox v-model="question.type">
            <div class="relative">
              <ListboxButton
                class="relative w-full px-2 h-[42px] text-left rounded border cursor-default focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-75 focus-visible:ring-white focus-visible:ring-offset-orange-300 focus-visible:ring-offset-2 focus-visible:border-indigo-500 sm:text-sm"
              >
                <span class="block truncate">{{ question.type }}</span>
                <span
                  class="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none"
                >
                  <ChevronDownIcon
                    class="w-5 h-5 text-gray-400"
                    aria-hidden="true"
                  />
                </span>
              </ListboxButton>

              <transition
                leave-active-class="transition duration-100 ease-in"
                leave-from-class="opacity-100"
                leave-to-class="opacity-0"
              >
                <ListboxOptions
                  class="absolute w-full py-1 mt-1 z-10 overflow-auto text-base bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
                >
                  <ListboxOption
                    v-slot="{ active, selected }"
                    v-for="questionType in questionTypes"
                    :key="questionType"
                    :value="questionType"
                    as="template"
                  >
                    <li
                      :class="[
                        active
                          ? 'text-amber-900 bg-amber-100'
                          : 'text-gray-900',
                        'cursor-default select-none relative py-2 pl-10 pr-4',
                      ]"
                    >
                      <span
                        :class="[
                          selected ? 'font-medium' : 'font-normal',
                          'block truncate',
                        ]"
                        >{{ questionType }}</span
                      >
                      <span
                        v-if="selected"
                        class="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600"
                      >
                        <CheckIcon class="w-5 h-5" aria-hidden="true" />
                      </span>
                    </li>
                  </ListboxOption>
                </ListboxOptions>
              </transition>
            </div>
          </Listbox>
        </div>
        <div class="col-span-8">
          <div
            v-if="question.type === 'fill_in'"
            class="py-2 px-4 select-none border-b w-full max-w-[400px] text-gray-600"
          >
            Текст оруулах
          </div>
          <div
            v-else-if="question.type === 'choice'"
            class="py-2 px-4 space-y-5"
          >
            <div
              v-for="option in question.options"
              v-bind:key="option"
              class="flex space-x-5"
            >
              <div class="p-inputgroup">
                <span class="p-inputgroup-addon">
                  <Checkbox disabled />
                </span>
                <InputText placeholder="Сонголт" v-model="option.text" />
              </div>
              <div class="my-auto">
                <Button
                  icon="pi pi-times"
                  class="p-button-rounded p-button-danger p-button-text"
                  @click="removeOption(option)"
                />
              </div>
            </div>
            <Button
              @click="addNewOption"
              label="Сонголт нэмэх"
              icon="pi pi-plus"
              iconPos="left"
            />
          </div>
        </div>
      </div>
      <div class="flex justify-end flex-row space-x-5 pt-4">
        <div class="flex my-auto space-x-4">
          <span class="my-auto h-7 text-center">Шаардалгатай эсэх</span>
          <Switch
            v-model="enabled"
            :class="enabled ? 'bg-blue-500' : 'bg-gray-400'"
            class="relative inline-flex flex-shrink-0 h-[18px] w-[34px] my-auto border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
          >
            <span class="sr-only">Use setting</span>
            <span
              aria-hidden="true"
              :class="enabled ? 'translate-x-4' : 'translate-x-0'"
              class="pointer-events-none inline-block h-[14px] w-[14px] rounded-full bg-white shadow-lg transform ring-0 transition ease-in-out duration-200"
            />
          </Switch>
        </div>
        <Button
          icon="pi pi-trash"
          class="p-button-rounded p-button-text p-button-plain"
          @click="$emit('removeQuestion', question)"
        />
      </div>
    </div>
  </li>
</template>
