<script setup lang="ts">
// Prime Vue
import InputText from 'primevue/inputtext'

// Components
import AvatarVue from '../Avatar.vue'
</script>

<template>
  <header
    class="bg-white flex justify-between px-5 sticky top-0 w-full z-10 h-16 border-b border-gray-200"
  >
    <ul class="flex space-x-5 font-semibold h-full">
      <li class="my-auto">
        <span class="p-input-icon-left">
          <i class="pi pi-search" />
          <InputText type="text" placeholder="Search" class="!border-none" />
        </span>
      </li>
    </ul>
    <ul class="h-full flex space-x-5 font-semibold">
      <li class="my-auto text-black">
        <AvatarVue />
      </li>
    </ul>
  </header>
</template>
