<template>
  <div class="container my-5">
    <h2 class="mb-4">訂單確認</h2>
    <p>此處待實作訂單確認內容，如購物車明細及金額。</p>
    <div class="d-flex justify-content-between mt-4">
      <button class="btn btn-secondary" @click="$router.back()">上一步</button>
      <button class="btn btn-dark">確認送出訂單</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CheckoutReview',
};
</script>

<style scoped></style>
