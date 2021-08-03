<template>
  <div class="hello">
    <input v-model="first" type='text' placeholder="first name"  />
    <input v-model="last" type='text' placeholder="last name"  />
    <input v-model="complete" type='checkbox' placeholder="first name" name="first"  />
   
  </div>
</template>

<script>

export default {
  name: 'AddTask',
  props: {
    msg: String
  },
  data(){
return{
     first: '',
     last: '',
     first: false,
     errors:[]
}
  },
  methods:{
       checkForm: function (e) {
           e.preventDefault()
      if (this.name && this.age) {
        return true;
      }

    

  }
}
</script>

<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
