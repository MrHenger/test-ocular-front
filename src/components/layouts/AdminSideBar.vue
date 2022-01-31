<template>
  <div class="sb-background" style="height: 100%">
    <div>
      <div class="pt-10 pb-4">
        <div class="d-flex justify-center">
          <v-avatar size="128">
            <v-img :src="authme.fullpath" max-width="200" max-height="200"></v-img>
          </v-avatar>
        </div>
        <div class="mt-4">
          <v-container>
            <v-row>
              <v-col cols="12" class="d-flex justify-center py-1">
                <span class="white--text">{{ authme.name }}</span>
              </v-col>
              <v-col cols="12" class="d-flex justify-center py-0">
                <span class="white--text">{{ authme.email }}</span>
              </v-col>
              <v-col cols="12" class="d-flex justify-center pb-0">
                <v-btn outlined dark @click="logout()"><span>Logout</span></v-btn>
              </v-col>
            </v-row>
          </v-container>
        </div>
      </div>
      <v-divider dark class="mx-8"></v-divider>
      <div>
        <v-list dark dense class="sb-background">
          <v-list-item-group v-model="selectedItem" color="primary">
            <v-list-item v-for="(item, i) in items" :key="i">
              <v-list-item-icon>
                <v-icon v-text="item.icon"></v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title v-text="item.text"></v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
export default {
  data() {
    return {
      selectedItem: 0,
      items: [
        { text: 'Publicaciones', icon: 'mdi-post' },
        { text: 'Categorias', icon: 'mdi-layers-triple' },
      ],
    };
  },
  created() {
    this.getAuthme();
  },
  computed: {
    ...mapState(['authme']),
  },
  methods: {
    ...mapActions(['getAuthme']),
    logout() {
      this.$axios
        .post('/logout')
        .then((res) => {
          if (res.status == 200) {
            localStorage.removeItem('token');
            this.$router.push({ name: 'login' });
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>

<style scoped>
.sb-background {
  background-color: #1e1e1e !important;
}
</style>
