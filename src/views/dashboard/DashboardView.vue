<template>
  <!-- 現代化導航列 -->
  <nav class="navbar navbar-expand-lg modern-navbar">
    <div class="container-fluid">
      <RouterLink class="navbar-brand fs-5" to="/admin/products">
        <i class="fas fa-lightbulb fs-5"></i>
        LightCraft 後台
      </RouterLink>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <RouterLink
              class="nav-link"
              to="/admin/products"
              @click="closeNavbar"
            >
              <i class="fas fa-cube me-2"></i>產品列表
            </RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink class="nav-link" to="/admin/order" @click="closeNavbar">
              <i class="fas fa-shopping-cart me-2"></i>訂單管理
            </RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink
              class="nav-link"
              to="/admin/coupon"
              @click="closeNavbar"
            >
              <i class="fas fa-ticket-alt me-2"></i>優惠券
            </RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink
              class="nav-link"
              to="/admin/articles"
              @click="closeNavbar"
            >
              <i class="fas fa-newspaper me-2"></i>文章列表
            </RouterLink>
          </li>
        </ul>
        <ul class="navbar-nav mb-2 mb-lg-0">
          <li class="nav-item">
            <a href="#" @click.prevent="handleLogout" class="nav-link">
              <i class="fas fa-sign-out-alt me-2"></i>登出
            </a>
          </li>
          <li class="nav-item">
            <RouterLink class="nav-link" to="/" @click="closeNavbar">
              <i class="fas fa-home me-2"></i>回到前台
            </RouterLink>
          </li>
        </ul>
      </div>
    </div>
  </nav>

  <!-- 主內容區域 -->
  <div class="dashboard-main">
    <div class="container-fluid position-relative">
      <ToastMessages />
      <RouterView v-if="success === true"></RouterView>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, nextTick } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';
import useToastMessageStore from '@/stores/toastMessage';

import ToastMessages from '@/components/ToastMessages.vue';

const { VITE_APP_URL } = import.meta.env;

// 路由和 Store
const router = useRouter();
const toastStore = useToastMessageStore();

// 響應式數據
const success = ref(false);
const navbarInitialized = ref(false);

// DOM 操作方法
const initNavbar = () => {
  // 防止重複初始化
  if (navbarInitialized.value) {
    return;
  }

  const navbarToggler = document.querySelector('.navbar-toggler');
  const navbarCollapse = document.getElementById('navbarSupportedContent');

  if (navbarToggler && navbarCollapse) {
    // 移除Bootstrap data屬性，完全接管控制
    navbarToggler.removeAttribute('data-bs-toggle');
    navbarToggler.removeAttribute('data-bs-target');

    // 添加自定義點擊處理
    navbarToggler.onclick = (e) => {
      e.preventDefault();
      e.stopPropagation();

      // 切換選單顯示狀態
      if (navbarCollapse.classList.contains('show')) {
        navbarCollapse.classList.remove('show');
        navbarToggler.setAttribute('aria-expanded', 'false');
        navbarToggler.classList.remove('collapsed');
      } else {
        navbarCollapse.classList.add('show');
        navbarToggler.setAttribute('aria-expanded', 'true');
        navbarToggler.classList.add('collapsed');
      }
    };

    // 點擊其他地方關閉選單
    document.addEventListener('click', (event) => {
      if (!navbarToggler.contains(event.target) && !navbarCollapse.contains(event.target)) {
        if (navbarCollapse.classList.contains('show')) {
          navbarCollapse.classList.remove('show');
          navbarToggler.setAttribute('aria-expanded', 'false');
          navbarToggler.classList.remove('collapsed');
        }
      }
    });

    navbarInitialized.value = true;
  }
};

const closeNavbar = () => {
  // 關閉導覽列
  const navbarCollapse = document.getElementById('navbarSupportedContent');
  const navbarToggler = document.querySelector('.navbar-toggler');

  if (navbarCollapse && navbarCollapse.classList.contains('show')) {
    navbarCollapse.classList.remove('show');
    if (navbarToggler) {
      navbarToggler.setAttribute('aria-expanded', 'false');
    }
  }
};

// API 方法
const checkLogin = () => {
  axios
    .post(`${VITE_APP_URL}/api/user/check`)
    .then((res) => {
      toastStore.addMessage({
        title: '登入成功',
        content: res.data.message,
        style: 'success',
      });
      success.value = true;
    })
    .catch(() => {
      router.push('/login');
    });
};

const logout = () => {
  axios
    .post(`${VITE_APP_URL}/logout`)
    .then(() => {
      router.push('/login');
    })
    .catch(() => {
      // 錯誤已在上層處理
    });
};

const handleLogout = () => {
  closeNavbar();
  logout();
};

// 生命週期
onMounted(() => {
  // 取得 cookie
  const token = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/, '$1');
  // 將 token 加入到 headers
  axios.defaults.headers.common.Authorization = token;
  checkLogin();

  // 初始化導覽列
  nextTick(() => {
    initNavbar();
  });
});
</script>

<style scoped>
/* 額外的頁面特定樣式 */
.dashboard-main {
  background: linear-gradient(135deg, #f7fafc 0%, #edf2f7 100%);
}

/* 手機版導覽列修復 */
@media (max-width: 991.98px) {
  .navbar-collapse {
    background: rgba(255, 193, 7, 0.95);
    margin-top: 0.5rem;
    border-radius: 8px;
    padding: 1rem;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }

  .navbar-nav .nav-link {
    padding: 0.75rem 1rem;
    margin: 0.25rem 0;
    border-radius: 6px;

    &:hover {
      background: rgba(255, 255, 255, 0.2);
    }
  }
}

/* 確保漢堡選單圖示可見 */
.navbar-toggler-icon {
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 30 30'%3e%3cpath stroke='rgba%2845, 55, 72, 0.85%29' stroke-linecap='round' stroke-miterlimit='10' stroke-width='2' d='M4 7h22M4 15h22M4 23h22'/%3e%3c/svg%3e");
}

/* 確保漢堡選單按鈕可點擊 */
.navbar-toggler {
  border: 1px solid rgba(45, 55, 72, 0.2);
  padding: 0.375rem 0.75rem;
  font-size: 1.25rem;
  line-height: 1;
  background-color: transparent;
  border-radius: 0.375rem;
  transition: box-shadow 0.15s ease-in-out;
}

.navbar-toggler:focus {
  text-decoration: none;
  outline: 0;
  box-shadow: 0 0 0 0.25rem rgba(255, 193, 7, 0.25);
}
</style>
