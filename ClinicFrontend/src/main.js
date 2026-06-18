import { createApp } from 'vue'
import App from './App.vue'

// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import '@mdi/font/css/materialdesignicons.css'

// Pinia
import { createPinia } from 'pinia'

const customDarkTheme = {
  dark: true,
  colors: {
    background: '#0F172A', // Slate 900
    surface: '#1E293B',    // Slate 800
    primary: '#38BDF8',    // Sky 400
    secondary: '#818CF8',  // Indigo 400
    success: '#34D399',    // Emerald 400
    warning: '#FBBF24',    // Amber 400
    error: '#F87171',      // Red 400
    info: '#60A5FA',       // Blue 400
  }
}

const vuetify = createVuetify({
  components,
  directives,
  theme: {
    defaultTheme: 'customDarkTheme',
    themes: {
      customDarkTheme
    }
  }
})

const app = createApp(App)
app.use(createPinia())
app.use(vuetify)
app.mount('#app')
