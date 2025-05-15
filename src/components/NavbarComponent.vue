<template>
  <nav class="navbar navbar-expand-lg bg-body-tertiary">
    <div class="container-fluid">
      <RouterLink class="navbar-brand" to="/">Logo</RouterLink>
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
        <ul class="navbar-nav me-auto mb-2 mb-lg-0 gap-3">
          <li class="nav-item">
            <RouterLink class="nav-link" to="/about">關於我們</RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink class="nav-link" to="/products">產品列表</RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink class="nav-link" to="/cart">購物車</RouterLink>
          </li>
        </ul>
        <ul class="navbar-nav gap-3">
          <li class="nav-item">
            <RouterLink
              class="btn btn-outline-secondary position-relative"
              to="/"
              ><i class="bi bi-cart"></i>
              <span
                class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
              >
                {{ carts?.length }}
                <span class="visually-hidden">unread messages</span>
              </span>
            </RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink class="nav-link" to="/login">登入</RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink class="nav-link" to="/admin/products"
              >後台 - 購物車列表</RouterLink
            >
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
import { mapActions, mapState } from 'pinia';

import cartStore from '@/stores/cartStore';

export default {
  computed: {
    ...mapState(cartStore, ['carts']),
  },
  methods: {
    ...mapActions(cartStore, ['getCart']),
  },
  mounted() {
    this.getCart();
  },
};
</script>
