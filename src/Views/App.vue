<template>
  <div class="container">
    <Header />
    <router-view></router-view>
    <HelloWorld />
    <Footer />
  </div>
</template>


<script>
import Header from "../components/Header";
import HelloWorld from "../components/HelloWorld";
import Footer from "../components/Footer";

export default {
  name: "App",
  components: {
    HelloWorld,
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
