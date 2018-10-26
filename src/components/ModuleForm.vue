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
        vm.authorName = vm.module.author
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
        module.createdAt = vm.todayDate()
        module.subs = 0
        this.$store.dispatch('addMod', module)
          .then(() => {
            console.log("Action dipatched..")
            swal("Done", "Your module have been created succesfully!", "success")
              .then(() => {
                vm.reset()
              })
          })
          .catch((err) => {
            swal("Oh no..", "Sorry something went wrong:" + err, "warning")
            vm.reset()
          })
          .finally(() => vm.submiting = false)
      },

      updateMod(module) {
        let vm = this
        vm.submiting = true
        module.author = vm.authorName
        this.$store.dispatch('updateMod', module)
          .then((done) => {
            swal('Updated', 'Your course have been updated succesfuly', 'success')
              .then((ok) => {
                this.$router.push({
                  name: 'home'
                })
              })
          })
          .finally(() => vm.submiting = false)
      },

      todayDate() {
        const d = new Date().getTime()
        return d
         // return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`
      }
    },
    computed: {
      authorName: {
        get: function () {
          let vm = this
          return vm.firstName + ' ' + vm.lastName
        },
        set: function (val) {
          let vm = this
          let names = val.split(' ')
          vm.firstName = names[0]
          vm.lastName = names[names.length - 1]
        }
      },
      btnText() {
        let vm = this
        return vm.editing ? "Update" : "Submit"
      }
    }
  }

</script>