<template>
  <div id="app">
    <MainWraper />
  </div>
</template>

<script>
import MainWraper from "./components/MainWraper";

export default {
  name: "App",
  components: {
    MainWraper
  }
};
</script>

<style lang="scss">
#app {
  box-sizing: border-box;
  font-family: Fira Code, Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-weight: 600;
}
</style>
