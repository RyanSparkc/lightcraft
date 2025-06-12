<template>
  <div class="container my-5">
    <h2 class="section-title mb-4">購物車</h2>
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
                  class="quantity-selector-wrapper d-flex justify-content-center"
                >
                  <div class="quantity-selector d-flex">
                    <button
                      class="qty-btn qty-btn-minus"
                      @click="updateQuantity(item, item.qty - 1)"
                      :disabled="loadingItem === item.id || item.qty <= 1"
                    >
                      <i class="bi bi-dash"></i>
                    </button>
                    <input
                      type="number"
                      class="qty-input text-center"
                      v-model.number="item.qty"
                      min="1"
                      max="20"
                      @change="updateCartItemLocal(item)"
                      :disabled="loadingItem === item.id"
                    />
                    <button
                      class="qty-btn qty-btn-plus"
                      @click="updateQuantity(item, item.qty + 1)"
                      :disabled="loadingItem === item.id || item.qty >= 20"
                    >
                      <i class="bi bi-plus"></i>
                    </button>
                  </div>
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
                  class="btn-danger-outline"
                  @click="removeCartItemLocal(item.id)"
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
                class="form-control coupon-input me-2"
                placeholder="請輸入優惠碼"
                v-model="couponCode"
                :disabled="isApplyingCoupon"
              />
              <button
                class="btn-apply"
                @click="applyCouponLocal"
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
                v-if="showCoupon"
                class="d-flex justify-content-between align-items-center mb-2"
              >
                <span class="text-muted">已套用優惠券：</span>
                <span class="fw-bold text-success">
                  {{ cartStore.carts[0].coupon.code }}
                </span>
              </div>
              <div
                v-if="showCoupon"
                class="d-flex justify-content-between align-items-center mb-2"
              >
                <span class="text-muted">折扣金額：</span>
                <span class="fw-bold text-success">
                  折扣 NT$ {{ formatPrice(discountAmount) }}
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

      <div class="cart-actions mt-4">
        <!-- 桌面版 -->
        <div class="d-md-flex justify-content-between align-items-center">
          <RouterLink to="/products" class="btn-secondary">
            <i class="bi bi-arrow-left me-2"></i>繼續購物
          </RouterLink>
          <button
            type="button"
            class="btn-danger-outline"
            @click="clearCartLocal"
            :disabled="cartStore.carts.length === 0 || isClearing"
          >
            <i class="bi bi-arrow-clockwise spinner-icon" v-if="isClearing"></i>
            <i class="bi bi-trash me-1" v-else></i>
            清空購物車
          </button>
          <RouterLink
            to="/checkout/address"
            class="btn-primary"
            :class="{ disabled: cartStore.carts.length === 0 }"
          >
            前往結帳
            <i class="bi bi-arrow-right ms-2"></i>
          </RouterLink>
        </div>

        <!-- 手機版 -->
        <div class="d-md-none">
          <div class="row g-2 mb-2">
            <div class="col-6">
              <RouterLink to="/products" class="btn-secondary w-100">
                <i class="bi bi-arrow-left me-2"></i>繼續購物
              </RouterLink>
            </div>
            <div class="col-6">
              <RouterLink
                to="/checkout/address"
                class="btn-primary w-100"
                :class="{ disabled: cartStore.carts.length === 0 }"
              >
                前往結帳
                <i class="bi bi-arrow-right ms-2"></i>
              </RouterLink>
            </div>
          </div>
          <div class="row">
            <div class="col-12">
              <button
                type="button"
                class="btn-danger-outline w-100"
                @click="clearCartLocal"
                :disabled="cartStore.carts.length === 0 || isClearing"
              >
                <i
                  class="bi bi-arrow-clockwise spinner-icon"
                  v-if="isClearing"
                ></i>
                <i class="bi bi-trash me-1" v-else></i>
                清空購物車
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-else class="text-center py-5 my-4">
      <div class="mb-4">
        <i class="bi bi-cart fs-1 text-muted"></i>
      </div>
      <h4 class="mb-3">購物車目前沒有任何商品</h4>
      <p class="text-muted mb-4">快去商城挑選您喜愛的商品吧！</p>
      <RouterLink to="/products" class="btn-primary">
        <i class="bi bi-bag me-2"></i>瀏覽商品
      </RouterLink>
    </div>
  </div>
</template>

<script>
import { RouterLink } from 'vue-router';
import { mapStores, mapActions } from 'pinia';
import useCartStore from '@/stores/cartStore';
import useToastMessageStore from '@/stores/toastMessage';

export default {
  components: {
    RouterLink,
  },
  data() {
    return {
      loadingItem: '',
      isClearing: false,
      couponCode: '',
      isApplyingCoupon: false,
    };
  },
  computed: {
    ...mapStores(useCartStore, useToastMessageStore),
    // 計算優惠券是否已套用與折扣金額
    showCoupon() {
      return !!this.cartStore?.carts[0]?.coupon;
    },
    discountAmount() {
      // 計算折扣金額並四捨五入
      const discount = this.cartStore.total - this.cartStore.final_total;
      console.log('total', this.cartStore.total);
      return Math.round(discount);
    },
  },
  methods: {
    ...mapActions(useCartStore, [
      'getCart',
      'updateCartItem',
      'removeCartItem',
      'clearCart',
      'applyCoupon',
    ]),
    ...mapActions(useToastMessageStore, ['addMessage']),
    // 格式化價格
    formatPrice(price) {
      return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    },
    // 更新購物車項目
    async updateCartItemLocal(item) {
      this.loadingItem = item.id;
      try {
        await this.updateCartItem(item);
      } catch (err) {
        // 錯誤已在 store 中處理
      } finally {
        this.loadingItem = '';
      }
    },
    // 更新數量的輔助函數
    updateQuantity(item, newQty) {
      if (newQty >= 1 && newQty <= 20) {
        const updatedItem = { ...item, qty: newQty };
        this.updateCartItemLocal(updatedItem);
      }
    },
    // 移除購物車項目
    async removeCartItemLocal(id) {
      this.loadingItem = id;
      try {
        await this.removeCartItem(id);
      } catch (err) {
        // 錯誤已在 store 中處理
      } finally {
        this.loadingItem = '';
      }
    },
    // 清空購物車
    async clearCartLocal() {
      this.isClearing = true;
      try {
        await this.clearCart();
      } catch (err) {
        // 錯誤已在 store 中處理
      } finally {
        this.isClearing = false;
      }
    },
    // 套用優惠券
    async applyCouponLocal() {
      if (!this.couponCode) {
        this.addMessage({
          title: '提示',
          content: '請輸入優惠碼',
          style: 'warning',
        });
        return;
      }
      this.isApplyingCoupon = true;
      try {
        await this.applyCoupon(this.couponCode);
        this.couponCode = '';
      } catch (err) {
        // 錯誤已在 store 處理
      } finally {
        this.isApplyingCoupon = false;
      }
    },
  },
  mounted() {
    // 元件掛載時獲取購物車列表
    this.getCart();
  },
};
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

/* 數量選擇器容器 */
.quantity-selector-wrapper {
  min-width: 120px;
}

.quantity-selector {
  border: 1px solid #ddd;
  border-radius: 8px;
  overflow: hidden;
  background: white;
}

/* 數量調整按鈕 */
.qty-btn {
  background: white;
  border: none;
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
  font-size: 14px;
}

.qty-btn:hover:not(:disabled) {
  background: #f8f9fa;
}

.qty-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.qty-btn-minus {
  border-right: 1px solid #dee2e6;
}

.qty-btn-plus {
  border-left: 1px solid #dee2e6;
}

.qty-input {
  border: none;
  width: 48px;
  height: 36px;
  text-align: center;
  font-size: 14px;
  font-weight: 500;
  background: white;
}

.qty-input:focus {
  outline: none;
  box-shadow: none;
}

/* 手機版優化 */
@media (max-width: 576px) {
  .quantity-selector {
    border-radius: 6px;
  }

  .qty-btn {
    width: 32px;
    height: 32px;
    font-size: 12px;
  }

  .qty-input {
    width: 40px;
    height: 32px;
    font-size: 13px;
  }
}

/* 刪除按鈕 */
.btn-danger-outline {
  background: white;
  color: #dc3545;
  border: 1px solid #dc3545;
  border-radius: 8px;
  padding: 6px 12px;
  font-size: 0.875rem;
  transition: all 0.3s ease;
}

.btn-danger-outline:hover {
  background: #f8d7da;
  transform: translateY(-2px);
}

.btn-danger-outline:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

/* 優惠碼輸入 */
.coupon-input {
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 10px 16px;
  transition: all 0.3s ease;
}

.coupon-input:focus {
  border-color: #888;
  box-shadow: 0 0 0 0.2rem rgba(0, 0, 0, 0.05);
}

/* 套用按鈕 */
.btn-apply {
  background: white;
  color: #333;
  border: 1px solid #ddd;
  padding: 10px 16px;
  border-radius: 8px;
  font-weight: 500;
  min-width: 70px;
  transition: all 0.3s ease;
}

.btn-apply:hover {
  background: #f8f8f8;
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.05);
}

.btn-apply:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

/* 購物車操作區域 */
.cart-actions {
  margin-top: 2rem;
}

/* 桌面版按鈕樣式 */
@media (min-width: 768px) {
  .cart-actions .btn-secondary,
  .cart-actions .btn-primary,
  .cart-actions .btn-danger-outline {
    padding: 12px 24px;
    font-weight: 500;
    min-width: 140px;
  }
}

/* 手機版按鈕樣式 */
@media (max-width: 767px) {
  .cart-actions .btn-secondary,
  .cart-actions .btn-primary,
  .cart-actions .btn-danger-outline {
    padding: 12px 16px;
    font-size: 14px;
    font-weight: 500;
  }
}

/* 清空購物車按鈕 */
.btn-danger-outline {
  background: white;
  color: #dc3545;
  border: 1px solid #dc3545;
  border-radius: 8px;
  transition: all 0.3s ease;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.btn-danger-outline:hover {
  background: #f8d7da;
  color: #dc3545;
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(220, 53, 69, 0.1);
  text-decoration: none;
}

.btn-danger-outline:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  transform: none;
}

/* 按鈕樣式已移到全域 _common.scss 中 */
</style>
