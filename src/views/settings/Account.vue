<template>
  <div>
    <div class="page-header">
      <h1 class="page-title">My Account</h1>
      <p class="page-subtitle">Manage your account settings</p>
    </div>

    <div class="account-card">
      <h2 class="card-title">Account Information</h2>
      <div class="form-fields">
        <div class="form-field">
          <label class="field-label">Name</label>
          <input 
            type="text" 
            v-model="name"
            class="field-input"
          />
        </div>
        <div class="form-field">
          <label class="field-label">Email</label>
          <input 
            type="email" 
            v-model="email"
            class="field-input"
          />
        </div>
        <div class="form-field">
          <label class="field-label">Role</label>
          <input 
            type="text" 
            v-model="role"
            disabled
            class="field-input disabled-input"
          />
        </div>
      </div>
      
      <div class="form-actions">
        <button 
          @click="saveAccount"
          class="save-button"
        >
          Save Changes
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const name = ref('')
const email = ref('')
const role = ref('')

onMounted(() => {
  const user = JSON.parse(localStorage.getItem('user') || '{}')
  name.value = user.name || ''
  email.value = user.email || ''
  role.value = user.role || ''
})

const saveAccount = () => {
  const user = {
    name: name.value,
    email: email.value,
    role: role.value
  }
  localStorage.setItem('user', JSON.stringify(user))
  alert('Account settings saved!')
}
</script>

<style scoped>
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

.account-card {
  background-color: white;
  border-radius: 1rem;
  border: 1px solid var(--gray-100);
  padding: 1.5rem;
}

.card-title {
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--gray-900);
  margin-bottom: 1rem;
}

.form-fields {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.form-field {
  display: flex;
  flex-direction: column;
}

.field-label {
  display: block;
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--gray-700);
  margin-bottom: 0.5rem;
}

.field-input {
  width: 100%;
  padding: 0.5rem 1rem;
  background-color: var(--gray-50);
  border: 1px solid var(--gray-200);
  border-radius: 0.75rem;
  outline: none;
  transition: all 0.15s ease-in-out;
}

.field-input:focus {
  box-shadow: 0 0 0 2px rgb(var(--color-primary-rgb) / 0.2);
  border-color: transparent;
}

.disabled-input {
  background-color: var(--gray-100);
  color: var(--gray-500);
  cursor: not-allowed;
}

.form-actions {
  margin-top: 1.5rem;
  display: flex;
  justify-content: flex-end;
}

.save-button {
  padding: 0.75rem 1.5rem;
  background: linear-gradient(to right, rgb(var(--color-primary-rgb)), var(--blue-600));
  color: white;
  border-radius: 0.75rem;
  transition: background 0.15s ease-in-out;
  border: none;
  cursor: pointer;
}

.save-button:hover {
  background: linear-gradient(to right, var(--blue-600), rgb(var(--color-primary-rgb)));
}
</style>
