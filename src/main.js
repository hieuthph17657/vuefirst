import { createApp } from 'vue'
import App from './App.vue'
// import Vue from 'vue'
// import VueRouter from 'vue-router'

import './assets/main.css'
import routes from './routes';

// Vue.config.productionTip = false;
// Vue.use(VueRouter);
// const router = new VueRouter({routes});
// new Vue({
//     router,
//     render: h => h(App)
// }).$mount('#app');
//createApp(App).mount('#app')

const app = createApp(App)
app.use(routes)
app.mount('#app')
