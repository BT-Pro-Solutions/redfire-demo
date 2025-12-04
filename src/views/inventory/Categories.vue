<template>
  <div>
    <DataTable
      title="Categories"
      addButtonLabel="Category"
      :columns="columns"
      :data="categories"
      @add="handleAdd"
      @edit="handleEdit"
    />

    <OffCanvasSidebar
      :isOpen="sidebarOpen"
      title="CATEGORY"
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
  { key: 'name', label: 'Category Name' },
  { key: 'description', label: 'Description' },
  { key: 'productCount', label: 'Products' },
  { key: 'status', label: 'Status' }
]

const categories = [
  { id: 1, name: 'Electronics', description: 'Electronic devices and accessories', productCount: 45, status: 'Active' },
  { id: 2, name: 'Clothing', description: 'Apparel and fashion items', productCount: 123, status: 'Active' },
  { id: 3, name: 'Home & Garden', description: 'Home improvement and garden supplies', productCount: 67, status: 'Active' },
  { id: 4, name: 'Sports', description: 'Sports equipment and accessories', productCount: 34, status: 'Active' },
  { id: 5, name: 'Books', description: 'Books and magazines', productCount: 89, status: 'Active' }
]
</script>

