<template>
  <div class="widget-container">
    <div class="widget-header">
      <h3 class="widget-title">Low Inventory</h3>
      <div class="widget-icon">
        <Icon icon="mdi:alert-circle" class="icon" />
      </div>
    </div>
    
    <div class="inventory-list">
      <div 
        v-for="item in items" 
        :key="item.sku"
        class="inventory-item"
        :class="getAlertClass(item.qty)"
      >
        <div class="item-info">
          <div class="item-name">{{ item.name }}</div>
          <div class="item-sku">SKU: {{ item.sku }}</div>
        </div>
        <div class="item-qty-container">
          <span 
            class="item-qty"
            :class="getQtyClass(item.qty)"
          >
            {{ item.qty }}
          </span>
        </div>
      </div>
    </div>
    
    <button class="reorder-button" :style="`background-color: rgb(var(--color-primary-rgb))`">
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
  if (qty <= 2) return 'alert-critical'
  if (qty <= 4) return 'alert-warning'
  return 'alert-low'
}

const getQtyClass = (qty) => {
  if (qty <= 2) return 'qty-critical'
  if (qty <= 4) return 'qty-warning'
  return 'qty-low'
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
  background: linear-gradient(to bottom right, #fef2f2, #fff7ed);
  border-radius: 0.75rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.icon {
  font-size: 1.25rem;
  color: var(--red-600);
}

.inventory-list {
  flex: 1;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.inventory-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.75rem;
  border-radius: 0.75rem;
  transition: background-color 0.15s ease-in-out;
  border-left: 4px solid;
}

.inventory-item:hover {
  background-color: var(--gray-50);
}

.alert-critical {
  border-left-color: var(--red-500);
}

.alert-warning {
  border-left-color: var(--orange-500);
}

.alert-low {
  border-left-color: #eab308;
}

.item-info {
  flex: 1;
  min-width: 0;
}

.item-name {
  font-weight: 600;
  color: var(--gray-900);
  font-size: 0.875rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.item-sku {
  font-size: 0.75rem;
  color: var(--gray-500);
}

.item-qty-container {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.item-qty {
  font-size: 1.125rem;
  font-weight: 700;
  padding: 0.25rem 0.75rem;
  border-radius: 0.75rem;
}

.qty-critical {
  background-color: var(--red-100);
  color: #b91c1c;
}

.qty-warning {
  background-color: #fed7aa;
  color: #c2410c;
}

.qty-low {
  background-color: #fef08a;
  color: #a16207;
}

.reorder-button {
  margin-top: 1rem;
  width: 100%;
  padding: 0.625rem;
  color: white;
  border-radius: 0.75rem;
  font-size: 0.875rem;
  font-weight: 500;
  transition: opacity 0.15s ease-in-out;
  border: none;
  cursor: pointer;
}

.reorder-button:hover {
  opacity: 0.9;
}
</style>
