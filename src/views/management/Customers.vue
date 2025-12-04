<template>
  <div>
    <DataTable
      title="Customers"
      addButtonLabel="Customer"
      :columns="columns"
      :data="customers"
      @add="handleAdd"
      @edit="handleEdit"
    />

    <OffCanvasSidebar
      :isOpen="sidebarOpen"
      title="CUSTOMER"
      formType="customer"
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
  { key: 'name', label: 'Name' },
  { key: 'email', label: 'Email' },
  { key: 'phone', label: 'Phone' },
  { key: 'totalOrders', label: 'Orders' },
  { key: 'totalSpent', label: 'Total Spent' },
  { key: 'joinDate', label: 'Join Date' }
]

const customers = [
  { id: 1, name: 'John Anderson', email: 'john.anderson@email.com', phone: '555-0123', totalOrders: 12, totalSpent: '$1,245.00', joinDate: '2024-01-15' },
  { id: 2, name: 'Emily Chen', email: 'emily.chen@email.com', phone: '555-0124', totalOrders: 8, totalSpent: '$892.50', joinDate: '2024-02-01' },
  { id: 3, name: 'Michael Rodriguez', email: 'm.rodriguez@email.com', phone: '555-0125', totalOrders: 15, totalSpent: '$2,103.25', joinDate: '2024-01-20' },
  { id: 4, name: 'Sarah Thompson', email: 'sarah.t@email.com', phone: '555-0126', totalOrders: 6, totalSpent: '$645.75', joinDate: '2024-02-10' },
  { id: 5, name: 'David Kim', email: 'david.kim@email.com', phone: '555-0127', totalOrders: 20, totalSpent: '$3,456.00', joinDate: '2024-01-05' }
]
</script>

