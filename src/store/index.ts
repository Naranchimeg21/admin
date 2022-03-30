import { reactive } from 'vue'

const store = reactive({
  isUserLoggedIn: false,
  setIsUserLoggedIn(value: boolean) {
    this.isUserLoggedIn = value
  },
})

export default store
