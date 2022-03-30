import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import PrimeVue from 'primevue/config'

// CSS
import './assets/css/tailwind.css'
import 'primevue/resources/themes/saga-blue/theme.css' //theme
import 'primevue/resources/primevue.min.css' //core css
import 'primeicons/primeicons.css ' //core css

const app = createApp(App)

app.use(router)
app.use(PrimeVue, { ripple: true })

app.mount('#app')
