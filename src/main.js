import { createApp } from 'vue'
import { createPinia } from 'pinia'
import router from './router'
import App from './App.vue'
import './assets/style.css'

// Clean up old localStorage keys from previous version
const cleanupOldLocalStorage = () => {
  const oldKeys = ['primaryColor', 'customAvatar', 'customBackground', 'dashboardLayout']
  oldKeys.forEach(key => {
    if (localStorage.getItem(key)) {
      localStorage.removeItem(key)
    }
  })
}

cleanupOldLocalStorage()

// Initialize theme color
const initializeThemeColor = () => {
  const savedColor = localStorage.getItem('primaryColor_v2') || '#bb0c0c'
  const hexToRgb = (hex) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null
  }
  
  const darkenRgb = (rgb, factor = 0.74) => {
    return {
      r: Math.round(rgb.r * factor),
      g: Math.round(rgb.g * factor),
      b: Math.round(rgb.b * factor)
    }
  }
  
  const rgb = hexToRgb(savedColor)
  if (rgb) {
    document.documentElement.style.setProperty('--color-primary-rgb', `${rgb.r} ${rgb.g} ${rgb.b}`)
    const darkRgb = darkenRgb(rgb)
    document.documentElement.style.setProperty('--color-primary-dark-rgb', `${darkRgb.r} ${darkRgb.g} ${darkRgb.b}`)
  }
}

initializeThemeColor()

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.use(router)
app.mount('#app')





