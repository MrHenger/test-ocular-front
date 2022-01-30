<template>
  <div class="sb-background" style="height: 100%">
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
</template>

<script>
export default {
  data() {
    return {
      selectedItem: 0,
      items: [
        { text: 'Publicaciones', icon: 'mdi-post' },
        { text: 'Categorias', icon: 'mdi-server' },
      ],
    };
  },
};
</script>

<style scoped>
.sb-background {
  background-color: #1e1e1e !important;
}
</style>
