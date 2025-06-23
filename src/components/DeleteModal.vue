<template>
  <div
    id="delProductModal"
    ref="delProductModal"
    class="modal fade"
    tabindex="-1"
    aria-labelledby="delProductModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content border-0">
        <div class="modal-header bg-danger text-white">
          <h5 id="delProductModalLabel" class="modal-title">
            <span>刪除產品</span>
          </h5>
          <button
            type="button"
            class="btn-close btn-close-white"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          是否刪除
          <strong class="text-danger">{{ tempProduct?.title }}</strong>
          商品(刪除後將無法恢復)。
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-outline-secondary"
            data-bs-dismiss="modal"
          >
            取消
          </button>
          <button type="button" class="btn btn-danger" @click="deleteProduct">
            確認刪除
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import useToastMessageStore from '@/stores/toastMessage';
import { Modal } from 'bootstrap';

const { VITE_APP_URL, VITE_APP_PATH } = import.meta.env;

// Props 定義
const props = defineProps({
  tempProduct: {
    type: Object,
    required: true,
  },
});

// Emits 定義
const emit = defineEmits(['update']);

// 響應式數據
const delProductModal = ref(null);
const modalInstance = ref(null);

// Store
const toastStore = useToastMessageStore();
const { addMessage } = toastStore;

// 方法定義（注意順序，避免使用前未定義的問題）
const openModal = () => {
  modalInstance.value?.show();
};

const closeModal = () => {
  modalInstance.value?.hide();
};

const deleteProduct = async () => {
  try {
    const response = await axios.delete(
      `${VITE_APP_URL}/api/${VITE_APP_PATH}/admin/product/${props.tempProduct.id}`,
    );

    addMessage({
      title: '成功刪除產品',
      content: response.data.message,
      style: 'success',
    });

    closeModal();
    emit('update');
  } catch (error) {
    addMessage({
      title: '刪除產品失敗',
      content: error.response?.data?.message || '刪除失敗',
      style: 'danger',
    });
  }
};

// 生命週期
onMounted(() => {
  if (delProductModal.value) {
    modalInstance.value = new Modal(delProductModal.value, {
      keyboard: false,
      backdrop: 'static',
    });
  }
});

// 暴露方法供父組件調用
defineExpose({
  openModal,
  closeModal,
});
</script>
