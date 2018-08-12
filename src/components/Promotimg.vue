<template>
  <div>
    <!-- <input type="file" v-on:change="handleChangeBaseimage"> -->
    <br>
    <div style="display:inline-block;">
      <HorizontalText v-on:click.native="textDialogVisible=true" />
      <!-- TODO 小さい画像の場合に小さい画像の横幅に合わせる -->
      <img v-bind:src="baseimage" id="baseimage" v-on:click="imageDialogVisible=true">
      <HorizontalText v-on:click.native="textDialogVisible=true" />
    </div>

    <v-ons-dialog
      cancelable
      :visible.sync="imageDialogVisible"
    >
      <v-ons-page>
        <v-ons-toolbar>
          <div class="center">イメージを選択してください.</div>
        </v-ons-toolbar>
        <label for="file_baseimage">
          <!-- TODO デザイン調整 -->
          ＋写真を選択
          <input type="file" v-on:change="handleChangeBaseimage" id="file_baseimage" style="display:none;" />
        </label>
      </v-ons-page>
    </v-ons-dialog>
    <v-ons-dialog
      cancelable
      :visible.sync="textDialogVisible"
    >
      <v-ons-toolbar inline>
        <div class="center">テキストを指定してください.</div>
      </v-ons-toolbar>
      <div style="padding: 0 22px 22px 22px">
        <p style="opacity: 0.6; font-size: 80%;">テキスト</p>
        <div>
          <textarea v-model="text" class="textarea" rows="3" placeholder="Textarea"></textarea>
        </div>

        <p style="opacity: 0.6; font-size: 80%;">文字色</p>
        <div>
          <slider-picker v-model="textcolor" />
        </div>

        <p style="opacity: 0.6; font-size: 80%;">背景色</p>
        <div>
          <slider-picker v-model="bgcolor" />
        </div>
      </div>
    </v-ons-dialog>
  </div>
</template>

<script>
import store from "@/store";
import HorizontalText from "@/components/HorizontalText";
import { Slider } from 'vue-color'

export default {
  name: "Promotimg",
  components: {
    HorizontalText,
    'slider-picker': Slider
  },
  data() {
    return {
      imageDialogVisible: false,
      textDialogVisible: false,
    };
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
        this.$store.dispatch("updateTextcolor", value.hex);
      }
    },
    bgcolor: {
      get() {
        return this.$store.getters.bgcolor;
      },
      set(value) {
        this.$store.dispatch("updateBgcolor", value.hex);
      }
    }
  },
  methods: {
    handleChangeBaseimage(event) {
      var file = event.target.files[0];
      if (file && file.type.match(/^image\/(png|jpeg)$/)) {
        this.baseimage = window.URL.createObjectURL(file);
      } else {
        // TODO アラート表示
        // this.baseimage = "";
      }
      // TODO ダイアログ閉じる
      this.imageDialogVisible = false
    }
  }
};
</script>

<style>
@font-face {
  font-family: mplus-1c-bold;
  src: url("~@/assets/mplus-1c-bold.ttf");
}

img#baseimage {
  margin: 0;
  padding: 0;
  vertical-align: bottom;
}
</style>
