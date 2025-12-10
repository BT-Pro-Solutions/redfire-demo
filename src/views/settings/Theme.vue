<template>
  <div>
    <div class="mb-6">
      <h1 class="text-3xl font-bold text-gray-900 mb-2">Theme Settings</h1>
      <p class="text-gray-600">Customize your dashboard appearance</p>
    </div>

    <div class="space-y-6">
      <!-- Profile Picture -->
      <div class="bg-white rounded-2xl border border-gray-100 p-6">
        <h2 class="text-xl font-bold text-gray-900 mb-4">Profile Picture</h2>
        <div class="flex items-center space-x-6">
          <div class="w-24 h-24 rounded-xl overflow-hidden border-2 border-gray-200">
            <img :src="previewAvatar" alt="Profile" class="w-full h-full object-cover" />
          </div>
          <div class="flex-1">
            <label class="block">
              <input 
                type="file" 
                @change="handleAvatarChange" 
                accept="image/*"
                class="hidden"
                ref="avatarInput"
              />
              <button 
                @click="$refs.avatarInput.click()"
                class="px-4 py-2 text-white rounded-xl transition hover:opacity-90"
                :style="`background-color: ${primaryColor}`"
              >
                Upload New Picture
              </button>
            </label>
            <p class="text-sm text-gray-500 mt-2">JPG, PNG or WEBP. Max 2MB.</p>
          </div>
        </div>
      </div>

      <!-- Background Image -->
      <div class="bg-white rounded-2xl border border-gray-100 p-6">
        <h2 class="text-xl font-bold text-gray-900 mb-4">Background Image</h2>
        <div class="flex items-center space-x-6">
          <div class="w-32 h-24 rounded-xl overflow-hidden border-2 border-gray-200">
            <img :src="previewBackground" alt="Background" class="w-full h-full object-cover" />
          </div>
          <div class="flex-1">
            <label class="block">
              <input 
                type="file" 
                @change="handleBackgroundChange" 
                accept="image/*"
                class="hidden"
                ref="bgInput"
              />
              <button 
                @click="$refs.bgInput.click()"
                class="px-4 py-2 text-white rounded-xl transition hover:opacity-90"
                :style="`background-color: ${primaryColor}`"
              >
                Upload New Background
              </button>
            </label>
            <p class="text-sm text-gray-500 mt-2">JPG, PNG, WEBP or AVIF. Max 5MB.</p>
          </div>
        </div>
      </div>

      <!-- Primary Color -->
      <div class="bg-white rounded-2xl border border-gray-100 p-6">
        <h2 class="text-xl font-bold text-gray-900 mb-4">Primary Color</h2>
        
        <!-- Live Preview -->
        <div class="mb-6 p-4 bg-gray-50 rounded-xl">
          <p class="text-sm font-medium text-gray-700 mb-3">Live Preview</p>
          <div class="flex flex-wrap gap-3">
            <button 
              class="px-4 py-2 text-white rounded-xl transition"
              :style="{ backgroundColor: primaryColor }"
            >
              Primary Button
            </button>
            <button 
              class="px-4 py-2 border-2 rounded-xl transition"
              :style="{ borderColor: primaryColor, color: primaryColor }"
            >
              Outlined Button
            </button>
            <div 
              class="w-10 h-10 rounded-xl"
              :style="{ backgroundColor: primaryColor }"
            ></div>
            <div class="flex items-center space-x-2">
              <div 
                class="w-1 h-8 rounded-full"
                :style="{ backgroundColor: primaryColor }"
              ></div>
              <span class="text-sm text-gray-600">Active Indicator</span>
            </div>
          </div>
        </div>
        
        <div class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Choose your primary color</label>
            <div class="flex items-center space-x-4">
              <input 
                type="color" 
                v-model="primaryColor"
                class="w-16 h-16 rounded-xl border-2 border-gray-200 cursor-pointer"
              />
              <div class="flex-1">
                <input 
                  type="text" 
                  v-model="primaryColor"
                  class="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                  placeholder="#3b82f6"
                />
              </div>
            </div>
          </div>
          
          <!-- Color Presets -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Or choose a preset</label>
            <div class="grid grid-cols-8 gap-3">
              <button
                v-for="color in colorPresets"
                :key="color.value"
                @click="primaryColor = color.value"
                :style="{ backgroundColor: color.value }"
                class="w-12 h-12 rounded-xl border-2 hover:scale-110 transition"
                :class="primaryColor === color.value ? 'border-gray-900 ring-2 ring-offset-2 ring-gray-900' : 'border-gray-200'"
                :title="color.name"
              ></button>
            </div>
          </div>
        </div>
      </div>

      <!-- Save Button -->
      <div class="flex justify-end space-x-3">
        <button 
          @click="resetToDefaults"
          class="px-6 py-3 text-gray-700 hover:bg-gray-100 rounded-xl transition"
        >
          Reset to Defaults
        </button>
        <button 
          @click="saveSettings"
          class="px-6 py-3 text-white rounded-xl transition hover:opacity-90"
          :style="`background-color: ${primaryColor}`"
        >
          Save Changes
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const avatarInput = ref(null)
const bgInput = ref(null)

const primaryColor = ref('#3b82f6')
const avatarFile = ref(null)
const backgroundFile = ref(null)

// Convert hex to RGB
const hexToRgb = (hex) => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null
}

// Apply color in real-time as user changes it
watch(primaryColor, (newColor) => {
  const rgb = hexToRgb(newColor)
  if (rgb) {
    document.documentElement.style.setProperty('--color-primary-rgb', `${rgb.r} ${rgb.g} ${rgb.b}`)
  }
})

const colorPresets = [
  { name: 'Blue', value: '#3b82f6' },
  { name: 'Sky', value: '#0ea5e9' },
  { name: 'Indigo', value: '#6366f1' },
  { name: 'Purple', value: '#8b5cf6' },
  { name: 'Pink', value: '#ec4899' },
  { name: 'Red', value: '#ef4444' },
  { name: 'Orange', value: '#f97316' },
  { name: 'Amber', value: '#f59e0b' },
  { name: 'Yellow', value: '#eab308' },
  { name: 'Lime', value: '#84cc16' },
  { name: 'Green', value: '#22c55e' },
  { name: 'Emerald', value: '#10b981' },
  { name: 'Teal', value: '#14b8a6' },
  { name: 'Cyan', value: '#06b6d4' },
  { name: 'Slate', value: '#64748b' },
  { name: 'Gray', value: '#6b7280' },
]

const previewAvatar = computed(() => {
  if (avatarFile.value) {
    return URL.createObjectURL(avatarFile.value)
  }
  return localStorage.getItem('customAvatar') || `${import.meta.env.BASE_URL}avatar.png`
})

const previewBackground = computed(() => {
  if (backgroundFile.value) {
    return URL.createObjectURL(backgroundFile.value)
  }
  return localStorage.getItem('customBackground') || `${import.meta.env.BASE_URL}bg.avif`
})

const handleAvatarChange = (event) => {
  const file = event.target.files[0]
  if (file && file.size <= 2 * 1024 * 1024) { // 2MB max
    avatarFile.value = file
  } else {
    alert('File size must be less than 2MB')
  }
}

const handleBackgroundChange = (event) => {
  const file = event.target.files[0]
  if (file && file.size <= 5 * 1024 * 1024) { // 5MB max
    backgroundFile.value = file
  } else {
    alert('File size must be less than 5MB')
  }
}

const saveSettings = async () => {
  // Save primary color
  localStorage.setItem('primaryColor', primaryColor.value)
  const rgb = hexToRgb(primaryColor.value)
  if (rgb) {
    document.documentElement.style.setProperty('--color-primary-rgb', `${rgb.r} ${rgb.g} ${rgb.b}`)
  }
  
  // Save avatar if changed
  if (avatarFile.value) {
    const reader = new FileReader()
    reader.onload = (e) => {
      localStorage.setItem('customAvatar', e.target.result)
      // Update demo data store avatar
      const user = JSON.parse(localStorage.getItem('user') || '{}')
      user.avatar = e.target.result
      localStorage.setItem('user', JSON.stringify(user))
      
      // Trigger re-render by updating the page
      window.location.reload()
    }
    reader.readAsDataURL(avatarFile.value)
  } else if (backgroundFile.value) {
    // Save background if changed
    const reader = new FileReader()
    reader.onload = (e) => {
      localStorage.setItem('customBackground', e.target.result)
      window.location.reload()
    }
    reader.readAsDataURL(backgroundFile.value)
  } else {
    // If only color changed, just navigate back
    router.push('/')
  }
}

const resetToDefaults = () => {
  if (confirm('Reset all theme settings to defaults?')) {
    localStorage.removeItem('primaryColor')
    localStorage.removeItem('customAvatar')
    localStorage.removeItem('customBackground')
    document.documentElement.style.removeProperty('--color-primary')
    
    primaryColor.value = '#3b82f6'
    avatarFile.value = null
    backgroundFile.value = null
    
    alert('Theme reset to defaults! Refresh the page to see changes.')
  }
}

onMounted(() => {
  // Load saved settings
  const savedColor = localStorage.getItem('primaryColor')
  if (savedColor) {
    primaryColor.value = savedColor
    const rgb = hexToRgb(savedColor)
    if (rgb) {
      document.documentElement.style.setProperty('--color-primary-rgb', `${rgb.r} ${rgb.g} ${rgb.b}`)
    }
  }
})
</script>

