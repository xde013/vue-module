<template>
  <div class="ui container">
    <input type="file" accept=".csv, .tsv" name="modules" id="import" @change="loadCSV" v-show="debug">
    <div class="ui secondary pointing menu">
      <div class="header item">Sort By</div>
      <a class="item" :class="{ active : sortParam === 'new'}" v-on:click="sortMod('new')">
        Newest
      </a>
      <a class="item" :class="{ active : sortParam === 'hot'}" v-on:click="sortMod('hot')">
        Hot
      </a>
      <a class="item" :class="{ active : sortParam === 'popular'}" v-on:click="sortMod('popular')">
        Most Popular
      </a>
      <div class="right menu">
        <div class="item">
          <div class="ui search" :class="{loading: searching}">
            <div class="ui icon input">
              <input class="prompt" type="text" placeholder="Search..." v-model="searchQuery">
              <i class="search icon"></i>
            </div>
          </div>
        </div>
        <div class="item">
          <label for="import" class="ui animated teal basic button">
            <div class="visible content"> Import </div>
            <div class="hidden content">
              <i class="ui upload icon"></i>
            </div>
          </label>
        </div>
      </div>
    </div>
    <div class="ui centered grid" v-if="noModules">
      <div class="row">
        <div class="column">
          <div class="ui center aligned floating message">
            <img class="ui centered medium image" src="/src/assets/nothing.png">
            <h2 class="ui center aligned header">
              Oups..
              <div class="sub header">There's nothing here yet..</div>
            </h2>
            <br>
            <div class="ui fluid buttons">
              <label for="import" class="ui animated fade button">
                <div class="visible content"> Import </div>
                <div class="hidden content">
                  <i class="ui upload icon"></i>
                </div>
              </label>
              <div class="or"></div>
              <router-link :to="{ name: 'newMod'}">
              <button class="ui animated green fade button active">
                  <div class="visible content">
                    Add new
                  </div>
                  <div class="hidden content">
                    <i class="ui plus icon"></i>
                  </div>
              </button>
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="ui four stackable cards">
      <div class="ui large loader" :class="{active : loading}"></div>
      <module v-for="mod in modules" :key="mod.id" :module="mod" v-if="!searching"></module>
      <module v-for="mod in filteredMods" :key="mod.id" :module="mod" v-if="searching"></module>
      <div class="ui raised card" v-if="!noModules">
        <div class="content">
          <router-link :to="{ name: 'newMod'}">
            <h2 class="ui center aligned icon header">
              <i class="add icon" style="color: #e5e5e5"></i>
              <div class="sub header"> Add new </div>
            </h2>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Module from './Module'
  import Papa from 'papaparse'

  export default {
    name: 'module-list',
    data() {
      return {
        loading: false,
        debug: false,
        searchQuery: '',
        sortParam: ''  // Defaults to random order at first render
      }
    },
    components: {
      Module
    },
    created() {
      let vm = this
      if (vm.firstVisit) {
        swal("Welcome!",
            "Please note that this interface is just a proof of concept and doesn't refer to any production use case",
            "info", {
              buttons: {
                cancel: "Nope",
                enter: "Ok, got it."
              }
            })
          .then((value) => {
            if (value === "enter") {
              vm.grabMods()
              this.$store.dispatch('visit')
            } else {
              console.log("Goodbye my friend..")
            }
          })
      }
    },
    methods: {

      sortMod(param) {
        let vm = this
        vm.sortParam = param
      },

      grabMods() {
        let vm = this;
        vm.loading = true;
        this.$store.dispatch('fetchModule')
          .then(() => {
            vm.loading = false;
          })
          .catch( err => {
            swal("Oups", "Something went wrong" + err, "alert")
          })
      },

      loadCSV(e) {
        let vm = this;
        vm.loading = true
        let files = e.target.files || e.dataTransfer.files
        let parsed = Papa.parse(files[0], {
          header: true,
          complete: this.onComplete,
          error: (err) => {
            vm.loading = false
            swal("Oups", err.message || "Unknown error has occured", "error");
          },
        })
      },

      onComplete(parsed) {
        let vm = this;
        this.$store.dispatch('loadData', parsed)
          .then(() => {
            if (this.progress === 100) {
              vm.loading = false
              swal("Done", "Import completed successfully", "success")
            }
          })
      },
      
      cleanQuery(q) {
        return this.$lodash.trim(q.toLowerCase())
      }

    },
    computed: {

      firstVisit() {
        return this.$store.getters.visit
      },

      modules() {
        let vm = this
        let modules = this.$store.getters.modules
        switch (vm.sortParam) {
          case 'popular':
            return vm.$lodash.sortBy(modules, 'subs')
            break
          case 'new':
            return vm.$lodash.sortBy(modules, [(m) => { return new Date(m.createdAt)}])
            break
          case 'hot':
            return this.$store.getters.modules // To implement
          default:
            return this.$store.getters.modules
            break;
        }
        // return vm.sortParam.length > 0 ? vm.$lodash.sortBy(modules, [vm.sortParam]) : this.$store.getters.modules
      },

      filteredMods() {
        let vm = this
        return this.$store.getters.modules.filter((mod) => {
          return mod.title.concat(mod.description).toLowerCase().indexOf(vm.cleanQuery(vm.searchQuery)) >= 0
        })
      },

      searching() {
        let vm = this
        return vm.cleanQuery(vm.searchQuery).length > 0
      },

      modulesCount() {
        return this.$store.getters.modulesCount
      },

      noModules() {
        return this.$store.getters.modulesCount === 0
      },

      progress() {
        return this.$store.getters.progress
      }
    }
  }

</script>

<style>


</style>
