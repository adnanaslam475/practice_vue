<template>
  
  <HelloWorld msg="Welcome to Your Vue.js App"/>
  <Header title='adnanaslam'/>
  <Tasks :tasks="arr" />
  <Button title="adnan" color='green' />
  <Button title="adnan" color='red' />
  <Button title="adnansdx" color='blue'  />
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import Header from './components/Header';
import Button from './components/Button';
import Tasks from './components/Tasks'



export default {

methods:{
deleteData:function(id){
  console.log(id)
 this.arr=this.arr.filter(v=>v.id!==id)
},
addData:function(task){
  console.log(task)
  this.arr=this.arr.map(v=>[...v,tasks])
},

},
created(){
this.arr=[{
  id:1,
  first:'adnan',
  last:'aslam',
  complete:false
},{
  first:'waqar',
  last:'aslam',
  id:2,
  complete:false
},{
  first:'adnan1',
  last:'aslam',
  id:3,
  complete:true,
},{
  id:4,
  first:'adnan2',
  last:'aslam',
  complete:false
}]
},
data () {
return{
  arr:[]
}

},
  name: 'App',
  components: {
    HelloWorld,
    Header,
    Button,
    Tasks
  },

}
</script>

<style>
html, body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center,
dl, dt, dd, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, embed, 
figure, figcaption, footer, header, hgroup, 
menu, nav, output, ruby, section, summary,
time, mark, audio, video {
	margin: 0;
	padding: 0;
	border: 0;
	font-size: 100%;
	font: inherit;
	vertical-align: baseline;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
