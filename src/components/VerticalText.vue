<template>
  <div v-bind:style="{ color: textcolor, backgroundColor: bgcolor }" style="-ms-writing-mode: tb-rl; writing-mode: vertical-rl;">
      <font face="mplus-1c-bold">{{ text }}</font>
  </div>
</template>

<script>
import store from "@/store";

export default {
  name: "VerticalText",
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
    }
  },
};
</script>
