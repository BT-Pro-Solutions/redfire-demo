<template>
  <div class="widget-container">
    <div class="widget-header">
      <h3 class="widget-title">Weekly Purchases</h3>
      <div class="widget-icon">
        <Icon icon="mdi:cart-outline" class="icon" />
      </div>
    </div>
    <div class="chart-wrapper">
      <Line ref="chartRef" :data="chartData" :options="chartOptions" :key="chartKey" />
    </div>
  </div>
</template>

<script setup>
import { computed, shallowRef, ref, onMounted } from 'vue'
import { Line } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, LineElement, CategoryScale, LinearScale, PointElement, Filler } from 'chart.js'
import { Icon } from '@iconify/vue'
import { useDemoDataStore } from '@/stores/demoData'

ChartJS.register(Title, Tooltip, Legend, LineElement, CategoryScale, LinearScale, PointElement, Filler)

const store = useDemoDataStore()
const chartRef = ref(null)
const chartKey = ref(0)

// Get primary color from CSS variable
const getPrimaryColor = () => {
  const rgb = getComputedStyle(document.documentElement).getPropertyValue('--color-primary-rgb').trim()
  return rgb ? `rgb(${rgb})` : 'rgb(59, 130, 246)'
}

onMounted(() => {
  // Force chart to re-render with animation
  chartKey.value++
})

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
  const primaryColor = getPrimaryColor()
  
  // Parse RGB to get individual values for gradient
  const rgbMatch = primaryColor.match(/rgb\((\d+),?\s*(\d+),?\s*(\d+)\)/)
  const r = rgbMatch ? rgbMatch[1] : '59'
  const g = rgbMatch ? rgbMatch[2] : '130'
  const b = rgbMatch ? rgbMatch[3] : '246'
  
  // Beautiful gradient colors - from solid to transparent
  const purchasesGradient = ctx ? createGradient(
    ctx,
    `rgba(${r}, ${g}, ${b}, 0.4)`,  // Primary color - vibrant at top
    `rgba(${r}, ${g}, ${b}, 0)`     // Transparent at bottom
  ) : `rgba(${r}, ${g}, ${b}, 0.2)`
  
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
        borderColor: primaryColor,
        backgroundColor: purchasesGradient,
        borderWidth: 3,
        tension: 0.4,
        fill: true,
        pointRadius: 6,
        pointHoverRadius: 8,
        pointBackgroundColor: primaryColor,
        pointBorderColor: '#ffffff',
        pointBorderWidth: 2,
        pointHoverBackgroundColor: primaryColor,
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
}

.widget-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;
}

.widget-title {
  font-size: 1.125rem;
  font-weight: 700;
  color: var(--gray-900);
}

.widget-icon {
  width: 2.5rem;
  height: 2.5rem;
  background: linear-gradient(to bottom right, #dbeafe, #e0e7ff);
  border-radius: 0.75rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.icon {
  font-size: 1.25rem;
  color: var(--blue-600);
}

.chart-wrapper {
  flex: 1;
  min-height: 0;
  position: relative;
  overflow: hidden;
}

/* Reveal line chart from left to right */
.chart-wrapper::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: white;
  animation: revealChart 2s ease-out forwards;
  pointer-events: none;
}

@keyframes revealChart {
  from {
    clip-path: inset(0 0 0 0);
  }
  to {
    clip-path: inset(0 0 0 100%);
  }
}
</style>
