<template>
  <div>
    <DataTable
      title="Cash Payments"
      addButtonLabel="Payment"
      :columns="columns"
      :data="payments"
      @add="handleAdd"
      @edit="handleEdit"
    />

    <OffCanvasSidebar
      :isOpen="sidebarOpen"
      title="CASH PAYMENT"
      formType="purchase"
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
  { key: 'date', label: 'Date' },
  { key: 'orderId', label: 'Order ID' },
  { key: 'customer', label: 'Customer' },
  { key: 'amount', label: 'Amount' },
  { key: 'status', label: 'Status' }
]

const payments = [
  { id: 1, date: '2024-12-04', orderId: 'ORD-2024-045', customer: 'Sarah Thompson', amount: '$34.99', status: 'Completed' },
  { id: 2, date: '2024-12-03', orderId: 'ORD-2024-038', customer: 'John Anderson', amount: '$127.50', status: 'Completed' },
  { id: 3, date: '2024-12-03', orderId: 'ORD-2024-029', customer: 'Michael Rodriguez', amount: '$89.99', status: 'Completed' },
  { id: 4, date: '2024-12-02', orderId: 'ORD-2024-021', customer: 'Emily Chen', amount: '$56.25', status: 'Completed' },
  { id: 5, date: '2024-12-02', orderId: 'ORD-2024-015', customer: 'David Kim', amount: '$203.00', status: 'Completed' }
]
</script>

