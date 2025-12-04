<template>
  <div class="bg-surface rounded-lg shadow-lg p-6 h-full flex flex-col">
    <div class="flex items-center justify-between mb-4">
      <h3 class="text-lg font-bold text-gray-900">Low Inventory</h3>
      <Icon icon="mdi:alert-circle" class="text-2xl text-red-500" />
    </div>
    
    <div class="flex-1 overflow-y-auto space-y-3">
      <div 
        v-for="item in items" 
        :key="item.sku"
        class="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition border-l-4"
        :class="getAlertClass(item.qty)"
      >
        <div class="flex-1 min-w-0">
          <div class="font-semibold text-gray-900 text-sm truncate">{{ item.name }}</div>
          <div class="text-xs text-gray-500">SKU: {{ item.sku }}</div>
        </div>
        <div class="flex items-center space-x-2">
          <span 
            class="text-lg font-bold px-3 py-1 rounded-full"
            :class="getQtyClass(item.qty)"
          >
            {{ item.qty }}
          </span>
        </div>
      </div>
    </div>
    
    <button class="mt-4 w-full py-2 bg-blue-50 hover:bg-blue-100 text-blue-600 rounded-lg text-sm font-medium transition">
      Reorder Items
    </button>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { Icon } from '@iconify/vue'
import { useDemoDataStore } from '@/stores/demoData'

const store = useDemoDataStore()
const items = computed(() => store.lowInventory)

const getAlertClass = (qty) => {
  if (qty <= 2) return 'border-red-500'
  if (qty <= 4) return 'border-orange-500'
  return 'border-yellow-500'
}

const getQtyClass = (qty) => {
  if (qty <= 2) return 'bg-red-100 text-red-700'
  if (qty <= 4) return 'bg-orange-100 text-orange-700'
  return 'bg-yellow-100 text-yellow-700'
}
</script>

