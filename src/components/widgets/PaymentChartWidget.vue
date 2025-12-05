<template>
  <div class="bg-white rounded-2xl border border-gray-100 p-6 h-full flex flex-col">
    <div class="flex items-center justify-between mb-4">
      <h3 class="text-lg font-bold text-gray-900">Weekly Payments</h3>
      <div class="w-10 h-10 bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl flex items-center justify-center">
        <Icon icon="mdi:cash-multiple" class="text-xl text-emerald-600" />
      </div>
    </div>
    <div class="flex-1 min-h-0">
      <Bar ref="chartRef" :data="chartData" :options="chartOptions" :key="chartKey" />
    </div>
  </div>
</template>

<script setup>
import { computed, shallowRef, ref, onMounted } from 'vue'
import { Bar } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'
import { Icon } from '@iconify/vue'
import { useDemoDataStore } from '@/stores/demoData'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

const store = useDemoDataStore()
const chartRef = ref(null)
const chartKey = ref(0)

onMounted(() => {
  // Force chart to re-render with animation
  chartKey.value++
})

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
      },
      {
        label: 'Check',
        data: store.weeklyPayments.map(d => d.check),
        backgroundColor: checkGradient,
      },
      {
        label: 'Credit Card',
        data: store.weeklyPayments.map(d => d.creditcard),
        backgroundColor: creditCardGradient,
      },
      {
        label: 'Gift Card',
        data: store.weeklyPayments.map(d => d.giftcard),
        backgroundColor: giftCardGradient,
      }
    ]
  }
})

const chartOptions = shallowRef({
  responsive: true,
  maintainAspectRatio: false,
  animations: {
    // Disable all movement - only fade opacity
    x: false,
    y: false,
    colors: {
      duration: 0
    },
    // Only animate opacity for fade in
    opacity: {
      duration: 500,
      easing: 'linear',
      from: 0,
      to: 1,
      delay: (context) => {
        // Fade in each column group sequentially
        if (context.type === 'data') {
          return context.dataIndex * 150;
        }
        return 0;
      }
    }
  },
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

