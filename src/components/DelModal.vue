<template>
  <div
    class="modal fade"
    id="delModal"
    tabindex="-1"
    role="dialog"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
    ref="modalRef"
  >
    <div class="modal-dialog" role="document">
      <div class="modal-content border-0">
        <div class="modal-header bg-danger text-white">
          <h5 class="modal-title">
            <span>刪除 {{ item?.title }}</span>
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
          (刪除後將無法恢復)。
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
            class="btn btn-danger"
            @click="emit('del-item')"
          >
            確認刪除
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { Modal } from 'bootstrap';

// Props 定義
defineProps({
  item: {
    type: Object,
    required: true,
  },
});

// Emits 定義
const emit = defineEmits(['del-item']);

// 響應式數據
const modal = ref(null); // Bootstrap Modal 實例
const modalRef = ref(null); // template ref

// Modal 控制方法
const openModal = () => {
  modal.value?.show();
};

const closeModal = () => {
  modal.value?.hide();
};

// 生命週期
onMounted(() => {
  if (modalRef.value) {
    modal.value = new Modal(modalRef.value, {
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
