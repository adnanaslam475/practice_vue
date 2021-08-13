<template>
  <v-container class="grey lighten-1">
    <v-row no-gutters>
      <v-col sm="6" xl="4" md="4" lg="5" style="border: 1px solid red">
        <v-card
          v-for="(item, i) in this.$store.state.products"
          :key="i"
          class="mx-auto card"
        >
          <v-carousel
            :class="[
              'carousel',
              item.images.length == 1 ? 'hide_prev_next' : '',
            ]"
          >
            <v-carousel-item
              v-for="(img, i) in item.images"
              :key="i"
              :src="img"
              reverse-transition="fade-transition"
              transition="fade-transition"
            ></v-carousel-item>
          </v-carousel>
          <v-card-title>{{ item.name }}</v-card-title>
          <v-card-text>
            <v-row align="center" class="mx-0"> </v-row>
            <div class="my-4 text-subtitle-1">$ • {{ item.price }}</div>
            <div>
              {{ item.description }}
            </div>
          </v-card-text>
          <v-card-text>
            <v-chip-group
              active-class="deep-purple accent-4 white--text"
              column
            >
              <v-chip>{{ item.category }}</v-chip>
            </v-chip-group>
          </v-card-text>
          <v-card-actions v-if="show_btns">
            <v-btn
              color="primary"
              class="btn"
              @click="() => edit(item.id, item)"
              elevation="24"
              >Edit</v-btn
            >
            <v-btn
              color="primary"
              class="btn"
              @click="() => show(item.id)"
              elevation="24"
              >Delete</v-btn
            >
            {{ comp.length }}
          </v-card-actions>
          <Dialog :show.sync="showmodal" v-if="showmodal" :id="id" />
          <div v-else></div>
        </v-card>
      </v-col>
    </v-row>
  </v-container>

  <!-- <div class="centerloading" v-else>
    <v-progress-circular
      :size="50"
      color="primary"
      indeterminate
    ></v-progress-circular>
  </div> -->
</template>

<script>
import Dialog from "../components/Dailog.vue";
export default {
  name: "Products",
  data: function () {
    return {
      isloading: true,
      isAuthenticated: false,
      user: {},
      showmodal: false,
      id: "",
      show_btns: false,
    };
  },
  props: {
    frommain: String,
  },
  components: {
    Dialog,
  },

  methods: {
    show(id) {
      this.showmodal = true;
      this.id = id;
    },
    handleRoute(r) {
      this.$router.push(`/${r}`);
    },
    edit(id, product) {
      this.$router.push(`edit/${id}`);
      this.$store.commit("editproduct", product);
    },
  },
  mounted() {
    this.show_btns = this.$store.state.user.token && true;
    // console.log(this.$store.state.user.token)
  },
  watch: {
    "$store.state.products": function () {
      this.isloading = this.$store.state.products.length > 0 && false;
    },
  },
  computed: {
    comp() {
      console.log('in coomputed==>',this.$store.state.user)
      return this.$store.state.products.filter(
        (v) => v.userID === this.$store.state.user.userId
      );
    },
  },
};
</script>
