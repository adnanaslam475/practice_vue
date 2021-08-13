<template>
  <v-container>
    <v-app-bar app color="primary" class="navbar" dark>
      <v-spacer
        style="cursor: pointer; max-width: 50px"
        @click="() => this.$router.push('/').catch(() => {})"
        >Products</v-spacer
      >
      <v-row class="row auth_btns" v-if="user.token">
        <v-btn
          color="primary"
          class="btn"
          @click="() => this.$router.push('/add-product').catch(() => {})"
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
      this.$store.dispatch("logout");
    },
  },
  beforeMount() {
    function getCookie(cname) {
      var name = cname + "=";
      var decodedCookie = decodeURIComponent(document.cookie);
      var ca = decodedCookie.split(";");
      for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == " ") {
          c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
          return c.substring(name.length, c.length);
        }
      }
      return "";
    }
    const u = JSON.parse(getCookie("user"));
    this.user = u;
    this.$store.dispatch("SetCurrentUser", u);
  },
  mounted() {
  },
  beforeUpdate() {
    console.log("h_b_update");
  },

  watch: {
    "$store.state.user": function () {
      this.user = this.$store.state.user;
    },
  },
};
</script>
