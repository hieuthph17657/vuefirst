import HelloWorld from './components/HelloWorld.vue'
import TheWelcome from './components/TheWelcome.vue'
import Login from './components/Login.vue'
import Menu from './components/menu/Menu.vue'
import CategoryIndex from './components/category/CategoryIndex.vue'
// import CategoryForm from './components/category/CategoryForm.vue'
import { createRouter, createWebHistory } from 'vue-router'
const router = [
{ path: '/', component: HelloWorld },
{ path: '/theWelcome', component: TheWelcome },
{ path: '/login', component: Login },
{ path: '/category', component: CategoryIndex },
// { path: '/categoryForm', component: CategoryForm },
];

const routes = createRouter({
    history: createWebHistory(),
    routes: router
})

export default routes;