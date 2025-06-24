import { ref, onMounted } from 'vue';
import { Modal } from 'bootstrap';

/**
 * 封裝 Bootstrap Modal 的 Composable
 * @returns {{
 *  modalRef: import('vue').Ref<HTMLElement | null>,
 *  openModal: () => void,
 *  closeModal: () => void
 * }}
 */
export default function useModal() {
  const modalRef = ref(null);
  let modalInstance = null;

  onMounted(() => {
    if (modalRef.value) {
      modalInstance = new Modal(modalRef.value, {
        backdrop: 'static',
        keyboard: false,
      });
    }
  });

  const openModal = () => {
    modalInstance?.show();
  };

  const closeModal = () => {
    modalInstance?.hide();
  };

  return {
    modalRef,
    openModal,
    closeModal,
  };
}
