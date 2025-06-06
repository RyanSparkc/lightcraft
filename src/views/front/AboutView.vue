<template>
  <div class="about-page">
    <!-- Hero Section -->
    <section class="hero-section  gradient-bg section-padding text-white">
      <div class="container">
        <h1 class="fs-hero fw-bold mb-4 letter-spacing-tight">
          關於 LightCraft
        </h1>
        <p class="fs-large opacity-90 fw-light letter-spacing-wide">
          點亮每一個角落，照亮美好生活
        </p>
      </div>
    </section>

    <!-- 品牌故事 -->
    <section class="brand-story  bg-section section-padding">
      <div class="container">
        <div class="section-content">
          <h2 class="section-title">品牌故事</h2>
          <div class="row g-5 align-items-center">
            <div class="col-lg-6">
              <div class="story-text">
                <p>
                  2024年，在一個偶然的機會下，我們的創辦人燈泡先生發現市面上的LED燈泡雖然節能，
                  但在色溫和顯色性方面總是無法達到完美的平衡。作為一名照明工程師，
                  他決心要創造出既節能又能完美還原自然光的LED燈泡。
                </p>
                <p>
                  經過三年的研發，我們終於推出了 LightCraft 智慧調光LED燈泡，
                  結合了最新的光學技術與人性化設計，為每個家庭帶來最舒適的照明體驗。
                </p>
              </div>
            </div>
            <div class="col-lg-6">
              <div class="story-image">
                <div class="image-placeholder" v-if="imageLoadError">
                  <i class="icon-lightbulb"></i>
                  <span>研發過程圖片</span>
                </div>
                <img
                  v-else
                  src="https://images.unsplash.com/photo-1583341655470-c039d25ce01e?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  alt="創辦人研發過程"
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
    <section class="product-features section-padding">
      <div class="container">
        <h2 class="section-title">產品特色</h2>
        <div class="row g-4">
          <div class="col-lg-4 col-md-6">
            <div class="card-custom text-center p-4 h-100">
              <div class="feature-icon mb-3">
                <span>⚡</span>
              </div>
              <h3 class="h4 mb-3 text-primary-custom">超級節能</h3>
              <p class="text-secondary-custom">
                比傳統白熾燈泡節能90%，使用壽命長達50,000小時
              </p>
            </div>
          </div>
          <div class="col-lg-4 col-md-6">
            <div class="card-custom text-center p-4 h-100">
              <div class="feature-icon mb-3">
                <span>🌈</span>
              </div>
              <h3 class="h4 mb-3 text-primary-custom">智慧調光</h3>
              <p class="text-secondary-custom">
                色溫可調範圍2700K-6500K，完美適應不同時間與場景需求
              </p>
            </div>
          </div>
          <div class="col-lg-4 col-md-6">
            <div class="card-custom text-center p-4 h-100">
              <div class="feature-icon mb-3">
                <span>👁️</span>
              </div>
              <h3 class="h4 mb-3 text-primary-custom">護眼設計</h3>
              <p class="text-secondary-custom">
                無藍光危害，無頻閃，保護家人眼部健康
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 公司使命 -->
    <section class="mission-section">
      <div class="container-fluid px-0">
        <div class="container">
          <div class="mission-content">
            <h2 class="section-title">我們的使命</h2>
            <div class="mission-text">
              <blockquote>
                "透過創新的照明科技，為每個家庭創造更健康、更舒適、更節能的生活環境。
                我們相信，好的照明不只是照亮空間，更是照亮生活的品質。"
              </blockquote>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 品質保證 -->
    <section class="quality-assurance">
      <div class="container-fluid px-0">
        <div class="container">
          <h2 class="section-title">品質保證</h2>
          <div class="row g-4">
            <div class="col-lg-3 col-md-6">
              <div class="quality-item">
                <img src="@/assets/images/cert-ce.png" alt="CE認證" />
                <h4>CE 認證</h4>
                <p>符合歐洲安全標準</p>
              </div>
            </div>
            <div class="col-lg-3 col-md-6">
              <div class="quality-item">
                <img src="@/assets/images/cert-rohs.png" alt="RoHS認證" />
                <h4>RoHS 認證</h4>
                <p>環保無害物質</p>
              </div>
            </div>
            <div class="col-lg-3 col-md-6">
              <div class="quality-item">
                <img src="@/assets/images/cert-energy.png" alt="節能標章" />
                <h4>節能標章</h4>
                <p>政府認可節能產品</p>
              </div>
            </div>
            <div class="col-lg-3 col-md-6">
              <div class="quality-item">
                <img src="@/assets/images/cert-iso.png" alt="ISO認證" />
                <h4>ISO 9001</h4>
                <p>品質管理系統認證</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 客戶見證 -->
    <section class="testimonials">
      <div class="container">
        <h2 class="section-title">客戶見證</h2>
        <div class="row g-4">
          <div class="col-lg-6">
            <div class="testimonial-card">
              <div class="testimonial-content">
                <p>
                  "使用 LightCraft
                  燈泡後，家裡的氛圍變得更溫馨。尤其是晚餐時間，
                  暖色調的燈光讓全家人用餐更有情調。智能調光功能真的很棒！"
                </p>
              </div>
              <div class="testimonial-author">
                <div class="avatar-placeholder">
                  <span>陳</span>
                </div>
                <div class="author-info">
                  <h4>陳小姐</h4>
                  <span>台北市 家庭主婦</span>
                </div>
              </div>
            </div>
          </div>
          <div class="col-lg-6">
            <div class="testimonial-card">
              <div class="testimonial-content">
                <p>
                  "作為室內設計師，我經常推薦客戶使用 LightCraft 燈泡。
                  它們的顯色性excellent，能完美呈現設計的色彩效果。"
                </p>
              </div>
              <div class="testimonial-author">
                <div class="avatar-placeholder">
                  <span>林</span>
                </div>
                <div class="author-info">
                  <h4>林設計師</h4>
                  <span>新竹市 室內設計師</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 聯絡資訊 -->
    <section class="contact-section">
      <div class="container-fluid px-0">
        <div class="container">
          <h2 class="section-title">聯絡我們</h2>
          <div class="row g-4">
            <div class="col-lg-3 col-md-6">
              <div class="contact-item">
                <div class="contact-icon">
                  <span>📍</span>
                </div>
                <h4>公司地址</h4>
                <p>台北市信義區信義路五段7號35樓</p>
              </div>
            </div>
            <div class="col-lg-3 col-md-6">
              <div class="contact-item">
                <div class="contact-icon">
                  <span>📞</span>
                </div>
                <h4>客服專線</h4>
                <p>0800-123-456</p>
              </div>
            </div>
            <div class="col-lg-3 col-md-6">
              <div class="contact-item">
                <div class="contact-icon">
                  <span>✉️</span>
                </div>
                <h4>電子信箱</h4>
                <p>service@lightcraft.com.tw</p>
              </div>
            </div>
            <div class="col-lg-3 col-md-6">
              <div class="contact-item">
                <div class="contact-icon">
                  <span>🕒</span>
                </div>
                <h4>服務時間</h4>
                <p>週一至週五 09:00-18:00</p>
              </div>
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
};
</script>

<style scoped>
.about-page {
  min-height: 100vh;
  margin: 0;
  padding: 0;
}

/* Hero Section 動畫效果 */
.hero-section {
  background-size: 400% 400%;
  animation: gradientShift 8s ease-in-out infinite;
  text-align: center;
  overflow: hidden;
  position: relative;
}

.hero-section::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: radial-gradient(circle at 20% 50%, rgba(255,255,255,0.1) 0%, transparent 50%),
              radial-gradient(circle at 80% 20%, rgba(255,255,255,0.1) 0%, transparent 50%),
              radial-gradient(circle at 40% 80%, rgba(255,255,255,0.1) 0%, transparent 50%);
  animation: lightFloat 10s ease-in-out infinite;
  pointer-events: none;
}

@keyframes gradientShift {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}

@keyframes lightFloat {
  0%, 100% {
    transform: translateY(0px);
    opacity: 0.2;
  }
  50% {
    transform: translateY(-10px);
    opacity: 0.4;
  }
}

/* 品牌故事區塊 */

.story-text p {
  font-size: 1.2rem;
  line-height: 1.8;
  margin-bottom: 1.5rem;
  color: var(--bs-gray-700);
  font-weight: 400;
}

.story-image img {
  width: 100%;
  max-height: 630px;
  object-fit: cover;
  border-radius: var(--bs-border-radius);
  box-shadow: var(--bs-box-shadow);
}

/* 使命區塊 */
.mission-section {
  padding: 100px 0;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}

.mission-content {
  text-align: center;
}

.mission-text blockquote {
  font-size: 1.3rem;
  line-height: 1.8;
  max-width: 800px;
  margin: 0 auto;
  font-style: italic;
  position: relative;
  padding: 0 40px;
}

.mission-text blockquote::before,
.mission-text blockquote::after {
  content: '"';
  font-size: 3rem;
  color: rgba(255,255,255,0.3);
  position: absolute;
  top: -10px;
}

.mission-text blockquote::before {
  left: 0;
}

.mission-text blockquote::after {
  right: 0;
}

/* 品質保證 */
.quality-assurance {
  padding: 100px 0;
  background: #f8f9fa;
}

.quality-item {
  text-align: center;
  padding: 30px;
  background: white;
  border-radius: 10px;
  box-shadow: 0 5px 15px rgba(0,0,0,0.08);
}

.quality-item img {
  width: 80px;
  height: 80px;
  margin-bottom: 20px;
}

.quality-item h4 {
  margin-bottom: 10px;
  color: #333;
}

/* 客戶見證 */
.testimonials {
  padding: 100px 0;
  background: white;
}

/* 客戶見證樣式已整合至 Bootstrap 網格系統 */

.testimonial-card {
  background: white;
  padding: 30px;
  border-radius: 15px;
  box-shadow: 0 5px 20px rgba(0,0,0,0.1);
  display: flex;
  flex-direction: column;
  height: 100%;
}

.testimonial-content {
  flex-grow: 1;
}

.testimonial-content p {
  font-size: 1.1rem;
  line-height: 1.6;
  color: #555;
  margin-bottom: 20px;
  font-style: italic;
}

.testimonial-author {
  display: flex;
  align-items: center;
  gap: 15px;
}

/* 客戶頭像樣式已移至 .avatar-placeholder */

.author-info h4 {
  margin: 0;
  color: #333;
}

.author-info span {
  color: #666;
  font-size: 0.9rem;
}

/* 團隊介紹區塊已移除 */

/* 聯絡資訊 */
.contact-section {
  padding: 100px 0;
  background: #f8f9fa;
}

.contact-item {
  text-align: center;
  padding: 30px;
  background: white;
  border-radius: 15px;
  box-shadow: 0 5px 15px rgba(0,0,0,0.08);
}

/* 聯絡圖標樣式已移至 .contact-icon */

.contact-item h4 {
  margin-bottom: 10px;
  color: #333;
}

.contact-item p {
  color: #666;
}

/* 圖片佔位符樣式 */
.image-placeholder {
  width: 100%;
  height: 300px;
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #6c757d;
  font-size: 1rem;
  text-align: center;
}

.image-placeholder i {
  font-size: 3rem;
  margin-bottom: 10px;
  opacity: 0.6;
}

/* 認證標章佔位符 */
.cert-placeholder {
  width: 80px;
  height: 80px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 20px;
  color: white;
  font-weight: bold;
  font-size: 0.9rem;
}

/* 頭像佔位符 */
.avatar-placeholder {
  width: 50px;
  height: 50px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: bold;
  font-size: 1.2rem;
}

/* 團隊相關樣式已移除 */

/* 聯絡圖標樣式 */
.contact-icon {
  font-size: 2.5rem;
  margin-bottom: 20px;
  display: flex;
  justify-content: center;
}

.contact-icon span {
  display: block;
}

/* 功能圖標調整 */
.feature-icon span {
  font-size: 2rem;
  display: block;
}

/* 響應式設計 */
@media (max-width: 768px) {
  .page-title {
    font-size: 2.5rem;
  }

  .section-title {
    font-size: 2.2rem;
    margin-bottom: 40px;
  }

  .hero-section,
  .brand-story,
  .mission-section,
  .quality-assurance,
  .contact-section {
    padding: 60px 0;
  }

  .product-features,
  .testimonials {
    padding: 60px 0;
  }

  /* Bootstrap 網格系統已自動處理響應式 */

  .feature-card {
    padding: 40px 20px;
  }

  .mission-text blockquote {
    font-size: 1.1rem;
    padding: 0 20px;
  }

  .image-placeholder {
    height: 200px;
  }

  .story-text p {
    font-size: 1.1rem;
  }
}
</style>
