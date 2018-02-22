<template>

</template>

<script>
  export default {
    name: 'fallback',
    beforeMount() {
       window.location.href = "./404.html";
    }
  }
</script>

<style>


</style>
