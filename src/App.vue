<template>
  <div 
    id="app" 
    class="ui row">
    <NavBar/>
    <router-view/>
    <div 
      :class="{active : loading}" 
      class="ui large loader"/>
  </div>
</template>

<script>
  import NavBar from './components/NavBar'
  export default {
    name: 'App',
    components: {
      NavBar
    },
    data() {
      return {
        loading: false,
        msg: 'Ryan Bourhil <bourhilr@gmail.com'
      }
    },
    computed: {
      consent() {
        return this.$store.getters.userConsent
      }
    },
    watch: {
      consent(newValue) {
        const vm = this
        // Fetch modules only when user give consent
        if (newValue) vm.grabMods()
      }
    },
    methods: {
      grabMods() {
        const vm = this;
        vm.loading = true;
        this.$store.dispatch('fetchModule')
          .finally(() => vm.loading = false)
      }
    },
  }

</script>

<style>
#app {
  margin-top: 48px;
  margin-bottom: 20px;
}
</style>
