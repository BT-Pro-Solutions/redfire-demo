<template>
  <div class="widget-container">
    <div class="icon-wrapper" :class="iconBg">
      <Icon :icon="iconName" class="metric-icon" :class="iconColor" />
    </div>
    
    <div class="metric-content">
      <div class="metric-value">{{ displayValue }}</div>
      <div class="metric-label">{{ metricLabel }}</div>
      <div class="metric-period">{{ timePeriodLabel }}</div>
    </div>

    <div v-if="change !== null" class="change-badge" :class="changeBgColor">
      <Icon :icon="changeIcon" class="change-icon" />
      <span class="change-percentage">{{ Math.abs(change) }}%</span>
      <span class="change-text">vs last period</span>
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
    iconColor: 'icon-emerald',
    iconBg: 'bg-emerald',
    format: 'currency'
  },
  'total-orders': {
    label: 'Total Orders',
    value: 342,
    change: 8.2,
    icon: 'mdi:cart',
    iconColor: 'icon-blue',
    iconBg: 'bg-blue',
    format: 'number'
  },
  'avg-order': {
    label: 'Average Order Value',
    value: 71.64,
    change: -2.4,
    icon: 'mdi:cash',
    iconColor: 'icon-orange',
    iconBg: 'bg-orange',
    format: 'currency'
  },
  'total-customers': {
    label: 'Total Customers',
    value: 1248,
    change: 15.3,
    icon: 'mdi:account-group',
    iconColor: 'icon-purple',
    iconBg: 'bg-purple',
    format: 'number'
  },
  'low-stock-items': {
    label: 'Low Stock Items',
    value: 6,
    change: null,
    icon: 'mdi:alert-circle',
    iconColor: 'icon-red',
    iconBg: 'bg-red',
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

const changeBgColor = computed(() => {
  if (change.value === null) return ''
  return change.value >= 0 ? 'change-positive' : 'change-negative'
})

const changeIcon = computed(() => {
  if (change.value === null) return ''
  return change.value >= 0 ? 'mdi:trending-up' : 'mdi:trending-down'
})
</script>

<style scoped>
.widget-container {
  background-color: white;
  border-radius: 1rem;
  border: 1px solid var(--gray-100);
  padding: 1.5rem;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.icon-wrapper {
  width: 4rem;
  height: 4rem;
  border-radius: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1rem;
}

.bg-emerald {
  background: linear-gradient(to bottom right, #dcfce7, #ccfbf1);
}

.bg-blue {
  background: linear-gradient(to bottom right, #dbeafe, #e0f2fe);
}

.bg-orange {
  background: linear-gradient(to bottom right, #fed7aa, #fef3c7);
}

.bg-purple {
  background: linear-gradient(to bottom right, #fce7f3, #fce7f3);
}

.bg-red {
  background: linear-gradient(to bottom right, #fef2f2, #fff7ed);
}

.metric-icon {
  font-size: 1.875rem;
}

.icon-emerald {
  color: #059669;
}

.icon-blue {
  color: var(--blue-600);
}

.icon-orange {
  color: var(--orange-500);
}

.icon-purple {
  color: var(--purple-600);
}

.icon-red {
  color: var(--red-600);
}

.metric-content {
  text-align: center;
}

.metric-value {
  font-size: 2.25rem;
  font-weight: 700;
  color: var(--gray-900);
  margin-bottom: 0.5rem;
}

.metric-label {
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--gray-600);
  margin-bottom: 0.25rem;
}

.metric-period {
  font-size: 0.75rem;
  color: var(--gray-500);
}

.change-badge {
  margin-top: 1rem;
  display: flex;
  align-items: center;
  gap: 0.25rem;
  font-size: 0.875rem;
  padding: 0.375rem 0.75rem;
  border-radius: 0.5rem;
}

.change-positive {
  background-color: #dcfce7;
  color: #15803d;
}

.change-negative {
  background-color: var(--red-50);
  color: #b91c1c;
}

.change-icon {
  font-size: 1.125rem;
}

.change-percentage {
  font-weight: 600;
}

.change-text {
  opacity: 0.75;
}
</style>
