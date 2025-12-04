<template>
  <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" @click.self="$emit('close')">
    <div class="bg-white rounded-xl shadow-2xl max-w-3xl w-full max-h-[85vh] overflow-hidden">
      <!-- Header -->
      <div class="flex items-center justify-between p-6 border-b border-gray-200">
        <div>
          <h2 class="text-2xl font-bold text-gray-900">Add Widget</h2>
          <p class="text-sm text-gray-500 mt-1">
            Step {{ currentStep }} of 2: {{ currentStep === 1 ? 'Choose widget type' : 'Configure widget' }}
          </p>
        </div>
        <button @click="$emit('close')" class="text-gray-400 hover:text-gray-600 transition">
          <Icon icon="mdi:close" class="text-2xl" />
        </button>
      </div>

      <!-- Step 1: Choose Widget Type -->
      <div v-if="currentStep === 1" class="p-6 overflow-y-auto max-h-[calc(85vh-180px)]">
        <p class="text-gray-600 mb-6">Select the type of widget you want to add to your dashboard.</p>
        
        <div class="grid grid-cols-3 gap-4">
          <button
            v-for="type in widgetTypes"
            :key="type.id"
            @click="selectWidgetType(type)"
            class="flex flex-col items-center p-6 border-2 border-gray-200 rounded-xl hover:border-primary hover:bg-blue-50 transition group"
          >
            <div 
              class="w-16 h-16 rounded-xl flex items-center justify-center mb-3 group-hover:scale-110 transition"
              :class="type.bgColor"
            >
              <Icon :icon="type.icon" class="text-3xl" :class="type.iconColor" />
            </div>
            <h3 class="text-base font-semibold text-gray-900 mb-1">{{ type.name }}</h3>
            <p class="text-xs text-gray-500 text-center">{{ type.description }}</p>
          </button>
        </div>
      </div>

      <!-- Step 2: Configure Widget -->
      <div v-else class="p-6 overflow-y-auto max-h-[calc(85vh-180px)]">
        <!-- Bar Chart Configuration -->
        <div v-if="selectedType?.id === 'bar-chart'">
          <h3 class="text-lg font-bold text-gray-900 mb-4">Configure Bar Chart</h3>
          
          <div class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Time Period (X-Axis)</label>
              <select v-model="config.timePeriod" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent">
                <option value="week">Last 7 Days</option>
                <option value="month">Last 30 Days</option>
                <option value="quarter">Last 3 Months</option>
                <option value="year">Last 12 Months</option>
              </select>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Data to Display</label>
              <select v-model="config.dataType" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent">
                <option value="payments">Payments (by type)</option>
                <option value="sales">Sales Revenue</option>
                <option value="orders">Order Volume</option>
                <option value="customers">New Customers</option>
              </select>
            </div>
          </div>
        </div>

        <!-- Line Graph Configuration -->
        <div v-else-if="selectedType?.id === 'line-graph'">
          <h3 class="text-lg font-bold text-gray-900 mb-4">Configure Line Graph</h3>
          
          <div class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Time Period (X-Axis)</label>
              <select v-model="config.timePeriod" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent">
                <option value="week">Last 7 Days</option>
                <option value="month">Last 30 Days</option>
                <option value="quarter">Last 3 Months</option>
                <option value="year">Last 12 Months</option>
              </select>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Primary Metric</label>
              <select v-model="config.primaryMetric" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent">
                <option value="purchases">Purchases</option>
                <option value="revenue">Revenue</option>
                <option value="customers">Customer Count</option>
                <option value="orders">Order Count</option>
              </select>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Secondary Metric (Optional)</label>
              <select v-model="config.secondaryMetric" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent">
                <option value="">None</option>
                <option value="cancelled">Cancellations</option>
                <option value="refunds">Refunds</option>
                <option value="returns">Returns</option>
              </select>
            </div>
          </div>
        </div>

        <!-- Number Widget Configuration -->
        <div v-else-if="selectedType?.id === 'number'">
          <h3 class="text-lg font-bold text-gray-900 mb-4">Configure Number Widget</h3>
          
          <div class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Metric to Display</label>
              <select v-model="config.metric" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent">
                <option value="total-revenue">Total Revenue</option>
                <option value="total-orders">Total Orders</option>
                <option value="avg-order">Average Order Value</option>
                <option value="total-customers">Total Customers</option>
                <option value="low-stock-items">Low Stock Items</option>
              </select>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Time Period</label>
              <select v-model="config.timePeriod" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent">
                <option value="today">Today</option>
                <option value="week">This Week</option>
                <option value="month">This Month</option>
                <option value="all-time">All Time</option>
              </select>
            </div>
          </div>
        </div>

        <!-- Quick Links Configuration -->
        <div v-else-if="selectedType?.id === 'quick-links'">
          <h3 class="text-lg font-bold text-gray-900 mb-4">Configure Quick Links</h3>
          <p class="text-sm text-gray-600 mb-4">Quick links widget will use default shortcuts. You can customize individual links after adding the widget.</p>
        </div>

        <!-- Recent Items Configuration -->
        <div v-else-if="selectedType?.id === 'recent-items'">
          <h3 class="text-lg font-bold text-gray-900 mb-4">Configure Recent Items</h3>
          
          <div class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Item Type</label>
              <select v-model="config.itemType" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent">
                <option value="customers">New Customers</option>
                <option value="orders">Recent Orders</option>
                <option value="products">New Products</option>
                <option value="inventory">Low Inventory</option>
              </select>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Number of Items to Show</label>
              <select v-model="config.itemCount" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent">
                <option value="5">5 items</option>
                <option value="10">10 items</option>
                <option value="15">15 items</option>
                <option value="20">20 items</option>
              </select>
            </div>
          </div>
        </div>

        <!-- User Profile Configuration -->
        <div v-else-if="selectedType?.id === 'user-profile'">
          <h3 class="text-lg font-bold text-gray-900 mb-4">Configure User Profile</h3>
          <p class="text-sm text-gray-600 mb-4">User profile widget will display your current profile information. No additional configuration needed.</p>
        </div>
      </div>

      <!-- Footer -->
      <div class="flex items-center justify-between p-6 border-t border-gray-200 bg-gray-50">
        <button 
          v-if="currentStep === 2"
          @click="currentStep = 1"
          class="px-4 py-2 text-gray-700 hover:bg-gray-200 rounded-lg transition"
        >
          ← Back
        </button>
        <div v-else></div>
        
        <div class="flex space-x-3">
          <button 
            @click="$emit('close')"
            class="px-4 py-2 text-gray-700 hover:bg-gray-200 rounded-lg transition"
          >
            Cancel
          </button>
          <button 
            v-if="currentStep === 2"
            @click="handleAddWidget"
            class="px-6 py-2 bg-primary hover:bg-primary-dark text-white rounded-lg transition font-medium"
          >
            Add Widget
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { Icon } from '@iconify/vue'

const emit = defineEmits(['close', 'add-widget'])

const currentStep = ref(1)
const selectedType = ref(null)
const config = ref({})

const handleEscape = (e) => {
  if (e.key === 'Escape') {
    emit('close')
  }
}

onMounted(() => {
  window.addEventListener('keydown', handleEscape)
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleEscape)
})

const widgetTypes = [
  {
    id: 'bar-chart',
    name: 'Bar Chart',
    description: 'Compare data with stacked bars',
    icon: 'mdi:chart-bar-stacked',
    iconColor: 'text-green-600',
    bgColor: 'bg-green-100',
    component: 'PaymentChartWidget'
  },
  {
    id: 'line-graph',
    name: 'Line Graph',
    description: 'Track trends over time',
    icon: 'mdi:chart-line',
    iconColor: 'text-purple-600',
    bgColor: 'bg-purple-100',
    component: 'PurchasesChartWidget'
  },
  {
    id: 'number',
    name: 'Number',
    description: 'Display a single metric',
    icon: 'mdi:numeric',
    iconColor: 'text-blue-600',
    bgColor: 'bg-blue-100',
    component: 'NumberWidget'
  },
  {
    id: 'quick-links',
    name: 'Quick Links',
    description: 'Shortcuts to actions',
    icon: 'mdi:link-variant',
    iconColor: 'text-orange-600',
    bgColor: 'bg-orange-100',
    component: 'QuickLinksWidget'
  },
  {
    id: 'recent-items',
    name: 'Recent Items',
    description: 'List of recent activity',
    icon: 'mdi:format-list-bulleted',
    iconColor: 'text-indigo-600',
    bgColor: 'bg-indigo-100',
    component: 'NewCustomersWidget'
  },
  {
    id: 'user-profile',
    name: 'User Profile',
    description: 'Display user information',
    icon: 'mdi:account-circle',
    iconColor: 'text-pink-600',
    bgColor: 'bg-pink-100',
    component: 'UserProfileWidget'
  }
]

const selectWidgetType = (type) => {
  selectedType.value = type
  config.value = getDefaultConfig(type.id)
  currentStep.value = 2
}

const getDefaultConfig = (typeId) => {
  switch (typeId) {
    case 'bar-chart':
      return { timePeriod: 'week', dataType: 'payments' }
    case 'line-graph':
      return { timePeriod: 'week', primaryMetric: 'purchases', secondaryMetric: 'cancelled' }
    case 'number':
      return { metric: 'total-revenue', timePeriod: 'month' }
    case 'recent-items':
      return { itemType: 'customers', itemCount: '10' }
    default:
      return {}
  }
}

const handleAddWidget = () => {
  emit('add-widget', {
    component: selectedType.value.component,
    type: selectedType.value.id,
    config: config.value
  })
}
</script>
