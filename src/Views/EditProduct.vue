<template>
  <v-container>
    <v-text-field
      v-model="name"
      filled
      color="deep-purple"
      counter="6"
      label="Product Name"
      style="min-height: 96px"
      type="text"
    ></v-text-field>
    <v-text-field
      v-model="description"
      filled
      color="deep-purple"
      counter="6"
      label="Product Description"
      style="min-height: 96px"
      type="text"
    ></v-text-field>
    <v-text-field
      v-model="price"
      filled
      color="deep-purple"
      counter="6"
      label="Product price"
      style="min-height: 96px"
      type="number"
    ></v-text-field>
    <v-row justify="start">
      <v-select :items="items" @change="selectCat" label="Select Category">
        <template v-slot:item="{ item, attrs, on }">
          <v-list-item v-bind="attrs" v-on="on">
            <v-list-item-title
              :id="attrs['aria-labelledby']"
              v-text="item"
            ></v-list-item-title>
          </v-list-item>
        </template>
      </v-select>
    </v-row>
    <v-flex md6>
      <div>
        <div>
          <v-btn @click="click1">choose a photo</v-btn>
          <input
            type="file"
            ref="input1"
            multiple
            style="display: none"
            @change="previewImage"
            accept="image/*"
          />
        </div>
        <div
          v-for="(item, index) in images"
          class="preview_images"
          :key="index"
        >
          <v-icon class="icon" @click="() => removeImg(item)" large
            >mdi-close</v-icon
          >
          <v-img style="opacity: 0.5" :src="item" />
        </div>
      </div>
    </v-flex>
    <div>
      <p style="color: red">{{ msg }}</p>
      <v-btn color="primary" class="btn" @click="submit" elevation="24"
        >Submit</v-btn
      >
      {{product.name}}
    </div>
  </v-container>
</template>
<script>
import firebase from "firebase";
import { mapGetters, mapState } from 'vuex';

export default {
  name: "EditProduct",
  data: function () {
    return {
      loading: false,
      name: this.$store.state.product.name,
      description: this.$store.state.product.description,
      category: this.$store.state.product.category,
      uploadValue: 0,
      price: this.$store.state.product.price,
      imageData: "",
      send: false,
      items: ["Mobile", "Laptop", "Stationary"],
      images: this.$store.state.product.images,
      msg: "",
      img1: "",
      available: this.$store.state.product.available,
      data: this.$store.state.product,
    };
  },
  mounted() {
    console.log("from setore", this.$store.state.product.category);
    this.selectCat(this.$store.state.product.category);
  },
  methods: {
    selectCat(e) {
      console.log("eee", e);
      this.category = e;
    },
    removeImg(url) {
      this.images = this.images.filter((v) => v != url);
    },
    click1() {
      this.$refs.input1.click();
    },
    previewImage(e) {
      this.uploadValue = 0;
      this.img1 = null;
      this.imageData = Array.from(e.target.files);
      this.onUpload();
    },
    onUpload() {
      this.img1 = null;
      this.imageData.forEach((v) => {
        const storageRef = firebase
          .storage()
          .ref(`${v.name + Math.random().toFixed(30)}`)
          .put(v);
        storageRef.on(
          `state_changed`,
          (snapshot) => {
            console.log(
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            );
            this.uploadValue =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          },
          (error) => {
            this.msg = error.message;
          },
          () => {
            this.uploadValue = 100;
            storageRef.snapshot.ref
              .getDownloadURL()
              .then((url) => {
                const imgs = [...this.images, url];
                this.images = imgs;
                this.msg = "";
              })
              .catch((e) => {
                console.log(e);
                this.msg = "Something went wrong..";
              });
          }
        );
      });
    },
    submit(e) {
      e.preventDefault();
      const values = {
        name: this.name,
        description: this.description,
        price: this.price,
        category: this.category,
        images: this.images,
        pro_id: this.$route.params.id,
      };
        for (var key in values) {
          if (values.hasOwnProperty(key)) {
            if (values[key] == "" || !values[key].length) {
              this.send = false;
              this.msg = `please enter ${key}`;
              break;
            } else {
              this.msg = ``;
              this.send = true;
            }
          }
        this.send == true && this.$store.dispatch("updateProduct", values);
      }
    },
  },
  updated: function () {
    console.log("updated");
    if (this.$store.state.msg?.trim().length) {
      this.$router.push("/");
    }
  },

  beforeUpdate() {
    console.log("bef_updated");
  },
  computed: {
    ...mapState([
      'product',
    ])
  },
};
</script>