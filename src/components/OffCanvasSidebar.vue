<template>
  <Teleport to="body">
    <transition name="fade">
      <div 
        v-if="isOpen"
        class="sidebar-backdrop" 
        @click="$emit('close')"
      ></div>
    </transition>
    
    <transition name="slide">
      <div 
        v-if="isOpen"
        class="sidebar-panel"
      >
        <div class="sidebar-header">
          <h2 class="sidebar-title">{{ title }}</h2>
          <button @click="$emit('close')" class="close-button">
            <Icon icon="mdi:close" class="close-icon" />
          </button>
        </div>

        <div class="sidebar-content">
          <component :is="formComponent" :data="data" @save="handleSave" />
        </div>
      </div>
    </transition>
  </Teleport>
</template>

<script setup>
import { computed } from 'vue'
import { Icon } from '@iconify/vue'
import PurchaseForm from './forms/PurchaseForm.vue'
import ProductForm from './forms/ProductForm.vue'
import CustomerForm from './forms/CustomerForm.vue'
import UserForm from './forms/UserForm.vue'
import CategoryForm from './forms/CategoryForm.vue'

const props = defineProps({
  isOpen: Boolean,
  title: String,
  formType: String,
  data: Object
})

const emit = defineEmits(['close', 'save'])

const formComponents = {
  purchase: PurchaseForm,
  product: ProductForm,
  customer: CustomerForm,
  user: UserForm,
  category: CategoryForm
}

const formComponent = computed(() => formComponents[props.formType] || ProductForm)

const handleSave = (data) => {
  emit('save', data)
  emit('close')
}
</script>

<style scoped>
.sidebar-backdrop {
  position: fixed;
  inset: 0;
  z-index: 50;
  background-color: rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(1px);
}

.sidebar-panel {
  position: fixed;
  right: 0;
  top: 0;
  bottom: 0;
  width: 100%;
  max-width: 100%;
  background-color: white;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  display: flex;
  flex-direction: column;
  z-index: 50;
  overflow: hidden;
}

@media (min-width: 768px) {
  .sidebar-panel {
    right: 5px;
    top: 5px;
    bottom: 5px;
    max-width: 42rem;
    border-radius: 0.5rem;
  }
}

.sidebar-header {
  padding: 1rem 1.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid var(--gray-200);
}

.sidebar-title {
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--gray-900);
}

.close-button {
  padding: 0.5rem;
  border-radius: 0.25rem;
  transition: background-color 0.15s ease-in-out;
  color: var(--gray-600);
  background: none;
  border: none;
  cursor: pointer;
}

.close-button:hover {
  background-color: var(--gray-100);
}

.close-icon {
  font-size: 1.5rem;
}

.sidebar-content {
  flex: 1;
  overflow-y: auto;
  padding: 1.5rem;
  scrollbar-width: none;
  -ms-overflow-style: none;
}

.sidebar-content::-webkit-scrollbar {
  display: none;
}

.slide-enter-active {
  transition: transform 0.3s ease-out;
}

.slide-leave-active {
  transition: transform 0.3s ease-in;
}

.slide-enter-from,
.slide-leave-to {
  transform: translateX(calc(100% + 5px));
}

.fade-enter-active {
  transition: opacity 0.3s ease-out;
}

.fade-leave-active {
  transition: opacity 0.3s ease-in;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
