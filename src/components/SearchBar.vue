<script setup lang="ts">
  import InputText from 'primevue/inputtext';
  import { ref } from 'vue';

  const productToSearch = ref('');

  // Emits
  const emit = defineEmits(['searchProduct'])

  // Methods
  const search = () => {
    emit('searchProduct', productToSearch.value);
  }
</script>

<template>
  <div class="search-bar">
    <InputText
      type="text"
      v-model="productToSearch"
      @keyup="search"
      placeholder="Search product ..."
    />
  </div>
</template>

<style scoped>
</style>

<style>
  .p-inputtext {
    width: 580px;
  }
</style>
