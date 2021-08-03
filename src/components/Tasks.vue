<template>
  <div class="hello">
   
   
  </div>
</template>

<script>
// import Task from './Task.vue'

export default {
  name: 'Tasks',
    props: {
    msg: String,
    tasks:Array
  },
  created(){
console.log('from created',this.tasks[0])
  },
  data(){
      console.log('from data-->',this.tasks)
  }
}
</script>

<style scoped>
h3 {
}
</style>
