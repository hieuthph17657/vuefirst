import HelloWorld from './components/HelloWorld.vue'
import TheWelcome from './components/TheWelcome.vue'
import Login from './components/Login.vue'
import { createRouter, createWebHistory } from 'vue-router'
const router = [
{ path: '/', component: HelloWorld },
{ path: '/theWelcome', component: TheWelcome },
{ path: '/login', component: Login },];

const routes = createRouter({
    history: createWebHistory(),
    routes: router
})

export default routes;