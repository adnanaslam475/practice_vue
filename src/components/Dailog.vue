<template>
  <div class="text-center">
    <v-dialog v-model="dialog" @click:outside="emitToParent()" max-width="50%">
      <template v-slot:activator="{ on, attrs }">
        <v-btn style="display: none" dark v-bind="attrs" v-on="on">
          Delete
        </v-btn>
      </template>
      <v-card>
        <v-card-title class="text-h5 grey lighten-2"> Confirm </v-card-title>
        <v-card-text> Are you sure you want to delete product? </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" text @click="Delete"> Delete </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
export default {
  data: function () {
    return {
      dialog: this.show,
    };
  },
  props: {
    show: Boolean,
    id: String,
  },
  mounted() {},

  methods: {
    emitToParent() {
      
      this.$emit("childToParent", "adnan");
    },
    closeDialog() {
      this.$emit("showmodal", false);
    },
    Delete() {
      this.$store.dispatch("deleteProduct", this.id);
    },

    toggleDialog() {
      this.$emit("update:dialog", false);
      this.$emit("update:dialogSignUp", true);
    },
  },
};
</script>
