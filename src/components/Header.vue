<template>
  <v-container>
    <v-app-bar app color="default" dark>
      <v-spacer>Vuetify</v-spacer>
      <v-row class="row auth_btns">
        <v-btn
          color="primary"
          class="btn"
          @click="() => handleRoute('signup')"
          elevation="24"
          >Sign up</v-btn
        >
        <v-btn
          color="secondary"
          @click="() => handleRoute('login')"
          elevation="24"
          >Login</v-btn
        >
      </v-row>
    </v-app-bar>
  </v-container>
</template>

<script>
export default {
  name: "Header",
  data: () => ({}),
  methods: {
    handleRoute(r) {
      this.$router.push(`/${r}`);
    },
  },
  mounted() {
    console.log("router", this.router);
  },
};
</script>
