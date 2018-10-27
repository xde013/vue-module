<template>
  <div class="ui container">
    <input 
      v-show="debug" 
      id="import" 
      type="file" 
      accept=".csv, .tsv" 
      name="modules" 
      @change="loadCSV">
    <div class="ui secondary pointing menu">
      <div class="header item">Sort By</div>
      <a 
        :class="{ active : sortParam === 'new'}" 
        class="item" 
        @click="sortMod('new')">
        Newest
      </a>
      <a 
        :class="{ active : sortParam === 'hot'}" 
        class="item" 
        @click="sortMod('hot')">
        Hot
      </a>
      <a 
        :class="{ active : sortParam === 'popular'}" 
        class="item" 
        @click="sortMod('popular')">
        Most Popular
      </a>
      <div class="right menu">
        <div class="item">
          <div
            :class="{loading: searching}" 
            class="ui search">
            <div class="ui icon input">
              <input 
                v-model="searchQuery" 
                class="prompt" 
                type="text" 
                placeholder="Search...">
              <i class="search icon"/>
            </div>
          </div>
        </div>
        <div class="item">
          <label 
            for="import" 
            class="ui animated teal basic button">
            <div class="visible content"> Import </div>
            <div class="hidden content">
              <i class="ui upload icon"/>
            </div>
          </label>
        </div>
      </div>
    </div>
    <div 
      v-if="noModules" 
      class="ui centered grid">
      <div class="row">
        <div class="column">
          <div class="ui center aligned floating message">
            <img 
              class="ui centered medium image" 
              src="/src/assets/nothing.png">
            <h2 class="ui center aligned header">
              Oups..
              <div class="sub header">There's nothing here yet..</div>
            </h2>
            <br>
            <div class="ui fluid buttons">
              <label 
                for="import" 
                class="ui animated fade button">
                <div class="visible content"> Import </div>
                <div class="hidden content">
                  <i class="ui upload icon"/>
                </div>
              </label>
              <div class="or"/>
              <router-link :to="{ name: 'newMod'}">
                <button class="ui animated green fade button active">
                  <div class="visible content">
                    Add new
                  </div>
                  <div class="hidden content">
                    <i class="ui plus icon"/>
                  </div>
                </button>
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div 
      :class="{active : loading}" 
      class="ui large loader"/>
    <div 
      v-show="!searching" 
      class="ui four stackable cards">
      <module 
        v-for="mod in modules"  
        :key="mod.id" 
        :module="mod"/>
      <div 
        v-if="!noModules" 
        class="ui raised card">
        <div class="content">
          <router-link :to="{ name: 'newMod'}">
            <h2 class="ui center aligned icon header">
              <i 
                class="add icon" 
                style="color: #e5e5e5"/>
              <div class="sub header"> Add new </div>
            </h2>
          </router-link>
        </div>
      </div>
    </div>
    <div 
      v-show="searching" 
      class="ui four stackable cards">
      <module 
        v-for="mod in filteredMods" 
        :key="mod.id" 
        :module="mod"/>
    </div>
  </div>
</template>

<script>
import Module from "./Module";
import Papa from "papaparse";

export default {
  name: "ModuleList",
  components: {
    Module
  },
  data() {
    return {
      loading: false,
      debug: false,
      searchQuery: "",
      sortParam: "" // Defaults to random order at first render
    };
  },
  computed: {
    modules() {
      let vm = this;
      let modules = this.$store.getters.modules;
      switch (vm.sortParam) {
        case "popular":
          return vm.$lodash.sortBy(modules, [
            m => {
              return -this.$lodash.parseInt(m.subs);
            }
          ]);
        case "new":
          return vm.$lodash.sortBy(modules, [
            m => {
              return -new Date(m.createdAt).getTime();
            }
          ]);
        case "hot":
          return this.$store.getters.modules; // To implement
        default:
          return this.$store.getters.modules;
      }
      // return vm.sortParam.length > 0 ? vm.$lodash.sortBy(modules, [vm.sortParam]) : this.$store.getters.modules
    },

    filteredMods() {
      let vm = this;
      return this.$store.getters.modules.filter(mod => {
        return (
          mod.title
            .concat(mod.description)
            .toLowerCase()
            .indexOf(vm.cleanQuery(vm.searchQuery)) >= 0
        );
      });
    },

    searching() {
      let vm = this;
      return vm.cleanQuery(vm.searchQuery).length > 0;
    },

    modulesCount() {
      return this.$store.getters.modulesCount;
    },

    noModules() {
      return this.$store.getters.modulesCount === 0;
    },

    progress() {
      return this.$store.getters.progress;
    }
  },
  methods: {
    sortMod(param) {
      let vm = this;
      vm.sortParam = param;
    },

    grabMods() {
      let vm = this;
      vm.loading = true;
      this.$store
        .dispatch("fetchModule")
        .catch(err => {
          this.$swal("Oups", "Something went wrong" + err, "alert");
        })
        .finally(() => (vm.loading = false));
    },

    loadCSV(e) {
      let vm = this;
      vm.loading = true;
      let files = e.target.files || e.dataTransfer.files;
      Papa.parse(files[0], {
        header: true,
        complete: this.onComplete,
        error: err => {
          vm.loading = false;
          this.$swal(
            "Oups",
            err.message || "Unknown error has occured",
            "error"
          );
        }
      });
    },

    onComplete(parsed) {
      let vm = this;
      this.$store
        .dispatch("loadData", parsed)
        .then(() => {
          if (this.progress === 100) {
            this.$swal("Done", "Import completed successfully", "success");
          }
        })
        .finally(() => (vm.loading = false));
    },

    cleanQuery(q) {
      return this.$lodash.trim(q.toLowerCase());
    }
  }
};
</script>

<style>
</style>
