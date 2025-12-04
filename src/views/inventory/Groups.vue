<template>
  <div>
    <DataTable
      title="Groups"
      addButtonLabel="Group"
      :columns="columns"
      :data="groups"
      @add="handleAdd"
      @edit="handleEdit"
    />

    <OffCanvasSidebar
      :isOpen="sidebarOpen"
      title="GROUP"
      formType="category"
      :data="selectedItem"
      @close="sidebarOpen = false"
      @save="handleSave"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import DataTable from '@/components/DataTable.vue'
import OffCanvasSidebar from '@/components/OffCanvasSidebar.vue'

const sidebarOpen = ref(false)
const selectedItem = ref(null)

const handleAdd = () => {
  selectedItem.value = null
  sidebarOpen.value = true
}

const handleEdit = (item) => {
  selectedItem.value = item
  sidebarOpen.value = true
}

const handleSave = (data) => {
  console.log('Save:', data)
}

const columns = [
  { key: 'id', label: 'ID' },
  { key: 'name', label: 'Group Name' },
  { key: 'category', label: 'Category' },
  { key: 'itemCount', label: 'Items' },
  { key: 'created', label: 'Created' }
]

const groups = [
  { id: 1, name: 'Laptops', category: 'Electronics', itemCount: 15, created: '2024-01-15' },
  { id: 2, name: 'Smartphones', category: 'Electronics', itemCount: 23, created: '2024-01-20' },
  { id: 3, name: 'Mens Wear', category: 'Clothing', itemCount: 56, created: '2024-02-01' },
  { id: 4, name: 'Womens Wear', category: 'Clothing', itemCount: 67, created: '2024-02-05' },
  { id: 5, name: 'Outdoor Furniture', category: 'Home & Garden', itemCount: 12, created: '2024-02-10' }
]
</script>

