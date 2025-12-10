<template>
  <div class="widget-container">
    <div class="widget-header">
      <h3 class="widget-title">Quick Links</h3>
      <div class="widget-icon">
        <Icon icon="mdi:link-variant" class="icon" />
      </div>
    </div>
    
    <div class="links-container">
      <div class="links-grid">
        <a 
          v-for="link in links" 
          :key="link.name"
          :href="link.url"
          class="link-item"
          :class="`link-${link.color}`"
        >
          <div 
            class="link-icon-wrapper"
            :class="`icon-bg-${link.color}`"
          >
            <Icon 
              :icon="link.icon" 
              class="link-icon"
              :class="`icon-color-${link.color}`"
            />
          </div>
          <span class="link-name">{{ link.name }}</span>
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

<style scoped>
.widget-container {
  background-color: white;
  border-radius: 1rem;
  border: 1px solid var(--gray-100);
  padding: 1.5rem;
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.widget-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;
  flex-shrink: 0;
}

.widget-title {
  font-size: 1.125rem;
  font-weight: 700;
  color: var(--gray-900);
}

.widget-icon {
  width: 2.5rem;
  height: 2.5rem;
  background: linear-gradient(to bottom right, var(--gray-50), var(--gray-100));
  border-radius: 0.75rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.icon {
  font-size: 1.25rem;
  color: var(--gray-600);
}

.links-container {
  flex: 1;
  overflow-y: auto;
  min-height: 0;
}

.links-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.75rem;
}

.link-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  border-radius: 0.75rem;
  transition: all 0.15s ease-in-out;
  background-color: var(--gray-50);
  border: 1px solid transparent;
  text-decoration: none;
}

.link-item:hover {
  background-color: var(--gray-100);
  border-color: var(--gray-200);
}

.link-icon-wrapper {
  width: 3rem;
  height: 3rem;
  border-radius: 0.75rem;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 0.5rem;
}

.icon-bg-blue {
  background-color: var(--blue-100);
}

.icon-bg-green {
  background-color: var(--green-100);
}

.icon-bg-purple {
  background-color: var(--purple-100);
}

.icon-bg-orange {
  background-color: var(--orange-50);
}

.icon-bg-red {
  background-color: var(--red-100);
}

.icon-bg-indigo {
  background-color: var(--indigo-100);
}

.link-icon {
  font-size: 1.5rem;
}

.icon-color-blue {
  color: var(--blue-600);
}

.icon-color-green {
  color: var(--green-600);
}

.icon-color-purple {
  color: var(--purple-600);
}

.icon-color-orange {
  color: var(--orange-500);
}

.icon-color-red {
  color: var(--red-600);
}

.icon-color-indigo {
  color: var(--indigo-600);
}

.link-name {
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--gray-700);
  text-align: center;
}
</style>
