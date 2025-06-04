<template>
  <div
    class="complete-page d-flex flex-column justify-content-center align-items-center text-center"
  >
    <Vue3Lottie
      :animationData="completeAnimationData"
      :height="150"
      :width="150"
      :loop="false"
      :autoplay="true"
      class="mb-4"
    />
    <h2 class="mb-3">訂單完成</h2>
    <p class="mb-4">
      您的訂單已成立，訂單編號：<strong>#{{ displayOrderId }}</strong>
    </p>
    <div class="d-flex justify-content-center mt-2">
      <button class="btn-primary me-3" @click="$router.push('/')">
        回首頁
      </button>
      <button class="btn-secondary me-3" @click="viewOrder">
        查看訂單詳情
      </button>
      <button class="btn-outline-primary" @click="$router.push('/orders')">
        查看所有訂單
      </button>
    </div>
  </div>
</template>

<script>
// eslint-disable-next-line import/no-extraneous-dependencies
import { Vue3Lottie } from 'vue3-lottie';
import completeAnimationData from '@/assets/lottie/checkout-complete.json';

export default {
  name: 'CheckoutComplete',
  components: {
    Vue3Lottie,
  },
  data() {
    return {
      completeAnimationData,
    };
  },
  computed: {
    orderId() {
      return this.$route.params.orderId;
    },
    displayOrderId() {
      return this.orderId || 'N/A';
    },
  },
  methods: {
    viewOrder() {
      // 使用實際的訂單 ID 跳轉到訂單詳情頁面
      if (this.orderId) {
        this.$router.push(`/order/${this.orderId}`);
      } else {
        // 如果沒有訂單 ID，跳轉到首頁
        this.$router.push('/');
      }
    },
  },
};
</script>

<style scoped>
.complete-page {
  flex: 1;
  min-height: 10vh; /* 修改了 min-height，減少區塊高度 */
  padding: 1rem 1rem 2rem; /* 保留上次的 padding 調整 */
}

/* .success-icon 樣式已移除，因為被 Lottie 動畫取代 */

/* 按鈕樣式 */
.btn-primary {
  background-color: #333;
  border-color: #333;
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 8px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
}

.btn-primary:hover {
  background-color: #222;
  border-color: #222;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
}

.btn-secondary {
  background-color: #6c757d;
  border-color: #6c757d;
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 8px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
}

.btn-secondary:hover {
  background-color: #5a6268;
  border-color: #545b62;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(108, 117, 125, 0.3);
}

.btn-outline-primary {
  background-color: transparent;
  border: 2px solid #333;
  color: #333;
  padding: 10px 22px; /* 調整 padding 以配合邊框 */
  border-radius: 8px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
}

.btn-outline-primary:hover {
  background-color: #333;
  color: white;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
}
</style>
