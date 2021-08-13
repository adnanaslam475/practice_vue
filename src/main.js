import Vue from 'vue';
import vuetify from './plugins/vuetify';
import Textarea from 'vue-textarea-autosize';
import router from '../router';
import firebase from "firebase/app";
import 'firebase/auth'
import 'firebase/firestore';
import App from '../src/Views/App.vue'
import './assets/main.css';
import store from './store/store'



Vue.use(Textarea)
Vue.config.productionTip = false;


// router.beforeEach((to, from, next) => {
//   console.log('tok_from',to,from)
//   if (from.name !== 'SignUp' || from.name !== 'Login') {
//     console.log();
//   }
// })

firebase.initializeApp({
  apiKey: "AIzaSyBxqH55VMdnAOPyt62gEM6w2oH84Nk2Qrc",
  authDomain: "vuepractice-7ee82.firebaseapp.com",
  databaseURL: "https://vuepractice-7ee82-default-rtdb.firebaseio.com",
  projectId: "vuepractice-7ee82",
  storageBucket: "vuepractice-7ee82.appspot.com",
  messagingSenderId: "538423555153",
  appId: "1:538423555153:web:db5235aa601dd2cbd57470",
  measurementId: "G-LFR5SEN6H9",
})

export const db = firebase.firestore();

// new Vue({
//   vuetify,
//   render: h => h(App)
// }).$mount('#app')


//ticketbox
new Vue({
  vuetify,
  router,
  store,
  render: h => h(App)
}).$mount('#app')

// new Vue({
//   vuetify,
//   el: '#app',
//   data: {
//     currentRoute: window.location.pathname
//   },
//   computed: {
//     ViewComponent () {
//       return router;
//     }
//   },
//   render (h) { return h(this.ViewComponent) }
// })