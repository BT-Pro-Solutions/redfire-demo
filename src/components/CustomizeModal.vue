<template>
  <div class="modal-overlay" @click.self="$emit('close')">
    <div class="modal-container">
      <!-- Header -->
      <div class="modal-header">
        <div>
          <h2 class="modal-title">Add Widget</h2>
          <p class="modal-subtitle">
            Step {{ currentStep }} of 2: {{ currentStep === 1 ? 'Choose widget type' : 'Configure widget' }}
          </p>
        </div>
        <button @click="$emit('close')" class="close-button">
          <Icon icon="mdi:close" class="close-icon" />
        </button>
      </div>

      <!-- Step 1: Choose Widget Type -->
      <div v-if="currentStep === 1" class="modal-body">
        <p class="intro-text">Select the type of widget you want to add to your dashboard.</p>
        
        <div class="widget-grid">
          <button
            v-for="type in widgetTypes"
            :key="type.id"
            @click="selectWidgetType(type)"
            class="widget-type-button"
          >
            <div 
              class="widget-icon"
              :class="type.bgColor"
            >
              <Icon :icon="type.icon" class="icon" :class="type.iconColor" />
            </div>
            <h3 class="widget-type-name">{{ type.name }}</h3>
            <p class="widget-type-description">{{ type.description }}</p>
          </button>
        </div>
      </div>

      <!-- Step 2: Configure Widget -->
      <div v-else class="modal-body">
        <!-- Bar Chart Configuration -->
        <div v-if="selectedType?.id === 'bar-chart'">
          <h3 class="config-title">Configure Bar Chart</h3>
          
          <div class="config-form">
            <div class="form-group">
              <label class="form-label">Time Period (X-Axis)</label>
              <select v-model="config.timePeriod" class="form-select">
                <option value="week">Last 7 Days</option>
                <option value="month">Last 30 Days</option>
                <option value="quarter">Last 3 Months</option>
                <option value="year">Last 12 Months</option>
              </select>
            </div>

            <div class="form-group">
              <label class="form-label">Data to Display</label>
              <select v-model="config.dataType" class="form-select">
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
          <h3 class="config-title">Configure Line Graph</h3>
          
          <div class="config-form">
            <div class="form-group">
              <label class="form-label">Time Period (X-Axis)</label>
              <select v-model="config.timePeriod" class="form-select">
                <option value="week">Last 7 Days</option>
                <option value="month">Last 30 Days</option>
                <option value="quarter">Last 3 Months</option>
                <option value="year">Last 12 Months</option>
              </select>
            </div>

            <div class="form-group">
              <label class="form-label">Primary Metric</label>
              <select v-model="config.primaryMetric" class="form-select">
                <option value="purchases">Purchases</option>
                <option value="revenue">Revenue</option>
                <option value="customers">Customer Count</option>
                <option value="orders">Order Count</option>
              </select>
            </div>

            <div class="form-group">
              <label class="form-label">Secondary Metric (Optional)</label>
              <select v-model="config.secondaryMetric" class="form-select">
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
          <h3 class="config-title">Configure Number Widget</h3>
          
          <div class="config-form">
            <div class="form-group">
              <label class="form-label">Metric to Display</label>
              <select v-model="config.metric" class="form-select">
                <option value="total-revenue">Total Revenue</option>
                <option value="total-orders">Total Orders</option>
                <option value="avg-order">Average Order Value</option>
                <option value="total-customers">Total Customers</option>
                <option value="low-stock-items">Low Stock Items</option>
              </select>
            </div>

            <div class="form-group">
              <label class="form-label">Time Period</label>
              <select v-model="config.timePeriod" class="form-select">
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
          <h3 class="config-title">Configure Quick Links</h3>
          <p class="config-description">Quick links widget will use default shortcuts. You can customize individual links after adding the widget.</p>
        </div>

        <!-- Recent Items Configuration -->
        <div v-else-if="selectedType?.id === 'recent-items'">
          <h3 class="config-title">Configure Recent Items</h3>
          
          <div class="config-form">
            <div class="form-group">
              <label class="form-label">Item Type</label>
              <select v-model="config.itemType" class="form-select">
                <option value="customers">New Customers</option>
                <option value="orders">Recent Orders</option>
                <option value="products">New Products</option>
                <option value="inventory">Low Inventory</option>
              </select>
            </div>

            <div class="form-group">
              <label class="form-label">Number of Items to Show</label>
              <select v-model="config.itemCount" class="form-select">
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
          <h3 class="config-title">Configure User Profile</h3>
          <p class="config-description">User profile widget will display your current profile information. No additional configuration needed.</p>
        </div>
      </div>

      <!-- Footer -->
      <div class="modal-footer">
        <button 
          v-if="currentStep === 2"
          @click="currentStep = 1"
          class="back-button"
        >
          ← Back
        </button>
        <div v-else></div>
        
        <div class="footer-actions">
          <button 
            @click="$emit('close')"
            class="cancel-button"
          >
            Cancel
          </button>
          <button 
            v-if="currentStep === 2"
            @click="handleAddWidget"
            class="submit-button"
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
    iconColor: 'text-green',
    bgColor: 'bg-green'
  },
  {
    id: 'line-graph',
    name: 'Line Graph',
    description: 'Track trends over time',
    icon: 'mdi:chart-line',
    iconColor: 'text-purple',
    bgColor: 'bg-purple'
  },
  {
    id: 'number',
    name: 'Number',
    description: 'Display a single metric',
    icon: 'mdi:numeric',
    iconColor: 'text-blue',
    bgColor: 'bg-blue'
  },
  {
    id: 'quick-links',
    name: 'Quick Links',
    description: 'Shortcuts to actions',
    icon: 'mdi:link-variant',
    iconColor: 'text-orange',
    bgColor: 'bg-orange'
  },
  {
    id: 'recent-items',
    name: 'Recent Items',
    description: 'List of recent activity',
    icon: 'mdi:format-list-bulleted',
    iconColor: 'text-indigo',
    bgColor: 'bg-indigo'
  },
  {
    id: 'user-profile',
    name: 'User Profile',
    description: 'Display user information',
    icon: 'mdi:account-circle',
    iconColor: 'text-pink',
    bgColor: 'bg-pink'
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

<style scoped>
.modal-overlay {
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 50;
  padding: 1rem;
}

.modal-container {
  background-color: white;
  border-radius: 0.75rem;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  max-width: 48rem;
  width: 100%;
  max-height: 85vh;
  overflow: hidden;
}

.modal-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.5rem;
  border-bottom: 1px solid var(--gray-200);
}

.modal-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--gray-900);
}

.modal-subtitle {
  font-size: 0.875rem;
  color: var(--gray-500);
  margin-top: 0.25rem;
}

.close-button {
  color: var(--gray-400);
  transition: color 0.15s ease-in-out;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
}

.close-button:hover {
  color: var(--gray-600);
}

.close-icon {
  font-size: 1.5rem;
}

.modal-body {
  padding: 1.5rem;
  overflow-y: auto;
  max-height: calc(85vh - 180px);
}

.intro-text {
  color: var(--gray-600);
  margin-bottom: 1.5rem;
}

.widget-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
}

.widget-type-button {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1.5rem;
  border: 2px solid var(--gray-200);
  border-radius: 0.75rem;
  transition: all 0.15s ease-in-out;
  background: white;
  cursor: pointer;
}

.widget-type-button:hover {
  border-color: rgb(var(--color-primary-rgb));
  background-color: rgba(59, 130, 246, 0.05);
}

.widget-icon {
  width: 4rem;
  height: 4rem;
  border-radius: 0.75rem;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 0.75rem;
  transition: transform 0.15s ease-in-out;
}

.widget-type-button:hover .widget-icon {
  transform: scale(1.1);
}

.icon {
  font-size: 1.875rem;
}

.bg-green {
  background-color: var(--green-100);
}

.text-green {
  color: var(--green-600);
}

.bg-purple {
  background-color: var(--purple-100);
}

.text-purple {
  color: var(--purple-600);
}

.bg-blue {
  background-color: var(--blue-100);
}

.text-blue {
  color: var(--blue-600);
}

.bg-orange {
  background-color: var(--orange-50);
}

.text-orange {
  color: var(--orange-500);
}

.bg-indigo {
  background-color: var(--indigo-100);
}

.text-indigo {
  color: var(--indigo-600);
}

.bg-pink {
  background-color: var(--pink-100);
}

.text-pink {
  color: var(--pink-600);
}

.widget-type-name {
  font-size: 1rem;
  font-weight: 600;
  color: var(--gray-900);
  margin-bottom: 0.25rem;
}

.widget-type-description {
  font-size: 0.75rem;
  color: var(--gray-500);
  text-align: center;
}

.config-title {
  font-size: 1.125rem;
  font-weight: 700;
  color: var(--gray-900);
  margin-bottom: 1rem;
}

.config-description {
  font-size: 0.875rem;
  color: var(--gray-600);
  margin-bottom: 1rem;
}

.config-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.form-group {
  display: flex;
  flex-direction: column;
}

.form-label {
  display: block;
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--gray-700);
  margin-bottom: 0.5rem;
}

.form-select {
  width: 100%;
  padding: 0.5rem 1rem;
  border: 1px solid var(--gray-300);
  border-radius: 0.5rem;
  outline: none;
  transition: all 0.15s ease-in-out;
  background-color: white;
  cursor: pointer;
}

.form-select:focus {
  box-shadow: 0 0 0 2px rgb(var(--color-primary-rgb) / 0.2);
  border-color: transparent;
}

.modal-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.5rem;
  border-top: 1px solid var(--gray-200);
  background-color: var(--gray-50);
}

.back-button {
  padding: 0.5rem 1rem;
  color: var(--gray-700);
  background: none;
  border: none;
  border-radius: 0.5rem;
  transition: background-color 0.15s ease-in-out;
  cursor: pointer;
}

.back-button:hover {
  background-color: var(--gray-200);
}

.footer-actions {
  display: flex;
  gap: 0.75rem;
}

.cancel-button {
  padding: 0.5rem 1rem;
  color: var(--gray-700);
  background: none;
  border: none;
  border-radius: 0.5rem;
  transition: background-color 0.15s ease-in-out;
  cursor: pointer;
}

.cancel-button:hover {
  background-color: var(--gray-200);
}

.submit-button {
  padding: 0.5rem 1.5rem;
  background-color: rgb(var(--color-primary-rgb));
  color: white;
  border: none;
  border-radius: 0.5rem;
  font-weight: 500;
  transition: background-color 0.15s ease-in-out;
  cursor: pointer;
}

.submit-button:hover {
  background-color: var(--color-primary-dark);
}
</style>
