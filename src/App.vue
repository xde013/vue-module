<template>
  <div id="app" class="ui row">
    <!-- <img src="./assets/logo.png"> -->
    <div class="ui menu">
      <div class="header item">
       <a href="https://inteach.io/">InTeach </a>
      </div>
      <a class="item active">
         <router-link :to="{name: 'home'}"> Courses </router-link>
      </a>
      <a class="item">
        Utilisateurs
      </a>
      <div class="right menu">
        <a class="item">
          About us
        </a>
        <div class="item">
          <div class="ui button">Log out </div>
        </div>
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
  import ModuleList from './components/ModuleList'

  export default {
    name: 'app',
    components: {
      ModuleList
    },
    data() {
      return {
        msg: 'Ryan Bourhil <bourhilr@gmail.com'
      }
    }
  }

</script>

<style>


</style>
