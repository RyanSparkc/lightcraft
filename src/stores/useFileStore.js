import { defineStore } from 'pinia';

export default defineStore('article', {
  state: () => ({
    file: null,
  }),

  actions: {
    setFileToUpload(file) {
      this.file = file;
    },
  },
});
