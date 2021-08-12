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
      <v-carousel style="">
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
          color="primary"
          class="btn"
          @click="() => edit(item.id)"
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
      </v-card-actions>

      <Dialog :show="showmodal" v-if="showmodal" :id="id" />
      <div v-else></div>
    </v-card>
  </v-container>
</template>

<script>
import Dialog from "../components/Dailog.vue";
export default {
  name: "Products",
  data: function () {
    return {
      isloading: false,
      isAuthenticated: false,
      user: {},
      showmodal: false,
      id: "",
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
      this.$router.push(`/${r}`).catch(() => {});
    },
    edit(id) {
      this.$router.push(`/add-product`, { id }).catch(() => {});
    },
    HandleDelete() {},
  },
  mounted() {},
  beforeUpdate() {},
};
</script>
