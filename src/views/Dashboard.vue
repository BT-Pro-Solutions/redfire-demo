<template>
  <div>
    <div class="page-header">
      <h1 class="page-title">Dashboard</h1>
      <p class="page-subtitle">Welcome back, {{ userName }}</p>
    </div>

    <div class="dashboard-grid-container">
      <div class="dashboard-shadow-grid">
        <div
          v-for="n in 12"
          :key="`shadow-${n}`"
          @click="handleEmptySlotClick(((n-1) % 4), Math.floor((n-1) / 4))"
          class="empty-slot"
        >
          <Icon icon="mdi:plus" class="empty-slot-icon" />
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

    <div class="tablet-grid">
      <div
        v-for="item in widgetLayout"
        :key="item.i"
        class="tablet-widget"
      >
        <component :is="getWidgetComponent(item.component)" />
      </div>
    </div>

    <div class="mobile-grid">
      <div
        v-for="item in widgetLayout"
        :key="item.i"
        class="mobile-widget"
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
      class="modal-overlay"
      @click.self="cancelRemove"
    >
      <div class="modal-content">
        <div class="modal-body">
          <div class="alert-icon">
            <Icon icon="mdi:alert" class="alert-icon-svg" />
          </div>
          <div>
            <h3 class="modal-title">Remove Widget?</h3>
            <p class="modal-text">Are you sure you want to remove this widget from your dashboard?</p>
          </div>
        </div>
        <div class="modal-actions">
          <button
            @click="cancelRemove"
            class="button-cancel"
          >
            Cancel
          </button>
          <button
            @click="removeWidget"
            class="button-remove"
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
.page-header {
  margin-bottom: 1.5rem;
}

.page-title {
  font-size: 1.875rem;
  font-weight: 700;
  color: var(--gray-900);
  margin-bottom: 0.5rem;
}

.page-subtitle {
  color: var(--gray-600);
}

.dashboard-grid-container {
  position: relative;
  height: calc(100vh - 280px);
  min-height: 500px;
  display: none;
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

.empty-slot {
  background-color: var(--gray-200);
  backdrop-filter: blur(4px);
  border-radius: 1rem;
  border: 2px dashed var(--gray-200);
  transition: all 0.15s ease-in-out;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}

.empty-slot:hover {
  border-color: rgb(var(--color-primary-rgb));
  background-color: rgba(255, 255, 255, 0.8);
}

.empty-slot-icon {
  font-size: 4rem;
  color: var(--gray-300);
  opacity: 0.5;
  transition: all 0.15s ease-in-out;
}

.empty-slot:hover .empty-slot-icon {
  opacity: 1;
  color: rgb(var(--color-primary-rgb));
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

.tablet-grid {
  display: none;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;
}

.tablet-widget {
  min-height: 300px;
}

.mobile-grid {
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 1.5rem;
}

.mobile-widget {
  min-height: 300px;
}

.modal-overlay {
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 50;
}

.modal-content {
  background-color: white;
  border-radius: 0.5rem;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  padding: 1.5rem;
  max-width: 28rem;
  width: 100%;
  margin: 1rem;
}

.modal-body {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  margin-bottom: 1rem;
}

.alert-icon {
  width: 3rem;
  height: 3rem;
  background-color: var(--red-100);
  border-radius: 9999px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.alert-icon-svg {
  font-size: 1.5rem;
  color: var(--red-600);
}

.modal-title {
  font-size: 1.125rem;
  font-weight: 700;
  color: var(--gray-900);
  margin-bottom: 0.5rem;
}

.modal-text {
  font-size: 0.875rem;
  color: var(--gray-600);
}

.modal-actions {
  display: flex;
  justify-content: flex-end;
  gap: 0.75rem;
}

.button-cancel {
  padding: 0.5rem 1rem;
  color: var(--gray-700);
  background: none;
  border: none;
  border-radius: 0.5rem;
  transition: background-color 0.15s ease-in-out;
  cursor: pointer;
}

.button-cancel:hover {
  background-color: var(--gray-100);
}

.button-remove {
  padding: 0.5rem 1rem;
  background-color: var(--red-600);
  color: white;
  border: none;
  border-radius: 0.5rem;
  transition: background-color 0.15s ease-in-out;
  cursor: pointer;
}

.button-remove:hover {
  background-color: var(--red-700);
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

@media (min-width: 768px) {
  .mobile-grid {
    display: none;
  }
  
  .tablet-grid {
    display: grid;
  }
}

@media (min-width: 1024px) {
  .dashboard-grid-container {
    display: block;
  }
  
  .tablet-grid {
    display: none;
  }
}
</style>
