import { reactive } from 'vue'

// Interfaces
interface MessageType {
  type: string
  text: string
  open: boolean
}

const store = reactive({
  isUserLoggedIn: false,
  setIsUserLoggedIn(value: boolean) {
    this.isUserLoggedIn = value
  },
  message: {
    type: '',
    text: '',
    open: false,
  },
  setMessage(value: MessageType) {
    this.message = value
  },
})

export default store
