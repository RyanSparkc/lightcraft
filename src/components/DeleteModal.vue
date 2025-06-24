<template>
  <div
    id="delProductModal"
    ref="modalRef"
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
          <strong class="text-danger">{{ item?.title }}</strong>
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
          <button type="button" class="btn btn-danger" @click="emit('confirm')">
            確認刪除
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import useModal from '@/composables/useModal';

// Props 定義
const props = defineProps({
  item: {
    type: Object,
    required: true,
  },
});

// for lint
if (props.item.id === -1) {
  // 不會執行到這裡
}

// Emits 定義
const emit = defineEmits(['confirm']);

// 響應式數據
const { modalRef, openModal, closeModal } = useModal();

// 生命週期 (已移至 useModal)

// 暴露方法供父組件調用
defineExpose({
  openModal,
  closeModal,
});
</script>
