<template>
  <div style="height: 100%">
    <v-row style="height: 100%">
      <v-col cols="3" class="pa-0" style="height: 100%">
        <admin-side-bar></admin-side-bar>
      </v-col>
      <v-col>
        <div class="pa-6">
          <span class="font-weight-bold text-h4">Listado de publicaciones</span>
        </div>
        <v-row class="d-flex justify-center">
          <v-col class="px-10">
            <v-data-table
              :headers="headers"
              :items="posts"
              :items-per-page="5"
              class="elevation-1"
              hide-default-footer
              disable-sort
            >
              <template v-slot:item.miniature="{ item }">
                <div class="d-flex justify-center">
                  <v-img max-width="60" max-height="40" :src="item.image.fullPatch"></v-img>
                </div>
              </template>

              <template v-slot:item.enabled="{ item }">
                <span v-if="item.enabled">Activada</span>
                <span v-else>Desactivada</span>
              </template>

              <template v-slot:item.publicationDate="{ item }">
                <span v-if="item.publicationDate">{{ item.publicationDate }}</span>
                <span v-else>Sin publicar</span>
              </template>

              <template v-slot:item.actions="{ item }">
                <div class="btn-min-width mx-auto">
                  <v-btn outlined small fab color="#2E7D32"><v-icon>mdi-eye</v-icon></v-btn>
                  <v-btn class="mx-1" outlined small fab color="#FFC107">
                    <v-icon @click="editPost(item)">mdi-pencil</v-icon>
                  </v-btn>
                  <v-btn outlined small fab color="#DC3545">
                    <v-icon @click="destroyePost(item)"> mdi-delete </v-icon>
                  </v-btn>
                </div>
              </template>
            </v-data-table>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import AdminSideBar from '../../../components/layouts/AdminSideBar.vue';
import { mapActions, mapState } from 'vuex';
import Swal from 'sweetalert2';

export default {
  components: {
    AdminSideBar,
  },
  data() {
    return {
      headers: [
        {
          text: 'Miniatura',
          value: 'miniature',
          sotable: false,
          align: 'center',
          class: 'font-weight-bold',
        },
        {
          text: 'Titulo',
          value: 'title',
          sortable: false,
          align: 'center',
          class: 'font-weight-bold',
        },
        {
          text: 'Estado',
          value: 'enabled',
          sortable: false,
          align: 'center',
          class: 'font-weight-bold',
        },
        {
          text: 'Fecha de publicacion',
          value: 'publicationDate',
          sortable: false,
          align: 'center',
          class: 'font-weight-bold',
        },
        {
          text: 'Acciones',
          value: 'actions',
          sortable: false,
          align: 'center',
          class: 'font-weight-bold',
        },
      ],
    };
  },
  created() {
    this.getPosts();
    console.log(this.posts);
  },
  computed: {
    ...mapState('post', {
      posts: (state) => state.posts,
    }),
  },
  methods: {
    ...mapActions('post', ['getPosts', 'deletePost']),
    destroyePost(post) {
      Swal.fire({
        icon: 'warning',
        title: '¿Seguro que quiere eliminar esta publicación?',
        text: 'esta opción es irreversible',
        showCancelButton: true,
        iconColor: '#FFC107',
        confirmButtonText: 'Eliminar',
        confirmButtonColor: '#DC3545',
        cancelButtonText: 'Cancelar',
      }).then((result) => {
        if (result.isConfirmed) {
          this.deletePost(post);
        }
      });
    },
  },
};
</script>

<style scoped>
/* .btn-min-width {
  width: 84px !important;
} */
</style>
