<template>
  <LoadingOverlay :active="isLoading" />
  <h2>產品列表</h2>
  <div>
    <div class="text-end mt-4">
      <button class="btn btn-primary" @click="openModal('new')">
        建立新的產品
      </button>
    </div>
    <table class="table mt-4">
      <thead>
        <tr>
          <th width="120">
            分類
          </th>
          <th>產品名稱</th>
          <th width="120">
            原價
          </th>
          <th width="120">
            售價
          </th>
          <th width="100">
            是否啟用
          </th>
          <th width="120">
            編輯
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in products" :key="item.id">
          <td>{{ item.category }}</td>
          <td>{{ item.title }}</td>
          <td class="text-end">{{ item.origin_price }}</td>
          <td class="text-end">{{ item.price }}</td>
          <td>
            <span v-if="item.is_enabled" class="text-success">啟用</span>
            <span v-else>未啟用</span>
          </td>
          <td>
            <div class="btn-group">
              <button type="button" class="btn btn-outline-primary
              btn-sm" @click="openModal('edit', item)">
                編輯
              </button>
              <button type="button" class="btn btn-outline-danger btn-sm"
                @click="openModal('delete', item)">
                刪除
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    <PaginationComponent :pages="pagination" @emit-change-pages="getProducts"></PaginationComponent>
  </div>

  <ProductModal ref="productModal" :temp-product="tempProduct" :is-new="isNew"
    @update-product="updateProduct"></ProductModal>

  <DeleteModal ref="deleteModal" :temp-product="tempProduct" @update="getProducts"></DeleteModal>

</template>

<script>
import axios from 'axios';
import { mapActions } from 'pinia';
import useToastMessageStore from '@/stores/toastMessage';

import ProductModal from '../../components/ProductModal.vue';
import DeleteModal from '../../components/DeleteModal.vue';
import PaginationComponent from '../../components/PaginationComponent.vue';

const { VITE_APP_URL, VITE_APP_PATH } = import.meta.env;

export default {
  data() {
    return {
      // 產品資料格式
      products: [],
      isNew: false,
      tempProduct: {
        imagesUrl: [],
      },
      pagination: {},
      isLoading: false,
    };
  },
  methods: {
    ...mapActions(useToastMessageStore, ['addMessage']),
    getProducts(page = 1) {
      axios
        .get(`${VITE_APP_URL}/api/${VITE_APP_PATH}/admin/products?page=${page}`)
        .then((res) => {
          const { products, pagination } = res.data;
          this.products = products;
          this.pagination = pagination;
          this.isLoading = false;
          this.addMessage({
            title: '成功取得產品資訊',
            content: res.data.message,
            style: 'success',
          });
        })
        .catch((err) => {
          this.isLoading = false;
          this.addMessage({
            title: '取得產品資訊失敗',
            content: err.response.data.message,
            style: 'danger',
          });
        });
    },
    openModal(status, item) {
      if (status === 'new') {
        this.tempProduct = {
          imagesUrl: [],
        };
        this.isNew = true;
        console.log('new', this.tempProduct);
        this.$refs.productModal.openModal();
      } else if (status === 'edit') {
        this.tempProduct = { ...item };
        this.isNew = false;
        this.$refs.productModal.openModal();
      } else if (status === 'delete') {
        this.tempProduct = { ...item };
        this.$refs.deleteModal.openModal();
      }
    },
    updateProduct(item) {
      this.isLoading = true;
      let url = `${VITE_APP_URL}/api/${VITE_APP_PATH}/admin/product/${this.tempProduct.id}`;
      let http = 'put';

      if (this.isNew) {
        url = `${VITE_APP_URL}/api/${VITE_APP_PATH}/admin/product`;
        http = 'post';
      }
      axios[http](url, { data: item })
        .then((res) => {
          this.isLoading = false;
          this.getProducts();
          this.$refs.productModal.closeModal();
          this.addMessage({
            title: '成功更新產品',
            content: res.data.message,
            style: 'success',
          });
        })
        .catch((err) => {
          this.isLoading = false;
          this.addMessage({
            title: '更新產品失敗',
            content: err.response.data.message,
            style: 'danger',
          });
        });
    },
  },
  mounted() {
    this.getProducts();
  },
  components: {
    ProductModal,
    DeleteModal,
    PaginationComponent,
  },
};
</script>
