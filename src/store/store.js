import Vue from 'vue';
import Vuex from "vuex";
import { db } from '../main';
// import VueRouter from 'vue-router';

Vue.use(Vuex);
const store = new Vuex.Store({
    state: {
        auth: null,
        error: '',
    },
    mutations: {
        auth(state, msg) {
            state.error = msg;
        },
        errmsg(state, msg) {
            // console.log('wet_Errr-->', msg)
            state.error = msg
        }
    },
    actions: {
        async signup({ dispatch }, inputValues) {
            try {
                console.log('inputs in action-->', dispatch, inputValues);
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
                    console.log('res', resData)
                    const again = await db.collection('user').add(inputValues)
                    console.log(' put in firestore--->', again);
                    let d = new Date();
                    d.setTime(d.getTime() + 1 * 24 * 60 * 60 * 1000);
                    // let expires = "expires=" + d.toUTCString();
                    // const expirationTime = new Date(new Date().getTime() +
                    //     parseInt(resData.expiresIn) * 1000)
                    let user = resData
                    document.cookie = user
                    // "Token=" + resData.idToken + ";" + expires + ";path=/";
                    // commit('auth', resData)
                    // store.dispatch('auth', inputValues, { root: true })

                }
            } catch (error) {
                console.log('err64---->;', error);
            }
        },
        async login({ dispatch }, inputValues) {
            console.log(dispatch)
            const { email, password } = inputValues
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
            if (!res.ok) {
                store.commit('auth', data.error.errors[0].message.split(":")[1], { root: true })
            }
            else {

                document.cookie('user', { user: res.json() })
            }
        }

    },
    getters: {

    },
    modules: {

    }
})
export default store;
