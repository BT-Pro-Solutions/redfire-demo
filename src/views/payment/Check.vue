<template>
  <div>
    <DataTable
      title="Check Payments"
      addButtonLabel="Payment"
      :columns="columns"
      :data="payments"
      @add="handleAdd"
      @edit="handleEdit"
    />

    <OffCanvasSidebar
      :isOpen="sidebarOpen"
      title="CHECK PAYMENT"
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
  { key: 'checkNumber', label: 'Check #' },
  { key: 'orderId', label: 'Order ID' },
  { key: 'customer', label: 'Customer' },
  { key: 'amount', label: 'Amount' },
  { key: 'status', label: 'Status' }
]

const payments = [
  { id: 1, date: '2024-12-04', checkNumber: '1234', orderId: 'ORD-2024-042', customer: 'ABC Corp', amount: '$450.00', status: 'Cleared' },
  { id: 2, date: '2024-12-03', checkNumber: '1235', orderId: 'ORD-2024-035', customer: 'XYZ Inc', amount: '$675.50', status: 'Cleared' },
  { id: 3, date: '2024-12-02', checkNumber: '1236', orderId: 'ORD-2024-028', customer: 'Smith LLC', amount: '$234.75', status: 'Pending' },
  { id: 4, date: '2024-12-02', checkNumber: '1237', orderId: 'ORD-2024-019', customer: 'Johnson Co', amount: '$892.00', status: 'Cleared' },
  { id: 5, date: '2024-12-01', checkNumber: '1238', orderId: 'ORD-2024-012', customer: 'Wilson Ltd', amount: '$1,245.25', status: 'Cleared' }
]
</script>

