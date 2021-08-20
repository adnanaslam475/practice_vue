<template>
  <v-card class="mx-auto auth_card">
    <v-toolbar color="deep-purple accent-4" cards dark flat>
      <v-card-title class="text-h6 font-weight-regular"> Log in </v-card-title>
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
      <v-card-actions class="action">
        <v-btn text @click="$refs.myform.reset()"> Clear </v-btn>
        <transition name="fade">
          <p style="color: red; margin: 10px">{{ this.$store.state.msg }}</p>
        </transition>
        <v-btn
          type="submit"
          :loading="isloading"
          @click="handleSubmit"
          class="white--text auth_btns1 deep-purple"
          color="deep-purple accent-4"
          depressed
        >
          Submit
        </v-btn>
      </v-card-actions>
    </v-form>
  </v-card>
</template>

<script>
import { mapState } from "vuex";
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
  beforeMount() {
    this.$store.commit("error", "");
  },

  methods: {
    handleSubmit(e) {
      e.preventDefault();
      this.isloading = true;
      this.$store.dispatch("login", {
        email: this.email,
        password: this.password,
      });
    },
  },
  updated: function () {
    console.log(this.$store.state.user, this.$store.state.msg);
    // this.$store.commit("error", "");
  },
  computed: {
    ...mapState(["user"]),
  },
  watch: {
    "$store.state.user": function () {
      this.isloading = false;
    },
    "$store.state.msg": function () {
      this.isloading = false;
    },
  },
};
</script>
