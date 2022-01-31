<template>
  <v-container>
    <v-row class="d-flex justify-center">
      <v-col cols="10">
        <v-card>
          <v-container>
            <v-row class="px-6 py-8">
              <a @click="backDashboard()" v-if="isAuth"
                ><v-icon>mdi-arrow-left</v-icon> volver al dashboar</a
              >
              <v-col cols="12" class="pb-0">
                <span class="font-weight-bold text-h3">{{ post.title }}</span>
              </v-col>
              <v-col cols="12" class="pt-1">
                <span>Publicado el </span>
                <span>{{ post.publicationDate }}</span>
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
import { mapActions, mapState } from 'vuex';
export default {
  data() {
    return {};
  },
  created() {
    this.getPost(this.$route.params.id);
  },
  computed: {
    ...mapState('post', {
      post: (state) => state.post,
    }),
    isAuth() {
      if (localStorage.getItem('token')) {
        console.log(this.authme, 'xddd');
        return true;
      }
      return false;
    },
  },
  methods: {
    ...mapActions('post', ['getPost']),
    backDashboard() {
      this.$router.push({ name: 'adminPost' });
    },
  },
};
</script>

<style></style>
