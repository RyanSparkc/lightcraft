<template>
  <nav
    class="navbar navbar-expand-lg navbar-light"
    style="background-color: #FFC107;"
  >
    <div class="container-fluid">
      <RouterLink class="navbar-brand" to="/">
        <img
          src="@/assets/images/nav-logo.png"
          alt="Logo"
          style="height: 40px; width: auto;"
        />
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
      <div
        class="collapse navbar-collapse"
        id="navbarSupportedContent"
        ref="navbarCollapse"
      >
        <ul class="navbar-nav me-auto mb-2 mb-lg-0" @click="closeNavbar">
          <li class="nav-item">
            <RouterLink class="nav-link" to="/about">關於我們</RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink class="nav-link" to="/products">產品列表</RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink class="nav-link" to="/articles">文章專區</RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink class="nav-link" to="/orders">我的訂單</RouterLink>
          </li>
        </ul>
        <ul class="navbar-nav" @click="closeNavbar">
          <li class="nav-item me-3">
            <RouterLink class="btn btn-secondary position-relative" to="/cart"
              ><i class="bi bi-cart"></i>
              <span
                class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
              >
                {{ carts?.length }}
                <span class="visually-hidden">unread messages</span>
              </span>
            </RouterLink>
          </li>
          <li class="nav-item d-none d-lg-block">
            <div class="user-avatar"></div>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref, onMounted, nextTick } from 'vue';
import { storeToRefs } from 'pinia';

import useCartStore from '@/stores/cartStore';

// Store 設定
const cartStore = useCartStore();
const { carts } = storeToRefs(cartStore);
const { getCart } = cartStore;

// 模板引用
const navbarCollapse = ref(null);

// 導航欄初始化狀態
const navbarInitialized = ref(false);

// DOM 操作方法
const initNavbar = () => {
  // 防止重複初始化
  if (navbarInitialized.value) {
    return;
  }

  const navbarToggler = document.querySelector('.navbar-toggler');
  const navbarCollapseElement = document.getElementById('navbarSupportedContent');

  if (navbarToggler && navbarCollapseElement) {
    // 移除Bootstrap data屬性，完全接管控制
    navbarToggler.removeAttribute('data-bs-toggle');
    navbarToggler.removeAttribute('data-bs-target');

    // 添加自定義點擊處理
    navbarToggler.onclick = (e) => {
      e.preventDefault();
      e.stopPropagation();

      // 切換選單顯示狀態
      if (navbarCollapseElement.classList.contains('show')) {
        navbarCollapseElement.classList.remove('show');
        navbarToggler.setAttribute('aria-expanded', 'false');
        navbarToggler.classList.remove('collapsed');
      } else {
        navbarCollapseElement.classList.add('show');
        navbarToggler.setAttribute('aria-expanded', 'true');
        navbarToggler.classList.add('collapsed');
      }
    };

    // 點擊其他地方關閉選單
    document.addEventListener('click', (event) => {
      if (!navbarToggler.contains(event.target) && !navbarCollapseElement.contains(event.target)) {
        if (navbarCollapseElement.classList.contains('show')) {
          navbarCollapseElement.classList.remove('show');
          navbarToggler.setAttribute('aria-expanded', 'false');
          navbarToggler.classList.remove('collapsed');
        }
      }
    });

    navbarInitialized.value = true;
  }
};

// 方法
const closeNavbar = () => {
  // 關閉導覽列
  const navbarCollapseElement = document.getElementById('navbarSupportedContent');
  const navbarToggler = document.querySelector('.navbar-toggler');

  if (navbarCollapseElement && navbarCollapseElement.classList.contains('show')) {
    navbarCollapseElement.classList.remove('show');
    if (navbarToggler) {
      navbarToggler.setAttribute('aria-expanded', 'false');
      navbarToggler.classList.remove('collapsed');
    }
  }
};

// 生命週期
onMounted(() => {
  getCart();

  // 初始化導覽列
  nextTick(() => {
    initNavbar();
  });
});
</script>

<style scoped>
.user-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: linear-gradient(135deg, #2c2c2c 0%, #000000 100%);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}
</style>
