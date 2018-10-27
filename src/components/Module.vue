<template>
  <div class="ui raised card">
    <div class="image">
      <img src="">
    </div>
    <div class="content">
      <a class="header"> {{ module.title }} <span class="subs"> {{ module.subs }} followers </span></a>
      <div class="meta">
        <span class="date"> {{ module.author }} </span>
      </div>
      <div class="description">
        {{ module.description }}
      </div>
    </div>
    <div class="extra content">
      <div class="ui bottom attached label">{{ module.createdAt | timeAgo }}</div>
      <button 
        class="ui inverted red icon button right floated" 
        @click="remove(module)">
        <i class="trash alternate icon"/>
      </button>
      <button 
        class="ui icon basic button" 
        @click="edit(module)">
        <i class="pencil icon"/>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "Module",
  filters: {
    timeAgo(date) {
      // convert to seconds
      const seconds = Math.floor(
        (new Date() - new Date(date).getTime()) / 1000
      );
      const formats = [
        // duration represents how many seconds in format time span
        { format: "year", duration: 356 * 24 * 60 * 60 },
        { format: "month", duration: 30 * 24 * 60 * 60 },
        { format: "week", duration: 7 * 24 * 60 * 60 },
        { format: "day", duration: 24 * 60 * 60 },
        { format: "hour", duration: 60 * 60 },
        { format: "minute", duration: 60 },
        { format: "second", duration: 1 }
      ];
      for (const f of formats) {
        const interval = Math.floor(seconds / f.duration);
        // pluralize format
        const format = interval > 1 ? f.format + "s" : f.format;
        if (interval >= 1) return `${interval} ${format} ago`;
      }
      // No time difference
      return "Just now";
    }
  },
  props: {
    module: {
      type: Object,
      required: true
    }
  },
  methods: {
    edit(module) {
      this.$router.push({
        name: "editMod",
        params: {
          module: module
        }
      });
    },

    remove(module) {
      this.$swal({
        title: "Are you sure?",
        text:
          "Once deleted, you will not be able to recover this imaginary course!",
        type: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes",
        focusCancel: true
      }).then(result => {
        if (result.value) {
          this.$store.dispatch("removeMod", module).then(() => {
            this.$swal({
              text: "Poof! Your imaginary module have been deleted!",
              type: "success"
            });
          });
        }
      });
    }
  }
};
</script>

<style>
.subs {
  float: right;
  color: lightgreen;
  font-size: 0.8em;
}
</style>
