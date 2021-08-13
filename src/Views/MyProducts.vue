<template>
  <v-container class="cont">
    <v-card
      v-for="(item, i) in this.$store.state.products"
      :key="i"
      :loading="isloading"
      class="mx-auto my-12"
      max-width="100%"
    >
      <template slot="progress">
        <v-progress-linear color="deep-purple" height="10" indeterminate>
        </v-progress-linear>
      </template>
      <v-carousel  >
        <v-carousel-item
          v-for="(img, i) in item.images"
          :key="i"
          :src="img"
          height="100"
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
        <v-chip-group active-class="deep-purple accent-4 white--text" column>
          <v-chip>{{ item.category }}</v-chip>
        </v-chip-group>
      </v-card-text>
      <v-card-actions>
        <v-btn
          color="deep-purple lighten-2"
          text="editsss"
          @click="() => edit(item.id)"
        >
        </v-btn>
        <v-btn
          color="deep-purple lighten-2"
          text="delete"
          @click="() => HandleDelete(item.id)"
        >
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script>
export default {
  name: "MyProducts",
  data: () => ({
    isloading: false,
    isAuthenticated: false,
    user: {},
  }),
  beforeMount() {
    this.myproducts = this.$store.state.products.filter(
      (v) => v.id === this.user.id
    );
  },
  methods: {
    handleRoute(r) {
      this.$router.push(`/${r}`).catch(() => {});
    },
    edit(id) {
      this.$router.push(`/add-product`, { id });
    },
    HandleDelete(id) {
      this.$store.dispatch("deleteProduct", id);
    },
  },
  mounted() {
    console.log(this.$store.state.products);
  },
};
</script>
