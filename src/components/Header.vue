<template>
  <v-container >
    <v-app-bar app color="primary" class="navbar" dark>
      <v-spacer
        style="cursor: pointer; max-width: 50px"
        @click="() => this.$router.push('/')"
        >Products</v-spacer
      >
      <v-row
        class="row auth_btns"
        v-if="isAuthenticated === true || user.token"
      >
        <v-btn
          color="primary"
          class="btn"
          @click="() => this.$router.push('/add-product')"
          elevation="24"
          >Add product</v-btn
        >
        <v-btn color="secondary" @click="logOut" elevation="24">Logout</v-btn>
      </v-row>
      <v-row class="row auth_btns" v-else>
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
    {{infoString()}}
  </v-container>
</template>

<script>
export default {
  name: "Header",
  data: () => ({
    isAuthenticated: false,
    user: {},
  }),
  methods: {
    handleRoute(r) {
      this.$router.push(`/${r}`);
    },
    logOut() {
      this.isAuthenticated = false;
      this.user = {};
      document.cookie("user", JSON.stringify({}));
    },
  },
  mounted() {
    // const u = document.cookie;
    console.log("user in heder", JSON.parse(document.cookie("user")));
  },
  updated() {
    console.log("updated27");
  },
  created() {
    console.log("created26", this.$store.state.user);
    this.$cookie.set("user", this.$store.state.user, "expiring time");
  },
  beforeUpdate() {
    console.log("created270", this.$store.state.user);
    if (this.$store.state.user) {
      console.log(this.$store.state.user);
      this.isAuthenticated = true;
      this.user = this.$store.state.user;
    }
  },
  computed: {
    infoString: function () {
      console.log('computed here');
      this.$cookie.set("user", this.$store.state.user, "expiring time");
      return this.$store.state.user;
    },
  },
  
};
</script>
