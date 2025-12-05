<template>
  <div class="bg-surface rounded-lg shadow-lg p-6 h-full flex flex-col">
    <div class="flex items-center justify-between mb-4">
      <h3 class="text-lg font-bold text-gray-900">Weekly Payments</h3>
      <Icon icon="mdi:cash-multiple" class="text-2xl text-emerald-500" />
    </div>
    <div class="flex-1 min-h-0">
      <Bar ref="chartRef" :data="chartData" :options="chartOptions" />
    </div>
  </div>
</template>

<script setup>
import { computed, shallowRef, ref } from 'vue'
import { Bar } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'
import { Icon } from '@iconify/vue'
import { useDemoDataStore } from '@/stores/demoData'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

ChartJS.defaults.animation = false

const store = useDemoDataStore()
const chartRef = ref(null)

// Create vertical gradients for bars
const createBarGradient = (ctx, color1, color2) => {
  const gradient = ctx.createLinearGradient(0, ctx.canvas.height, 0, 0)
  gradient.addColorStop(0, color1)
  gradient.addColorStop(1, color2)
  return gradient
}

const chartData = computed(() => {
  const canvas = chartRef.value?.chart?.ctx?.canvas
  const ctx = canvas?.getContext('2d')
  
  // Beautiful gradient colors for each payment type
  const cashGradient = ctx ? createBarGradient(
    ctx,
    '#10B981',  // Emerald
    '#34D399'   // Lighter emerald
  ) : '#10B981'
  
  const checkGradient = ctx ? createBarGradient(
    ctx,
    '#0EA5E9',  // Sky blue
    '#38BDF8'   // Lighter sky
  ) : '#0EA5E9'
  
  const creditCardGradient = ctx ? createBarGradient(
    ctx,
    '#6366F1',  // Indigo
    '#818CF8'   // Lighter indigo
  ) : '#6366F1'
  
  const giftCardGradient = ctx ? createBarGradient(
    ctx,
    '#14B8A6',  // Teal
    '#2DD4BF'   // Lighter teal
  ) : '#14B8A6'

  return {
    labels: store.weeklyPayments.map(d => d.day),
    datasets: [
      {
        label: 'Cash',
        data: store.weeklyPayments.map(d => d.cash),
        backgroundColor: cashGradient,
        borderRadius: 6,
        borderSkipped: false,
      },
      {
        label: 'Check',
        data: store.weeklyPayments.map(d => d.check),
        backgroundColor: checkGradient,
        borderRadius: 6,
        borderSkipped: false,
      },
      {
        label: 'Credit Card',
        data: store.weeklyPayments.map(d => d.creditcard),
        backgroundColor: creditCardGradient,
        borderRadius: 6,
        borderSkipped: false,
      },
      {
        label: 'Gift Card',
        data: store.weeklyPayments.map(d => d.giftcard),
        backgroundColor: giftCardGradient,
        borderRadius: 6,
        borderSkipped: false,
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
      callbacks: {
        label: (context) => {
          return context.dataset.label + ': $' + context.parsed.y.toLocaleString()
        }
      }
    }
  },
  scales: {
    x: {
      stacked: true,
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
      stacked: true,
      grid: { 
        color: 'rgba(0, 0, 0, 0.05)',
        drawBorder: false,
      },
      ticks: {
        font: { size: 11 },
        color: '#6B7280',
        callback: (value) => '$' + value.toLocaleString()
      }
    }
  }
})
</script>

