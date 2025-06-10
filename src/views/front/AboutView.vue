<!-- eslint-disable max-len -->
<template>
  <LoadingOverlay :active="isLoading" />
  <div class="about-page">
    <!-- Hero Section -->
    <section class="hero-section bg-dark text-white section-padding">
      <div class="container">
        <div class="text-center">
          <div class="mb-4">
            <i
              class="fas fa-lightbulb hero-icon"
              style="font-size: 4rem; color: #FFC107;"
            ></i>
          </div>
          <h1
            class="display-3 fw-bold mb-4"
            style="text-shadow: 2px 2px 4px rgba(0,0,0,0.3);"
          >
            關於 LightCraft
          </h1>
          <p
            class="lead fs-4"
            style="text-shadow: 1px 1px 2px rgba(0,0,0,0.3);"
          >
            點亮每一個角落，照亮美好生活
          </p>
        </div>
      </div>
    </section>

    <!-- 品牌故事 -->
    <section class="brand-story bg-light section-padding">
      <div class="container">
        <div class="section-content">
          <div class="row justify-content-center mb-5">
            <div class="col-lg-8 text-center">
              <h2 class="display-5 fw-bold text-dark mb-3">品牌故事</h2>
            </div>
          </div>
          <div class="row g-5 align-items-center">
            <div class="col-lg-6">
              <div class="story-text">
                <p class="lead text-muted">
                  2024年，在一個偶然的機會下，我們的創辦人燈泡先生發現市面上的LED燈泡雖然節能，
                  但在色溫和顯色性方面總是無法達到完美的平衡。作為一名照明工程師，
                  他決心要創造出既節能又能完美還原自然光的LED燈泡。
                </p>
                <p class="lead text-muted">
                  經過三年的研發，我們終於推出了 LightCraft 智慧調光LED燈泡，
                  結合了最新的光學技術與人性化設計，為每個家庭帶來最舒適的照明體驗。
                </p>
              </div>
            </div>
            <div class="col-lg-6">
              <div class="story-image">
                <div class="image-placeholder" v-if="imageLoadError">
                  <i class="fas fa-lightbulb fs-1 text-warning mb-3"></i>
                  <span>研發過程圖片</span>
                </div>
                <img
                  v-else
                  src="https://images.unsplash.com/photo-1583341655470-c039d25ce01e?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  alt="創辦人研發過程"
                  class="img-fluid rounded shadow"
                  @error="handleImageError"
                  @load="handleImageLoad"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 產品特色 -->
    <section class="product-features section-padding bg-white">
      <div class="container">
        <div class="row justify-content-center mb-5">
          <div class="col-lg-8 text-center">
            <h2 class="display-5 fw-bold text-dark mb-3">產品特色</h2>
          </div>
        </div>
        <div class="row g-4">
          <div class="col-lg-4 col-md-6">
            <div
              class="card border-0 h-100 shadow-sm hover-lift text-center p-4"
            >
              <div class="feature-icon mb-3">
                <div
                  class="icon-circle mx-auto d-flex align-items-center justify-content-center"
                  style="width: 80px; height: 80px; background-color: #FFC107; border-radius: 50%;"
                >
                  <i class="fas fa-bolt text-white fs-3"></i>
                </div>
              </div>
              <h4 class="fw-bold mb-3" style="color: #2C3E50;">超級節能</h4>
              <p class="text-muted">
                比傳統白熾燈泡節能90%，使用壽命長達50,000小時
              </p>
            </div>
          </div>
          <div class="col-lg-4 col-md-6">
            <div
              class="card border-0 h-100 shadow-sm hover-lift text-center p-4"
            >
              <div class="feature-icon mb-3">
                <div
                  class="icon-circle mx-auto d-flex align-items-center justify-content-center"
                  style="width: 80px; height: 80px; background-color: #2C3E50; border-radius: 50%;"
                >
                  <i class="fas fa-palette text-white fs-3"></i>
                </div>
              </div>
              <h4 class="fw-bold mb-3" style="color: #2C3E50;">智慧調光</h4>
              <p class="text-muted">
                色溫可調範圍2700K-6500K，完美適應不同時間與場景需求
              </p>
            </div>
          </div>
          <div class="col-lg-4 col-md-6">
            <div
              class="card border-0 h-100 shadow-sm hover-lift text-center p-4"
            >
              <div class="feature-icon mb-3">
                <div
                  class="icon-circle mx-auto d-flex align-items-center justify-content-center"
                  style="width: 80px; height: 80px; background-color: #FFC107; border-radius: 50%;"
                >
                  <i class="fas fa-eye text-white fs-3"></i>
                </div>
              </div>
              <h4 class="fw-bold mb-3" style="color: #2C3E50;">護眼設計</h4>
              <p class="text-muted">無藍光危害，無頻閃，保護家人眼部健康</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 公司使命 -->
    <section class="mission-section" style="background-color: #2C3E50;">
      <div class="container">
        <div class="mission-content text-center py-5">
          <div class="row justify-content-center">
            <div class="col-lg-8">
              <h2 class="display-5 fw-bold text-white mb-4">我們的使命</h2>
              <div class="mission-text">
                <blockquote
                  class="fs-4 text-white mb-0"
                  style="line-height: 1.8;"
                >
                  "透過創新的照明科技，為每個家庭創造更健康、更舒適、更節能的生活環境。
                  我們相信，好的照明不只是照亮空間，更是照亮生活的品質。"
                </blockquote>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 品質保證 -->
    <section class="quality-assurance section-padding bg-light">
      <div class="container">
        <div class="row justify-content-center mb-5">
          <div class="col-lg-8 text-center">
            <h2 class="display-5 fw-bold text-dark mb-3">品質保證</h2>
          </div>
        </div>
        <div class="row g-4">
          <div class="col-lg-3 col-md-6">
            <div
              class="card border-0 shadow-sm hover-lift text-center p-4 h-100"
            >
              <img
                src="@/assets/images/cert-ce.png"
                alt="CE認證"
                class="mx-auto mb-3"
                style="width: 80px; height: 80px; object-fit: contain;"
              />
              <h5 class="fw-bold mb-2" style="color: #2C3E50;">CE 認證</h5>
              <p class="text-muted mb-0">符合歐洲安全標準</p>
            </div>
          </div>
          <div class="col-lg-3 col-md-6">
            <div
              class="card border-0 shadow-sm hover-lift text-center p-4 h-100"
            >
              <img
                src="@/assets/images/cert-rohs.png"
                alt="RoHS認證"
                class="mx-auto mb-3"
                style="width: 80px; height: 80px; object-fit: contain;"
              />
              <h5 class="fw-bold mb-2" style="color: #2C3E50;">RoHS 認證</h5>
              <p class="text-muted mb-0">環保無害物質</p>
            </div>
          </div>
          <div class="col-lg-3 col-md-6">
            <div
              class="card border-0 shadow-sm hover-lift text-center p-4 h-100"
            >
              <img
                src="@/assets/images/cert-energy.png"
                alt="節能標章"
                class="mx-auto mb-3"
                style="width: 80px; height: 80px; object-fit: contain;"
              />
              <h5 class="fw-bold mb-2" style="color: #2C3E50;">節能標章</h5>
              <p class="text-muted mb-0">政府認可節能產品</p>
            </div>
          </div>
          <div class="col-lg-3 col-md-6">
            <div
              class="card border-0 shadow-sm hover-lift text-center p-4 h-100"
            >
              <img
                src="@/assets/images/cert-iso.png"
                alt="ISO認證"
                class="mx-auto mb-3"
                style="width: 80px; height: 80px; object-fit: contain;"
              />
              <h5 class="fw-bold mb-2" style="color: #2C3E50;">ISO 9001</h5>
              <p class="text-muted mb-0">品質管理系統認證</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'AboutView',
  data() {
    return {
      imageLoadError: false,
      isLoading: false,
    };
  },
  methods: {
    handleImageError() {
      this.imageLoadError = true;
    },
    handleImageLoad() {
      this.imageLoadError = false;
    },
  },
  mounted() {
    // 模擬頁面載入
    this.isLoading = true;
    // 模擬載入完成
    setTimeout(() => {
      this.isLoading = false;
    }, 600);
  },
};
</script>

<style scoped>
.about-page {
  min-height: 100vh;
  margin: 0;
  padding: 0;
}

/* Section Padding */
.section-padding {
  padding: 100px 0;
}

/* Hero Section */
.hero-section {
  text-align: center;
  overflow: hidden;
  position: relative;
}

.hero-icon {
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0% { transform: scale(1); }
  50% { transform: scale(1.1); }
  100% { transform: scale(1); }
}

/* Card Hover Effects - 與首頁一致 */
.hover-lift {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.hover-lift:hover {
  transform: translateY(-10px);
  box-shadow: 0 15px 35px rgba(0,0,0,0.1) !important;
}

/* Feature Icons */
.feature-icon {
  transition: transform 0.3s ease;
}

.hover-lift:hover .feature-icon {
  transform: scale(1.1);
}

.icon-circle {
  transition: transform 0.3s ease;
}

.hover-lift:hover .icon-circle {
  transform: scale(1.1);
}

/* Story Image */
.story-image img {
  width: 100%;
  max-height: 400px;
  object-fit: cover;
}

/* Mission Section */
.mission-section {
  padding: 120px 0;
}

.mission-content blockquote {
  font-style: italic;
  position: relative;
  padding: 0 40px;
}

.mission-content blockquote::before,
.mission-content blockquote::after {
  content: '"';
  font-size: 3rem;
  color: rgba(255,255,255,0.3);
  position: absolute;
  top: -10px;
}

.mission-content blockquote::before {
  left: 0;
}

.mission-content blockquote::after {
  right: 0;
}

/* Contact Section */
.contact-section {
  padding: 120px 0;
}

/* 圖片佔位符樣式 */
.image-placeholder {
  width: 100%;
  height: 300px;
  background: #f8f9fa;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #6c757d;
  font-size: 1rem;
  text-align: center;
}

/* 響應式設計 */
@media (max-width: 768px) {
  .section-padding {
    padding: 60px 0;
  }

  .mission-section,
  .contact-section {
    padding: 80px 0;
  }

  .display-3 {
    font-size: 2.5rem;
  }

  .display-5 {
    font-size: 2.2rem;
  }

  .mission-content blockquote {
    font-size: 1.1rem;
    padding: 0 20px;
  }

  .image-placeholder {
    height: 200px;
  }

  .story-text .lead {
    font-size: 1.1rem;
  }
}
</style>
