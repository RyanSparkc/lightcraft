<template>
  <LoadingOverlay :active="isLoading" />

  <!-- 頁面標題區域 -->
  <PageHeader
    icon="fas fa-ticket-alt"
    icon-color="text-info"
    title="優惠券管理"
    subtitle="管理促銷優惠券，設定折扣與使用期限"
  />

  <!-- 統計卡片 -->
  <div class="row mb-4">
    <div class="col-md-3 mb-3">
      <div class="card border-0 shadow-sm">
        <div class="card-body">
          <div class="d-flex align-items-center">
            <div class="flex-grow-1">
              <p class="text-muted mb-1 small">總優惠券數</p>
              <h4 class="mb-0 fw-bold">{{ couponStats.total }}</h4>
            </div>
            <div class="text-primary">
              <i class="fas fa-tickets-alt fa-2x"></i>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="col-md-3 mb-3">
      <div class="card border-0 shadow-sm">
        <div class="card-body">
          <div class="d-flex align-items-center">
            <div class="flex-grow-1">
              <p class="text-muted mb-1 small">啟用中</p>
              <h4 class="mb-0 fw-bold text-success">
                {{ couponStats.active }}
              </h4>
            </div>
            <div class="text-success">
              <i class="fas fa-check-circle fa-2x"></i>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="col-md-3 mb-3">
      <div class="card border-0 shadow-sm">
        <div class="card-body">
          <div class="d-flex align-items-center">
            <div class="flex-grow-1">
              <p class="text-muted mb-1 small">即將到期</p>
              <h4 class="mb-0 fw-bold text-warning">
                {{ couponStats.expiringSoon }}
              </h4>
            </div>
            <div class="text-warning">
              <i class="fas fa-exclamation-triangle fa-2x"></i>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="col-md-3 mb-3">
      <div class="card border-0 shadow-sm">
        <div class="card-body">
          <div class="d-flex align-items-center">
            <div class="flex-grow-1">
              <p class="text-muted mb-1 small">已過期</p>
              <h4 class="mb-0 fw-bold text-danger">
                {{ couponStats.expired }}
              </h4>
            </div>
            <div class="text-danger">
              <i class="fas fa-times-circle fa-2x"></i>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- 搜尋和篩選區域 -->
  <div class="card border-0 shadow-sm mb-4">
    <div class="card-body">
      <div class="row g-3">
        <div class="col-md-4">
          <label class="form-label small text-muted">搜尋優惠券</label>
          <div class="input-group">
            <span class="input-group-text bg-light border-end-0">
              <i class="fas fa-search text-muted"></i>
            </span>
            <input
              type="text"
              class="form-control border-start-0"
              placeholder="搜尋優惠券名稱或代碼..."
              v-model="searchQuery"
            />
          </div>
        </div>
        <div class="col-md-3">
          <label class="form-label small text-muted">啟用狀態</label>
          <select class="form-select" v-model="statusFilter">
            <option value="">全部狀態</option>
            <option value="enabled">啟用中</option>
            <option value="disabled">已停用</option>
          </select>
        </div>
        <div class="col-md-3">
          <label class="form-label small text-muted">有效期限</label>
          <select class="form-select" v-model="expiryFilter">
            <option value="">全部狀態</option>
            <option value="valid">有效</option>
            <option value="expiring">即將到期</option>
            <option value="expired">已過期</option>
          </select>
        </div>
        <div class="col-md-2 d-flex align-items-end">
          <button class="btn btn-outline-secondary w-100" @click="clearFilters">
            <i class="fas fa-refresh me-1"></i>
            清除
          </button>
        </div>
      </div>
    </div>
  </div>

  <!-- 優惠券列表 -->
  <div class="card border-0 shadow-sm">
    <div class="card-header bg-white border-bottom">
      <div class="d-flex justify-content-between align-items-center">
        <h5 class="mb-0 fw-semibold">優惠券列表</h5>
        <div class="d-flex align-items-center gap-3">
          <span class="badge bg-light text-dark"
            >共 {{ filteredCoupons.length }} 張優惠券</span
          >
          <button
            class="btn btn-primary btn-sm"
            type="button"
            @click="openCouponModal(true)"
          >
            <i class="fas fa-plus me-1"></i>
            建立新優惠券
          </button>
        </div>
      </div>
    </div>
    <div class="card-body p-0">
      <div class="table-responsive">
        <table class="table table-hover align-middle mb-0">
          <thead class="bg-light">
            <tr>
              <th class="border-0 ps-4">優惠券名稱</th>
              <th class="border-0">優惠券代碼</th>
              <th class="border-0">折扣</th>
              <th class="border-0">到期日</th>
              <th class="border-0">狀態</th>
              <th class="border-0 pe-4">操作</th>
            </tr>
          </thead>
          <tbody>
            <template v-for="item in filteredCoupons" :key="item.id">
              <tr class="border-bottom">
                <td class="ps-4">
                  <div class="d-flex align-items-center">
                    <div
                      class="avatar-sm rounded-circle bg-info bg-opacity-10 me-2 d-flex align-items-center justify-content-center"
                    >
                      <i class="fas fa-ticket-alt text-info"></i>
                    </div>
                    <div>
                      <div class="text-dark fw-medium">{{ item.title }}</div>
                    </div>
                  </div>
                </td>
                <td>
                  <code
                    class="bg-light text-dark px-2 py-1 rounded small"
                    >{{ item.code }}</code
                  >
                </td>
                <td>
                  <span class="fw-bold text-success fs-5"
                    >{{ item.percent }}%</span
                  >
                  <small class="text-muted d-block">折扣</small>
                </td>
                <td>
                  <div class="text-dark fw-medium">
                    {{ formatDate(item.due_date) }}
                  </div>
                  <small :class="getExpiryStatusClass(item.due_date)">
                    {{ getExpiryStatusText(item.due_date) }}
                  </small>
                </td>
                <td>
                  <span :class="getStatusBadgeClass(item)">
                    <i :class="getStatusIcon(item)"></i>
                    {{ getStatusText(item) }}
                  </span>
                </td>
                <td class="pe-4">
                  <div class="btn-group">
                    <button
                      class="btn btn-outline-primary btn-sm"
                      type="button"
                      @click="openCouponModal(false, item)"
                      title="編輯優惠券"
                    >
                      <i class="fas fa-edit"></i>
                    </button>
                    <button
                      class="btn btn-outline-danger btn-sm"
                      type="button"
                      @click="openDelCouponModal(item)"
                      title="刪除優惠券"
                    >
                      <i class="fas fa-trash"></i>
                    </button>
                  </div>
                </td>
              </tr>
            </template>
          </tbody>
        </table>

        <!-- 空狀態 -->
        <div v-if="filteredCoupons.length === 0" class="text-center py-5">
          <i class="fas fa-ticket-alt fa-3x text-muted mb-3"></i>
          <h5 class="text-muted">沒有找到符合條件的優惠券</h5>
          <p class="text-muted">請調整搜尋條件或建立新的優惠券</p>
        </div>
      </div>
    </div>
  </div>

  <CouponModal
    :coupon="tempCoupon"
    :isNew="isNew"
    ref="couponModal"
    @update-coupon="updateCoupon"
  />
  <DelModal ref="delModal" :item="tempCoupon" @del-item="deleteCoupon" />
</template>

<script setup>
import {
  ref, computed, watch, onMounted,
} from 'vue';
import axios from 'axios';
import useToastMessageStore from '@/stores/toastMessage';

import PageHeader from '@/components/PageHeader.vue';
import CouponModal from '@/components/CouponModal.vue';
import DelModal from '@/components/DelModal.vue';

const { VITE_APP_URL, VITE_APP_PATH } = import.meta.env;

// Store
const toastStore = useToastMessageStore();

// 響應式數據
const isLoading = ref(false);
const isNew = ref(false);
const coupons = ref({});
const tempCoupon = ref({
  title: '',
  is_enabled: 0,
  percent: 100,
  code: '',
});
const dueDate = ref('');
const searchQuery = ref('');
const statusFilter = ref('');
const expiryFilter = ref('');

// 模板引用
const couponModal = ref(null);
const delModal = ref(null);

// 工具方法（需要提前定義）
const formatDate = (timestamp) => {
  const date = new Date(timestamp * 1000);
  return date.toLocaleDateString('zh-TW');
};

const isExpired = (timestamp) => {
  const now = new Date();
  const expiryDate = new Date(timestamp * 1000);
  return expiryDate < now;
};

const isExpiringSoon = (timestamp) => {
  const now = new Date();
  const expiryDate = new Date(timestamp * 1000);
  const daysDiff = Math.ceil((expiryDate - now) / (1000 * 60 * 60 * 24));
  return daysDiff <= 7 && daysDiff > 0;
};

const getExpiryStatusClass = (timestamp) => {
  if (isExpired(timestamp)) {
    return 'text-danger';
  }
  if (isExpiringSoon(timestamp)) {
    return 'text-warning';
  }
  return 'text-success';
};

const getExpiryStatusText = (timestamp) => {
  const now = new Date();
  const expiryDate = new Date(timestamp * 1000);
  const daysDiff = Math.ceil((expiryDate - now) / (1000 * 60 * 60 * 24));

  if (daysDiff < 0) {
    return `已過期 ${Math.abs(daysDiff)} 天`;
  }
  if (daysDiff === 0) {
    return '今天到期';
  }
  if (daysDiff <= 7) {
    return `${daysDiff} 天後到期`;
  }
  return '有效期限內';
};

const getStatusBadgeClass = (item) => {
  if (!item.is_enabled) {
    return 'badge bg-secondary';
  }
  if (isExpired(item.due_date)) {
    return 'badge bg-danger';
  }
  if (isExpiringSoon(item.due_date)) {
    return 'badge bg-warning text-dark';
  }
  return 'badge bg-success';
};

const getStatusIcon = (item) => {
  if (!item.is_enabled) {
    return 'fas fa-pause me-1';
  }
  if (isExpired(item.due_date)) {
    return 'fas fa-times me-1';
  }
  if (isExpiringSoon(item.due_date)) {
    return 'fas fa-exclamation-triangle me-1';
  }
  return 'fas fa-check me-1';
};

const getStatusText = (item) => {
  if (!item.is_enabled) {
    return '已停用';
  }
  if (isExpired(item.due_date)) {
    return '已過期';
  }
  if (isExpiringSoon(item.due_date)) {
    return '即將到期';
  }
  return '啟用中';
};

// 計算屬性
const couponsArray = computed(() => Object.values(coupons.value || {}));

const filteredCoupons = computed(() => {
  let filtered = couponsArray.value;

  // 搜尋篩選
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase();
    filtered = filtered.filter((coupon) => coupon.title.toLowerCase().includes(query)
      || coupon.code.toLowerCase().includes(query));
  }

  // 啟用狀態篩選
  if (statusFilter.value === 'enabled') {
    filtered = filtered.filter((coupon) => coupon.is_enabled);
  } else if (statusFilter.value === 'disabled') {
    filtered = filtered.filter((coupon) => !coupon.is_enabled);
  }

  // 有效期限篩選
  if (expiryFilter.value === 'valid') {
    filtered = filtered.filter((coupon) => !isExpired(coupon.due_date));
  } else if (expiryFilter.value === 'expiring') {
    filtered = filtered.filter((coupon) => isExpiringSoon(coupon.due_date));
  } else if (expiryFilter.value === 'expired') {
    filtered = filtered.filter((coupon) => isExpired(coupon.due_date));
  }

  return filtered;
});

const couponStats = computed(() => {
  const couponsArrayValue = couponsArray.value;
  const total = couponsArrayValue.length;
  const active = couponsArrayValue.filter((coupon) => coupon.is_enabled && !isExpired(coupon.due_date)).length;
  const expiringSoon = couponsArrayValue.filter((coupon) => isExpiringSoon(coupon.due_date)).length;
  const expired = couponsArrayValue.filter((coupon) => isExpired(coupon.due_date)).length;

  return {
    total,
    active,
    expiringSoon,
    expired,
  };
});

// 監聽器
watch(dueDate, () => {
  tempCoupon.value.due_date = Math.floor(new Date(dueDate.value) / 1000);
});

// 方法
const getCoupons = () => {
  isLoading.value = true;
  axios.get(`${VITE_APP_URL}/api/${VITE_APP_PATH}/admin/coupons`)
    .then((res) => {
      coupons.value = res.data.coupons;
      isLoading.value = false;
    })
    .catch((err) => {
      isLoading.value = false;
      toastStore.addMessage({
        title: '錯誤',
        content: err.response.data.message,
        style: 'danger',
      });
    });
};

const openCouponModal = (isNewCoupon, item) => {
  console.log('開啟優惠券 Modal:', { isNewCoupon, item }); // 除錯用

  isNew.value = isNewCoupon;
  if (isNew.value) {
    // 新增模式：設定預設值
    tempCoupon.value = {
      title: '',
      code: '',
      percent: 0,
      is_enabled: 1,
      due_date: Math.floor(new Date().getTime() / 1000),
    };
  } else {
    // 編輯模式：複製現有資料
    tempCoupon.value = { ...item };
  }

  console.log('設定的 tempCoupon:', tempCoupon.value); // 除錯用
  couponModal.value.openModal();
};

const openDelCouponModal = (item) => {
  tempCoupon.value = { ...item };
  delModal.value.openModal();
};

const updateCoupon = (tempCouponData) => {
  console.log('收到的優惠券資料:', tempCouponData); // 除錯用

  isLoading.value = true;
  let url = `${VITE_APP_URL}/api/${VITE_APP_PATH}/admin/coupon`;
  let httpMethods = 'post';
  let data = { ...tempCouponData };

  if (!isNew.value) {
    url = `${VITE_APP_URL}/api/${VITE_APP_PATH}/admin/coupon/${tempCouponData.id}`;
    httpMethods = 'put';
    data = { ...tempCouponData }; // 修正：使用傳入的資料而不是父組件的 tempCoupon
  }

  console.log('API 請求:', { url, httpMethods, data }); // 除錯用

  axios[httpMethods](url, { data })
    .then((res) => {
      isLoading.value = false;
      toastStore.addMessage({
        title: isNew.value ? '新增優惠券' : '更新優惠券', // 修正：根據模式顯示正確標題
        content: res.data.message,
        style: 'success',
      });
      getCoupons();
      couponModal.value.closeModal();
    })
    .catch((err) => {
      isLoading.value = false;
      toastStore.addMessage({
        title: '錯誤',
        content: err.response?.data?.message || '操作失敗',
        style: 'danger',
      });
      console.error('API 錯誤:', err); // 除錯用
    });
};

const deleteCoupon = () => {
  isLoading.value = true;
  const url = `${VITE_APP_URL}/api/${VITE_APP_PATH}/admin/coupon/${tempCoupon.value.id}`;
  axios.delete(url)
    .then((res) => {
      isLoading.value = false;
      toastStore.addMessage({
        title: '刪除優惠券',
        content: res.data.message,
        style: 'success',
      });
      getCoupons();
      delModal.value.closeModal();
    })
    .catch((err) => {
      isLoading.value = false;
      toastStore.addMessage({
        title: '錯誤',
        content: err.response.data.message,
        style: 'danger',
      });
    });
};

const clearFilters = () => {
  searchQuery.value = '';
  statusFilter.value = '';
  expiryFilter.value = '';
};

// 生命週期
onMounted(() => {
  getCoupons();
});
</script>

<style scoped>
.avatar-sm {
  width: 2rem;
  height: 2rem;
}

.table > :not(caption) > * > * {
  padding: 1rem 0.75rem;
}

.table tbody tr:hover {
  background-color: rgba(var(--bs-primary-rgb), 0.03);
}

.card {
  transition: all 0.2s ease-in-out;
}

.badge {
  font-size: 0.75rem;
  padding: 0.375rem 0.75rem;
}

.btn-group .btn {
  transition: all 0.2s ease-in-out;
}

.btn-group .btn:hover {
  transform: translateY(-1px);
}

/* 搜尋輸入框樣式 */
.input-group .form-control:focus {
  border-color: var(--bs-primary);
  box-shadow: 0 0 0 0.2rem rgba(var(--bs-primary-rgb), 0.25);
}

.input-group-text {
  background-color: var(--bs-gray-100);
  border-color: var(--bs-border-color);
}

/* 空狀態樣式 */
.text-center i {
  opacity: 0.5;
}
</style>
