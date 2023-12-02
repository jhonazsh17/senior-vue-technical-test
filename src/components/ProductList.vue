<script setup lang="ts">
  import DataTable from 'primevue/datatable';
  import Column from 'primevue/column';
  import Button from 'primevue/button';
  import SearchBar from './SearchBar.vue';
  import { onMounted, ref, watch } from 'vue';
  import { useStore } from 'vuex';

  const props = defineProps<{ productsByCategory?: [] }>();

  const products = ref<{
    title: string, 
    category: string, 
    description: string, 
    id: number, 
    price: number, 
    rating: { rate: number, count: number }, 
    image: string
  }[] | undefined>([]);

  const shadowProducts = ref<{
    title: string, 
    category: string, 
    description: string, 
    id: number, 
    price: number, 
    rating: { rate: number, count: number }, 
    image: string
  }[] | undefined>([]);

  const store = useStore(); 

  // Emits
  const emit = defineEmits(['goToCart'])

  // Watchers
  watch(() => props.productsByCategory, () => {
    products.value = props.productsByCategory;
    shadowProducts.value = props.productsByCategory;
  });

  // onMounted
  onMounted(async () => {
    await store.dispatch('getProducts');
    products.value = store.state.products;
  });

  // All methods
  const formatCurrency = (value: number) => {
    return `$ ${ value.toFixed(2) }`;
  }

  const searchProductInList = (productToSearch: any) => {
    products.value = shadowProducts.value;
    if (productToSearch !== "") {
      products.value = products.value?.filter(
        (product: { title: string }) => product.title.toLowerCase().includes(productToSearch.toLowerCase())
      );
    }
  }

  const addToCart = (data: {
    title: string, 
    category: string, 
    description: string, 
    id: number, 
    price: number, 
    rating: { rate: number, count: number }, 
    image: string,
  }) => {
    const currentData = { ...data, quantity: 1, subTotal: data.price }
    store.dispatch('addToCart', currentData);
  }

  const goToCart = () => {
    emit('goToCart');
  }
</script>

<template>
  <div class="product-list">
    <Toast position="bottom-right" group="br" />
    <div class="product-list__main-header">
      <div class="product-list__main-header-text">
        <h2>Product List</h2>
      </div>
      <div class="product-list__main-header-buttons">
        <Button :label="`(${store.state.productsInCart?.length}) Go to Cart`" severity="secondary" @click="goToCart" />
      </div>
    </div>
    
    <DataTable :value="products" selectionMode="single">
      <template #header>
        <div class="flex flex-wrap align-items-center justify-content-between gap-2 product-list__header">
            <div class="product-list__header-search-bar">
              <SearchBar @searchProduct="searchProductInList" />
            </div>
            <div class="product-list__header-actions">
            </div>
        </div>
      </template>
      <Column field="title" header="Name"></Column>
      <Column header="Image">
        <template #body="slotProps">
            <img
              :src="`${slotProps.data.image}`"
              :alt="slotProps.data.image"
              class="w-6rem shadow-2 border-round product-list__image-product"
            />
        </template>
      </Column>
      <Column field="price" header="Price" :style="{ width: '100px' }">
        <template #body="slotProps">
            {{ formatCurrency(slotProps.data.price) }}
        </template>
      </Column>
      <Column field="category" header="Category" :style="{ width: '200px' }"></Column>
      <Column field="add-to-cart" header="" :style="{ width: '200px' }">
        <template #body="slotProps">
          <Button label="+ Add to Cart" @click="addToCart(slotProps.data)" />
        </template>
      </Column>
    </DataTable>
  </div>
</template>

<style scoped lang="scss">
  .product-list{
    &__main-header {
      display: flex;

      &-text {
        width: 60%;
      }

      &-buttons {
        width: 40%;
        text-align: right;
      }
    }
    &__header {
      display: flex;
      flex-wrap: nowrap;

      &-actions,
      &-search-bar {
        display: flex;
      }

      &-actions {
        width: 30%;
        align-items: center;
      }

      &-search-bar {
        width: 70%;
        justify-content: start;
      }
    }
    &__image-product {
      width: 48px;
    }
  }
</style>

