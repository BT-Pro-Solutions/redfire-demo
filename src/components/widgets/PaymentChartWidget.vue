<template>
  <div class="bg-surface rounded-lg shadow-lg p-6 h-full flex flex-col">
    <div class="flex items-center justify-between mb-4">
      <h3 class="text-lg font-bold text-gray-900">Weekly Payments</h3>
      <Icon icon="mdi:cash-multiple" class="text-2xl text-green-500" />
    </div>
    <div class="flex-1 min-h-0">
      <Bar :data="chartData" :options="chartOptions" />
    </div>
  </div>
</template>

<script setup>
import { computed, shallowRef } from 'vue'
import { Bar } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'
import { Icon } from '@iconify/vue'
import { useDemoDataStore } from '@/stores/demoData'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

ChartJS.defaults.animation = false

const store = useDemoDataStore()

const chartData = computed(() => ({
  labels: store.weeklyPayments.map(d => d.day),
  datasets: [
    {
      label: 'Cash',
      data: store.weeklyPayments.map(d => d.cash),
      backgroundColor: '#10b981',
    },
    {
      label: 'Check',
      data: store.weeklyPayments.map(d => d.check),
      backgroundColor: '#3b82f6',
    },
    {
      label: 'Credit Card',
      data: store.weeklyPayments.map(d => d.creditcard),
      backgroundColor: '#8b5cf6',
    },
    {
      label: 'Gift Card',
      data: store.weeklyPayments.map(d => d.giftcard),
      backgroundColor: '#f59e0b',
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
      stacked: true,
      grid: { display: false }
    },
    y: {
      stacked: true,
      ticks: {
        callback: (value) => '$' + value.toLocaleString()
      }
    }
  }
})
</script>

