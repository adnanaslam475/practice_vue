<template>
  <v-card class="signup-form">
    <v-toolbar color="deep-purple accent-4" cards dark flat>
      <v-card-title
        class="text-h6 font-weight-regular"
        style="text-align: 'center'"
      >
        Login
      </v-card-title>
      <v-spacer></v-spacer>
    </v-toolbar>
    <v-form ref="form" class="pa-4 pt-6">
      <v-text-field
        v-model="email"
        :rules="[rules.email]"
        filled
        color="deep-purple"
        label="Email address"
        type="email"
      ></v-text-field>
      <v-text-field
        v-model="password"
        :rules="[rules.password, rules.length(6)]"
        filled
        color="deep-purple"
        counter="6"
        label="Password"
        style="min-height: 96px"
        type="password"
      ></v-text-field>
      <v-btn
        type="submit"
        @click="login"
        class="white--text"
        color="deep-purple accent-4"
        depressed
      >
        Submit
      </v-btn>
      <p>{{ this.$store.state.error}}</p>
    </v-form>
    <v-divider></v-divider>
  </v-card>
</template>

<script>
export default {
  name: "Login",
  data: () => ({
    email: "",
    password: "",
    isloading: false,
    rules: {
      email: (v) => !!(v || "").match(/@/) || "Please enter a valid email",
      length: (len) => (v) =>
        (v || "").length >= len || `Invalid character length, required ${len}`,
      password: (v) =>
        !!(v || "").match(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*(_|[^\w])).+$/
        ) ||
        "Password must contain an upper case letter, a numeric character, and a special character",
      required: (v) => !!v || "This field is required",
    },
  }),
  mounted() {
    // console.log("login mount",);
  },
  methods: {
    login(e) {
      e.preventDefault();
      this.isloading = true;
      console.log("inlogin->", this.$store.state);
      this.$store.dispatch("login", {
        email: this.email,
        password: this.password,
      });
    },
  },
  updated: function () {
     
  },
   computed: {
     
  }
};
</script>
