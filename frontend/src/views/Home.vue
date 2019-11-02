<template>
  <v-row align="center">
    <v-card class="mx-auto mt-3 mb-3" elevation="4" width="80%">
      <v-list rounded v-if="packages.length > 0">
        <v-subheader>PACKAGES ({{ packages.length }})</v-subheader>
        <v-list-item-group>
          <v-list-item v-for="(item, i) in packages" :key="i" color="primary">
            <v-list-item-content>
              <v-list-item-title @click.stop="showDialog(item)">
                {{ item.package }}
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
      <v-list rounded v-else>
        <v-card-title>LOADING.. 🤔</v-card-title>
      </v-list>
    </v-card>
  </v-row>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  computed: {
    ...mapGetters(['packages'])
  },
  methods: {
    showDialog: function(item) {
      this.$router.push({ name: 'package', params: { item } });
    }
  }
};
</script>

<style></style>
