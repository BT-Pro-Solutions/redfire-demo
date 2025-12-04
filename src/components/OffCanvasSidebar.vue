<template>
  <Teleport to="body">
    <transition name="fade">
      <div 
        v-if="isOpen"
        class="fixed inset-0 z-50 sidebar-backdrop" 
        @click="$emit('close')"
      ></div>
    </transition>
    
    <transition name="slide">
      <div 
        v-if="isOpen"
        class="fixed right-[5px] top-[5px] bottom-[5px] w-full max-w-full md:max-w-2xl bg-white shadow-2xl flex flex-col z-50 rounded-lg overflow-hidden md:right-[5px] right-0 md:top-[5px] top-0 md:bottom-[5px] bottom-0 md:rounded-lg rounded-none"
      >
        <div class="px-6 py-4 flex items-center justify-between border-b border-gray-200">
          <h2 class="text-xl font-bold text-gray-900">{{ title }}</h2>
          <button @click="$emit('close')" class="hover:bg-gray-100 p-2 rounded transition text-gray-600">
            <Icon icon="mdi:close" class="text-2xl" />
          </button>
        </div>

        <div class="flex-1 overflow-y-auto p-6 sidebar-content">
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
  background-color: rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
}

.sidebar-content {
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

