<template>
  <v-container style="padding: 0px">
    <v-card class="mx-auto overflow-hidden" style="min-width: 100% !important">
      <v-app-bar color="deep-purple" dark>
        <v-app-bar-nav-icon
          class="toggle"
          @click="drawer = true"
        ></v-app-bar-nav-icon>
        <v-toolbar-title>Products</v-toolbar-title>
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
      <v-navigation-drawer v-model="drawer" absolute temporary>
        <v-list nav dense>
          <v-list-item-group
            v-model="group"
            active-class="deep-purple--text text--accent-4"
          >
            <v-list-item>
              <v-list-item-icon>
                <v-icon>mdi-home</v-icon>
              </v-list-item-icon>
              <v-list-item-title>Login</v-list-item-title>
            </v-list-item>

            <v-list-item>
              <v-list-item-icon>
                <v-icon>mdi-account</v-icon>
              </v-list-item-icon>
              <v-list-item-title>Sign up</v-list-item-title>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-navigation-drawer>
    </v-card>
  </v-container>
</template>

<script>
// import { pushRouteTo } from "../methods/routemethod";

export default {
  name: "Header",
  data: () => ({
    isAuthenticated: false,
    group: "",
    user: {},
    drawer: false,
  }),
  methods: {
    handleRoute(r) {
      if (this.$route.path !== r) {
        this.$router.push(r).catch((e) => {
          console.log(e);
        });
      }
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
      // console.log("ca==>", JSON.parse(decodedCookie.email));
      for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        // console.log('c===>',c)
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
  watch: {
    "$store.state.user": function () {
      this.user = this.$store.state.user;
    },
  },
};
</script>
