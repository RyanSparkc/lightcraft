<template>
  <div class="container my-5 text-center">
    <h2 class="mb-4">訂單完成</h2>
    <p>您的訂單已成立，訂單編號：<strong>#123456</strong></p>
    <div class="d-flex justify-content-center mt-4">
      <button class="btn btn-dark me-3" @click="$router.push('/')">
        回首頁
      </button>
      <button class="btn btn-secondary" @click="viewOrder">查看訂單詳情</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CheckoutComplete',
  methods: {
    viewOrder() {
      // TODO: 實作查看訂單詳情
    },
  },
};
</script>

<style scoped></style>
