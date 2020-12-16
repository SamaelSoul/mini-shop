<template>
  <div class="cart">
    <router-link :to="{ name: 'Home' }">
      <div class="cart__link-to-catalog">Back to Catalog</div>
    </router-link>
    <h1>Cart</h1>
    <p v-if="!isEmpty">Cart is empty...</p>
    <CartItem
      v-for="(item, index) in cartData"
      :key="index"
      :cartItemData="item"
      @deleteFromCart="deleteFromCart(index)"
      @decrement="decrement(index)"
      @increment="increment(index)"
    />
    <div class="cart__total">
      <p class="cart__total_name">Total:</p>
      <p>{{ cartTotalCost }}P</p>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import CartItem from "./CartItem";
export default {
  name: "Cart",
  components: {
    CartItem
  },
  props: {
    cartData: {
      type: Array,
      default: () => ({})
    }
  },
  computed: {
    ...mapGetters(["cart"]),
    isEmpty() {
      return Boolean(this.cart.length);
    },
    cartTotalCost() {
      let result = [];
      for (let item of this.cartData) {
        result.push(item.price * item.quantity);
      }
      const total = result.reduce((el, acc) => (acc += el), 0);
      return total;
    }
  },
  methods: {
    ...mapActions([
      "deleteProductFromCart",
      "decrementCartItem",
      "incrementCartItem"
    ]),
    deleteFromCart(index) {
      this.deleteProductFromCart(index);
    },
    decrement(index) {
      this.decrementCartItem(index);
    },
    increment(index) {
      this.incrementCartItem(index);
    }
  }
};
</script>

<style lang="scss" scoped>
.cart {
  margin-bottom: 150px;
  h1,
  p {
    text-align: center;
  }
  &__link-to-catalog {
    position: absolute;
    top: 10px;
    right: 10px;
    padding: $padding * 2;
    border: solid 1px #000;
  }
  &__total {
    position: fixed;
    display: flex;
    bottom: 0;
    left: 0;
    right: 0;
    padding: $padding * 3;
    justify-content: center;
    background: #26ae68;
    color: #fff;
    font-size: 24px;
    font-weight: 600;
    &_name {
      margin-right: $margin * 2;
    }
  }
}
</style>
