<template>
  <div class="cart-item">
    <img
      class="cart-item__image"
      :src="require('../assets/images/' + cartItemData.image)"
      alt=""
    />
    <div class="cart-item__info">
      <p>{{ cartItemData.name }}</p>
      <p>{{ cartItemData.price }}</p>
      <p>{{ cartItemData.article }}</p>
    </div>
    <div class="cart-item__quantity">
      <p>Qty:</p>
      <span>
        <span class="cursor" @click="decrementItem">-</span>
        {{ cartItemData.quantity }}
        <span class="cursor" @click="incrementItem">+</span>
      </span>
    </div>
    <button class="cart-item__deleteBtn" @click="deleteFromCart">Delete</button>
  </div>
</template>

<script>
export default {
  name: "CartItem",
  props: {
    cartItemData: {
      type: Object,
      default: () => ({})
    }
  },
  mounted() {
    this.$set(this.cartItemData, "quantity", 1);
  },
  methods: {
    deleteFromCart() {
      this.$emit("deleteFromCart");
    },
    decrementItem() {
      this.$emit("decrement");
    },
    incrementItem() {
      this.$emit("increment");
    }
  }
};
</script>

<style lang="scss" scoped>
.cart-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: nowrap;
  text-align: center;
  box-shadow: 0 0 8px 0 #e0e0e0;
  padding: $padding * 2;
  margin-bottom: $margin * 2;
  &__image {
    max-width: 50px;
  }
  &__quantity {
    .cursor {
      cursor: pointer;
    }
  }
  &__deleteBtn {
    padding: $padding $padding * 2;
    background: #ae3626dc;
    border-radius: 5px;
    border: none;
    color: #fff;
  }
}
</style>
