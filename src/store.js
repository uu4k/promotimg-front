import 'babel-polyfill'
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  strict: true,
  state: {
    baseimage: require("@/assets/logo.png"),
    text: "sampleメッセージ",
    textposition: "bottom",
    textcolor: "#ffffff",
    bgcolor: "#c93a40",
    textsize: 22,
  },
  getters: {
    baseimage(state) {
      return state.baseimage
    },
    text(state) {
      return state.text
    },
    textposition(state) {
      return state.textposition
    },
    textcolor(state) {
      return state.textcolor
    },
    bgcolor(state) {
      return state.bgcolor
    },
    textsize(state) {
      return state.textsize
    },
  },
  mutations: {
    setBaseimage(state, payload) {
      state.baseimage = payload.value
    },
    setText(state, payload) {
      state.text = payload.value
    },
    setTextposition(state, payload) {
      state.textposition = payload.value
    },
    setTextcolor(state, payload) {
      state.textcolor = payload.value
    },
    setBgcolor(state, payload) {
      state.bgcolor = payload.value
    },
    setTextsize(state, payload) {
      state.textsize = payload.value
    },
  },
  actions: {
    updateBaseimage({
      commit
    }, value) {
      commit('setBaseimage', {
        value
      })
    },
    updateText({
      commit
    }, value) {
      commit('setText', {
        value
      })
    },
    updateTextposition({
      commit
    }, value) {
      commit('setTextposition', {
        value
      })
    },
    updateTextcolor({
      commit
    }, value) {
      commit('setTextcolor', {
        value
      })
    },
    updateBgcolor({
      commit
    }, value) {
      commit('setBgcolor', {
        value
      })
    },
    updateTextsize({
      commit
    }, value) {
      commit('setTextsize', {
        value
      })
    },
  }
})
export default store