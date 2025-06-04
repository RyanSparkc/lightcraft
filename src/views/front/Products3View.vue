<template>
  <div class="container">
    <LoadingOverlay :active="isLoading" />
    <div class="row mt-3">
      <UserModal
        ref="userModal"
        :product="product"
        @add-to-cart="addToCartFromModal"
      ></UserModal>
      <table class="table align-middle">
        <thead>
          <tr>
            <th>圖片</th>
            <th>商品名稱</th>
            <th>價格</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="product in products" :key="product.id">
            <td style="width: 200px">
              <div
                v-if="product.imageUrl !== ''"
                style="height: 100px; background-size: cover; background-position: center"
                :style="{ backgroundImage: `url(${product.imageUrl})` }"
              ></div>
            </td>
            <td>
              {{ product.title }}
            </td>
            <td>
              <div class="h5" v-if="product.origin_price === product.price">
                {{ product.origin_price }} 元
              </div>
              <div v-else>
                <del class="h6" v-if="product.price"
                  >原價 {{ product.origin_price }} 元</del
                >
                <div class="h5" v-if="product.price">
                  現在只要 {{ product.price }} 元
                </div>
              </div>
            </td>
            <td>
              <div class="btn-group btn-group-sm">
                <button
                  type="button"
                  class="btn btn-outline-secondary"
                  @click="getProduct(product.id)"
                  :disabled="product.id === loadingStatus.loadingItem || !product.is_enabled"
                >
                  <i
                    class="fas fa-spinner fa-pulse"
                    v-if="loadingStatus.loadingItem === product.id"
                  ></i>
                  查看更多
                </button>
                <button
                  type="button"
                  class="btn btn-outline-danger"
                  @click="addToCartHandler(product.id)"
                  :disabled="product.id === loadingStatus.loadingItem || !product.is_enabled"
                >
                  <i
                    class="fas fa-spinner fa-pulse"
                    v-if="loadingStatus.loadingItem === product.id"
                  ></i>
                  加到購物車
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'pinia';
import axios from 'axios';
import UserModal from '@/components/UserModal.vue';
import useCartStore from '@/stores/cartStore';
import useToastMessageStore from '@/stores/toastMessage';

const { VITE_APP_URL, VITE_APP_PATH } = import.meta.env;

export default {
  components: {
    UserModal,
  },
  data() {
    return {
      loadingStatus: {
        loadingItem: '',
      },
      products: [],
      product: {},
      isLoading: true,
    };
  },
  methods: {
    ...mapActions(useCartStore, ['addToCart']),
    ...mapActions(useToastMessageStore, ['addMessage']),

    getProducts() {
      axios
        .get(`${VITE_APP_URL}/api/${VITE_APP_PATH}/products`)
        .then((res) => {
          this.products = res.data.products;
          this.isLoading = false;
        })
        .catch((err) => {
          this.addMessage({
            title: '錯誤',
            content: err.response?.data?.message || '載入產品失敗',
            style: 'danger',
          });
          this.isLoading = false;
        });
    },

    // 取得單一產品
    getProduct(id) {
      this.loadingStatus.loadingItem = id;
      axios
        .get(`${VITE_APP_URL}/api/${VITE_APP_PATH}/product/${id}`)
        .then((res) => {
          this.loadingStatus.loadingItem = '';
          this.product = res.data.product;
          this.$refs.userModal.openModal();
        })
        .catch((err) => {
          this.loadingStatus.loadingItem = '';
          this.addMessage({
            title: '錯誤',
            content: err.response?.data?.message || '載入產品詳情失敗',
            style: 'danger',
          });
        });
    },

    // 加入購物車處理函數
    async addToCartHandler(productId) {
      this.loadingStatus.loadingItem = productId;
      try {
        await this.addToCart(productId);
      } catch (err) {
        // 錯誤已在 store 中處理
      } finally {
        this.loadingStatus.loadingItem = '';
      }
    },

    // 從 Modal 加入購物車
    async addToCartFromModal(productId) {
      this.loadingStatus.loadingItem = productId;
      this.$refs.userModal.hideModal();
      try {
        // 如果需要自訂數量，直接呼叫 store 的 addToCart 但需要修改 store
        // 目前先用預設的 qty=1
        await this.addToCart(productId);
      } catch (err) {
        // 錯誤已在 store 中處理
      } finally {
        this.loadingStatus.loadingItem = '';
      }
    },
  },
  mounted() {
    this.getProducts();
  },
};
</script>

<style scoped>
img {
  object-fit: contain;
  max-width: 100%;
}

.primary-image {
  height: 300px;
}

.images {
  height: 150px;
}
</style>
