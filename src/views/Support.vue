<template>
  <div class="max-w-4xl mx-auto">
    <div class="mb-6">
      <h1 class="text-3xl font-bold text-gray-900 mb-2">Support & Help</h1>
      <p class="text-gray-600">Find answers and get help with common issues</p>
    </div>

    <!-- Search Box -->
    <div class="bg-white rounded-2xl border border-gray-100 p-6 mb-6">
      <div class="relative">
        <Icon icon="mdi:magnify" class="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl" />
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Search documentation..."
          class="w-full pl-12 pr-12 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent focus:bg-white outline-none transition text-lg"
        />
        <button 
          v-if="searchQuery"
          @click="searchQuery = ''"
          class="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
        >
          <Icon icon="mdi:close" class="text-xl" />
        </button>
      </div>
    </div>

    <!-- Common Issues -->
    <div class="bg-white rounded-2xl border border-gray-100 p-6 mb-6">
      <h2 class="text-xl font-bold text-gray-900 mb-4 flex items-center">
        <Icon icon="mdi:frequently-asked-questions" class="text-2xl mr-2" :style="`color: rgb(var(--color-primary-rgb))`" />
        Common Issues
      </h2>
      <div class="space-y-3">
        <a
          v-for="article in filteredArticles"
          :key="article.title"
          href="#"
          @click.prevent="openArticle(article)"
          class="flex items-center justify-between p-4 rounded-xl hover:bg-gray-50 transition group"
        >
          <div class="flex items-center space-x-3">
            <Icon icon="mdi:file-document-outline" class="text-xl text-gray-400 transition" :class="{ 'group-hover-primary': true }" />
            <span class="text-gray-900 font-medium">{{ article.title }}</span>
          </div>
          <Icon icon="mdi:chevron-right" class="text-gray-400 transition" />
        </a>
      </div>
    </div>

    <!-- Contact Information -->
    <div class="grid md:grid-cols-2 gap-6">
      <!-- Email Support -->
      <div class="bg-white rounded-2xl border border-gray-100 p-6">
        <div class="flex items-center space-x-3 mb-4">
          <div class="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center">
            <Icon icon="mdi:email" class="text-2xl text-blue-600" />
          </div>
          <div>
            <h3 class="text-lg font-bold text-gray-900">Email Support</h3>
            <p class="text-sm text-gray-500">Get help via email</p>
          </div>
        </div>
        <a 
          href="mailto:support@redfiretechnology.com"
          class="hover:underline font-medium"
          :style="`color: rgb(var(--color-primary-rgb))`"
        >
          support@redfiretechnology.com
        </a>
      </div>

      <!-- Phone Support -->
      <div class="bg-white rounded-2xl border border-gray-100 p-6">
        <div class="flex items-center space-x-3 mb-4">
          <div class="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center">
            <Icon icon="mdi:phone" class="text-2xl text-green-600" />
          </div>
          <div>
            <h3 class="text-lg font-bold text-gray-900">Phone Support</h3>
            <p class="text-sm text-gray-500">Call us for immediate help</p>
          </div>
        </div>
        <a 
          href="tel:+18668186005"
          class="hover:underline font-medium text-xl"
          :style="`color: rgb(var(--color-primary-rgb))`"
        >
          (866) 818-6005
        </a>
      </div>
    </div>

    <!-- Submit Feedback -->
    <div class="bg-white rounded-2xl border border-gray-100 p-6 mt-6">
      <h2 class="text-xl font-bold text-gray-900 mb-4 flex items-center">
        <Icon icon="mdi:message-text" class="text-2xl mr-2" :style="`color: rgb(var(--color-primary-rgb))`" />
        Send Feedback
      </h2>
      <form @submit.prevent="submitFeedback" class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Category</label>
          <select 
            v-model="feedback.category"
            class="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
          >
            <option value="bug">Bug Report</option>
            <option value="feature">Feature Request</option>
            <option value="question">Question</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Message</label>
          <textarea
            v-model="feedback.message"
            rows="4"
            class="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none resize-none"
            placeholder="Describe your issue or feedback..."
          ></textarea>
        </div>
        <button 
          type="submit"
          class="px-6 py-3 text-white rounded-xl transition hover:opacity-90"
          :style="`background-color: rgb(var(--color-primary-rgb))`"
        >
          Submit Feedback
        </button>
      </form>
    </div>

    <!-- Version Info -->
    <div class="mt-6 text-center text-sm text-gray-500">
      <p>Quartz v2.2505.2</p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { Icon } from '@iconify/vue'

const searchQuery = ref('')

const articles = [
  { 
    title: "Cash drawer won't open or I can't print receipts.",
    content: "Check your printer connections and ensure the cash drawer is properly connected to the receipt printer..."
  },
  { 
    title: "Volcora Scanner Settings",
    content: "Configure your Volcora scanner by accessing Settings > Hardware > Scanners..."
  },
  { 
    title: "Keyboard Not Working",
    content: "If your keyboard is not responding, try the following troubleshooting steps..."
  },
  { 
    title: "How to Add New Products",
    content: "Navigate to Inventory > Products and click the 'Add Product' button..."
  },
  { 
    title: "Managing Customer Accounts",
    content: "Access customer management through Management > Customers..."
  },
  { 
    title: "Processing Refunds",
    content: "To process a refund, locate the original transaction and select 'Issue Refund'..."
  }
]

const feedback = ref({
  category: 'question',
  message: ''
})

const filteredArticles = computed(() => {
  if (!searchQuery.value) return articles
  
  const query = searchQuery.value.toLowerCase()
  return articles.filter(article => 
    article.title.toLowerCase().includes(query) ||
    article.content.toLowerCase().includes(query)
  )
})

const openArticle = (article) => {
  alert(`Article: ${article.title}\n\n${article.content}`)
}

const submitFeedback = () => {
  if (!feedback.value.message.trim()) {
    alert('Please enter a message')
    return
  }
  
  alert('Thank you for your feedback! Our support team will review it shortly.')
  feedback.value.message = ''
  feedback.value.category = 'question'
}
</script>

