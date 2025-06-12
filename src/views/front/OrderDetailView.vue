<template>
  <div class="order-detail-container container my-5">
    <!-- 返回按鈕 -->
    <div class="mb-4">
      <button class="btn btn-outline-secondary" @click="$router.go(-1)">
        <i class="bi bi-arrow-left me-2"></i>返回
      </button>
    </div>

    <!-- 訂單狀態卡片 -->
    <div class="card mb-4" v-if="hasOrderData">
      <div class="card-body">
        <div class="d-flex justify-content-between align-items-center mb-3">
          <h4 class="card-title mb-0">訂單 #{{ order.id || '123456' }}</h4>
          <span
            :class="[
              'order-status px-3 py-1 rounded-pill flex-shrink-0',
              { 'bg-success text-white': order.is_paid, 'bg-warning': !order.is_paid }
            ]"
          >
            {{ order.is_paid ? '已付款' : '待付款' }}
          </span>
        </div>
        <div class="row mt-3">
          <div class="col-md-6">
            <p class="text-muted mb-1">訂單日期</p>
            <p class="mb-3">{{ formatDate(order.create_at) }}</p>
          </div>
          <div class="col-md-6">
            <p class="text-muted mb-1">付款日期</p>
            <p class="mb-3">
              {{ order.paid_date ? formatDate(order.paid_date) : '尚未付款' }}
            </p>
          </div>
          <div class="col-md-6">
            <p class="text-muted mb-1">配送狀態</p>
            <p class="mb-3">
              <span
                class="badge bg-secondary"
                >{{ getShippingStatus(order) }}</span
              >
            </p>
          </div>
          <div class="col-md-6">
            <p class="text-muted mb-1">付款方式</p>
            <p class="mb-3">{{ getPaymentMethod(order) }}</p>
          </div>
        </div>

        <!-- 未付款時顯示付款按鈕 -->
        <div v-if="!order.is_paid" class="mt-3 pt-3 border-top">
          <div class="d-flex justify-content-end">
            <button class="btn btn-primary btn-lg px-4" @click="goToPayment">
              <i class="bi bi-credit-card me-2"></i>
              前往付款
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- 配送追蹤區塊 -->
    <div class="card mb-4" v-if="hasOrderData">
      <div class="card-header bg-white border-bottom-0 py-3">
        <h5 class="mb-0">配送追蹤</h5>
      </div>
      <div class="card-body">
        <div class="mb-3">
          <p class="text-muted mb-1">物流單號</p>
          <p class="mb-0 fw-medium">TW123456789</p>
        </div>
        <!-- 水平追蹤時間軸 -->
        <div class="tracking-timeline-horizontal">
          <div class="tracking-item-horizontal active">
            <div class="tracking-icon-horizontal">
              <i class="bi bi-check-circle-fill"></i>
            </div>
            <div class="tracking-content-horizontal">
              <p class="tracking-title">訂單已確認</p>
              <p class="tracking-date">{{ formatDate(order.create_at) }}</p>
            </div>
          </div>
          <div
            class="tracking-item-horizontal"
            :class="{ active: order.is_paid }"
          >
            <div class="tracking-icon-horizontal">
              <i class="bi bi-credit-card"></i>
            </div>
            <div class="tracking-content-horizontal">
              <p class="tracking-title">付款完成</p>
              <p class="tracking-date">
                {{ order.paid_date ? formatDate(order.paid_date) : '待處理' }}
              </p>
            </div>
          </div>
          <div class="tracking-item-horizontal">
            <div class="tracking-icon-horizontal">
              <i class="bi bi-box-seam"></i>
            </div>
            <div class="tracking-content-horizontal">
              <p class="tracking-title">商品已出貨</p>
              <p class="tracking-date">待處理</p>
            </div>
          </div>
          <div class="tracking-item-horizontal">
            <div class="tracking-icon-horizontal">
              <i class="bi bi-house-door"></i>
            </div>
            <div class="tracking-content-horizontal">
              <p class="tracking-title">商品已送達</p>
              <p class="tracking-date">待處理</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 訂單內容與收件人資訊 -->
    <div class="row" v-if="hasOrderData">
      <!-- 訂單商品 -->
      <div class="col-lg-8 mb-4">
        <div class="card h-100">
          <div class="card-header bg-white border-bottom-0 py-3">
            <h5 class="mb-0">訂單商品</h5>
          </div>
          <div class="card-body">
            <div class="table-responsive">
              <table class="table mb-0">
                <thead class="table-light">
                  <tr>
                    <th class="border-0">商品</th>
                    <th class="border-0 text-center">單價</th>
                    <th class="border-0 text-center">數量</th>
                    <th class="border-0 text-end">小計</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="item in orderProducts" :key="item.id">
                    <td>
                      <div class="d-flex align-items-center">
                        <img
                          :src="item.product?.imageUrl"
                          class="img-fluid me-3"
                          style="width: 60px; height: 60px; object-fit: cover;"
                          alt="商品圖片"
                        />
                        <div>
                          <h6 class="mb-0">{{ item.product?.title }}</h6>
                          <small
                            class="text-muted"
                            >{{ item.product?.category }}</small
                          >
                        </div>
                      </div>
                    </td>
                    <td class="text-center align-middle">
                      NT$ {{ formatPrice(item.product?.price) }}
                    </td>
                    <td class="text-center align-middle">
                      {{ item.qty }}
                    </td>
                    <td class="text-end align-middle">
                      NT$ {{ formatPrice(item.final_total) }}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      <!-- 收件人資訊與金額摘要 -->
      <div class="col-lg-4">
        <!-- 收件人資訊 -->
        <div class="card mb-4">
          <div class="card-header bg-white border-bottom-0 py-3">
            <h5 class="mb-0">收件人資訊</h5>
          </div>
          <div class="card-body">
            <div class="mb-3">
              <p class="text-muted mb-1">姓名</p>
              <p class="mb-0 fw-medium">{{ order.user?.name }}</p>
            </div>
            <div class="mb-3">
              <p class="text-muted mb-1">電話</p>
              <p class="mb-0 fw-medium">{{ order.user?.tel }}</p>
            </div>
            <div class="mb-3">
              <p class="text-muted mb-1">Email</p>
              <p class="mb-0 fw-medium">{{ order.user?.email }}</p>
            </div>
            <div>
              <p class="text-muted mb-1">地址</p>
              <p class="mb-0 fw-medium">{{ order.user?.address }}</p>
            </div>
          </div>
        </div>

        <!-- 訂單金額摘要 -->
        <div class="card">
          <div class="card-header bg-white border-bottom-0 py-3">
            <h5 class="mb-0">金額摘要</h5>
          </div>
          <div class="card-body">
            <div class="d-flex justify-content-between mb-2">
              <span>商品總額</span>
              <span>NT$ {{ formatPrice(subtotal) }}</span>
            </div>
            <div class="d-flex justify-content-between mb-2">
              <span>運費</span>
              <span>NT$ 0</span>
            </div>
            <div class="d-flex justify-content-between mb-3" v-if="hasDiscount">
              <span>優惠折扣</span>
              <span class="text-danger"
                >-NT$ {{ formatPrice(finalTotal) }}</span
              >
            </div>
            <hr />
            <div class="d-flex justify-content-between">
              <span class="fw-bold">總計</span>
              <span class="fw-bold">NT$ {{ formatPrice(discountAmount) }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 載入中狀態 -->
    <div class="text-center py-5" v-if="isLoading">
      <div class="spinner-border text-primary" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
      <p class="mt-3">正在獲取訂單資料...</p>
    </div>

    <!-- 無訂單資料時顯示的內容 -->
    <div class="text-center py-5" v-if="!isLoading && (!order || !order.id)">
      <h4>找不到訂單資料</h4>
      <p class="text-muted">請確認訂單號碼是否正確</p>
      <button class="btn btn-primary mt-3" @click="$router.push('/')">
        返回首頁
      </button>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'OrderDetailView',
  data() {
    return {
      order: {},
      isLoading: false,
      // 付款方式對照表
      paymentMethods: {
        credit_card: '信用卡',
        credit: '信用卡',
        atm: 'ATM 轉帳',
        transfer: '銀行轉帳',
        bank_transfer: '銀行轉帳',
      },
    };
  },
  computed: {
    // 檢查是否有有效的訂單數據
    hasOrderData() {
      return this.order && this.order.id;
    },
    orderProducts() {
      if (!this.order.products) return [];
      return Object.values(this.order.products);
    },
    // 計算商品原始總額（基於商品原價）
    subtotal() {
      if (!this.orderProducts.length) return 0;
      return this.orderProducts.reduce((sum, item) => {
        const originalPrice = Number(item.product?.price) || 0;
        const qty = Number(item.qty) || 0;
        return sum + (originalPrice * qty);
      }, 0);
    },
    // 最終金額（計算所有商品的 final_total 總和）
    finalTotal() {
      if (!this.orderProducts.length) return 0;
      return this.orderProducts.reduce((sum, item) => {
        const itemFinalTotal = Number(item.final_total) || 0;
        return sum + itemFinalTotal;
      }, 0);
    },
    // 計算優惠折扣金額
    discountAmount() {
      const discount = this.subtotal - this.finalTotal;
      return discount > 0 ? discount : 0;
    },
    // 是否有優惠折扣
    hasDiscount() {
      return this.discountAmount > 0;
    },
  },
  methods: {
    async getOrder(orderId) {
      if (!orderId) {
        console.error('訂單 ID 無效');
        return;
      }

      const { VITE_APP_URL, VITE_APP_PATH } = import.meta.env;
      this.isLoading = true;

      try {
        const url = `${VITE_APP_URL}/api/${VITE_APP_PATH}/order/${orderId}`;
        const response = await axios.get(url);
        this.order = response.data.order;
      } catch (error) {
        console.error('獲取訂單失敗', error);
        // 如果是 404，顯示找不到訂單
        if (error.response?.status === 404) {
          this.order = null;
        }
      } finally {
        this.isLoading = false;
      }
    },
    formatDate(timestamp) {
      if (!timestamp) return '無資料';
      const date = new Date(timestamp * 1000);
      return date.toLocaleString('zh-TW', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      });
    },
    formatPrice(price) {
      const numericPrice = Number(price);
      if (!numericPrice || Number.isNaN(numericPrice)) {
        return '0';
      }
      return Math.round(numericPrice).toLocaleString();
    },
    getShippingStatus(order) {
      if (!order.is_paid) return '待付款';
      return '備貨中';
    },
    getPaymentMethod(order) {
      if (!order?.payment_method) return '未設定';
      return this.paymentMethods[order.payment_method] || '其他方式';
    },
    goToPayment() {
      // 保存當前訂單的商品資料到 localStorage，以便付款頁面使用
      const orderCartData = {
        carts: this.orderProducts.map((item) => ({
          id: item.id,
          product: item.product,
          qty: item.qty,
        })),
        total: this.subtotal,
        final_total: this.finalTotal,
      };

      localStorage.setItem('orderCartData', JSON.stringify(orderCartData));

      // 跳轉到付款頁面，並帶上訂單 ID
      this.$router.push({
        path: '/checkout/payment',
        query: { orderId: this.order.id },
      });
    },
  },
  created() {
    const orderId = this.$route.params.id;
    if (orderId) {
      this.getOrder(orderId);
    }
  },
};
</script>

<style scoped>
.order-status {
  font-size: 0.875rem;
  font-weight: 500;
}

/* 水平時間軸樣式 */
.tracking-timeline-horizontal {
  display: flex;
  justify-content: space-between;
  position: relative;
  margin-top: 1.5rem;
  overflow-x: auto;
  padding-bottom: 1rem;
}

.tracking-timeline-horizontal::before {
  content: '';
  position: absolute;
  left: 0;
  right: 0;
  top: 16px;
  height: 2px;
  background: #e0e0e0;
  z-index: 1;
}

.tracking-item-horizontal {
  flex: 1;
  min-width: 110px;
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 0 10px;
}

.tracking-item-horizontal.active {
}

.tracking-icon-horizontal {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: white;
  border: 2px solid #dee2e6;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 8px;
  position: relative;
  z-index: 2;
}

.tracking-item-horizontal.active .tracking-icon-horizontal {
  border-color: #3490dc;
}

.tracking-icon-horizontal i {
  color: #adb5bd;
  font-size: 1rem;
}

.tracking-item-horizontal.active .tracking-icon-horizontal i {
  color: #3490dc;
}

.tracking-content-horizontal {
  padding-top: 5px;
}

.tracking-item-horizontal:not(.active) .tracking-content-horizontal {
  opacity: 0.6;
}

.tracking-content-horizontal .tracking-title {
  font-size: 0.875rem;
  margin-bottom: 4px;
}

.tracking-content-horizontal .tracking-date {
  font-size: 0.75rem;
}

/* Add new card styles here */
.card {
  border: 1px solid #ddd;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
}

.card .card-header:first-child {
  border-top-left-radius: 12px;
  border-top-right-radius: 12px;
}

.btn-primary:hover {
  background-color: #354298;
  border-color: #354298;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(63, 81, 181, 0.3);
}

.btn-primary:focus {
  box-shadow: 0 0 0 0.25rem rgba(63, 81, 181, 0.25);
}
</style>
