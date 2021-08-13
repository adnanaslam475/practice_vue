<template>
  <v-card :loading="loading" class="mx-auto my-12" max-width="374">
    <template slot="progress">
      <v-progress-linear
        color="deep-purple"
        height="10"
        indeterminate
      ></v-progress-linear>
    </template>

    <v-img
      height="250"
      src="https://cdn.vuetifyjs.com/images/cards/cooking.png"
    ></v-img>

    <v-card-title>Cafe Badilico</v-card-title>

    <v-card-text>
      <v-row align="center" class="mx-0">
        <v-rating
          :value="4.5"
          color="amber"
          dense
          half-increments
          readonly
          size="14"
        ></v-rating>

        <div class="grey--text ms-4">4.5 (413)</div>
      </v-row>

      <div class="my-4 text-subtitle-1">$ • Italian, Cafe</div>
      <div>
        {{item.description}}
      </div>
    </v-card-text>

    <v-divider class="mx-4"></v-divider>

    <v-card-title>Tonight's availability</v-card-title>

    <v-card-text>
      <v-chip-group
        v-model="selection"
        active-class="deep-purple accent-4 white--text"
        column
      >
        <v-chip>Mobile</v-chip>
        <v-chip>Laptop</v-chip>
        <v-chip>Stationary</v-chip>
      </v-chip-group>
    </v-card-text>
    <v-card-actions>
      <v-btn color="deep-purple lighten-2" text @click="edit"> </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: "ProductCard",
   
  data: () => ({
    name: "adnan",
  }),
  mounted() {
    // console.log("Component mounted.");
  },

  methods: {
    details(e) {
      this.$router.push({ name: `/product/${e}` }).catch(()=>{});
    },
    edit(id) {
      cosnole.log("item---.", id);
    },
    deleteItem(e) {
      cosnole.log("itemtodelet-->---.", e);
      this.$store.dispatch("deleteProduct", e);
    },
  },
};
</script>