<!-- eslint-disable comma-dangle -->
<template>
  <div class="container mt-md-5 mt-3 mb-7">
    <div class="row">
      <div class="col-md-4">
        <div
          class="accordion border border-bottom border-top-0 border-start-0 border-end-0 mb-3"
          id="accordionExample"
        >
          <div class="card border-0">
            <div
              class="card-header px-0 py-4 bg-white border border-bottom-0 border-top border-start-0 border-end-0 rounded-0"
              id="headingOne"
              data-bs-toggle="collapse"
              data-bs-target="#collapseOne"
            >
              <div
                class="d-flex justify-content-between align-items-center pe-1"
              >
                <h4 class="mb-0">Lorem ipsum</h4>
                <i class="fas fa-chevron-down"></i>
              </div>
            </div>
            <div
              id="collapseOne"
              class="collapse show"
              aria-labelledby="headingOne"
              data-bs-parent="#accordionExample"
            >
              <div class="card-body py-0">
                <ul class="list-unstyled">
                  <li>
                    <RouterLink class="py-2 d-block text-muted" to="/products"
                      >全部</RouterLink
                    >
                  </li>
                  <li v-for="item in categories" :key="item">
                    <RouterLink
                      class="py-2 d-block text-muted"
                      :to="`/products?category=${item}`"
                      >{{ item }}</RouterLink
                    >
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div class="card border-0">
            <div
              class="card-header px-0 py-4 bg-white border border-bottom-0 border-top border-start-0 border-end-0 rounded-0"
              id="headingTwo"
              data-bs-toggle="collapse"
              data-bs-target="#collapseTwo"
            >
              <div
                class="d-flex justify-content-between align-items-center pe-1"
              >
                <h4 class="mb-0">Lorem ipsum</h4>
                <i class="fas fa-chevron-down"></i>
              </div>
            </div>
            <div
              id="collapseTwo"
              class="collapse"
              aria-labelledby="headingTwo"
              data-bs-parent="#accordionExample"
            >
              <div class="card-body py-0">
                <ul class="list-unstyled">
                  <li>
                    <a href="#" class="py-2 d-block text-muted">Lorem ipsum</a>
                  </li>
                  <li>
                    <a href="#" class="py-2 d-block text-muted">Lorem ipsum</a>
                  </li>
                  <li>
                    <a href="#" class="py-2 d-block text-muted">Lorem ipsum</a>
                  </li>
                  <li>
                    <a href="#" class="py-2 d-block text-muted">Lorem ipsum</a>
                  </li>
                  <li>
                    <a href="#" class="py-2 d-block text-muted">Lorem ipsum</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div class="card border-0">
            <div
              class="card-header px-0 py-4 bg-white border border-bottom-0 border-top border-start-0 border-end-0 rounded-0"
              id="headingThree"
              data-bs-toggle="collapse"
              data-bs-target="#collapseThree"
            >
              <div
                class="d-flex justify-content-between align-items-center pe-1"
              >
                <h4 class="mb-0">Lorem ipsum</h4>
                <i class="fas fa-chevron-down"></i>
              </div>
            </div>
            <div
              id="collapseThree"
              class="collapse"
              aria-labelledby="headingThree"
              data-bs-parent="#accordionExample"
            >
              <div class="card-body py-0">
                <ul class="list-unstyled">
                  <li>
                    <a href="#" class="py-2 d-block text-muted">Lorem ipsum</a>
                  </li>
                  <li>
                    <a href="#" class="py-2 d-block text-muted">Lorem ipsum</a>
                  </li>
                  <li>
                    <a href="#" class="py-2 d-block text-muted">Lorem ipsum</a>
                  </li>
                  <li>
                    <a href="#" class="py-2 d-block text-muted">Lorem ipsum</a>
                  </li>
                  <li>
                    <a href="#" class="py-2 d-block text-muted">Lorem ipsum</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-8">
        <div class="row">
          <div class="col-md-6" v-for="product in products" :key="product.id">
            <div class="card border-0 mb-4 position-relative position-relative">
              <img
                :src="product.imageUrl"
                class="card-img-top rounded-0 object-fit-cover"
                height="225"
                alt="..."
              />
              <a href="#" class="text-dark">
                <i
                  class="far fa-heart position-absolute"
                  style="right: 16px; top: 16px"
                ></i>
              </a>
              <div class="card-body p-0">
                <h4 class="mb-0 mt-3">
                  <RouterLink :to="`/product/${product.id}`">{{
                    product.title
                  }}</RouterLink>
                </h4>
                <p class="card-text mb-0">
                  NT${{ product.price }}
                  <span class="text-muted">
                    <del>NT${{ product.origin_price }}</del></span
                  >
                </p>
                <p class="text-muted mt-3"></p>
              </div>
            </div>
          </div>
        </div>
        <nav
          class="d-flex justify-content-center"
          v-if="pagination.total_pages > 1"
        >
          <ul class="pagination">
            <li
              class="page-item"
              :class="{ disabled: pagination.current_page === 1 }"
            >
              <a
                class="page-link"
                href="#"
                aria-label="Previous"
                @click.prevent="changePage(pagination.current_page - 1)"
              >
                <span aria-hidden="true">&laquo;</span>
              </a>
            </li>
            <li
              v-for="page in visiblePages"
              :key="page"
              class="page-item"
              :class="{ active: page === pagination.current_page }"
            >
              <a class="page-link" href="#" @click.prevent="changePage(page)">
                {{ page }}
              </a>
            </li>
            <li
              class="page-item"
              :class="{ disabled: pagination.current_page === pagination.total_pages }"
            >
              <a
                class="page-link"
                href="#"
                aria-label="Next"
                @click.prevent="changePage(pagination.current_page + 1)"
              >
                <span aria-hidden="true">&raquo;</span>
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  </div>
</template>
<script>
import axios from 'axios';
import useToastMessageStore from '@/stores/toastMessage';
import { mapActions } from 'pinia';

const { VITE_APP_URL, VITE_APP_PATH } = import.meta.env;
export default {
  components: {},
  data() {
    return {
      // 產品資料格式
      products: [],
      categories: [
        '衣服2',
        '衣服',
        '嬰兒連身衣',
        'c',
        'C',
        '測試分類',
        '測試分類2',
        '測試分類10',
      ],
      isLoading: true,
      pagination: {
        total_pages: 1,
        current_page: 1,
        has_pre: false,
        has_next: false,
      },
    };
  },
  computed: {
    visiblePages() {
      const pages = [];
      const totalPages = this.pagination.total_pages;
      const currentPage = this.pagination.current_page;

      // 簡單的分頁邏輯：顯示當前頁面前後各2頁
      const startPage = Math.max(1, currentPage - 2);
      const endPage = Math.min(totalPages, currentPage + 2);

      for (let i = startPage; i <= endPage; i += 1) {
        pages.push(i);
      }

      return pages;
    },
  },
  watch: {
    // eslint-disable-next-line func-names
    '$route.query': function () {
      this.getProducts(1); // 當分類改變時，重置到第一頁
    },
  },
  methods: {
    ...mapActions(useToastMessageStore, ['addMessage']),
    getProducts(page = 1) {
      const { category = '' } = this.$route.query;
      this.isLoading = true;
      axios
        .get(
          // eslint-disable-next-line comma-dangle
          `${VITE_APP_URL}/api/${VITE_APP_PATH}/products?category=${category}&page=${page}`
        )
        .then((res) => {
          this.products = res.data.products;
          this.pagination = res.data.pagination;
          this.isLoading = false;
        })
        .catch((err) => {
          this.addMessage({
            style: 'danger',
            title: '錯誤',
            content: err.response.data.message,
          });
          this.isLoading = false;
        });
    },
    changePage(page) {
      if (page < 1 || page > this.pagination.total_pages) {
        return;
      }
      this.getProducts(page);
      // 滾動到頂部
      window.scrollTo({ top: 0, behavior: 'smooth' });
    },
  },
  mounted() {
    this.getProducts();
  },
};
</script>
<style scoped>
img {
  object-fit: contain;
  max-width: 100%;
}

.primary-image {
  height: 300px;
}

.images {
  height: 150px;
}
</style>
