<template>
  <div>
    <DataTable
      title="Canceled Purchases"
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

const handleDelete = (purchase) => {
  console.log('Delete:', purchase)
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
  { key: 'canceledDate', label: 'Canceled' },
  { key: 'reason', label: 'Reason' }
]

const purchases = [
  { id: 1, orderId: 'ORD-2024-101', customer: 'Alice Johnson', date: '2024-12-05', items: 2, total: '$67.50', paymentMethod: 'Credit Card', canceledDate: '2024-12-05', reason: 'Customer Request' },
  { id: 2, orderId: 'ORD-2024-102', customer: 'Bob Wilson', date: '2024-12-04', items: 1, total: '$29.99', paymentMethod: 'PayPal', canceledDate: '2024-12-04', reason: 'Out of Stock' },
  { id: 3, orderId: 'ORD-2024-103', customer: 'Carol Davis', date: '2024-12-03', items: 3, total: '$124.97', paymentMethod: 'Credit Card', canceledDate: '2024-12-03', reason: 'Duplicate Order' },
  { id: 4, orderId: 'ORD-2024-104', customer: 'Daniel Brown', date: '2024-12-02', items: 4, total: '$198.00', paymentMethod: 'Cash', canceledDate: '2024-12-02', reason: 'Payment Failed' }
]
</script>
