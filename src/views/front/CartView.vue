<template>
  <div class="container my-5">
    <h2 class="fw-bold mb-4">購物車</h2>
    <div v-if="cartStore.carts && cartStore.carts.length > 0">
      <div class="table-responsive">
        <table class="table align-middle">
          <thead class="bg-light">
            <tr>
              <th class="py-3">商品資訊</th>
              <th class="py-3 text-center" style="width: 180px">數量</th>
              <th class="py-3 text-end">單價</th>
              <th class="py-3 text-end">小計</th>
              <th class="py-3 text-center">操作</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="item in cartStore.carts"
              :key="item.id"
              class="border-bottom"
            >
              <td>
                <div class="d-flex align-items-center">
                  <div class="me-3" style="width: 80px; height: 80px">
                    <img
                      :src="item.product.imageUrl"
                      :alt="item.product.title"
                      class="img-fluid rounded object-fit-cover"
                      style="width: 100%; height: 100%"
                    />
                  </div>
                  <div>
                    <h6 class="mb-1">{{ item.product.title }}</h6>
                    <small class="text-muted">{{
                      item.product.category
                    }}</small>
                    <div v-if="item.coupon_code" class="badge bg-success mt-1">
                      已套用優惠券
                    </div>
                  </div>
                </div>
              </td>
              <td>
                <div
                  class="input-group quantity-selector mx-auto"
                  style="max-width: 140px"
                >
                  <button
                    class="btn btn-outline-secondary"
                    @click="updateQuantity(item, item.qty - 1)"
                    :disabled="loadingItem === item.id || item.qty <= 1"
                  >
                    <i class="bi bi-dash"></i>
                  </button>
                  <input
                    type="number"
                    class="form-control text-center"
                    v-model.number="item.qty"
                    min="1"
                    max="20"
                    @change="updateCartItem(item)"
                    :disabled="loadingItem === item.id"
                  />
                  <button
                    class="btn btn-outline-secondary"
                    @click="updateQuantity(item, item.qty + 1)"
                    :disabled="loadingItem === item.id || item.qty >= 20"
                  >
                    <i class="bi bi-plus"></i>
                  </button>
                </div>
              </td>
              <td class="text-end">
                <span class="fw-medium"
                  >NT$ {{ formatPrice(item.product.price) }}</span
                >
                <div
                  v-if="item.product.origin_price > item.product.price"
                  class="text-muted text-decoration-line-through small"
                >
                  NT$ {{ formatPrice(item.product.origin_price) }}
                </div>
              </td>
              <td class="text-end fw-bold">
                NT$ {{ formatPrice(item.total) }}
              </td>
              <td class="text-center">
                <button
                  type="button"
                  class="btn btn-outline-danger btn-sm"
                  @click="removeCartItem(item.id)"
                  :disabled="loadingItem === item.id"
                >
                  <i
                    class="bi bi-arrow-clockwise spinner-icon"
                    v-if="loadingItem === item.id"
                  ></i>
                  <i class="bi bi-trash" v-else></i>
                  <span class="ms-1 d-none d-sm-inline">刪除</span>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="card mt-4 border-0 shadow-sm">
        <div class="card-body p-4">
          <div class="row">
            <div class="col-md-6 d-flex align-items-center mb-md-0 mb-3">
              <input
                type="text"
                class="form-control me-2"
                placeholder="請輸入優惠碼"
                v-model="couponCode"
                :disabled="isApplyingCoupon"
              />
              <button
                class="btn btn-outline-primary"
                style="min-width: 70px"
                @click="applyCoupon"
                :disabled="isApplyingCoupon || !couponCode"
              >
                <i
                  class="bi bi-arrow-clockwise spinner-icon"
                  v-if="isApplyingCoupon"
                ></i>
                <span v-else>套用</span>
              </button>
            </div>
            <div class="col-md-6">
              <div
                class="d-flex justify-content-between align-items-center mb-2"
              >
                <span class="text-muted">商品小計：</span>
                <span>NT$ {{ formatPrice(cartStore.total) }}</span>
              </div>
              <div
                class="d-flex justify-content-between align-items-center mb-2"
              >
                <span class="text-muted">運費：</span>
                <span>NT$ 0</span>
              </div>
              <div
                v-if="cartStore.carts[0]?.coupon"
                class="d-flex justify-content-between align-items-center mb-2"
              >
                <span class="text-muted">已套用優惠券：</span>
                <span class="fw-bold text-success">
                  {{ cartStore.carts[0].coupon.code }}
                  <button
                    class="btn btn-sm btn-outline-danger ms-2"
                    @click="removeCoupon"
                    :disabled="isApplyingCoupon"
                  >
                    移除優惠券
                  </button>
                </span>
              </div>
              <div
                v-if="cartStore.carts[0]?.coupon"
                class="d-flex justify-content-between align-items-center mb-2"
              >
                <span class="text-muted">折扣金額：</span>
                <span class="fw-bold text-success">
                  -NT$
                  {{ formatPrice(cartStore.total - cartStore.final_total) }}
                </span>
              </div>
              <hr />
              <div
                class="d-flex justify-content-between align-items-center mb-0"
              >
                <span class="fs-5 fw-bold">總計金額：</span>
                <span class="fs-5 fw-bold text-danger">
                  NT$ {{ formatPrice(cartStore.final_total) }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="d-flex justify-content-between mt-4">
        <RouterLink to="/products" class="btn btn-outline-secondary">
          <i class="bi bi-arrow-left me-2"></i>繼續購物
        </RouterLink>
        <div>
          <button
            type="button"
            class="btn btn-outline-danger me-2"
            @click="clearCart"
            :disabled="cartStore.carts.length === 0 || isClearing"
          >
            <i class="bi bi-arrow-clockwise spinner-icon" v-if="isClearing"></i>
            <i class="bi bi-trash me-1" v-else></i>
            清空購物車
          </button>
          <RouterLink
            to="/checkout"
            class="btn btn-danger"
            :class="{ disabled: cartStore.carts.length === 0 }"
          >
            前往結帳
            <i class="bi bi-arrow-right ms-2"></i>
          </RouterLink>
        </div>
      </div>
    </div>

    <div v-else class="text-center py-5 my-4">
      <div class="mb-4">
        <i class="bi bi-cart fs-1 text-muted"></i>
      </div>
      <h4 class="mb-3">購物車目前沒有任何商品</h4>
      <p class="text-muted mb-4">快去商城挑選您喜愛的商品吧！</p>
      <RouterLink to="/products" class="btn btn-primary px-4 py-2">
        <i class="bi bi-bag me-2"></i>瀏覽商品
      </RouterLink>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { RouterLink } from 'vue-router';
import useCartStore from '@/stores/cartStore';
import useToastMessageStore from '@/stores/toastMessage';
import axios from 'axios';

const { VITE_APP_URL, VITE_APP_PATH } = import.meta.env;

const cartStore = useCartStore();
const toastStore = useToastMessageStore();
const loadingItem = ref('');
const isClearing = ref(false);
const couponCode = ref('');
const isApplyingCoupon = ref(false);

// 格式化價格
const formatPrice = (price) =>
  price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');

// 更新購物車項目
const updateCartItem = (item) => {
  const data = {
    product_id: item.product_id,
    qty: item.qty,
  };
  loadingItem.value = item.id;
  axios
    .put(`${VITE_APP_URL}/api/${VITE_APP_PATH}/cart/${item.id}`, { data })
    .then((res) => {
      toastStore.addMessage({
        title: '成功',
        content: res.data.message,
        style: 'success',
      });
      loadingItem.value = '';
      cartStore.getCart();
    })
    .catch((err) => {
      loadingItem.value = '';
      toastStore.addMessage({
        title: '錯誤',
        content: err.response.data.message,
        style: 'danger',
      });
    });
};

// 更新數量的輔助函數
const updateQuantity = (item, newQty) => {
  if (newQty >= 1 && newQty <= 20) {
    const updatedItem = { ...item, qty: newQty };
    updateCartItem(updatedItem);
  }
};

// 移除購物車項目
const removeCartItem = (id) => {
  loadingItem.value = id;
  axios
    .delete(`${VITE_APP_URL}/api/${VITE_APP_PATH}/cart/${id}`)
    .then((res) => {
      toastStore.addMessage({
        title: '成功',
        content: res.data.message,
        style: 'success',
      });
      loadingItem.value = '';
      cartStore.getCart();
    })
    .catch((err) => {
      loadingItem.value = '';
      toastStore.addMessage({
        title: '錯誤',
        content: err.response.data.message,
        style: 'danger',
      });
    });
};

// 清空購物車
const clearCart = () => {
  isClearing.value = true;
  axios
    .delete(`${VITE_APP_URL}/api/${VITE_APP_PATH}/carts`)
    .then((res) => {
      toastStore.addMessage({
        title: '成功',
        content: res.data.message,
        style: 'success',
      });
      isClearing.value = false;
      cartStore.getCart();
    })
    .catch((err) => {
      isClearing.value = false;
      toastStore.addMessage({
        title: '錯誤',
        content: err.response.data.message,
        style: 'danger',
      });
    });
};

// 套用優惠券
const applyCoupon = () => {
  if (!couponCode.value) {
    toastStore.addMessage({
      title: '提示',
      content: '請輸入優惠碼',
      style: 'warning',
    });
    return;
  }

  const code = couponCode.value;
  isApplyingCoupon.value = true;
  axios
    .post(`${VITE_APP_URL}/api/${VITE_APP_PATH}/coupon`, { data: { code } })
    .then((res) => {
      toastStore.addMessage({
        title: '成功',
        content: res.data.message,
        style: 'success',
      });
      couponCode.value = '';
      cartStore.getCart();
    })
    .catch((err) => {
      toastStore.addMessage({
        title: '錯誤',
        content: err.response?.data?.message || '套用優惠券失敗',
        style: 'danger',
      });
    })
    .finally(() => {
      isApplyingCoupon.value = false;
    });
};

// 移除優惠券（純前端）
const removeCoupon = () => {
  // 重新為每個 item 建立新物件，移除 coupon 與 coupon_code
  cartStore.carts = cartStore.carts.map((item) => ({
    ...item,
    coupon: undefined,
    coupon_code: undefined,
  }));
  // 重設總計金額為原始商品小計
  cartStore.final_total = cartStore.total;
  toastStore.addMessage({
    title: '提示',
    content: '已移除優惠券',
    style: 'success',
  });
};

// 元件掛載時獲取購物車列表
onMounted(() => {
  cartStore.getCart();
});
</script>

<style scoped>
.quantity-selector input::-webkit-inner-spin-button,
.quantity-selector input::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

.quantity-selector input {
  -moz-appearance: textfield;
}

.object-fit-cover {
  object-fit: cover;
}

.spinner-icon {
  display: inline-block;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
