<template>
  <div class="order-detail-container my-5">
    <!-- 返回按鈕 -->
    <div class="mb-4">
      <button class="btn btn-outline-secondary" @click="$router.go(-1)">
        <i class="bi bi-arrow-left me-2"></i>返回
      </button>
    </div>

    <!-- 訂單狀態卡片 -->
    <div class="card mb-4">
      <div class="card-body">
        <div class="d-flex justify-content-between align-items-center mb-3">
          <h4 class="card-title mb-0">訂單 #{{ order.id || '123456' }}</h4>
          <span
            :class="[
              'order-status px-3 py-1 rounded-pill',
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
      </div>
    </div>

    <!-- 配送追蹤區塊 (移到了商品上方) -->
    <div class="card mb-4">
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
    <div class="row">
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
              <span>NT$ {{ formatPrice(order.total) }}</span>
            </div>
            <div class="d-flex justify-content-between mb-2">
              <span>運費</span>
              <span>NT$ 0</span>
            </div>
            <div
              class="d-flex justify-content-between mb-3"
              v-if="order.total !== order.final_total"
            >
              <span>優惠折扣</span>
              <span class="text-danger"
                >-NT$ {{ formatPrice(order.total - order.final_total) }}</span
              >
            </div>
            <hr />
            <div class="d-flex justify-content-between">
              <span class="fw-bold">總計</span>
              <span class="fw-bold"
                >NT$ {{ formatPrice(order.final_total) }}</span
              >
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 無訂單資料時顯示的內容 -->
    <div class="text-center py-5" v-if="isLoading">
      <div class="spinner-border text-primary" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
      <p class="mt-3">正在獲取訂單資料...</p>
    </div>
    <div class="text-center py-5" v-if="!isLoading && !order.id">
      <h4>找不到訂單資料</h4>
      <p class="text-muted">請確認訂單號碼是否正確</p>
      <button class="btn btn-primary mt-3" @click="$router.push('/')">
        返回首頁
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'OrderDetailView',
  data() {
    return {
      order: {
        id: '123456',
        create_at: Date.now() / 1000,
        is_paid: true,
        paid_date: Date.now() / 1000,
        total: 3600,
        final_total: 3200,
        user: {
          name: '王小明',
          email: 'user@example.com',
          tel: '0912345678',
          address: '台北市信義區松高路1號',
        },
        products: {
          '-NhtLCr6J2EEJQPbYz0o': {
            id: '-NhtLCr6J2EEJQPbYz0o',
            product_id: '-NhiJPttcwr6FDk-F9Gv',
            qty: 2,
            product: {
              title: '質感皮革後背包',
              price: 1200,
              imageUrl: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1049&q=80',
              category: '包款',
            },
            final_total: 2400,
          },
          '-NhtLCr6J2EEJQPbYz0p': {
            id: '-NhtLCr6J2EEJQPbYz0p',
            product_id: '-NhiJPttcwr6FDk-F9Gw',
            qty: 1,
            product: {
              title: '時尚運動鞋',
              price: 1200,
              imageUrl: 'https://images.unsplash.com/photo-1549298916-b21f9d7c1ae1?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1001&q=80',
              category: '鞋類',
            },
            final_total: 1200,
          },
        },
        payment_method: 'credit_card',
      },
      isLoading: false,
    };
  },
  computed: {
    orderProducts() {
      if (!this.order.products) return [];
      return Object.values(this.order.products);
    },
  },
  methods: {
    getOrder(orderId) {
      // 這裡實際專案中應該從 API 獲取訂單數據
      // this.isLoading = true;
      // const url = `${VITE_APP_URL}/api/${VITE_APP_PATH}/order/${orderId}`;
      // axios.get(url).then((response) => {
      //   this.order = response.data.order;
      // }).catch((error) => {
      //   console.error('獲取訂單失敗', error);
      // }).finally(() => {
      //   this.isLoading = false;
      // });

      console.log('獲取訂單：', orderId);
      // 目前使用模擬數據
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
      return Math.round(price).toLocaleString();
    },
    getShippingStatus(order) {
      if (!order.is_paid) return '待付款';
      return '備貨中';
    },
    getPaymentMethod(order) {
      const methods = {
        credit_card: '信用卡',
        atm: 'ATM 轉帳',
        bank_transfer: '銀行轉帳',
      };
      return methods[order.payment_method] || '其他方式';
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

/* 垂直時間軸樣式 (保留但不再使用) */
.tracking-timeline {
  position: relative;
  padding-left: 30px;
}

.tracking-item {
  position: relative;
  padding-bottom: 25px;
  opacity: 0.5;
}

.tracking-item.active {
  opacity: 1;
}

.tracking-item:last-child {
  padding-bottom: 0;
}

.tracking-item::before {
  content: '';
  position: absolute;
  left: -22px;
  top: 0;
  bottom: 0;
  width: 2px;
  background-color: #e0e0e0;
  z-index: 1;
}

.tracking-item.active::before {
  background-color: #3490dc;
}

.tracking-icon {
  position: absolute;
  left: -30px;
  top: 0;
  width: 16px;
  height: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: white;
  z-index: 2;
}

.tracking-icon i {
  color: #e0e0e0;
  font-size: 1rem;
}

.tracking-item.active .tracking-icon i {
  color: #3490dc;
}

.tracking-content {
  margin-left: 10px;
}

.tracking-title {
  margin-bottom: 0;
  font-weight: 500;
}

.tracking-date {
  font-size: 0.875rem;
  color: #6c757d;
  margin-bottom: 0;
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
</style>
