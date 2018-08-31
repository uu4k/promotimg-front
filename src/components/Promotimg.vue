<template>
  <div>
    <div style="display: inline-block; letter-spacing: -.4em; padding: 10px;">
      <HorizontalText v-if="textposition=='top'" v-on:click.native="textDialog=true" v-bind:style="{ width: imageWidth + 'px' }" style="letter-spacing:normal; margin: auto;" />
      <VerticalText v-if="textposition=='left'" v-on:click.native="textDialog=true" v-bind:style="{ height: imageHeight + 'px' }" style="display: inline-block; vertical-align: middle; letter-spacing:normal;" />
      <!-- TODO 縦横最大幅指定 -->
      <img v-bind:src="baseimage" id="baseimage" v-on:click="imageDialog=true" v-on:load="handleLoadBaseimage">
      <VerticalText v-if="textposition=='right'" v-on:click.native="textDialog=true" v-bind:style="{ height: imageHeight + 'px' }" style="display: inline-block; vertical-align: middle; letter-spacing:normal;" />
      <HorizontalText v-if="textposition=='bottom'" v-on:click.native="textDialog=true" v-bind:style="{ width: imageWidth + 'px' }" style="letter-spacing:normal; margin: auto;"/>
    </div>
    <div>
      <b-button size="lg" variant="primary" v-on:click="handleCreateButton">イメージ作成</b-button>
      <b-button size="lg" variant="outline-success" v-on:click="helpDialog=true">？</b-button>
    </div>

    <b-modal v-model="helpDialog" title="説明書" ok-only ok-title="閉じる" style="text-align: left;">
      <div>
      画像と文字列を合体させるだけのアプリケーションです。
      </div>

      <ol>
        <li>中央の画像をクリックして、合体したい画像を選択</li>
        <li>中央の画像下の文字列をクリックし、合体したい文字列を入力</li>
        <li>イメージ作成ボタンを押して少し待てば完了</li>
      </ol>
    </b-modal>

    <b-modal v-model="resultDialog" title="イメージ作成完了しました" ok-only ok-title="閉じる">
      <b-img :src="resultimage"></b-img>
      <br>
      <b-link :href="resultimage" download>イメージをダウンロード</b-link>
    </b-modal>

    <b-modal v-model="creatingDialog" title="イメージ作成中です" hide-footer hide-header-close no-close-on-backdrop no-close-on-esc>
      <div style="display: inline-block;">
        <rotate-square2 size="90px"></rotate-square2>
      </div>
    </b-modal>

    <b-modal v-model="imageDialog" title="イメージを選択してください" ok-only ok-title="閉じる">
      <!-- TODO デザイン調整 -->
      <label for="file_baseimage">
        ＋イメージを選択
        <input type="file" v-on:change="handleChangeBaseimage" id="file_baseimage" style="display:none;" />
      </label>
    </b-modal>

    <b-modal v-model="textDialog" title="テキストを指定してください" ok-only ok-title="閉じる">
      <div style="padding: 0 22px 22px 22px; text-align: center;">
        <div v-bind:style="{ color: textcolor, backgroundColor: bgcolor, fontSize: textsize + 'px' }" style="white-space: pre-wrap; display:inline-block;">
            <font face="mplus-1c-bold">{{ text }}</font>
        </div>
        <b-form-group
          label="テキスト"
          label-for="textInput"
        >
          <b-form-textarea id="textInput"
            v-model="text"
            placeholder="Enter text">
          </b-form-textarea>
        </b-form-group>
        <b-form-group
          label="テキストサイズ"
          label-for="textsizeInput"
        >
          <b-form-input type="range" v-model="textsize" id="textsizeInput"></b-form-input>
        </b-form-group>
        <b-form-group
          label="テキスト位置"
          label-for="textpositionInput"
          description="左右はβ版です"
        >
          <b-form-radio-group id="textpositionInput" v-model="textposition" name="textposition">
            <b-form-radio value="top">上</b-form-radio>
            <b-form-radio value="bottom">下</b-form-radio>
            <b-form-radio value="left">左</b-form-radio>
            <b-form-radio value="right">右</b-form-radio>
          </b-form-radio-group>
        </b-form-group>
        <b-form-group
          label="文字色"
          label-for="textcolorInput"
        >
          <Swatches v-model="textcolor" id="textcolorInput"  style="display: inline-block;"/>
        </b-form-group>
        <b-form-group
          label="背景色"
          label-for="bgcolorInput"
        >
          <Swatches v-model="bgcolor" id="bgcolorInput" style="display: inline-block;"/>
        </b-form-group>
      </div>
    </b-modal>

  </div>
</template>

<script>
import store from "@/store"
import HorizontalText from "@/components/HorizontalText"
import VerticalText from "@/components/VerticalText"
import { Swatches } from 'vue-color'
import { RotateSquare2 } from 'vue-loading-spinner'
import axios from 'axios';

export default {
  name: "Promotimg",
  components: {
    HorizontalText,
    VerticalText,
    Swatches,
    RotateSquare2,
  },
  data() {
    return {
      imageDialog: false,
      textDialog: false,
      resultDialog: false,
      creatingDialog: false,
      helpDialog: false,
      imageHeight: 255,
      imageWidth: 255,
      resultimage: "",
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
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = ()  => this.baseimage = reader.result
        reader.onerror = error => alert('イメージの取り込みに失敗しました')
      } else {
        // TODO アラート表示
        // this.baseimage = "";
      }
      this.imageDialog = false
    },
    handleLoadBaseimage(event) {
      this.imageWidth = event.currentTarget.width
      this.imageHeight = event.currentTarget.height
    },
    handleCreateButton(event) {
      this.creatingDialog = true

      return axios.post('https://us-central1-promotimg.cloudfunctions.net/image', 
        JSON.stringify({
          text: this.text,
          textposition: this.textposition,
          textcolor: this.textcolor,
          bgcolor: this.bgcolor,
          textsize: parseInt(this.textsize, 10),
          baseimagename: "dummy.png",
          baseimage: this.baseimage.split(",")[1]
        }),
        {
          'headers': {
            'Content-Type': 'application/json',
          }
        }
      )
      .then((res) => {
        this.creatingDialog = false
        this.resultimage = res.data['url']
        this.resultDialog = true
      })
      .catch((err) => {
        this.creatingDialog = false
        alert('すみません、イメージの作成に失敗しました')
      })
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
