<template>
  <div class="space-y-6">
    <div>
      <label class="block text-sm font-medium text-gray-700 mb-1">Item Name</label>
      <input 
        v-model="form.itemName"
        type="text" 
        class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary"
      />
    </div>

    <div>
      <label class="block text-sm font-medium text-gray-700 mb-1">Short Name</label>
      <input 
        v-model="form.shortName"
        type="text" 
        class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary"
      />
    </div>

    <div>
      <label class="block text-sm font-medium text-gray-700 mb-1">Unit of Measure</label>
      <select v-model="form.unitOfMeasure" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary">
        <option>EA</option>
        <option>BOX</option>
        <option>CASE</option>
        <option>LB</option>
      </select>
    </div>

    <div>
      <label class="block text-sm font-medium text-gray-700 mb-1">Unit Description</label>
      <input 
        v-model="form.unitDescription"
        type="text" 
        class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary"
      />
    </div>

    <div class="flex items-center justify-between py-2">
      <span class="text-sm font-medium text-gray-700">ISE Visible</span>
      <label class="relative inline-flex items-center cursor-pointer">
        <input v-model="form.iseVisible" type="checkbox" class="sr-only peer">
        <div class="w-11 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-500"></div>
      </label>
    </div>

    <div>
      <label class="block text-sm font-medium text-gray-700 mb-1">Sort</label>
      <input 
        v-model="form.sort"
        type="number" 
        class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary"
      />
    </div>

    <div>
      <label class="block text-sm font-medium text-gray-700 mb-1">Price $</label>
      <input 
        v-model="form.price"
        type="number" 
        step="0.01"
        class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary"
      />
    </div>

    <div class="bg-gray-50 p-4 rounded-lg">
      <h3 class="font-bold text-gray-900 mb-3">Calculated Cost</h3>
      <div class="space-y-2 text-sm">
        <div class="flex justify-between">
          <span class="text-gray-600">High</span>
          <span class="font-medium">$84.7000</span>
        </div>
        <div class="flex justify-between">
          <span class="text-gray-600">Uncovered High</span>
          <span class="font-medium">$84.7000</span>
        </div>
        <div class="flex justify-between">
          <span class="text-gray-600">Default</span>
          <span class="font-medium">$9.2500</span>
        </div>
        <div class="flex justify-between">
          <span class="text-gray-600">Low</span>
          <span class="font-medium">$9.2500</span>
        </div>
      </div>
    </div>

    <div class="grid grid-cols-2 gap-4">
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">Margin</label>
        <input 
          v-model="form.margin"
          type="text" 
          class="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50"
          readonly
        />
      </div>
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">% Margin</label>
        <input 
          v-model="form.marginPercent"
          type="text" 
          class="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50"
          readonly
        />
      </div>
    </div>

    <div>
      <label class="block text-sm font-medium text-gray-700 mb-1">SKU</label>
      <input 
        v-model="form.sku"
        type="text" 
        class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary"
      />
    </div>

    <div>
      <label class="block text-sm font-medium text-gray-700 mb-1">Barcode</label>
      <div class="flex space-x-2">
        <input 
          v-model="form.barcode"
          type="text" 
          class="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary"
        />
        <button class="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg transition">
          <Icon icon="mdi:plus" class="text-xl" />
        </button>
      </div>
    </div>

    <div>
      <label class="block text-sm font-medium text-gray-700 mb-1">Remote ID</label>
      <input 
        v-model="form.remoteId"
        type="text" 
        class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary"
      />
    </div>

    <div>
      <label class="block text-sm font-medium text-gray-700 mb-1">Printer</label>
      <select v-model="form.printer" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary">
        <option>None</option>
        <option>Printer 1</option>
        <option>Printer 2</option>
      </select>
    </div>

    <div class="border-t border-gray-200 pt-4">
      <h3 class="font-bold text-gray-900 mb-3">Inventory Tracking</h3>
      
      <div class="flex items-center justify-between py-2 mb-4">
        <span class="text-sm font-medium text-gray-700">Inventory Count</span>
        <label class="relative inline-flex items-center cursor-pointer">
          <input v-model="form.inventoryTracking" type="checkbox" class="sr-only peer">
          <div class="w-11 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-500"></div>
        </label>
      </div>

      <div v-if="form.inventoryTracking">
        <label class="block text-sm font-medium text-gray-700 mb-1">On Hand</label>
        <input 
          v-model="form.onHand"
          type="number" 
          class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary"
        />
      </div>
    </div>

    <div class="pt-4 border-t border-gray-200">
      <button 
        @click="$emit('save', form)"
        class="w-full px-4 py-3 bg-primary hover:bg-primary-dark text-white rounded-lg transition font-medium"
      >
        Save Product
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { Icon } from '@iconify/vue'

const props = defineProps({
  data: Object
})

const form = ref({
  itemName: 'Complex Item with RAC',
  shortName: 'CIRAC',
  unitOfMeasure: 'EA',
  unitDescription: '',
  iseVisible: true,
  sort: 999999999,
  price: 100.00,
  margin: '$15.3000',
  marginPercent: '15.3000%',
  sku: '',
  barcode: '',
  remoteId: '',
  printer: 'None',
  inventoryTracking: true,
  onHand: -2,
  ...props.data
})
</script>

