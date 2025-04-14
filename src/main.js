import './assets/scss/all.scss';
import 'bootstrap/dist/js/bootstrap.bundle.min';

import { createApp } from 'vue';
import { createPinia } from 'pinia';
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/css/index.css';
import axios from 'axios';
import VueAxios from 'vue-axios';

import CKEditor from '@ckeditor/ckeditor5-vue';
import { date, currency } from '@/methods/filters';

import App from './App.vue';
import router from './router';

const app = createApp(App);

app.config.globalProperties.$filters = {
  date,
  currency,
};

app.use(createPinia());
app.use(router);
app.use(VueAxios, axios);
app.use(CKEditor);
app.component('LoadingOverlay', Loading);

app.mount('#app');
