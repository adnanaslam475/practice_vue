  <template>
  <v-card class="mx-auto auth_card">
    <v-toolbar color="deep-purple accent-4" cards dark flat>
      <v-card-title class="text-h6 font-weight-regular"> Sign up </v-card-title>
    </v-toolbar>
    <v-form ref="myform" class="pa-4 pt-6">
      <v-text-field
        :value="name"
        @input="onChangeHandler($event, 'name')"
        :rules="[rules.password, rules.length(6)]"
        filled
        color="deep-purple"
        counter="6"
        label="Name"
        style="min-height: 96px"
        type="text"
      ></v-text-field>
      <v-text-field
        :value="email"
        @input="onChangeHandler($event, 'email')"
        :rules="[rules.email]"
        filled
        color="deep-purple"
        label="Email address"
        type="email"
      ></v-text-field>
      <v-text-field
        :value="password"
        @input="onChangeHandler($event, 'password')"
        filled
        color="deep-purple"
        counter="6"
        label="Password"
        style="min-height: 96px"
        type="password"
      ></v-text-field>
      <v-text-field
        :value="phone"
        filled
        @input="onChangeHandler($event, 'phone')"
        type="number"
        color="deep-purple"
        label="Phone number"
      ></v-text-field>
    </v-form>
    <v-card-actions class="action">
      <v-btn text @click="$refs.myform.reset()"> Clear </v-btn>
      <transition name="fade">
        <p style="color: red; margin: 10px">{{ msg }}</p>
      </transition>
      <v-btn
        type="submit"
        :loading="isLoading"
        @click="handleSubmit"
        class="white--text auth_btns1 deep-purple"
        color="deep-purple accent-4"
        depressed
      >
        Submit
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { mapState, mapGetters } from "vuex";
// :rules="[rules.password, rules.length(6)]"
export default {
  name: "SignUp",
  data: () => ({
    name: "",
    email: "",
    isLoading: false,
    password: "",
    phone: "",
    msg:'',
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
  beforeMount() {
    this.$store.commit("error", "");
  },
  methods: {
    onChangeHandler(value, n) {
      this.msg = "";
      this.$data[n] = value;
    },
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
  updated() {
    // console.log("refs-->", this.$refs);
  },
  mounted() {},
  computed: {
    ...mapState(["user"]),
  },
  watch: {
    "$store.state.user": function () {
      console.log("watch in signup", this.$store.state.user.token);
      this.isLoading = this.$store.state.user.token && false;
      this.$router.push("/");
    },
    "$store.state.msg": function () {
      this.msg = this.$store.state.msg;
      this.isLoading = false;
    },
  },
};
</script>
