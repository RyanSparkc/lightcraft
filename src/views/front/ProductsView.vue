<!-- eslint-disable comma-dangle -->
<template>
  <LoadingOverlay :active="isLoading" />

  <div class="products-view">
    <!-- 頁面頂部主題色區域 -->
    <HeroSection
      :title="heroTitle"
      subtitle="探索精選商品，發現生活中的美好"
      icon-class="bi bi-basket3"
    />

    <div class="container mt-md-5 mt-3 mb-7">
      <div class="row">
        <!-- 簡化的分類選單 -->
        <div class="col-lg-3 col-md-4">
          <div class="category-menu bg-light rounded p-4 mb-4">
            <h5 class="mb-3 fw-bold">💡 產品分類</h5>
            <ul class="list-unstyled">
              <li class="mb-2">
                <RouterLink
                  class="category-link d-block py-2 px-3 rounded text-decoration-none"
                  to="/products"
                  :class="{ 'active bg-primary text-white': !$route.query.category, 'text-dark': $route.query.category }"
                >
                  🔍 全部商品
                </RouterLink>
              </li>
              <li
                class="mb-2"
                v-for="category in categories"
                :key="category.name"
              >
                <RouterLink
                  class="category-link d-block py-2 px-3 rounded text-decoration-none"
                  :to="`/products?category=${category.name}`"
                  :class="{
                    'active bg-primary text-white': $route.query.category === category.name,
                    'text-dark': $route.query.category !== category.name
                  }"
                >
                  <i :class="category.icon" class="me-2"></i>{{ category.name }}
                </RouterLink>
              </li>
            </ul>
          </div>
        </div>

        <!-- 產品展示區 -->
        <div class="col-lg-9 col-md-8">
          <div class="d-flex justify-content-between align-items-center mb-4">
            <h4 class="mb-0">
              {{ $route.query.category ? `${$route.query.category} 系列` : '全部商品' }}
            </h4>
            <span class="text-muted">共 {{ products.length }} 件商品</span>
          </div>

          <div class="row">
            <div
              class="col-xl-4 col-lg-6 col-md-6 mb-4"
              v-for="product in products"
              :key="product.id"
            >
              <div class="card border-0 shadow-sm h-100 product-card">
                <div class="position-relative overflow-hidden">
                  <RouterLink :to="`/product/${product.id}`">
                    <img
                      :src="product.imageUrl"
                      class="card-img-top product-image"
                      height="225"
                      style="object-fit: cover; transition: transform 0.3s ease;"
                      alt="product.title"
                    />
                  </RouterLink>

                  <!-- 折扣標籤 -->
                  <span
                    v-if="product.origin_price > product.price"
                    class="discount-badge position-absolute bg-danger text-white px-2 py-1 rounded"
                    style="left: 12px; top: 12px; font-size: 0.75rem; font-weight: bold;"
                  >
                    {{Math.round(
                      (1 - product.price/product.origin_price)
                      * 100)

                    }}% OFF
                  </span>
                </div>

                <div class="card-body p-3 d-flex flex-column">
                  <!-- 產品標題 -->
                  <h6 class="card-title mb-2 fw-bold">
                    <RouterLink
                      :to="`/product/${product.id}`"
                      class="text-decoration-none text-dark"
                    >
                      {{ product.title }}
                    </RouterLink>
                  </h6>

                  <!-- 產品規格簡要 -->
                  <div class="product-specs mb-2 flex-grow-1">
                    <span
                      class="badge bg-light text-dark me-1 mb-1"
                      v-if="product.category"
                    >
                      <i
                        :class="getCategoryIcon(product.category)"
                        class="me-1"
                      ></i>
                      {{ product.category }}
                    </span>
                    <span
                      class="badge bg-secondary text-white me-1 mb-1"
                      v-if="product.unit"
                    >
                      {{ product.unit }}
                    </span>
                  </div>

                  <!-- 簡短描述 -->
                  <p
                    class="card-text text-muted small mb-2"
                    v-if="product.description"
                  >
                    {{ product.description.substring(0, 50)}}
                    {{ product.description.length > 50 ? '...' : '' }}
                  </p>

                  <!-- 價格區域 -->
                  <div class="price-section mb-3">
                    <div class="d-flex align-items-center">
                      <span
                        class="current-price h6 text-primary me-2 mb-0 fw-bold"
                      >
                        NT${{ formatCurrency(product.price) }}
                      </span>
                      <span
                        v-if="product.origin_price > product.price"
                        class="original-price text-muted text-decoration-line-through small"
                      >
                        NT${{ formatCurrency(product.origin_price) }}
                      </span>
                    </div>
                  </div>

                  <!-- 評分 (使用後端真實資料) -->
                  <div
                    class="rating mb-3"
                    v-if="product.star && product.star > 0"
                  >
                    <div class="d-flex align-items-center">
                      <div class="stars me-2">
                        <i
                          v-for="star in 5"
                          :key="star"
                          :class="star <= product.star ? 'fas fa-star text-warning' : 'far fa-star text-muted'"
                          style="font-size: 0.8rem;"
                        ></i>
                      </div>
                      <span class="text-muted small"
                        >{{ product.star }}.0 顆星</span
                      >
                    </div>
                  </div>

                  <!-- 當沒有評分資料時顯示 -->
                  <div class="rating mb-3" v-else>
                    <div class="d-flex align-items-center">
                      <div class="stars me-2">
                        <i
                          v-for="star in 5"
                          :key="star"
                          class="far fa-star text-muted"
                          style="font-size: 0.8rem;"
                        ></i>
                      </div>
                      <span class="text-muted small">尚無評價</span>
                    </div>
                  </div>

                  <!-- 快速購買按鈕 -->
                  <button
                    class="btn btn-outline-primary btn-sm w-100 mt-auto"
                    @click="addToCart(product.id)"
                    :disabled="isLoadingCart === product.id"
                  >
                    <i
                      v-if="isLoadingCart === product.id"
                      class="fas fa-spinner fa-spin me-1"
                    ></i>
                    <i v-else class="fas fa-shopping-cart me-1"></i>
                    {{ isLoadingCart === product.id ? '加入中...' : '加入購物車' }}
                  </button>
                </div>
              </div>
            </div>
          </div>

          <!-- 分頁 -->
          <PaginationComponent
            :pagination="pagination"
            aria-label="產品分頁"
            @change-page="changePage"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import {
  ref, reactive, computed, watch, onMounted,
} from 'vue';
import { useRoute } from 'vue-router';
import axios from 'axios';
import useToastMessageStore from '@/stores/toastMessage';
import useCartStore from '@/stores/cartStore';
import PaginationComponent from '@/components/PaginationComponent.vue';
import HeroSection from '@/components/HeroSection.vue';

// 環境變數
const { VITE_APP_URL, VITE_APP_PATH } = import.meta.env;

// 路由
const route = useRoute();

// Store
const toastStore = useToastMessageStore();
const cartStore = useCartStore();

// 響應式數據
const products = ref([]);
const categories = ref([]);
const isLoading = ref(true);
const isLoadingCart = ref(null); // 用於追蹤哪個產品正在加入購物車
const pagination = reactive({
  total_pages: 1,
  current_page: 1,
  has_pre: false,
  has_next: false,
});

// 計算屬性
const heroTitle = computed(() => (route.query.category ? `${route.query.category} 系列` : '全部商品'));

// 工具方法
const formatCurrency = (value) => {
  if (!value) return '';
  return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

const getCategoryIcon = (categoryName) => {
  // 分類圖標映射 - 使用 Font Awesome 圖示
  const iconMap = {
    智慧吊燈: 'fas fa-lightbulb',
    智慧檯燈: 'fas fa-desk-lamp',
    智慧燈泡: 'fas fa-lightbulb',
    智慧燈具: 'fas fa-home',
    氣氛燈光: 'fas fa-star',
    戶外照明: 'fas fa-moon',
    燈光配件: 'fas fa-cog',
    室內照明: 'fas fa-home',
    裝飾燈具: 'fas fa-star',
    特殊用途: 'fas fa-tools',
    // 其他產品分類
    衣服: 'fas fa-tshirt',
    蛋糕: 'fas fa-birthday-cake',
    食物: 'fas fa-utensils',
    飲品: 'fas fa-coffee',
    電子產品: 'fas fa-laptop',
    家電: 'fas fa-tv',
    書籍: 'fas fa-book',
    玩具: 'fas fa-gamepad',
    運動用品: 'fas fa-basketball-ball',
    美妝: 'fas fa-palette',
  };
  return iconMap[categoryName] || 'fas fa-lightbulb text-warning';
};

// API 方法
const getCategories = async () => {
  try {
    const response = await axios.get(`${VITE_APP_URL}/api/${VITE_APP_PATH}/products/all`);
    // 從所有產品中提取唯一的分類
    const uniqueCategories = [...new Set(response.data.products.map((product) => product.category))];
    categories.value = uniqueCategories
      .filter((category) => category) // 過濾掉空值
      .map((categoryName) => ({
        name: categoryName,
        icon: getCategoryIcon(categoryName),
      }));
  } catch (error) {
    toastStore.addMessage({
      title: '載入分類失敗',
      content: error.response?.data?.message || '無法載入產品分類，請稍後再試',
      style: 'danger',
    });
  }
};

const getProducts = async (page = 1) => {
  const { category = '' } = route.query;
  isLoading.value = true;

  try {
    const response = await axios.get(`${VITE_APP_URL}/api/${VITE_APP_PATH}/products?category=${category}&page=${page}`);
    products.value = response.data.products;
    Object.assign(pagination, response.data.pagination);
  } catch (error) {
    toastStore.addMessage({
      title: '載入產品失敗',
      content: error.response?.data?.message || '無法載入產品列表，請稍後再試',
      style: 'danger',
    });
  } finally {
    isLoading.value = false;
  }
};

const changePage = (page) => {
  if (page < 1 || page > pagination.total_pages) {
    return;
  }
  getProducts(page);
  // 滾動到頂部
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

// 自定義加入購物車方法，支援加載狀態
const addToCart = async (productId, qty = 1) => {
  isLoadingCart.value = productId;
  try {
    await cartStore.addToCart(productId, qty);
  } finally {
    isLoadingCart.value = null;
  }
};

// 監聽器
watch(
  () => route.query,
  () => {
    getProducts(1); // 當分類改變時，重置到第一頁
  },
);

// 生命週期
onMounted(() => {
  getCategories(); // 先載入分類
  getProducts();
});
</script>

<style scoped>
/* 產品卡片樣式 */
.product-card {
  transition: box-shadow 0.2s ease;
}

.product-card:hover {
  box-shadow: 0 8px 25px rgba(0,0,0,0.15) !important;
}

.product-image {
  cursor: pointer;
}

.product-card:hover .product-image {
  transform: scale(1.05);
}

.category-link {
  transition: all 0.2s ease;
}

.category-link:hover {
  background-color: #e9ecef !important;
  transform: translateX(5px);
}

.btn-favorite {
  opacity: 0.8;
  transition: all 0.2s ease;
}

.btn-favorite:hover {
  opacity: 1;
  transform: scale(1.1);
}

.stars i {
  margin-right: 1px;
}

.discount-badge {
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0% { opacity: 1; }
  50% { opacity: 0.7; }
  100% { opacity: 1; }
}

/* 響應式調整 */
@media (max-width: 768px) {
  .category-menu {
    margin-bottom: 1rem;
  }

  .product-card {
    margin-bottom: 1rem;
  }
}
</style>
