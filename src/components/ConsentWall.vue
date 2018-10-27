<template>
  <div>
    <div class="ui dimmer active"/>
  </div>
</template>
<script>
export default {
  mounted() {
    const vm = this;
    vm.$swal({
      title: "Welcome!",
      showCancelButton: true,
      text:
        "Please note that this interface is just a proof of concept and doesn't refer to any production use case",
      type: "info",
      confirmButtonText: "Got it",
      cancelButtonText: "No"
    }).then(result => {
      if (result.value) {
        this.$store.dispatch("giveConsent");
        this.$router.push({ name: "home" });
      } else {
        result.dismiss === vm.$swal.DismissReason.cancel;
        window.location.href = "./404.html";
      }
    });
  }
};
</script>

