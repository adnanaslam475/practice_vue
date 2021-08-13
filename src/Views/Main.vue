<template>
  <div class="container productscont">
    <Products />
  </div>
</template>


<script>
import Products from "./Products.vue";

export default {
  name: "Main",
  components: {
    Products,
  },

  data: () => ({
    user: null,
  }),
  methods: {},
   
  mounted() {
    // console.log("beforeCreate");
    this.$store.dispatch("ProductsAction");
  },
};
</script>
