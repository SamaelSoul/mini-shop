import Vue from "vue";
import Router from "vue-router";

import Catalog from "../components/Catalog";
import Cart from "../components/Cart";

Vue.use(Router);

const router = new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      name: "Home",
      component: Catalog
    },
    {
      path: "/cart",
      name: "Cart",
      component: Cart,
      props: true
    }
  ]
});

export default router;
