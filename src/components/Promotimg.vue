<template>
  <div>
    <!-- <div style="display:inline-block;">
      <HorizontalText v-on:click.native="textDialogVisible=true" />
      <VerticalText v-on:click.native="textDialogVisible=true" />
      <img v-bind:src="baseimage" id="baseimage" v-on:click="imageDialogVisible=true">
      <VerticalText v-on:click.native="textDialogVisible=true" />
      <HorizontalText v-on:click.native="textDialogVisible=true" />
    </div> -->

    <div style="display: inline-block; letter-spacing: -.4em;">
      <HorizontalText v-on:click.native="textDialogVisible=true" v-bind:style="{ width: imageWidth + 'px' }" style="letter-spacing:normal; margin: auto;"/>
      <!-- TODO 小さい画像の場合に小さい画像の横幅に合わせる -->
      <VerticalText v-on:click.native="textDialogVisible=true" v-bind:style="{ height: imageHeight + 'px' }" style="display: inline-block; vertical-align: middle; letter-spacing:normal;" />
      <img v-bind:src="baseimage" id="baseimage" v-on:click="imageDialogVisible=true" v-on:load="handleLoadBaseimage">
      <VerticalText v-on:click.native="textDialogVisible=true" v-bind:style="{ height: imageHeight + 'px' }" style="display: inline-block; vertical-align: middle; letter-spacing:normal;" />
      <HorizontalText v-on:click.native="textDialogVisible=true" v-bind:style="{ width: imageWidth + 'px' }" style="letter-spacing:normal; margin: auto;"/>
    </div>

    <v-ons-dialog
      cancelable
      :visible.sync="imageDialogVisible"
    >
      <v-ons-toolbar inline>
        <div class="center">イメージを選択してください.</div>
      </v-ons-toolbar>
      <div style="padding: 0 22px 22px 22px">
        <label for="file_baseimage">
          <!-- TODO デザイン調整 -->
          ＋写真を選択
          <input type="file" v-on:change="handleChangeBaseimage" id="file_baseimage" style="display:none;" />
        </label>
        <section style="padding: 8px; padding-top: 30px;">
          <ons-button modifier="large">閉じる</ons-button>
        </section>
      </div>
    </v-ons-dialog>
    <v-ons-dialog
      cancelable
      :visible.sync="textDialogVisible"
    >
      <v-ons-toolbar inline>
        <div class="center">テキストを指定してください.</div>
      </v-ons-toolbar>
      <div style="padding: 0 22px 22px 22px; text-align: center;">
        <div v-bind:style="{ color: textcolor, backgroundColor: bgcolor, fontSize: textsize + 'px' }" style="white-space: pre-wrap; display:inline-block;">
            <font face="mplus-1c-bold">{{ text }}</font>
        </div>
        <p style="opacity: 0.6; font-size: 80%;">テキスト</p>
        <div>
          <textarea v-model="text" class="textarea" rows="3" cols="44"></textarea>
        </div>
        <p style="opacity: 0.6; font-size: 80%;">テキストサイズ</p>
        <div>
          <input type="range" min="1" max="100" v-model="textsize" style="width: 100%">
        </div>
        <p style="opacity: 0.6; font-size: 80%;">文字色</p>
        <div>
          <slider-picker v-model="textcolor" />
        </div>
        <p style="opacity: 0.6; font-size: 80%;">背景色</p>
        <div>
          <slider-picker v-model="bgcolor" />
        </div>
        <section style="padding: 8px; padding-top: 30px;">
          <ons-button modifier="large">閉じる</ons-button>
        </section>
      </div>
    </v-ons-dialog>
  </div>
</template>

<script>
import store from "@/store"
import HorizontalText from "@/components/HorizontalText"
import VerticalText from "@/components/VerticalText"
import { Slider } from 'vue-color'

export default {
  name: "Promotimg",
  components: {
    HorizontalText,
    VerticalText,
    'slider-picker': Slider
  },
  data() {
    return {
      imageDialogVisible: false,
      textDialogVisible: false,
      imageHeight: 255,
      imageWidth: 255,
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
  methods: {
    handleChangeBaseimage(event) {
      var file = event.target.files[0];
      if (file && file.type.match(/^image\/(png|jpeg)$/)) {
        this.baseimage = window.URL.createObjectURL(file);
      } else {
        // TODO アラート表示
        // this.baseimage = "";
      }
      this.imageDialogVisible = false
    },
    handleLoadBaseimage(event) {
      this.imageWidth = event.currentTarget.width
      this.imageHeight = event.currentTarget.height
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
