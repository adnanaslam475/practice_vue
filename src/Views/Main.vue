<template>
  <div class="container productscont">
    <Products />
  </div>
</template>


<script>
import Products from "./Products.vue";
import router from "../../router";
export default {
  name: "Main",
  components: {
    Products,
  },

  data: function () {
    return {
      user: null,
      params: "",
    };
  },
  // methods: {},
  beforeMount() {
    this.params = window.location.search.split("=")[1];
  },
  mounted() {
    router.beforeEach((to, from, next) => {
      console.log("tofrom-->", to, from, next());
    });
    if (this.params) {
      this.$store.dispatch("specificProduct", this.params);
    } else {
      this.$store.dispatch("ProductsAction");
    }
  },
  updated() {
    console.log("update main");
  },
};
</script>
