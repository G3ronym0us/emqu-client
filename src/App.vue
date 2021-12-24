<template>
  <v-app>
    <v-app-bar
      app
      color="black"
      dark
    >

        <v-app-bar-title>
          <span>Emqu</span>
        </v-app-bar-title>

        <v-spacer></v-spacer>

        <router-link style="text-decoration: none; color:#ECEFF1 ;"  class="me-4" to="/">Encuestas</router-link>
        <router-link style="text-decoration: none; color:#ECEFF1 ;" to="/stadistics">Estadisticas</router-link>

      
    </v-app-bar>

    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<style scoped>
  
</style>


<script>

export default {
  name: 'App',

  data: () => ({
    //
  }),
};
</script>
