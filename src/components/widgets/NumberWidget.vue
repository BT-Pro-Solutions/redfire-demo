<template>
  <div class="bg-surface rounded-lg shadow-lg p-6 h-full flex flex-col items-center justify-center">
    <div class="w-16 h-16 rounded-full flex items-center justify-center mb-4" :class="iconBg">
      <Icon :icon="iconName" class="text-3xl" :class="iconColor" />
    </div>
    
    <div class="text-center">
      <div class="text-4xl font-bold text-gray-900 mb-2">{{ displayValue }}</div>
      <div class="text-sm font-medium text-gray-600 mb-1">{{ metricLabel }}</div>
      <div class="text-xs text-gray-500">{{ timePeriodLabel }}</div>
    </div>

    <div v-if="change !== null" class="mt-4 flex items-center space-x-1 text-sm" :class="changeColor">
      <Icon :icon="changeIcon" class="text-lg" />
      <span class="font-medium">{{ Math.abs(change) }}%</span>
      <span class="text-gray-500">vs last period</span>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { Icon } from '@iconify/vue'

const props = defineProps({
  config: {
    type: Object,
    default: () => ({ metric: 'total-revenue', timePeriod: 'month' })
  }
})

const metricData = {
  'total-revenue': {
    label: 'Total Revenue',
    value: 24500,
    change: 12.5,
    icon: 'mdi:currency-usd',
    iconColor: 'text-green-600',
    iconBg: 'bg-green-100',
    format: 'currency'
  },
  'total-orders': {
    label: 'Total Orders',
    value: 342,
    change: 8.2,
    icon: 'mdi:cart',
    iconColor: 'text-blue-600',
    iconBg: 'bg-blue-100',
    format: 'number'
  },
  'avg-order': {
    label: 'Average Order Value',
    value: 71.64,
    change: -2.4,
    icon: 'mdi:cash',
    iconColor: 'text-orange-600',
    iconBg: 'bg-orange-100',
    format: 'currency'
  },
  'total-customers': {
    label: 'Total Customers',
    value: 1248,
    change: 15.3,
    icon: 'mdi:account-group',
    iconColor: 'text-purple-600',
    iconBg: 'bg-purple-100',
    format: 'number'
  },
  'low-stock-items': {
    label: 'Low Stock Items',
    value: 6,
    change: null,
    icon: 'mdi:alert-circle',
    iconColor: 'text-red-600',
    iconBg: 'bg-red-100',
    format: 'number'
  }
}

const timePeriodLabels = {
  'today': 'Today',
  'week': 'This Week',
  'month': 'This Month',
  'all-time': 'All Time'
}

const currentMetric = computed(() => {
  return metricData[props.config.metric] || metricData['total-revenue']
})

const metricLabel = computed(() => currentMetric.value.label)
const iconName = computed(() => currentMetric.value.icon)
const iconColor = computed(() => currentMetric.value.iconColor)
const iconBg = computed(() => currentMetric.value.iconBg)
const change = computed(() => currentMetric.value.change)

const displayValue = computed(() => {
  const value = currentMetric.value.value
  if (currentMetric.value.format === 'currency') {
    return '$' + value.toLocaleString()
  }
  return value.toLocaleString()
})

const timePeriodLabel = computed(() => {
  return timePeriodLabels[props.config.timePeriod] || 'This Month'
})

const changeColor = computed(() => {
  if (change.value === null) return ''
  return change.value >= 0 ? 'text-green-600' : 'text-red-600'
})

const changeIcon = computed(() => {
  if (change.value === null) return ''
  return change.value >= 0 ? 'mdi:trending-up' : 'mdi:trending-down'
})
</script>


