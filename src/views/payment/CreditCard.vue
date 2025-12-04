<template>
  <div>
    <DataTable
      title="Credit Card Payments"
      addButtonLabel="Payment"
      :columns="columns"
      :data="payments"
      @add="handleAdd"
      @edit="handleEdit"
    />

    <OffCanvasSidebar
      :isOpen="sidebarOpen"
      title="CREDIT CARD PAYMENT"
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
  { key: 'cardType', label: 'Card Type' },
  { key: 'last4', label: 'Last 4' },
  { key: 'amount', label: 'Amount' },
  { key: 'status', label: 'Status' }
]

const payments = [
  { id: 1, date: '2024-12-04', orderId: 'ORD-2024-047', customer: 'John Anderson', cardType: 'Visa', last4: '4532', amount: '$145.97', status: 'Approved' },
  { id: 2, date: '2024-12-04', orderId: 'ORD-2024-044', customer: 'Emily Chen', cardType: 'Mastercard', last4: '8821', amount: '$89.98', status: 'Approved' },
  { id: 3, date: '2024-12-03', orderId: 'ORD-2024-040', customer: 'Michael Rodriguez', cardType: 'Amex', last4: '1007', amount: '$234.50', status: 'Approved' },
  { id: 4, date: '2024-12-03', orderId: 'ORD-2024-036', customer: 'Sarah Thompson', cardType: 'Visa', last4: '3344', amount: '$67.25', status: 'Approved' },
  { id: 5, date: '2024-12-03', orderId: 'ORD-2024-031', customer: 'David Kim', cardType: 'Discover', last4: '6789', amount: '$456.00', status: 'Declined' }
]
</script>

