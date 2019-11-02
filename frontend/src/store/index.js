import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    packages: []
  },
  getters: {
    packages: state => state.packages
  },
  mutations: {
    setPackages: (state, payload) => {
      state.packages = payload;
    }
  },
  actions: {
    setPackages: (context, payload) => {
      context.commit('setPackages', payload);
    }
  }
});
