<template>
  <div>
    <div class="mb-6">
      <h1 class="text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
      <p class="text-gray-600">Welcome back, {{ userName }}</p>
    </div>

    <div class="dashboard-grid-container hidden lg:block">
      <div class="dashboard-shadow-grid">
        <div
          v-for="n in 12"
          :key="`shadow-${n}`"
          @click="handleEmptySlotClick(((n-1) % 4), Math.floor((n-1) / 4))"
          class="bg-gray backdrop-blur-sm rounded-2xl border-2 border-dashed border-gray-200 hover:border-primary hover:bg-white/80 transition cursor-pointer flex items-center justify-center group"
        >
          <Icon icon="mdi:plus" class="text-6xl text-gray-300 opacity-50 group-hover:opacity-100 group-hover:text-primary transition" />
        </div>
      </div>

      <div class="dashboard-widget-grid">
        <grid-layout
          v-model:layout="widgetLayout"
          :col-num="4"
          :row-height="rowHeight"
          :max-rows="3"
          :is-draggable="true"
          :is-resizable="true"
          :vertical-compact="false"
          :prevent-collision="true"
          :use-css-transforms="true"
          :margin="[24, 24]"
          @layout-updated="saveLayout"
        >
          <grid-item
            v-for="item in widgetLayout"
            :key="item.i"
            :x="item.x"
            :y="item.y"
            :w="item.w"
            :h="item.h"
            :i="item.i"
            :max-h="3"
            class="grid-item-wrapper"
          >
            <div class="widget-content">
              <component :is="getWidgetComponent(item.component)" />
            </div>
            
            <div class="widget-controls">
              <button
                @click.stop="confirmRemoveWidget(item.i)"
                class="widget-remove-btn"
                title="Remove widget"
              >
                <Icon icon="mdi:close" />
              </button>
            </div>
          </grid-item>
        </grid-layout>
      </div>
    </div>

    <div class="hidden md:grid lg:hidden grid-cols-2 gap-6">
      <div
        v-for="item in widgetLayout"
        :key="item.i"
        style="min-height: 300px;"
      >
        <component :is="getWidgetComponent(item.component)" />
      </div>
    </div>

    <div class="grid md:hidden grid-cols-1 gap-6">
      <div
        v-for="item in widgetLayout"
        :key="item.i"
        style="min-height: 300px;"
      >
        <component :is="getWidgetComponent(item.component)" />
      </div>
    </div>

    <CustomizeModal 
      v-if="showCustomizeModal" 
      @close="showCustomizeModal = false; selectedEmptySlot = null"
      @add-widget="handleAddWidget"
    />
    <div 
      v-if="showRemoveConfirm"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      @click.self="cancelRemove"
    >
      <div class="bg-white rounded-lg shadow-2xl p-6 max-w-md w-full mx-4">
        <div class="flex items-start space-x-4 mb-4">
          <div class="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
            <Icon icon="mdi:alert" class="text-2xl text-red-600" />
          </div>
          <div>
            <h3 class="text-lg font-bold text-gray-900 mb-2">Remove Widget?</h3>
            <p class="text-sm text-gray-600">Are you sure you want to remove this widget from your dashboard?</p>
          </div>
        </div>
        <div class="flex justify-end space-x-3">
          <button
            @click="cancelRemove"
            class="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition"
          >
            Cancel
          </button>
          <button
            @click="removeWidget"
            class="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition"
          >
            Remove
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { GridLayout, GridItem } from 'vue3-grid-layout-next'
import { Icon } from '@iconify/vue'

import UserProfileWidget from '@/components/widgets/UserProfileWidget.vue'
import PaymentChartWidget from '@/components/widgets/PaymentChartWidget.vue'
import PurchasesChartWidget from '@/components/widgets/PurchasesChartWidget.vue'
import NewCustomersWidget from '@/components/widgets/NewCustomersWidget.vue'
import LowInventoryWidget from '@/components/widgets/LowInventoryWidget.vue'
import QuickLinksWidget from '@/components/widgets/QuickLinksWidget.vue'
import NumberWidget from '@/components/widgets/NumberWidget.vue'
import CustomizeModal from '@/components/CustomizeModal.vue'

const showCustomizeModal = ref(false)
const showRemoveConfirm = ref(false)
const widgetToRemove = ref(null)

const calculateRowHeight = () => {
  const containerHeight = Math.max(window.innerHeight - 280, 500)
  const padding = 48
  const gaps = 48
  return Math.floor((containerHeight - padding - gaps) / 3)
}

const rowHeight = ref(calculateRowHeight())

const confirmRemoveWidget = (widgetId) => {
  widgetToRemove.value = widgetId
  showRemoveConfirm.value = true
}

const removeWidget = () => {
  if (widgetToRemove.value) {
    widgetLayout.value = widgetLayout.value.filter(item => item.i !== widgetToRemove.value)
    saveLayout()
  }
  showRemoveConfirm.value = false
  widgetToRemove.value = null
}

const cancelRemove = () => {
  showRemoveConfirm.value = false
  widgetToRemove.value = null
}

const handleEscape = (e) => {
  if (e.key === 'Escape') {
    if (showRemoveConfirm.value) {
      cancelRemove()
    }
  }
}

const widgetLayout = ref([
  { x: 0, y: 0, w: 1, h: 1, i: '1', component: 'UserProfileWidget' },
  { x: 1, y: 0, w: 2, h: 1, i: '2', component: 'PaymentChartWidget' },
  { x: 3, y: 0, w: 1, h: 1, i: '3', component: 'QuickLinksWidget' },
  { x: 0, y: 1, w: 1, h: 1, i: '4', component: 'NewCustomersWidget' },
  { x: 1, y: 1, w: 1, h: 1, i: '5', component: 'LowInventoryWidget' },
  { x: 2, y: 1, w: 2, h: 1, i: '6', component: 'PurchasesChartWidget' },
])

const userName = computed(() => {
  const user = JSON.parse(localStorage.getItem('user') || '{}')
  return user.name || 'User'
})

const widgetComponents = {
  UserProfileWidget,
  PaymentChartWidget,
  PurchasesChartWidget,
  NewCustomersWidget,
  LowInventoryWidget,
  QuickLinksWidget,
  NumberWidget
}

const getWidgetComponent = (componentName) => {
  return widgetComponents[componentName] || null
}

const selectedEmptySlot = ref(null)

const handleEmptySlotClick = (x, y) => {
  selectedEmptySlot.value = { x, y }
  showCustomizeModal.value = true
}

const handleAddWidget = (widgetConfig) => {
  const newId = String(Date.now())
  const position = selectedEmptySlot.value || { x: 0, y: 0 }
  
  widgetLayout.value.push({
    x: position.x,
    y: position.y,
    w: 1,
    h: 1,
    i: newId,
    component: widgetConfig.component,
    config: widgetConfig
  })
  
  saveLayout()
  showCustomizeModal.value = false
  selectedEmptySlot.value = null
}

const saveLayout = () => {
  localStorage.setItem('dashboardLayout', JSON.stringify(widgetLayout.value))
}

onMounted(() => {
  const savedLayout = localStorage.getItem('dashboardLayout')
  if (savedLayout) {
    try {
      widgetLayout.value = JSON.parse(savedLayout)
    } catch (e) {
      console.error('Failed to load saved layout:', e)
    }
  }
  
  const handleResize = () => {
    rowHeight.value = calculateRowHeight()
  }
  window.addEventListener('resize', handleResize)
  window.addEventListener('keydown', handleEscape)
  
  onUnmounted(() => {
    window.removeEventListener('resize', handleResize)
    window.removeEventListener('keydown', handleEscape)
  })
})
</script>

<style scoped>
.dashboard-grid-container {
  position: relative;
  height: calc(100vh - 280px);
  min-height: 500px;
}

.dashboard-shadow-grid {
  position: absolute;
  inset: 0;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(3, 1fr);
  gap: 24px;
  padding: 24px;
}

.dashboard-widget-grid {
  position: relative;
  pointer-events: none;
  z-index: 10;
  height: 100%;
  min-height: 500px;
}

.grid-item-wrapper {
  touch-action: none;
  position: relative;
}

.widget-content {
  width: 100%;
  height: 100%;
  will-change: transform;
  transform: translateZ(0);
}

.widget-controls {
  position: absolute;
  top: 8px;
  right: 8px;
  opacity: 0;
  transition: opacity 0.2s;
  pointer-events: auto;
  z-index: 20;
}

.grid-item-wrapper:hover .widget-controls {
  opacity: 1;
}

.widget-remove-btn {
  width: 32px;
  height: 32px;
  background: rgba(239, 68, 68, 0.95);
  color: white;
  border: none;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
}

.widget-remove-btn:hover {
  background: rgb(220, 38, 38);
  transform: scale(1.05);
}

:deep(.vue-grid-item) {
  pointer-events: auto !important;
  will-change: transform;
  backface-visibility: hidden;
  transform: translateZ(0);
}

:deep(.vue-grid-item:not(.vue-grid-placeholder)) {
  transition: none;
}

:deep(.vue-grid-item.cssTransforms) {
  transition: none;
}

:deep(.vue-grid-item.vue-grid-placeholder) {
  background: rgba(59, 130, 246, 0.1);
  border: 2px dashed rgba(59, 130, 246, 0.4);
  border-radius: 1rem;
  transition: all 0.2s ease;
  pointer-events: none !important;
}

:deep(.vue-grid-item > .vue-resizable-handle) {
  background: none;
  opacity: 0;
  transition: opacity 0.2s;
  pointer-events: auto !important;
}

:deep(.vue-grid-item:hover > .vue-resizable-handle) {
  opacity: 1;
}

:deep(.vue-resizable-handle::after) {
  content: '';
  position: absolute;
  right: 8px;
  bottom: 8px;
  width: 12px;
  height: 12px;
  border-right: 3px solid rgba(59, 130, 246, 0.8);
  border-bottom: 3px solid rgba(59, 130, 246, 0.8);
}

.vue-draggable-dragging {
  box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.8);
}

@media (max-width: 1023px) {
  .dashboard-grid-container {
    display: none;
  }
}
</style>
