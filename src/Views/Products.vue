<template>
  <v-container class="lighten-5 width">
    <div class="searches">
      <v-btn
        color="primary"
        class="btn"
        v-for="(item, index) in searches"
        @click="() => searchData(item)"
        :key="index"
        elevation="24"
        >{{ item }}</v-btn
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
          <v-card-actions v-if="this.$store.state.user.token">
            <v-btn
              color="primary"
              class="btn"
              v-for="(name, i) in action_btns"
              :key="i"
              @click="
                () =>
                  (name == 'edit' && edit(item.id, item)) ||
                  (name == 'Details' && Details(item.id)) ||
                  (name == 'Delete' && show(item.id))
              "
              elevation="24"
              >{{ name }}</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
    <v-sheet
      v-else-if="this.$store.state.products.length > 0"
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
    <v-alert
      border="top"
      v-else
      color="red lighten-2"
      style="margin: 10% 0 0 0px; max-width: 50%"
      dark
    >
      {{
        this.$store.state.msg ||
        (this.$store.state.products.length === 0 && "No Products Found")
      }}
    </v-alert>
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
import Dialog from "../components/Dailog.vue";
import { MUTATE } from "../store/actionTypes";
import { mapState, mapGetters } from "vuex";

export default {
  name: "Products",
  data: function () {
    return {
      attrs: {
        class: "mb-6",
        boilerplate: true,
        elevation: 2,
      },
      searches: ["All", "Mobile", "Laptop", "Stationary"],
      action_btns: ["Edit", "Details", "Delete"],
      isloading: true,
      isAuthenticated: false,
      showmodal: false,
      search: "",
      id: "",
      items: [],
      skeletons: ["", "", ""],
      show_btns: false,
      length: null,
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
    Details() {
      this.$store.dispatch("");
    },
    onChildClick(value) {
      this.showmodal = false;
    },
    Details: function (id) {
      this.$store.dispatch("Details", id);
      this.$router.push(`/product-details/${id}`);
    },
    handleRoute(r) {
      this.$router.push(`/${r}`);
    },
    edit(id, product) {
      this.$router.push(`edit/${id}`);
      this.$store.commit("editproduct", product);
    },
    searchData(cat) {
      if (cat == "All") {
        this.$store.dispatch("ProductsAction");
        this.$router.replace({ query: null });
      } else {
        this.$store.dispatch("specificProduct", cat);
        this.$router.replace({
          query: { category: cat },
        });
      }
    },
  },
  mounted() {
    this.show_btns = this.$store.state.user?.token && true;
  },
  updated() {
    console.log(this.search);
    this.search.trim().length && this.$store.state.products.filter();
  },
  watch: {
    "$store.state.products": function () {
      console.log(this.$store.state.products);
      this.length =
        this.$store.state.products.length == 0 && "No product found";
      this.isloading = this.$store.state.products.length > 0 && false;
    },
  },
  computed: {
    ...mapState(["user", "products"]),
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
