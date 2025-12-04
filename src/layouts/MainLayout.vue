<template>
  <div class="min-h-screen bg-dark-bg flex">
    <div 
      v-if="mobileMenuOpen"
      class="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
      @click="mobileMenuOpen = false"
      style="backdrop-filter: blur(4px);"
    ></div>

    <aside 
      class="w-64 bg-sidebar text-white flex-shrink-0 overflow-y-auto fixed md:static inset-y-0 left-0 z-40 transition-transform duration-300 md:w-20 lg:w-64 md:translate-x-0"
      :class="{ '-translate-x-full md:translate-x-0': !mobileMenuOpen }"
    >
      <div class="px-6 py-3 border-b border-gray-700 h-[73px] flex items-center">
        <div class="flex items-center space-x-3 md:justify-center lg:justify-start w-full">
          <div class="w-10 h-10 bg-primary rounded-lg flex items-center justify-center flex-shrink-0">
            <Icon icon="mdi:storefront" class="text-xl" />
          </div>
          <span class="text-xl font-bold md:hidden lg:inline">RedFire</span>
        </div>
      </div>

      <nav class="p-4 space-y-1">
        <router-link
          to="/"
          class="flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-dark-surface transition md:justify-center lg:justify-start"
          :class="{ 'bg-primary': $route.name === 'Dashboard' }"
        >
          <Icon icon="mdi:view-dashboard" class="text-xl flex-shrink-0" />
          <span class="md:hidden lg:inline">Dashboard</span>
        </router-link>

        <div class="pt-2">
          <div class="flex items-center space-x-3 px-4 py-2 text-gray-400 text-sm font-semibold md:justify-center lg:justify-start">
            <Icon icon="mdi:package-variant" class="text-lg flex-shrink-0" />
            <span class="md:hidden lg:inline">Inventory</span>
          </div>
          <router-link to="/inventory/categories" class="flex items-center space-x-3 px-8 py-2 rounded-lg hover:bg-dark-surface transition text-gray-300 md:px-4 md:justify-center lg:px-8 lg:justify-start" active-class="bg-primary text-white">
            <Icon icon="mdi:shape" class="text-lg flex-shrink-0" />
            <span class="md:hidden lg:inline">Categories</span>
          </router-link>
          <router-link to="/inventory/groups" class="flex items-center space-x-3 px-8 py-2 rounded-lg hover:bg-dark-surface transition text-gray-300 md:px-4 md:justify-center lg:px-8 lg:justify-start" active-class="bg-primary text-white">
            <Icon icon="mdi:group" class="text-lg flex-shrink-0" />
            <span class="md:hidden lg:inline">Groups</span>
          </router-link>
          <router-link to="/inventory/products" class="flex items-center space-x-3 px-8 py-2 rounded-lg hover:bg-dark-surface transition text-gray-300 md:px-4 md:justify-center lg:px-8 lg:justify-start" active-class="bg-primary text-white">
            <Icon icon="mdi:shopping" class="text-lg flex-shrink-0" />
            <span class="md:hidden lg:inline">Retail Products</span>
          </router-link>
        </div>

        <div class="pt-2">
          <div class="flex items-center space-x-3 px-4 py-2 text-gray-400 text-sm font-semibold md:justify-center lg:justify-start">
            <Icon icon="mdi:account-cog" class="text-lg flex-shrink-0" />
            <span class="md:hidden lg:inline">Management</span>
          </div>
          <router-link to="/management/customers" class="flex items-center space-x-3 px-8 py-2 rounded-lg hover:bg-dark-surface transition text-gray-300 md:px-4 md:justify-center lg:px-8 lg:justify-start" active-class="bg-primary text-white">
            <Icon icon="mdi:account-group" class="text-lg flex-shrink-0" />
            <span class="md:hidden lg:inline">Customers</span>
          </router-link>
          <router-link to="/management/users" class="flex items-center space-x-3 px-8 py-2 rounded-lg hover:bg-dark-surface transition text-gray-300 md:px-4 md:justify-center lg:px-8 lg:justify-start" active-class="bg-primary text-white">
            <Icon icon="mdi:account-multiple" class="text-lg flex-shrink-0" />
            <span class="md:hidden lg:inline">Users</span>
          </router-link>
        </div>

        <div class="pt-2">
          <div class="flex items-center space-x-3 px-4 py-2 text-gray-400 text-sm font-semibold md:justify-center lg:justify-start">
            <Icon icon="mdi:cash-multiple" class="text-lg flex-shrink-0" />
            <span class="md:hidden lg:inline">Payment</span>
          </div>
          <router-link to="/payment/cash" class="flex items-center space-x-3 px-8 py-2 rounded-lg hover:bg-dark-surface transition text-gray-300 md:px-4 md:justify-center lg:px-8 lg:justify-start" active-class="bg-primary text-white">
            <Icon icon="mdi:cash" class="text-lg flex-shrink-0" />
            <span class="md:hidden lg:inline">Cash</span>
          </router-link>
          <router-link to="/payment/check" class="flex items-center space-x-3 px-8 py-2 rounded-lg hover:bg-dark-surface transition text-gray-300 md:px-4 md:justify-center lg:px-8 lg:justify-start" active-class="bg-primary text-white">
            <Icon icon="mdi:checkbook" class="text-lg flex-shrink-0" />
            <span class="md:hidden lg:inline">Check</span>
          </router-link>
          <router-link to="/payment/credit-card" class="flex items-center space-x-3 px-8 py-2 rounded-lg hover:bg-dark-surface transition text-gray-300 md:px-4 md:justify-center lg:px-8 lg:justify-start" active-class="bg-primary text-white">
            <Icon icon="mdi:credit-card" class="text-lg flex-shrink-0" />
            <span class="md:hidden lg:inline">Credit Card</span>
          </router-link>
        </div>

        <div class="pt-2">
          <div class="flex items-center space-x-3 px-4 py-2 text-gray-400 text-sm font-semibold md:justify-center lg:justify-start">
            <Icon icon="mdi:cart" class="text-lg flex-shrink-0" />
            <span class="md:hidden lg:inline">Purchase</span>
          </div>
          <a href="#" class="flex items-center space-x-3 px-8 py-2 rounded-lg hover:bg-dark-surface transition text-gray-300 md:px-4 md:justify-center lg:px-8 lg:justify-start">
            <Icon icon="mdi:cart-remove" class="text-lg flex-shrink-0" />
            <span class="md:hidden lg:inline">Canceled Purchases</span>
          </a>
          <router-link to="/purchase/completed" class="flex items-center space-x-3 px-8 py-2 rounded-lg hover:bg-dark-surface transition text-gray-300 md:px-4 md:justify-center lg:px-8 lg:justify-start" active-class="bg-primary text-white">
            <Icon icon="mdi:cart-check" class="text-lg flex-shrink-0" />
            <span class="md:hidden lg:inline">Completed Purchases</span>
          </router-link>
          <a href="#" class="flex items-center space-x-3 px-8 py-2 rounded-lg hover:bg-dark-surface transition text-gray-300 md:px-4 md:justify-center lg:px-8 lg:justify-start">
            <Icon icon="mdi:cart-outline" class="text-lg flex-shrink-0" />
            <span class="md:hidden lg:inline">Open Purchases</span>
          </a>
        </div>

        <div class="pt-2">
          <a href="#" class="flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-dark-surface transition md:justify-center lg:justify-start">
            <Icon icon="mdi:help-circle" class="text-xl flex-shrink-0" />
            <span class="md:hidden lg:inline">Feedback/Support</span>
          </a>
        </div>
      </nav>
    </aside>

    <div class="flex-1 flex flex-col overflow-hidden">
      <header class="bg-dark-surface border-b border-gray-700 px-4 py-3 md:px-6">
        <div class="flex items-center justify-between h-12">
          <div class="flex items-center space-x-4 md:space-x-6">
            <button 
              @click="mobileMenuOpen = !mobileMenuOpen"
              class="lg:hidden text-white hover:text-primary transition"
            >
              <Icon icon="mdi:menu" class="text-2xl" />
            </button>
            
            <h2 class="text-xl md:text-2xl font-bold text-white">Company Name</h2>
            
            <div class="hidden md:flex items-center space-x-2 px-4 py-2 bg-dark-bg rounded-lg h-10">
              <Icon icon="mdi:map-marker" class="text-gray-400" />
              <select class="bg-transparent outline-none text-sm font-medium text-gray-300">
                <option>Main Location</option>
                <option>Store #1</option>
                <option>Store #2</option>
                <option>Warehouse</option>
              </select>
            </div>
          </div>

          <div class="flex items-center space-x-2 md:space-x-4">
            <a href="#" class="hidden md:flex items-center space-x-2 text-gray-400 hover:text-primary transition">
              <Icon icon="mdi:lifebuoy" class="text-xl" />
              <span class="text-sm font-medium">Support</span>
            </a>

            <div class="flex items-center space-x-3 pl-2 md:pl-4 border-l border-gray-700">
              <div class="text-right hidden sm:block">
                <div class="text-sm font-semibold text-white">{{ user.name }}</div>
                <div class="text-xs text-gray-400">{{ user.role }}</div>
              </div>
              <button @click="handleLogout" class="w-10 h-10 rounded-full flex items-center justify-center hover:opacity-80 transition flex-shrink-0 overflow-hidden">
                <img src="/src/images/avatar.png" alt="User Avatar" class="w-full h-full object-cover" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <main class="flex-1 overflow-y-auto p-4 md:p-6">
        <router-view />
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { Icon } from '@iconify/vue'

const router = useRouter()
const route = useRoute()
const mobileMenuOpen = ref(false)

const user = ref({
  name: 'Demo User',
  email: 'demo@redfire.com',
  role: 'Admin'
})

watch(route, () => {
  mobileMenuOpen.value = false
})

onMounted(() => {
  const storedUser = localStorage.getItem('user')
  if (storedUser) {
    user.value = JSON.parse(storedUser)
  }
})

const handleLogout = () => {
  localStorage.removeItem('user')
  router.push('/login')
}
</script>

