<template>
  <div/>
</template>

<script>
  export default {
    name: 'Fallback',
    beforeMount() {
       window.location.href = "./404.html";
    }
  }
</script>

<style>


</style>
