<template>
  <div class="ui container">
    <div class="center aligned onecolumn row">
      <div class="column">
        <div class="ui segment">
          <form 
            class="ui large form" 
            @submit.prevent="submitMod()">
            <h4 class="ui dividing header">Module Information</h4>
            <div class="field">
              <label>Title</label>
              <input 
                v-model="module.title" 
                type="text" 
                name="modTitle" 
                placeholder="Specify a title for your module.." 
                required>
            </div>
            <div class="field">
              <label>Author name</label>
              <div class="two fields">
                <div class="field">
                  <input 
                    v-model="firstName" 
                    type="text" 
                    name="firstName" 
                    placeholder="First Name" 
                    required>
                </div>
                <div class="field">
                  <input 
                    v-model="lastName" 
                    type="text" 
                    name="lastName" 
                    placeholder="Last Name" 
                    required>
                </div>
              </div>
            </div>
            <div class="field">
              <label>Description</label>
              <textarea 
                v-model="module.description" 
                rows="2" 
                placeholder="What's your module about?" 
                required/>
            </div>
            <div 
              v-show="debug" 
              class="field">
              <input 
                v-model="authorName" 
                type="text" 
                name="lastName" 
                placeholder="Full Name" 
                required>
            </div>
            <button 
              :class="{loading: submiting}" 
              type="submit" 
              class="ui fluid large teal bottom attached button"> {{ btnText }} </button>
          </form>
          <br>
          <div 
            class="ui animated button" 
            tabindex="0" 
            @click="goBack()">
            <div class="visible content">Back</div>
            <div class="hidden content">
              <i class="left arrow icon"/>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'ModuleForm',
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
            this.$swal("Done", "Your module have been created succesfully!", "success")
              .then(() => {
                vm.reset()
              })
          })
          .catch((err) => {
            this.$swal("Oh no..", "Sorry something went wrong:" + err, "warning")
            vm.reset()
          })
          .finally(() => vm.submiting = false)
      },

      updateMod(module) {
        let vm = this
        vm.submiting = true
        module.author = vm.authorName
        this.$store.dispatch('updateMod', module)
          .then(() => {
            this.$swal('Updated', 'Your course have been updated succesfuly', 'success')
              .then(() => {
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
  }

</script>