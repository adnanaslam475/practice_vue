<template>
  <v-app app>
    <Header />
    <router-view />
    <Footer />
  </v-app>
</template>


<script>
import Header from "../components/Header";
import Products from "./Products.vue";
import Footer from "../components/Footer";

export default {
  name: "App",
  components: {
    Products,
    Header,
    Footer,
  },
  data: () => ({
    name: "adnan",
  }),
  mounted() {
    // console.log("Component mounted.");
  },
};
</script>
