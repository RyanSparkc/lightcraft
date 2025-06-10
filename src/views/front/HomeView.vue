<template>
  <LoadingOverlay :active="isLoading" />
  <!-- Hero Section -->
  <section class="hero-section position-relative overflow-hidden">
    <div class="hero-bg position-absolute w-100 h-100"></div>
    <div
      class="hero-overlay position-absolute w-100 h-100"
      style="background: rgba(0, 0, 0, 0.2);"
    ></div>

    <div class="container position-relative" style="min-height: 100vh;">
      <div
        class="row align-items-center justify-content-center text-center text-white"
        style="min-height: 100vh;"
      >
        <div class="col-lg-8 col-md-10">
          <div class="hero-content">
            <div class="mb-4">
              <i
                class="fas fa-lightbulb hero-icon"
                style="font-size: 4rem; color: #ffd700; animation: pulse 2s infinite;"
              ></i>
            </div>
            <h1
              class="display-3 fw-bold mb-4"
              style="text-shadow: 2px 2px 4px rgba(0,0,0,0.3);"
            >
              點亮您的生活
              <span class="d-block text-warning">LightCraft</span>
            </h1>
            <p
              class="lead mb-5 fs-4"
              style="text-shadow: 1px 1px 2px rgba(0,0,0,0.3);"
            >
              專業燈具品牌，提供最優質的照明解決方案<br />
              從 LED 節能燈泡到智能照明系統，為您創造完美光線
            </p>
            <div class="hero-buttons">
              <router-link
                to="/products"
                class="btn btn-warning btn-lg px-5 py-3 me-3 mb-3 fw-bold"
                style="border-radius: 50px; box-shadow: 0 4px 15px rgba(255,193,7,0.3);"
              >
                <i class="fas fa-shopping-cart me-2"></i>立即選購
              </router-link>
              <button
                class="btn btn-outline-light btn-lg px-5 py-3 mb-3 fw-bold"
                style="border-radius: 50px;"
                @click="scrollToProducts"
              >
                <i class="fas fa-search me-2"></i>瀏覽產品
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Scroll indicator -->
      <div
        class="position-absolute bottom-0 start-50 translate-middle-x text-white mb-4"
      >
        <div class="scroll-indicator" style="animation: bounce 2s infinite;">
          <i class="fas fa-chevron-down fs-4"></i>
        </div>
      </div>
    </div>
  </section>

  <!-- Product Categories Section -->
  <section class="py-5 bg-light" id="products">
    <div class="container">
      <div class="row justify-content-center mb-5">
        <div class="col-lg-8 text-center">
          <h2 class="display-5 fw-bold text-dark mb-3">產品分類</h2>
          <p class="lead text-muted">
            多元化的燈具產品，滿足您不同場景的照明需求
          </p>
        </div>
      </div>

      <div class="row g-4">
        <div class="col-lg-4 col-md-6">
          <div class="category-card card border-0 h-100 shadow-sm hover-lift">
            <div
              class="card-img-container position-relative overflow-hidden"
              style="height: 250px;"
            >
              <img
                src="https://images.unsplash.com/photo-1524484485831-a92ffc0de03f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                class="card-img-top w-100 h-100"
                style="object-fit: cover; transition: transform 0.3s ease;"
                alt="LED 燈泡"
              />
              <div
                class="card-overlay position-absolute w-100 h-100 d-flex align-items-center justify-content-center"
                style="background: rgba(102,126,234,0.8); opacity: 0; transition: opacity 0.3s ease;"
              >
                <router-link
                  to="/products?category=led"
                  class="btn btn-light btn-lg"
                >
                  <i class="fas fa-eye me-2"></i>查看產品
                </router-link>
              </div>
            </div>
            <div class="card-body text-center p-4">
              <div class="mb-3">
                <i class="fas fa-lightbulb fs-2" style="color: #FFC107;"></i>
              </div>
              <h4 class="card-title fw-bold">LED 燈泡</h4>
              <p class="card-text text-muted">
                節能環保，壽命長達 25,000 小時，多種色溫選擇
              </p>
            </div>
          </div>
        </div>

        <div class="col-lg-4 col-md-6">
          <div class="category-card card border-0 h-100 shadow-sm hover-lift">
            <div
              class="card-img-container position-relative overflow-hidden"
              style="height: 250px;"
            >
              <img
                src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                class="card-img-top w-100 h-100"
                style="object-fit: cover; transition: transform 0.3s ease;"
                alt="智能燈具"
              />
              <div
                class="card-overlay position-absolute w-100 h-100 d-flex align-items-center justify-content-center"
                style="background: rgba(44,62,80,0.8); opacity: 0; transition: opacity 0.3s ease;"
              >
                <router-link
                  to="/products?category=smart"
                  class="btn btn-light btn-lg"
                >
                  <i class="fas fa-eye me-2"></i>查看產品
                </router-link>
              </div>
            </div>
            <div class="card-body text-center p-4">
              <div class="mb-3">
                <i class="fas fa-wifi fs-2" style="color: #2C3E50;"></i>
              </div>
              <h4 class="card-title fw-bold">智能燈具</h4>
              <p class="card-text text-muted">
                WiFi 連接，手機 APP 控制，支援語音助手
              </p>
            </div>
          </div>
        </div>

        <div class="col-lg-4 col-md-6">
          <div class="category-card card border-0 h-100 shadow-sm hover-lift">
            <div
              class="card-img-container position-relative overflow-hidden"
              style="height: 250px;"
            >
              <img
                src="@/assets/images/lightball01.jpg"
                class="card-img-top w-100 h-100"
                style="object-fit: cover; transition: transform 0.3s ease;"
                alt="裝飾燈具"
              />
              <div
                class="card-overlay position-absolute w-100 h-100 d-flex align-items-center justify-content-center"
                style="background: rgba(255,193,7,0.8); opacity: 0; transition: opacity 0.3s ease;"
              >
                <router-link
                  to="/products?category=decorative"
                  class="btn btn-light btn-lg"
                >
                  <i class="fas fa-eye me-2"></i>查看產品
                </router-link>
              </div>
            </div>
            <div class="card-body text-center p-4">
              <div class="mb-3">
                <i class="fas fa-star fs-2" style="color: #FFC107;"></i>
              </div>
              <h4 class="card-title fw-bold">裝飾燈具</h4>
              <p class="card-text text-muted">
                精美設計，提升居家品味，營造溫馨氛圍
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Features Section -->
  <section class="py-5 bg-white">
    <div class="container">
      <div class="row justify-content-center mb-5">
        <div class="col-lg-8 text-center">
          <h2 class="display-5 fw-bold text-dark mb-3">
            為什麼選擇 LightCraft？
          </h2>
          <p class="lead text-muted">
            我們提供最優質的產品與服務，讓您的選擇更安心
          </p>
        </div>
      </div>

      <div class="row g-4">
        <div class="col-lg-3 col-md-6">
          <div class="feature-item text-center p-4">
            <div class="feature-icon mb-3">
              <div
                class="icon-circle mx-auto d-flex align-items-center justify-content-center"
                style="width: 80px; height: 80px; background-color: #FFC107; border-radius: 50%;"
              >
                <i class="fas fa-shield-alt text-white fs-3"></i>
              </div>
            </div>
            <h5 class="fw-bold mb-3">品質保證</h5>
            <p class="text-muted">
              所有產品經過嚴格品質檢測，提供 2 年保固服務
            </p>
          </div>
        </div>

        <div class="col-lg-3 col-md-6">
          <div class="feature-item text-center p-4">
            <div class="feature-icon mb-3">
              <div
                class="icon-circle mx-auto d-flex align-items-center justify-content-center"
                style="width: 80px; height: 80px; background-color: #2C3E50; border-radius: 50%;"
              >
                <i class="fas fa-shipping-fast text-white fs-3"></i>
              </div>
            </div>
            <h5 class="fw-bold mb-3">快速配送</h5>
            <p class="text-muted">
              24 小時內出貨，全台 3 天內到貨，免費配送服務
            </p>
          </div>
        </div>

        <div class="col-lg-3 col-md-6">
          <div class="feature-item text-center p-4">
            <div class="feature-icon mb-3">
              <div
                class="icon-circle mx-auto d-flex align-items-center justify-content-center"
                style="width: 80px; height: 80px; background-color: #FFC107; border-radius: 50%;"
              >
                <i class="fas fa-leaf text-white fs-3"></i>
              </div>
            </div>
            <h5 class="fw-bold mb-3">節能環保</h5>
            <p class="text-muted">LED 技術省電 80%，減少碳足跡，愛護地球</p>
          </div>
        </div>

        <div class="col-lg-3 col-md-6">
          <div class="feature-item text-center p-4">
            <div class="feature-icon mb-3">
              <div
                class="icon-circle mx-auto d-flex align-items-center justify-content-center"
                style="width: 80px; height: 80px; background-color: #2C3E50; border-radius: 50%;"
              >
                <i class="fas fa-headset text-white fs-3"></i>
              </div>
            </div>
            <h5 class="fw-bold mb-3">專業服務</h5>
            <p class="text-muted">專業客服團隊，提供照明諮詢與安裝指導</p>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Featured Products Section -->
  <section class="py-5 bg-light">
    <div class="container">
      <div class="row justify-content-center mb-5">
        <div class="col-lg-8 text-center">
          <h2 class="display-5 fw-bold text-dark mb-3">精選商品</h2>
          <p class="lead text-muted">最受歡迎的燈具產品，為您推薦最佳選擇</p>
        </div>
      </div>

      <div class="row g-4">
        <div class="col-lg-4 col-md-6">
          <div class="product-card card border-0 h-100 shadow-sm hover-lift">
            <div class="position-relative">
              <img
                src="@/assets/images/0001.jpg"
                class="card-img-top"
                style="height: 250px; object-fit: cover;"
                alt="智能調光燈泡"
              />
              <div class="position-absolute top-0 end-0 m-3">
                <span class="badge" style="background-color: #FFC107;"
                  >熱銷</span
                >
              </div>
            </div>
            <div class="card-body p-4">
              <h5 class="card-title fw-bold">智能調光 LED 燈泡</h5>
              <p class="card-text text-muted">
                支援 1600 萬色彩調節，APP 遠端控制
              </p>
              <div class="d-flex justify-content-between align-items-center">
                <span class="h5 fw-bold" style="color: #FFC107;">NT$ 899</span>
                <div style="color: #FFC107;">
                  <i class="fas fa-star"></i>
                  <i class="fas fa-star"></i>
                  <i class="fas fa-star"></i>
                  <i class="fas fa-star"></i>
                  <i class="fas fa-star"></i>
                  <small class="text-muted">(4.9)</small>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="col-lg-4 col-md-6">
          <div class="product-card card border-0 h-100 shadow-sm hover-lift">
            <div class="position-relative">
              <img
                src="@/assets/images/0002.jpg"
                class="card-img-top"
                style="height: 250px; object-fit: cover;"
                alt="復古愛迪生燈泡"
              />

              <div class="position-absolute top-0 end-0 m-3">
                <span class="badge" style="background-color: #2C3E50;"
                  >新品</span
                >
              </div>
            </div>
            <div class="card-body p-4">
              <h5 class="card-title fw-bold">復古愛迪生 LED 燈泡</h5>
              <p class="card-text text-muted">
                經典復古造型，溫暖黃光，營造懷舊氛圍
              </p>
              <div class="d-flex justify-content-between align-items-center">
                <span class="h5 fw-bold" style="color: #FFC107;">NT$ 299</span>
                <div style="color: #FFC107;">
                  <i class="fas fa-star"></i>
                  <i class="fas fa-star"></i>
                  <i class="fas fa-star"></i>
                  <i class="fas fa-star"></i>
                  <i class="far fa-star"></i>
                  <small class="text-muted">(4.3)</small>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="col-lg-4 col-md-6">
          <div class="product-card card border-0 h-100 shadow-sm hover-lift">
            <div class="position-relative">
              <img
                src="@/assets/images/0003.jpg"
                class="card-img-top"
                style="height: 250px; object-fit: cover;"
                alt="圓形吸頂燈"
              />
              <div class="position-absolute top-0 end-0 m-3">
                <span class="badge" style="background-color: #FFC107;"
                  >推薦</span
                >
              </div>
            </div>
            <div class="card-body p-4">
              <h5 class="card-title fw-bold">LED 智能吸頂燈</h5>
              <p class="card-text text-muted">遙控調光調色，適合客廳臥室使用</p>
              <div class="d-flex justify-content-between align-items-center">
                <span class="h5 fw-bold" style="color: #FFC107;"
                  >NT$ 1,299</span
                >
                <div style="color: #FFC107;">
                  <i class="fas fa-star"></i>
                  <i class="fas fa-star"></i>
                  <i class="fas fa-star"></i>
                  <i class="fas fa-star"></i>
                  <i class="fas fa-star"></i>
                  <small class="text-muted">(5.0)</small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="text-center mt-5">
        <router-link to="/products" class="btn btn-outline-primary btn-lg px-5">
          <i class="fas fa-plus me-2"></i>查看更多產品
        </router-link>
      </div>
    </div>
  </section>

  <!-- Testimonials Section -->
  <section class="py-5 bg-dark text-white">
    <div class="container">
      <div class="row justify-content-center mb-5">
        <div class="col-lg-8 text-center">
          <h2 class="display-5 fw-bold mb-3">客戶見證</h2>
          <p class="lead mb-0">聽聽我們滿意客戶的真實回饋</p>
        </div>
      </div>

      <div
        id="testimonialCarousel"
        class="carousel slide"
        data-bs-ride="carousel"
      >
        <div class="carousel-inner">
          <div class="carousel-item active">
            <div class="row justify-content-center">
              <div class="col-lg-8 text-center">
                <div class="testimonial-content p-5">
                  <div class="mb-4">
                    <i class="fas fa-quote-left text-warning fs-2"></i>
                  </div>
                  <p class="fs-4 mb-4">
                    "LightCraft
                    的智能燈泡真的太棒了！可以用手機控制不同的顏色和亮度，讓我的家變得更有科技感。品質也很好，使用一年了都沒有問題。"
                  </p>
                  <div class="d-flex justify-content-center align-items-center">
                    <img
                      :src="person1"
                      class="rounded-circle me-3"
                      style="width: 60px; height: 60px; object-fit: cover;"
                      alt="客戶照片"
                    />
                    <div class="text-start">
                      <h6 class="mb-0 fw-bold">James</h6>
                      <small class="text-warning">智慧家居愛好者</small>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="carousel-item">
            <div class="row justify-content-center">
              <div class="col-lg-8 text-center">
                <div class="testimonial-content p-5">
                  <div class="mb-4">
                    <i class="fas fa-quote-left text-warning fs-2"></i>
                  </div>
                  <p class="fs-4 mb-4">
                    "服務很專業，客服人員很有耐心地回答我的問題，還提供了照明設計建議。產品品質優良，配送也很快，整體購物體驗非常滿意！"
                  </p>
                  <div class="d-flex justify-content-center align-items-center">
                    <img
                      :src="person2"
                      class="rounded-circle me-3"
                      style="width: 60px; height: 60px; object-fit: cover;"
                      alt="客戶照片"
                    />
                    <div class="text-start">
                      <h6 class="mb-0 fw-bold">Mike Lee</h6>
                      <small class="text-warning">室內設計師</small>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="carousel-item">
            <div class="row justify-content-center">
              <div class="col-lg-8 text-center">
                <div class="testimonial-content p-5">
                  <div class="mb-4">
                    <i class="fas fa-quote-left text-warning fs-2"></i>
                  </div>
                  <p class="fs-4 mb-4">
                    "買了復古愛迪生燈泡來裝飾咖啡廳，效果超讚！營造出很棒的氛圍，客人都說很有特色。價格合理，品質也很不錯，會繼續支持！"
                  </p>
                  <div class="d-flex justify-content-center align-items-center">
                    <img
                      :src="person3"
                      class="rounded-circle me-3"
                      style="width: 60px; height: 60px; object-fit: cover;"
                      alt="客戶照片"
                    />
                    <div class="text-start">
                      <h6 class="mb-0 fw-bold">Jason cho</h6>
                      <small class="text-warning">咖啡廳老闆</small>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <button
          class="carousel-control-prev"
          type="button"
          data-bs-target="#testimonialCarousel"
          data-bs-slide="prev"
        >
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Previous</span>
        </button>
        <button
          class="carousel-control-next"
          type="button"
          data-bs-target="#testimonialCarousel"
          data-bs-slide="next"
        >
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Next</span>
        </button>
      </div>
    </div>
  </section>

  <!-- CTA Section -->
  <section class="cta-section bg-warning">
    <div class="container">
      <div class="row justify-content-center text-center">
        <div class="col-lg-8">
          <h2 class="display-5 fw-bold text-dark mb-3">
            準備好點亮您的空間了嗎？
          </h2>
          <p class="lead text-dark mb-4">
            立即選購我們的優質燈具，享受專業照明體驗
          </p>
          <div class="cta-buttons">
            <router-link
              to="/products"
              class="btn btn-dark btn-lg px-5 py-3 me-3 mb-3"
              style="border-radius: 50px;"
            >
              <i class="fas fa-shopping-cart me-2"></i>立即購買
            </router-link>
            <a
              href="#"
              class="btn btn-outline-dark btn-lg px-5 py-3 mb-3"
              style="border-radius: 50px;"
            >
              <i class="fas fa-phone me-2"></i>諮詢專線
            </a>
          </div>
          <div class="mt-4">
            <p class="mb-0 text-dark">
              <i class="fas fa-phone me-2"></i
              ><strong>客服專線：</strong>0800-123-456
              <span class="mx-3">|</span>
              <i class="fas fa-envelope me-2"></i
              ><strong>Email：</strong>service@lightcraft.com
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import bannerImage from '@/assets/images/banner.jpg';
import person1 from '@/assets/images/person1.jpg';
import person2 from '@/assets/images/person2.jpg';
import person3 from '@/assets/images/person3.jpg';

export default {
  name: 'HomeView',
  data() {
    return {
      isLoading: false,
      bannerImage,
      person1,
      person2,
      person3,
    };
  },

  methods: {
    scrollToProducts() {
      const element = document.getElementById('products');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    },
  },
  mounted() {
    // 模擬頁面載入
    this.isLoading = true;
    // Add scroll animations
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px',
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // eslint-disable-next-line no-param-reassign
          entry.target.style.animation = 'fadeInUp 0.8s ease forwards';
        }
      });
    }, observerOptions);

    // Observe all sections for animations
    document.querySelectorAll('.category-card, .feature-item, .product-card').forEach((el) => {
      observer.observe(el);
    });

    // 模擬載入完成
    setTimeout(() => {
      this.isLoading = false;
    }, 800);
  },
};
</script>

<style scoped>
/* Hero Background */
.hero-bg {
  background-image: url('@/assets/images/banner.jpg');
  background-size: cover;
  background-position: bottom center;
  background-repeat: no-repeat;
}

/* Hero Section Animations */
@keyframes pulse {
  0% { transform: scale(1); }
  50% { transform: scale(1.1); }
  100% { transform: scale(1); }
}

@keyframes bounce {
  0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
  40% { transform: translateY(-10px); }
  60% { transform: translateY(-5px); }
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Card Hover Effects */
.hover-lift {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.hover-lift:hover {
  transform: translateY(-10px);
  box-shadow: 0 15px 35px rgba(0,0,0,0.1) !important;
}

.category-card:hover .card-overlay {
  opacity: 1 !important;
}

.category-card:hover .card-img-top {
  transform: scale(1.1);
}

.product-card:hover {
  transform: translateY(-5px);
}

/* Feature Icons */
.feature-item {
  transition: transform 0.3s ease;
}

.feature-item:hover {
  transform: translateY(-5px);
}

.icon-circle {
  transition: transform 0.3s ease;
}

.feature-item:hover .icon-circle {
  transform: scale(1.1);
}

/* Scroll Indicator */
.scroll-indicator {
  cursor: pointer;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .display-3 {
    font-size: 2.5rem;
  }

  .hero-content .btn {
    width: 100%;
    margin-bottom: 1rem;
  }

  .hero-icon {
    font-size: 3rem !important;
  }
}

/* Custom Bootstrap overrides */
.btn-warning {
  background: linear-gradient(135deg, #ffd700, #ffed4e);
  border: none;
  transition: all 0.3s ease;
}

.btn-warning:hover {
  background: linear-gradient(135deg, #ffed4e, #ffd700);
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(255,215,0,0.3);
}

.btn-primary {
  background: linear-gradient(135deg, #667eea, #764ba2);
  border: none;
  transition: all 0.3s ease;
}

.btn-primary:hover {
  background: linear-gradient(135deg, #764ba2, #667eea);
  transform: translateY(-2px);
}

/* Section spacing */
section {
  position: relative;
  overflow: hidden;
}

/* CTA Section */
.cta-section {
  padding: 120px 0;
}

@media (max-width: 768px) {
  .cta-section {
    padding: 80px 0;
  }
}

/* Testimonial styling */
.testimonial-content {
  border-radius: 20px;
  background: rgba(255,255,255,0.1);
  backdrop-filter: blur(10px);
}

/* Carousel spacing for mobile */
@media (max-width: 768px) {
  .carousel-item {
    padding: 0 5px;
  }

  .testimonial-content {
    margin: 0 10px;
    padding: 2rem !important;
  }

  #testimonialCarousel .carousel-inner {
    padding: 0 5px;
  }
}

/* Badge styling */
.badge {
  font-size: 0.75rem;
  padding: 0.5rem 1rem;
  border-radius: 20px;
}
</style>
