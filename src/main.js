import { createApp } from 'vue'
import App from './App.vue'
// import Vue from 'vue'
// import VueRouter from 'vue-router'

import './assets/main.css'
import routes from './routes';
import PrimeVue from 'primevue/config';
import ToastService from 'primevue/toastservice';
import ConfirmationService from 'primevue/confirmationservice';
import DialogService from 'primevue/dialogservice'
import apolloClient from './api/graphql/apollo-clients';
import { ApolloClients } from '@vue/apollo-composable';
import AppIcon from './components/custom/AppIcon.vue'
import ButtonIcon from './components/custom/ButtonIcon.vue';
import MenuItem from './components/custom/MenuItem.vue';
import Menu from 'primevue/menu';
import Button from "primevue/button"
import Toast from 'primevue/toast';
import ConfirmDialog from 'primevue/confirmdialog';
import InputText from 'primevue/inputtext';
import LabelRequired from './components/helper/directive/LabelRequired';
import TreeSelect from 'primevue/treeselect';
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
app.directive('required',LabelRequired)
app.component('AppIcon', AppIcon)
app.component('ButtonIcon', ButtonIcon)
app.component('Button', Button)
app.component('Toast', Toast)
app.component('MenuItem', MenuItem)
app.component('Menu', Menu)
app.component('ConfirmDialog', ConfirmDialog)
app.component('InputText', InputText)
app.component('TreeSelect', TreeSelect)
//app.component("Menubar", Menubar)
app.mount('#app')

