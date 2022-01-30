<template>
  <v-card class="pa-6">
    <v-card-title class="pb-6">
      <span class="text-h5 font-weight-bold">Editar publicacion</span>
    </v-card-title>
    <v-card-text>
      <ValidationObserver v-slot="{ invalid }" ref="editPost">
        <v-form id="editPost">
          <v-container>
            <v-row class="d-flex justify-center">
              <v-col cols="6" class="py-0">
                <ValidationProvider name="Titulo" rules="required" v-slot="{ errors }">
                  <span class="font-weight-bold">Titulo</span>
                  <v-text-field
                    v-model="data.title"
                    dense
                    outlined
                    :error-messages="errors[0]"
                  ></v-text-field>
                </ValidationProvider>
              </v-col>
              <v-col cols="6" class="py-0">
                <ValidationProvider name="slug" rules="required" v-slot="{ errors }">
                  <label class="font-weight-bold">Slug</label>
                  <v-text-field
                    v-model="data.slug"
                    dense
                    outlined
                    :error-messages="errors[0]"
                  ></v-text-field>
                </ValidationProvider>
              </v-col>
              <v-col cols="12" class="py-0">
                <ValidationProvider name="contenido" rules="required" v-slot="{ errors }">
                  <label class="font-weight-bold">Contenido</label>
                  <v-textarea v-model="data.body" outlined :error-messages="errors[0]"></v-textarea>
                </ValidationProvider>
              </v-col>
              <v-col cols="6" class="py-0">
                <ValidationProvider name="categoria" rules="required" v-slot="{ errors }">
                  <label class="font-weight-bold">Categoria</label>
                  <v-select
                    v-model="data.category_id"
                    :items="categories"
                    item-value="id"
                    item-text="name"
                    outlined
                    dense
                    no-data-text="No hay datos disponibles"
                    :error-messages="errors[0]"
                  >
                  </v-select>
                </ValidationProvider>
              </v-col>
              <v-col cols="6" class="py-0">
                <label class="font-weight-bold">Imagen</label>
                <span class="pl-1">(opcional)</span>
                <v-file-input
                  v-model="data.image"
                  accept="image/*"
                  outlined
                  dense
                  prepend-inner-icon="mdi-file"
                  prepend-icon=""
                >
                </v-file-input>
              </v-col>
              <v-col cols="12" class="py-0">
                <label class="font-weight-bold">Estatus</label>
                <v-radio-group class="mt-0" v-model="data.enabled" row>
                  <v-radio label="Activado" :value="true"></v-radio>
                  <v-radio label="Desactivado" :value="false"></v-radio>
                </v-radio-group>
              </v-col>
            </v-row>
            <v-row class="d-flex justify-center justify-sm-end">
              <v-col cols="3">
                <v-btn plain class="py-6" color="#00489A" @click.prevent="$emit('cancel')">
                  <span class="black--text">Cancelar</span>
                </v-btn>
              </v-col>
              <v-col cols="3">
                <v-btn
                  :disabled="invalid"
                  class="py-6"
                  block
                  color="#00489A"
                  @click.prevent="saveData"
                >
                  <span class="white--text">Editar</span>
                </v-btn>
              </v-col>
            </v-row>
          </v-container>
        </v-form>
      </ValidationObserver>
    </v-card-text>
  </v-card>
</template>

<script>
import { mapState } from 'vuex';
import Swal from 'sweetalert2';

export default {
  data() {
    return {
      data: {
        id: null,
        title: null,
        slug: null,
        body: null,
        enabled: null,
        image: null,
        category_id: null,
      },
      categories: [],
    };
  },
  watch: {
    editPost() {
      this.syncData();
    },
  },
  created() {
    this.syncData();
    this.getCategories();
  },
  computed: {
    ...mapState('post', {
      editPost: (state) => state.editPost,
    }),
  },
  methods: {
    syncData() {
      this.data = this.editPost;
      this.data.category_id = this.editPost.category.id;
      this.data.image = null;
    },
    getCategories() {
      this.$axios
        .get('/admin/category')
        .then((res) => {
          if (res.status == 200) {
            this.categories = res.data.data;
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    saveData() {
      console.log(this.data);
      this.$axios
        .post(`/admin/post/${this.data.id}`, this.data)
        .then((res) => {
          if (res.status == 201) {
            if (res.status == 201) {
              Swal.fire({
                icon: 'success',
                title: 'Publicación actualizada con exito',
                showConfirmButton: false,
                timer: 4000,
                position: 'bottom-end',
                timerProgressBar: true,
                toast: true,
                showCloseButton: true,
              });
            }
            this.$emit('save');
          }
        })
        .catch((error) => {
          Swal.fire({
            icon: 'error',
            title: error.message,
            showConfirmButton: false,
            timer: 5000,
            position: 'bottom-end',
            timerProgressBar: true,
            toast: true,
            showCloseButton: true,
          });
        });
    },
  },
};
</script>

<style></style>
