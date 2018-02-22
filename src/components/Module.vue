<template>
  <div class="ui raised card">
    <div class="image">
      <img src="">
    </div>
    <div class="content">
      <a class="header"> {{ module.title }} </a>
      <div class="meta">
        <span class="date"> {{ module.author }} </span>
      </div>
      <div class="description">
        {{ module.description }}
      </div>
    </div>
    <div class="extra content">
      <button class="ui inverted red icon button right floated" v-on:click="del(module)">
        <i class="trash alternate icon"></i>
      </button>
      <button class="ui icon basic button" v-on:click="edit(module)">
        <i class="pencil icon"></i>
      </button>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'module',
    props: ['module'],
    methods: {
      
      edit(module) {
        console.log(module)
        this.$router.push({
          name: 'editMod',
          params: {
            module: module
          }
        })
      },

      del(module) {
        swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this imaginary course!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
          })
          .then((willDelete) => {
            if (willDelete) {
              this.$store.dispatch('removeMod', module)
                .then((del) => {
                  swal("Poof! Your imaginary course has been deleted!", {
                    icon: "success",
                  });
                })
            } else {
              swal("Your module is safe!");
            }
          })
      }
    }
  }

</script>

<style>


</style>
