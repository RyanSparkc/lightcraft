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
      <div class="collapse navbar-collapse" id="navbarSupportedContent" ref="navbarCollapse">
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

<script>
import { mapActions, mapState } from 'pinia';
import * as bootstrap from 'bootstrap';

import useCartStore from '@/stores/cartStore';

export default {
  computed: {
    ...mapState(useCartStore, ['carts']),
  },
  methods: {
    ...mapActions(useCartStore, ['getCart']),
    closeNavbar() {
      const collapseElement = this.$refs.navbarCollapse;
      if (collapseElement.classList.contains('show')) {
        const bsCollapse = bootstrap.Collapse.getInstance(collapseElement);
        if (bsCollapse) {
          bsCollapse.hide();
        }
      }
    },
  },
  mounted() {
    this.getCart();
  },
};
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
