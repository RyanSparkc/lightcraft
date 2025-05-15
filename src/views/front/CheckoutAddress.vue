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
        <button type="submit" class="btn-primary">下一步</button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: 'CheckoutAddress',
  data() {
    return {
      form: {
        name: '',
        email: '',
        phone: '',
        address: '',
      },
      errors: {},
      shippingFee: 'NT$ 0',
      estimatedDelivery: '3–5 個工作天',
    };
  },
  methods: {
    validate() {
      this.errors = {};
      if (!this.form.name) {
        this.errors.name = '姓名為必填';
      }
      if (!this.form.email) {
        this.errors.email = 'Email為必填';
      } else if (!/^[\w.-]+@([\w-]+\.)+[\w-]{2,4}$/.test(this.form.email)) {
        this.errors.email = 'Email格式不正確';
      }
      if (!this.form.phone) {
        this.errors.phone = '手機為必填';
      } else if (!/^[0-9]+$/.test(this.form.phone)) {
        this.errors.phone = '手機格式需為數字';
      }
      if (!this.form.address) {
        this.errors.address = '地址為必填';
      }
      return Object.keys(this.errors).length === 0;
    },
    nextStep() {
      if (this.validate()) {
        // 將地址數據保存到 localStorage
        localStorage.setItem('checkoutAddress', JSON.stringify(this.form));
        this.$router.push('/checkout/payment');
      }
    },
    // 從 localStorage 讀取之前保存的地址數據
    loadAddressData() {
      const savedAddress = localStorage.getItem('checkoutAddress');
      if (savedAddress) {
        this.form = JSON.parse(savedAddress);
      }
    },
  },
  mounted() {
    // 組件載入時讀取之前保存的地址數據
    this.loadAddressData();
  },
};
</script>

<style scoped>
/* 表單驗證錯誤訊息 */
.invalid-feedback {
  color: #dc3545;
  font-size: 0.875rem;
  margin-top: 0.25rem;
}
</style>
