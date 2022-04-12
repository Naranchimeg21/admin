<script setup lang="ts">
// Vue Router
import { RouterLink } from 'vue-router'

// Components
import { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/vue'
import { PencilAltIcon, TrashIcon, MenuIcon } from '@heroicons/vue/solid'

const props = defineProps({
  quizId: String,
})
</script>

<template>
  <div>
    <Menu as="div" class="relative inline-block text-left">
      <div>
        <MenuButton
          class="inline-flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-blue-400 rounded-md hover:bg-blue-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
        >
          <MenuIcon
            class="w-5 h-5 text-violet-200 hover:text-violet-100"
            aria-hidden="true"
          />
        </MenuButton>
      </div>

      <transition
        enter-active-class="transition duration-100 ease-out"
        enter-from-class="transform scale-95 opacity-0"
        enter-to-class="transform scale-100 opacity-100"
        leave-active-class="transition duration-75 ease-in"
        leave-from-class="transform scale-100 opacity-100"
        leave-to-class="transform scale-95 opacity-0"
      >
        <MenuItems
          class="absolute z-50 right-0 w-56 mt-2 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
        >
          <div class="px-1 py-1">
            <MenuItem v-slot="{ active }">
              <RouterLink :to="`/quiz/edit/` + quizId">
                <button
                  :class="[
                    active ? 'bg-violet-500 text-white' : 'text-gray-900',
                    'group flex rounded-md items-center w-full px-2 py-2 text-sm',
                  ]"
                >
                  <PencilAltIcon
                    :active="active"
                    class="w-5 h-5 mr-2 text-violet-400"
                    aria-hidden="true"
                  />
                  Засах
                </button>
              </RouterLink>
            </MenuItem>
            <MenuItem v-slot="{ active }">
              <button
                :class="[
                  active ? 'bg-violet-500 text-white' : 'text-gray-900',
                  'group flex rounded-md items-center w-full px-2 py-2 text-sm',
                ]"
                @click="$emit('confirmDelete', quizId)"
              >
                <TrashIcon
                  :active="active"
                  class="w-5 h-5 mr-2 text-violet-400"
                  aria-hidden="true"
                />
                Устгах
              </button>
            </MenuItem>
          </div>
        </MenuItems>
      </transition>
    </Menu>
  </div>
</template>
