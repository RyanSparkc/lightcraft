<template>
  <div class="container my-5">
    <h2 class="section-title mb-4">寄送資訊</h2>

    <form @submit.prevent="nextStep">
      <div class="row">
        <div class="col-md-8">
          <div class="form-card mb-4">
            <div class="form-group mb-3">
              <label for="name" class="form-label">姓名</label>
              <input
                type="text"
                id="name"
                v-model="form.name"
                class="form-control"
                :class="{ 'is-invalid': errors.name }"
                required
                placeholder="請輸入收件人姓名"
              />
              <div class="invalid-feedback">{{ errors.name }}</div>
            </div>

            <div class="form-group mb-3">
              <label for="email" class="form-label">Email</label>
              <input
                type="email"
                id="email"
                v-model="form.email"
                class="form-control"
                :class="{ 'is-invalid': errors.email }"
                required
                placeholder="example@email.com"
              />
              <div class="invalid-feedback">{{ errors.email }}</div>
            </div>

            <div class="form-group mb-3">
              <label for="phone" class="form-label">手機</label>
              <input
                type="text"
                id="phone"
                v-model="form.phone"
                class="form-control"
                :class="{ 'is-invalid': errors.phone }"
                required
                pattern="^[0-9]+$"
                placeholder="請輸入手機號碼"
              />
              <div class="invalid-feedback">{{ errors.phone }}</div>
            </div>

            <div class="form-group mb-3">
              <label for="address" class="form-label">地址</label>
              <input
                type="text"
                id="address"
                v-model="form.address"
                class="form-control"
                :class="{ 'is-invalid': errors.address }"
                required
                placeholder="請輸入詳細地址"
              />
              <div class="invalid-feedback">{{ errors.address }}</div>
            </div>

            <div class="form-group mb-3">
              <label for="message" class="form-label">訂單備註</label>
              <textarea
                id="message"
                v-model="form.message"
                class="form-control"
                rows="3"
                placeholder="請輸入訂單備註（選填）"
              ></textarea>
              <small class="form-text text-muted">
                如有特殊需求或配送說明，請在此填寫
              </small>
            </div>
          </div>
        </div>

        <div class="col-md-4">
          <div class="info-card">
            <h3 class="card-title">配送資訊</h3>
            <div class="info-item">
              <div class="info-label">運費</div>
              <div class="info-value">{{ shippingFee }}</div>
            </div>
            <div class="info-item">
              <div class="info-label">預估到貨時間</div>
              <div class="info-value">{{ estimatedDelivery }}</div>
            </div>
          </div>
        </div>
      </div>

      <div class="text-end mt-4">
        <button type="submit" class="btn-primary" :disabled="isSubmitting">
          {{ isSubmitting ? '建立訂單中...' : '建立訂單並前往付款' }}
        </button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { storeToRefs } from 'pinia';

import useCartStore from '@/stores/cartStore';

const router = useRouter();
const cartStore = useCartStore();
const { carts, total, final_total: finalTotal } = storeToRefs(cartStore);

// 表單數據
const form = ref({
  name: '',
  email: '',
  phone: '',
  address: '',
  message: '',
});

// 錯誤處理
const errors = ref({});

// 其他狀態
const shippingFee = ref('NT$ 0');
const estimatedDelivery = ref('3–5 個工作天');
const isSubmitting = ref(false);

// 表單驗證
const validate = () => {
  errors.value = {};
  if (!form.value.name) {
    errors.value.name = '姓名為必填';
  }
  if (!form.value.email) {
    errors.value.email = 'Email為必填';
  } else if (!/^[\w.-]+@([\w-]+\.)+[\w-]{2,4}$/.test(form.value.email)) {
    errors.value.email = 'Email格式不正確';
  }
  if (!form.value.phone) {
    errors.value.phone = '手機為必填';
  } else if (!/^[0-9]+$/.test(form.value.phone)) {
    errors.value.phone = '手機格式需為數字';
  }
  if (!form.value.address) {
    errors.value.address = '地址為必填';
  }
  return Object.keys(errors.value).length === 0;
};

// 提交表單並建立訂單
const nextStep = async () => {
  if (!validate()) return;

  if (isSubmitting.value) return;
  isSubmitting.value = true;

  try {
    // 保存購物車資料到 localStorage（建立訂單前）
    const cartData = {
      carts: carts.value,
      total: total.value,
      final_total: finalTotal.value,
    };
    localStorage.setItem('orderCartData', JSON.stringify(cartData));

    // 準備訂單資料，按照 API 文件格式
    const orderData = {
      user: {
        name: form.value.name,
        email: form.value.email,
        tel: form.value.phone,
        address: form.value.address,
      },
      message: form.value.message || '',
    };

    // 建立訂單
    const response = await cartStore.createOrder(orderData);

    // 清除地址暫存
    localStorage.removeItem('checkoutAddress');

    // 跳轉到付款頁面，攜帶訂單 ID
    router.push(`/checkout/payment?orderId=${response.orderId}`);
  } catch (error) {
    // 錯誤處理已在 store 中完成
  } finally {
    isSubmitting.value = false;
  }
};

// 從 localStorage 讀取之前保存的地址數據
const loadAddressData = () => {
  const savedAddress = localStorage.getItem('checkoutAddress');
  if (savedAddress) {
    form.value = JSON.parse(savedAddress);
  }
};

onMounted(() => {
  // 組件載入時讀取之前保存的地址數據
  loadAddressData();
});
</script>

<style scoped>
/* 表單驗證錯誤訊息 */
.invalid-feedback {
  color: #dc3545;
  font-size: 0.875rem;
  margin-top: 0.25rem;
}
</style>
