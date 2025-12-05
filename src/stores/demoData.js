import { defineStore } from 'pinia'

export const useDemoDataStore = defineStore('demoData', {
  state: () => ({
    currentUser: {
      name: 'Sarah Mitchell',
      title: 'Store Manager',
      image: `${import.meta.env.BASE_URL}avatar.png`
    },

    weeklyPayments: [
      { day: 'Mon', cash: 1200, check: 800, creditcard: 3500, giftcard: 400 },
      { day: 'Tue', cash: 1500, check: 600, creditcard: 4200, giftcard: 300 },
      { day: 'Wed', cash: 1800, check: 700, creditcard: 3800, giftcard: 500 },
      { day: 'Thu', cash: 1300, check: 900, creditcard: 4500, giftcard: 600 },
      { day: 'Fri', cash: 2100, check: 1200, creditcard: 5200, giftcard: 800 },
      { day: 'Sat', cash: 2500, check: 1000, creditcard: 6100, giftcard: 900 },
      { day: 'Sun', cash: 1900, check: 850, creditcard: 4800, giftcard: 700 }
    ],

    weeklyPurchases: [
      { day: 'Mon', purchases: 45, cancelled: 3 },
      { day: 'Tue', purchases: 52, cancelled: 5 },
      { day: 'Wed', purchases: 48, cancelled: 2 },
      { day: 'Thu', purchases: 61, cancelled: 4 },
      { day: 'Fri', purchases: 73, cancelled: 6 },
      { day: 'Sat', purchases: 89, cancelled: 8 },
      { day: 'Sun', purchases: 68, cancelled: 5 }
    ],

    newCustomers: [
      { name: 'John Anderson', email: 'john.anderson@email.com', dateAdded: '2024-12-03' },
      { name: 'Emily Chen', email: 'emily.chen@email.com', dateAdded: '2024-12-03' },
      { name: 'Michael Rodriguez', email: 'm.rodriguez@email.com', dateAdded: '2024-12-02' },
      { name: 'Sarah Thompson', email: 'sarah.t@email.com', dateAdded: '2024-12-02' },
      { name: 'David Kim', email: 'david.kim@email.com', dateAdded: '2024-12-01' },
      { name: 'Jessica Martinez', email: 'jess.martinez@email.com', dateAdded: '2024-12-01' }
    ],

    lowInventory: [
      { name: 'Wireless Mouse', sku: 'TECH-001', qty: 3 },
      { name: 'USB-C Cable 6ft', sku: 'TECH-045', qty: 5 },
      { name: 'Notebook - Leather', sku: 'STAT-112', qty: 2 },
      { name: 'Blue Ink Pens (12pk)', sku: 'STAT-087', qty: 4 },
      { name: 'Desk Organizer', sku: 'FURN-203', qty: 1 },
      { name: 'Laptop Stand', sku: 'FURN-156', qty: 2 }
    ],

    quickLinks: [
      { name: 'Add New Product', icon: 'mdi:plus-circle', url: '/inventory/products/new', color: 'blue' },
      { name: 'View Reports', icon: 'mdi:chart-line', url: '/reports', color: 'green' },
      { name: 'Manage Users', icon: 'mdi:account-cog', url: '/management/users', color: 'purple' },
      { name: 'Support Tickets', icon: 'mdi:ticket', url: '/support', color: 'orange' }
    ]
  }),

  getters: {
    totalWeeklyRevenue: (state) => {
      return state.weeklyPayments.reduce((sum, day) => {
        return sum + day.cash + day.check + day.creditcard + day.giftcard
      }, 0)
    },

    totalWeeklyPurchases: (state) => {
      return state.weeklyPurchases.reduce((sum, day) => sum + day.purchases, 0)
    }
  }
})

