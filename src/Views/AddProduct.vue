<template>
  <v-app>
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
      type="text"
    ></v-text-field>

    <v-row justify="start">
      <v-select
        :items="['Mobile', 'Laptop', 'Stationary']"
        @change="selectCat"
        label="Select Category"
      >
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

    <!-- images -->
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
        <div style="diplay: flex; flex-direction: row !important">
          <div
            v-for="(item, index) in images"
            class="preview_images"
            :key="index"
          >
            <img style="width: 50px; height: 50px" :src="item" />
          </div>
        </div>
      </div>
    </v-flex>
    <div>
      <p>{{ msg }}</p>
      <v-btn color="primary" class="btn" @click="submit" elevation="24"
        >Submit</v-btn
      >
    </div>
  </v-app>
</template>


<script>
// import { db } from "../main";
import firebase from "firebase";
export default {
  name: "AddProduct",
  data: () => ({
    loading: false,
    name: "",
    description: "",
    category: "",
    uploadValue: 0,
    price: "",
    imageData: "",
    images: [],
    msg: "",
    img1: "",
    available: false,
  }),
  mounted() {
    // console.log("add prod moutne");
  },

  methods: {
    deleteFromFirebase(url) {
      let pictureRef = firebase.storage().refFromURL(url);
      pictureRef
        .delete()
        .then(() => {
          //3.
          this.images = [...this.images.filter((v) => v !== url)];
          alert("Picture is deleted successfully!");
        })
        .catch((err) => {
          console.log(err);
        });
    },
    selectCat(e) {
      this.category = e;
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
        images: this.images,
        name: this.name,
        description: this.description,
        price: this.price,
        available: this.available,
        category: this.category,
      };
      this.$store.dispatch("addProduct", values);
    },
  },
  updated: function () {
    console.log("pro_added---<>", this.$store.state.msg);
    if (this.$store.state.msg?.trim().length) {
      this.$router.push("/");
    }
  },
  beforeUpdate() {},
  computed: {},
};
</script>