<template>
  <div class="catalog-item">
    <img
      class="catalog-item__image"
      :src="require('../assets/images/' + product.image)"
      alt="alt"
    />
    <p class="catalog-item__name">{{ product.name }}</p>
    <p class="catalog-item__price">{{ product.price }}р.</p>
    <button class="catalog-item__add_to_cart_btn btn" @click="addToCart">
      Add to Cart
    </button>
  </div>
</template>

<script>
export default {
  name: "CatalogItem",
  props: {
    product: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  methods: {
    addToCart() {
      this.$emit("addToCart", this.product);
    }
  }
};
</script>

<style lang="scss">
.catalog-item {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex-basis: 25%;
  box-shadow: 0 0 8px 0 #e0e0e0;
  padding: $padding * 2;
  margin-bottom: $margin * 2;
  &__price {
    margin-top: 0;
  }
  &__image {
    width: 100px;
  }
}
.btn {
  padding: $padding $padding * 2;
  background: #26ae68;
  border-radius: 5px;
  border: none;
}
</style>
