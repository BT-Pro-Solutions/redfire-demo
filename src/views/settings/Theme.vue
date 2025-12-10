<template>
  <div>
    <div class="page-header">
      <h1 class="page-title">Theme Settings</h1>
      <p class="page-subtitle">Customize your dashboard appearance</p>
    </div>

    <div class="settings-grid">
      <!-- Profile Picture -->
      <div class="setting-card">
        <h2 class="card-title">Profile Picture</h2>
        <div class="avatar-section">
          <div class="avatar-preview">
            <img :src="previewAvatar" alt="Profile" class="avatar-image" />
          </div>
          <div class="avatar-controls">
            <label>
              <input 
                type="file" 
                @change="handleAvatarChange" 
                accept="image/*"
                class="file-input"
                ref="avatarInput"
              />
              <button 
                @click="$refs.avatarInput.click()"
                class="upload-button"
                :style="`background-color: ${primaryColor}`"
              >
                Upload New Picture
              </button>
            </label>
            <p class="upload-hint">JPG, PNG or WEBP. Max 2MB.</p>
          </div>
        </div>
      </div>

      <!-- Background Image -->
      <div class="setting-card">
        <h2 class="card-title">Background Image</h2>
        <div class="avatar-section">
          <div class="background-preview">
            <img :src="previewBackground" alt="Background" class="background-image" />
          </div>
          <div class="avatar-controls">
            <label>
              <input 
                type="file" 
                @change="handleBackgroundChange" 
                accept="image/*"
                class="file-input"
                ref="bgInput"
              />
              <button 
                @click="$refs.bgInput.click()"
                class="upload-button"
                :style="`background-color: ${primaryColor}`"
              >
                Upload New Background
              </button>
            </label>
            <p class="upload-hint">JPG, PNG, WEBP or AVIF. Max 5MB.</p>
          </div>
        </div>
      </div>

      <!-- Primary Color -->
      <div class="setting-card">
        <h2 class="card-title">Primary Color</h2>
        
        <!-- Live Preview -->
        <div class="preview-section">
          <p class="preview-label">Live Preview</p>
          <div class="preview-items">
            <button 
              class="preview-button"
              :style="{ backgroundColor: primaryColor }"
            >
              Primary Button
            </button>
            <button 
              class="preview-button-outlined"
              :style="{ borderColor: primaryColor, color: primaryColor }"
            >
              Outlined Button
            </button>
            <div 
              class="preview-box"
              :style="{ backgroundColor: primaryColor }"
            ></div>
            <div class="preview-indicator">
              <div 
                class="indicator-bar"
                :style="{ backgroundColor: primaryColor }"
              ></div>
              <span class="indicator-text">Active Indicator</span>
            </div>
          </div>
        </div>
        
        <div class="color-settings">
          <div class="color-picker-section">
            <label class="color-label">Choose your primary color</label>
            <div class="color-picker-container">
              <input 
                type="color" 
                v-model="primaryColor"
                class="color-picker"
              />
              <div class="color-input-wrapper">
                <input 
                  type="text" 
                  v-model="primaryColor"
                  class="color-text-input"
                  placeholder="#3b82f6"
                />
              </div>
            </div>
          </div>
          
          <!-- Color Presets -->
          <div>
            <label class="color-label">Or choose a preset</label>
            <div class="preset-grid">
              <button
                v-for="color in colorPresets"
                :key="color.value"
                @click="primaryColor = color.value"
                :style="{ backgroundColor: color.value }"
                class="preset-button"
                :class="{ 'preset-active': primaryColor === color.value }"
                :title="color.name"
              ></button>
            </div>
          </div>
        </div>
      </div>

      <!-- Save Button -->
      <div class="action-buttons">
        <button 
          @click="resetToDefaults"
          class="reset-button"
        >
          Reset to Defaults
        </button>
        <button 
          @click="saveSettings"
          class="save-button"
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

<style scoped>
.page-header {
  margin-bottom: 1.5rem;
}

.page-title {
  font-size: 1.875rem;
  font-weight: 700;
  color: var(--gray-900);
  margin-bottom: 0.5rem;
}

.page-subtitle {
  color: var(--gray-600);
}

.settings-grid {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.setting-card {
  background-color: white;
  border-radius: 1rem;
  border: 1px solid var(--gray-100);
  padding: 1.5rem;
}

.card-title {
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--gray-900);
  margin-bottom: 1rem;
}

.avatar-section {
  display: flex;
  align-items: center;
  gap: 1.5rem;
}

.avatar-preview {
  width: 6rem;
  height: 6rem;
  border-radius: 0.75rem;
  overflow: hidden;
  border: 2px solid var(--gray-200);
}

.avatar-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.background-preview {
  width: 8rem;
  height: 6rem;
  border-radius: 0.75rem;
  overflow: hidden;
  border: 2px solid var(--gray-200);
}

.background-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.avatar-controls {
  flex: 1;
}

.file-input {
  display: none;
}

.upload-button {
  padding: 0.5rem 1rem;
  color: white;
  border-radius: 0.75rem;
  transition: opacity 0.15s ease-in-out;
  border: none;
  cursor: pointer;
}

.upload-button:hover {
  opacity: 0.9;
}

.upload-hint {
  font-size: 0.875rem;
  color: var(--gray-500);
  margin-top: 0.5rem;
}

.preview-section {
  margin-bottom: 1.5rem;
  padding: 1rem;
  background-color: var(--gray-50);
  border-radius: 0.75rem;
}

.preview-label {
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--gray-700);
  margin-bottom: 0.75rem;
}

.preview-items {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
}

.preview-button {
  padding: 0.5rem 1rem;
  color: white;
  border-radius: 0.75rem;
  border: none;
}

.preview-button-outlined {
  padding: 0.5rem 1rem;
  border: 2px solid;
  border-radius: 0.75rem;
  background: transparent;
}

.preview-box {
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 0.75rem;
}

.preview-indicator {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.indicator-bar {
  width: 0.25rem;
  height: 2rem;
  border-radius: 9999px;
}

.indicator-text {
  font-size: 0.875rem;
  color: var(--gray-600);
}

.color-settings {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.color-picker-section {
  display: flex;
  flex-direction: column;
}

.color-label {
  display: block;
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--gray-700);
  margin-bottom: 0.5rem;
}

.color-picker-container {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.color-picker {
  width: 4rem;
  height: 4rem;
  border-radius: 0.75rem;
  border: 2px solid var(--gray-200);
  cursor: pointer;
}

.color-input-wrapper {
  flex: 1;
}

.color-text-input {
  width: 100%;
  padding: 0.5rem 1rem;
  background-color: var(--gray-50);
  border: 1px solid var(--gray-200);
  border-radius: 0.75rem;
  outline: none;
  transition: all 0.15s ease-in-out;
}

.color-text-input:focus {
  box-shadow: 0 0 0 2px rgb(var(--color-primary-rgb) / 0.2);
  border-color: transparent;
}

.preset-grid {
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  gap: 0.75rem;
}

.preset-button {
  width: 3rem;
  height: 3rem;
  border-radius: 0.75rem;
  border: 2px solid var(--gray-200);
  transition: all 0.15s ease-in-out;
  cursor: pointer;
  background: none;
  padding: 0;
}

.preset-button:hover {
  transform: scale(1.1);
}

.preset-active {
  border-color: var(--gray-900);
  box-shadow: 0 0 0 2px var(--gray-900);
}

.action-buttons {
  display: flex;
  justify-content: flex-end;
  gap: 0.75rem;
}

.reset-button {
  padding: 0.75rem 1.5rem;
  color: var(--gray-700);
  border-radius: 0.75rem;
  transition: background-color 0.15s ease-in-out;
  background: none;
  border: none;
  cursor: pointer;
}

.reset-button:hover {
  background-color: var(--gray-100);
}

.save-button {
  padding: 0.75rem 1.5rem;
  color: white;
  border-radius: 0.75rem;
  transition: opacity 0.15s ease-in-out;
  border: none;
  cursor: pointer;
}

.save-button:hover {
  opacity: 0.9;
}
</style>
