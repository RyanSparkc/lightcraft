<template>
  <LoadingOverlay :active="isLoading" />
  <h2>優惠券</h2>
  <div class="text-end mt-4">
    <button
      class="btn btn-primary"
      type="button"
      @click="openCouponModal(true)"
    >
      建立新優惠券
    </button>
  </div>
  <table class=" table mt-4">
    <thead>
      <tr>
        <th scope="col">名稱</th>
        <th scope="col">折扣百分比</th>
        <th scope="col">到期日</th>
        <th scope="col">是否啟用</th>
        <th scope="col">編輯</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(item, key) in coupons" :key="key">
        <th scope="row">{{item.title}}</th>
        <td>{{ item.percent }} %</td>
        <td>{{ $filters.date(item.due_date) }}</td>
        <td>
          <span v-if="item.is_enabled" class="text-success">啟用</span>
          <span v-else class="text-danger">未啟用</span>
        </td>
        <td>
          <div class="btn-group">
            <button
              type="button"
              class="btn btn-outline-primary btn-sm"
              @click="openCouponModal(false, item)"
            >
              編輯
            </button>
            <button
              type="button"
              class="btn btn-outline-danger btn-sm"
              @click="openDelCouponModal(item)"
            >
              刪除
            </button>
          </div>
        </td>
      </tr>
    </tbody>
  </table>
  <CouponModal
    :coupon="tempCoupon"
    :isNew="isNew"
    ref="couponModal"
    @update-coupon="updateCoupon"
  />
  <DelModal ref="delModal" :item="tempCoupon" @del-item="deleteCoupon" />
</template>

<script>
import { mapActions } from 'pinia';
import useToastMessageStore from '@/stores/toastMessage';

import CouponModal from '@/components/CouponModal.vue';
import DelModal from '@/components/DelModal.vue';

const { VITE_APP_URL, VITE_APP_PATH } = import.meta.env;

export default {
  components: {
    DelModal,
    CouponModal,
  },
  data() {
    return {
      isLoading: false,
      isNew: false,
      coupons: {},
      tempCoupon: {
        title: '',
        is_enabled: 0,
        percent: 100,
        code: '',
      },
      due_date: '',
      modal: '',
    };
  },
  watch: {
    due_date() {
      this.tempCoupon.due_date = Math.floor(new Date(this.due_date) / 1000);
    },
  },
  methods: {
    ...mapActions(useToastMessageStore, ['addMessage']),
    getCoupons() {
      this.isLoading = true;
      this.axios.get(`${VITE_APP_URL}/api/${VITE_APP_PATH}/admin/coupons`)
        .then((res) => {
          this.coupons = res.data.coupons;
          this.isLoading = false;
        })
        .catch((err) => {
          this.isLoading = false;
          this.addMessage({
            title: '錯誤',
            content: err.response.data.message,
            style: 'danger',
          });
        });
    },
    openCouponModal(isNew, item) {
      this.isNew = isNew;
      if (this.isNew) {
        this.tempCoupon = {
          due_date: new Date().getTime() / 1000,
        };
      } else {
        this.tempCoupon = { ...item };
        // 將時間格式改為 YYYY-MM-DD
        const dateAndTime = new Date(this.tempCoupon.due_date * 1000)
          .toISOString().split('T');
        [this.due_date] = dateAndTime;
      }
      this.$refs.couponModal.openModal();
    },
    openDelCouponModal(item) {
      this.tempCoupon = { ...item };
      this.$refs.delModal.openModal();
    },
    updateCoupon(tempCoupon) {
      this.isLoading = true;
      let url = `${VITE_APP_URL}/api/${VITE_APP_PATH}/admin/coupon`;
      let httpMethods = 'post';
      let data = { ...tempCoupon };

      if (!this.isNew) {
        url = `${VITE_APP_URL}/api/${VITE_APP_PATH}/admin/coupon/${tempCoupon.id}`;
        httpMethods = 'put';
        data = this.tempCoupon;
      }
      this.axios[httpMethods](url, { data })
        .then((res) => {
          this.isLoading = false;
          this.addMessage({
            title: '新增優惠券',
            content: res.data.message,
            style: 'success',
          });
          this.getCoupons();
          this.$refs.couponModal.closeModal();
        })
        .catch((err) => {
          this.isLoading = false;
          this.addMessage({
            title: '錯誤',
            content: err.response.data.message,
            style: 'danger',
          });
        });
    },
    deleteCoupon() {
      this.isLoading = true;
      const url = `${VITE_APP_URL}/api/${VITE_APP_PATH}/admin/coupon/${this.tempCoupon.id}`;
      this.axios.delete(url)
        .then((res) => {
          this.isLoading = false;
          this.addMessage({
            title: '刪除優惠券',
            content: res.data.message,
            style: 'success',
          });
          this.getCoupons();
          this.$refs.delModal.closeModal();
        })
        .catch((err) => {
          this.isLoading = false;
          this.addMessage({
            title: '錯誤',
            content: err.response.data.message,
            style: 'danger',
          });
        });
    },
  },
  mounted() {
    this.getCoupons();
  },
};
</script>
