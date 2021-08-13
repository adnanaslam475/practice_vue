import Vue from 'vue';
import Router from 'vue-router';
import Main from './src/Views/Main.vue';
import Login from './src/Views/Login.vue';
import SignUp from './src/Views/Signup.vue';
import AddProduct from './src/Views/AddProduct.vue';
import EditProduct from './src/Views/EditProduct.vue';
import ProductDetails from './src/Views/ProductDetails.vue';

Vue.use(Router);

const routes = [
    {
        name: 'Main',
        path: '/',
        props:true,
        component: Main,
        meta:{
            auth:true
        }
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
        name: 'EditProduct',
        path: '/edit/:id',
        component: EditProduct,
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