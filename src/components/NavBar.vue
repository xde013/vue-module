<template>
  <div class="ui fixed top menu">
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
        <router-link :to="{name: 'about'}"> About us </router-link>
      </a>
      <div class="item">
        <div class="ui button">Log out </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {};
</script>

