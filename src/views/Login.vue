<template>
  <div class="min-h-screen bg-dark-bg flex flex-col items-center justify-center p-4 relative" 
  :style="{ backgroundImage: `url(${bgUrl})`, backgroundSize: 'cover', backgroundPosition: 'center' }">
    <img src="/redfire-logo-white.png" alt="bg" class="" width="200"><br>
    <!-- Login Box -->
    <div class="bg-white rounded-lg w-full max-w-md p-8 relative z-10">
      <!-- Logo/Title Area -->
      <div class="text-center mb-8">
        <div class="inline-flex items-center justify-center w-16 h-16 bg-primary rounded-full mb-4">
          <Icon icon="mdi:storefront" class="text-3xl text-white" />
        </div>
        <h1 class="text-3xl font-bold text-gray-900 mb-2">TestCorp Demo</h1>
        <p class="text-gray-600">E-Commerce Reporting Platform</p>
      </div>

      <!-- Login Form -->
      <form @submit.prevent="handleLogin" class="space-y-6">
        <div>
          <label for="email" class="block text-sm font-medium text-gray-700 mb-2">
            Email
          </label>
          <input
            id="email"
            v-model="email"
            type="email"
            required
            class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition"
            placeholder="demo@redfire.com"
          />
        </div>

        <div>
          <label for="password" class="block text-sm font-medium text-gray-700 mb-2">
            Password
          </label>
          <input
            id="password"
            v-model="password"
            type="password"
            required
            class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition"
            placeholder="••••••••"
          />
        </div>

        <div class="flex items-center justify-between">
          <label class="flex items-center">
            <input
              type="checkbox"
              v-model="rememberMe"
              class="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
            />
            <span class="ml-2 text-sm text-gray-700">Remember me</span>
          </label>
          <a href="#" class="text-sm text-primary hover:text-primary-dark">
            Forgot password?
          </a>
        </div>

        <button
          type="submit"
          class="w-full bg-primary hover:bg-primary-dark text-white font-semibold py-3 rounded-lg transition duration-200 shadow-lg hover:shadow-xl"
        >
          Sign In
        </button>
      </form>

      <!-- Demo Credentials Hint -->
      <div class="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
        <p class="text-sm text-blue-800 text-center">
          <strong>Demo:</strong> Any email/password will work
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { Icon } from '@iconify/vue'

const router = useRouter()
const email = ref('demo@redfire.com')
const password = ref('saldkfja;lskdfjslakf')
const rememberMe = ref(false)

const bgUrl = computed(() => localStorage.getItem('customBackground') || `${import.meta.env.BASE_URL}bg-2.png`)

onMounted(() => {
  // Apply custom primary color if set
  const savedColor = localStorage.getItem('primaryColor')
  if (savedColor) {
    const hexToRgb = (hex) => {
      const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
      return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
      } : null
    }
    const rgb = hexToRgb(savedColor)
    if (rgb) {
      document.documentElement.style.setProperty('--color-primary-rgb', `${rgb.r} ${rgb.g} ${rgb.b}`)
    }
  }
})

const handleLogin = () => {
  // Demo login - just store a user object
  const user = {
    email: email.value,
    name: 'Sarah Mitchell',
    role: 'Admin'
  }
  
  localStorage.setItem('user', JSON.stringify(user))
  router.push('/')
}
</script>



