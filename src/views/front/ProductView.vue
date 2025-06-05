<!-- eslint-disable import/no-extraneous-dependencies -->
<template>
  <div class="product-detail-container">
    <div class="row align-items-center">
      <div class="col-md-7">
        <!-- Swiper -->
        <swiper
          :modules="modules"
          :slides-per-view="1"
          :space-between="10"
          navigation
          :pagination="{ clickable: true }"
          :autoplay="{ delay: 3000 }"
          :loop="true"
          @swiper="onSwiper"
          @slideChange="onSlideChange"
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
        <nav aria-label="breadcrumb">
          <ol class="breadcrumb bg-white px-0 mb-0 py-3">
            <li class="breadcrumb-item">
              <a class="text-muted" href="./index.html">Home</a>
            </li>
            <li class="breadcrumb-item">
              <a class="text-muted" href="./product.html">Product</a>
            </li>
            <li class="breadcrumb-item active" aria-current="page">Detail</li>
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
                    <span class="spec-value">30 x 20 x 15 cm</span>
                  </div>
                  <div class="spec-row">
                    <span class="spec-label">重量：</span>
                    <span class="spec-value">2.5 kg</span>
                  </div>
                  <div class="spec-row">
                    <span class="spec-label">材質：</span>
                    <span class="spec-value">環保 ABS 塑料</span>
                  </div>
                  <div class="spec-row">
                    <span class="spec-label">顏色：</span>
                    <span class="spec-value">黑色、白色、銀色</span>
                  </div>
                  <div class="spec-row">
                    <span class="spec-label">產地：</span>
                    <span class="spec-value">台灣製造</span>
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

      // 如果沒有任何圖片，使用預設圖片
      if (images.length === 0) {
        images.push({
          url: 'https://images.unsplash.com/photo-1502743780242-f10d2ce370f3?ixlib=rb-1.2.1&auto=format&fit=crop&w=1916&q=80',
          alt: '預設產品圖片',
        });
      }

      return images;
    },
  },
  methods: {
    ...mapActions(useCartStore, ['addToCart']),
    onSwiper(swiper) {
      console.log('Swiper instance:', swiper);
    },
    onSlideChange() {
      console.log('Slide changed');
    },
    getProduct() {
      const { id } = this.$route.params;
      fetch(`${VITE_APP_URL}/api/${VITE_APP_PATH}/product/${id}`)
        .then((res) => res.json())
        .then((data) => {
          this.product = data.product;
          // 當產品載入完成後，載入推薦商品
          this.getRelatedProducts();
        })
        .catch((err) => {
          console.error('載入產品失敗:', err);
        });
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
          console.error('載入推薦商品失敗:', err);
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
    '$route.params.id': function () {
      this.quantity = 1;
      this.relatedProducts = [];
      this.getProduct();
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
  color: #495057;
  margin-bottom: 8px;
}

.product-desc {
  font-size: 0.85rem;
  color: #6c757d;
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
  color: #007bff;
}

.btn-view {
  background: #007bff;
  color: white;
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
  background: #0056b3;
  transform: translateY(-1px);
  color: white;
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
</style>
