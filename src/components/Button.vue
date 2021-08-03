<template>
 <div class="hello">
     <button @click="Clicked()" :style="{ backgroundColor: color}" class="btn">{{title}}</button>
 </div>

</template>
<script>



// import { BButton } from "bootstrap-vue";

export default {
   name:'Button',
   props:{
       title:String,
       class:String,
       variant:String,
       color:String
   },
   data(){
       console.log(this.title,this.variant,this.class)
       return{

       }
   },
   methods:{
       Clicked: function(){
           console.log('clicked',this.title)
       }
   },
   components:{
   },
   directives:{
    //    'b-button':BButton
   }
}
</script>

<style scoped>
.hello{
    display: flex;
    /* justify-content: baseline; */
    /* align-content: center;
    align-items: center; */
    flex-direction: row;
}
</style>