<script setup lang="ts">
  import { ref } from 'vue';
  import CategoryList from './components/CategoryList.vue';
  import ProductList from './components/ProductList.vue';
  import { useStore } from 'vuex';
 import ShoppingCart from './components/ShoppingCart.vue';

  const productsByCategory = ref([]);
  const store = useStore();

  const isCartTemplate = ref(false);

  // Methods
  const selectProductsByCategory = async (name: string) => {
    if (name === 'all products') {
      await store.dispatch('getProducts');
    } else {
      await store.dispatch('getProductsByCategory', name);
    }
    productsByCategory.value = store.state.products;
  }

  const goToCart = async () => {
    isCartTemplate.value = true;
  }

  const comeBack = () => {
    isCartTemplate.value = false;
  }
</script>

<template>
  <div class="app">
    <div v-if="!isCartTemplate" class="main-container">
      <div class="main-container__sidebar">
        <CategoryList @changeCategory="selectProductsByCategory"/>
      </div>
      <div class="main-container__product-list">
        <ProductList :productsByCategory="productsByCategory" @goToCart="goToCart"/>
      </div>
    </div>
    <div v-else class="cart-container">
      <ShoppingCart @comeBack="comeBack"/>
    </div>
  </div>
</template>

<style scoped lang="scss">
  .main-container {
    width: 85%;
    margin: 0 auto;
    display: flex;

    &__sidebar {
      width: 20%;
    }
    &__product-list {
      width: 80%;
    }
    &__sidebar,
    &__product-list {
      padding: 0.7em;
    }
  }

  .cart-container {
    width: 85%;
    margin: 0 auto;
    display: flex;
  }
</style>
