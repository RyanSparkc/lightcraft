<template>
  <div class="front-layout">
    <NavbarComponent></NavbarComponent>
    <!-- <h2>這是前台</h2> -->
    <div class="position-relative flex-grow-1">
      <ToastMessages />
      <div>
        <RouterView />
      </div>
      <div class="bg-dark py-5">
        <div class="container">
          <div class="row text-white">
            <!-- 公司資訊 -->
            <div class="col-lg-4 col-md-6 mb-4">
              <RouterLink class="text-white h4 d-block mb-3" to="/">
                <img
                  src="@/assets/images/logo.png"
                  alt="LightCraft Logo"
                  style="height: 60px; width: auto;"
                />
              </RouterLink>
              <p class="mb-3">
                專業燈具品牌，提供最優質的照明解決方案。從 LED
                節能燈泡到智能照明系統，為您創造完美光線。
              </p>
              <div class="d-flex">
                <a href="#" class="text-white me-3 fs-4">
                  <i class="fab fa-facebook"></i>
                </a>
                <a href="#" class="text-white me-3 fs-4">
                  <i class="fab fa-instagram"></i>
                </a>
                <a href="#" class="text-white me-3 fs-4">
                  <i class="fab fa-line"></i>
                </a>
                <a href="#" class="text-white fs-4">
                  <i class="fab fa-youtube"></i>
                </a>
              </div>
            </div>

            <!-- 快速連結 -->
            <div class="col-lg-2 col-md-6 mb-4 offset-lg-2">
              <h5 class="text-warning mb-3">快速連結</h5>
              <ul class="list-unstyled">
                <li class="mb-2">
                  <RouterLink
                    class="text-white text-decoration-none"
                    to="/about"
                    >關於我們</RouterLink
                  >
                </li>
                <li class="mb-2">
                  <RouterLink
                    class="text-white text-decoration-none"
                    to="/products"
                    >產品列表</RouterLink
                  >
                </li>
                <li class="mb-2">
                  <RouterLink
                    class="text-white text-decoration-none"
                    to="/orders"
                    >我的訂單</RouterLink
                  >
                </li>
                <li class="mb-2">
                  <RouterLink class="text-white text-decoration-none" to="/cart"
                    >購物車</RouterLink
                  >
                </li>
                <li class="mb-2">
                  <RouterLink
                    class="text-white text-decoration-none"
                    to="/admin/products"
                    >登入管理後台</RouterLink
                  >
                </li>
              </ul>
            </div>

            <!-- 客戶服務 -->
            <div class="col-lg-2 col-md-6 mb-4">
              <h5 class="text-warning mb-3">客戶服務</h5>
              <ul class="list-unstyled">
                <li class="mb-2">
                  <a href="#" class="text-white text-decoration-none"
                    >配送資訊</a
                  >
                </li>
                <li class="mb-2">
                  <a href="#" class="text-white text-decoration-none"
                    >退換貨政策</a
                  >
                </li>
                <li class="mb-2">
                  <a href="#" class="text-white text-decoration-none"
                    >常見問題</a
                  >
                </li>
                <li class="mb-2">
                  <a href="#" class="text-white text-decoration-none"
                    >隱私權政策</a
                  >
                </li>
                <li class="mb-2">
                  <a href="#" class="text-white text-decoration-none"
                    >服務條款</a
                  >
                </li>
              </ul>
            </div>

            <!-- 聯絡資訊 -->
            <div class="col-lg-2 col-md-6 mb-4">
              <h5 class="text-warning mb-3">聯絡我們</h5>
              <div class="mb-2">
                <i class="fas fa-phone me-2 text-warning"></i>
                <span>0800-123-456</span>
              </div>
              <div class="mb-2">
                <i class="fas fa-envelope me-2 text-warning"></i>
                <span>service@lightcraft.com</span>
              </div>
              <div class="mb-2">
                <i class="fas fa-map-marker-alt me-2 text-warning"></i>
                <span>台北市信義區燈具大道 123 號</span>
              </div>
              <div class="mb-2">
                <i class="fas fa-clock me-2 text-warning"></i>
                <span>週一至週五 09:00-18:00</span>
              </div>
            </div>
          </div>

          <!-- 版權資訊 -->
          <div class="row align-items-center">
            <div class="col-md-6">
              <p class="mb-0 text-muted">
                © 2025 LightCraft 燈具專家. All Rights Reserved.
              </p>
            </div>
            <div class="col-md-6 text-md-end">
              <p class="mb-0 text-muted">
                <RouterLink
                  class="text-decoration-none text-muted me-3"
                  to="/login"
                  >會員登入</RouterLink
                >
                <RouterLink
                  class="text-decoration-none text-muted"
                  to="/admin/products"
                  >登入管理後台</RouterLink
                >
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.front-layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.flex-grow-1 {
  flex: 1;
}
</style>

<script>
import ToastMessages from '../../components/ToastMessages.vue';
import NavbarComponent from '../../components/NavbarComponent.vue';

export default {
  components: {
    NavbarComponent,
    ToastMessages,
  },
};
</script>
