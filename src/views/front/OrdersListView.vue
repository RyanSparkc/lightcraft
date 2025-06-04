<template>
  <div class="orders-list-view">
    <div class="container-fluid px-4">
      <div class="row">
        <div class="col-12">
          <h2 class="mb-4 fw-bold text-dark">我的訂單</h2>

          <!-- 載入中狀態 -->
          <div v-if="isLoading" class="text-center py-5">
            <div class="spinner-border text-primary" role="status">
              <span class="visually-hidden">載入中...</span>
            </div>
            <p class="mt-3 text-muted">正在載入訂單資料...</p>
          </div>

          <!-- 訂單列表 -->
          <div v-else-if="orders.length > 0" class="orders-container">
            <div
              v-for="order in orders"
              :key="order.id"
              class="order-card mb-4"
            >
              <div class="card border-2 border-dark shadow-sm">
                <div class="card-body p-4">
                  <div class="row align-items-center g-3">
                    <div class="col-lg-2 col-md-3 col-sm-6">
                      <h6 class="card-title mb-1 text-muted">訂單編號</h6>
                      <p class="card-text small fw-medium">{{ order.id }}</p>
                    </div>
                    <div class="col-lg-2 col-md-3 col-sm-6">
                      <h6 class="card-title mb-1 text-muted">訂單日期</h6>
                      <p class="card-text small">
                        {{ formatDate(order.create_at) }}
                      </p>
                    </div>
                    <div class="col-lg-2 col-md-3 col-sm-6">
                      <h6 class="card-title mb-1 text-muted">付款狀態</h6>
                      <span
                        :class="['badge', order.is_paid ? 'bg-success' : 'bg-warning text-dark']"
                      >
                        {{ order.is_paid ? '已付款' : '未付款' }}
                      </span>
                    </div>
                    <div class="col-lg-2 col-md-3 col-sm-6">
                      <h6 class="card-title mb-1 text-muted">商品數量</h6>
                      <p class="card-text">{{ getProductCount(order) }} 項</p>
                    </div>
                    <div class="col-lg-2 col-md-6 col-sm-6">
                      <h6 class="card-title mb-1 text-muted">訂單總額</h6>
                      <p class="card-text fw-bold text-dark fs-5">
                        NT$ {{ calculateOrderTotal(order) }}
                      </p>
                    </div>
                    <div class="col-lg-2 col-md-6 col-sm-6 text-end">
                      <RouterLink
                        :to="`/order/${order.id}`"
                        class="btn btn-outline-dark btn-sm px-3"
                      >
                        查看詳情
                      </RouterLink>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- 分頁 -->
            <nav
              v-if="pagination.total_pages > 1"
              aria-label="訂單分頁"
              class="mt-5"
            >
              <ul class="pagination justify-content-center mb-0">
                <li
                  class="page-item"
                  :class="{ disabled: !pagination.has_pre }"
                >
                  <button
                    class="page-link custom-page-link"
                    @click="changePage(pagination.current_page - 1)"
                    :disabled="!pagination.has_pre"
                  >
                    上一頁
                  </button>
                </li>
                <li
                  v-for="page in displayPages"
                  :key="page"
                  class="page-item"
                  :class="{ active: page === pagination.current_page }"
                >
                  <button
                    class="page-link custom-page-link"
                    :class="{ 'active-page': page === pagination.current_page }"
                    @click="changePage(page)"
                  >
                    {{ page }}
                  </button>
                </li>
                <li
                  class="page-item"
                  :class="{ disabled: !pagination.has_next }"
                >
                  <button
                    class="page-link custom-page-link"
                    @click="changePage(pagination.current_page + 1)"
                    :disabled="!pagination.has_next"
                  >
                    下一頁
                  </button>
                </li>
              </ul>
            </nav>
          </div>

          <!-- 空狀態 -->
          <div v-else class="text-center py-5">
            <div class="mb-4">
              <i class="bi bi-bag-x display-1 text-muted"></i>
            </div>
            <h4 class="text-muted mb-3">尚無訂單記錄</h4>
            <p class="text-muted mb-4">您還沒有任何訂單，快去選購商品吧！</p>
            <RouterLink to="/products" class="btn btn-dark px-4 py-2">
              立即購物
            </RouterLink>
          </div>

          <!-- 錯誤狀態 -->
          <div v-if="error" class="alert alert-danger mt-4" role="alert">
            <h4 class="alert-heading">載入失敗</h4>
            <p class="mb-3">{{ error }}</p>
            <button class="btn btn-outline-danger" @click="fetchOrders">
              重新載入
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'OrdersListView',
  data() {
    return {
      orders: [],
      pagination: {
        total_pages: 1,
        current_page: 1,
        has_pre: false,
        has_next: false,
      },
      isLoading: false,
      error: null,
    };
  },
  computed: {
    displayPages() {
      const pages = [];
      const totalPages = this.pagination.total_pages;
      const currentPage = this.pagination.current_page;

      // 簡單的分頁顯示邏輯
      for (let i = 1; i <= totalPages; i += 1) {
        if (
          i === 1
          || i === totalPages
          || (i >= currentPage - 2 && i <= currentPage + 2)
        ) {
          pages.push(i);
        }
      }
      return pages;
    },
  },
  methods: {
    async fetchOrders(page = 1) {
      try {
        this.isLoading = true;
        this.error = null;

        const { VITE_APP_URL, VITE_APP_PATH } = import.meta.env;
        const response = await axios.get(
          `${VITE_APP_URL}/api/${VITE_APP_PATH}/orders?page=${page}`,
        );

        if (response.data.success) {
          this.orders = response.data.orders;
          this.pagination = response.data.pagination;
        } else {
          throw new Error('獲取訂單列表失敗');
        }
      } catch (error) {
        this.error = error.response?.data?.message
          || error.message
          || '獲取訂單列表失敗';
      } finally {
        this.isLoading = false;
      }
    },
    changePage(page) {
      if (page >= 1 && page <= this.pagination.total_pages) {
        this.fetchOrders(page);
        // 滾動到頁面頂部
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    },
    formatDate(timestamp) {
      if (!timestamp) return '';
      const date = new Date(timestamp * 1000);
      return date.toLocaleDateString('zh-TW', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
      });
    },
    getProductCount(order) {
      if (!order.products) return 0;

      // 如果 products 是陣列，直接返回長度
      if (Array.isArray(order.products)) {
        return order.products.length;
      }

      // 如果 products 是物件，返回 key 的數量
      if (typeof order.products === 'object') {
        return Object.keys(order.products).length;
      }

      return 0;
    },
    calculateOrderTotal(order) {
      // 如果 API 直接提供 total 欄位，優先使用
      if (order.total !== undefined && order.total !== null) {
        return Math.round(order.total).toLocaleString();
      }

      // 如果沒有 total 欄位，但有 products 資料，嘗試計算
      if (!order.products) return '0';

      let total = 0;

      // 處理陣列格式的 products
      if (Array.isArray(order.products)) {
        total = order.products.reduce((sum, item) => {
          // 如果有 final_total 欄位（包含優惠後價格），使用它
          if (item.final_total !== undefined) {
            return sum + Number(item.final_total);
          }
          // 否則用 product 的 price * qty
          const price = Number(item.product?.price) || 0;
          const qty = Number(item.qty) || 0;
          return sum + (price * qty);
        }, 0);
      } else if (typeof order.products === 'object') {
        // 處理物件格式的 products
        const productArray = Object.values(order.products);
        total = productArray.reduce((sum, item) => {
          if (item.final_total !== undefined) {
            return sum + Number(item.final_total);
          }
          const price = Number(item.product?.price) || 0;
          const qty = Number(item.qty) || 0;
          return sum + (price * qty);
        }, 0);
      }

      return Math.round(total).toLocaleString();
    },
  },
  mounted() {
    this.fetchOrders();
  },
};
</script>

<style scoped>
.orders-list-view {
  min-height: 500px;
  padding: 2rem 0;
}

.container-fluid {
  max-width: 1200px;
}

.order-card {
  transition: all 0.3s ease;
  border-radius: 0.5rem;
}

.order-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1) !important;
}

.card {
  border-radius: 0.5rem;
  overflow: hidden;
}

.card-title {
  font-size: 0.75rem;
  font-weight: 600;
  color: #6c757d;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.card-text {
  font-size: 0.9rem;
  margin-bottom: 0;
  color: #495057;
}

.badge {
  font-size: 0.75rem;
  padding: 0.4rem 0.8rem;
  border-radius: 0.375rem;
}

/* 自訂分頁樣式 */
.pagination {
  margin-top: 3rem;
  gap: 0.25rem;
}

.custom-page-link {
  border: 2px solid #e9ecef;
  color: #6c757d;
  background-color: #fff;
  padding: 0.5rem 0.75rem;
  margin: 0 0.125rem;
  border-radius: 0.375rem;
  font-weight: 500;
  transition: all 0.2s ease;
  text-decoration: none;
  min-width: 44px;
  text-align: center;
}

.custom-page-link:hover:not(:disabled) {
  border-color: #333;
  color: #333;
  background-color: rgba(0, 0, 0, 0.04);
}

.custom-page-link:focus {
  box-shadow: 0 0 0 0.25rem rgba(0, 0, 0, 0.25);
  border-color: #333;
  color: #333;
}

.custom-page-link.active-page,
.page-item.active .custom-page-link {
  background-color: #333;
  border-color: #333;
  color: #fff;
}

.custom-page-link:disabled {
  color: #adb5bd;
  background-color: #f8f9fa;
  border-color: #e9ecef;
  cursor: not-allowed;
}

.page-item.disabled .custom-page-link:hover {
  border-color: #e9ecef;
  color: #adb5bd;
  background-color: #f8f9fa;
}

/* Bootstrap 覆寫 */
.page-item.active .page-link {
  z-index: 3;
  background-color: #333;
  border-color: #333;
}

.btn-dark {
  background-color: #333;
  border-color: #333;
}

.btn-dark:hover {
  background-color: #222;
  border-color: #222;
}

.btn-outline-dark {
  color: #333;
  border-color: #333;
}

.btn-outline-dark:hover {
  background-color: #333;
  border-color: #333;
  color: #fff;
}

.text-dark {
  color: #333 !important;
}

.display-1 {
  font-size: 4rem;
}

/* 響應式設計 */
@media (max-width: 992px) {
  .order-card .row > div {
    margin-bottom: 1rem;
  }

  .order-card .col-lg-2:last-child {
    text-align: center !important;
  }
}

@media (max-width: 768px) {
  .orders-list-view {
    padding: 1rem 0;
  }

  .container-fluid {
    padding-left: 1rem;
    padding-right: 1rem;
  }

  .card-body {
    padding: 1.5rem !important;
  }

  .order-card .row > div {
    margin-bottom: 0.75rem;
  }

  .pagination {
    margin-top: 2rem;
  }

  .custom-page-link {
    padding: 0.375rem 0.625rem;
    font-size: 0.875rem;
    min-width: 38px;
  }
}

@media (max-width: 576px) {
  h2 {
    font-size: 1.75rem;
  }

  .display-1 {
    font-size: 3rem;
  }

  .card-text.fw-bold {
    font-size: 1.1rem !important;
  }
}
</style>
