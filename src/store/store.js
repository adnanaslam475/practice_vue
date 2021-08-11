import Vue from 'vue';
import Vuex from "vuex";
import { db } from '../main';
import VueRouter from 'vue-router';
import VueCookies from 'vue-cookies'

const history = new VueRouter();
Vue.use(Vuex);
const store = new Vuex.Store({
    state: {
        user: null,
        msg: '',
        products: [],
    },
    mutations: {
        auth(state, msg) {
            state.msg = msg;
        },
        user(state, userdata) {
            state.user = userdata
        },
        productData(state, obj) {
            state.products.unshift(obj)
            obj && history.push('/')
        },
        Products(state, prods) {
            state.msg = ''
            state.products = prods;
        }
    },
    actions: {
        async signup({ dispatch }, inputValues) {
            try {
                // console.log('inputs in action-->', dispatch, inputValues);
                const { email, password,
                } = inputValues;
                const res = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBxqH55VMdnAOPyt62gEM6w2oH84Nk2Qrc', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ email, password, returnSecureToken: true })
                })
                const resData = await res.json()
                if (!res.ok) {
                    const errorId = resData.error.message
                    let errorMsg = ''
                    if (errorId === 'EMAIL_EXISTS') {
                        store.commit('errmsg', 'This email is already in used',
                            { root: true })
                    }
                    else {
                        store.commit('errmsg', 'Something went wrong, Network Error',
                            { root: true })
                        throw new Error(errorMsg)
                    }
                }
                else {
                    const again = await db.collection('users').add(inputValues)
                    console.log(' put in firestore--->', again);
                }
            } catch (error) {
                store.commit('auth', 'something went wrong',
                    { root: true })
            }
        },
        async login({ dispatch, commit }, inputValues) {
            try {
                const { email, password } = inputValues;
                const res = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBxqH55VMdnAOPyt62gEM6w2oH84Nk2Qrc', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        email,
                        password,
                        returnSecureToken: true
                    })
                })
                const data = await res.json();
                if (data.error?.errors) {
                    commit('auth', data.error.message,
                        { root: true })
                }
                else {
                    let d = new Date();
                    d.setTime(d.getTime() + 1 * 24 * 60 * 60 * 1000);
                    store.commit('user', data,
                        { root: true });

                    console.log('lgn sucedulful=>', data)
                    VueCookies.set('cokkieuser', data, "1h")
                    // const u = 'user' + "=" + "Token=" + data.idToken + ";"
                    //     + ";" + expires + ";path=/";
                    // document.cookie('user', JSON.stringify(u));
                    // $cookies.set("user", u, "1 h")
                }
            } catch (error) {
                console.log('error in 114', error)
            }
        },
        async addProduct({ dispatch, commit }, inputValues) {
            // console.log(store.state.user, inputValues)
            try {
                const res = await db.collection('products').add({
                    ...inputValues,
                    userID: Math.random().toFixed(30)
                    // store.state.user.userId
                });

                await res.onSnapshot(e => {
                    store.commit('productData', { ...e.data(), id: e.id }, { root: true });
                })
            } catch (error) {
                store.commit('errmsg', 'something Went wrong, try again', { root: true })
            }
        },
        async ProductsAction({ dispatch, commit }, inputValues) {
            try {
                const res = await db.collection('products').get();
                let arr = [];
                res.docs.forEach(v => {
                    arr.push(v.data())
                })
                store.commit('Products', arr, { root: true })
            } catch (error) {
                store.commit('errmsg', 'something Went wrong, try again', { root: true })
            }
        }
    },
    getters: {

    },
    modules: {

    }
})
export default store;

// let pictureRef = firebase.storage().refFromURL(url);
// pictureRef
//     .delete()
//     .then(() => {
//         //3.
//         this.images = [...this.images.filter(v => v !== url)];
//         alert("Picture is deleted successfully!");
//     })
//     .catch((err) => {
//         console.log(err);
//     });