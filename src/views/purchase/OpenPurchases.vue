<template>
  <div>
    <DataTable
      title="Open Purchases"
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
  { key: 'status', label: 'Status' }
]

const purchases = [
  { id: 1, orderId: 'ORD-2024-201', customer: 'Jennifer Lee', date: '2024-12-06', items: 3, total: '$156.50', paymentMethod: 'Credit Card', status: 'Processing' },
  { id: 2, orderId: 'ORD-2024-202', customer: 'Kevin Martinez', date: '2024-12-06', items: 2, total: '$78.98', paymentMethod: 'PayPal', status: 'Pending Payment' },
  { id: 3, orderId: 'ORD-2024-203', customer: 'Laura Garcia', date: '2024-12-05', items: 5, total: '$289.75', paymentMethod: 'Credit Card', status: 'Awaiting Shipment' },
  { id: 4, orderId: 'ORD-2024-204', customer: 'Mark Taylor', date: '2024-12-05', items: 1, total: '$45.00', paymentMethod: 'Cash', status: 'Processing' },
  { id: 5, orderId: 'ORD-2024-205', customer: 'Nancy White', date: '2024-12-04', items: 4, total: '$210.00', paymentMethod: 'Gift Card', status: 'On Hold' }
]
</script>
