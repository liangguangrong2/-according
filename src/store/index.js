import Vue from 'vue'
import Vuex from 'vuex'
// vuex数据持久化解决方案
// 1.手动添加与监听localStorage数据变化
// 2.再vuex中引入persistedstate插件
// vuex-persistedstate 默认把数据存储localStorage
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    login: false,
    musicData: {
      coverImgUrl: "",
    }, //播放列表
  },
  mutations: {
    setLogin(state) {
      state.login = true;
    },
    musicDatafun(state, obj) {
      state.musicData = obj;
    }
  },
  actions: {},
  modules: {},
  plugins: [createPersistedState({
    storage: window.sessionStorage
  })]
})