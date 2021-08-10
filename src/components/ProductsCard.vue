<template>
  <v-card class="mx-auto" max-width="400">
    <v-card-title>
      <h2 class="text-h4">Title</h2>
      <v-spacer></v-spacer>
      <span class="text-h6">$4.99</span>
    </v-card-title>
    <v-img src="" />
    <v-card-text> Details </v-card-text>

    <v-divider class="mx-4"></v-divider>

    <v-card-text>
      <span class="subheading">Select type</span>

      <v-chip-group
        v-model="selection"
        active-class="deep-purple--text text--accent-4"
        mandatory
      >
        <v-chip>Extra Soft</v-chip>
        <v-chip>Soft</v-chip>
        <v-chip>Medium</v-chip>
        <v-chip>Hard</v-chip>
      </v-chip-group>
    </v-card-text>

    <v-card-actions>
      <v-btn block class="white--text" color="deep-purple accent-4">
        Delete
      </v-btn>
      <v-btn block class="white--text" color="deep-purple accent-4">
        Edit
      </v-btn>
    </v-card-actions>
  </v-card>
</template>