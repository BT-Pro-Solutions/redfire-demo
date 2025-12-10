<template>
  <div class="support-container">
    <div class="page-header">
      <h1 class="page-title">Support & Help</h1>
      <p class="page-subtitle">Find answers and get help with common issues</p>
    </div>

    <!-- Search Box -->
    <div class="search-section">
      <div class="search-wrapper">
        <Icon icon="mdi:magnify" class="search-icon" />
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Search documentation..."
          class="search-input"
        />
        <button 
          v-if="searchQuery"
          @click="searchQuery = ''"
          class="clear-button"
        >
          <Icon icon="mdi:close" class="clear-icon" />
        </button>
      </div>
    </div>

    <!-- Common Issues -->
    <div class="section-card">
      <h2 class="section-title">
        <Icon icon="mdi:frequently-asked-questions" class="section-icon" :style="`color: rgb(var(--color-primary-rgb))`" />
        Common Issues
      </h2>
      <div class="articles-list">
        <a
          v-for="article in filteredArticles"
          :key="article.title"
          href="#"
          @click.prevent="openArticle(article)"
          class="article-item"
        >
          <div class="article-content">
            <Icon icon="mdi:file-document-outline" class="article-icon" />
            <span class="article-title">{{ article.title }}</span>
          </div>
          <Icon icon="mdi:chevron-right" class="article-chevron" />
        </a>
      </div>
    </div>

    <!-- Contact Information -->
    <div class="contact-grid">
      <!-- Email Support -->
      <div class="contact-card">
        <div class="contact-header">
          <div class="contact-icon email-icon">
            <Icon icon="mdi:email" class="icon" />
          </div>
          <div>
            <h3 class="contact-title">Email Support</h3>
            <p class="contact-subtitle">Get help via email</p>
          </div>
        </div>
        <a 
          href="mailto:support@redfiretechnology.com"
          class="contact-link"
          :style="`color: rgb(var(--color-primary-rgb))`"
        >
          support@redfiretechnology.com
        </a>
      </div>

      <!-- Phone Support -->
      <div class="contact-card">
        <div class="contact-header">
          <div class="contact-icon phone-icon">
            <Icon icon="mdi:phone" class="icon" />
          </div>
          <div>
            <h3 class="contact-title">Phone Support</h3>
            <p class="contact-subtitle">Call us for immediate help</p>
          </div>
        </div>
        <a 
          href="tel:+18668186005"
          class="contact-link contact-link-large"
          :style="`color: rgb(var(--color-primary-rgb))`"
        >
          (866) 818-6005
        </a>
      </div>
    </div>

    <!-- Submit Feedback -->
    <div class="section-card">
      <h2 class="section-title">
        <Icon icon="mdi:message-text" class="section-icon" :style="`color: rgb(var(--color-primary-rgb))`" />
        Send Feedback
      </h2>
      <form @submit.prevent="submitFeedback" class="feedback-form">
        <div class="form-group">
          <label class="form-label">Category</label>
          <select 
            v-model="feedback.category"
            class="form-select"
          >
            <option value="bug">Bug Report</option>
            <option value="feature">Feature Request</option>
            <option value="question">Question</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div class="form-group">
          <label class="form-label">Message</label>
          <textarea
            v-model="feedback.message"
            rows="4"
            class="form-textarea"
            placeholder="Describe your issue or feedback..."
          ></textarea>
        </div>
        <button 
          type="submit"
          class="submit-button"
          :style="`background-color: rgb(var(--color-primary-rgb))`"
        >
          Submit Feedback
        </button>
      </form>
    </div>

    <!-- Version Info -->
    <div class="version-info">
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

<style scoped>
.support-container {
  max-width: 56rem;
  margin: 0 auto;
}

.page-header {
  margin-bottom: 1.5rem;
}

.page-title {
  font-size: 1.875rem;
  font-weight: 700;
  color: var(--gray-900);
  margin-bottom: 0.5rem;
}

.page-subtitle {
  color: var(--gray-600);
}

.search-section {
  background-color: white;
  border-radius: 1rem;
  border: 1px solid var(--gray-100);
  padding: 1.5rem;
  margin-bottom: 1.5rem;
}

.search-wrapper {
  position: relative;
}

.search-icon {
  position: absolute;
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
  color: var(--gray-400);
  font-size: 1.25rem;
}

.search-input {
  width: 100%;
  padding: 1rem 3rem;
  background-color: var(--gray-50);
  border: 1px solid var(--gray-200);
  border-radius: 0.75rem;
  outline: none;
  transition: all 0.15s ease-in-out;
  font-size: 1.125rem;
}

.search-input:focus {
  box-shadow: 0 0 0 2px rgb(var(--color-primary-rgb) / 0.2);
  border-color: transparent;
  background-color: white;
}

.clear-button {
  position: absolute;
  right: 1rem;
  top: 50%;
  transform: translateY(-50%);
  color: var(--gray-400);
  transition: color 0.15s ease-in-out;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
}

.clear-button:hover {
  color: var(--gray-600);
}

.clear-icon {
  font-size: 1.25rem;
}

.section-card {
  background-color: white;
  border-radius: 1rem;
  border: 1px solid var(--gray-100);
  padding: 1.5rem;
  margin-bottom: 1.5rem;
}

.section-title {
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--gray-900);
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
}

.section-icon {
  font-size: 1.5rem;
  margin-right: 0.5rem;
}

.articles-list {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.article-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
  border-radius: 0.75rem;
  transition: background-color 0.15s ease-in-out;
  text-decoration: none;
}

.article-item:hover {
  background-color: var(--gray-50);
}

.article-content {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.article-icon {
  font-size: 1.25rem;
  color: var(--gray-400);
}

.article-title {
  color: var(--gray-900);
  font-weight: 500;
}

.article-chevron {
  color: var(--gray-400);
}

.contact-grid {
  display: grid;
  gap: 1.5rem;
  margin-bottom: 1.5rem;
}

@media (min-width: 768px) {
  .contact-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

.contact-card {
  background-color: white;
  border-radius: 1rem;
  border: 1px solid var(--gray-100);
  padding: 1.5rem;
}

.contact-header {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1rem;
}

.contact-icon {
  width: 3rem;
  height: 3rem;
  border-radius: 0.75rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.email-icon {
  background-color: var(--blue-50);
}

.email-icon .icon {
  font-size: 1.5rem;
  color: var(--blue-600);
}

.phone-icon {
  background-color: var(--green-50);
}

.phone-icon .icon {
  font-size: 1.5rem;
  color: var(--green-600);
}

.contact-title {
  font-size: 1.125rem;
  font-weight: 700;
  color: var(--gray-900);
}

.contact-subtitle {
  font-size: 0.875rem;
  color: var(--gray-500);
}

.contact-link {
  font-weight: 500;
  text-decoration: none;
}

.contact-link:hover {
  text-decoration: underline;
}

.contact-link-large {
  font-size: 1.25rem;
}

.feedback-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.form-group {
  display: flex;
  flex-direction: column;
}

.form-label {
  display: block;
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--gray-700);
  margin-bottom: 0.5rem;
}

.form-select,
.form-textarea {
  width: 100%;
  padding: 0.5rem 1rem;
  background-color: var(--gray-50);
  border: 1px solid var(--gray-200);
  border-radius: 0.75rem;
  outline: none;
  transition: all 0.15s ease-in-out;
}

.form-select:focus,
.form-textarea:focus {
  box-shadow: 0 0 0 2px rgb(var(--color-primary-rgb) / 0.2);
  border-color: transparent;
}

.form-textarea {
  resize: none;
}

.submit-button {
  padding: 0.75rem 1.5rem;
  color: white;
  border-radius: 0.75rem;
  transition: opacity 0.15s ease-in-out;
  border: none;
  cursor: pointer;
  font-weight: 500;
}

.submit-button:hover {
  opacity: 0.9;
}

.version-info {
  margin-top: 1.5rem;
  text-align: center;
  font-size: 0.875rem;
  color: var(--gray-500);
}
</style>
