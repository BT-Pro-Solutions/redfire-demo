<template>
  <div 
    class="widget-container"
    :style="{ backgroundImage: `url(${user.image})`, backgroundSize: 'cover', backgroundPosition: 'center' }"
  >
    <div class="gradient-overlay"></div>
    
    <div class="content">
      <h3 class="user-name">{{ user.name }}</h3>
      <p class="user-title">{{ user.title }}</p>
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

<style scoped>
.widget-container {
  background-color: white;
  border-radius: 1rem;
  border: 1px solid var(--gray-100);
  height: 100%;
  overflow: hidden;
  position: relative;
}

.gradient-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.0) 50%);
}

.content {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 1.5rem;
}

.user-name {
  font-size: 1.5rem;
  font-weight: 700;
  color: white;
  margin-bottom: 0.25rem;
  filter: drop-shadow(0 10px 8px rgba(0, 0, 0, 0.04)) drop-shadow(0 4px 3px rgba(0, 0, 0, 0.1));
}

.user-title {
  color: rgba(255, 255, 255, 0.9);
  font-size: 0.875rem;
  filter: drop-shadow(0 1px 2px rgba(0, 0, 0, 0.1));
}
</style>
