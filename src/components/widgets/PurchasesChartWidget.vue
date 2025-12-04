<template>
  <div class="bg-surface rounded-lg shadow-lg p-6 h-full flex flex-col">
    <div class="flex items-center justify-between mb-4">
      <h3 class="text-lg font-bold text-gray-900">Weekly Purchases</h3>
      <Icon icon="mdi:cart-outline" class="text-2xl text-blue-500" />
    </div>
    <div class="flex-1 min-h-0">
      <Line :data="chartData" :options="chartOptions" />
    </div>
  </div>
</template>

<script setup>
import { computed, shallowRef } from 'vue'
import { Line } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, LineElement, CategoryScale, LinearScale, PointElement } from 'chart.js'
import { Icon } from '@iconify/vue'
import { useDemoDataStore } from '@/stores/demoData'

ChartJS.register(Title, Tooltip, Legend, LineElement, CategoryScale, LinearScale, PointElement)

ChartJS.defaults.animation = false

const store = useDemoDataStore()

const chartData = computed(() => ({
  labels: store.weeklyPurchases.map(d => d.day),
  datasets: [
    {
      label: 'Purchases',
      data: store.weeklyPurchases.map(d => d.purchases),
      borderColor: '#10b981',
      backgroundColor: 'rgba(16, 185, 129, 0.1)',
      tension: 0.4,
      fill: true
    },
    {
      label: 'Cancelled',
      data: store.weeklyPurchases.map(d => d.cancelled),
      borderColor: '#ef4444',
      backgroundColor: 'rgba(239, 68, 68, 0.1)',
      tension: 0.4,
      fill: true
    }
  ]
}))

const chartOptions = shallowRef({
  responsive: true,
  maintainAspectRatio: false,
  animation: false,
  plugins: {
    legend: {
      position: 'bottom',
      labels: {
        boxWidth: 12,
        padding: 10,
        font: { size: 11 }
      }
    },
    tooltip: {
      mode: 'index',
      intersect: false,
    }
  },
  scales: {
    x: {
      grid: { display: false }
    },
    y: {
      beginAtZero: true,
      ticks: {
        stepSize: 20
      }
    }
  }
})
</script>

