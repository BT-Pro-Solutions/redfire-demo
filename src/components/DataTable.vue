<template>
  <div class="data-table">
    <div class="table-header">
      <div class="header-top">
        <h2 class="table-title">{{ title }}</h2>
        <button 
          @click="$emit('add')"
          class="add-button"
          :style="`background-color: rgb(var(--color-primary-rgb))`"
        >
          <Icon icon="mdi:plus" class="add-icon" />
          <span class="add-text">Add {{ addButtonLabel }}</span>
        </button>
      </div>

      <div class="header-controls">
        <div class="search-container">
          <Icon icon="mdi:magnify" class="search-icon" />
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Search..."
            class="search-input"
          />
        </div>
        
        <div class="control-group">
          <button 
            @click="showDateRange = !showDateRange"
            class="control-button"
          >
            <Icon icon="mdi:calendar-range" class="control-icon" />
            <span class="control-text">Date Range</span>
          </button>
          
          <div v-if="showDateRange" class="dropdown date-dropdown">
            <div class="date-range-group">
              <label class="date-label">Start Date</label>
              <input 
                v-model="startDate"
                type="date" 
                class="date-input"
              />
            </div>
            <div class="date-range-group">
              <label class="date-label">End Date</label>
              <input 
                v-model="endDate"
                type="date" 
                class="date-input"
              />
            </div>
            <div class="date-actions">
              <button 
                @click="clearDateRange"
                class="date-clear-button"
              >
                Clear
              </button>
              <button 
                @click="applyDateRange"
                class="date-apply-button"
                :style="`background-color: rgb(var(--color-primary-rgb))`"
              >
                Apply
              </button>
            </div>
          </div>
        </div>
        
        <div class="control-group">
          <button 
            @click="showColumnPicker = !showColumnPicker"
            class="control-button"
          >
            <Icon icon="mdi:table-cog" class="control-icon" />
            <span class="control-text">Columns</span>
          </button>
          
          <div v-if="showColumnPicker" class="dropdown column-dropdown">
            <div class="dropdown-header">
              <h3 class="dropdown-title">Show/Hide Columns</h3>
            </div>
            <div class="column-list">
              <label 
                v-for="column in columns"
                :key="column.key"
                class="column-item"
              >
                <input 
                  type="checkbox"
                  v-model="visibleColumns[column.key]"
                  class="column-checkbox"
                />
                <span class="column-label">{{ column.label }}</span>
              </label>
            </div>
            <div class="column-actions">
              <button 
                @click="showAllColumns"
                class="show-all-button"
              >
                Show All
              </button>
              <button 
                @click="showColumnPicker = false"
                class="done-button"
              >
                Done
              </button>
            </div>
          </div>
        </div>
        
        <button class="control-button">
          <Icon icon="mdi:download" class="control-icon" />
          <span class="control-text">Export</span>
        </button>
      </div>
    </div>

    <div class="table-wrapper">
      <div class="table-scroll">
        <table class="table">
          <thead class="table-head">
            <tr>
              <th
                v-for="column in visibleColumnsList"
                :key="column.key"
                @click="handleSort(column.key)"
                class="table-header-cell"
              >
                <div class="header-cell-content">
                  <span>{{ column.label }}</span>
                  <Icon
                    v-if="sortKey === column.key"
                    :icon="sortOrder === 'asc' ? 'mdi:arrow-up' : 'mdi:arrow-down'"
                    class="sort-icon"
                  />
                </div>
              </th>
            </tr>
          </thead>
          <tbody class="table-body">
            <tr
              v-for="row in sortedData"
              :key="row.id"
              @click="$emit('edit', row)"
              class="table-row"
            >
              <td
                v-for="column in visibleColumnsList"
                :key="column.key"
                class="table-cell"
              >
                {{ row[column.key] }}
              </td>
            </tr>
          </tbody>
          <tfoot v-if="showTotal" class="table-foot">
            <tr>
              <td colspan="999" class="table-footer-cell">
                Total: {{ data.length }} items
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { Icon } from '@iconify/vue'

const props = defineProps({
  title: String,
  addButtonLabel: String,
  columns: Array,
  data: Array,
  showTotal: {
    type: Boolean,
    default: true
  }
})

defineEmits(['add', 'edit'])

const searchQuery = ref('')
const sortKey = ref('')
const sortOrder = ref('asc')
const showDateRange = ref(false)
const showColumnPicker = ref(false)
const startDate = ref('')
const endDate = ref('')
const visibleColumns = ref({})

onMounted(() => {
  props.columns.forEach(column => {
    visibleColumns.value[column.key] = true
  })
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})

const handleClickOutside = (event) => {
  const target = event.target
  if (!target.closest('.control-group')) {
    showDateRange.value = false
    showColumnPicker.value = false
  }
}

const handleSort = (key) => {
  if (sortKey.value === key) {
    sortOrder.value = sortOrder.value === 'asc' ? 'desc' : 'asc'
  } else {
    sortKey.value = key
    sortOrder.value = 'asc'
  }
}

const clearDateRange = () => {
  startDate.value = ''
  endDate.value = ''
}

const applyDateRange = () => {
  showDateRange.value = false
}

const showAllColumns = () => {
  props.columns.forEach(column => {
    visibleColumns.value[column.key] = true
  })
}

const visibleColumnsList = computed(() => {
  return props.columns.filter(column => visibleColumns.value[column.key])
})

const sortedData = computed(() => {
  let filtered = props.data

  if (searchQuery.value) {
    filtered = filtered.filter(row => {
      return Object.values(row).some(value =>
        String(value).toLowerCase().includes(searchQuery.value.toLowerCase())
      )
    })
  }

  if (sortKey.value) {
    filtered = [...filtered].sort((a, b) => {
      const aVal = a[sortKey.value]
      const bVal = b[sortKey.value]
      
      if (sortOrder.value === 'asc') {
        return aVal > bVal ? 1 : -1
      } else {
        return aVal < bVal ? 1 : -1
      }
    })
  }

  return filtered
})
</script>

<style scoped>
.data-table {
  background-color: white;
  border-radius: 1rem;
  border: 1px solid var(--gray-100);
  overflow: hidden;
}

.table-header {
  padding: 1.5rem;
  border-bottom: 1px solid var(--gray-200);
}

.header-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;
}

.table-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--gray-900);
}

.add-button {
  padding: 0.5rem 1rem;
  color: white;
  border-radius: 0.75rem;
  transition: opacity 0.15s ease-in-out;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  border: none;
  cursor: pointer;
}

.add-button:hover {
  opacity: 0.9;
}

.add-icon {
  flex-shrink: 0;
}

.add-text {
  display: none;
}

.header-controls {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
}

.search-container {
  flex: 1;
  min-width: 200px;
  position: relative;
}

.search-icon {
  position: absolute;
  left: 0.75rem;
  top: 50%;
  transform: translateY(-50%);
  color: var(--gray-400);
}

.search-input {
  width: 100%;
  padding: 0.5rem 1rem 0.5rem 2.5rem;
  background-color: var(--gray-50);
  border: 1px solid var(--gray-200);
  border-radius: 0.75rem;
  outline: none;
  transition: all 0.15s ease-in-out;
}

.search-input:focus {
  box-shadow: 0 0 0 2px rgb(var(--color-primary-rgb) / 0.2);
  border-color: transparent;
  background-color: white;
}

.control-group {
  position: relative;
}

.control-button {
  padding: 0.5rem 1rem;
  background-color: var(--gray-50);
  border: 1px solid var(--gray-200);
  border-radius: 0.75rem;
  transition: background-color 0.15s ease-in-out;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
}

.control-button:hover {
  background-color: var(--gray-100);
}

.control-icon {
  flex-shrink: 0;
}

.control-text {
  display: none;
}

.dropdown {
  position: absolute;
  right: 0;
  top: 100%;
  margin-top: 0.5rem;
  background-color: white;
  border-radius: 1rem;
  border: 1px solid var(--gray-200);
  padding: 1rem;
  z-index: 50;
  width: 20rem;
  max-width: calc(100vw - 2rem);
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
}

.date-dropdown {
  width: 20rem;
}

.date-range-group {
  margin-bottom: 0.75rem;
}

.date-range-group:last-of-type {
  margin-bottom: 1rem;
}

.date-label {
  display: block;
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--gray-700);
  margin-bottom: 0.25rem;
}

.date-input {
  width: 100%;
  padding: 0.5rem 0.75rem;
  background-color: var(--gray-50);
  border: 1px solid var(--gray-200);
  border-radius: 0.75rem;
  outline: none;
  transition: all 0.15s ease-in-out;
}

.date-input:focus {
  box-shadow: 0 0 0 2px rgb(var(--color-primary-rgb) / 0.2);
  border-color: transparent;
  background-color: white;
}

.date-actions {
  display: flex;
  justify-content: flex-end;
  gap: 0.5rem;
}

.date-clear-button {
  padding: 0.375rem 0.75rem;
  font-size: 0.875rem;
  color: var(--gray-600);
  background: none;
  border: none;
  border-radius: 0.75rem;
  transition: background-color 0.15s ease-in-out;
  cursor: pointer;
}

.date-clear-button:hover {
  background-color: var(--gray-100);
}

.date-apply-button {
  padding: 0.375rem 0.75rem;
  font-size: 0.875rem;
  color: white;
  border: none;
  border-radius: 0.75rem;
  transition: opacity 0.15s ease-in-out;
  cursor: pointer;
}

.date-apply-button:hover {
  opacity: 0.9;
}

.column-dropdown {
  width: 16rem;
}

.dropdown-header {
  margin-bottom: 0.75rem;
}

.dropdown-title {
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--gray-900);
}

.column-list {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  max-height: 16rem;
  overflow-y: auto;
}

.column-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 0.25rem;
  transition: background-color 0.15s ease-in-out;
}

.column-item:hover {
  background-color: var(--gray-50);
}

.column-checkbox {
  width: 1rem;
  height: 1rem;
  color: rgb(var(--color-primary-rgb));
  border: 1px solid var(--gray-300);
  border-radius: 0.25rem;
  cursor: pointer;
}

.column-checkbox:focus {
  box-shadow: 0 0 0 2px rgb(var(--color-primary-rgb) / 0.2);
}

.column-label {
  font-size: 0.875rem;
  color: var(--gray-700);
}

.column-actions {
  margin-top: 1rem;
  padding-top: 0.75rem;
  border-top: 1px solid var(--gray-200);
  display: flex;
  justify-content: space-between;
}

.show-all-button {
  font-size: 0.75rem;
  color: rgb(var(--color-primary-rgb));
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
}

.show-all-button:hover {
  color: var(--color-primary-dark);
}

.done-button {
  padding: 0.375rem 0.75rem;
  font-size: 0.875rem;
  background-color: var(--gray-100);
  border: none;
  border-radius: 0.75rem;
  transition: background-color 0.15s ease-in-out;
  cursor: pointer;
}

.done-button:hover {
  background-color: var(--gray-200);
}

.table-wrapper {
  overflow-x: auto;
}

.table-scroll {
  max-height: calc(100vh - 350px);
  overflow-y: auto;
}

.table {
  width: 100%;
  border-collapse: collapse;
}

.table-head {
  background-color: var(--gray-50);
  position: sticky;
  top: 0;
  z-index: 10;
}

.table-header-cell {
  padding: 0.75rem 1.5rem;
  text-align: left;
  font-size: 0.75rem;
  font-weight: 500;
  color: var(--gray-500);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  cursor: pointer;
  transition: background-color 0.15s ease-in-out;
}

.table-header-cell:hover {
  background-color: var(--gray-100);
}

.header-cell-content {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.sort-icon {
  color: rgb(var(--color-primary-rgb));
}

.table-body {
  background-color: white;
}

.table-row {
  transition: background-color 0.15s ease-in-out;
  cursor: pointer;
  border-bottom: 1px solid var(--gray-200);
}

.table-row:hover {
  background-color: rgba(59, 130, 246, 0.05);
}

.table-cell {
  padding: 1rem 1.5rem;
  white-space: nowrap;
  font-size: 0.875rem;
  color: var(--gray-900);
}

.table-foot {
  background-color: var(--gray-50);
  position: sticky;
  bottom: 0;
}

.table-footer-cell {
  padding: 1rem 1.5rem;
  font-size: 0.875rem;
  font-weight: 700;
  color: var(--gray-900);
}

@media (min-width: 640px) {
  .add-text {
    display: inline;
  }
}

@media (min-width: 768px) {
  .table-header {
    padding: 1.5rem;
  }
  
  .header-controls {
    gap: 1rem;
  }
  
  .control-text {
    display: inline;
  }
}
</style>
