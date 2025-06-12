/* eslint-disable comma-dangle */
import { defineStore } from 'pinia';
import axios from 'axios';
import useToastMessageStore from '@/stores/toastMessage';

const { VITE_APP_URL, VITE_APP_PATH } = import.meta.env;

export default defineStore('cart', {
  state: () => ({
    carts: [],
    final_total: 0,
    total: 0,
  }),
  actions: {
    getCart() {
      const toastStore = useToastMessageStore();
      axios
        .get(`${VITE_APP_URL}/api/${VITE_APP_PATH}/cart`)
        .then((res) => {
          const { carts, total, final_total: apiFinalTotal } = res.data.data;

          // 讀取 API 回傳資料並設定 state
          this.carts = carts;
          this.total = total;

          // 檢查購物車是否有商品且第一個商品是否有 coupon 資訊
          const hasCoupon = carts.length > 0 && carts[0].coupon;

          if (hasCoupon) {
            // 根據使用者反饋，API 回傳的 final_total 是「折扣金額」，並非最終價格。
            // 因此，最終應付金額是 商品總額 (total) - 折扣金額 (apiFinalTotal)。
            this.final_total = Math.round(this.total - apiFinalTotal);
          } else {
            // 沒有優惠券，總計金額等於小計金額
            this.final_total = Math.round(this.total);
            // 無優惠券時 final_total = total
          }
        })
        .catch((err) => {
          toastStore.addMessage({
            title: '錯誤',
            content: err.response?.data?.message || '載入購物車失敗',
            style: 'danger',
          });
        });
    },
    addToCart(id, qty = 1) {
      const toastStore = useToastMessageStore();
      const cart = {
        product_id: id,
        qty,
      };
      axios
        .post(`${VITE_APP_URL}/api/${VITE_APP_PATH}/cart`, { data: cart })
        .then((res) => {
          toastStore.addMessage({
            title: '成功',
            content: res.data.message,
            style: 'success',
          });
          this.getCart();
        })
        .catch((err) => {
          toastStore.addMessage({
            title: '錯誤',
            content: err.response?.data?.message || '加入購物車失敗',
            style: 'danger',
          });
        });
    },
    async applyCoupon(code) {
      const toastStore = useToastMessageStore();
      try {
        const res = await axios.post(
          `${VITE_APP_URL}/api/${VITE_APP_PATH}/coupon`,
          {
            data: { code },
          }
        );
        toastStore.addMessage({
          title: '成功',
          content: res.data.message,
          style: 'success',
        });
        // 重新取得購物車資料
        this.getCart();
        return res;
      } catch (err) {
        toastStore.addMessage({
          title: '錯誤',
          content: err.response?.data?.message || '套用優惠券失敗',
          style: 'danger',
        });
        throw err;
      }
    },
    // 新增：更新購物車項目數量
    async updateCartItem(item) {
      const toastStore = useToastMessageStore();
      const data = {
        product_id: item.product_id,
        qty: item.qty,
      };
      // 返回 Promise 以便組件處理加載狀態
      try {
        const res = await axios.put(
          `${VITE_APP_URL}/api/${VITE_APP_PATH}/cart/${item.id}`,
          { data }
        );
        toastStore.addMessage({
          title: '成功',
          content: res.data.message,
          style: 'success',
        });
        this.getCart(); // 成功後更新購物車
        return res;
      } catch (err) {
        toastStore.addMessage({
          title: '錯誤',
          content: err.response?.data?.message || '更新購物車項目失敗',
          style: 'danger',
        });
        throw err; // 拋出錯誤以便組件處理
      }
    },
    // 新增：移除購物車單個項目
    async removeCartItem(id) {
      const toastStore = useToastMessageStore();
      // 返回 Promise
      try {
        const res = await axios.delete(
          `${VITE_APP_URL}/api/${VITE_APP_PATH}/cart/${id}`
        );
        toastStore.addMessage({
          title: '成功',
          content: res.data.message,
          style: 'success',
        });
        this.getCart();
        return res;
      } catch (err) {
        toastStore.addMessage({
          title: '錯誤',
          content: err.response?.data?.message || '移除購物車項目失敗',
          style: 'danger',
        });
        throw err;
      }
    },
    // 新增：清空購物車
    async clearCart() {
      const toastStore = useToastMessageStore();
      // 返回 Promise
      try {
        const res = await axios.delete(
          `${VITE_APP_URL}/api/${VITE_APP_PATH}/carts`
        );
        toastStore.addMessage({
          title: '成功',
          content: res.data.message,
          style: 'success',
        });
        this.getCart();
        return res;
      } catch (err) {
        toastStore.addMessage({
          title: '錯誤',
          content: err.response?.data?.message || '清空購物車失敗',
          style: 'danger',
        });
        throw err;
      }
    },
    // 新增：送出購物車建立訂單
    async createOrder(orderData) {
      const toastStore = useToastMessageStore();
      try {
        const res = await axios.post(
          `${VITE_APP_URL}/api/${VITE_APP_PATH}/order`,
          { data: orderData } // API 期望的格式 { data: { user: {}, message: ''} }
        );
        toastStore.addMessage({
          title: '成功',
          content: res.data.message || '訂單已成功送出',
          style: 'success',
        });
        this.getCart(); // 訂單送出後，重新整理購物車 (通常會變空)
        return res.data; // 返回包含 orderId 等資訊的回應
      } catch (err) {
        toastStore.addMessage({
          title: '錯誤',
          content: err.response?.data?.message || '訂單送出失敗，請稍後再試',
          style: 'danger',
        });
        throw err;
      }
    },
    // 新增：處理付款
    async payOrder(orderId) {
      const toastStore = useToastMessageStore();
      try {
        const res = await axios.post(
          `${VITE_APP_URL}/api/${VITE_APP_PATH}/pay/${orderId}`
        );

        toastStore.addMessage({
          title: '付款成功',
          content: res.data.message || '付款已完成',
          style: 'success',
        });

        return res.data;
      } catch (err) {
        toastStore.addMessage({
          title: '付款失敗',
          content: err.response?.data?.message || '付款處理失敗，請稍後再試',
          style: 'danger',
        });
        throw err;
      }
    },
  },
});
