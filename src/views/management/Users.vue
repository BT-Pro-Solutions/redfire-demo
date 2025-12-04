<template>
  <div>
    <DataTable
      title="Users"
      addButtonLabel="User"
      :columns="columns"
      :data="users"
      @add="handleAdd"
      @edit="handleEdit"
    />

    <OffCanvasSidebar
      :isOpen="sidebarOpen"
      title="USER"
      formType="user"
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
  { key: 'role', label: 'Role' },
  { key: 'department', label: 'Department' },
  { key: 'status', label: 'Status' },
  { key: 'lastLogin', label: 'Last Login' }
]

const users = [
  { id: 1, name: 'Sarah Mitchell', email: 'sarah.mitchell@company.com', role: 'Admin', department: 'Management', status: 'Active', lastLogin: '2024-12-04 14:23' },
  { id: 2, name: 'Tom Williams', email: 'tom.williams@company.com', role: 'Manager', department: 'Sales', status: 'Active', lastLogin: '2024-12-04 13:45' },
  { id: 3, name: 'Lisa Garcia', email: 'lisa.garcia@company.com', role: 'Staff', department: 'Support', status: 'Active', lastLogin: '2024-12-04 12:10' },
  { id: 4, name: 'James Brown', email: 'james.brown@company.com', role: 'Manager', department: 'Inventory', status: 'Active', lastLogin: '2024-12-03 16:30' },
  { id: 5, name: 'Maria Lopez', email: 'maria.lopez@company.com', role: 'Staff', department: 'Sales', status: 'Active', lastLogin: '2024-12-04 09:15' }
]
</script>

