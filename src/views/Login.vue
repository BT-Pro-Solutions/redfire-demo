<template>
  <div class="min-h-screen bg-dark-bg flex flex-col items-center justify-center p-4 relative" 
  :style="{ backgroundImage: `url(${bgUrl})`, backgroundSize: 'cover', backgroundPosition: 'center' }">
  <div class="login-overlay"></div>
    <img src="/redfire-logo-white.png" alt="bg" width="200" class="relative z-10"><br>
    <!-- Login Box -->
    <div class="bg-white rounded-lg w-full max-w-md p-8 relative z-10">
      <!-- Logo/Title Area -->
      <div class="text-center mb-8">
        <div class="inline-flex items-center justify-center w-16 h-16 rounded-full mb-4" :style="{ backgroundColor: primaryColor }">
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
            class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:border-transparent outline-none transition"
            :style="{ '--tw-ring-color': primaryColor }"
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
            class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:border-transparent outline-none transition"
            :style="{ '--tw-ring-color': primaryColor }"
            placeholder="••••••••"
          />
        </div>

        <div class="flex items-center justify-between">
          <label class="flex items-center">
            <input
              type="checkbox"
              v-model="rememberMe"
              class="w-4 h-4 border-gray-300 rounded"
              :style="{ accentColor: primaryColor }"
            />
            <span class="ml-2 text-sm text-gray-700">Remember me</span>
          </label>
          <a href="#" class="text-sm hover:opacity-80 transition" :style="{ color: primaryColor }">
            Forgot password?
          </a>
        </div>

        <button
          type="submit"
          :style="{ backgroundColor: primaryColor }"
          class="w-full text-white font-semibold py-3 rounded-lg transition duration-200 shadow-lg hover:shadow-xl hover:brightness-75"
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

const bgUrl = computed(() => localStorage.getItem('customBackground_v2') || `${import.meta.env.BASE_URL}bg-4.png`)
const primaryColor = ref('#bb0c0c')

onMounted(() => {
  // Apply custom primary color if set, or use default
  const savedColor = localStorage.getItem('primaryColor_v2') || '#bb0c0c'
  primaryColor.value = savedColor
  
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
    const darkRgb = {
      r: Math.round(rgb.r * 0.74),
      g: Math.round(rgb.g * 0.74),
      b: Math.round(rgb.b * 0.74)
    }
    document.documentElement.style.setProperty('--color-primary-dark-rgb', `${darkRgb.r} ${darkRgb.g} ${darkRgb.b}`)
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



<style scoped>
@property --gradient-angle {
  syntax: '<angle>';
  initial-value: 0deg;
  inherits: false;
}

@keyframes rotate-gradient {
  0% {
    --gradient-angle: 0deg;
  }
  100% {
    --gradient-angle: 360deg;
  }
}

.login-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(var(--gradient-angle), black, #650a0a);
  opacity: 0.85;
  animation: rotate-gradient 20s linear infinite;
}
</style>