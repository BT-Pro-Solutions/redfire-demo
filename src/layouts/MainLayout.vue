<template>
  <div class="h-screen bg-[#171923] flex overflow-hidden">
    <div 
      v-if="mobileMenuOpen"
      class="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
      @click="mobileMenuOpen = false"
      style="backdrop-filter: blur(2px);"
    ></div>

    <!-- Dark Sidebar -->
    <aside 
      class="w-64 bg-[#171923] text-white flex-shrink-0 overflow-y-auto fixed md:static inset-y-0 left-0 z-40 transition-transform duration-300 md:w-20 lg:w-64 md:translate-x-0"
      :class="{ '-translate-x-full md:translate-x-0': !mobileMenuOpen }"
    >
      <div class="px-6 py-6 h-[88px] flex items-center">
        <div class="flex items-center space-x-3 md:justify-center lg:justify-start w-full">
          <div class="w-10 h-10 bg-primary rounded-lg flex items-center justify-center flex-shrink-0 shadow-lg">
            <Icon icon="mdi:storefront" class="text-xl" />
          </div>
          <span class="text-xl font-bold md:hidden lg:inline">TestCorp</span>
        </div>
      </div>

      <nav class="p-4 space-y-1">
        <router-link
          to="/"
          class="flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-white/5 transition md:justify-center lg:justify-start"
          :class="{ 'bg-primary border-l-4 border-primary': $route.name === 'Dashboard' }"
        >
          <Icon icon="mdi:view-dashboard" class="text-xl flex-shrink-0" />
          <span class="md:hidden lg:inline">Dashboard</span>
        </router-link>

        <div class="pt-4">
          <div class="flex items-center space-x-3 px-4 py-2 text-gray-400 text-xs font-semibold uppercase tracking-wider md:justify-center lg:justify-start">
            <Icon icon="mdi:package-variant" class="text-lg flex-shrink-0" />
            <span class="md:hidden lg:inline">Inventory</span>
          </div>
          <router-link to="/inventory/categories" class="flex items-center space-x-3 px-8 py-2.5 rounded-lg hover:bg-white/5 transition text-gray-300 md:px-4 md:justify-center lg:px-8 lg:justify-start" active-class="bg-primary text-white border-l-4 border-primary">
            <Icon icon="mdi:shape" class="text-lg flex-shrink-0" />
            <span class="md:hidden lg:inline text-sm">Categories</span>
          </router-link>
          <router-link to="/inventory/groups" class="flex items-center space-x-3 px-8 py-2.5 rounded-lg hover:bg-white/5 transition text-gray-300 md:px-4 md:justify-center lg:px-8 lg:justify-start" active-class="bg-primary text-white border-l-4 border-primary">
            <Icon icon="mdi:group" class="text-lg flex-shrink-0" />
            <span class="md:hidden lg:inline text-sm">Groups</span>
          </router-link>
          <router-link to="/inventory/products" class="flex items-center space-x-3 px-8 py-2.5 rounded-lg hover:bg-white/5 transition text-gray-300 md:px-4 md:justify-center lg:px-8 lg:justify-start" active-class="bg-primary text-white border-l-4 border-primary">
            <Icon icon="mdi:shopping" class="text-lg flex-shrink-0" />
            <span class="md:hidden lg:inline text-sm">Retail Products</span>
          </router-link>
        </div>

        <div class="pt-4">
          <div class="flex items-center space-x-3 px-4 py-2 text-gray-400 text-xs font-semibold uppercase tracking-wider md:justify-center lg:justify-start">
            <Icon icon="mdi:account-cog" class="text-lg flex-shrink-0" />
            <span class="md:hidden lg:inline">Management</span>
          </div>
          <router-link to="/management/customers" class="flex items-center space-x-3 px-8 py-2.5 rounded-lg hover:bg-white/5 transition text-gray-300 md:px-4 md:justify-center lg:px-8 lg:justify-start" active-class="bg-primary text-white border-l-4 border-primary">
            <Icon icon="mdi:account-group" class="text-lg flex-shrink-0" />
            <span class="md:hidden lg:inline text-sm">Customers</span>
          </router-link>
          <router-link to="/management/users" class="flex items-center space-x-3 px-8 py-2.5 rounded-lg hover:bg-white/5 transition text-gray-300 md:px-4 md:justify-center lg:px-8 lg:justify-start" active-class="bg-primary text-white border-l-4 border-primary">
            <Icon icon="mdi:account-multiple" class="text-lg flex-shrink-0" />
            <span class="md:hidden lg:inline text-sm">Users</span>
          </router-link>
        </div>

        <div class="pt-4">
          <div class="flex items-center space-x-3 px-4 py-2 text-gray-400 text-xs font-semibold uppercase tracking-wider md:justify-center lg:justify-start">
            <Icon icon="mdi:cash-multiple" class="text-lg flex-shrink-0" />
            <span class="md:hidden lg:inline">Payment</span>
          </div>
          <router-link to="/payment/cash" class="flex items-center space-x-3 px-8 py-2.5 rounded-lg hover:bg-white/5 transition text-gray-300 md:px-4 md:justify-center lg:px-8 lg:justify-start" active-class="bg-primary text-white border-l-4 border-primary">
            <Icon icon="mdi:cash" class="text-lg flex-shrink-0" />
            <span class="md:hidden lg:inline text-sm">Cash</span>
          </router-link>
          <router-link to="/payment/check" class="flex items-center space-x-3 px-8 py-2.5 rounded-lg hover:bg-white/5 transition text-gray-300 md:px-4 md:justify-center lg:px-8 lg:justify-start" active-class="bg-primary text-white border-l-4 border-primary">
            <Icon icon="mdi:checkbook" class="text-lg flex-shrink-0" />
            <span class="md:hidden lg:inline text-sm">Check</span>
          </router-link>
          <router-link to="/payment/credit-card" class="flex items-center space-x-3 px-8 py-2.5 rounded-lg hover:bg-white/5 transition text-gray-300 md:px-4 md:justify-center lg:px-8 lg:justify-start" active-class="bg-primary text-white border-l-4 border-primary">
            <Icon icon="mdi:credit-card" class="text-lg flex-shrink-0" />
            <span class="md:hidden lg:inline text-sm">Credit Card</span>
          </router-link>
        </div>

        <div class="pt-4">
          <div class="flex items-center space-x-3 px-4 py-2 text-gray-400 text-xs font-semibold uppercase tracking-wider md:justify-center lg:justify-start">
            <Icon icon="mdi:cart" class="text-lg flex-shrink-0" />
            <span class="md:hidden lg:inline">Purchase</span>
          </div>
          <a href="#" class="flex items-center space-x-3 px-8 py-2.5 rounded-lg hover:bg-white/5 transition text-gray-300 md:px-4 md:justify-center lg:px-8 lg:justify-start">
            <Icon icon="mdi:cart-remove" class="text-lg flex-shrink-0" />
            <span class="md:hidden lg:inline text-sm">Canceled Purchases</span>
          </a>
          <router-link to="/purchase/completed" class="flex items-center space-x-3 px-8 py-2.5 rounded-lg hover:bg-white/5 transition text-gray-300 md:px-4 md:justify-center lg:px-8 lg:justify-start" active-class="bg-primary text-white border-l-4 border-primary">
            <Icon icon="mdi:cart-check" class="text-lg flex-shrink-0" />
            <span class="md:hidden lg:inline text-sm">Completed Purchases</span>
          </router-link>
          <a href="#" class="flex items-center space-x-3 px-8 py-2.5 rounded-lg hover:bg-white/5 transition text-gray-300 md:px-4 md:justify-center lg:px-8 lg:justify-start">
            <Icon icon="mdi:cart-outline" class="text-lg flex-shrink-0" />
            <span class="md:hidden lg:inline text-sm">Open Purchases</span>
          </a>
        </div>

        <div class="pt-4 pb-4">
          <a href="#" class="flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-white/5 transition md:justify-center lg:justify-start">
            <Icon icon="mdi:help-circle" class="text-xl flex-shrink-0" />
            <span class="md:hidden lg:inline text-sm">Feedback/Support</span>
          </a>
        </div>
      </nav>
    </aside>

    <!-- White Content Area with Inset -->
    <div class="flex-1 flex flex-col overflow-hidden lg:p-6 lg:pl-0">
      <div class="flex-1 flex flex-col bg-white lg:rounded-3xl overflow-hidden">
        <!-- Top Bar inside white area -->
        <header class="bg-white border-b border-gray-200 px-6 py-4">
          <div class="flex items-center justify-between">
            <div class="flex items-center space-x-4 md:space-x-6">
              <button 
                @click="mobileMenuOpen = !mobileMenuOpen"
                class="lg:hidden text-gray-700 hover:text-primary transition"
              >
                <Icon icon="mdi:menu" class="text-2xl" />
              </button>
              
              <div class="hidden md:flex items-center space-x-3 px-4 py-2.5 bg-gray-50 rounded-xl border border-gray-200 hover:border-gray-300 transition w-96">
                <Icon icon="mdi:magnify" class="text-gray-400 text-xl" />
                <input 
                  type="text" 
                  placeholder="Search for anything..." 
                  class="bg-transparent outline-none text-sm font-medium text-gray-700 placeholder-gray-400 w-full"
                />
              </div>
            </div>

            <div class="flex items-center space-x-3 md:space-x-4">
              <div class="hidden md:flex items-center space-x-2 px-4 py-2.5 bg-gray-50 rounded-xl border border-gray-200">
                <Icon icon="mdi:map-marker" class="text-gray-500" />
                <select class="bg-transparent outline-none text-sm font-medium text-gray-700 cursor-pointer">
                  <option>Main Location</option>
                  <option>Store #1</option>
                  <option>Store #2</option>
                  <option>Warehouse</option>
                </select>
              </div>

              <button class="relative w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center hover:bg-gray-100 transition border border-gray-200">
                <Icon icon="mdi:bell-outline" class="text-xl text-gray-600" />
                <span class="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>

              <div class="flex items-center space-x-3 pl-4 border-l border-gray-200">
                <div class="text-right hidden sm:block">
                  <div class="text-sm font-semibold text-gray-900">{{ user.name }}</div>
                  <div class="text-xs text-gray-500">{{ user.role }}</div>
                </div>
                <button @click="handleLogout" class="w-10 h-10 rounded-xl flex items-center justify-center hover:opacity-80 transition flex-shrink-0 overflow-hidden border-2 border-gray-200 hover:border-primary">
                  <img :src="avatarUrl" alt="User Avatar" class="w-full h-full object-cover" />
                </button>
              </div>
            </div>
          </div>
        </header>

        <!-- Main Content Area -->
        <main class="flex-1 overflow-y-auto bg-gray-100 p-6">
          <router-view />
        </main>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { Icon } from '@iconify/vue'

const router = useRouter()
const route = useRoute()
const mobileMenuOpen = ref(false)

const user = ref({
  name: 'Sarah Mitchell',
  email: 'demo@redfire.com',
  role: 'Admin'
})

const avatarUrl = computed(() => `${import.meta.env.BASE_URL}avatar.png`)

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

<style scoped>
/* Custom scrollbar for main content area */
main::-webkit-scrollbar {
  width: 8px;
}

main::-webkit-scrollbar-track {
  background: #ffffff;
}

main::-webkit-scrollbar-thumb {
  background: #e5e7eb;
  border-radius: 4px;
}

main::-webkit-scrollbar-thumb:hover {
  background: #d1d5db;
}

/* For Firefox */
main {
  scrollbar-width: thin;
  scrollbar-color: #e5e7eb #ffffff;
}
</style>
