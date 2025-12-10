<template>
  <div class="h-screen bg-[#171923] flex overflow-hidden relative" 
       :style="{ backgroundImage: `url(${bgUrl})`, backgroundSize: 'cover', backgroundPosition: 'center' }">
    <!-- Dark gradient overlay -->
    <div class="absolute inset-0" style="background: linear-gradient(135deg, #171923 0%, rgba(23, 25, 35, 0.8) 100%);"></div>
    
    <div 
      v-if="mobileMenuOpen"
      class="fixed inset-0 bg-black bg-opacity-90 z-40 lg:hidden"
      @click="mobileMenuOpen = false"
      style="backdrop-filter: blur(2px);"
    ></div>

    <!-- Dark Sidebar -->
    <aside 
      class="w-64 bg-transparent text-white overflow-y-auto fixed md:static inset-y-0 left-0 z-40 transition-transform duration-300 md:w-20 lg:w-64 md:translate-x-0 md:flex-shrink-0 absolute md:relative"
      :class="{ '-translate-x-full md:translate-x-0': !mobileMenuOpen }"
    >
      <router-link 
        to="/"
        class="px-6 py-6 h-[88px] flex items-center focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary"
        style="display: block;"
        tabindex="0"
      >
        <div class="flex items-center space-x-3 md:justify-center lg:justify-start w-full">
          <div class="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 shadow-lg" style="background-color: rgb(var(--color-primary-rgb));">
            <Icon icon="mdi:storefront" class="text-xl" />
          </div>
          <span class="text-xl font-bold md:hidden lg:inline">TestCorp</span>
        </div>
      </router-link>

      <nav class="p-4 space-y-1">
        <router-link
          to="/"
          class="flex items-center space-x-3 py-3 rounded-lg hover:bg-white/5 transition md:justify-center lg:justify-start"
          :class="$route.name === 'Dashboard' ? 'pl-3 pr-4' : 'px-4'"
          :style="$route.name === 'Dashboard' ? 'background-color: rgb(var(--color-primary-rgb)); border-left: 4px solid rgb(var(--color-primary-rgb));' : ''"
        >
          <Icon icon="mdi:view-dashboard" class="text-xl flex-shrink-0" />
          <span class="md:hidden lg:inline">Dashboard</span>
        </router-link>

        <div class="pt-4">
          <div class="flex items-center space-x-3 px-4 py-2 text-gray-400 text-xs font-semibold uppercase tracking-wider md:justify-center lg:justify-start">
            <Icon icon="mdi:package-variant" class="text-lg flex-shrink-0" />
            <span class="md:hidden lg:inline">Inventory</span>
          </div>
          <router-link to="/inventory/categories" class="flex items-center space-x-3 py-2.5 rounded-lg hover:bg-white/5 transition text-gray-300 md:justify-center lg:justify-start" :class="[$route.path === '/inventory/categories' ? 'text-white pl-7 pr-8 md:pl-3 md:pr-4 lg:pl-7 lg:pr-8' : 'px-8 md:px-4 lg:px-8']" :style="$route.path === '/inventory/categories' ? 'background-color: rgb(var(--color-primary-rgb)); border-left: 4px solid rgb(var(--color-primary-rgb));' : ''">
            <Icon icon="mdi:shape" class="text-lg flex-shrink-0" />
            <span class="md:hidden lg:inline text-sm">Categories</span>
          </router-link>
          <router-link to="/inventory/groups" class="flex items-center space-x-3 py-2.5 rounded-lg hover:bg-white/5 transition text-gray-300 md:justify-center lg:justify-start" :class="[$route.path === '/inventory/groups' ? 'text-white pl-7 pr-8 md:pl-3 md:pr-4 lg:pl-7 lg:pr-8' : 'px-8 md:px-4 lg:px-8']" :style="$route.path === '/inventory/groups' ? 'background-color: rgb(var(--color-primary-rgb)); border-left: 4px solid rgb(var(--color-primary-rgb));' : ''">
            <Icon icon="mdi:group" class="text-lg flex-shrink-0" />
            <span class="md:hidden lg:inline text-sm">Groups</span>
          </router-link>
          <router-link to="/inventory/products" class="flex items-center space-x-3 py-2.5 rounded-lg hover:bg-white/5 transition text-gray-300 md:justify-center lg:justify-start" :class="[$route.path === '/inventory/products' ? 'text-white pl-7 pr-8 md:pl-3 md:pr-4 lg:pl-7 lg:pr-8' : 'px-8 md:px-4 lg:px-8']" :style="$route.path === '/inventory/products' ? 'background-color: rgb(var(--color-primary-rgb)); border-left: 4px solid rgb(var(--color-primary-rgb));' : ''">
            <Icon icon="mdi:shopping" class="text-lg flex-shrink-0" />
            <span class="md:hidden lg:inline text-sm">Retail Products</span>
          </router-link>
        </div>

        <div class="pt-4">
          <div class="flex items-center space-x-3 px-4 py-2 text-gray-400 text-xs font-semibold uppercase tracking-wider md:justify-center lg:justify-start">
            <Icon icon="mdi:account-cog" class="text-lg flex-shrink-0" />
            <span class="md:hidden lg:inline">Management</span>
          </div>
          <router-link to="/management/customers" class="flex items-center space-x-3 py-2.5 rounded-lg hover:bg-white/5 transition text-gray-300 md:justify-center lg:justify-start" :class="[$route.path === '/management/customers' ? 'text-white pl-7 pr-8 md:pl-3 md:pr-4 lg:pl-7 lg:pr-8' : 'px-8 md:px-4 lg:px-8']" :style="$route.path === '/management/customers' ? 'background-color: rgb(var(--color-primary-rgb)); border-left: 4px solid rgb(var(--color-primary-rgb));' : ''">
            <Icon icon="mdi:account-group" class="text-lg flex-shrink-0" />
            <span class="md:hidden lg:inline text-sm">Customers</span>
          </router-link>
          <router-link to="/management/users" class="flex items-center space-x-3 py-2.5 rounded-lg hover:bg-white/5 transition text-gray-300 md:justify-center lg:justify-start" :class="[$route.path === '/management/users' ? 'text-white pl-7 pr-8 md:pl-3 md:pr-4 lg:pl-7 lg:pr-8' : 'px-8 md:px-4 lg:px-8']" :style="$route.path === '/management/users' ? 'background-color: rgb(var(--color-primary-rgb)); border-left: 4px solid rgb(var(--color-primary-rgb));' : ''">
            <Icon icon="mdi:account-multiple" class="text-lg flex-shrink-0" />
            <span class="md:hidden lg:inline text-sm">Users</span>
          </router-link>
        </div>

        <div class="pt-4">
          <div class="flex items-center space-x-3 px-4 py-2 text-gray-400 text-xs font-semibold uppercase tracking-wider md:justify-center lg:justify-start">
            <Icon icon="mdi:cash-multiple" class="text-lg flex-shrink-0" />
            <span class="md:hidden lg:inline">Payment</span>
          </div>
          <router-link to="/payment/cash" class="flex items-center space-x-3 py-2.5 rounded-lg hover:bg-white/5 transition text-gray-300 md:justify-center lg:justify-start" :class="[$route.path === '/payment/cash' ? 'text-white pl-7 pr-8 md:pl-3 md:pr-4 lg:pl-7 lg:pr-8' : 'px-8 md:px-4 lg:px-8']" :style="$route.path === '/payment/cash' ? 'background-color: rgb(var(--color-primary-rgb)); border-left: 4px solid rgb(var(--color-primary-rgb));' : ''">
            <Icon icon="mdi:cash" class="text-lg flex-shrink-0" />
            <span class="md:hidden lg:inline text-sm">Cash</span>
          </router-link>
          <router-link to="/payment/check" class="flex items-center space-x-3 py-2.5 rounded-lg hover:bg-white/5 transition text-gray-300 md:justify-center lg:justify-start" :class="[$route.path === '/payment/check' ? 'text-white pl-7 pr-8 md:pl-3 md:pr-4 lg:pl-7 lg:pr-8' : 'px-8 md:px-4 lg:px-8']" :style="$route.path === '/payment/check' ? 'background-color: rgb(var(--color-primary-rgb)); border-left: 4px solid rgb(var(--color-primary-rgb));' : ''">
            <Icon icon="mdi:checkbook" class="text-lg flex-shrink-0" />
            <span class="md:hidden lg:inline text-sm">Check</span>
          </router-link>
          <router-link to="/payment/credit-card" class="flex items-center space-x-3 py-2.5 rounded-lg hover:bg-white/5 transition text-gray-300 md:justify-center lg:justify-start" :class="[$route.path === '/payment/credit-card' ? 'text-white pl-7 pr-8 md:pl-3 md:pr-4 lg:pl-7 lg:pr-8' : 'px-8 md:px-4 lg:px-8']" :style="$route.path === '/payment/credit-card' ? 'background-color: rgb(var(--color-primary-rgb)); border-left: 4px solid rgb(var(--color-primary-rgb));' : ''">
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
          <router-link to="/purchase/completed" class="flex items-center space-x-3 py-2.5 rounded-lg hover:bg-white/5 transition text-gray-300 md:justify-center lg:justify-start" :class="[$route.path === '/purchase/completed' ? 'text-white pl-7 pr-8 md:pl-3 md:pr-4 lg:pl-7 lg:pr-8' : 'px-8 md:px-4 lg:px-8']" :style="$route.path === '/purchase/completed' ? 'background-color: rgb(var(--color-primary-rgb)); border-left: 4px solid rgb(var(--color-primary-rgb));' : ''">
            <Icon icon="mdi:cart-check" class="text-lg flex-shrink-0" />
            <span class="md:hidden lg:inline text-sm">Completed Purchases</span>
          </router-link>
          <a href="#" class="flex items-center space-x-3 px-8 py-2.5 rounded-lg hover:bg-white/5 transition text-gray-300 md:px-4 md:justify-center lg:px-8 lg:justify-start">
            <Icon icon="mdi:cart-outline" class="text-lg flex-shrink-0" />
            <span class="md:hidden lg:inline text-sm">Open Purchases</span>
          </a>
        </div>

        <div class="pt-4 pb-4">
          <router-link to="/support" class="flex items-center space-x-3 py-3 rounded-lg hover:bg-white/5 transition md:justify-center lg:justify-start" :class="[$route.path === '/support' ? 'text-white pl-3 pr-4' : 'px-4']" :style="$route.path === '/support' ? 'background-color: rgb(var(--color-primary-rgb)); border-left: 4px solid rgb(var(--color-primary-rgb));' : ''">
            <Icon icon="mdi:help-circle" class="text-xl flex-shrink-0" />
            <span class="md:hidden lg:inline text-sm">Feedback/Support</span>
          </router-link>
        </div>
      </nav>
    </aside>

    <!-- White Content Area with Inset -->
    <div class="flex-1 flex flex-col overflow-hidden lg:p-6 lg:pl-0 relative">
      <div class="flex-1 flex flex-col bg-white lg:rounded-3xl overflow-hidden relative z-10">
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

              <div class="relative notification-menu-container">
                <button 
                  @click.stop="showNotifications = !showNotifications" 
                  class="relative w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center hover:bg-gray-100 transition border border-gray-200 notification-menu-trigger"
                >
                  <Icon icon="mdi:bell-outline" class="text-xl text-gray-600" />
                  <span class="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full"></span>
                </button>

                <!-- Notifications Dropdown -->
                <div v-if="showNotifications" class="absolute right-0 top-full mt-2 bg-white rounded-2xl border border-gray-200 py-2 z-50 w-80 shadow-xl">
                  <div class="px-4 py-3 border-b border-gray-100">
                    <h3 class="font-semibold text-gray-900">Notifications</h3>
                    <p class="text-xs text-gray-500 mt-0.5">You have 3 unread notifications</p>
                  </div>
                  
                  <div class="max-h-96 overflow-y-auto">
                    <!-- Low Stock Notification 1 -->
                    <router-link 
                      to="/inventory/products" 
                      @click="showNotifications = false"
                      class="flex items-start space-x-3 px-4 py-3 hover:bg-gray-50 transition border-b border-gray-50"
                    >
                      <div class="w-10 h-10 bg-red-50 rounded-xl flex items-center justify-center flex-shrink-0">
                        <Icon icon="mdi:alert-circle" class="text-xl text-red-500" />
                      </div>
                      <div class="flex-1 min-w-0">
                        <p class="text-sm font-medium text-gray-900">Low Stock Alert</p>
                        <p class="text-xs text-gray-600 mt-0.5">Wireless Mouse (SKU: TECH-001) is running low. Only 3 units remaining.</p>
                        <p class="text-xs text-gray-400 mt-1">2 hours ago</p>
                      </div>
                    </router-link>

                    <!-- Low Stock Notification 2 -->
                    <router-link 
                      to="/inventory/products" 
                      @click="showNotifications = false"
                      class="flex items-start space-x-3 px-4 py-3 hover:bg-gray-50 transition border-b border-gray-50"
                    >
                      <div class="w-10 h-10 bg-orange-50 rounded-xl flex items-center justify-center flex-shrink-0">
                        <Icon icon="mdi:alert" class="text-xl text-orange-500" />
                      </div>
                      <div class="flex-1 min-w-0">
                        <p class="text-sm font-medium text-gray-900">Stock Warning</p>
                        <p class="text-xs text-gray-600 mt-0.5">USB Cable Pack (SKU: TECH-045) needs restocking. 8 units left.</p>
                        <p class="text-xs text-gray-400 mt-1">5 hours ago</p>
                      </div>
                    </router-link>

                    <!-- Low Stock Notification 3 -->
                    <router-link 
                      to="/inventory/products" 
                      @click="showNotifications = false"
                      class="flex items-start space-x-3 px-4 py-3 hover:bg-gray-50 transition"
                    >
                      <div class="w-10 h-10 bg-red-50 rounded-xl flex items-center justify-center flex-shrink-0">
                        <Icon icon="mdi:alert-circle" class="text-xl text-red-500" />
                      </div>
                      <div class="flex-1 min-w-0">
                        <p class="text-sm font-medium text-gray-900">Critical Stock Level</p>
                        <p class="text-xs text-gray-600 mt-0.5">Desk Lamp (SKU: HOME-203) is critically low. Only 1 unit remaining.</p>
                        <p class="text-xs text-gray-400 mt-1">1 day ago</p>
                      </div>
                    </router-link>
                  </div>

                  <div class="px-4 py-3 border-t border-gray-100">
                    <router-link 
                      to="/inventory/products"
                      @click="showNotifications = false"
                      class="text-sm font-medium hover:underline text-center block"
                      :style="`color: rgb(var(--color-primary-rgb))`"
                    >
                      View All Inventory
                    </router-link>
                  </div>
                </div>
              </div>

              <div class="flex items-center space-x-3 pl-4 border-l border-gray-200 relative user-menu-container">
                <div class="text-right hidden sm:block">
                  <div class="text-sm font-semibold text-gray-900">{{ user.name }}</div>
                  <div class="text-xs text-gray-500">{{ user.role }}</div>
                </div>
                <button @click.stop="showUserMenu = !showUserMenu" class="w-10 h-10 rounded-xl flex items-center justify-center hover:opacity-80 transition flex-shrink-0 overflow-hidden border-2 border-gray-200 hover:border-primary user-menu-trigger">
                  <img :src="avatarUrl" alt="User Avatar" class="w-full h-full object-cover" />
                </button>
                
                <!-- User Dropdown Menu -->
                <div v-if="showUserMenu" class="absolute right-0 top-full mt-2 bg-white rounded-2xl border border-gray-200 py-2 z-50 w-48">
                  <router-link 
                    to="/settings/account" 
                    @click="showUserMenu = false"
                    class="flex items-center space-x-3 px-4 py-2.5 hover:bg-gray-50 transition text-gray-700"
                  >
                    <Icon icon="mdi:account" class="text-xl" />
                    <span class="text-sm font-medium">My Account</span>
                  </router-link>
                  <router-link 
                    to="/settings/theme" 
                    @click="showUserMenu = false"
                    class="flex items-center space-x-3 px-4 py-2.5 hover:bg-gray-50 transition text-gray-700"
                  >
                    <Icon icon="mdi:palette" class="text-xl" />
                    <span class="text-sm font-medium">Theme</span>
                  </router-link>
                  <button 
                    @click="handleLogout"
                    class="w-full flex items-center space-x-3 px-4 py-2.5 hover:bg-gray-50 transition text-gray-700"
                  >
                    <Icon icon="mdi:logout" class="text-xl" />
                    <span class="text-sm font-medium">Log Out</span>
                  </button>
                </div>
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
import { ref, computed, onMounted, onUnmounted, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { Icon } from '@iconify/vue'

const router = useRouter()
const route = useRoute()
const mobileMenuOpen = ref(false)
const showUserMenu = ref(false)
const showNotifications = ref(false)

const user = ref({
  name: 'Sarah Mitchell',
  email: 'demo@redfire.com',
  role: 'Admin'
})

const avatarUrl = computed(() => localStorage.getItem('customAvatar') || `${import.meta.env.BASE_URL}avatar.png`)
const bgUrl = computed(() => localStorage.getItem('customBackground') || `${import.meta.env.BASE_URL}bg.avif`)

watch(route, () => {
  mobileMenuOpen.value = false
  showUserMenu.value = false
  showNotifications.value = false
})

const handleClickOutside = (event) => {
  const target = event.target
  
  // Handle user menu
  if (showUserMenu.value && !target.closest('.user-menu-container')) {
    showUserMenu.value = false
  }
  
  // Handle notifications menu
  if (showNotifications.value && !target.closest('.notification-menu-container')) {
    showNotifications.value = false
  }
}

onMounted(() => {
  const storedUser = localStorage.getItem('user')
  if (storedUser) {
    user.value = JSON.parse(storedUser)
  }
  
  // Apply custom primary color if set
  const savedColor = localStorage.getItem('primaryColor')
  if (savedColor) {
    const hexToRgb = (hex) => {
      const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
      return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
      } : null
    }
    const rgb = hexToRgb(savedColor)
    if (rgb) {
      document.documentElement.style.setProperty('--color-primary-rgb', `${rgb.r} ${rgb.g} ${rgb.b}`)
    }
  }
  
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
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
