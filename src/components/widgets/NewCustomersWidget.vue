<template>
  <div class="bg-surface rounded-lg shadow-lg p-6 h-full flex flex-col">
    <div class="flex items-center justify-between mb-4">
      <h3 class="text-lg font-bold text-gray-900">New Customers</h3>
      <Icon icon="mdi:account-multiple-plus" class="text-2xl text-purple-500" />
    </div>
    
    <div class="flex-1 overflow-y-auto space-y-3">
      <div 
        v-for="customer in customers" 
        :key="customer.email"
        class="flex items-start space-x-3 p-3 hover:bg-gray-50 rounded-lg transition"
      >
        <div class="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
          <Icon icon="mdi:account" class="text-purple-600 text-xl" />
        </div>
        <div class="flex-1 min-w-0">
          <div class="font-semibold text-gray-900 text-sm truncate">{{ customer.name }}</div>
          <div class="text-xs text-gray-500 truncate">{{ customer.email }}</div>
          <div class="text-xs text-gray-400 mt-1">{{ formatDate(customer.dateAdded) }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { Icon } from '@iconify/vue'
import { useDemoDataStore } from '@/stores/demoData'

const store = useDemoDataStore()
const customers = computed(() => store.newCustomers)

const formatDate = (dateStr) => {
  const date = new Date(dateStr)
  const today = new Date()
  const yesterday = new Date(today)
  yesterday.setDate(yesterday.getDate() - 1)
  
  if (date.toDateString() === today.toDateString()) {
    return 'Today'
  } else if (date.toDateString() === yesterday.toDateString()) {
    return 'Yesterday'
  } else {
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
  }
}
</script>


