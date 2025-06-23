<template>
  <div
    class="modal fade"
    id="productModal"
    tabindex="-1"
    role="dialog"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
    ref="modal"
  >
    <div class="modal-dialog modal-xl" role="document">
      <div class="modal-content border-0">
        <div class="modal-header bg-dark text-white">
          <h5 class="modal-title" id="exampleModalLabel">
            <span>訂單細節</span>
          </h5>
          <button
            type="button"
            class="btn-close btn-close-white"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <div class="row">
            <div class="col-md-4">
              <h3>用戶資料</h3>
              <table class="table">
                <tbody v-if="tempOrder?.user">
                  <tr>
                    <th style="width: 100px">姓名</th>
                    <td>{{ tempOrder.user.name }}</td>
                  </tr>
                  <tr>
                    <th>Email</th>
                    <td>{{ tempOrder.user.email }}</td>
                  </tr>
                  <tr>
                    <th>電話</th>
                    <td>{{ tempOrder.user.tel }}</td>
                  </tr>
                  <tr>
                    <th>地址</th>
                    <td>{{ tempOrder.user.address }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div class="col-md-8">
              <h3>訂單細節</h3>
              <table class="table">
                <tbody>
                  <tr>
                    <th style="width: 100px">訂單編號</th>
                    <td>{{ tempOrder?.id }}</td>
                  </tr>
                  <tr>
                    <th>下單時間</th>
                    <td>{{ formatDate(tempOrder?.create_at) }}</td>
                  </tr>
                  <tr>
                    <th>付款時間</th>
                    <td>
                      <span v-if="tempOrder?.paid_date">
                        {{ formatDate(tempOrder.paid_date) }}
                      </span>
                      <span v-else>時間不正確</span>
                    </td>
                  </tr>
                  <tr>
                    <th>付款狀態</th>
                    <td>
                      <strong v-if="tempOrder?.is_paid" class="text-success"
                        >已付款</strong
                      >
                      <span v-else class="text-muted">尚未付款</span>
                    </td>
                  </tr>
                  <tr>
                    <th>總金額</th>
                    <td>
                      {{ formatCurrency(tempOrder?.total) }}
                    </td>
                  </tr>
                </tbody>
              </table>
              <h3>選購商品</h3>
              <table class="table">
                <thead>
                  <tr></tr>
                </thead>
                <tbody>
                  <tr
                    v-for="item in (tempOrder?.products || [])"
                    :key="item.id"
                  >
                    <th>
                      {{ item.product?.title }}
                    </th>
                    <td>{{ item.qty }} / {{ item.product?.unit }}</td>
                    <td class="text-end"></td>
                  </tr>
                </tbody>
              </table>
              <div class="d-flex justify-content-end">
                <div class="form-check">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    value=""
                    id="flexCheckDefault"
                    v-model="tempOrder.is_paid"
                  />
                  <label class="form-check-label" for="flexCheckDefault">
                    <span v-if="tempOrder?.is_paid">已付款</span>
                    <span v-else>未付款</span>
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-outline-secondary"
            data-bs-dismiss="modal"
          >
            取消
          </button>
          <button
            type="button"
            class="btn btn-primary"
            @click="emit('update-paid', tempOrder)"
          >
            修改付款狀態
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue';
import { Modal } from 'bootstrap';
import { date, currency } from '@/methods/filters';

// Props 定義
const props = defineProps({
  order: {
    type: Object,
    default: () => ({}),
  },
});

// Emits 定義
const emit = defineEmits(['update-paid']);

// 響應式數據
const modal = ref(null);
const modalInstance = ref(null);
const tempOrder = ref({});

// Filter 函數
const formatDate = (timestamp) => {
  if (!timestamp) return '';
  return date(timestamp);
};

const formatCurrency = (amount) => {
  if (!amount) return '';
  return currency(amount);
};

// Modal 控制方法 (從 modalMixin 拆解而來)
const openModal = () => {
  modalInstance.value?.show();
};

const closeModal = () => {
  modalInstance.value?.hide();
};

// 監聽 order prop 變化
watch(() => props.order, (newOrder) => {
  if (newOrder && Object.keys(newOrder).length > 0) {
    tempOrder.value = { ...newOrder };
  }
}, { immediate: true, deep: true });

// 生命週期
onMounted(() => {
  if (modal.value) {
    modalInstance.value = new Modal(modal.value, {
      backdrop: 'static',
      keyboard: false,
    });
  }
});

// 暴露方法供父組件調用
defineExpose({
  openModal,
  closeModal,
});
</script>
