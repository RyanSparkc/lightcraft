<template>
  <div class="orders-list-view">
    <!-- 使用統一的 HeroSection 組件 -->
    <HeroSection
      title="我的訂單"
      subtitle="管理您的所有訂單，追蹤購買記錄"
      icon-class="bi bi-receipt-cutoff"
    />

    <div class="container-fluid px-4">
      <!-- 訂單統計儀表板 -->
      <div class="statistics-dashboard mb-5">
        <div class="row g-4">
          <div class="col-lg-auto col-md-4 col-sm-6">
            <div class="stat-card">
              <div class="stat-icon total">
                <i class="bi bi-list-check"></i>
              </div>
              <div class="stat-content">
                <h3 class="stat-number">{{ statistics.totalOrders }}</h3>
                <p class="stat-label">總訂單數</p>
              </div>
            </div>
          </div>
          <div class="col-lg-auto col-md-4 col-sm-6">
            <div class="stat-card">
              <div class="stat-icon pending">
                <i class="bi bi-clock-history"></i>
              </div>
              <div class="stat-content">
                <h3 class="stat-number">{{ statistics.pendingOrders }}</h3>
                <p class="stat-label">待付款</p>
              </div>
            </div>
          </div>
          <div class="col-lg-auto col-md-4 col-sm-6">
            <div class="stat-card">
              <div class="stat-icon completed">
                <i class="bi bi-check-circle"></i>
              </div>
              <div class="stat-content">
                <h3 class="stat-number">{{ statistics.completedOrders }}</h3>
                <p class="stat-label">已完成</p>
              </div>
            </div>
          </div>
          <div class="col-lg-5 col-md-12 col-sm-6">
            <div class="stat-card">
              <div class="stat-icon amount">
                <i class="bi bi-currency-dollar"></i>
              </div>
              <div class="stat-content">
                <h3 class="stat-number">NT$ {{ statistics.totalAmount }}</h3>
                <p class="stat-label">累計金額</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="row">
        <div class="col-12">
          <!-- 載入中狀態 - 改善的動畫 -->
          <div v-if="isLoading" class="loading-container">
            <div class="loading-animation">
              <div class="loading-spinner">
                <div class="bounce1"></div>
                <div class="bounce2"></div>
                <div class="bounce3"></div>
              </div>
              <h4 class="loading-text">正在載入您的訂單</h4>
              <p class="loading-subtitle">請稍候片刻...</p>
            </div>
          </div>

          <!-- 訂單列表 - 視覺增強 -->
          <div v-else-if="orders.length > 0" class="orders-container">
            <div
              v-for="order in orders"
              :key="order.id"
              class="order-card mb-4"
            >
              <div class="card border-0 shadow-sm">
                <!-- 訂單狀態標籤 -->
                <div class="order-status-ribbon" :class="getStatusClass(order)">
                  <span>{{ getStatusText(order) }}</span>
                </div>

                <div class="card-body p-4">
                  <!-- 訂單進度條 -->
                  <div class="order-progress mb-4">
                    <div class="progress-step" :class="{ active: true }">
                      <div class="step-icon">
                        <i class="bi bi-bag-check"></i>
                      </div>
                      <span class="step-label">訂單確認</span>
                    </div>
                    <div
                      class="progress-line"
                      :class="{ active: order.is_paid }"
                    ></div>
                    <div
                      class="progress-step"
                      :class="{ active: order.is_paid }"
                    >
                      <div class="step-icon">
                        <i class="bi bi-credit-card"></i>
                      </div>
                      <span class="step-label">付款完成</span>
                    </div>
                    <div
                      class="progress-line"
                      :class="{ active: order.is_paid }"
                    ></div>
                    <div
                      class="progress-step"
                      :class="{ active: order.is_paid }"
                    >
                      <div class="step-icon">
                        <i class="bi bi-truck"></i>
                      </div>
                      <span class="step-label">配送中</span>
                    </div>
                    <div
                      class="progress-line"
                      :class="{ active: order.is_paid }"
                    ></div>
                    <div
                      class="progress-step"
                      :class="{ active: order.is_paid }"
                    >
                      <div class="step-icon">
                        <i class="bi bi-house-check"></i>
                      </div>
                      <span class="step-label">已送達</span>
                    </div>
                  </div>

                  <div class="row align-items-center g-3">
                    <div class="col-lg-2 col-md-3 col-sm-6">
                      <div class="order-info-item">
                        <div class="info-icon">
                          <i class="bi bi-hash"></i>
                        </div>
                        <div class="info-content">
                          <h6 class="info-label">訂單編號</h6>
                          <p class="info-value">
                            {{ order.id.substring(0, 8) }}...
                          </p>
                        </div>
                      </div>
                    </div>
                    <div class="col-lg-2 col-md-3 col-sm-6">
                      <div class="order-info-item">
                        <div class="info-icon">
                          <i class="bi bi-calendar3"></i>
                        </div>
                        <div class="info-content">
                          <h6 class="info-label">訂單日期</h6>
                          <p class="info-value">
                            {{ formatDate(order.create_at) }}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div class="col-lg-2 col-md-3 col-sm-6">
                      <div class="order-info-item">
                        <div class="info-icon">
                          <i class="bi bi-credit-card"></i>
                        </div>
                        <div class="info-content">
                          <h6 class="info-label">付款狀態</h6>
                          <span
                            class="payment-badge"
                            :class="order.is_paid ? 'paid' : 'unpaid'"
                          >
                            <i
                              :class="order.is_paid ? 'bi bi-check-circle' : 'bi bi-exclamation-circle'"
                            ></i>
                            {{ order.is_paid ? '已付款' : '待付款' }}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div class="col-lg-2 col-md-3 col-sm-6">
                      <div class="order-info-item">
                        <div class="info-icon">
                          <i class="bi bi-box-seam"></i>
                        </div>
                        <div class="info-content">
                          <h6 class="info-label">商品數量</h6>
                          <p class="info-value">
                            {{ getProductCount(order) }} 項
                          </p>
                        </div>
                      </div>
                    </div>
                    <div class="col-lg-2 col-md-6 col-sm-6">
                      <div class="order-info-item">
                        <div class="info-icon total-icon">
                          <i class="bi bi-currency-dollar"></i>
                        </div>
                        <div class="info-content">
                          <h6 class="info-label">訂單總額</h6>
                          <p class="info-value total-amount">
                            NT$ {{ calculateOrderTotal(order) }}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div class="col-lg-2 col-md-6 col-sm-6">
                      <div class="order-actions">
                        <RouterLink
                          :to="`/order/${order.id}`"
                          class="btn btn-primary btn-sm"
                        >
                          <i class="bi bi-eye me-1"></i>
                          查看詳情
                        </RouterLink>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- 分頁 -->
            <PaginationComponent
              :pagination="pagination"
              aria-label="訂單分頁"
              @change-page="changePage"
            />
          </div>

          <!-- 空狀態 - 改善的視覺引導 -->
          <div v-else class="empty-state">
            <div class="empty-illustration">
              <div class="empty-icon">
                <i class="bi bi-bag-x"></i>
              </div>
              <div class="empty-content">
                <h3 class="empty-title">還沒有任何訂單</h3>
                <p class="empty-subtitle">
                  快去探索我們精選的商品，開始您的購物之旅吧！
                </p>
                <div class="empty-actions">
                  <RouterLink to="/products" class="btn btn-primary btn-lg">
                    <i class="bi bi-bag-plus me-2"></i>
                    開始購物
                  </RouterLink>
                  <RouterLink
                    to="/"
                    class="btn btn-outline-primary btn-lg ms-3"
                  >
                    <i class="bi bi-house me-2"></i>
                    回到首頁
                  </RouterLink>
                </div>
              </div>
            </div>
          </div>

          <!-- 錯誤狀態 - 改善的錯誤處理 -->
          <div v-if="error" class="error-state">
            <div class="error-icon">
              <i class="bi bi-exclamation-triangle"></i>
            </div>
            <h4 class="error-title">載入失敗</h4>
            <p class="error-message">{{ error }}</p>
            <button class="btn btn-primary" @click="fetchOrders">
              <i class="bi bi-arrow-clockwise me-2"></i>
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
import PaginationComponent from '@/components/PaginationComponent.vue';
import HeroSection from '@/components/HeroSection.vue';

export default {
  name: 'OrdersListView',
  components: {
    PaginationComponent,
    HeroSection,
  },
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
    statistics() {
      const totalOrders = this.orders.length;
      const pendingOrders = this.orders.filter((order) => !order.is_paid).length;
      const completedOrders = this.orders.filter((order) => order.is_paid).length;
      const totalAmount = this.orders.reduce((sum, order) => {
        const orderTotal = this.getOrderTotalNumber(order);
        return sum + orderTotal;
      }, 0);

      return {
        totalOrders,
        pendingOrders,
        completedOrders,
        totalAmount: Math.round(totalAmount).toLocaleString(),
      };
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

      if (Array.isArray(order.products)) {
        return order.products.length;
      }

      if (typeof order.products === 'object') {
        return Object.keys(order.products).length;
      }

      return 0;
    },
    calculateOrderTotal(order) {
      const total = this.getOrderTotalNumber(order);
      return Math.round(total).toLocaleString();
    },
    getOrderTotalNumber(order) {
      // 根據使用者反饋，後端 API 在有優惠券時，會將 `order.total` 誤存為「折扣金額」。
      // 此為前端的修正邏輯，以確保顯示正確的訂單總額。

      // 如果沒有 products 資訊，無法重新計算，回傳原始 total
      if (!order.products) {
        return Number(order.total || 0);
      }

      // 將 products 正規化為陣列
      const productItems = Array.isArray(order.products)
        ? order.products
        : Object.values(order.products);

      // 檢查訂單中是否有任何商品使用了 coupon
      const couponApplied = productItems.some((item) => item.coupon);

      if (couponApplied) {
        // 如果有使用優惠券，則重新計算正確總額
        // 1. 計算折扣前的商品總計 (subtotal)
        const subtotal = productItems.reduce(
          (sum, item) => sum + Number(item.total || 0),
          0,
        );
        // 2. `order.total` 此時是折扣金額
        const discountAmount = Number(order.total || 0);
        // 3. 正確的最終金額 = 商品總計 - 折扣金額
        return subtotal - discountAmount;
      }

      // 如果沒有使用優惠券，API 的 `order.total` 是正確的
      return Number(order.total || 0);
    },
    getStatusClass(order) {
      return order.is_paid ? 'completed' : 'pending';
    },
    getStatusText(order) {
      return order.is_paid ? '已完成' : '處理中';
    },
  },
  mounted() {
    this.fetchOrders();
  },
};
</script>

<style scoped>
/* 統計儀表板 */
.statistics-dashboard {
  margin-top: -1rem;
  position: relative;
  z-index: 10;
}

.stat-card {
  background: white;
  border-radius: 1rem;
  padding: 2rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  transition: all 0.3s ease;
}

.stat-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.15);
}

.stat-icon {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  margin-right: 1rem;
}

.stat-icon.total {
  background: #ffc107;
  color: #333;
}

.stat-icon.pending {
  background: #ff9800;
  color: #333;
}

.stat-icon.completed {
  background: #4caf50;
  color: white;
}

.stat-icon.amount {
  background: #2196f3;
  color: white;
}

.stat-number {
  font-size: 2rem;
  font-weight: 700;
  margin: 0;
  color: #333;
}

.stat-label {
  color: #6c757d;
  margin: 0;
  font-size: 0.9rem;
}

/* 載入動畫改善 */
.loading-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 400px;
}

.loading-animation {
  text-align: center;
}

.loading-spinner {
  display: flex;
  justify-content: center;
  margin-bottom: 2rem;
}

.loading-spinner > div {
  width: 18px;
  height: 18px;
  background-color: #ffc107;
  border-radius: 100%;
  display: inline-block;
  animation: sk-bouncedelay 1.4s infinite ease-in-out both;
}

.loading-spinner .bounce1 {
  animation-delay: -0.32s;
}

.loading-spinner .bounce2 {
  animation-delay: -0.16s;
}

@keyframes sk-bouncedelay {
  0%, 80%, 100% {
    transform: scale(0);
  } 40% {
    transform: scale(1.0);
  }
}

.loading-text {
  color: #333;
  margin-bottom: 0.5rem;
}

.loading-subtitle {
  color: #6c757d;
}

/* 訂單卡片視覺增強 */
.orders-list-view {
  min-height: 500px;
  background: #f8f9fa;
  padding-bottom: 3rem;
}

.container-fluid {
  max-width: 1200px;
}

.order-card {
  transition: all 0.3s ease;
}

.order-card:hover {
  transform: translateY(-3px);
}

.card {
  border-radius: 1rem;
  overflow: hidden;
  position: relative;
}

.order-status-ribbon {
  position: absolute;
  top: 0;
  right: 0;
  padding: 0.5rem 1rem;
  font-size: 0.8rem;
  font-weight: 600;
  color: white;
  z-index: 5;
  border-bottom-left-radius: 0.5rem;
}

.order-status-ribbon.pending {
  background: #ff9800;
}

.order-status-ribbon.completed {
  background: #4caf50;
}

/* 訂單進度條 */
.order-progress {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 2rem;
  padding: 1rem;
  background: #f8f9fa;
  border-radius: 0.5rem;
}

.progress-step {
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
}

.step-icon {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: #e9ecef;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 0.5rem;
  transition: all 0.3s ease;
}

.progress-step.active .step-icon {
  background: #ffc107;
  color: #333;
}

.step-label {
  font-size: 0.75rem;
  color: #6c757d;
  text-align: center;
}

.progress-step.active .step-label {
  color: #333;
  font-weight: 600;
}

.progress-line {
  flex: 1;
  height: 2px;
  background: #e9ecef;
  margin: 0 1rem;
  position: relative;
  top: -20px;
}

.progress-line.active {
  background: #ffc107;
}

/* 訂單資訊項目 */
.order-info-item {
  display: flex;
  align-items: center;
}

.info-icon {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: #f8f9fa;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 1rem;
  color: #ffc107;
  font-size: 1.1rem;
}

.total-icon {
  background: #ffc107;
  color: #333;
}

.info-label {
  font-size: 0.75rem;
  color: #6c757d;
  margin: 0 0 0.25rem 0;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.info-value {
  font-size: 0.9rem;
  margin: 0;
  color: #333;
  font-weight: 500;
}

.total-amount {
  font-size: 1.1rem;
  font-weight: 700;
  color: #ffc107;
}

.payment-badge {
  display: inline-flex;
  align-items: center;
  padding: 0.25rem 0.75rem;
  border-radius: 1rem;
  font-size: 0.8rem;
  font-weight: 600;
}

.payment-badge.paid {
  background: #e8f5e8;
  color: #2e7d32;
}

.payment-badge.unpaid {
  background: #fff8e1;
  color: #f57c00;
}

.payment-badge i {
  margin-right: 0.25rem;
}

.order-actions {
  text-align: center;
}

.btn-primary {
  background: #ffc107;
  border: none;
  border-radius: 0.5rem;
  padding: 0.5rem 1rem;
  font-weight: 600;
  transition: all 0.3s ease;
  color: #333;
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 15px rgba(255, 193, 7, 0.4);
  background: #ffb300;
}

/* 空狀態改善 */
.empty-state {
  text-align: center;
  padding: 4rem 2rem 6rem 2rem;
}

.empty-illustration {
  max-width: 400px;
  margin: 0 auto;
}

.empty-icon {
  font-size: 6rem;
  color: #e9ecef;
  margin-bottom: 2rem;
}

.empty-title {
  font-size: 2rem;
  font-weight: 700;
  color: #333;
  margin-bottom: 1rem;
}

.empty-subtitle {
  font-size: 1.1rem;
  color: #6c757d;
  margin-bottom: 2rem;
  line-height: 1.6;
}

.empty-actions {
  display: flex;
  justify-content: center;
  gap: 1rem;
  flex-wrap: wrap;
}

/* 錯誤狀態 */
.error-state {
  text-align: center;
  padding: 4rem 2rem 6rem 2rem;
}

.error-icon {
  font-size: 4rem;
  color: #dc3545;
  margin-bottom: 1rem;
}

.error-title {
  color: #333;
  margin-bottom: 1rem;
}

.error-message {
  color: #6c757d;
  margin-bottom: 2rem;
}

/* 響應式設計 */
@media (max-width: 992px) {
  .hero-title {
    font-size: 2.5rem;
  }

  .hero-icon {
    font-size: 3rem;
    margin-top: 1rem;
  }

  .order-progress {
    padding: 0.75rem;
  }

  .step-icon {
    width: 35px;
    height: 35px;
  }

  .step-label {
    font-size: 0.7rem;
  }
}

@media (max-width: 768px) {
  .hero-title {
    font-size: 2rem;
  }

  .hero-subtitle {
    font-size: 1rem;
  }

  .stat-card {
    padding: 1.5rem;
  }

  .stat-number {
    font-size: 1.5rem;
  }

  .order-progress {
    flex-direction: column;
    gap: 1rem;
  }

  .progress-line {
    display: none;
  }

  .order-info-item {
    margin-bottom: 1rem;
  }

  .empty-icon {
    font-size: 4rem;
  }

  .empty-title {
    font-size: 1.5rem;
  }

  .empty-actions {
    flex-direction: column;
    align-items: center;
  }

  .pagination {
    margin-bottom: 3rem;
  }

  .orders-list-view {
    padding-bottom: 2rem;
  }
}

@media (max-width: 576px) {
  .hero-section {
    margin-bottom: 1rem;
  }

  .statistics-dashboard {
    margin-top: 0;
  }

  .stat-card {
    padding: 1rem;
    flex-direction: column;
    text-align: center;
  }

  .stat-icon {
    margin-right: 0;
    margin-bottom: 1rem;
  }

  .info-icon {
    width: 35px;
    height: 35px;
    margin-right: 0.75rem;
  }

  .order-status-ribbon {
    font-size: 0.7rem;
    padding: 0.375rem 0.75rem;
  }
}
</style>
