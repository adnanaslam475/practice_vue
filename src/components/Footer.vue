<template>
  <v-container>
    <v-footer app>
      <v-row class="footer-main"> Footer </v-row>
    </v-footer>
  </v-container>
</template>

<script>
export default {
  name: "Footer",
  data: () => ({}),
  mounted() {
    // console.log("foterrmount");
  },
};
</script>
<style scoped>
.footer-main {
  margin: -1%;
  padding: 0%;
}
</style>
