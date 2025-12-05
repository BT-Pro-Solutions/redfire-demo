<template>
  <div 
    class="bg-white rounded-2xl border border-gray-100 h-full overflow-hidden relative group"
    :style="{ backgroundImage: `url(${user.image})`, backgroundSize: 'cover', backgroundPosition: 'center' }"
  >
    <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/20"></div>
    
    <div class="absolute inset-0 flex flex-col justify-end p-6">
      <h3 class="text-2xl font-bold text-white mb-1 drop-shadow-lg">{{ user.name }}</h3>
      <p class="text-white/90 text-sm drop-shadow-md">{{ user.title }}</p>
      
      <div class="mt-3 flex items-center space-x-2 text-sm text-white/80">
        <Icon icon="mdi:shield-check" class="text-emerald-400" />
        <span>Verified Account</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { Icon } from '@iconify/vue'
import { useDemoDataStore } from '@/stores/demoData'
import { computed } from 'vue'

const store = useDemoDataStore()
const user = computed(() => store.currentUser)
</script>

