<template>
  <div class="about-button-wrapper">
    <!-- Button with special corner styling -->
    <button 
      @click="showModal = true"
      @mouseenter="handleHover"
      class="about-button flex items-center justify-center hover:opacity-90 transition overflow-visible relative"
      title="About"
    >
      <!-- Inlined SVG with animated flames -->
      <svg 
        width="25" 
        height="36" 
        viewBox="0 0 25 36" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        class="flames-svg"
      >
        <path 
          class="flame flame-1"
          :class="{ 'animate-flame-load': isLoadAnimation, 'animate-flame-hover': isHoverAnimation }"
          d="M10.4214 31.0317C11.0799 32.4871 11.0856 34.6558 11.0062 35.5582C10.4648 34.0855 7.80078 31.8114 4.96354 29.7322C2.1263 27.653 -0.10451 25.5304 0.0037819 22.0218C0.0904153 19.2149 1.0506 17.5457 1.51987 17.062C1.47655 17.719 1.47222 19.4791 1.80142 21.2637C2.13063 23.0484 3.59906 24.4475 4.29213 24.924C4.12608 24.5702 3.768 23.7155 3.66404 23.1264C3.56008 22.5373 3.70736 21.1915 3.79399 20.5923C3.85174 21.1916 4.3701 22.8448 5.98148 24.6641C7.99571 26.9382 9.59842 29.2124 10.4214 31.0317Z" 
          fill="white"
        />
        <path 
          class="flame flame-2"
          :class="{ 'animate-flame-load': isLoadAnimation, 'animate-flame-hover': isHoverAnimation }"
          d="M5.91652 14.3764C5.39672 12.2799 5.97427 9.83537 6.32802 8.87518C5.25955 10.2758 3.12259 12.4921 3.12259 15.6109C3.12259 18.1361 4.09039 19.6719 5.08302 21.2471L5.0935 21.2638C6.08978 22.8448 8.06069 24.9673 10.4214 27.9995C12.3101 30.4252 12.5945 34.0494 12.5006 35.5583C13.5691 33.1253 15.8274 29.7293 15.5112 25.8986C15.3162 23.5379 13.4103 21.3504 11.2228 19.0329C9.47281 17.179 8.50108 15.1561 8.23396 14.3764C8.21952 14.889 8.23396 16.1437 8.40722 17.062C8.58049 17.9803 9.07141 19.1918 9.29521 19.6827C8.38556 18.7875 6.43632 16.4729 5.91652 14.3764Z" 
          fill="white"
        />
        <path 
          class="flame flame-3"
          :class="{ 'animate-flame-load': isLoadAnimation, 'animate-flame-hover': isHoverAnimation }"
          d="M22.539 27.3169C21.2773 29.8853 16.4458 33.7083 14.2116 35.3417C15.0621 33.1833 16.8539 31.2068 16.9623 26.1152C17.0272 23.0614 13.8868 19.7693 10.2699 15.6109C7.35441 12.259 8.06984 9.29349 8.90867 6.47721C9.62008 4.08869 11.7812 1.20157 12.9076 0C12.6823 0.75098 12.0271 3.10399 12.2318 6.47721C12.414 9.48161 15.0104 12.5414 16.3997 13.4613C16.1181 12.7667 15.5436 11.1295 15.4985 10.1382C15.4535 9.14694 15.7426 7.92284 15.8928 7.43471C16.0993 8.14814 16.8278 9.93547 18.0894 11.3774C19.6665 13.1797 21.8068 14.8694 23.2712 17.9672C24.7356 21.065 24.116 24.1065 22.539 27.3169Z" 
          fill="white"
        />
      </svg>
    </button>

    <!-- About Modal -->
    <Teleport to="body">
      <div 
        v-if="showModal"
        class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
        @click.self="showModal = false"
      >
        <div class="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden">
          <!-- Header with close button -->
          <div class="relative bg-gradient-to-br from-gray-900 to-gray-800 px-6 py-8 text-center">
            <button 
              @click="showModal = false"
              class="absolute top-4 right-4 text-white/70 hover:text-white transition"
            >
              <Icon icon="mdi:close" class="text-2xl" />
            </button>
            
            <!-- Logo -->
            <div class="flex justify-center mb-4">
              <img 
                :src="logoUrl" 
                alt="RedFire Logo" 
                class="h-16 w-auto"
              />
            </div>
            
            <h2 class="text-2xl font-bold text-white mb-2">RedFire POS</h2>
            <p class="text-white/80 text-sm">Point of Sale System</p>
          </div>

          <!-- Content -->
          <div class="px-6 py-6 space-y-4">
            <!-- Version -->
            <div class="flex items-center justify-between py-3 border-b border-gray-100">
              <span class="text-sm font-medium text-gray-600">Version</span>
              <span class="text-sm font-semibold text-gray-900">1.0.0</span>
            </div>

            <!-- Build Date -->
            <div class="flex items-center justify-between py-3 border-b border-gray-100">
              <span class="text-sm font-medium text-gray-600">Build Date</span>
              <span class="text-sm font-semibold text-gray-900">{{ buildDate }}</span>
            </div>

            <!-- Help Links -->
            <div class="pt-2 space-y-2">
              <a 
                href="#" 
                class="flex items-center space-x-3 px-4 py-3 rounded-xl bg-gray-50 hover:bg-gray-100 transition text-gray-700"
              >
                <Icon icon="mdi:book-open-outline" class="text-xl" />
                <span class="text-sm font-medium">Documentation</span>
              </a>
              
              <a 
                href="#" 
                class="flex items-center space-x-3 px-4 py-3 rounded-xl bg-gray-50 hover:bg-gray-100 transition text-gray-700"
              >
                <Icon icon="mdi:help-circle-outline" class="text-xl" />
                <span class="text-sm font-medium">Help & Support</span>
              </a>
              
              <a 
                href="#" 
                class="flex items-center space-x-3 px-4 py-3 rounded-xl bg-gray-50 hover:bg-gray-100 transition text-gray-700"
              >
                <Icon icon="mdi:bug-outline" class="text-xl" />
                <span class="text-sm font-medium">Report an Issue</span>
              </a>
            </div>

            <!-- Copyright -->
            <div class="text-center pt-4">
              <p class="text-xs text-gray-500">
                © {{ currentYear }} RedFire. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { Icon } from '@iconify/vue'

const props = defineProps({
  animate: {
    type: Boolean,
    default: true
  }
})

const showModal = ref(false)
const isLoadAnimation = ref(false)
const isHoverAnimation = ref(false)

const logoUrl = computed(() => `${import.meta.env.BASE_URL}redfire-logo-white.png`)

const currentYear = new Date().getFullYear()

const buildDate = computed(() => {
  const date = new Date()
  return date.toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric' 
  })
})

// Run animation 3 times on page load
onMounted(() => {
  if (props.animate) {
    isLoadAnimation.value = true
  }
})

// Run animation once on hover
const handleHover = () => {
  if (isHoverAnimation.value || isLoadAnimation.value) return
  
  isHoverAnimation.value = true
  setTimeout(() => {
    isHoverAnimation.value = false
  }, 1500) // Match the animation duration
}
</script>

<style scoped>
.about-button-wrapper {
  display: flex;
  align-items: stretch;
}

.about-button {
  background-color: #000;
  position: relative;
  width: 80px;
  padding: 1rem;
  border-radius: 0;
}

/* Create the white square in top-left corner using pseudo-element */
.about-button::before {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 16px;
  height: 16px;
  background-color: #ffffff;
  z-index: 1;
}

/* Create the black circle on bottom to cut into the white square */
.about-button::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 32px;
  height: 32px;
  background-color: #000;
  border-radius: 50%;
  z-index: 2;
}

/* Flame animations - simple sequential fade */
.flame {
  transition: opacity 0.2s ease;
}

/* Load animation: 3 loops */
.flame-1.animate-flame-load {
  animation: fade1 1.5s ease-in-out 3;
}

.flame-2.animate-flame-load {
  animation: fade2 1.5s ease-in-out 3;
}

.flame-3.animate-flame-load {
  animation: fade3 1.5s ease-in-out 3;
}

/* Hover animation: 1 loop */
.flame-1.animate-flame-hover {
  animation: fade1 1.5s ease-in-out 1;
}

.flame-2.animate-flame-hover {
  animation: fade2 1.5s ease-in-out 1;
}

.flame-3.animate-flame-hover {
  animation: fade3 1.5s ease-in-out 1;
}

@keyframes fade1 {
  0%, 100% {
    opacity: 1;
  }
  33% {
    opacity: 0.3;
  }
  66% {
    opacity: 1;
  }
}

@keyframes fade2 {
  0%, 100% {
    opacity: 1;
  }
  33% {
    opacity: 1;
  }
  50% {
    opacity: 0.3;
  }
  66% {
    opacity: 1;
  }
}

@keyframes fade3 {
  0%, 100% {
    opacity: 1;
  }
  33% {
    opacity: 1;
  }
  66% {
    opacity: 0.3;
  }
  83% {
    opacity: 1;
  }
}

.flames-svg {
  position: relative;
  z-index: 3;
}
</style>
