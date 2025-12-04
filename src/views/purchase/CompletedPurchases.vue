<template>
  <div>
    <DataTable
      title="Completed Purchases"
      addButtonLabel="Purchase"
      :columns="columns"
      :data="purchases"
      @add="handleAdd"
      @edit="handleEdit"
      @delete="handleDelete"
    />

    <OffCanvasSidebar
      :isOpen="sidebarOpen"
      :title="sidebarTitle"
      formType="purchase"
      :data="selectedPurchase"
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
const selectedPurchase = ref(null)

const handleAdd = () => {
  selectedPurchase.value = null
  sidebarTitle.value = 'Purchase'
  sidebarOpen.value = true
}

const handleEdit = (purchase) => {
  selectedPurchase.value = purchase
  sidebarTitle.value = 'Purchase'
  sidebarOpen.value = true
}

const handleSave = (data) => {
  console.log('Save:', data)
}

const columns = [
  { key: 'orderId', label: 'Order ID' },
  { key: 'customer', label: 'Customer' },
  { key: 'date', label: 'Date' },
  { key: 'items', label: 'Items' },
  { key: 'total', label: 'Total' },
  { key: 'paymentMethod', label: 'Payment' },
  { key: 'completedDate', label: 'Completed' }
]

const purchases = [
  { id: 1, orderId: 'ORD-2024-001', customer: 'John Anderson', date: '2024-12-01', items: 3, total: '$145.97', paymentMethod: 'Credit Card', completedDate: '2024-12-02' },
  { id: 2, orderId: 'ORD-2024-002', customer: 'Emily Chen', date: '2024-12-01', items: 2, total: '$89.98', paymentMethod: 'PayPal', completedDate: '2024-12-02' },
  { id: 3, orderId: 'ORD-2024-003', customer: 'Michael Rodriguez', date: '2024-12-02', items: 5, total: '$234.50', paymentMethod: 'Credit Card', completedDate: '2024-12-03' },
  { id: 4, orderId: 'ORD-2024-004', customer: 'Sarah Thompson', date: '2024-12-02', items: 1, total: '$34.99', paymentMethod: 'Cash', completedDate: '2024-12-02' },
  { id: 5, orderId: 'ORD-2024-005', customer: 'David Kim', date: '2024-12-03', items: 4, total: '$189.96', paymentMethod: 'Gift Card', completedDate: '2024-12-04' }
]
</script>

