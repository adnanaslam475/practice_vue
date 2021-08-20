import Vue from 'vue';
import Vuex from "vuex";
import { db } from '../main';
import router from '../../router';
import firebase from 'firebase';
import { MUTATE } from './actionTypes'


Vue.use(Vuex);
const store = new Vuex.Store({
    state: {
        user: null,
        msg: '',
        error: false,
        num: 0,
        product: {},
        products: [],
        time: new Date().getTime().toLocaleString(),
        signup_success: '',
        itemDetails: {}
    },
    mutations: {
        mutating(state, msg) {
            console.log('mutating')
        },
        success(state, msg) {
            console.log(msg)
            state.msg = msg;
            state.error = true
        },
        error(state, msg) {
            state.msg = msg;
            state.error = msg && true
        },
        user(state, userdata) {
            state.user = userdata;
            if (userdata?.token) {
                if (window.location.pathname !== '/')
                    router.push('/').catch(e => {
                        console.log('in 33', e)
                    })
            };
        },
        editproduct(state, product) {
            state.product = product;
        },
        signup(state, msg) {
            state.user = msg;
            console.log('run37')
            router.push('/');
        },
        productData(state, obj) {
            state.products.unshift(obj);
            router.push('/');
        },
        Products(state, prods) {
            state.msg = ''
            state.products = prods;
            console.log(prods)
        },
        itemDetails(state, details) {
            state.itemDetails = details
            console.log('details----<', details)
        },
        // [MUTATE](state, msg) {
        //     console.log('m==>', msg)
        // }
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
                const resData = await res.json();
                if (!res.ok) {
                    const errorId = resData.error.message
                    let errorMsg = ''
                    if (errorId === 'EMAIL_EXISTS') {
                        store.commit('error', 'This email is already in used',
                            { root: true })
                    }
                    else {
                        store.commit('error', 'Something went wrong, Network Error',
                            { root: true })
                        throw new Error(errorMsg)
                    }
                }
                else {
                    await db.collection('users').add(inputValues);
                    let d = new Date();
                    d.setTime(d.getTime() + 1 * 24 * 60 * 60 * 1000);
                    const user = {
                        email: data.email,
                        token: data.idToken,
                        userId: data.localId,
                    }
                    var expires = "expires=" + d.toUTCString();
                    document.cookie = 'user' + "=" + JSON.stringify(user) + ";" + expires + ";path=/";
                    console.log('res===>105', resData)
                    store.commit('signup', user,
                        { root: true });
                }
            } catch (error) {
                store.commit('error', 'something went wrong',
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
                    console.log(data.error)
                    commit('error', data.error.message,
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
                // console.log(error)
                store.commit('error', 'something went wrong',
                    { root: true });
            }
        },
        async addProduct({ }, inputValues) {
            try {
                console.log(store.state.user.userId)
                const res = await db.collection('products').add({
                    ...inputValues,
                    userID: store.state.user.userId
                });
                await res.onSnapshot(e => {
                    console.log('dtaat-->', e.data())
                    store.commit('productData', { ...e.data(), id: e.id }, { root: true });
                })
            } catch (error) {
                store.commit('error', 'something Went wrong, try again', { root: true })
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
                store.commit('error', 'something Went wrong, try again', { root: true })
            }
        },
        SetCurrentUser({ }, user) {
            firebase
                .auth()
                .onAuthStateChanged(function (user) {
                    console.log(user)
                })
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
                store.commit('error', 'something went wrong, cannot logout successfully', { root: true })
            }
        },
        async deleteProduct({ }, id) {
            try {
                const res = await db.collection('products').doc(`${id}`).delete();
                res && store.commit('Products', store.state.products.filter(v => v.id !== id),
                    { root: true })
                store.commit('error', 'deleted Successfully', { root: true })
            } catch (e) {
                store.commit('error', 'Something Went Wrong', { root: true });
            }
        },
        async updateProduct({ }, v) {
            try {
                const res = await db.collection('products').doc(`${v.pro_id}`).update({
                    name: v.name,
                    description: v.description,
                    images: v.images,
                    price: v.price,
                });
                res && store.commit('error', 'updated Successfully', { root: true })
            } catch (error) {
                store.commit('error', 'Something Went Wrong,cannot updated', { root: true });
            }
        },
        async specificProduct({ }, name) {
            try {
                let arr = [];
                console.log(name)
                const res = await db.collection('products').where('category', '==', `${name}`)
                res.onSnapshot(data => {
                    data.forEach(v => {
                        arr.push({ id: v.id, ...v.data() })
                    })
                })
                store.commit('Products', arr, { root: true })
            } catch (error) {
                store.commit('error', 'something went wrong', { root: true })
            }
        },
        async Details({ dispatch, commit }, id) {
            try {
                const res = await db.collection('products').doc(id).get()
                store.commit('itemDetails', res.data(), { root: true })
            } catch (e) {
                store.commit('error', 'something went wrong', { root: true })
            }
        },
        mapAction() {
            console.log('mapActionin action')
        }
    },
    getters: {
        newGetter(state) {
            return state.num ^ 2;
        }
    },
    modules: {
    }
})
export default store;