<template>
  <v-container style="padding: 0 5% 0 5%">
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
      <v-select
        :items="['Mobile', 'Laptop', 'Stationary']"
        @change="selectCat"
        label="Select Category"
      >
        <template v-slot:item="{ item, attrs, on }"  >
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
          <v-img
            style="opacity: 0.5; cursor: -webkit-grab"
            draggable="true"
            @drag="drag(index)"
            @dragenter="() => index !== drgitem && dragover(index)"
            :src="item"
          />
        </div>
      </div>
    </v-flex>
    <div>
      <p style="color: red">{{ msg }}</p>
      <v-btn color="primary" class="btn" @click="submit" elevation="24"
        >Submit</v-btn
      >
    </div>
  </v-container>
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
    send: false,
    images: [
      "https://love2dev.com/img/remove-puzzle-pieces-1920x1280.jpg",
      "https://c8.alamy.com/comp/P401C3/puzzle-head-brain-concept-with-a-jigsaw-piece-cut-out-on-blue-gray-background-P401C3.jpg",
      "https://thumbs.dreamstime.com/z/human-head-made-puzzle-16632078.jpg",
    ],
    msg: "",
    img1: "",
    available: false,
    drgitem: "",
  }),
  mounted() {},

  methods: {
    selectCat(e) {
      this.category = e;
    },
    removeImg(url) {
      this.images = this.images.filter((v) => v != url);
      let pictureRef = firebase.storage().refFromURL(url);
      pictureRef
        .delete()
        .then((res) => {
          console.log("deleted  success", res);
        })
        .catch((err) => {
          console.log("err in dl8 image");
        });
    },
    click1() {
      this.$refs.input1.click();
    },
    drag(i) {
      this.drgitem = i;
    },
    dragover(toIndex) {
      var element = this.images[this.drgitem];
      this.images.splice(this.drgitem, 1);
      this.images.splice(toIndex, 0, element);
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
                console.log("err167");
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
      };
        for (var key in values) {
            if (values[key] == "" || !values[key].length) {
              this.send = false;
              this.msg = `please enter ${key}`;
              break;
            } else {
              this.msg = ``;
              this.send = true;
            }
          }
        this.send == true && this.$store.dispatch("addProduct", values);
    },
  },
  updated: function () {
    if (this.$store.state.msg?.trim().length) {
      this.$router.push("/");
    }
  },
  beforeUpdate() {},
  computed: {},
  watch:{

  }
};
</script>