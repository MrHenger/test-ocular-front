import axios from '../axios';
import Swal from 'sweetalert2';

export default {
  namespaced: true,
  state: () => ({
    posts: [],
    editPost: {},
    paginate: {},
    page: 1,
    loading: false,
    publicPosts: [],
  }),
  mutations: {
    setPosts(state, data) {
      state.posts = data.data;
      state.paginate = data.meta;
    },
    setEditPost(state, data) {
      state.editPost = data;
    },
    setLoading(state, data) {
      state.loading = data;
    },
    setPage(state, page) {
      state.page = page;
    },
    setPublicPosts(state, data) {
      state.publicPosts = data.data;
      state.paginate = data.meta;
    },
  },
  actions: {
    getPosts(contex, page) {
      contex.commit('setLoading', true);
      axios
        .get(`/admin/post?page=${page}`)
        .then((res) => {
          contex.commit('setPosts', res.data);
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          contex.commit('setLoading', false);
        });
    },
    deletePost(contex, post) {
      axios
        .delete(`/admin/post/${post.id}`)
        .then((res) => {
          if (res.status == 200) {
            Swal.fire({
              icon: 'success',
              title: 'Publicacion eliminada con exito',
              showConfirmButton: false,
              timer: 4000,
              position: 'bottom-end',
              timerProgressBar: true,
              toast: true,
              showCloseButton: true,
            });
            contex.dispatch('getPosts');
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    getPublicPosts(contex, page) {
      axios
        .get(`/post?page=${page}`)
        .then((res) => {
          if (res.status == 200) {
            contex.commit('setPublicPosts', res.data);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
