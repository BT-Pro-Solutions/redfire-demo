<template>
  <div>
    <DataTable
      title="Retail Products"
      addButtonLabel="Product"
      :columns="columns"
      :data="products"
      @add="handleAdd"
      @edit="handleEdit"
      @delete="handleDelete"
    />

    <OffCanvasSidebar
      :isOpen="sidebarOpen"
      :title="sidebarTitle"
      formType="product"
      :data="selectedProduct"
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
const sidebarTitle = ref('')
const selectedProduct = ref(null)

const handleAdd = () => {
  selectedProduct.value = null
  sidebarTitle.value = 'RETAIL'
  sidebarOpen.value = true
}

const handleEdit = (product) => {
  selectedProduct.value = product
  sidebarTitle.value = 'RETAIL'
  sidebarOpen.value = true
}

const handleSave = (data) => {
  console.log('Save:', data)
}

const columns = [
  { key: 'sku', label: 'SKU' },
  { key: 'name', label: 'Product Name' },
  { key: 'category', label: 'Category' },
  { key: 'price', label: 'Price' },
  { key: 'stock', label: 'Stock' },
  { key: 'status', label: 'Status' }
]

const products = [
  { id: 1, sku: 'TECH-001', name: 'Wireless Mouse', category: 'Electronics', price: '$29.99', stock: 45, status: 'In Stock' },
  { id: 2, sku: 'TECH-045', name: 'USB-C Cable 6ft', category: 'Electronics', price: '$12.99', stock: 128, status: 'In Stock' },
  { id: 3, sku: 'CLTH-112', name: 'Cotton T-Shirt', category: 'Clothing', price: '$19.99', stock: 234, status: 'In Stock' },
  { id: 4, sku: 'HOME-203', name: 'Desk Organizer', category: 'Home & Garden', price: '$24.99', stock: 67, status: 'In Stock' },
  { id: 5, sku: 'SPRT-089', name: 'Yoga Mat', category: 'Sports', price: '$34.99', stock: 89, status: 'In Stock' }
]
</script>

