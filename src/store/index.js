import Vue from 'vue';
import Vuex from 'vuex';
import post from './post';

Vue.use(Vuex);
import axios from '../axios';

export default new Vuex.Store({
  state: {
    authme: {},
  },
  mutations: {
    setAuthme(state, data) {
      state.authme = data;
    },
  },
  actions: {
    getAuthme(contex) {
      axios
        .get('/authme')
        .then((res) => {
          if (res.status == 200) {
            console.log(res.data);
            contex.commit('setAuthme', res.data);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
  modules: {
    post,
  },
});
