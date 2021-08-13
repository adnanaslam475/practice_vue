import Vue from 'vue';
import Vuex from "vuex";
import { db } from '../main';
import router from '../../router';
import firebase from 'firebase';


Vue.use(Vuex);
const store = new Vuex.Store({
    state: {
        user: null,
        msg: '',
        product: {},
        products: [],
        time: new Date().getTime().toLocaleString(),
        signup_success: ''
    },
    mutations: {
        auth(state, msg) {
            console.log(msg)
            state.msg = msg;
        },
        user(state, userdata) {
            state.user = userdata;
            router.push('/');
        },
        editproduct(state, product) {
            state.product = product;
        },
        signup(state, msg) {
            // console.log('u_data===>', msg);
            router.push('/');
        },
        productData(state, obj) {
            state.products.unshift(obj)
            obj && router.push('/')
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
                const resData = await res.json();
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
                    store.commit('singup', resData,
                        { root: true });
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
                console.log('error in 114', error)
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
            firebase
                .auth()
                .onAuthStateChanged(function (user) {
                    console.log('this-->', user);
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
                store.commit('auth', 'something went wrong, cannot logout successfully', { root: true })
            }
        },
        async deleteProduct({ }, id) {
            try {
                const res = await db.collection('products').doc(`${id}`).delete();
                res && store.commit('Products', store.state.products.filter(v => v.id !== id),
                    { root: true })
                store.commit('msg', 'deleted Successfully', { root: true })
            } catch (error) {
                store.commit('auth', 'Something Went Wrong', { root: true });
            }
        },
        async updateProduct({ }, v) {
            try {
                console.log('editin_action', v)
                const res = await db.collection('products').doc(`${v.pro_id}`).update({
                    name: v.name,
                    description: v.description,
                    images: v.images,
                    price: v.price,
                });
                res && store.commit('auth', 'updated Successfully', { root: true })
            } catch (error) {
                store.commit('auth', 'Something Went Wrong,cannot updated', { root: true });
            }
        }
    },
    getters: {

    },
    modules: {
    }
})
export default store;