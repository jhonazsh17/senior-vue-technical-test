<script setup lang="ts">
  import { useStore } from 'vuex';
  import DataTable from 'primevue/datatable';
  import Column from 'primevue/column';
  import Button from 'primevue/button';
  import InputNumber from 'primevue/inputnumber';

  const store = useStore();

  // All methods
  const changeQuantity = (item: {
    title: string, 
    category: string, 
    description: string, 
    id: number, 
    price: number, 
    rating: { rate: number, count: number }, 
    image: string,
    quantity: number,
    subTotal: number,
  }) => {
    store.dispatch('updateProductInCart', item);
  }

  const deleteItem = (item: {
    title: string, 
    category: string, 
    description: string, 
    id: number, 
    price: number, 
    rating: { rate: number, count: number }, 
    image: string,
    quantity: number,
    subTotal: number,
  }) => {
    store.dispatch('deleteProductInCart', item);
  }

  // Emits
  const emit = defineEmits(['comeBack'])

  const comeBack = () => {
    emit('comeBack');
  }
</script>

<template>
  <div class="shopping-cart">
    <div class="shopping-cart__products">
      <h2>Products in Cart</h2>

      <div v-if="store.state.productsInCart.length > 0">
        <DataTable :value="store.state.productsInCart" selectionMode="single">
          <Column field="image" header="">
            <template #body="slotProps">
              <img :src="slotProps.data.image" alt="" class="shopping-cart__product-image">
            </template>
          </Column>
          <Column field="title" header="Name" :style="{ width: '500px' }">
            <template #body="slotProps">
              {{ slotProps.data.title }}
            </template>
          </Column>
          <Column field="quantity" header="Quantity">
            <template #body="slotProps">
              <InputNumber
                v-model="slotProps.data.quantity"
                inputId="minmax-buttons"
                mode="decimal"
                showButtons
                :min="0"
                :max="100"
                class="shopping-cart__input-quantity"
                @input="changeQuantity(slotProps.data)"
              />
            </template>
          </Column>
          <Column field="price" header="Price">
            <template #body="slotProps">
              $ {{ slotProps.data.price }}
            </template>
          </Column>
          <Column field="subTotal" header="Sub-Total">
            <template #body="slotProps">
              $ {{ slotProps.data.subTotal }}
            </template>
          </Column>
          <Column field="actions" header="Actions">
            <template #body="slotProps">
              <Button type="button" label="Delete" @click="deleteItem(slotProps.data)" />
            </template>
          </Column>
          
        </DataTable>
        <p class="shopping-cart__sub-text">{{ store.state.productsInCart.length  }} Items in Cart</p>
      </div>

      <div v-else>
        <p>There are no products in the cart.</p>
      </div>

      <Button type="button" label="Back" @click="comeBack" />
      
    </div>
    <div class="shopping-cart__total">
      <h3>Total</h3>
      <h3>
        $ {{ store.state.total.toFixed(2) }}
      </h3>
    </div>
  </div>
</template>

<style scoped lang="scss">
  .shopping-cart {
    display: flex;
    width: 85%;

    &__products {
      width: 90%;
      padding: 0.7em;
    }

    &__total {
      width: 10%;
      padding: 0.7em;
    }

    &__sub-text {
      text-align: right;
    }
  }
</style>

<style lang="scss">
.shopping-cart {
  &__input-quantity {
    & > .p-inputtext {
      width: 70px !important;
    }
  }

  &__product-image {
    width: 48px;
  }
}

</style>
