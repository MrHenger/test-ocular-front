<template>
  <div style="height: 100%">
    <v-row style="height: 100%">
      <v-col cols="3" class="pa-0" style="height: 100%">
        <admin-side-bar></admin-side-bar>
      </v-col>
      <v-col class="px-8">
        <div class="pa-6">
          <span class="font-weight-bold text-h4">Crear publicacion</span>
        </div>
        <ValidationObserver v-slot="{ invalid }">
          <v-form ref="createPost">
            <v-container>
              <v-row>
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
                    <v-textarea
                      v-model="data.body"
                      outlined
                      :error-messages="errors[0]"
                    ></v-textarea>
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
                  <ValidationProvider name="imagen" rules="required" v-slot="{ errors }">
                    <label class="font-weight-bold">Imagen</label>
                    <v-file-input
                      v-model="data.image"
                      accept="image/*"
                      outlined
                      dense
                      prepend-inner-icon="mdi-file"
                      prepend-icon=""
                      :error-messages="errors[0]"
                    >
                    </v-file-input>
                  </ValidationProvider>
                </v-col>
              </v-row>
              <v-row class="d-flex justify-center justify-sm-end">
                <v-col cols="3">
                  <v-btn
                    :loading="loadingBtn"
                    :disabled="invalid"
                    class="py-6"
                    block
                    color="#00489A"
                    @click.prevent="createPost()"
                  >
                    <span class="white--text">Crear</span>
                  </v-btn>
                </v-col>
              </v-row>
            </v-container>
          </v-form>
        </ValidationObserver>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import AdminSideBar from '../../../components/layouts/AdminSideBar.vue';
import Swal from 'sweetalert2';

export default {
  components: {
    AdminSideBar,
  },
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
      loadingBtn: false,
    };
  },
  created() {
    this.getCategories();
  },
  methods: {
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
    createFormData() {
      const formData = new FormData();
      formData.append('image', this.data.image);
      formData.append('title', this.data.title);
      formData.append('slug', this.data.slug);
      formData.append('body', this.data.body);
      formData.append('category_id', this.data.category_id);
      return formData;
    },
    createPost() {
      this.loadingBtn = true;
      const formData = this.createFormData();
      const headers = { 'Content-Type': 'multipart/form-data' };
      this.$axios
        .post('/admin/post', formData, { headers })
        .then((res) => {
          if (res.status == 201) {
            Swal.fire({
              icon: 'success',
              title: 'Publicación creada con exito',
              showConfirmButton: false,
              timer: 4000,
              position: 'bottom-end',
              timerProgressBar: true,
              toast: true,
              showCloseButton: true,
            });
            this.$router.push({ name: 'adminPost' });
          }
        })
        .catch((error) => {
          console.log(error);
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
        })
        .finally(() => {
          this.loadingBtn = false;
        });
    },
  },
};
</script>

<style></style>
