import { defineStore } from 'pinia';

export default defineStore('toastMessage', {
  state: () => ({
    messages: [],
  }),
  actions: {
    addMessage(message) {
      const { style = 'success', title, content } = message;
      this.messages.push({ style, title, content });
      this.showMessage();
    },
    removeMessage(index) {
      this.messages.splice(index, 1);
    },
    showMessage() {
      setTimeout(() => {
        this.removeMessage(0);
      }, 5000);
    },
  },
});
