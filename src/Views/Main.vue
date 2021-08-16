<template>
  <div class="container productscont">
    <Products />
  </div>
</template>


<script>
import Products from "./Products.vue";
import router from '../../router'
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
    router.beforeEach((to, from, next) => {
      console.log('tofrom-->',to,from,next())
      });
    // console.log("beforeCreate");
    this.$store.dispatch("ProductsAction");
  },
};
</script>
