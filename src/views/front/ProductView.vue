<!-- eslint-disable import/no-extraneous-dependencies -->
<template>
  <div class="product-detail-container container">
    <div class="row align-items-center">
      <div class="col-md-7">
        <!-- 骨架屏：載入中狀態 -->
        <div v-if="isProductLoading" class="skeleton-swiper">
          <div class="skeleton-image"></div>
        </div>

        <!-- 空狀態：沒有圖片時顯示燈具主題相關內容 -->
        <div
          v-else-if="displayImages.length === 0"
          class="no-image-placeholder"
        >
          <div class="no-image-content">
            <div class="lightbulb-icon">
              <i class="fas fa-lightbulb"></i>
            </div>
            <h5 class="no-image-title">此產品暫無圖片</h5>
            <p class="no-image-subtitle">
              <i class="bi bi-info-circle me-1"></i>
              我們正在準備更多產品圖片，敬請期待
            </p>
            <div class="no-image-features">
              <div class="feature-item">
                <i class="fas fa-star text-warning me-2"></i>
                <span>品質保證</span>
              </div>
              <div class="feature-item">
                <i class="fas fa-shipping-fast text-info me-2"></i>
                <span>快速配送</span>
              </div>
              <div class="feature-item">
                <i class="fas fa-headset text-success me-2"></i>
                <span>專業服務</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Swiper：有圖片時顯示 -->
        <swiper
          v-else
          :modules="modules"
          :slides-per-view="1"
          :space-between="10"
          navigation
          :pagination="{ clickable: true }"
          :autoplay="{ delay: 3000 }"
          :loop="true"
          class="product-swiper"
        >
          <swiper-slide v-for="(image, index) in displayImages" :key="index">
            <img
              :src="image.url"
              :alt="image.alt"
              class="d-block w-100 rounded"
              style="height: 400px; object-fit: cover;"
            />
          </swiper-slide>
        </swiper>
      </div>
      <div class="col-md-5">
        <!-- 骨架屏：產品資訊載入中 -->
        <div v-if="isProductLoading" class="skeleton-product-info">
          <div class="skeleton-breadcrumb"></div>
          <div class="skeleton-title"></div>
          <div class="skeleton-price"></div>
          <div class="skeleton-quantity"></div>
        </div>
        <!-- 產品資訊：載入完成後顯示 -->
        <div v-else>
          <nav aria-label="breadcrumb">
            <ol class="breadcrumb bg-white px-0 mb-0 py-3">
              <li class="breadcrumb-item">
                <router-link class="text-muted text-decoration-none" to="/">
                  <i class="bi bi-house-door me-1"></i>首頁
                </router-link>
              </li>
              <li class="breadcrumb-item">
                <router-link
                  class="text-muted text-decoration-none"
                  to="/products"
                >
                  <i class="bi bi-grid me-1"></i>產品列表
                </router-link>
              </li>
              <!-- 如果有產品分類，顯示分類層級 -->
              <li class="breadcrumb-item" v-if="product.category">
                <router-link
                  class="text-muted text-decoration-none"
                  :to="`/products?category=${product.category}`"
                >
                  <i class="bi bi-tag me-1"></i>{{ product.category }}
                </router-link>
              </li>
              <li class="breadcrumb-item active" aria-current="page">
                <i class="bi bi-eye me-1"></i>
                {{ product.title || '產品詳情' }}
              </li>
            </ol>
          </nav>
          <h2 class="fw-bold h1 mb-1">{{ product.title }}</h2>
          <p class="mb-0 text-muted text-end">
            <del>NT${{ product.origin_price }}</del>
          </p>
          <p class="h4 fw-bold text-end">NT${{ product.price }}</p>
          <div class="row align-items-center">
            <div class="col-6">
              <div class="input-group my-3 bg-light rounded">
                <div class="input-group-prepend">
                  <button
                    class="btn btn-outline-dark border-0 py-2"
                    type="button"
                    id="button-addon1"
                    @click="decreaseQuantity"
                    :disabled="quantity <= 1"
                  >
                    <i class="fas fa-minus"></i>
                  </button>
                </div>
                <input
                  type="number"
                  class="form-control border-0 text-center my-auto shadow-none bg-light"
                  placeholder=""
                  aria-label="Example text with button addon"
                  aria-describedby="button-addon1"
                  v-model.number="quantity"
                  min="1"
                  max="20"
                  @change="validateQuantity"
                />
                <div class="input-group-append">
                  <button
                    class="btn btn-outline-dark border-0 py-2"
                    type="button"
                    id="button-addon2"
                    @click="increaseQuantity"
                    :disabled="quantity >= 20"
                  >
                    <i class="fas fa-plus"></i>
                  </button>
                </div>
              </div>
            </div>
            <div class="col-6">
              <button
                class="text-nowrap btn btn-dark w-100 py-2"
                @click="addToCartHandler"
                :disabled="!product.id"
              >
                加入購物車
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- Product Details Section -->
    <div class="row mt-5 mb-4">
      <div class="col-12">
        <div class="product-section">
          <div class="section-header">
            <h3 class="section-title">
              <i class="bi bi-info-circle me-2"></i>產品描述
            </h3>
          </div>
          <div class="section-content">
            <div class="row">
              <div class="col-md-6">
                <h5 class="content-subtitle">產品特色</h5>
                <ul class="feature-list">
                  <li>
                    <i class="bi bi-check-circle-fill me-2"></i>
                    高品質材料製作，經久耐用
                  </li>
                  <li>
                    <i class="bi bi-check-circle-fill me-2"></i>
                    符合人體工學設計，舒適好用
                  </li>
                  <li>
                    <i class="bi bi-check-circle-fill me-2"></i>
                    獲得多項國際認證標準
                  </li>
                  <li>
                    <i class="bi bi-check-circle-fill me-2"></i>
                    提供一年品質保固服務
                  </li>
                </ul>
              </div>
              <div class="col-md-6">
                <h5 class="content-subtitle">產品規格</h5>
                <div class="spec-table">
                  <div class="spec-row">
                    <span class="spec-label">尺寸：</span>
                    <span class="spec-value">{{ productSpecs.size }}</span>
                  </div>
                  <div class="spec-row">
                    <span class="spec-label">重量：</span>
                    <span class="spec-value">{{ productSpecs.weight }}</span>
                  </div>
                  <div class="spec-row">
                    <span class="spec-label">材質：</span>
                    <span class="spec-value">{{ productSpecs.material }}</span>
                  </div>
                  <div class="spec-row">
                    <span class="spec-label">顏色：</span>
                    <span class="spec-value">{{ productSpecs.color }}</span>
                  </div>
                  <div class="spec-row">
                    <span class="spec-label">產地：</span>
                    <span class="spec-value">{{ productSpecs.origin }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Product Description -->
    <div class="row mb-4">
      <div class="col-12">
        <div class="product-section">
          <div class="section-header">
            <h3 class="section-title">
              <i class="bi bi-file-text me-2"></i>產品說明
            </h3>
          </div>
          <div class="section-content">
            <div v-if="product.description">
              <p class="lead-text">{{ product.description }}</p>
            </div>
            <div v-else>
              <p class="lead-text">
                這款產品採用最新科技與傳統工藝完美結合，為您帶來前所未有的使用體驗。
                無論是日常使用還是專業需求，都能滿足您的期待。
              </p>
              <p class="content-text">
                產品經過嚴格的品質檢測，每一個細節都精益求精。我們堅持使用環保材料，
                不僅對環境友善，也確保使用者的健康安全。獨特的設計風格，讓這款產品
                不僅功能強大，更是您生活品味的完美體現。
              </p>
              <p class="content-text">
                購買即享有完整的售後服務，包括使用指導、維修保養以及技術支援。
                我們承諾提供最優質的客戶服務，讓您的購物體驗更加安心愉快。
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Care Instructions -->
    <div class="row mb-4">
      <div class="col-12">
        <div class="product-section">
          <div class="section-header">
            <h3 class="section-title">
              <i class="bi bi-heart me-2"></i>使用與保養
            </h3>
          </div>
          <div class="section-content">
            <div class="row">
              <div class="col-md-6">
                <h6 class="care-title care-do">✓ 建議事項</h6>
                <ul class="care-list">
                  <li>請在乾燥通風處存放</li>
                  <li>定期清潔保養以延長使用壽命</li>
                  <li>避免長時間曝曬於陽光下</li>
                  <li>使用前請先閱讀使用說明書</li>
                </ul>
              </div>
              <div class="col-md-6">
                <h6 class="care-title care-dont">✗ 注意事項</h6>
                <ul class="care-list">
                  <li>請勿用尖銳物品刮擦表面</li>
                  <li>避免接觸化學溶劑</li>
                  <li>請勿超過承重限制使用</li>
                  <li>兒童使用時需大人陪同</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Related Products Section -->
    <div class="row mb-5" v-if="relatedProducts.length > 0">
      <div class="col-12">
        <div class="product-section">
          <div class="section-header">
            <h3 class="section-title">
              <i class="bi bi-grid me-2"></i>推薦商品
            </h3>
          </div>
          <div class="section-content">
            <div class="row">
              <div
                class="col-md-3 mb-4"
                v-for="relatedProduct in relatedProducts"
                :key="relatedProduct.id"
              >
                <div class="related-product-card">
                  <div class="product-image">
                    <img
                      :src="relatedProduct.imageUrl || 'https://picsum.photos/300/200'"
                      :alt="relatedProduct.title"
                    />
                  </div>
                  <div class="product-info">
                    <h6 class="product-name">{{ relatedProduct.title }}</h6>
                    <p class="product-desc">
                      {{ relatedProduct.description || '高品質相關產品，與您選購的商品完美搭配' }}
                    </p>
                    <div class="product-footer">
                      <span class="product-price"
                        >NT${{ relatedProduct.price }}</span
                      >
                      <router-link
                        :to="`/product/${relatedProduct.id}`"
                        class="btn-view"
                        >查看</router-link
                      >
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'pinia';

// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from 'swiper/vue';

// Import Swiper modules
import { Navigation, Pagination, Autoplay } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import useCartStore from '@/stores/cartStore';
import useToastMessageStore from '@/stores/toastMessage';

const { VITE_APP_URL, VITE_APP_PATH } = import.meta.env;

export default {
  components: {
    Swiper,
    SwiperSlide,
  },
  data() {
    return {
      product: {},
      quantity: 1,
      modules: [Navigation, Pagination, Autoplay],
      relatedProducts: [],
      isProductLoading: true, // 新增載入狀態
      imageLoadedCount: 0, // 追蹤圖片載入數量
    };
  },
  computed: {
    displayImages() {
      const images = [];

      // 如果有主要圖片，加入主要圖片
      if (this.product.imageUrl) {
        images.push({
          url: this.product.imageUrl,
          alt: `${this.product.title || '產品'} - 主圖`,
        });
      }

      // 如果有多張圖片，加入多張圖片
      if (this.product.imagesUrl && Array.isArray(this.product.imagesUrl)) {
        this.product.imagesUrl.forEach((imageUrl, index) => {
          if (imageUrl && imageUrl.trim() !== '') {
            images.push({
              url: imageUrl,
              alt: `${this.product.title || '產品'} - 圖片 ${index + 2}`,
            });
          }
        });
      }

      // 🎯 移除預設圖片邏輯，如果沒有圖片就返回空陣列
      // 由骨架屏和空狀態來處理無圖片的情況
      return images;
    },
    // 產品規格資料處理（含預設值）
    productSpecs() {
      // 預設規格資料
      const defaultSpecs = {
        size: '30 x 20 x 15 cm',
        weight: '2.5 kg',
        material: '環保 ABS 塑料',
        color: '黑色、白色、銀色',
        origin: '台灣製造',
      };

      // 如果產品有規格資料，使用 API 資料，否則使用預設值
      if (this.product.specifications) {
        return {
          size: this.product.specifications.size || defaultSpecs.size,
          weight: this.product.specifications.weight || defaultSpecs.weight,
          material: this.product.specifications.material || defaultSpecs.material,
          color: this.product.specifications.color || defaultSpecs.color,
          origin: this.product.specifications.origin || defaultSpecs.origin,
        };
      }

      // 如果沒有規格資料，直接返回預設值
      return defaultSpecs;
    },
  },
  methods: {
    ...mapActions(useCartStore, ['addToCart']),
    ...mapActions(useToastMessageStore, ['addMessage']),

    getProduct() {
      const { id } = this.$route.params;
      this.isProductLoading = true; // 開始載入
      this.imageLoadedCount = 0; // 重置圖片載入計數

      fetch(`${VITE_APP_URL}/api/${VITE_APP_PATH}/product/${id}`)
        .then((res) => res.json())
        .then((data) => {
          this.product = data.product;
          // 當產品資料載入完成，檢查是否需要繼續等待圖片載入
          this.checkLoadingComplete();
          this.getRelatedProducts();
        })
        .catch((err) => {
          this.isProductLoading = false;
          this.addMessage({
            title: '載入失敗',
            content: `載入產品失敗：${err.message || '未知錯誤'}`,
            style: 'danger',
          });
        });
    },

    checkLoadingComplete() {
      // 當產品資料載入完成時
      if (this.product.id) {
        // 如果沒有圖片，直接完成載入
        if (this.displayImages.length === 0) {
          setTimeout(() => {
            this.isProductLoading = false;
          }, 600); // 稍微延遲以提供更好的視覺體驗
        // 如果有圖片，給一個合理的載入時間，然後直接完成載入
        // 不依賴圖片載入事件，因為 Swiper 可能延遲觸發載入事件
        } else {
          setTimeout(() => {
            this.isProductLoading = false;
          }, 800); // 給圖片一些載入時間，但不無限等待
        }
      }
    },
    getRelatedProducts() {
      if (!this.product.category) return;

      fetch(`${VITE_APP_URL}/api/${VITE_APP_PATH}/products?category=${this.product.category}`)
        .then((res) => res.json())
        .then((data) => {
          // 過濾掉當前產品，只顯示其他同分類產品，最多顯示4個
          this.relatedProducts = data.products
            .filter((product) => product.id !== this.product.id)
            .slice(0, 4);
        })
        .catch((err) => {
          this.addMessage({
            title: '載入推薦商品失敗',
            content: `無法載入推薦商品：${err.message || '未知錯誤'}`,
            style: 'warning',
          });
          this.relatedProducts = [];
        });
    },
    increaseQuantity() {
      if (this.quantity < 20) {
        this.quantity += 1;
      }
    },
    decreaseQuantity() {
      if (this.quantity > 1) {
        this.quantity -= 1;
      }
    },
    validateQuantity() {
      if (this.quantity < 1) {
        this.quantity = 1;
      } else if (this.quantity > 20) {
        this.quantity = 20;
      }
    },
    addToCartHandler() {
      if (this.product.id && this.quantity >= 1) {
        this.addToCart(this.product.id, this.quantity);
      }
    },
  },
  mounted() {
    this.getProduct();
  },
  watch: {
    '$route.params.id': {
      handler() {
        this.quantity = 1;
        this.relatedProducts = [];
        this.isProductLoading = true;
        this.imageLoadedCount = 0;
        this.getProduct();
      },
    },
  },
};
</script>

<style scoped>
/* ==== 整體佈局與間距 ==== */
.product-detail-container {
  padding-top: 40px;
  min-height: calc(100vh - 200px);
}

/* ==== 麵包屑樣式 ==== */
.breadcrumb {
  background: transparent;
  font-size: 0.9rem;
  margin-bottom: 20px;
}

.breadcrumb-item a {
  color: #6c757d;
  transition: color 0.3s ease;
}

.breadcrumb-item a:hover {
  color: #007bff;
}

.breadcrumb-item.active {
  color: #495057;
  font-weight: 500;
}

.breadcrumb-item + .breadcrumb-item::before {
  content: "›";
  color: #adb5bd;
  font-size: 1.1rem;
  font-weight: 500;
}

/* ==== Swiper 樣式 ==== */
.product-swiper {
  width: 100%;
  height: 400px;
  margin-bottom: 30px;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 16px rgba(0, 0, 0, 0.1);
}

.product-swiper .swiper-slide {
  display: flex;
  justify-content: center;
  align-items: center;
}

.product-swiper .swiper-slide img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* Swiper 控制按鈕 */
:deep(.swiper-button-next),
:deep(.swiper-button-prev) {
  color: #333;
  background: rgba(255, 255, 255, 0.95);
  width: 44px;
  height: 44px;
  border-radius: 50%;
  box-shadow: 0 3px 12px rgba(0, 0, 0, 0.15);
  transition: all 0.3s ease;
}

:deep(.swiper-button-next):hover,
:deep(.swiper-button-prev):hover {
  background: rgba(255, 255, 255, 1);
  transform: scale(1.05);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
}

:deep(.swiper-button-next):after,
:deep(.swiper-button-prev):after {
  font-size: 15px;
  font-weight: 600;
}

/* Swiper 分頁指示器 */
:deep(.swiper-pagination-bullet) {
  background: rgba(255, 255, 255, 0.6);
  opacity: 1;
  width: 10px;
  height: 10px;
  transition: all 0.3s ease;
}

:deep(.swiper-pagination-bullet-active) {
  background: #ffffff;
  transform: scale(1.3);
}

/* ==== 產品區塊統一樣式 ==== */
.product-section {
  background: #fff;
  border: 1px solid #e9ecef;
  border-radius: 12px;
  margin-bottom: 24px;
  overflow: hidden;
}

.section-header {
  padding: 24px 28px 20px;
  background: linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%);
  border-bottom: 1px solid #e9ecef;
}

.section-title {
  font-size: 1.4rem;
  font-weight: 600;
  color: #2c3e50;
  margin: 0;
  display: flex;
  align-items: center;
}

.section-title i {
  color: #6c757d;
  font-size: 1.2rem;
}

.section-content {
  padding: 28px;
}

/* ==== 內容樣式 ==== */
.content-subtitle {
  font-size: 1.1rem;
  font-weight: 600;
  color: #495057;
  margin-bottom: 16px;
  padding-bottom: 8px;
  border-bottom: 2px solid #f8f9fa;
}

.lead-text {
  font-size: 1.1rem;
  line-height: 1.6;
  color: #495057;
  margin-bottom: 20px;
  font-weight: 500;
}

.content-text {
  line-height: 1.7;
  color: #6c757d;
  margin-bottom: 16px;
}

/* ==== 產品特色列表 ==== */
.feature-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.feature-list li {
  padding: 8px 0;
  color: #495057;
  display: flex;
  align-items: center;
}

.feature-list i {
  color: #28a745;
  font-size: 1rem;
}

/* ==== 產品規格表 ==== */
.spec-table {
  background: #f8f9fa;
  border-radius: 8px;
  padding: 20px;
}

.spec-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 0;
  border-bottom: 1px solid #e9ecef;
}

.spec-row:last-child {
  border-bottom: none;
}

.spec-label {
  font-weight: 500;
  color: #6c757d;
  min-width: 80px;
}

.spec-value {
  color: #495057;
  font-weight: 500;
}

/* ==== 保養說明樣式 ==== */
.care-title {
  font-weight: 600;
  margin-bottom: 16px;
  padding: 8px 12px;
  border-radius: 6px;
  font-size: 0.95rem;
}

.care-do {
  background: rgba(40, 167, 69, 0.1);
  color: #28a745;
  border-left: 3px solid #28a745;
}

.care-dont {
  background: rgba(220, 53, 69, 0.1);
  color: #dc3545;
  border-left: 3px solid #dc3545;
}

.care-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.care-list li {
  padding: 6px 0;
  color: #6c757d;
  position: relative;
  padding-left: 16px;
}

.care-list li:before {
  content: "•";
  position: absolute;
  left: 0;
  color: #adb5bd;
}

/* ==== 推薦商品卡片 ==== */
.related-product-card {
  background: #fff;
  border: 1px solid #e9ecef;
  border-radius: 10px;
  overflow: hidden;
  height: 100%;
  transition: all 0.3s ease;
}

.related-product-card:hover {
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  transform: translateY(-2px);
}

.product-image {
  height: 180px;
  overflow: hidden;
}

.product-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.related-product-card:hover .product-image img {
  transform: scale(1.05);
}

.product-info {
  padding: 16px;
}

.product-name {
  font-size: 1rem;
  font-weight: 600;
  color: #FFC107;
  margin-bottom: 8px;
}

.product-desc {
  font-size: 0.85rem;
  color: #666;
  line-height: 1.4;
  margin-bottom: 12px;
}

.product-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.product-price {
  font-size: 1.1rem;
  font-weight: 600;
  color: #FFC107;
}

.btn-view {
  background: #FFC107;
  color: #333;
  border: none;
  padding: 6px 16px;
  border-radius: 6px;
  font-size: 0.85rem;
  font-weight: 500;
  transition: all 0.3s ease;
  cursor: pointer;
  text-decoration: none;
}

.btn-view:hover {
  background: #e6ac00;
  transform: translateY(-1px);
  color: #333;
}

/* ==== 響應式設計 ==== */
@media (max-width: 768px) {
  .product-detail-container {
    padding-top: 20px;
  }

  .product-swiper {
    height: 280px;
    margin-bottom: 20px;
    border-radius: 8px;
  }

  :deep(.swiper-button-next),
  :deep(.swiper-button-prev) {
    width: 36px;
    height: 36px;
  }

  :deep(.swiper-button-next):after,
  :deep(.swiper-button-prev):after {
    font-size: 13px;
  }

  .section-header {
    padding: 20px 20px 16px;
  }

  .section-content {
    padding: 20px;
  }

  .section-title {
    font-size: 1.2rem;
  }

  .product-section {
    margin-bottom: 20px;
    border-radius: 8px;
  }

  .spec-table {
    padding: 16px;
  }
}

@media (max-width: 576px) {
  .related-product-card {
    margin-bottom: 16px;
  }

  .product-image {
    height: 160px;
  }
}

/* ==== 骨架屏樣式 ==== */
.skeleton-swiper {
  width: 100%;
  height: 400px;
  border-radius: 12px;
  overflow: hidden;
  margin-bottom: 30px;
}

.skeleton-image {
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  animation: skeleton-loading 1.5s infinite;
}

.skeleton-product-info {
  padding: 20px 0;
}

.skeleton-breadcrumb {
  height: 20px;
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  animation: skeleton-loading 1.5s infinite;
  border-radius: 4px;
  margin-bottom: 20px;
  width: 80%;
}

.skeleton-title {
  height: 40px;
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  animation: skeleton-loading 1.5s infinite;
  border-radius: 4px;
  margin-bottom: 16px;
  width: 70%;
}

.skeleton-price {
  height: 32px;
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  animation: skeleton-loading 1.5s infinite;
  border-radius: 4px;
  margin-bottom: 20px;
  width: 50%;
  margin-left: auto;
}

.skeleton-quantity {
  height: 50px;
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  animation: skeleton-loading 1.5s infinite;
  border-radius: 4px;
  width: 100%;
}

@keyframes skeleton-loading {
  0% {
    background-position: -200% 0;
  }
  100% {
    background-position: 200% 0;
  }
}

/* ==== 空狀態樣式（燈具主題） ==== */
.no-image-placeholder {
  width: 100%;
  height: 400px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  border-radius: 12px;
  border: 2px dashed #dee2e6;
  margin-bottom: 30px;
}

.no-image-content {
  text-align: center;
  padding: 2rem;
  max-width: 350px;
}

.lightbulb-icon {
  margin-bottom: 1.5rem;
}

.lightbulb-icon i {
  font-size: 4rem;
  color: #FFC107;
  animation: pulse-glow 2s infinite;
}

.no-image-title {
  color: #495057;
  font-weight: 600;
  margin-bottom: 1rem;
  font-size: 1.2rem;
}

.no-image-subtitle {
  color: #6c757d;
  margin-bottom: 1.5rem;
  line-height: 1.5;
}

.no-image-features {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.feature-item {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem 1rem;
  background: rgba(255, 255, 255, 0.8);
  border-radius: 8px;
  font-size: 0.9rem;
  font-weight: 500;
  color: #495057;
}

@keyframes pulse-glow {
  0% {
    transform: scale(1);
    filter: brightness(1);
  }
  50% {
    transform: scale(1.05);
    filter: brightness(1.2);
  }
  100% {
    transform: scale(1);
    filter: brightness(1);
  }
}

/* ==== 響應式調整：骨架屏和空狀態 ==== */
@media (max-width: 768px) {
  .skeleton-swiper,
  .no-image-placeholder {
    height: 280px;
    margin-bottom: 20px;
    border-radius: 8px;
  }

  .lightbulb-icon i {
    font-size: 3rem;
  }

  .no-image-title {
    font-size: 1.1rem;
  }

  .no-image-content {
    padding: 1.5rem;
  }

  .feature-item {
    font-size: 0.85rem;
  }
}
</style>
