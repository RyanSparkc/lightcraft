import { defineStore } from 'pinia';
import axios from 'axios';
import useToastMessageStore from '@/stores/toastMessage';

const { VITE_APP_URL, VITE_APP_PATH } = import.meta.env;

export default defineStore('counter', {
  state: () => ({
    carts: [],
    final_total: 0,
    total: 0,
  }),
  actions: {
    getCart() {
      const toastStore = useToastMessageStore();
      axios
        .get(`${VITE_APP_URL}/api/${VITE_APP_PATH}/cart`)
        .then((res) => {
          // console.log('pinia cart', res);
          this.carts = res.data.data.carts;
          this.total = res.data.data.total;
          this.final_total = res.data.data.final_total;
          // console.log('pinia cart', this.carts);
        })
        .catch((err) => {
          toastStore.addMessage({
            title: '錯誤',
            content: err.response.data.message,
            style: 'danger',
          });
        });
    },
    addToCart(id) {
      const toastStore = useToastMessageStore();
      const cart = {
        product_id: id,
        qty: 1,
      };
      axios
        .post(`${VITE_APP_URL}/api/${VITE_APP_PATH}/cart`, { data: cart })
        .then((res) => {
          // console.log(res);
          toastStore.addMessage({
            title: '成功',
            content: res.data.message,
            style: 'success',
          });
          this.getCart();
        })
        .catch((err) => {
          toastStore.addMessage({
            title: '錯誤',
            content: err.response.data.message,
            style: 'danger',
          });
        });
    },
  },
});
