import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

// Global styles (phải import trước Vuetify để có thể override)
import './style.css'

// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import '@mdi/font/css/materialdesignicons.css'

// Pinia
import { createPinia } from 'pinia'

const customLightTheme = {
  dark: false,
  colors: {
    background: '#f8fafc',
    surface: '#FFFFFF',
    primary: '#1274e3',
    'primary-darken-1': '#1c49c6',
    secondary: '#64748b',
    'secondary-darken-1': '#475569',
    success: '#15803d',
    'success-darken-1': '#166534',
    warning: '#fff3cd',
    'warning-darken-1': '#fef08a',
    error: '#ff0019',
    'error-darken-1': '#b91c1c',
    info: '#1274e3',
  }
}

const vuetify = createVuetify({
  components,
  directives,
  theme: {
    defaultTheme: 'customLightTheme',
    themes: {
      customLightTheme
    }
  }
})

const app = createApp(App)
app.use(createPinia())
app.use(router)
app.use(vuetify)
app.mount('#app')
