

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import 'tailwindcss/tailwind.css'; // Importa Tailwind CSS aquí

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
