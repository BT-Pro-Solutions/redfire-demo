<template>
  <div class="form-container">
    <div class="form-group">
      <label class="form-label">Item Name</label>
      <input 
        v-model="form.itemName"
        type="text" 
        class="form-input"
      />
    </div>

    <div class="form-group">
      <label class="form-label">Short Name</label>
      <input 
        v-model="form.shortName"
        type="text" 
        class="form-input"
      />
    </div>

    <div class="form-group">
      <label class="form-label">Unit of Measure</label>
      <select v-model="form.unitOfMeasure" class="form-select">
        <option>EA</option>
        <option>BOX</option>
        <option>CASE</option>
        <option>LB</option>
      </select>
    </div>

    <div class="form-group">
      <label class="form-label">Unit Description</label>
      <input 
        v-model="form.unitDescription"
        type="text" 
        class="form-input"
      />
    </div>

    <div class="toggle-container">
      <span class="toggle-label">ISE Visible</span>
      <label class="toggle-switch">
        <input v-model="form.iseVisible" type="checkbox" class="toggle-input">
        <div class="toggle-slider"></div>
      </label>
    </div>

    <div class="form-group">
      <label class="form-label">Sort</label>
      <input 
        v-model="form.sort"
        type="number" 
        class="form-input"
      />
    </div>

    <div class="form-group">
      <label class="form-label">Price $</label>
      <input 
        v-model="form.price"
        type="number" 
        step="0.01"
        class="form-input"
      />
    </div>

    <div class="cost-section">
      <h3 class="section-title">Calculated Cost</h3>
      <div class="cost-list">
        <div class="cost-item">
          <span class="cost-label">High</span>
          <span class="cost-value">$84.7000</span>
        </div>
        <div class="cost-item">
          <span class="cost-label">Uncovered High</span>
          <span class="cost-value">$84.7000</span>
        </div>
        <div class="cost-item">
          <span class="cost-label">Default</span>
          <span class="cost-value">$9.2500</span>
        </div>
        <div class="cost-item">
          <span class="cost-label">Low</span>
          <span class="cost-value">$9.2500</span>
        </div>
      </div>
    </div>

    <div class="form-row">
      <div class="form-group">
        <label class="form-label">Margin</label>
        <input 
          v-model="form.margin"
          type="text" 
          class="form-input readonly-input"
          readonly
        />
      </div>
      <div class="form-group">
        <label class="form-label">% Margin</label>
        <input 
          v-model="form.marginPercent"
          type="text" 
          class="form-input readonly-input"
          readonly
        />
      </div>
    </div>

    <div class="form-group">
      <label class="form-label">SKU</label>
      <input 
        v-model="form.sku"
        type="text" 
        class="form-input"
      />
    </div>

    <div class="form-group">
      <label class="form-label">Barcode</label>
      <div class="barcode-container">
        <input 
          v-model="form.barcode"
          type="text" 
          class="form-input barcode-input"
        />
        <button class="add-button">
          <Icon icon="mdi:plus" class="add-icon" />
        </button>
      </div>
    </div>

    <div class="form-group">
      <label class="form-label">Remote ID</label>
      <input 
        v-model="form.remoteId"
        type="text" 
        class="form-input"
      />
    </div>

    <div class="form-group">
      <label class="form-label">Printer</label>
      <select v-model="form.printer" class="form-select">
        <option>None</option>
        <option>Printer 1</option>
        <option>Printer 2</option>
      </select>
    </div>

    <div class="section-divider">
      <h3 class="section-title">Inventory Tracking</h3>
      
      <div class="toggle-container inventory-toggle">
        <span class="toggle-label">Inventory Count</span>
        <label class="toggle-switch">
          <input v-model="form.inventoryTracking" type="checkbox" class="toggle-input">
          <div class="toggle-slider"></div>
        </label>
      </div>

      <div v-if="form.inventoryTracking" class="form-group">
        <label class="form-label">On Hand</label>
        <input 
          v-model="form.onHand"
          type="number" 
          class="form-input"
        />
      </div>
    </div>

    <div class="form-actions">
      <button 
        @click="$emit('save', form)"
        class="submit-button"
      >
        Save Product
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { Icon } from '@iconify/vue'

const props = defineProps({
  data: Object
})

const form = ref({
  itemName: 'Complex Item with RAC',
  shortName: 'CIRAC',
  unitOfMeasure: 'EA',
  unitDescription: '',
  iseVisible: true,
  sort: 999999999,
  price: 100.00,
  margin: '$15.3000',
  marginPercent: '15.3000%',
  sku: '',
  barcode: '',
  remoteId: '',
  printer: 'None',
  inventoryTracking: true,
  onHand: -2,
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

.toggle-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.5rem 0;
}

.toggle-label {
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--gray-700);
}

.toggle-switch {
  position: relative;
  display: inline-flex;
  align-items: center;
  cursor: pointer;
}

.toggle-input {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}

.toggle-slider {
  width: 2.75rem;
  height: 1.5rem;
  background-color: var(--gray-300);
  border-radius: 9999px;
  position: relative;
  transition: background-color 0.2s;
}

.toggle-slider::after {
  content: '';
  position: absolute;
  top: 2px;
  left: 2px;
  width: 1.25rem;
  height: 1.25rem;
  background-color: white;
  border: 1px solid var(--gray-300);
  border-radius: 9999px;
  transition: transform 0.2s;
}

.toggle-input:checked + .toggle-slider {
  background-color: #10b981;
}

.toggle-input:checked + .toggle-slider::after {
  transform: translateX(1.25rem);
  border-color: white;
}

.toggle-input:focus + .toggle-slider {
  box-shadow: 0 0 0 4px rgba(var(--color-primary-rgb), 0.2);
}

.cost-section {
  background-color: var(--gray-50);
  padding: 1rem;
  border-radius: 0.5rem;
}

.section-title {
  font-weight: 700;
  color: var(--gray-900);
  margin-bottom: 0.75rem;
}

.cost-list {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  font-size: 0.875rem;
}

.cost-item {
  display: flex;
  justify-content: space-between;
}

.cost-label {
  color: var(--gray-600);
}

.cost-value {
  font-weight: 500;
}

.barcode-container {
  display: flex;
  gap: 0.5rem;
}

.barcode-input {
  flex: 1;
}

.add-button {
  padding: 0.5rem 1rem;
  background-color: var(--gray-200);
  border-radius: 0.5rem;
  transition: background-color 0.15s ease-in-out;
  border: none;
  cursor: pointer;
}

.add-button:hover {
  background-color: var(--gray-300);
}

.add-icon {
  font-size: 1.25rem;
}

.section-divider {
  border-top: 1px solid var(--gray-200);
  padding-top: 1rem;
}

.inventory-toggle {
  margin-bottom: 1rem;
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
