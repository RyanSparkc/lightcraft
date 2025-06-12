<template>
  <ToastMessages />
  <!-- 全螢幕漸層背景 -->
  <div class="login-background min-vh-100 d-flex align-items-center">
    <!-- 裝飾性幾何圖形 -->
    <div class="geometric-decoration"></div>

    <div class="container">
      <div class="row justify-content-center">
        <div class="col-12 col-sm-8 col-md-6 col-lg-4">
          <!-- 登入卡片 -->
          <div class="login-card shadow-large rounded-xl-custom p-4 p-md-5">
            <!-- Logo 或品牌區域 -->
            <div class="text-center mb-4">
              <div
                class="login-logo gradient-bg d-inline-flex align-items-center justify-content-center"
              >
                <i class="bi bi-house-door fs-1 text-white"></i>
              </div>
              <h1 class="h3 mt-3 mb-1 fw-bold text-primary-custom">歡迎回來</h1>
              <p class="text-muted-custom mb-0">請登入您的帳戶</p>
            </div>

            <!-- 登入表單 -->
            <form @submit.prevent="login" class="login-form">
              <!-- Email 輸入框 -->
              <div class="form-group mb-3">
                <label
                  for="username"
                  class="form-label text-secondary-custom fw-medium"
                >
                  電子郵件
                </label>
                <div class="input-wrapper">
                  <i class="bi bi-envelope input-icon"></i>
                  <input
                    type="email"
                    class="form-control form-control-modern"
                    id="username"
                    placeholder="example@gmail.com"
                    required
                    v-model="displayEmail"
                  />
                </div>
              </div>

              <!-- 密碼輸入框 -->
              <div class="form-group mb-4">
                <label
                  for="password"
                  class="form-label text-secondary-custom fw-medium"
                >
                  密碼
                </label>
                <div class="input-wrapper">
                  <i class="bi bi-lock input-icon"></i>
                  <input
                    type="password"
                    class="form-control form-control-modern"
                    id="password"
                    placeholder="請輸入您的密碼"
                    required
                    v-model="user.password"
                  />
                </div>
              </div>

              <!-- 登入按鈕 -->
              <button
                type="submit"
                class="btn btn-login w-100 fw-medium transition-smooth"
                :disabled="isLoading"
              >
                <span v-if="!isLoading">
                  <i class="bi bi-box-arrow-in-right me-2"></i>
                  立即登入
                </span>
                <span v-else>
                  <span
                    class="spinner-border spinner-border-sm me-2"
                    role="status"
                  ></span>
                  登入中...
                </span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { mapActions } from 'pinia';
import useToastMessageStore from '@/stores/toastMessage';
import ToastMessages from '@/components/ToastMessages.vue';

const { VITE_APP_URL } = import.meta.env;

export default {
  data() {
    return {
      displayEmail: 'example@gmail.com',
      user: {
        username: 'tomgx09@gmail.com',
        password: 'vue9999',
      },
      isLoading: false,
    };
  },
  components: {
    ToastMessages,
  },
  methods: {
    ...mapActions(useToastMessageStore, ['addMessage']),
    async login() {
      this.isLoading = true;
      try {
        // 準備實際要送出的登入資料
        const loginData = {
          username: this.user.username, // 實際使用 tomgx09@gmail.com
          password: this.user.password,
        };
        const res = await axios.post(`${VITE_APP_URL}/admin/signin`, loginData);
        const { token, expired } = res.data;
        document.cookie = `hexToken=${token}; expires=${new Date(expired)};`;
        this.addMessage({
          title: '登入成功',
          content: '歡迎回來！正在跳轉到管理介面...',
          style: 'success',
        });

        setTimeout(() => {
          this.$router.push('/admin/products');
        }, 1000);
      } catch (err) {
        this.addMessage({
          title: '登入失敗',
          content: err.response?.data?.message || '登入時發生錯誤，請稍後再試',
          style: 'danger',
        });
      } finally {
        this.isLoading = false;
      }
    },
  },
};
</script>

<style scoped>
/* 主要背景 */
.login-background {
  background: linear-gradient(135deg, #ffc107 0%, #ff8f00 100%);
  position: relative;
  overflow: hidden;
}

/* 裝飾性幾何圖形 */
.geometric-decoration {
  position: absolute;
  top: -50%;
  right: -20%;
  width: 40%;
  height: 200%;
  background: rgba(255, 255, 255, 0.05);
  transform: rotate(15deg);
  z-index: 1;
}

.geometric-decoration::before {
  content: '';
  position: absolute;
  top: 20%;
  left: -50%;
  width: 100%;
  height: 60%;
  background: rgba(255, 255, 255, 0.03);
  transform: rotate(-30deg);
}

/* 登入卡片 */
.login-card {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  position: relative;
  z-index: 2;
  transition: all 0.3s ease;
}

.login-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15) !important;
}

/* Logo 設計 */
.login-logo {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: linear-gradient(135deg, #ffc107 0%, #ff8f00 100%);
  box-shadow: 0 10px 30px rgba(255, 193, 7, 0.4);
}

/* 表單樣式 */
.form-label {
  font-size: 0.9rem;
  margin-bottom: 0.5rem;
}

.input-wrapper {
  position: relative;
}

.input-icon {
  position: absolute;
  left: 15px;
  top: 50%;
  transform: translateY(-50%);
  color: #adb5bd;
  z-index: 3;
  font-size: 1.1rem;
}

.form-control-modern {
  border: 2px solid #e9ecef;
  border-radius: 12px;
  padding: 12px 15px 12px 45px;
  font-size: 1rem;
  transition: all 0.3s ease;
  background: rgba(255, 255, 255, 0.8);
}

.form-control-modern:focus {
  border-color: #ffc107;
  box-shadow: 0 0 0 0.2rem rgba(255, 193, 7, 0.25);
  background: rgba(255, 255, 255, 0.95);
}

.form-control-modern::placeholder {
  color: #adb5bd;
  font-size: 0.95rem;
}

/* 登入按鈕 */
.btn-login {
  background: linear-gradient(135deg, #ffc107 0%, #ff8f00 100%);
  border: none;
  border-radius: 12px;
  padding: 12px 24px;
  font-size: 1.1rem;
  color: #2c3e50;
  font-weight: 600;
  box-shadow: 0 5px 15px rgba(255, 193, 7, 0.4);
  transition: all 0.3s ease;
}

.btn-login:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(255, 193, 7, 0.6);
  background: linear-gradient(135deg, #ff8f00 0%, #ffc107 100%);
  color: #2c3e50;
}

.btn-login:active {
  transform: translateY(0);
}

.btn-login:disabled {
  opacity: 0.7;
  transform: none;
  cursor: not-allowed;
}

/* 響應式設計 */
@media (max-width: 576px) {
  .login-card {
    margin: 1rem;
    padding: 2rem 1.5rem !important;
  }

  .geometric-decoration {
    display: none;
  }
}

/* 動畫效果 */
.login-card {
  animation: fadeInUp 0.8s ease;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* 載入動畫 */
.spinner-border-sm {
  width: 1rem;
  height: 1rem;
}
</style>
