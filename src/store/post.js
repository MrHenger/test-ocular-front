import axios from '../axios';

export default {
  namespaced: true,
  state: () => ({
    posts: [],
  }),
  mutations: {
    setPost(state, data) {
      state.posts = data;
    },
  },
  actions: {
    getPosts(contex) {
      axios
        .get('/admin/post')
        .then((res) => {
          contex.commit('setPost', res.data.data);
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
