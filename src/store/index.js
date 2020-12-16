import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import mutations from "./mutations";

Vue.use(Vuex);

const {
  SET_PRODUCTS,
  SET_CART,
  DELETE_PRODUCT,
  DECREMENT,
  INCREMENT
} = mutations;

export default new Vuex.Store({
  state: {
    products: [],
    cart: []
  },
  getters: {
    products: ({ products }) => products,
    cart: ({ cart }) => cart
  },
  mutations: {
    [SET_PRODUCTS](state, products) {
      state.products = products;
    },
    [SET_CART](state, product) {
      if (state.cart.length) {
        let isProductExists = false;
        state.cart.map(item => {
          if (item.article === product.article) {
            isProductExists = true;
            item.quantity++;
          }
        });
        if (!isProductExists) {
          state.cart.push(product);
        }
      } else {
        state.cart.push(product);
      }
    },
    [DELETE_PRODUCT](state, index) {
      state.cart.splice(index, 1);
    },
    [INCREMENT](state, index) {
      state.cart[index].quantity++;
    },
    [DECREMENT](state, index) {
      if (state.cart[index].quantity) {
        state.cart[index].quantity--;
      }
    }
  },
  actions: {
    async getProducts({ commit }) {
      try {
        const products = await axios.get("http://localhost:3000/products");
        commit("SET_PRODUCTS", products.data);
        return products;
      } catch (err) {
        console.log(err);
        return err;
      }
    },
    addProductToCart({ commit }, product) {
      commit(SET_CART, product);
    },
    deleteProductFromCart({ commit }, index) {
      commit(DELETE_PRODUCT, index);
    },
    decrementCartItem({ commit }, index) {
      commit(DECREMENT, index);
    },
    incrementCartItem({ commit }, index) {
      commit(INCREMENT, index);
    }
  },
  modules: {}
});
