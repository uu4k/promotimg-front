<template>
  <div v-bind:style="{ color: textcolor, backgroundColor: bgcolor, fontSize: textsize + 'px' }" style="white-space: pre-wrap;">
      <font face="mplus-1c-bold">{{ text }}</font>
  </div>
</template>

<script>
import store from "@/store";

export default {
  name: "HorizontalText",
  computed: {
    text: {
      get() {
        return this.$store.getters.text;
      },
      set(value) {
        this.$store.dispatch("updateText", value);
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
    },
    textsize: {
      get() {
        return this.$store.getters.textsize;
      },
      set(value) {
        this.$store.dispatch("updateTextsize", value);
      }
    },
  },
};
</script>
