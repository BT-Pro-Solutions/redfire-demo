<template>
  <div class="layout-container" 
       :style="{ backgroundImage: `url(${bgUrl})`, backgroundSize: 'cover', backgroundPosition: 'center' }">
    <!-- Dark gradient overlay -->
    <div class="gradient-overlay"></div>
    
    <div 
      v-if="mobileMenuOpen"
      class="mobile-overlay"
      @click="mobileMenuOpen = false"
    ></div>

    <!-- Dark Sidebar -->
    <aside 
      class="sidebar"
      :class="{ 'sidebar-hidden': !mobileMenuOpen }"
    >
      <router-link 
        to="/"
        class="logo-link"
        tabindex="0"
      >
        <div class="logo-container">
          <div class="logo-icon">
            <Icon icon="mdi:storefront" class="icon" />
          </div>
          <span class="logo-text">TestCorp</span>
        </div>
      </router-link>

      <nav class="nav">
        <router-link
          to="/"
          class="nav-item"
          :class="{ 'nav-item-active': $route.name === 'Dashboard' }"
        >
          <Icon icon="mdi:view-dashboard" class="nav-icon" />
          <span class="nav-text">Dashboard</span>
        </router-link>

        <div class="nav-section">
          <div class="nav-section-header">
            <Icon icon="mdi:package-variant" class="nav-section-icon" />
            <span class="nav-section-text">Inventory</span>
          </div>
          <router-link to="/inventory/categories" class="nav-subitem" :class="{ 'nav-subitem-active': $route.path === '/inventory/categories' }">
            <Icon icon="mdi:shape" class="nav-subitem-icon" />
            <span class="nav-subitem-text">Categories</span>
          </router-link>
          <router-link to="/inventory/groups" class="nav-subitem" :class="{ 'nav-subitem-active': $route.path === '/inventory/groups' }">
            <Icon icon="mdi:group" class="nav-subitem-icon" />
            <span class="nav-subitem-text">Groups</span>
          </router-link>
          <router-link to="/inventory/products" class="nav-subitem" :class="{ 'nav-subitem-active': $route.path === '/inventory/products' }">
            <Icon icon="mdi:shopping" class="nav-subitem-icon" />
            <span class="nav-subitem-text">Retail Products</span>
          </router-link>
        </div>

        <div class="nav-section">
          <div class="nav-section-header">
            <Icon icon="mdi:account-cog" class="nav-section-icon" />
            <span class="nav-section-text">Management</span>
          </div>
          <router-link to="/management/customers" class="nav-subitem" :class="{ 'nav-subitem-active': $route.path === '/management/customers' }">
            <Icon icon="mdi:account-group" class="nav-subitem-icon" />
            <span class="nav-subitem-text">Customers</span>
          </router-link>
          <router-link to="/management/users" class="nav-subitem" :class="{ 'nav-subitem-active': $route.path === '/management/users' }">
            <Icon icon="mdi:account-multiple" class="nav-subitem-icon" />
            <span class="nav-subitem-text">Users</span>
          </router-link>
        </div>

        <div class="nav-section">
          <div class="nav-section-header">
            <Icon icon="mdi:cash-multiple" class="nav-section-icon" />
            <span class="nav-section-text">Payment</span>
          </div>
          <router-link to="/payment/cash" class="nav-subitem" :class="{ 'nav-subitem-active': $route.path === '/payment/cash' }">
            <Icon icon="mdi:cash" class="nav-subitem-icon" />
            <span class="nav-subitem-text">Cash</span>
          </router-link>
          <router-link to="/payment/check" class="nav-subitem" :class="{ 'nav-subitem-active': $route.path === '/payment/check' }">
            <Icon icon="mdi:checkbook" class="nav-subitem-icon" />
            <span class="nav-subitem-text">Check</span>
          </router-link>
          <router-link to="/payment/credit-card" class="nav-subitem" :class="{ 'nav-subitem-active': $route.path === '/payment/credit-card' }">
            <Icon icon="mdi:credit-card" class="nav-subitem-icon" />
            <span class="nav-subitem-text">Credit Card</span>
          </router-link>
        </div>

        <div class="nav-section">
          <div class="nav-section-header">
            <Icon icon="mdi:cart" class="nav-section-icon" />
            <span class="nav-section-text">Purchase</span>
          </div>
          <a href="#" class="nav-subitem">
            <Icon icon="mdi:cart-remove" class="nav-subitem-icon" />
            <span class="nav-subitem-text">Canceled Purchases</span>
          </a>
          <router-link to="/purchase/completed" class="nav-subitem" :class="{ 'nav-subitem-active': $route.path === '/purchase/completed' }">
            <Icon icon="mdi:cart-check" class="nav-subitem-icon" />
            <span class="nav-subitem-text">Completed Purchases</span>
          </router-link>
          <a href="#" class="nav-subitem">
            <Icon icon="mdi:cart-outline" class="nav-subitem-icon" />
            <span class="nav-subitem-text">Open Purchases</span>
          </a>
        </div>

        <div class="nav-section">
          <router-link to="/support" class="nav-item" :class="{ 'nav-item-active': $route.path === '/support' }">
            <Icon icon="mdi:help-circle" class="nav-icon" />
            <span class="nav-text">Feedback/Support</span>
          </router-link>
        </div>
      </nav>
    </aside>

    <!-- White Content Area with Inset -->
    <div class="content-wrapper">
      <div class="content-container">
        <!-- Top Bar inside white area -->
        <header class="header">
          <div class="header-content">
            <div class="header-left">
              <button 
                @click="mobileMenuOpen = !mobileMenuOpen"
                class="mobile-menu-button"
              >
                <Icon icon="mdi:menu" class="mobile-menu-icon" />
              </button>
              
              <div class="search-box">
                <Icon icon="mdi:magnify" class="search-icon" />
                <input 
                  type="text" 
                  placeholder="Search for anything..." 
                  class="search-input"
                />
              </div>
            </div>

            <div class="header-right">
              <div class="location-selector">
                <Icon icon="mdi:map-marker" class="location-icon" />
                <select class="location-select">
                  <option>Main Location</option>
                  <option>Store #1</option>
                  <option>Store #2</option>
                  <option>Warehouse</option>
                </select>
              </div>

              <div class="notification-menu-container">
                <button 
                  @click.stop="showNotifications = !showNotifications" 
                  class="notification-button notification-menu-trigger"
                >
                  <Icon icon="mdi:bell-outline" class="notification-icon" />
                  <span class="notification-badge"></span>
                </button>

                <!-- Notifications Dropdown -->
                <div v-if="showNotifications" class="dropdown notifications-dropdown">
                  <div class="dropdown-header">
                    <h3 class="dropdown-title">Notifications</h3>
                    <p class="dropdown-subtitle">You have 3 unread notifications</p>
                  </div>
                  
                  <div class="dropdown-content">
                    <!-- Low Stock Notification 1 -->
                    <router-link 
                      to="/inventory/products" 
                      @click="showNotifications = false"
                      class="notification-item"
                    >
                      <div class="notification-icon-wrapper notification-danger">
                        <Icon icon="mdi:alert-circle" class="notification-icon-large" />
                      </div>
                      <div class="notification-body">
                        <p class="notification-title">Low Stock Alert</p>
                        <p class="notification-text">Wireless Mouse (SKU: TECH-001) is running low. Only 3 units remaining.</p>
                        <p class="notification-time">2 hours ago</p>
                      </div>
                    </router-link>

                    <!-- Low Stock Notification 2 -->
                    <router-link 
                      to="/inventory/products" 
                      @click="showNotifications = false"
                      class="notification-item"
                    >
                      <div class="notification-icon-wrapper notification-warning">
                        <Icon icon="mdi:alert" class="notification-icon-large" />
                      </div>
                      <div class="notification-body">
                        <p class="notification-title">Stock Warning</p>
                        <p class="notification-text">USB Cable Pack (SKU: TECH-045) needs restocking. 8 units left.</p>
                        <p class="notification-time">5 hours ago</p>
                      </div>
                    </router-link>

                    <!-- Low Stock Notification 3 -->
                    <router-link 
                      to="/inventory/products" 
                      @click="showNotifications = false"
                      class="notification-item"
                    >
                      <div class="notification-icon-wrapper notification-danger">
                        <Icon icon="mdi:alert-circle" class="notification-icon-large" />
                      </div>
                      <div class="notification-body">
                        <p class="notification-title">Critical Stock Level</p>
                        <p class="notification-text">Desk Lamp (SKU: HOME-203) is critically low. Only 1 unit remaining.</p>
                        <p class="notification-time">1 day ago</p>
                      </div>
                    </router-link>
                  </div>

                  <div class="dropdown-footer">
                    <router-link 
                      to="/inventory/products"
                      @click="showNotifications = false"
                      class="dropdown-link"
                      :style="`color: rgb(var(--color-primary-rgb))`"
                    >
                      View All Inventory
                    </router-link>
                  </div>
                </div>
              </div>

              <div class="user-menu-container">
                <div class="user-info">
                  <div class="user-name">{{ user.name }}</div>
                  <div class="user-role">{{ user.role }}</div>
                </div>
                <button @click.stop="showUserMenu = !showUserMenu" class="user-avatar user-menu-trigger">
                  <img :src="avatarUrl" alt="User Avatar" class="avatar-image" />
                </button>
                
                <!-- User Dropdown Menu -->
                <div v-if="showUserMenu" class="dropdown user-dropdown">
                  <router-link 
                    to="/settings/account" 
                    @click="showUserMenu = false"
                    class="dropdown-item"
                  >
                    <Icon icon="mdi:account" class="dropdown-item-icon" />
                    <span class="dropdown-item-text">My Account</span>
                  </router-link>
                  <router-link 
                    to="/settings/theme" 
                    @click="showUserMenu = false"
                    class="dropdown-item"
                  >
                    <Icon icon="mdi:palette" class="dropdown-item-icon" />
                    <span class="dropdown-item-text">Theme</span>
                  </router-link>
                  <button 
                    @click="handleLogout"
                    class="dropdown-item dropdown-button"
                  >
                    <Icon icon="mdi:logout" class="dropdown-item-icon" />
                    <span class="dropdown-item-text">Log Out</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </header>

        <!-- Main Content Area -->
        <main class="main-content">
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
.layout-container {
  height: 100vh;
  background-color: #171923;
  display: flex;
  overflow: hidden;
  position: relative;
}

.gradient-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, #171923 0%, rgba(23, 25, 35, 0.8) 100%);
}

.mobile-overlay {
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.9);
  z-index: 40;
  backdrop-filter: blur(2px);
}

/* Sidebar Styles */
.sidebar {
  width: 16rem;
  background-color: transparent;
  color: white;
  overflow-y: auto;
  position: fixed;
  inset-y: 0;
  left: 0;
  z-index: 40;
  transition: transform 0.3s ease-in-out;
  flex-shrink: 0;
}

.sidebar-hidden {
  transform: translateX(-100%);
}

.logo-link {
  padding: 1.5rem;
  height: 88px;
  display: flex;
  align-items: center;
  text-decoration: none;
  color: inherit;
}

.logo-link:focus {
  outline: none;
}

.logo-link:focus-visible {
  box-shadow: 0 0 0 2px rgb(var(--color-primary-rgb));
}

.logo-container {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  width: 100%;
}

.logo-icon {
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
  background-color: rgb(var(--color-primary-rgb));
}

.icon {
  font-size: 1.25rem;
}

.logo-text {
  font-size: 1.25rem;
  font-weight: 700;
}

.nav {
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.nav-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 1rem;
  border-radius: 0.5rem;
  transition: background-color 0.15s ease-in-out;
  text-decoration: none;
  color: inherit;
}

.nav-item:hover {
  background-color: rgba(255, 255, 255, 0.05);
}

.nav-item-active {
  background-color: rgb(var(--color-primary-rgb));
  border-left: 4px solid rgb(var(--color-primary-rgb));
  padding-left: 0.75rem;
  padding-right: 1rem;
}

.nav-icon {
  font-size: 1.25rem;
  flex-shrink: 0;
}

.nav-text {
  font-size: 1rem;
}

.nav-section {
  padding-top: 1rem;
}

.nav-section-header {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.5rem 1rem;
  color: var(--gray-400);
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.nav-section-icon {
  font-size: 1.125rem;
  flex-shrink: 0;
}

.nav-section-text {
  font-size: 0.75rem;
}

.nav-subitem {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.625rem 2rem;
  border-radius: 0.5rem;
  transition: background-color 0.15s ease-in-out;
  color: var(--gray-300);
  text-decoration: none;
  font-size: 0.875rem;
}

.nav-subitem:hover {
  background-color: rgba(255, 255, 255, 0.05);
}

.nav-subitem-active {
  color: white;
  background-color: rgb(var(--color-primary-rgb));
  border-left: 4px solid rgb(var(--color-primary-rgb));
  padding-left: 1.75rem;
  padding-right: 2rem;
}

.nav-subitem-icon {
  font-size: 1.125rem;
  flex-shrink: 0;
}

.nav-subitem-text {
  font-size: 0.875rem;
}

/* Content Area */
.content-wrapper {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  padding: 0;
  position: relative;
}

.content-container {
  flex: 1;
  display: flex;
  flex-direction: column;
  background-color: white;
  overflow: hidden;
  position: relative;
  z-index: 10;
}

.header {
  background-color: white;
  border-bottom: 1px solid var(--gray-200);
  padding: 1rem 1.5rem;
}

.header-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.header-left {
  display: flex;
  align-items: center;
  gap: 1.5rem;
}

.mobile-menu-button {
  color: var(--gray-700);
  transition: color 0.15s ease-in-out;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
}

.mobile-menu-button:hover {
  color: rgb(var(--color-primary-rgb));
}

.mobile-menu-icon {
  font-size: 1.5rem;
}

.search-box {
  display: none;
  align-items: center;
  gap: 0.75rem;
  padding: 0.625rem 1rem;
  background-color: var(--gray-50);
  border-radius: 0.75rem;
  border: 1px solid var(--gray-200);
  transition: border-color 0.15s ease-in-out;
  width: 24rem;
}

.search-box:hover {
  border-color: var(--gray-300);
}

.search-icon {
  color: var(--gray-400);
  font-size: 1.25rem;
}

.search-input {
  background-color: transparent;
  outline: none;
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--gray-700);
  width: 100%;
  border: none;
}

.search-input::placeholder {
  color: var(--gray-400);
}

.header-right {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.location-selector {
  display: none;
  align-items: center;
  gap: 0.5rem;
  padding: 0.625rem 1rem;
  background-color: var(--gray-50);
  border-radius: 0.75rem;
  border: 1px solid var(--gray-200);
}

.location-icon {
  color: var(--gray-500);
}

.location-select {
  background-color: transparent;
  outline: none;
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--gray-700);
  cursor: pointer;
  border: none;
}

.notification-menu-container {
  position: relative;
}

.notification-button {
  position: relative;
  width: 2.5rem;
  height: 2.5rem;
  background-color: var(--gray-50);
  border-radius: 0.75rem;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.15s ease-in-out;
  border: 1px solid var(--gray-200);
  cursor: pointer;
}

.notification-button:hover {
  background-color: var(--gray-100);
}

.notification-icon {
  font-size: 1.25rem;
  color: var(--gray-600);
}

.notification-badge {
  position: absolute;
  top: 0.375rem;
  right: 0.375rem;
  width: 0.5rem;
  height: 0.5rem;
  background-color: var(--red-500);
  border-radius: 9999px;
}

.dropdown {
  position: absolute;
  right: 0;
  top: 100%;
  margin-top: 0.5rem;
  background-color: white;
  border-radius: 1rem;
  border: 1px solid var(--gray-200);
  padding: 0.5rem 0;
  z-index: 50;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
}

.notifications-dropdown {
  width: 20rem;
}

.dropdown-header {
  padding: 0.75rem 1rem;
  border-bottom: 1px solid var(--gray-100);
}

.dropdown-title {
  font-weight: 600;
  color: var(--gray-900);
  font-size: 1rem;
}

.dropdown-subtitle {
  font-size: 0.75rem;
  color: var(--gray-500);
  margin-top: 0.125rem;
}

.dropdown-content {
  max-height: 24rem;
  overflow-y: auto;
}

.notification-item {
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  padding: 0.75rem 1rem;
  transition: background-color 0.15s ease-in-out;
  border-bottom: 1px solid var(--gray-50);
  text-decoration: none;
  color: inherit;
}

.notification-item:hover {
  background-color: var(--gray-50);
}

.notification-icon-wrapper {
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 0.75rem;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.notification-danger {
  background-color: var(--red-50);
}

.notification-warning {
  background-color: var(--orange-50);
}

.notification-icon-large {
  font-size: 1.25rem;
}

.notification-danger .notification-icon-large {
  color: var(--red-500);
}

.notification-warning .notification-icon-large {
  color: var(--orange-500);
}

.notification-body {
  flex: 1;
  min-width: 0;
}

.notification-title {
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--gray-900);
}

.notification-text {
  font-size: 0.75rem;
  color: var(--gray-600);
  margin-top: 0.125rem;
}

.notification-time {
  font-size: 0.75rem;
  color: var(--gray-400);
  margin-top: 0.25rem;
}

.dropdown-footer {
  padding: 0.75rem 1rem;
  border-top: 1px solid var(--gray-100);
}

.dropdown-link {
  font-size: 0.875rem;
  font-weight: 500;
  text-align: center;
  display: block;
  text-decoration: none;
}

.dropdown-link:hover {
  text-decoration: underline;
}

.user-menu-container {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding-left: 1rem;
  border-left: 1px solid var(--gray-200);
  position: relative;
}

.user-info {
  text-align: right;
  display: none;
}

.user-name {
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--gray-900);
}

.user-role {
  font-size: 0.75rem;
  color: var(--gray-500);
}

.user-avatar {
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 0.75rem;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: opacity 0.15s ease-in-out, border-color 0.15s ease-in-out;
  flex-shrink: 0;
  overflow: hidden;
  border: 2px solid var(--gray-200);
  cursor: pointer;
  background: none;
  padding: 0;
}

.user-avatar:hover {
  opacity: 0.8;
  border-color: rgb(var(--color-primary-rgb));
}

.avatar-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.user-dropdown {
  width: 12rem;
}

.dropdown-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.625rem 1rem;
  transition: background-color 0.15s ease-in-out;
  color: var(--gray-700);
  text-decoration: none;
}

.dropdown-item:hover {
  background-color: var(--gray-50);
}

.dropdown-button {
  width: 100%;
  text-align: left;
  background: none;
  border: none;
  cursor: pointer;
}

.dropdown-item-icon {
  font-size: 1.25rem;
}

.dropdown-item-text {
  font-size: 0.875rem;
  font-weight: 500;
}

.main-content {
  flex: 1;
  overflow-y: auto;
  background-color: var(--gray-100);
  padding: 1.5rem;
}

/* Custom scrollbar for main content area */
.main-content::-webkit-scrollbar {
  width: 8px;
}

.main-content::-webkit-scrollbar-track {
  background: #ffffff;
}

.main-content::-webkit-scrollbar-thumb {
  background: var(--gray-200);
  border-radius: 4px;
}

.main-content::-webkit-scrollbar-thumb:hover {
  background: var(--gray-300);
}

/* For Firefox */
.main-content {
  scrollbar-width: thin;
  scrollbar-color: var(--gray-200) #ffffff;
}

/* Responsive Styles */
@media (min-width: 768px) {
  .sidebar {
    width: 5rem;
    position: static;
    transform: translateX(0);
  }
  
  .logo-container {
    justify-content: center;
  }
  
  .logo-text {
    display: none;
  }
  
  .nav-item {
    justify-content: center;
  }
  
  .nav-text {
    display: none;
  }
  
  .nav-section-header {
    justify-content: center;
  }
  
  .nav-section-text {
    display: none;
  }
  
  .nav-subitem {
    padding-left: 1rem;
    padding-right: 1rem;
    justify-content: center;
  }
  
  .nav-subitem-active {
    padding-left: 0.75rem;
    padding-right: 1rem;
  }
  
  .nav-subitem-text {
    display: none;
  }
  
  
  .mobile-menu-button {
    display: none;
  }
  
  .search-box {
    display: flex;
  }
  
  .location-selector {
    display: flex;
  }
  
  .user-info {
    display: block;
  }
}

@media (min-width: 1024px) {
  .sidebar {
    width: 16rem;
  }
  
  .logo-container {
    justify-content: flex-start;
  }
  
  .logo-text {
    display: inline;
  }
  
  .nav-item {
    justify-content: flex-start;
  }
  
  .nav-text {
    display: inline;
  }
  
  .nav-section-header {
    justify-content: flex-start;
  }
  
  .nav-section-text {
    display: inline;
  }
  
  .nav-subitem {
    padding-left: 2rem;
    padding-right: 2rem;
    justify-content: flex-start;
  }
  
  .nav-subitem-active {
    padding-left: 1.75rem;
    padding-right: 2rem;
  }
  
  .nav-subitem-text {
    display: inline;
  }
  
  .content-wrapper {
    padding: 1.5rem;
    padding-left: 0;
  }
  
  .content-container {
    border-radius: 1.5rem;
  }
  
  .mobile-overlay {
    display: none;
  }
}
</style>
