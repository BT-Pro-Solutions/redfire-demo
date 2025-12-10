<template>
  <div class="widget-container">
    <div class="widget-header">
      <h3 class="widget-title">New Customers</h3>
      <div class="widget-icon">
        <Icon icon="mdi:account-multiple-plus" class="icon" />
      </div>
    </div>
    
    <div class="customer-list">
      <div 
        v-for="customer in customers" 
        :key="customer.email"
        class="customer-item"
      >
        <div class="customer-info">
          <div class="customer-name">{{ customer.name }}</div>
          <div class="customer-email">{{ customer.email }}</div>
          <div class="customer-date">{{ formatDate(customer.dateAdded) }}</div>
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

<style scoped>
.widget-container {
  background-color: white;
  border-radius: 1rem;
  border: 1px solid var(--gray-100);
  padding: 1.5rem;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.widget-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;
}

.widget-title {
  font-size: 1.125rem;
  font-weight: 700;
  color: var(--gray-900);
}

.widget-icon {
  width: 2.5rem;
  height: 2.5rem;
  background: linear-gradient(to bottom right, #fce7f3, #fce7f3);
  border-radius: 0.75rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.icon {
  font-size: 1.25rem;
  color: var(--purple-600);
}

.customer-list {
  flex: 1;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 0.375rem;
}

.customer-item {
  display: flex;
  align-items: flex-start;
  padding: 0.625rem;
  border-radius: 0.5rem;
  transition: background-color 0.15s ease-in-out;
}

.customer-item:hover {
  background-color: var(--gray-50);
}

.customer-info {
  flex: 1;
  min-width: 0;
}

.customer-name {
  font-weight: 600;
  color: var(--gray-900);
  font-size: 0.875rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.customer-email {
  font-size: 0.75rem;
  color: var(--gray-500);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.customer-date {
  font-size: 0.75rem;
  color: var(--gray-400);
}
</style>
