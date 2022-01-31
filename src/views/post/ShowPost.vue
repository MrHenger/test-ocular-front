<template>
  <v-container>
    <v-row class="d-flex justify-center">
      <v-col cols="10">
        <v-card>
          <v-container>
            <v-row class="px-6 py-8">
              <v-col>
                <v-row>
                  <v-col class="d-flex justify-space-between pt-0">
                    <a @click="toHome()"><v-icon>mdi-arrow-left</v-icon> Ir al home</a>
                    <a @click="toDashboard()" v-if="isAuth">
                      Ir al dashboard <v-icon>mdi-arrow-right</v-icon>
                    </a>
                  </v-col>
                </v-row>
              </v-col>
              <!-- <a @click="backDashboard()" v-if="isAuth"
                ><v-icon>mdi-arrow-left</v-icon> volver al dashboar</a
              > -->
              <v-col cols="12" class="pb-0">
                <span class="font-weight-bold text-h3">{{ post.title }}</span>
              </v-col>
              <v-col cols="12" class="pt-1">
                <span>Publicado el </span>
                <span>{{ formatDate(post.publicationDate) }}</span>
                <v-divider vertical class="mx-2"></v-divider>
                <span>Categoria: </span>
                <span>{{ post.category.name }}</span>
                <v-divider vertical class="mx-2"></v-divider>
                <span>Autor: </span>
                <span>{{ post.user.name }}</span>
              </v-col>
              <v-col cols="12" class="d-flex justify-center">
                <v-img :src="post.image.fullPatch" max-width="800" max-height="400"></v-img>
              </v-col>
              <v-col cols="12">
                {{ post.body }}
              </v-col>
            </v-row>
          </v-container>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      post: {},
    };
  },
  created() {
    this.getPost(this.$route.params.id);
  },
  computed: {
    isAuth() {
      if (localStorage.getItem('token')) {
        return true;
      }
      return false;
    },
  },
  methods: {
    toDashboard() {
      this.$router.push({ name: 'adminPost' });
    },
    toHome() {
      this.$router.push({ name: 'Home' });
    },
    getPost(id) {
      this.$axios
        .get(`/post/${id}`)
        .then((res) => {
          if (res.status == 200) {
            this.post = res.data.data;
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    formatDate(date) {
      return this.$moment(date).format('DD-MM-YYYY');
    },
  },
};
</script>

<style></style>
