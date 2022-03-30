<script setup lang="ts">
import { reactive } from 'vue'

// Api
import { login } from '../api/auth'

// Store
import store from '../store'

// Utils
import { setAccessToken } from '../utils/cookie_helper'

// Components
import InputText from 'primevue/inputtext'
import Button from 'primevue/button'

let state = reactive({
  username: '',
  password: '',
  submitting: false,
})

function submitForm() {
  login(state.username, state.password)
    .then((response) => {
      state.submitting = false

      if (response.status) {
        let { data } = response

        setAccessToken(data.access_token)

        store.setIsUserLoggedIn(true)
      }
    })
    .catch((error) => {
      console.log(error)
    })
}
</script>

<template>
  <div class="flex h-screen">
    <form
      @submit.prevent="submitForm()"
      class="h-[400px] m-auto flex flex-col justify-between rounded-lg bg-gradient-to-tr from-blue-200 to-red-200 p-10 shadow-lg"
    >
      <div class="space-y-8">
        <span class="p-float-label">
          <InputText id="username" type="text" v-model="state.username" />
          <label for="username">Нэвтрэх нэр</label>
        </span>
        <span class="p-float-label">
          <InputText id="password" type="password" v-model="state.password" />
          <label for="password">Нууц үг</label>
        </span>
      </div>
      <Button
        type="submit"
        iconPos="right"
        class="flex"
        :class="{ '!bg-gray-500': state.submitting }"
        :disabled="state.submitting"
      >
        <svg
          v-if="state.submitting"
          class="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            class="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            stroke-width="4"
          ></circle>
          <path
            class="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
        <span class="m-auto"> Нэвтрэх </span>
      </Button>
    </form>
  </div>
</template>
