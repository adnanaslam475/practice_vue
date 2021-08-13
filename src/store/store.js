import Vue from 'vue';
import Vuex from "vuex";
import { db } from '../main';
import router from '../../router';
import firebase from 'firebase';


// const history = new VueRouter();
Vue.use(Vuex);
const store = new Vuex.Store({
    state: {
        user: null,
        msg: '',
        signup: '',
        products: [],
    },
    mutations: {
        signup(state, msg) { state.signup = msg },
        auth(state, msg) { state.msg = msg; },
        user(state, userdata) {
            state.user = userdata
            console.log(router)
            userdata && router.push('/')
        },
        productData(state, obj) {
            state.products.unshift(obj)
        },
        Products(state, prods) {
            state.msg = ''
            state.products = prods;
        }
    },
    actions: {
        async signup({ }, inputValues) {
            try {
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
                        store.commit('auth', 'This email is already in used',
                            { root: true })
                    }
                    else {
                        store.commit('auth', 'Something went wrong, Network Error',
                            { root: true })
                        throw new Error(errorMsg)
                    }
                }
                else {
                    store.commit('auth', '',
                        { root: true })
                    await db.collection('users').add(inputValues)
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
                    const user = {
                        email: data.email,
                        token: data.idToken,
                        userId: data.localId,
                    }
                    var expires = "expires=" + d.toUTCString();
                    document.cookie = 'user' + "=" + JSON.stringify(user) + ";" + expires + ";path=/";
                    store.commit('user', user,
                        { root: true });
                }
            } catch (error) {
                store.commit('auth', user,
                { root: true });
            }
        },
        async addProduct({ }, inputValues) {
            try {
                const res = await db.collection('products').add({
                    ...inputValues,
                    userID: store.state.user.userId
                });
                await res.onSnapshot(e => {
                    store.commit('productData', { ...e.data(), id: e.id }, { root: true });
                })
            } catch (error) {
                store.commit('auth', 'something Went wrong, try again', { root: true })
            }
        },
        async ProductsAction({ }) {
            try {
                const res = await db.collection('products').get();
                let arr = [];
                res.docs.forEach(v => {
                    arr.push({ id: v.id, ...v.data() })
                })
                store.commit('Products', arr, { root: true })
            } catch (error) {
                store.commit('auth', 'something Went wrong, try again', { root: true })
            }
        },
        SetCurrentUser({ }, user) {
            store.commit('user', user, { root: true })
        },
        async logout({ }) {
            try {
                let current_user = {};
                await firebase.auth().signOut();
                function setCookie(cname, cvalue, exdays = 1) {
                    var d = new Date();
                    d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
                    var expires = "expires=" + d.toUTCString();
                    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
                }
                setCookie("user", JSON.stringify(current_user));
                store.commit('user', current_user, { root: true })
            } catch (error) {
                store.commit('auth', 'something went wrong, cannot logout successfully', { root: true })
            }
        },
        async deleteProduct({ }, id) {
            try {
                const res = await db.collection('products').doc(`${id}`).delete();
                res && store.commit('Products', store.state.products.filter(v => v.id !== id),
                    { root: true })
                store.commit('msg', 'deleted Successfully', { root: true })
            } catch (e) {
                store.commit('auth', 'Something Went Wrong', { root: true });
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