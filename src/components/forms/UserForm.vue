<template>
  <div class="space-y-6">
    <div>
      <label class="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
      <input 
        v-model="form.name"
        type="text" 
        class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary"
      />
    </div>

    <div>
      <label class="block text-sm font-medium text-gray-700 mb-1">Email</label>
      <input 
        v-model="form.email"
        type="email" 
        class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary"
      />
    </div>

    <div>
      <label class="block text-sm font-medium text-gray-700 mb-1">Role</label>
      <select v-model="form.role" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary">
        <option>Staff</option>
        <option>Manager</option>
        <option>Admin</option>
      </select>
    </div>

    <div>
      <label class="block text-sm font-medium text-gray-700 mb-1">Department</label>
      <select v-model="form.department" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary">
        <option>Sales</option>
        <option>Support</option>
        <option>Inventory</option>
        <option>Management</option>
      </select>
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
        Save User
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
  email: '',
  role: 'Staff',
  department: 'Sales',
  status: 'Active',
  ...props.data
})
</script>

