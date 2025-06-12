<template>
  <nav
    class="navbar navbar-expand-lg navbar-light"
    style="background-color: #FFC107;"
  >
    <div class="container-fluid">
      <a class="navbar-brand" href="#">燈泡市集</a>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarMarkup"
        aria-controls="navbarMarkup"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarMarkup">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <RouterLink class="nav-link" to="/admin/products"
              >產品列表</RouterLink
            >
          </li>
          <li class="nav-item">
            <RouterLink class="nav-link" to="/admin/order">訂單管理</RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink class="nav-link" to="/admin/coupon">優惠券</RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink class="nav-link" to="/admin/articles"
              >文章列表</RouterLink
            >
          </li>
        </ul>
        <ul class="navbar-nav mb-2 mb-lg-0">
          <li class="nav-item">
            <a href="#" @click.prevent="logout" class="nav-link">登出</a>
          </li>
          <li class="nav-item">
            <RouterLink class="nav-link" to="/">回到前台</RouterLink>
          </li>
        </ul>
      </div>
    </div>
  </nav>
  <div class="container-fluid mt-5 position-relative">
    <ToastMessages />
    <RouterView v-if="success === true"></RouterView>
  </div>
</template>
<script>
import axios from 'axios';

import { mapActions } from 'pinia';
import useToastMessageStore from '@/stores/toastMessage';
import ToastMessages from '@/components/ToastMessages.vue';

const { VITE_APP_URL } = import.meta.env;

export default {
  data() {
    return {
      // 產品資料格式
      products: [],
      tempProduct: {
        imagesUrl: [],
      },
      success: false,
    };
  },
  components: {
    ToastMessages,
  },
  methods: {
    ...mapActions(useToastMessageStore, ['addMessage']),
    checkLogin() {
      axios
        .post(`${VITE_APP_URL}/api/user/check`)
        .then((res) => {
          console.log(res.data.success);
          this.addMessage(
            {
              title: '登入成功',
              content: res.data.message,
              style: 'success',
            },
          );
          this.success = true;
        })
        .catch((err) => {
          console.log(err.response.data.message);
          this.$router.push('/login');
        });
    },
    logout() {
      axios
        .post(`${VITE_APP_URL}/logout`)
        .then(() => {
          this.$router.push('/login');
        })
        .catch((err) => {
          console.error(err.response.data.message);
        });
    },
  },
  mounted() {
    // 取得 cookie
    const token = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/, '$1');
    // 將 token 加入到 headers
    axios.defaults.headers.common.Authorization = token;
    this.checkLogin();
  },
};
</script>
