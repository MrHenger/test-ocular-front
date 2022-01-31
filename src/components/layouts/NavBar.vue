<template>
  <div class="navBar-background">
    <v-container>
      <v-row class="d-flex justify-space-between">
        <v-col>
          <span class="white--text text-h3">Test OcularSolution</span>
        </v-col>
        <v-col class="d-flex align-center justify-end">
          <v-btn outlined dark v-if="isAuth" @click="toDashboard()"><span>dashboard</span></v-btn>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  data() {
    return {};
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
  },
};
</script>

<style>
.navBar-background {
  background-color: #1e1e1e !important;
}
</style>
