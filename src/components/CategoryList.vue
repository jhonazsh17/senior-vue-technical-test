<script setup lang="ts">
  import Listbox from 'primevue/listbox';
  import { onMounted, ref } from "vue";
  import { useStore } from 'vuex';

  const selectedCategory = ref<{ name: string, code: number | null }>({ name: '', code: null});
  const categories = ref<{ name: string, code: number }[]>([]);

  const store = useStore();

  // Emits
  const emit = defineEmits(['changeCategory'])

  onMounted(async () => {
    await store.dispatch('getCategories');
    categories.value = store.state.categories.map((category: string, index: number) => {
      return {
        name: category,
        code: index,
      };
    });
  });

  // Methods
  const changeCategory = () => {
    emit('changeCategory', selectedCategory.value.name);
  }
</script>

<template>
  <div class="category-list">
    <h3>Categories:</h3>
    <Listbox v-model="selectedCategory" :options="categories" optionLabel="name" class="w-full md:w-14rem" @change="changeCategory" />
  </div>
</template>

<style scoped>
</style>

<style>
</style>