<template>
  <div class="form-container">
    <div class="form-group">
      <label class="form-label">Category Name</label>
      <input 
        v-model="form.name"
        type="text" 
        class="form-input"
      />
    </div>

    <div class="form-group">
      <label class="form-label">Description</label>
      <textarea 
        v-model="form.description"
        rows="4"
        class="form-textarea"
      ></textarea>
    </div>

    <div class="form-group">
      <label class="form-label">Status</label>
      <select v-model="form.status" class="form-select">
        <option>Active</option>
        <option>Inactive</option>
      </select>
    </div>

    <div class="form-actions">
      <button 
        @click="$emit('save', form)"
        class="submit-button"
      >
        Save Category
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
  data: Object
})

const form = ref({
  name: '',
  description: '',
  status: 'Active',
  ...props.data
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

.form-label {
  display: block;
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--gray-700);
  margin-bottom: 0.25rem;
}

.form-input,
.form-textarea,
.form-select {
  width: 100%;
  padding: 0.5rem 0.75rem;
  border: 1px solid var(--gray-300);
  border-radius: 0.5rem;
  outline: none;
  transition: all 0.15s ease-in-out;
}

.form-input:focus,
.form-textarea:focus,
.form-select:focus {
  box-shadow: 0 0 0 2px rgb(var(--color-primary-rgb) / 0.2);
  border-color: transparent;
}

.form-textarea {
  resize: vertical;
}

.form-actions {
  padding-top: 1rem;
  border-top: 1px solid var(--gray-200);
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
</style>
