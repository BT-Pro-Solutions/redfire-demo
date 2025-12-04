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
        path: 'purchase/completed',
        name: 'CompletedPurchases',
        component: () => import('../views/purchase/CompletedPurchases.vue')
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
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  const isAuthenticated = localStorage.getItem('user')
  
  if (to.name !== 'Login' && !isAuthenticated) {
    next({ name: 'Login' })
  } else if (to.name === 'Login' && isAuthenticated) {
    next({ name: 'Dashboard' })
  } else {
    next()
  }
})

export default router

