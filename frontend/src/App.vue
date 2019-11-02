<template>
  <v-app>
    <v-app-bar app>
      <v-toolbar-title
        class="headline text-uppercase"
        @click="$router.push('/').catch(err => {})"
      >
        <span class="mr-1">VP</span>
        <span class="font-weight-light">REAKTOR</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-img
        :src="require('@/assets/linkedin-2.svg')"
        aspect-ratio="1"
        max-width="45"
        @click="openLink"
      />
    </v-app-bar>
    <v-content>
      <router-view />
    </v-content>
  </v-app>
</template>

<script>
import axios from 'axios';
import { mapActions } from 'vuex';

export default {
  name: 'App',
  methods: {
    ...mapActions(['setPackages']),
    openLink: function() {
      window.open('https://www.linkedin.com/in/vuan-pham/', '_blank');
    }
  },
  async created() {
    // On local change url to http://localhost:<port>/api/packages
    // And change the port to the same as the backend (default: 3000)
    let url = '/api/packages';

    const response = await axios.get(url);
    const data = response.data;
    this.setPackages(data);
  }
};
</script>

<style>
* {
  user-select: none;
}
.v-image,
.v-toolbar__title {
  cursor: pointer;
}
</style>
