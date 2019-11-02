<template>
  <v-row align="center">
    <v-card class="mx-auto mt-3 mb-3" elevation="4" width="80%">
      <v-list rounded v-if="item">
        <v-card-text>
          <v-card-title class="headline">
            {{ item.package }}
          </v-card-title>
          <v-divider />
          <v-card-text>
            {{ item.description }}
          </v-card-text>

          <v-card-title class="headline">
            Depends on packages ({{ splitDepends.length }})
          </v-card-title>
          <v-divider />
          <v-card-text v-if="item.depends">
            <v-btn
              rounded
              class="mt-3 mr-1"
              dark
              small
              v-for="depend in splitDepends"
              :key="`${depend}14`"
              v-html="depend"
              @click="findPackage(depend)"
            />
          </v-card-text>
          <v-card-text v-else>
            None
          </v-card-text>

          <v-card-title class="headline">
            Packages depending on {{ item.package }} ({{ dependsOn.length }})
          </v-card-title>
          <v-divider />
          <v-card-text v-if="dependsOn.length > 0">
            <v-btn
              rounded
              class="mt-3 mr-1"
              dark
              small
              v-for="depend in dependsOn"
              :key="`${depend.package}19`"
              v-html="depend.package"
              @click="aboutPackage(depend)"
            />
          </v-card-text>
          <v-card-text v-else>
            None
          </v-card-text>
        </v-card-text>
      </v-list>
      <v-list v-else>
        <v-card-title class="headline">
          No package selected!
        </v-card-title>
      </v-list>
    </v-card>
  </v-row>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  data: function() {
    return {
      item: this.$route.params.item
    };
  },
  methods: {
    aboutPackage: function(item) {
      this.item = item;
    },
    findPackage: function(name) {
      const pckg = this.packages.find(item => item.package === name);
      if (pckg) this.item = pckg;
    },
    filterDuplicates: function(array) {
      return array.filter((v, i) => array.indexOf(v) === i);
    }
  },
  computed: {
    ...mapGetters(['packages']),
    splitDepends: function() {
      if (this.item.depends) {
        let dependsArr = this.item.depends
          .split('|')
          .join(',')
          .split(',');
        let splittedArr = dependsArr.map(item => {
          let indexOfBracket = item.indexOf('(');
          return indexOfBracket !== -1
            ? item.slice(0, indexOfBracket - 1).trim()
            : item.trim();
        });
        return this.filterDuplicates(splittedArr);
      }
      return [];
    },
    dependsOn: function() {
      let dependsOnArr = this.packages.filter(pckg => {
        if (pckg.depends && pckg.package !== this.item.package)
          return pckg.depends.includes(this.item.package);
      });

      return this.filterDuplicates(dependsOnArr);
    }
  }
};
</script>
