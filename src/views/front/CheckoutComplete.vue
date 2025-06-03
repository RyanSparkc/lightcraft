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
      <button class="btn-secondary" @click="viewOrder">查看訂單詳情</button>
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
</style>
