<template>
  <div style="width: 100%; margin-top: 200px">
    <!-- <h3>{{ itemDetails.category }}sss</h3>
    <button @click="mutating()">mapmutations</button>
    <button @click="mapAction()">mapActions</button>
    <button @click="newGetterwatch">mapGetters</button> -->
    <v-card class="pa-3 ma-2" outlined tile>
      <v-carousel
        :class="[
          'carousel',
          itemDetails.images ? 'hide_prev_next' : '',
        ]"
      >
        <v-carousel-item
          v-for="(img, i) in itemDetails.images"
          :key="i"
          :src="img"
          reverse-transition="fade-transition"
          transition="fade-transition"
        ></v-carousel-item>
      </v-carousel>
      <v-card-title>{{ itemDetails.name }}</v-card-title>
      <v-card-text>
        <v-row align="center" class="mx-0"> </v-row>
        <div class="my-4 text-subtitle-1">$ • {{ itemDetails.price }}</div>
        <div>
          {{ itemDetails.description }}
        </div>
      </v-card-text>
      <v-card-text>
        <v-chip-group active-class="deep-purple accent-4 white--text" column>
          <v-chip>{{ itemDetails.category }}</v-chip>
        </v-chip-group>
      </v-card-text>
      <v-card-actions v-if="show_btns">
        <v-btn
          color="primary"
          class="btn"
          v-for="(name, i) in action_btns"
          :key="i"
          @click="
            () =>
              (name == 'edit' && edit(itemDetails.id, item)) ||
              (name == 'Details' && Details(itemDetails.id)) ||
              (name == 'Delete' && show(itemDetails.id))
          "
          elevation="24"
          >{{ name }}</v-btn
        >
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
import { mapGetters, mapState, mapMutations, mapActions } from "vuex";
export default {
  name: "ProductDetails",
  data: () => ({
    images: [],
    action_btns: ["Edit", "Details", "Delete"],
    show_btns: false,
  }),
  computed: {
    ...mapState(["itemDetails"]),
    ...mapGetters(["newGetter"]),
  },
  watch:{
    // console.log()
  },
  methods: {
    ...mapMutations(["mutating"]),
    ...mapActions(["mapAction"]),
    newGetterwatch() {
      // getter method should be  in methods
      console.log(this.newGetter);
      return this.newGetter;
    },
  },
};
</script>
