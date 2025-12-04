<template>
  <div class="bg-surface rounded-lg shadow-lg overflow-hidden">
    <div class="p-4 md:p-6 border-b border-gray-200">
      <div class="flex items-center justify-between mb-4">
        <h2 class="text-xl md:text-2xl font-bold text-gray-900">{{ title }}</h2>
        <button 
          @click="$emit('add')"
          class="px-3 py-2 md:px-4 md:py-2 bg-primary hover:bg-primary-dark text-white rounded-lg transition flex items-center space-x-2"
        >
          <Icon icon="mdi:plus" class="flex-shrink-0" />
          <span class="hidden sm:inline">Add {{ addButtonLabel }}</span>
        </button>
      </div>

      <div class="flex items-center flex-wrap gap-2 md:gap-4">
        <div class="flex-1 min-w-[200px] relative">
          <Icon icon="mdi:magnify" class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Search..."
            class="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
          />
        </div>
        
        <div class="relative">
          <button 
            @click="showDateRange = !showDateRange"
            class="px-3 py-2 md:px-4 md:py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition flex items-center space-x-2"
          >
            <Icon icon="mdi:calendar-range" class="flex-shrink-0" />
            <span class="hidden md:inline">Date Range</span>
          </button>
          
          <div v-if="showDateRange" class="absolute right-0 top-full mt-2 bg-white rounded-lg shadow-xl border border-gray-200 p-4 z-50 w-80 max-w-[calc(100vw-2rem)]">
            <div class="mb-3">
              <label class="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
              <input 
                v-model="startDate"
                type="date" 
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
              />
            </div>
            <div class="mb-4">
              <label class="block text-sm font-medium text-gray-700 mb-1">End Date</label>
              <input 
                v-model="endDate"
                type="date" 
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
              />
            </div>
            <div class="flex justify-end space-x-2">
              <button 
                @click="clearDateRange"
                class="px-3 py-1.5 text-sm text-gray-600 hover:bg-gray-100 rounded-lg transition"
              >
                Clear
              </button>
              <button 
                @click="applyDateRange"
                class="px-3 py-1.5 text-sm bg-primary text-white rounded-lg hover:bg-primary-dark transition"
              >
                Apply
              </button>
            </div>
          </div>
        </div>
        
        <div class="relative">
          <button 
            @click="showColumnPicker = !showColumnPicker"
            class="px-3 py-2 md:px-4 md:py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition flex items-center space-x-2"
          >
            <Icon icon="mdi:table-cog" class="flex-shrink-0" />
            <span class="hidden md:inline">Columns</span>
          </button>
          
          <div v-if="showColumnPicker" class="absolute right-0 top-full mt-2 bg-white rounded-lg shadow-xl border border-gray-200 p-4 z-50 w-64 max-w-[calc(100vw-2rem)]">
            <div class="mb-3">
              <h3 class="text-sm font-semibold text-gray-900">Show/Hide Columns</h3>
            </div>
            <div class="space-y-2 max-h-64 overflow-y-auto">
              <label 
                v-for="column in columns"
                :key="column.key"
                class="flex items-center space-x-2 cursor-pointer hover:bg-gray-50 p-2 rounded transition"
              >
                <input 
                  type="checkbox"
                  v-model="visibleColumns[column.key]"
                  class="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
                />
                <span class="text-sm text-gray-700">{{ column.label }}</span>
              </label>
            </div>
            <div class="mt-4 pt-3 border-t border-gray-200 flex justify-between">
              <button 
                @click="showAllColumns"
                class="text-xs text-primary hover:text-primary-dark"
              >
                Show All
              </button>
              <button 
                @click="showColumnPicker = false"
                class="px-3 py-1.5 text-sm bg-gray-100 hover:bg-gray-200 rounded-lg transition"
              >
                Done
              </button>
            </div>
          </div>
        </div>
        
        <button class="px-3 py-2 md:px-4 md:py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition flex items-center space-x-2">
          <Icon icon="mdi:download" class="flex-shrink-0" />
          <span class="hidden md:inline">Export</span>
        </button>
      </div>
    </div>

    <div class="overflow-x-auto">
      <div class="max-h-[calc(100vh-350px)] overflow-y-auto">
        <table class="w-full">
          <thead class="bg-gray-50 sticky top-0 z-10">
            <tr>
              <th
                v-for="column in visibleColumnsList"
                :key="column.key"
                @click="handleSort(column.key)"
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition"
              >
                <div class="flex items-center space-x-2">
                  <span>{{ column.label }}</span>
                  <Icon
                    v-if="sortKey === column.key"
                    :icon="sortOrder === 'asc' ? 'mdi:arrow-up' : 'mdi:arrow-down'"
                    class="text-primary"
                  />
                </div>
              </th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr
              v-for="row in sortedData"
              :key="row.id"
              @click="$emit('edit', row)"
              class="hover:bg-gray-50 transition cursor-pointer"
            >
              <td
                v-for="column in visibleColumnsList"
                :key="column.key"
                class="px-6 py-4 whitespace-nowrap text-sm text-gray-900"
              >
                {{ row[column.key] }}
              </td>
            </tr>
          </tbody>
          <tfoot v-if="showTotal" class="bg-gray-50 sticky bottom-0">
            <tr>
              <td colspan="999" class="px-6 py-4 text-sm font-bold text-gray-900">
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
  if (!target.closest('.relative')) {
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

