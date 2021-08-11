<template>
  <div class="container">
    <Header />
    <Products />
    <Footer />
  </div>
</template>


<script>
import Header from "../components/Header";
import Products from "./Products.vue";
import Footer from "../components/Footer";

export default {
  name: "Main",
  components: {
    Products,
    Header,
    Footer,
  },
   
  
  data: () => ({
    name: "adnan",
  }),
  beforeMount() {
    this.$store.dispatch("ProductsAction");
  },
};
</script>
