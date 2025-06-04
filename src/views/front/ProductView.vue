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
          <swiper-slide v-for="(image, index) in productImages" :key="index">
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
        <p class="mb-0 text-muted text-end"><del>NT$1,200</del></p>
        <p class="h4 fw-bold text-end">NT${{ product.price }}</p>
        <div class="row align-items-center">
          <div class="col-6">
            <div class="input-group my-3 bg-light rounded">
              <div class="input-group-prepend">
                <button
                  class="btn btn-outline-dark border-0 py-2"
                  type="button"
                  id="button-addon1"
                >
                  <i class="fas fa-minus"></i>
                </button>
              </div>
              <input
                type="text"
                class="form-control border-0 text-center
             my-auto shadow-none bg-light"
                placeholder=""
                aria-label="Example text with button addon"
                aria-describedby="button-addon1"
                value="1"
              />
              <div class="input-group-append">
                <button
                  class="btn btn-outline-dark border-0 py-2"
                  type="button"
                  id="button-addon2"
                >
                  <i class="fas fa-plus"></i>
                </button>
              </div>
            </div>
          </div>
          <div class="col-6">
            <a
              href="./checkout.html"
              class="text-nowrap btn btn-dark w-100 py-2"
              @click.prevent="addToCart(product.id)"
              >加入購物車</a
            >
          </div>
        </div>
      </div>
    </div>
    <!-- Product Details Section -->
    <div class="row my-5">
      <div class="col-12">
        <div class="card border-0 shadow-sm">
          <div class="card-header bg-white border-0 py-4">
            <h3 class="fw-bold mb-0">
              <i class="bi bi-info-circle me-2 text-primary"></i>產品詳細資訊
            </h3>
          </div>
          <div class="card-body">
            <div class="row">
              <div class="col-md-6">
                <h5 class="fw-bold mb-3">產品特色</h5>
                <ul class="list-unstyled">
                  <li class="mb-2">
                    <i class="bi bi-check-circle-fill text-success me-2"></i>
                    高品質材料製作，經久耐用
                  </li>
                  <li class="mb-2">
                    <i class="bi bi-check-circle-fill text-success me-2"></i>
                    符合人體工學設計，舒適好用
                  </li>
                  <li class="mb-2">
                    <i class="bi bi-check-circle-fill text-success me-2"></i>
                    獲得多項國際認證標準
                  </li>
                  <li class="mb-2">
                    <i class="bi bi-check-circle-fill text-success me-2"></i>
                    提供一年品質保固服務
                  </li>
                </ul>
              </div>
              <div class="col-md-6">
                <h5 class="fw-bold mb-3">產品規格</h5>
                <table class="table table-borderless">
                  <tbody>
                    <tr>
                      <td class="text-muted">尺寸：</td>
                      <td>30 x 20 x 15 cm</td>
                    </tr>
                    <tr>
                      <td class="text-muted">重量：</td>
                      <td>2.5 kg</td>
                    </tr>
                    <tr>
                      <td class="text-muted">材質：</td>
                      <td>環保 ABS 塑料</td>
                    </tr>
                    <tr>
                      <td class="text-muted">顏色：</td>
                      <td>黑色、白色、銀色</td>
                    </tr>
                    <tr>
                      <td class="text-muted">產地：</td>
                      <td>台灣製造</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Product Description -->
    <div class="row mb-5">
      <div class="col-12">
        <div class="card border-0 shadow-sm">
          <div class="card-header bg-white border-0 py-4">
            <h3 class="fw-bold mb-0">
              <i class="bi bi-file-text me-2 text-primary"></i>產品說明
            </h3>
          </div>
          <div class="card-body">
            <p class="lead mb-4">
              這款產品採用最新科技與傳統工藝完美結合，為您帶來前所未有的使用體驗。
              無論是日常使用還是專業需求，都能滿足您的期待。
            </p>
            <p class="mb-3">
              產品經過嚴格的品質檢測，每一個細節都精益求精。我們堅持使用環保材料，
              不僅對環境友善，也確保使用者的健康安全。獨特的設計風格，讓這款產品
              不僅功能強大，更是您生活品味的完美體現。
            </p>
            <p class="mb-0">
              購買即享有完整的售後服務，包括使用指導、維修保養以及技術支援。
              我們承諾提供最優質的客戶服務，讓您的購物體驗更加安心愉快。
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- Care Instructions -->
    <div class="row mb-5">
      <div class="col-12">
        <div class="card border-0 shadow-sm">
          <div class="card-header bg-white border-0 py-4">
            <h3 class="fw-bold mb-0">
              <i class="bi bi-heart me-2 text-primary"></i>使用與保養
            </h3>
          </div>
          <div class="card-body">
            <div class="row">
              <div class="col-md-6">
                <h6 class="fw-bold text-success mb-3">✓ 建議事項</h6>
                <ul class="list-unstyled">
                  <li class="mb-2">• 請在乾燥通風處存放</li>
                  <li class="mb-2">• 定期清潔保養以延長使用壽命</li>
                  <li class="mb-2">• 避免長時間曝曬於陽光下</li>
                  <li class="mb-2">• 使用前請先閱讀使用說明書</li>
                </ul>
              </div>
              <div class="col-md-6">
                <h6 class="fw-bold text-danger mb-3">✗ 注意事項</h6>
                <ul class="list-unstyled">
                  <li class="mb-2">• 請勿用尖銳物品刮擦表面</li>
                  <li class="mb-2">• 避免接觸化學溶劑</li>
                  <li class="mb-2">• 請勿超過承重限制使用</li>
                  <li class="mb-2">• 兒童使用時需大人陪同</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Related Products Section -->
    <div class="row mb-5">
      <div class="col-12">
        <div class="card border-0 shadow-sm">
          <div class="card-header bg-white border-0 py-4">
            <h3 class="fw-bold mb-0">
              <i class="bi bi-grid me-2 text-primary"></i>推薦商品
            </h3>
          </div>
          <div class="card-body">
            <div class="row">
              <div class="col-md-3 mb-4" v-for="i in 4" :key="i">
                <div class="card border-0 h-100 shadow-sm">
                  <img
                    :src="`https://picsum.photos/300/200?random=${i}`"
                    class="card-img-top"
                    :alt="`推薦商品 ${i}`"
                    style="height: 200px; object-fit: cover;"
                  />
                  <div class="card-body">
                    <h6 class="card-title">相關商品 {{ i }}</h6>
                    <p class="card-text text-muted small">
                      高品質相關產品，與您選購的商品完美搭配
                    </p>
                    <div
                      class="d-flex justify-content-between align-items-center"
                    >
                      <span class="h6 mb-0 text-primary"
                        >NT${{ 800 + i * 100 }}</span
                      >
                      <button class="btn btn-outline-primary btn-sm">
                        查看
                      </button>
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
      modules: [Navigation, Pagination, Autoplay],
      productImages: [
        {
          url: 'https://images.unsplash.com/photo-1502743780242-f10d2ce370f3?ixlib=rb-1.2.1&auto=format&fit=crop&w=1916&q=80',
          alt: '產品圖片 1',
        },
        {
          url: 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1916&q=80',
          alt: '產品圖片 2',
        },
        {
          url: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=1916&q=80',
          alt: '產品圖片 3',
        },
        {
          url: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1916&q=80',
          alt: '產品圖片 4',
        },
      ],
    };
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
        })
        .catch((err) => {
          console.error('載入產品失敗:', err);
        });
    },
  },
  mounted() {
    this.getProduct();
  },
};
</script>

<style scoped>
/* Product container with proper spacing */
.product-detail-container {
  padding-top: 60px; /* 增加與導航欄的間距 */
  min-height: calc(100vh - 200px); /* 確保內容有足夠高度，讓 footer 可以置底 */
}

/* Swiper styling */
.product-swiper {
  width: 100%;
  height: 400px;
  margin-bottom: 20px;
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
  border-radius: 8px;
}

/* Swiper navigation buttons styling */
:deep(.swiper-button-next),
:deep(.swiper-button-prev) {
  color: #333;
  background: rgba(255, 255, 255, 0.9);
  width: 45px;
  height: 45px;
  border-radius: 50%;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease;
}

:deep(.swiper-button-next):hover,
:deep(.swiper-button-prev):hover {
  background: rgba(255, 255, 255, 1);
  transform: scale(1.1);
}

:deep(.swiper-button-next):after,
:deep(.swiper-button-prev):after {
  font-size: 16px;
  font-weight: bold;
}

/* Swiper pagination styling */
:deep(.swiper-pagination-bullet) {
  background: rgba(0, 0, 0, 0.4);
  opacity: 1;
  transition: all 0.3s ease;
}

:deep(.swiper-pagination-bullet-active) {
  background: #007bff;
  transform: scale(1.2);
}

/* Card styling improvements */
.card {
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1) !important;
}

/* Product info section spacing */
.card-header {
  border-bottom: 2px solid #f8f9fa !important;
}

.card-header h3 {
  color: #333;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .product-detail-container {
    padding-top: 30px;
  }

  .product-swiper {
    height: 300px;
  }

  :deep(.swiper-button-next),
  :deep(.swiper-button-prev) {
    width: 35px;
    height: 35px;
  }

  :deep(.swiper-button-next):after,
  :deep(.swiper-button-prev):after {
    font-size: 14px;
  }
}

/* Icon styling */
.bi {
  font-size: 1.1em;
}

/* Table styling in product specs */
.table td {
  padding: 0.5rem 0;
  border: none;
}

/* List styling improvements */
.list-unstyled li {
  padding: 0.25rem 0;
}

/* Button hover effects */
.btn-outline-primary:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 8px rgba(0, 123, 255, 0.3);
}
</style>
