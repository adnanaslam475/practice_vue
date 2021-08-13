import Vue from 'vue';
import Router from 'vue-router';
// import App from './src/Views/App.vue';
import Main from './src/Views/Main.vue';
import Login from './src/Views/Login.vue';
import SignUp from './src/Views/Signup.vue';
import AddProduct from './src/Views/AddProduct.vue';
import ProductDetails from './src/Views/ProductDetails.vue';
Vue.use(Router);


const routes = [
    {
        name: 'Main',
        path: '/',
        component: Main,
    },
    {
        name: 'SignUp',
        path: '/signup',
        component: SignUp,
    },
    {
        name: 'Login',
        path: '/login',
        component: Login,
    },
    {
        name: 'AddProduct',
        path: '/add-product',
        component: AddProduct,
    },
    {
        name: 'Products',
        path: '/product-details/:id',
        component: ProductDetails,
    },
]
const router = new Router({
    mode: "history",
    base: process.env.BASE_URL,
    routes
})

export default router