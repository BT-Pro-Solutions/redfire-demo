<template>
  <div 
    class="bg-white rounded-2xl border border-gray-100 h-full overflow-hidden relative group"
    :style="{ backgroundImage: `url(${company.image})`, backgroundSize: 'cover', backgroundPosition: 'center' }"
  >
    <div 
      class="absolute inset-0" 
      style="background: linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.0) 50%);"
    ></div>
    
    <div class="absolute inset-0 flex flex-col justify-end p-6">
      <h3 class="text-2xl font-bold text-white mb-1 drop-shadow-lg">{{ company.name }}</h3>
      <p class="text-white/90 text-sm drop-shadow-md">{{ company.tagline }}</p>
    </div>
  </div>
</template>

<script setup>
import { Icon } from '@iconify/vue'
import { useDemoDataStore } from '@/stores/demoData'
import { computed } from 'vue'

const store = useDemoDataStore()
const company = computed(() => store.company)
</script>

