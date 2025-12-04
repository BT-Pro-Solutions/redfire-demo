<template>
  <div class="space-y-6">
    <div>
      <label class="block text-sm font-medium text-gray-700 mb-1">Customer Name</label>
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
      <label class="block text-sm font-medium text-gray-700 mb-1">Phone</label>
      <input 
        v-model="form.phone"
        type="tel" 
        class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary"
      />
    </div>

    <div>
      <label class="block text-sm font-medium text-gray-700 mb-1">Address</label>
      <textarea 
        v-model="form.address"
        rows="3"
        class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary"
      ></textarea>
    </div>

    <div class="grid grid-cols-3 gap-4">
      <div class="col-span-2">
        <label class="block text-sm font-medium text-gray-700 mb-1">City</label>
        <input 
          v-model="form.city"
          type="text" 
          class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary"
        />
      </div>
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">State</label>
        <input 
          v-model="form.state"
          type="text" 
          maxlength="2"
          class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary"
        />
      </div>
    </div>

    <div>
      <label class="block text-sm font-medium text-gray-700 mb-1">Zip Code</label>
      <input 
        v-model="form.zipCode"
        type="text" 
        class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary"
      />
    </div>

    <div>
      <label class="block text-sm font-medium text-gray-700 mb-1">Notes</label>
      <textarea 
        v-model="form.notes"
        rows="4"
        class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary"
      ></textarea>
    </div>

    <div class="pt-4 border-t border-gray-200">
      <button 
        @click="$emit('save', form)"
        class="w-full px-4 py-3 bg-primary hover:bg-primary-dark text-white rounded-lg transition font-medium"
      >
        Save Customer
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
  phone: '',
  address: '',
  city: '',
  state: '',
  zipCode: '',
  notes: '',
  ...props.data
})
</script>

