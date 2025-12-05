<template>
  <div class="space-y-6">
    <div class="grid grid-cols-2 gap-4">
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">Purchase ID</label>
        <input 
          v-model="form.purchaseId"
          type="text" 
          class="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50"
          readonly
        />
      </div>
      
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">Check #</label>
        <input 
          v-model="form.checkNumber"
          type="text" 
          class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary"
        />
      </div>
    </div>

    <div class="grid grid-cols-2 gap-4">
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">Status</label>
        <select v-model="form.status" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary">
          <option>complete</option>
          <option>pending</option>
          <option>cancelled</option>
        </select>
      </div>
      
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">User</label>
        <input 
          v-model="form.user"
          type="text" 
          class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary"
        />
      </div>
    </div>

    <div>
      <label class="block text-sm font-medium text-gray-700 mb-1">Location</label>
      <select v-model="form.location" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary">
        <option>Duke's</option>
        <option>Main Location</option>
        <option>Store #1</option>
        <option>Store #2</option>
      </select>
    </div>

    <div>
      <label class="block text-sm font-medium text-gray-700 mb-1">Date</label>
      <input 
        v-model="form.date"
        type="datetime-local" 
        class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary"
      />
    </div>

    <div class="bg-gray-50 p-4 rounded-lg">
      <h3 class="text-lg font-bold text-gray-900 mb-3">Item Details</h3>
      <div class="space-y-3">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Item</label>
          <input 
            v-model="form.itemName"
            type="text" 
            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary"
          />
        </div>
        <div class="grid grid-cols-2 gap-3">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Size</label>
            <input 
              v-model="form.size"
              type="text" 
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <input 
              v-model="form.description"
              type="text" 
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary"
            />
          </div>
        </div>
      </div>
    </div>

    <div class="bg-gray-50 p-4 rounded-lg space-y-2">
      <div class="flex justify-between items-center">
        <span class="font-medium text-gray-700">Subtotal</span>
        <input 
          v-model="form.subtotal"
          type="text" 
          class="w-32 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary text-right"
        />
      </div>
      <div class="flex justify-between items-center">
        <span class="font-medium text-gray-700">Tax</span>
        <input 
          v-model="form.tax"
          type="text" 
          class="w-32 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary text-right"
        />
      </div>
      <div class="flex justify-between items-center pt-2 border-t border-gray-300">
        <span class="font-bold text-gray-900">Total</span>
        <span class="font-bold text-gray-900 text-xl">{{ total }}</span>
      </div>
    </div>

    <div>
      <h3 class="text-lg font-bold text-gray-900 mb-3">Payments</h3>
      <button class="w-full px-4 py-2 bg-gray-800 hover:bg-gray-900 text-white rounded-lg transition flex items-center justify-center space-x-2">
        <span>View</span>
      </button>
    </div>

    <div>
      <label class="block text-sm font-medium text-gray-700 mb-1">Receipt Email</label>
      <input 
        v-model="form.receiptEmail"
        type="email" 
        placeholder="Receipt Email"
        class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary"
      />
      <button class="w-full mt-2 px-4 py-3 bg-gray-800 hover:bg-gray-900 text-white rounded-lg transition font-medium">
        Send Receipt
      </button>
    </div>

    <div class="pt-4 border-t border-gray-200">
      <button 
        @click="$emit('save', form)"
        class="w-full px-4 py-3 bg-primary hover:bg-primary-dark text-white rounded-lg transition font-medium"
      >
        Save Purchase
      </button>
      
      <button class="w-full mt-3 px-4 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg transition font-medium">
        Archive Purchase
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  data: Object
})

const form = ref({
  purchaseId: '692db453c732cff79866de3c',
  checkNumber: '045913603726',
  status: 'complete',
  user: 'Forrest Bishop',
  location: "Duke's",
  date: '2024-12-01T10:29',
  itemName: 'Complex Item with RAC',
  size: 'Cigar Caddy Yellow',
  description: 'The Big Easy Cigar Cutter',
  subtotal: '$100.00',
  tax: '$7.00',
  receiptEmail: '',
  ...props.data
})

const total = computed(() => {
  const subtotal = parseFloat(form.value.subtotal.replace('$', '')) || 0
  const tax = parseFloat(form.value.tax.replace('$', '')) || 0
  return '$' + (subtotal + tax).toFixed(2)
})
</script>


