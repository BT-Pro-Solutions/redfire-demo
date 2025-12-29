import { createRouter, createWebHistory } from 'vue-router'
import Login from '../views/Login.vue'
import MainLayout from '../layouts/MainLayout.vue'
import Dashboard from '../views/Dashboard.vue'

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/',
    component: MainLayout,
    children: [
      {
        path: '',
        name: 'Dashboard',
        component: Dashboard
      },
      {
        path: 'inventory/categories',
        name: 'Categories',
        component: () => import('../views/inventory/Categories.vue')
      },
      {
        path: 'inventory/groups',
        name: 'Groups',
        component: () => import('../views/inventory/Groups.vue')
      },
      {
        path: 'inventory/products',
        name: 'RetailProducts',
        component: () => import('../views/inventory/RetailProducts.vue')
      },
      {
        path: 'management/customers',
        name: 'Customers',
        component: () => import('../views/management/Customers.vue')
      },
      {
        path: 'management/users',
        name: 'Users',
        component: () => import('../views/management/Users.vue')
      },
      {
        path: 'purchase/canceled',
        name: 'CanceledPurchases',
        component: () => import('../views/purchase/CanceledPurchases.vue')
      },
      {
        path: 'purchase/completed',
        name: 'CompletedPurchases',
        component: () => import('../views/purchase/CompletedPurchases.vue')
      },
      {
        path: 'purchase/open',
        name: 'OpenPurchases',
        component: () => import('../views/purchase/OpenPurchases.vue')
      },
      {
        path: 'payment/cash',
        name: 'Cash',
        component: () => import('../views/payment/Cash.vue')
      },
      {
        path: 'payment/check',
        name: 'Check',
        component: () => import('../views/payment/Check.vue')
      },
      {
        path: 'payment/credit-card',
        name: 'CreditCard',
        component: () => import('../views/payment/CreditCard.vue')
      },
      {
        path: 'settings/account',
        name: 'Account',
        component: () => import('../views/settings/Account.vue')
      },
      {
        path: 'settings/theme',
        name: 'Theme',
        component: () => import('../views/settings/Theme.vue')
      },
      {
        path: 'support',
        name: 'Support',
        component: () => import('../views/Support.vue')
      }
    ]
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/'
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  const isAuthenticated = localStorage.getItem('user')
  
  // Allow direct access to login page regardless of auth status
  if (to.name === 'Login') {
    next()
    return
  }
  
  // If no route matched and no auth, go to login
  if (!to.name && !isAuthenticated) {
    next({ name: 'Login' })
    return
  }
  
  // Protect all other routes - redirect to login if not authenticated
  if (!isAuthenticated) {
    next({ name: 'Login' })
  } else {
    next()
  }
})

export default router

