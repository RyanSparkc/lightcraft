<template>
  <LoadingOverlay :active="isLoading" />

  <!-- 現代化頁面標題區域 -->
  <PageHeader
    icon="fas fa-cube"
    icon-color="text-primary"
    title="產品列表"
    subtitle="管理您的產品資訊，編輯商品詳情與價格設定"
  />

  <!-- 頁面動作區域 -->
  <div class="page-actions">
    <div class="actions-left">
      <div class="d-flex align-items-center gap-3">
        <span class="text-muted">共 {{ products.length }} 項產品</span>
        <span class="text-muted">|</span>
        <span class="text-muted"
          >第 {{ pagination.current_page || 1 }} 頁，共
          {{ pagination.total_pages || 1 }} 頁</span
        >
      </div>
    </div>
    <div class="actions-right">
      <button class="btn-modern btn-primary-modern" @click="openModal('new')">
        <i class="fas fa-plus"></i>
        建立新產品
      </button>
    </div>
  </div>

  <!-- 現代化產品卡片網格 -->
  <div class="products-grid">
    <div v-for="item in products" :key="item.id" class="product-card">
      <!-- 卡片標題區域 -->
      <div class="product-card-header">
        <span class="product-category">{{ item.category }}</span>
        <h3 class="product-title">{{ item.title }}</h3>
      </div>

      <!-- 卡片主要內容 -->
      <div class="product-card-body">
        <!-- 價格區域 -->
        <div class="price-section">
          <span v-if="item.origin_price !== item.price" class="price-original">
            NT$ {{ formatCurrency(item.origin_price) }}
          </span>
          <span class="price-current"
            >NT$ {{ formatCurrency(item.price) }}</span
          >
          <span v-if="item.origin_price !== item.price" class="price-discount">
            {{ Math.round((1 - item.price / item.origin_price) * 100) }}% OFF
          </span>
        </div>

        <!-- 評分區域 -->
        <div class="rating-section">
          <div v-if="item.star && item.star > 0" class="modern-rating">
            <div class="stars">
              <i
                v-for="star in 5"
                :key="star"
                :class="star <= item.star ? 'fas fa-star' : 'far fa-star'"
              ></i>
            </div>
            <span class="rating-value">{{ item.star }}.0</span>
          </div>
          <div v-else class="modern-rating">
            <span class="rating-text">尚未評分</span>
          </div>
        </div>

        <!-- 狀態區域 -->
        <div class="status-section">
          <span :class="item.is_enabled ? 'status-enabled' : 'status-disabled'">
            {{ item.is_enabled ? '已啟用' : '未啟用' }}
          </span>
        </div>
      </div>

      <!-- 卡片動作區域 -->
      <div class="product-card-actions">
        <button type="button" class="btn-edit" @click="openModal('edit', item)">
          <i class="fas fa-edit me-1"></i>
          編輯
        </button>
        <button
          type="button"
          class="btn-delete"
          @click="openModal('delete', item)"
        >
          <i class="fas fa-trash me-1"></i>
          刪除
        </button>
      </div>
    </div>
  </div>

  <!-- 分頁組件 -->
  <div class="d-flex justify-content-center">
    <PaginationComponent :pagination="pagination" @change-page="getProducts" />
  </div>

  <!-- 產品模態框 -->
  <ProductModal
    ref="productModal"
    :temp-product="tempProduct"
    :is-new="isNew"
    @update-product="updateProduct"
  ></ProductModal>

  <!-- 刪除確認模態框 -->
  <DeleteModal
    ref="deleteModal"
    :temp-product="tempProduct"
    @update="getProducts"
  ></DeleteModal>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import useToastMessageStore from '@/stores/toastMessage';
import { currency } from '@/methods/filters';

import PageHeader from '@/components/PageHeader.vue';
import ProductModal from '../../components/ProductModal.vue';
import DeleteModal from '../../components/DeleteModal.vue';
import PaginationComponent from '../../components/PaginationComponent.vue';

const { VITE_APP_URL, VITE_APP_PATH } = import.meta.env;

// 響應式資料
const products = ref([]);
const isNew = ref(false);
const tempProduct = ref({
  imagesUrl: [],
});
const pagination = ref({});
const isLoading = ref(false);

// 模板引用
const productModal = ref(null);
const deleteModal = ref(null);

// Store
const toastStore = useToastMessageStore();
const { addMessage } = toastStore;

// 方法
const formatCurrency = (num) => currency(num);

const getProducts = async (page = 1) => {
  isLoading.value = true;
  try {
    const res = await axios.get(`${VITE_APP_URL}/api/${VITE_APP_PATH}/admin/products?page=${page}`);
    const { products: productData, pagination: paginationData } = res.data;
    products.value = productData;
    pagination.value = paginationData;
    isLoading.value = false;
  } catch (err) {
    isLoading.value = false;
    addMessage({
      title: '取得產品資訊失敗',
      content: err.response.data.message,
      style: 'danger',
    });
  }
};

const openModal = (status, item) => {
  if (status === 'new') {
    tempProduct.value = {
      imagesUrl: [],
    };
    isNew.value = true;
    productModal.value.openModal();
  } else if (status === 'edit') {
    tempProduct.value = { ...item };
    isNew.value = false;
    productModal.value.openModal();
  } else if (status === 'delete') {
    tempProduct.value = { ...item };
    deleteModal.value.openModal();
  }
};

const updateProduct = async (item) => {
  isLoading.value = true;
  let url = `${VITE_APP_URL}/api/${VITE_APP_PATH}/admin/product/${tempProduct.value.id}`;
  let http = 'put';

  if (isNew.value) {
    url = `${VITE_APP_URL}/api/${VITE_APP_PATH}/admin/product`;
    http = 'post';
  }

  try {
    const res = await axios[http](url, { data: item });
    isLoading.value = false;
    getProducts();
    productModal.value.closeModal();
    addMessage({
      title: '成功更新產品',
      content: res.data.message,
      style: 'success',
    });
  } catch (err) {
    isLoading.value = false;
    addMessage({
      title: '更新產品失敗',
      content: err.response.data.message,
      style: 'danger',
    });
  }
};

// 生命週期
onMounted(() => {
  getProducts();
});
</script>

<style scoped>
.products-grid {
  min-height: 400px; /* 確保載入時有最小高度 */
}

/* 載入狀態時的樣式 */
.position-relative {
  position: relative;
}

/* 響應式調整 */
@media (max-width: 576px) {
  .products-grid {
    padding: 0 0.5rem;
  }
}
</style>
