<template>
  <div class="form-container">
    <div class="form-row">
      <div class="form-group">
        <label class="form-label">Purchase ID</label>
        <input 
          v-model="form.purchaseId"
          type="text" 
          class="form-input readonly-input"
          readonly
        />
      </div>
      
      <div class="form-group">
        <label class="form-label">Check #</label>
        <input 
          v-model="form.checkNumber"
          type="text" 
          class="form-input"
        />
      </div>
    </div>

    <div class="form-row">
      <div class="form-group">
        <label class="form-label">Status</label>
        <select v-model="form.status" class="form-select">
          <option>complete</option>
          <option>pending</option>
          <option>cancelled</option>
        </select>
      </div>
      
      <div class="form-group">
        <label class="form-label">User</label>
        <input 
          v-model="form.user"
          type="text" 
          class="form-input"
        />
      </div>
    </div>

    <div class="form-group">
      <label class="form-label">Location</label>
      <select v-model="form.location" class="form-select">
        <option>Duke's</option>
        <option>Main Location</option>
        <option>Store #1</option>
        <option>Store #2</option>
      </select>
    </div>

    <div class="form-group">
      <label class="form-label">Date</label>
      <input 
        v-model="form.date"
        type="datetime-local" 
        class="form-input"
      />
    </div>

    <div class="item-section">
      <h3 class="section-title">Item Details</h3>
      <div class="item-details">
        <div class="form-group">
          <label class="form-label">Item</label>
          <input 
            v-model="form.itemName"
            type="text" 
            class="form-input"
          />
        </div>
        <div class="form-row">
          <div class="form-group">
            <label class="form-label">Size</label>
            <input 
              v-model="form.size"
              type="text" 
              class="form-input"
            />
          </div>
          <div class="form-group">
            <label class="form-label">Description</label>
            <input 
              v-model="form.description"
              type="text" 
              class="form-input"
            />
          </div>
        </div>
      </div>
    </div>

    <div class="totals-section">
      <div class="total-row">
        <span class="total-label">Subtotal</span>
        <input 
          v-model="form.subtotal"
          type="text" 
          class="total-input"
        />
      </div>
      <div class="total-row">
        <span class="total-label">Tax</span>
        <input 
          v-model="form.tax"
          type="text" 
          class="total-input"
        />
      </div>
      <div class="total-row total-final">
        <span class="total-final-label">Total</span>
        <span class="total-final-value">{{ total }}</span>
      </div>
    </div>

    <div>
      <h3 class="section-title">Payments</h3>
      <button class="view-button">
        <span>View</span>
      </button>
    </div>

    <div>
      <label class="form-label">Receipt Email</label>
      <input 
        v-model="form.receiptEmail"
        type="email" 
        placeholder="Receipt Email"
        class="form-input"
      />
      <button class="send-button">
        Send Receipt
      </button>
    </div>

    <div class="form-actions">
      <button 
        @click="$emit('save', form)"
        class="submit-button"
      >
        Save Purchase
      </button>
      
      <button class="archive-button">
        Archive Purchase
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  data: Object
})

const form = ref({
  purchaseId: '692db453c732cff79866de3c',
  checkNumber: '045913603726',
  status: 'complete',
  user: 'Forrest Bishop',
  location: "Duke's",
  date: '2024-12-01T10:29',
  itemName: 'Complex Item with RAC',
  size: 'Cigar Caddy Yellow',
  description: 'The Big Easy Cigar Cutter',
  subtotal: '$100.00',
  tax: '$7.00',
  receiptEmail: '',
  ...props.data
})

const total = computed(() => {
  const subtotal = parseFloat(form.value.subtotal.replace('$', '')) || 0
  const tax = parseFloat(form.value.tax.replace('$', '')) || 0
  return '$' + (subtotal + tax).toFixed(2)
})
</script>

<style scoped>
.form-container {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.form-group {
  display: flex;
  flex-direction: column;
}

.form-row {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
}

.form-label {
  display: block;
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--gray-700);
  margin-bottom: 0.25rem;
}

.form-input,
.form-select {
  width: 100%;
  padding: 0.5rem 0.75rem;
  border: 1px solid var(--gray-300);
  border-radius: 0.5rem;
  outline: none;
  transition: all 0.15s ease-in-out;
}

.form-input:focus,
.form-select:focus {
  box-shadow: 0 0 0 2px rgb(var(--color-primary-rgb) / 0.2);
  border-color: transparent;
}

.readonly-input {
  background-color: var(--gray-50);
}

.item-section {
  background-color: var(--gray-50);
  padding: 1rem;
  border-radius: 0.5rem;
}

.section-title {
  font-size: 1.125rem;
  font-weight: 700;
  color: var(--gray-900);
  margin-bottom: 0.75rem;
}

.item-details {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.totals-section {
  background-color: var(--gray-50);
  padding: 1rem;
  border-radius: 0.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.total-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.total-label {
  font-weight: 500;
  color: var(--gray-700);
}

.total-input {
  width: 8rem;
  padding: 0.5rem 0.75rem;
  border: 1px solid var(--gray-300);
  border-radius: 0.5rem;
  text-align: right;
  outline: none;
  transition: all 0.15s ease-in-out;
}

.total-input:focus {
  box-shadow: 0 0 0 2px rgb(var(--color-primary-rgb) / 0.2);
  border-color: transparent;
}

.total-final {
  padding-top: 0.5rem;
  border-top: 1px solid var(--gray-300);
}

.total-final-label {
  font-weight: 700;
  color: var(--gray-900);
}

.total-final-value {
  font-weight: 700;
  color: var(--gray-900);
  font-size: 1.25rem;
}

.view-button,
.send-button {
  width: 100%;
  padding: 0.5rem 1rem;
  background-color: var(--gray-800);
  color: white;
  border-radius: 0.5rem;
  transition: background-color 0.15s ease-in-out;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  border: none;
  cursor: pointer;
}

.view-button:hover,
.send-button:hover {
  background-color: var(--gray-900);
}

.send-button {
  margin-top: 0.5rem;
  padding: 0.75rem 1rem;
  font-weight: 500;
}

.form-actions {
  padding-top: 1rem;
  border-top: 1px solid var(--gray-200);
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.submit-button {
  width: 100%;
  padding: 0.75rem 1rem;
  background-color: rgb(var(--color-primary-rgb));
  color: white;
  border-radius: 0.5rem;
  transition: background-color 0.15s ease-in-out;
  font-weight: 500;
  border: none;
  cursor: pointer;
}

.submit-button:hover {
  background-color: var(--color-primary-dark);
}

.archive-button {
  width: 100%;
  padding: 0.75rem 1rem;
  background-color: var(--red-600);
  color: white;
  border-radius: 0.5rem;
  transition: background-color 0.15s ease-in-out;
  font-weight: 500;
  border: none;
  cursor: pointer;
}

.archive-button:hover {
  background-color: var(--red-700);
}
</style>
