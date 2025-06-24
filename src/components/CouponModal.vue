<template>
  <!-- Modal -->
  <div
    class="modal fade"
    id="staticBackdrop"
    data-bs-backdrop="static"
    data-bs-keyboard="false"
    tabindex="-1"
    aria-labelledby="staticBackdropLabel"
    aria-hidden="true"
    ref="modalRef"
  >
    <div class="modal-dialog">
      <div class="modal-content ">
        <div class="modal-header bg-dark text-white">
          <h1 class="modal-title fs-5" id="staticBackdropLabel">編輯優惠券</h1>
          <button
            type="button"
            class="btn-close btn-close-white"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <form>
            <div class="mb-3">
              <label for="coupon-name" class="col-form-label">名稱</label>
              <input
                type="text"
                class="form-control"
                id="coupon-name"
                v-model="tempCoupon.title"
                placeholder="請輸入標題"
              />
            </div>
            <div class="mb-3">
              <label for="coupon-number" class="col-form-label">優惠碼</label>
              <input
                type="text"
                class="form-control"
                id="coupon-number"
                v-model="tempCoupon.code"
                placeholder="請輸入優惠碼"
              />
            </div>
            <div class="mb-3">
              <label for="coupon-date" class="col-form-label">到期日</label>
              <input
                type="date"
                class="form-control"
                id="coupon-date"
                v-model="dueDate"
              />
            </div>
            <div class="mb-3">
              <label for="coupon-price" class="col-form-label"
                >折扣百分比</label
              >
              <input
                type="number"
                class="form-control"
                id="coupon-price"
                min="0"
                v-model.number="tempCoupon.percent"
              />
            </div>
            <div class="mb-3">
              <div class="form-check">
                <input
                  type="checkbox"
                  class="form-check-input"
                  id="is-enabled"
                  min="0"
                  :true-value="1"
                  :false-value="0"
                  v-model="tempCoupon.is_enabled"
                />
                <label for="is-enabled" class="form-check-label"
                  >是否啟用</label
                >
              </div>
            </div>
          </form>
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-secondary"
            data-bs-dismiss="modal"
          >
            關閉
          </button>
          <button
            type="button"
            class="btn btn-primary"
            @click="handleUpdateCoupon"
          >
            {{ isNew ? '新增優惠券' : '更新優惠券' }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';
import useModal from '@/composables/useModal';

// Props 定義
const props = defineProps({
  coupon: {
    type: Object,
    default: () => ({}),
  },
  isNew: {
    type: Boolean,
    default: false,
  },
});

// Emits 定義
const emit = defineEmits(['update-coupon']);

// 響應式數據
const tempCoupon = ref({});
const dueDate = ref('');

// useModal Composable
const { modalRef, openModal, closeModal } = useModal();

// 處理更新優惠券
const handleUpdateCoupon = () => {
  console.log('準備發送的優惠券資料:', tempCoupon.value); // 除錯用

  // 確保資料完整性
  if (!tempCoupon.value || Object.keys(tempCoupon.value).length === 0) {
    console.warn('tempCoupon 沒有完整的資料');
    return;
  }

  // 確保 due_date 存在
  if (!tempCoupon.value.due_date && dueDate.value) {
    tempCoupon.value.due_date = Math.floor(new Date(dueDate.value) / 1000);
  }

  emit('update-coupon', tempCoupon.value);
};

// 監聽器
watch(dueDate, (newDate) => {
  if (newDate) {
    tempCoupon.value.due_date = Math.floor(new Date(newDate) / 1000);
  }
});

watch(() => props.coupon, (newCoupon) => {
  if (newCoupon && Object.keys(newCoupon).length > 0) {
    tempCoupon.value = { ...newCoupon };

    // 安全的日期轉換
    if (newCoupon.due_date && !Number.isNaN(newCoupon.due_date)) {
      try {
        const date = new Date(newCoupon.due_date * 1000);
        if (date instanceof Date && !Number.isNaN(date.getTime())) {
          const dateAndTime = date.toISOString().split('T');
          [dueDate.value] = dateAndTime;
        } else {
          // 如果日期無效，設置為今天
          [dueDate.value] = new Date().toISOString().split('T');
        }
      } catch (error) {
        console.warn('日期轉換錯誤:', error);
        [dueDate.value] = new Date().toISOString().split('T');
      }
    } else {
      // 如果沒有 due_date，設置為今天
      [dueDate.value] = new Date().toISOString().split('T');
    }
  }
}, { immediate: true });

// 生命週期 (已移至 useModal)

// 暴露方法供父組件使用
defineExpose({
  openModal,
  closeModal,
});
</script>
