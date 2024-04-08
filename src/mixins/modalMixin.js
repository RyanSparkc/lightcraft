import { Modal } from 'bootstrap';

export default {
  methods: {
    openModal() {
      this.modal.show();
    },
    closeModal() {
      this.modal.hide();
    },
  },
  mounted() {
    this.modal = new Modal(this.$refs.modal, {
      backdrop: 'static',
      keyboard: false,
    });
  },
};
