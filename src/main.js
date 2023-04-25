import { createApp } from 'vue'
import App from './App.vue'
// import Vue from 'vue'
// import VueRouter from 'vue-router'

//import './assets/main.css'
import routes from './routes';
import PrimeVue from 'primevue/config';
import ToastService from 'primevue/toastservice';
import ConfirmationService from 'primevue/confirmationservice';
import DialogService from 'primevue/dialogservice'
import apolloClient from './api/graphql/apollo-clients';
import { ApolloClients } from '@vue/apollo-composable';
// import Menubar from 'primevue/menubar';

// Vue.config.productionTip = false;
// Vue.use(VueRouter);
// const router = new VueRouter({routes});
// new Vue({
//     router,
//     render: h => h(App)
// }).$mount('#app');
//createApp(App).mount('#app')
// const cors = require('cors');

const app = createApp(App)
app.use(routes)
app.use(PrimeVue, { ripple: true });
app.use(ConfirmationService);
app.use(ToastService);
app.use(DialogService);
app.provide(ApolloClients, apolloClient)
//app.component("Menubar", Menubar)
app.mount('#app')

