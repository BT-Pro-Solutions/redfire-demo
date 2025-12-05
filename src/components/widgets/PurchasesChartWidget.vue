<template>
  <div class="bg-surface rounded-lg shadow-lg p-6 h-full flex flex-col">
    <div class="flex items-center justify-between mb-4">
      <h3 class="text-lg font-bold text-gray-900">Weekly Purchases</h3>
      <Icon icon="mdi:cart-outline" class="text-2xl text-blue-500" />
    </div>
    <div class="flex-1 min-h-0">
      <Line ref="chartRef" :data="chartData" :options="chartOptions" />
    </div>
  </div>
</template>

<script setup>
import { computed, shallowRef, ref, onMounted, watch } from 'vue'
import { Line } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, LineElement, CategoryScale, LinearScale, PointElement, Filler } from 'chart.js'
import { Icon } from '@iconify/vue'
import { useDemoDataStore } from '@/stores/demoData'

ChartJS.register(Title, Tooltip, Legend, LineElement, CategoryScale, LinearScale, PointElement, Filler)

ChartJS.defaults.animation = false

const store = useDemoDataStore()
const chartRef = ref(null)

// Create gradients for the chart
const createGradient = (ctx, color1, color2) => {
  const gradient = ctx.createLinearGradient(0, 0, 0, ctx.canvas.height)
  gradient.addColorStop(0, color1)
  gradient.addColorStop(1, color2)
  return gradient
}

const chartData = computed(() => {
  const canvas = chartRef.value?.chart?.ctx?.canvas
  const ctx = canvas?.getContext('2d')
  
  // Beautiful gradient colors - from solid to transparent
  const purchasesGradient = ctx ? createGradient(
    ctx,
    'rgba(14, 165, 233, 0.4)',  // Sky blue - vibrant at top
    'rgba(14, 165, 233, 0)'     // Transparent at bottom
  ) : 'rgba(14, 165, 233, 0.2)'
  
  const cancelledGradient = ctx ? createGradient(
    ctx,
    'rgba(99, 102, 241, 0.4)',  // Indigo - vibrant at top
    'rgba(99, 102, 241, 0)'     // Transparent at bottom
  ) : 'rgba(99, 102, 241, 0.2)'

  return {
    labels: store.weeklyPurchases.map(d => d.day),
    datasets: [
      {
        label: 'Purchases',
        data: store.weeklyPurchases.map(d => d.purchases),
        borderColor: '#0EA5E9',  // Sky blue
        backgroundColor: purchasesGradient,
        borderWidth: 3,
        tension: 0.4,
        fill: true,
        pointRadius: 6,
        pointHoverRadius: 8,
        pointBackgroundColor: '#0EA5E9',
        pointBorderColor: '#ffffff',
        pointBorderWidth: 2,
        pointHoverBackgroundColor: '#0EA5E9',
        pointHoverBorderColor: '#ffffff',
        pointHoverBorderWidth: 3,
      },
      {
        label: 'Cancelled',
        data: store.weeklyPurchases.map(d => d.cancelled),
        borderColor: '#6366F1',  // Indigo
        backgroundColor: cancelledGradient,
        borderWidth: 3,
        tension: 0.4,
        fill: true,
        pointRadius: 6,
        pointHoverRadius: 8,
        pointBackgroundColor: '#6366F1',
        pointBorderColor: '#ffffff',
        pointBorderWidth: 2,
        pointHoverBackgroundColor: '#6366F1',
        pointHoverBorderColor: '#ffffff',
        pointHoverBorderWidth: 3,
      }
    ]
  }
})

const chartOptions = shallowRef({
  responsive: true,
  maintainAspectRatio: false,
  animation: false,
  interaction: {
    mode: 'index',
    intersect: false,
  },
  plugins: {
    legend: {
      position: 'bottom',
      labels: {
        boxWidth: 12,
        padding: 15,
        font: { 
          size: 12,
          weight: '500'
        },
        usePointStyle: true,
        pointStyle: 'circle',
      }
    },
    tooltip: {
      mode: 'index',
      intersect: false,
      backgroundColor: 'rgba(0, 0, 0, 0.8)',
      padding: 12,
      cornerRadius: 8,
      titleFont: {
        size: 13,
        weight: '600'
      },
      bodyFont: {
        size: 12
      },
      borderColor: 'rgba(255, 255, 255, 0.1)',
      borderWidth: 1,
    }
  },
  scales: {
    x: {
      grid: { 
        display: false,
        drawBorder: false,
      },
      ticks: {
        font: { size: 11 },
        color: '#6B7280'
      }
    },
    y: {
      beginAtZero: true,
      grid: { 
        color: 'rgba(0, 0, 0, 0.05)',
        drawBorder: false,
      },
      ticks: {
        stepSize: 20,
        font: { size: 11 },
        color: '#6B7280'
      }
    }
  }
})

// Watch for chart mount and data changes to update gradients
watch(() => chartRef.value, () => {
  if (chartRef.value?.chart) {
    chartRef.value.chart.update()
  }
}, { flush: 'post' })
</script>

