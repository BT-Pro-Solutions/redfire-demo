<template>
  <div class="bg-surface rounded-lg shadow-lg p-6 h-full flex flex-col overflow-hidden">
    <div class="flex items-center justify-between mb-4 flex-shrink-0">
      <h3 class="text-lg font-bold text-gray-900">Quick Links</h3>
      <Icon icon="mdi:link-variant" class="text-2xl text-gray-400" />
    </div>
    
    <div class="flex-1 overflow-y-auto min-h-0">
      <div class="grid grid-cols-2 gap-3">
        <a 
          v-for="link in links" 
          :key="link.name"
          :href="link.url"
          class="flex flex-col items-center justify-center p-4 rounded-lg hover:shadow-md transition border-2 border-gray-100 hover:border-gray-200"
        >
          <div 
            class="w-12 h-12 rounded-full flex items-center justify-center mb-2"
            :class="`bg-${link.color}-100`"
          >
            <Icon 
              :icon="link.icon" 
              class="text-2xl"
              :class="`text-${link.color}-600`"
            />
          </div>
          <span class="text-sm font-medium text-gray-700 text-center">{{ link.name }}</span>
        </a>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { Icon } from '@iconify/vue'
import { useDemoDataStore } from '@/stores/demoData'

const store = useDemoDataStore()
const links = computed(() => store.quickLinks)
</script>

