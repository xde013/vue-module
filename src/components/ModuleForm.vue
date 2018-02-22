<template>
  <div class="ui container">
    <div class="center aligned onecolumn row">
      <div class="column">
        <div class="ui segment">
          <form class="ui large form" v-on:submit.prevent="submitMod()">
            <h4 class="ui dividing header">Module Information</h4>
            <div class="field">
              <label>Title</label>
              <input type="text" name="modTitle" placeholder="Specify a title for your module.." v-model="module.title" required>
            </div>
            <div class="field">
              <label>Author name</label>
              <div class="two fields">
                <div class="field">
                  <input type="text" name="firstName" placeholder="First Name" v-model="firstName" required>
                </div>
                <div class="field">
                  <input type="text" name="lastName" placeholder="Last Name" v-model="lastName" required>
                </div>
              </div>
            </div>
            <div class="field">
              <label>Description</label>
              <textarea rows="2" placeholder="What's your module about?" v-model="module.description" required></textarea>
            </div>
            <div class="field" v-show="debug">
              <input type="text" name="lastName" placeholder="Full Name" v-model="authorName" required>
            </div>
            <button type="submit" class="ui fluid large teal bottom attached button" :class="{loading: submiting}"> {{ btnText }} </button>
          </form>
          <br>
          <div class="ui animated button" @click="goBack()" tabindex="0">
            <div class="visible content">Back</div>
            <div class="hidden content">
              <i class="left arrow icon"></i>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'moduleForm',
    data() {
      return {
        debug: false,
        firstName: '',
        lastName: '',
        module: {},
        submiting: false,
        editing: false
      }
    },

    mounted() {
      let vm = this
      if (this.$route.params.module) {
        vm.module = this.$route.params.module
        let author = vm.module.author.split(" ")
        vm.firstName = author[0] // There's certainly better way to do this
        vm.lastName = author[1]
        vm.editing = true
      } else {
        vm.reset()
      }
    },

    methods: {
      goBack() {
        this.$router.go(-1)
      },
      reset() {
        let vm = this
        vm.firstName = ''
        vm.lastName = ''
        vm.module = {}
      },
      submitMod() {
        let vm = this
        vm.editing ? vm.updateMod(vm.module) : vm.createMod()
      },

      createMod() {
        let vm = this
        vm.submiting = true
        let module = vm.module
        module.author = vm.authorName
        this.$store.dispatch('addMod', module)
          .then(() => {
            console.log("Action dipatched..")
            swal("Done", "Your module have been created succesfully!", "success")
              .then(() => {
                vm.submiting = false
                vm.reset()
              })
          })
          .catch((err) => {
            vm.submiting = false
            swal("Oh no..", "Sorry something went wrong:" + err, "warning")
            vm.reset()
          })
      },

      updateMod(module) {
        let vm = this
        vm.submiting = true
        module.author = vm.authorName
        this.$store.dispatch('updateMod', module)
          .then((done) => {
            vm.submiting = false
            swal('Updated', 'Your course have been updated succesfuly', 'success')
              .then((ok) => {
                this.$router.push({
                  name: 'home'
                })
              })
          })
      }
    },
    computed: {
      authorName() {
        return this.firstName + " " + this.lastName
      },
      btnText() {
        let vm = this
        return vm.editing ? "Update" : "Submit"
      }
    }
  }

</script>

<style>


</style>
