  <template>
  <v-card class="mx-auto" style="max-width: 400px; align-self: center">
    <v-system-bar color="deep-purple darken-4" dark>
      <v-spacer></v-spacer>
      <v-icon small> mdi-square </v-icon>
      <v-icon class="ml-1" small> mdi-circle </v-icon>
      <v-icon class="ml-1" small> mdi-triangle </v-icon>
    </v-system-bar>
    <v-toolbar color="deep-purple accent-4" cards dark flat>
      <v-btn icon>
        <v-icon>mdi-arrow-left</v-icon>
      </v-btn>
      <v-card-title class="text-h6 font-weight-regular"> Sign up </v-card-title>
    </v-toolbar>
    <v-form ref="form" v-model="form" class="pa-4 pt-6">
      <v-text-field
        v-model="name"
        :rules="[rules.password, rules.length(6)]"
        filled
        color="deep-purple"
        counter="6"
        label="Name"
        style="min-height: 96px"
        type="text"
      ></v-text-field>
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
      <v-text-field
        v-model="phone"
        filled
        type="number"
        color="deep-purple"
        label="Phone number"
      ></v-text-field>
    </v-form>
    <v-divider></v-divider>
    <v-card-actions>
      <v-btn text @click="$refs.form.reset()"> Clear </v-btn>
      <h2 style="color: red" v-if="this.$store.state.error">
        {{ this.$store.state.error }}
      </h2>
      <v-spacer v-else></v-spacer>
      <v-btn
        type="submit"
        :loading="isLoading"
        @click="handleSubmit"
        class="white--text"
        color="deep-purple accent-4"
        depressed
      >
        Submit
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: "SignUp",
  data: () => ({
    name: "",
    email: "",
    form: false,
    isLoading: false,
    password: "",
    phone: "",
    gender: "",
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
  methods: {
    handleSubmit() {
      const values = {
        email: this.email,
        password: this.password,
        gender: this.gender,
        phone: this.phone,
      };
      this.isLoading = true;
      this.$store.dispatch("signup", values);
    },
  },
  mounted() {},
  computed: {
    msg() {
      return this.$store.state.error;
    },
  },
  watch: {
    "$store.state.user": function () {
      console.log("watch in signup", this.$store.state.user.token);
      this.isloading = this.$store.state.user.token && false;
      this.$router.push("/");
    },
  },
};
</script>
