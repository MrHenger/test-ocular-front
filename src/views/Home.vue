<template>
  <div>
    <nav-bar></nav-bar>
    <v-container>
      <v-row>
        <v-col>
          <v-container>
            <v-row>
              <v-col cols="4" class="mb-6" v-for="post in publicPosts" :key="post.id">
                <v-card>
                  <v-row class="pb-4">
                    <v-col cols="12" class="py-0">
                      <v-img :src="post.image.fullPatch"></v-img>
                    </v-col>
                    <v-col cols="12" class="py-0">
                      <v-card-title class="pb-0">
                        <a @click="showPost(post.id)">{{ post.title }}</a>
                      </v-card-title>
                    </v-col>
                    <v-col cols="12" class="py-0">
                      <v-card-text class="pt-0">
                        <span>Autor: </span>
                        <span>{{ post.user.name }}</span>
                      </v-card-text>
                    </v-col>
                    <v-col cols="12" class="pt-0">
                      <v-card-text class="py-0">
                        <span class="ellipsis">{{ post.body }}</span>
                      </v-card-text>
                    </v-col>
                  </v-row>
                </v-card>
              </v-col>
            </v-row>
          </v-container>
        </v-col>
        <v-col cols="12" class="d-flex justify-center text-right">
          <v-pagination
            v-model="page"
            :total-visible="5"
            @input="changePage()"
            :length="paginate ? paginate.last_page : 1"
          ></v-pagination>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { mapActions, mapMutations, mapState } from 'vuex';
import NavBar from '../components/layouts/NavBar.vue';

export default {
  components: {
    NavBar,
  },
  data() {
    return {
      page: 1,
    };
  },
  created() {
    this.getPublicPosts(1);
  },
  computed: {
    ...mapState('post', {
      publicPosts: (state) => state.publicPosts,
    }),
    ...mapState('post', {
      paginate: (state) => state.paginate,
    }),
    ...mapState('post', {
      currentPage: (state) => state.page,
    }),
  },
  methods: {
    ...mapActions('post', ['getPublicPosts']),
    ...mapMutations('post', ['setPage']),
    showPost(id) {
      this.$router.push({ name: 'postShow', params: { id } });
    },
    changePage() {
      this.setPage(this.page);
      this.getPublicPosts(this.page);
    },
  },
};
</script>

<style scoped>
.ellipsis {
  /* Ellipsis of 4 lines */
  display: block;
  display: -webkit-box;
  max-width: 100%;
  height: 57px;
  margin: 0 auto;
  font-size: 14px;
  line-height: 1;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
