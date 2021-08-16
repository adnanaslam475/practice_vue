<template>
  <v-container class="lighten-5 width">
    <div style="width: 100%">
      <v-btn
        color="primary"
        class="btn"
        v-for="(item, index) in searches"
        @click="() => searchData(item)"
        :key="index"
        elevation="24"
        >{{item}}</v-btn
      >
    </div>
    <v-row no-gutters class="row card" v-if="this.$store.state.products.length">
      <v-col
        outlined
        v-for="(item, i) in this.$store.state.products"
        :key="i"
        cols="12"
        sm="6"
        md="4"
        lg="4"
      >
        <v-card class="pa-3 ma-2" outlined tile>
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
              @click="() => Details(item.id)"
              elevation="24"
              >Details</v-btn
            >
            <v-btn
              color="primary"
              class="btn"
              @click="() => show(item.id)"
              elevation="24"
              >Delete</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>

    <v-sheet
      v-else
      v-for="(item, i) in skeletons"
      :color="`grey lighten-4`"
      class="pa-3 ma-2"
      :key="i"
    >
      <v-skeleton-loader
        v-bind="attrs"
        type="card-avatar, article, actions"
        style="min-height: 70vh !important"
      ></v-skeleton-loader>
    </v-sheet>
    <Dialog
      :show="showmodal"
      v-on:childToParent="onChildClick"
      v-if="showmodal"
      :id="id"
    />
    <div v-else></div>
  </v-container>
</template>
<script>
//  :color="`grey ${theme.isDark ? 'darken-2' : 'lighten-4'}`"
import Dialog from "../components/Dailog.vue";
export default {
  name: "Products",
  data: function () {
    return {
      attrs: {
        class: "mb-6",
        boilerplate: true,
        elevation: 2,
      },
      searches: ["Mobile", "Laptop", "Stationary"],
      isloading: true,
      isAuthenticated: false,
      user: {},
      showmodal: false,
      search: "",
      id: "",
      items: [],
      skeletons: ["", "", ""],
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
    onChildClick(value) {
      this.showmodal = false;
    },
    Details: function (id) {
      this.$router.push(`/product-details/${id}`);
    },
    handleRoute(r) {
      this.$router.push(`/${r}`);
    },
    edit(id, product) {
      this.$router.push(`edit/${id}`);
      this.$store.commit("editproduct", product);
    },
    searchData(cat){
      this.$store.dispatch('specificProduct',cat)
    }
  },
  mounted() {
    this.show_btns = this.$store.state.user.token && true;
  },
  updated() {
    console.log(this.search);
    this.search.trim().length && this.$store.state.products.filter();
  },
  watch: {
    "$store.state.products": function () {
      this.isloading = this.$store.state.products.length > 0 && false;
    },
  },
  computed: {
    comp() {
      console.log("in coomputed==>", this.$store.state.user);
      return this.$store.state.products.filter(
        (v) => v.userID === this.$store.state.user.userId
      );
    },
    numberOfPages() {
      return Math.ceil(this.items.length / this.itemsPerPage);
    },
    filteredKeys() {
      return this.keys.filter((key) => key !== "Name");
    },
  },
};
</script>
