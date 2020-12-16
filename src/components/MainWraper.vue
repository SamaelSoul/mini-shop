<template>
  <div class="main-wraper">
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "MainWraper",
  computed: {
    ...mapGetters(["cart"]),
    isCart() {
      return this.cart.length;
    }
  }
};
</script>

<style>
.main-wraper {
  max-width: 900px;
  margin: 0 auto;
}
</style>
