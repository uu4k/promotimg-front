<template>
  <div>
    <input type="file" v-on:change="handleChangeBaseimage">
    <br>
    <div style="display:inline-block;">
      <HorizontalText />
      <!-- TODO 小さい画像の場合に小さい画像の横幅に合 -->
      <img v-bind:src="baseimage">
      <HorizontalText />
    </div>
  </div>
</template>

<script>
import store from "@/store";
import HorizontalText from "@/components/HorizontalText";

export default {
  name: "Promotimg",
  components: {
    HorizontalText
  },
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
  }
};
</script>
