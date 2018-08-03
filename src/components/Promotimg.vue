<template>
  <div>
    <input type="file" v-on:change="handleChangeBaseimage">
    <div>
      <img v-bind:src="baseimage">
      </div>
  </div>
</template>

<script>
import store from "@/store";

export default {
  name: "Promotimg",
  computed: {
    baseimage: {
      get() {
        return this.$store.getters.baseimage;
      },
      set(value) {
        this.$store.dispatch("updateBaseimage", value);
      }
    },
    text: {
      get() {
        return this.$store.getters.text;
      },
      set(value) {
        this.$store.dispatch("updateText", value);
      }
    },
    textposition: {
      get() {
        return this.$store.getters.textposition;
      },
      set(value) {
        this.$store.dispatch("updateTextposition", value);
      }
    },
    textcolor: {
      get() {
        return this.$store.getters.textcolor;
      },
      set(value) {
        this.$store.dispatch("updateTextcolor", value);
      }
    },
    bgcolor: {
      get() {
        return this.$store.getters.bgcolor;
      },
      set(value) {
        this.$store.dispatch("updateTextcolor", value);
      }
    }
  },
  methods: {
    handleChangeBaseimage(event) {
      var file = event.target.files[0];
      if (file && file.type.match(/^image\/(png|jpeg)$/)) {
        this.baseimage = window.URL.createObjectURL(file);
      } else {
        this.baseimage = "";
      }
    }
  },
};
</script>
