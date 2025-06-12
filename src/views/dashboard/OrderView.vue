<template>
  <LoadingOverlay :active="isLoading" />
  <div>
    <h2>訂單列表</h2>
    <table class="table mt-4">
      <thead>
        <tr>
          <th>日期</th>
          <th>Email</th>
          <th>訂單編號</th>
          <th>總額</th>
          <th>備註</th>
          <th>是否付款</th>
          <th>編輯</th>
        </tr>
      </thead>
      <tbody>
        <template v-for="item in orders" :key="item.id">
          <tr>
            <td>{{ formatDate(item.create_at)}}</td>
            <td>{{ item.user.email }}</td>
            <td>
              <span>{{ item.id }}</span>
            </td>
            <td>{{ calculateCorrectTotal(item).toLocaleString() }}</td>
            <td class="text-right">{{ item.message }}</td>
            <td>
              <div class="form-check form-switch">
                <input
                  class="form-check-input"
                  type="checkbox"
                  :id="`paidSwitch${item.id}`"
                  v-model="item.is_paid"
                  @change="updatePaid(item)"
                />
                <label class="form-check-label" :for="`paidSwitch${item.id}`">
                  <span v-if="item.is_paid">已付款</span>
                  <span v-else>未付款</span>
                </label>
              </div>
            </td>
            <td>
              <div class="btn-group">
                <button
                  class="btn btn-outline-primary btn-sm"
                  type="button"
                  @click="openModal(item)"
                >
                  檢視
                </button>
                <button
                  class="btn btn-outline-danger btn-sm"
                  type="button"
                  @click="openDelModal(item)"
                >
                  刪除
                </button>
              </div>
            </td>
          </tr>
        </template>
      </tbody>
    </table>
  </div>
  <OrderModal ref="orderModal" :order="tempOrder" @update-paid="updatePaid" />
  <DelModal ref="delModal" :item="tempOrder" @del-item="deleteOrder" />
</template>
<script>

import { mapActions } from 'pinia';
import useToastMessageStore from '@/stores/toastMessage';

import OrderModal from '@/components/OrderModal.vue';
import DelModal from '@/components/DelModal.vue';

const { VITE_APP_URL, VITE_APP_PATH } = import.meta.env;

export default {
  data() {
    return {
      orders: {},
      currentPage: 1,
      isLoading: true,
      tempOrder: {},
      isNew: false,
    };
  },
  components: {
    OrderModal,
    DelModal,
  },
  methods: {
    ...mapActions(useToastMessageStore, ['addMessage']),
    calculateCorrectTotal(order) {
      // 根據使用者反饋，後端 API 在有優惠券時，會將 `order.total` 誤存為「折扣金額」。
      // 此為前端的修正邏輯，以確保顯示正確的訂單總額。

      // 如果沒有 products 資訊，無法重新計算，回傳原始 total
      if (!order.products) {
        return Number(order.total || 0);
      }

      // 將 products 物件轉為陣列
      const productItems = Object.values(order.products);

      // 檢查訂單中是否有任何商品使用了 coupon
      const couponApplied = productItems.some((item) => item.coupon);

      if (couponApplied) {
        // 如果有使用優惠券，則重新計算正確總額
        // 1. 計算折扣前的商品總計 (subtotal)
        const subtotal = productItems.reduce(
          (sum, item) => sum + Number(item.total || 0),
          0,
        );
        // 2. `order.total` 此時是折扣金額
        const discountAmount = Number(order.total || 0);
        // 3. 正確的最終金額 = 商品總計 - 折扣金額
        return subtotal - discountAmount;
      }

      // 如果沒有使用優惠券，API 的 `order.total` 是正確的
      return Number(order.total || 0);
    },
    getOrders(currentPage = 1) {
      this.currentPage = currentPage;
      const url = `${VITE_APP_URL}/api/${VITE_APP_PATH}/admin/orders?page=${currentPage}`;
      this.axios.get(url).then((response) => {
        this.orders = response.data.orders;
      }).catch((error) => {
        this.addMessage({
          title: '錯誤',
          content: error.response.data.message,
          style: 'danger',
        });
      }).finally(() => {
        this.isLoading = false;
      });
    },
    openModal(item) {
      this.tempOrder = { ...item };
      this.isNew = false;
      this.$refs.orderModal.openModal();
    },
    openDelModal(item) {
      this.tempOrder = { ...item };
      this.$refs.delModal.openModal();
    },
    updatePaid(item) {
      this.isLoading = true;
      const url = `${VITE_APP_URL}/api/${VITE_APP_PATH}/admin/order/${item.id}`;
      const paid = {
        is_paid: item.is_paid,
      };
      this.axios.put(url, { data: paid }).then((response) => {
        this.$refs.orderModal.closeModal();
        this.getOrders(this.currentPage);
        this.addMessage({
          title: '更新成功',
          content: response.data.message,
          style: 'success',
        });
      }).catch((error) => {
        this.addMessage({
          title: '錯誤',
          content: error.response.data.message,
          style: 'danger',
        });
      }).finally(() => {
        this.isLoading = false;
      });
    },
    deleteOrder() {
      this.isLoading = true;
      const url = `${VITE_APP_URL}/api/${VITE_APP_PATH}/admin/order/${this.tempOrder.id}`;
      this.axios.delete(url).then((response) => {
        this.$refs.delModal.closeModal();
        this.getOrders(this.currentPage);
        this.addMessage({
          title: '刪除成功',
          content: response.data.message,
          style: 'success',
        });
      }).catch((error) => {
        this.addMessage({
          title: '錯誤',
          content: error.response.data.message,
          style: 'danger',
        });
      }).finally(() => {
        this.isLoading = false;
      });
    },
    // 組合時間
    formatDate(timestamp) {
      const getTime = new Date(timestamp * 1000);
      // const thisTime = `${getTime.getFullYear()}/${getTime.getMonth() + 1}/${getTime.getDate()}`;
      // return `${thisTime}`;
      return getTime.toLocaleDateString();
    },
  },
  mounted() {
    this.getOrders();
  },
};
</script>
