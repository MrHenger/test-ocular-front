import axios from '../axios';
import Swal from 'sweetalert2';

export default {
  namespaced: true,
  state: () => ({
    posts: [],
    editPost: {},
  }),
  mutations: {
    setPost(state, data) {
      state.posts = data;
    },
    setEditPost(state, data) {
      state.editPost = data;
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
  },
};
