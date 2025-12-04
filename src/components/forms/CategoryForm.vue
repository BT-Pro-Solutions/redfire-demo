<template>
  <div class="space-y-6">
    <div>
      <label class="block text-sm font-medium text-gray-700 mb-1">Category Name</label>
      <input 
        v-model="form.name"
        type="text" 
        class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary"
      />
    </div>

    <div>
      <label class="block text-sm font-medium text-gray-700 mb-1">Description</label>
      <textarea 
        v-model="form.description"
        rows="4"
        class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary"
      ></textarea>
    </div>

    <div>
      <label class="block text-sm font-medium text-gray-700 mb-1">Status</label>
      <select v-model="form.status" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary">
        <option>Active</option>
        <option>Inactive</option>
      </select>
    </div>

    <div class="pt-4 border-t border-gray-200">
      <button 
        @click="$emit('save', form)"
        class="w-full px-4 py-3 bg-primary hover:bg-primary-dark text-white rounded-lg transition font-medium"
      >
        Save Category
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
  data: Object
})

const form = ref({
  name: '',
  description: '',
  status: 'Active',
  ...props.data
})
</script>

