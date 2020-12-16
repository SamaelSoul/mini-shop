<template>
  <div class="select">
    <p class="title" @click="areOptionsVisible = !areOptionsVisible">
      {{ selected }}
    </p>
    <div class="options" v-if="areOptionsVisible">
      <p
        v-for="option in options"
        :key="option.value"
        @click="selectOption(option)"
      >
        {{ option.name }}
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: "Select",
  props: {
    options: {
      type: Array,
      default: () => ({})
    },
    selected: {
      type: String,
      default: ""
    }
  },
  data: () => ({
    areOptionsVisible: false
  }),
  methods: {
    selectOption(option) {
      this.$emit("select", option);
      this.areOptionsVisible = false;
    },
    hideSelect() {
      this.areOptionsVisible = false;
    }
  },
  mounted() {
    document.addEventListener("click", this.hideSelect.bind(this), true);
  },
  beforeDestroy() {
    document.removeEventListener("click", this.hideSelect);
  }
};
</script>
<style lang="scss" scoped>
.select {
  position: relative;
  width: 100%;
  cursor: pointer;
}
.select p {
  margin: 0;
}
.title {
  text-align: center;
  border: 1px solid #aeaeae;
  border-radius: 5px;
  padding: $padding;
  background: #f1efef;
}
.options {
  border: 1px solid #aeaeae;
  position: absolute;
  top: 40px;
  right: 0;
  left: 0;
  width: 100%;
  border-radius: 5px;
  z-index: 3;
}
.options p {
  background: #fff;
  padding: $padding;
  text-align: center;
  border-radius: 5px;
}
.options p:hover {
  background: #dad8d8;
  color: #26ae68;
}
</style>
