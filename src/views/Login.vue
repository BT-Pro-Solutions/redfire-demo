<template>
  <div class="login-container" 
  :style="{ backgroundImage: `url(${bgUrl})`, backgroundSize: 'cover', backgroundPosition: 'center' }">
    <!-- Dark overlay -->
    <div class="overlay"></div>
    
    <!-- Login Box -->
    <div class="login-box">
      <!-- Logo/Title Area -->
      <div class="header">
        <div class="logo">
          <Icon icon="mdi:storefront" class="logo-icon" />
        </div>
        <h1 class="title">TestCorp Demo</h1>
        <p class="subtitle">E-Commerce Reporting Platform</p>
      </div>

      <!-- Login Form -->
      <form @submit.prevent="handleLogin" class="login-form">
        <div class="form-group">
          <label for="email" class="label">
            Email
          </label>
          <input
            id="email"
            v-model="email"
            type="email"
            required
            class="input"
            placeholder="demo@redfire.com"
          />
        </div>

        <div class="form-group">
          <label for="password" class="label">
            Password
          </label>
          <input
            id="password"
            v-model="password"
            type="password"
            required
            class="input"
            placeholder="••••••••"
          />
        </div>

        <div class="form-options">
          <label class="checkbox-label">
            <input
              type="checkbox"
              v-model="rememberMe"
              class="checkbox"
            />
            <span class="checkbox-text">Remember me</span>
          </label>
          <a href="#" class="forgot-link">
            Forgot password?
          </a>
        </div>

        <button
          type="submit"
          class="submit-button"
        >
          Sign In
        </button>
      </form>

      <!-- Demo Credentials Hint -->
      <div class="demo-hint">
        <p class="demo-text">
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

const bgUrl = computed(() => localStorage.getItem('customBackground') || `${import.meta.env.BASE_URL}bg.avif`)

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

<style scoped>
.login-container {
  min-height: 100vh;
  background-color: var(--color-dark-bg);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  position: relative;
}

.overlay {
  position: absolute;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.4);
}

.login-box {
  background-color: white;
  border-radius: 0.5rem;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  width: 100%;
  max-width: 28rem;
  padding: 2rem;
  position: relative;
  z-index: 10;
}

.header {
  text-align: center;
  margin-bottom: 2rem;
}

.logo {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 4rem;
  height: 4rem;
  background-color: rgb(var(--color-primary-rgb));
  border-radius: 9999px;
  margin-bottom: 1rem;
}

.logo-icon {
  font-size: 1.875rem;
  color: white;
}

.title {
  font-size: 1.875rem;
  font-weight: 700;
  color: var(--gray-900);
  margin-bottom: 0.5rem;
}

.subtitle {
  color: var(--gray-600);
}

.login-form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.form-group {
  display: flex;
  flex-direction: column;
}

.label {
  display: block;
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--gray-700);
  margin-bottom: 0.5rem;
}

.input {
  width: 100%;
  padding: 0.75rem 1rem;
  border: 1px solid var(--gray-300);
  border-radius: 0.5rem;
  outline: none;
  transition: all 0.15s ease-in-out;
}

.input:focus {
  ring: 2px solid rgb(var(--color-primary-rgb));
  border-color: transparent;
  box-shadow: 0 0 0 2px rgb(var(--color-primary-rgb) / 0.2);
}

.form-options {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.checkbox-label {
  display: flex;
  align-items: center;
  cursor: pointer;
}

.checkbox {
  width: 1rem;
  height: 1rem;
  color: rgb(var(--color-primary-rgb));
  border: 1px solid var(--gray-300);
  border-radius: 0.25rem;
  cursor: pointer;
}

.checkbox:focus {
  box-shadow: 0 0 0 2px rgb(var(--color-primary-rgb) / 0.2);
}

.checkbox-text {
  margin-left: 0.5rem;
  font-size: 0.875rem;
  color: var(--gray-700);
}

.forgot-link {
  font-size: 0.875rem;
  color: rgb(var(--color-primary-rgb));
  text-decoration: none;
}

.forgot-link:hover {
  color: var(--color-primary-dark);
}

.submit-button {
  width: 100%;
  background-color: rgb(var(--color-primary-rgb));
  color: white;
  font-weight: 600;
  padding: 0.75rem;
  border-radius: 0.5rem;
  transition: all 0.2s ease-in-out;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
  border: none;
  cursor: pointer;
}

.submit-button:hover {
  background-color: var(--color-primary-dark);
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
}

.demo-hint {
  margin-top: 1.5rem;
  padding: 1rem;
  background-color: var(--blue-50);
  border-radius: 0.5rem;
  border: 1px solid var(--blue-200);
}

.demo-text {
  font-size: 0.875rem;
  color: var(--blue-800);
  text-align: center;
}
</style>
