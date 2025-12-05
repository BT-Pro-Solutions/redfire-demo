<template>
  <div>
    <div class="mb-6">
      <h1 class="text-3xl font-bold text-gray-900 mb-2">My Account</h1>
      <p class="text-gray-600">Manage your account settings</p>
    </div>

    <div class="bg-white rounded-2xl border border-gray-100 p-6">
      <h2 class="text-xl font-bold text-gray-900 mb-4">Account Information</h2>
      <div class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Name</label>
          <input 
            type="text" 
            v-model="name"
            class="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
          />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Email</label>
          <input 
            type="email" 
            v-model="email"
            class="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
          />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Role</label>
          <input 
            type="text" 
            v-model="role"
            disabled
            class="w-full px-4 py-2 bg-gray-100 border border-gray-200 rounded-xl text-gray-500"
          />
        </div>
      </div>
      
      <div class="mt-6 flex justify-end">
        <button 
          @click="saveAccount"
          class="px-6 py-3 bg-gradient-to-r from-primary to-blue-600 hover:from-blue-600 hover:to-primary text-white rounded-xl transition"
        >
          Save Changes
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const name = ref('')
const email = ref('')
const role = ref('')

onMounted(() => {
  const user = JSON.parse(localStorage.getItem('user') || '{}')
  name.value = user.name || ''
  email.value = user.email || ''
  role.value = user.role || ''
})

const saveAccount = () => {
  const user = {
    name: name.value,
    email: email.value,
    role: role.value
  }
  localStorage.setItem('user', JSON.stringify(user))
  alert('Account settings saved!')
}
</script>
