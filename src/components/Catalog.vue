<template>
  <div class="catalog">
    <router-link :to="{ name: 'Cart', params: { cartData: cart } }">
      <div class="catalog__link-to-cart">Cart: {{ cart.length }}</div>
    </router-link>
    <h1>Catalog</h1>
    <div class="catalog__filters">
      <Select
        :selected="selected"
        :options="categories"
        @select="sortByCategories"
      />
      <div class="range-slider">
        <div class="range-slider__title">
          <p>Min: {{ minPrice }}</p>
          <p>Max: {{ maxPrice }}</p>
        </div>
        <input
          type="range"
          min="0"
          max="1000"
          step="10"
          v-model.number="minPrice"
          @change="setRangeSlider"
        />
        <input
          type="range"
          min="0"
          max="1000"
          step="10"
          v-model.number="maxPrice"
          @change="setRangeSlider"
        />
      </div>
    </div>
    <div class="catalog__list">
      <CatalogItem
        v-for="product in filteredProducts"
        :key="product.article"
        :product="product"
        @addToCart="addToCart"
      />
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import CatalogItem from "./CatalogItem";
import Select from "./Select";

export default {
  name: "Catalog",
  components: {
    CatalogItem,
    Select
  },
  mounted() {
    this.getProducts();
    this.sortByCategories();
  },
  data: () => ({
    categories: [
      {
        name: "Все",
        value: "ALL"
      },
      {
        name: "Мужские",
        value: "м"
      },
      {
        name: "Женские",
        value: "ж"
      }
    ],
    selected: "Все",
    sortedProducts: [],
    minPrice: 0,
    maxPrice: 1000
  }),
  computed: {
    ...mapGetters(["products", "cart"]),
    filteredProducts() {
      if (this.sortedProducts.length) {
        return this.sortedProducts;
      } else {
        return this.products;
      }
    }
  },
  methods: {
    ...mapActions(["getProducts", "addProductToCart"]),
    addToCart(product) {
      this.addProductToCart(product);
    },
    sortByCategories(category) {
      let vm = this;
      this.sortedProducts = [...this.products];
      this.sortedProducts = this.sortedProducts.filter(
        item => item.price >= vm.minPrice && item.price <= vm.maxPrice
      );
      if (category) {
        vm.selected = category.name;
        this.sortedProducts = this.sortedProducts.filter(
          item => item.category === category.name
        );
      }
    },
    setRangeSlider() {
      if (this.minPrice > this.maxPrice) {
        let temp = this.maxPrice;
        this.maxPrice = this.minPrice;
        this.minPrice = temp;
      }
      this.sortByCategories();
    }
  }
};
</script>

<style lang="scss">
.catalog {
  h1 {
    text-align: center;
  }
  &__list {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    align-items: center;
    margin-top: $margin * 4;
  }
  &__link-to-cart {
    position: absolute;
    top: 10px;
    right: 10px;
    padding: $padding * 2;
    border: solid 1px #000;
  }
  &__filters {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    height: 80px;
    .range-slider {
      width: 130px;
      margin: 0 16px;
      text-align: center;
      position: relative;
      &__title {
        margin: 13px 0;
        p {
          margin: 0;
          font-size: 14px;
        }
      }

      svg,
      input[type="range"] {
        position: absolute;
        left: 0;
        bottom: 0;
        &::-webkit-slider-thumb {
          z-index: 2;
          position: relative;
          top: 2px;
          margin-top: -7px;
        }
      }
    }
  }
}
</style>
