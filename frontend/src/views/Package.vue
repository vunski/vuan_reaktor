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

          <v-card-title class="headline"> Dependencies ({{ dependencies.length }}) </v-card-title>
          <v-divider />
          <v-card-text v-if="item.depends">
            <v-btn
              rounded
              class="mt-3 mr-1"
              dark
              small
              v-for="dependency in dependencies"
              :key="`${dependency}14`"
              v-html="dependency"
              @click="findPackage(dependency)"
            />
          </v-card-text>
          <v-card-text v-else>
            None
          </v-card-text>

          <v-card-title class="headline"> Reverse Dependencies ({{ reverseDependencies.length }}) </v-card-title>
          <v-divider />
          <v-card-text v-if="reverseDependencies.length > 0">
            <v-btn
              rounded
              class="mt-3 mr-1"
              dark
              small
              v-for="dependencies in reverseDependencies"
              :key="`${dependencies.package}19`"
              v-html="dependencies.package"
              @click="aboutPackage(dependencies)"
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
import { mapGetters } from "vuex";

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
    },
    removeBracket: function(item) {
      let indexOfBracket = item.indexOf("(");
      return indexOfBracket !== -1 ? item.slice(0, indexOfBracket - 1).trim() : item.trim();
    },
    dependenciesToArr: function(dependencies) {
      let dependenciesArr = dependencies.depends
        .split("|")
        .join(",")
        .split(",");
      return dependenciesArr;
    }
  },
  computed: {
    ...mapGetters(["packages"]),
    dependencies: function() {
      if (this.item.depends) {
        let splittedArr = this.dependenciesToArr(this.item).map(item => this.removeBracket(item));
        return this.filterDuplicates(splittedArr);
      }
      // IF the current package doesn't have any dependencies, return an empty array
      return [];
    },
    reverseDependencies: function() {
      let dependsOnArr = this.packages.filter(pckg => {
        if (pckg.depends && pckg.package !== this.item.package) {
          let splittedArr = this.dependenciesToArr(pckg).map(dependency => this.removeBracket(dependency));
          let a = splittedArr.find(dependency => dependency === this.item.package);
          if (a) return true;
        }
      });
      return this.filterDuplicates(dependsOnArr);
      // IF the current package doesn't have any reverse dependencies, return an empty array
      return [];
    }
  }
};
</script>
