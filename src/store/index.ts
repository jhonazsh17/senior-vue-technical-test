import { createStore } from "vuex";
import { getAllCategories, getAllProducts, getAllProductsByCategory } from "../api/request";

export const store = createStore({
  state: {
    productsInCart: [],
    products: [],
    shadowProducts: [],
    categories: [],
    total: 0,
  },
  mutations: {
    SET_PRODUCTS: (state, products) => {
      state.products = products;
    },
    SET_CATEGORIES: (state, categories) => {
      state.categories = categories;
    },
    ADD_TO_CART: (state, product) => {
      state.productsInCart.push(product);
    },
    SET_TOTAL: (state, total) => {
      state.total = total;
    }
  },
  actions: {
    async getProducts({ commit }) {
      const products = await getAllProducts();
      commit('SET_PRODUCTS', products.data);
    },
    async getCategories({ commit }) {
      const categories = await getAllCategories();
      categories.data.push('all products');
      commit('SET_CATEGORIES', categories.data);
    },
    async getProductsByCategory({ commit }, category: string) {
      const products = await getAllProductsByCategory(category);
      commit('SET_PRODUCTS', products.data);
    },
    addToCart({ commit, state }, currentProduct) {
      const foundProduct = state.productsInCart.find((product: { id: number }) => product.id === currentProduct.id);

      if (foundProduct) {
        state.productsInCart.forEach((product: { id: number }, index: number) => {
          if (product.id === currentProduct.id)
            state.productsInCart[index].quantity = state.productsInCart[index]['quantity'] + 1;
            state.productsInCart[index].subTotal = parseFloat(state.productsInCart[index]['price']) * parseFloat(state.productsInCart[index]['quantity']);
        })
      } else {
        commit('ADD_TO_CART', currentProduct);
      }
      
      let total = 0;
      state.productsInCart.forEach((product: { subTotal: number }) => {
        total = total + product.subTotal;
      });
      commit('SET_TOTAL', total);
    },
    updateProductInCart({ state, commit }, actualProduct) {
      let total = 0;
      state.productsInCart.forEach((product: { id: number }, index: number) => {
        if (product.id === actualProduct.id)
          state.productsInCart[index].subTotal = actualProduct.quantity * actualProduct.price;

        total = total + state.productsInCart[index].subTotal;
      });

      commit('SET_TOTAL', total);
    },
    deleteProductInCart({ state, commit }, actualProduct) {
      let total = 0;
      const products = state.productsInCart.filter((product: { id: number }) => product.id !== actualProduct.id);
      state.productsInCart = products;

      products.forEach((product: { subTotal: number }) => {
        total = total + product.subTotal;
      });
      commit('SET_TOTAL', total);
    }
  }
});