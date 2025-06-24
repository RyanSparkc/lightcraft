// CSS 樣式
import './assets/scss/all.scss';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import 'vue-loading-overlay/dist/css/index.css';

// 第三方函式庫
import { createApp } from 'vue';
import { createPinia } from 'pinia';
import Loading from 'vue-loading-overlay';
import axios from 'axios';
import VueAxios from 'vue-axios';
import CKEditor from '@ckeditor/ckeditor5-vue';

// @ 別名路徑
import { date, currency } from '@/methods/filters';

// 相對路徑檔案
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
