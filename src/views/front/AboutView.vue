<template>
  <div class="about-page">
    <!-- Hero Section -->
    <section class="hero-section">
      <div class="container">
        <h1 class="page-title">關於 LightCraft</h1>
        <p class="hero-subtitle">點亮每一個角落，照亮美好生活</p>
      </div>
    </section>

    <!-- 品牌故事 -->
    <section class="brand-story">
      <div class="container">
        <div class="section-content">
          <h2 class="section-title">品牌故事</h2>
          <div class="story-content">
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
            <div class="story-image">
              <div class="image-placeholder" v-if="!imagesLoaded.founderStory">
                <i class="icon-lightbulb"></i>
                <span>研發過程圖片</span>
              </div>
              <img
                v-else
                src="https://images.unsplash.com/photo-1583341655470-c039d25ce01e?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="創辦人研發過程"
                @error="handleImageError('founderStory')"
                @load="handleImageLoad('founderStory')"
              />
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 產品特色 -->
    <section class="product-features">
      <div class="container">
        <h2 class="section-title">產品特色</h2>
        <div class="features-grid">
          <div class="feature-card">
            <div class="feature-icon">
              <span>⚡</span>
            </div>
            <h3>超級節能</h3>
            <p>比傳統白熾燈泡節能90%，使用壽命長達50,000小時</p>
          </div>
          <div class="feature-card">
            <div class="feature-icon">
              <span>🌈</span>
            </div>
            <h3>智慧調光</h3>
            <p>色溫可調範圍2700K-6500K，完美適應不同時間與場景需求</p>
          </div>
          <div class="feature-card">
            <div class="feature-icon">
              <span>👁️</span>
            </div>
            <h3>護眼設計</h3>
            <p>無藍光危害，無頻閃，保護家人眼部健康</p>
          </div>
        </div>
      </div>
    </section>

    <!-- 公司使命 -->
    <section class="mission-section">
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
    </section>

    <!-- 品質保證 -->
    <section class="quality-assurance">
      <div class="container">
        <h2 class="section-title">品質保證</h2>
        <div class="quality-grid">
          <div class="quality-item">
            <img src="@/assets/images/cert-ce.png" alt="CE認證" />
            <h4>CE 認證</h4>
            <p>符合歐洲安全標準</p>
          </div>
          <div class="quality-item">
            <img src="@/assets/images/cert-rohs.png" alt="RoHS認證" />
            <h4>RoHS 認證</h4>
            <p>環保無害物質</p>
          </div>
          <div class="quality-item">
            <img src="@/assets/images/cert-energy.png" alt="節能標章" />
            <h4>節能標章</h4>
            <p>政府認可節能產品</p>
          </div>
          <div class="quality-item">
            <img src="@/assets/images/cert-iso.png" alt="ISO認證" />
            <h4>ISO 9001</h4>
            <p>品質管理系統認證</p>
          </div>
        </div>
      </div>
    </section>

    <!-- 客戶見證 -->
    <section class="testimonials">
      <div class="container">
        <h2 class="section-title">客戶見證</h2>
        <div class="testimonials-slider">
          <div class="testimonial-card">
            <div class="testimonial-content">
              <p>
                "使用 LightCraft 燈泡後，家裡的氛圍變得更溫馨。尤其是晚餐時間，
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
    </section>

    <!-- 聯絡資訊 -->
    <section class="contact-section">
      <div class="container">
        <h2 class="section-title">聯絡我們</h2>
        <div class="contact-grid">
          <div class="contact-item">
            <div class="contact-icon">
              <span>📍</span>
            </div>
            <h4>公司地址</h4>
            <p>台北市信義區信義路五段7號35樓</p>
          </div>
          <div class="contact-item">
            <div class="contact-icon">
              <span>📞</span>
            </div>
            <h4>客服專線</h4>
            <p>0800-123-456</p>
          </div>
          <div class="contact-item">
            <div class="contact-icon">
              <span>✉️</span>
            </div>
            <h4>電子信箱</h4>
            <p>service@lightcraft.com.tw</p>
          </div>
          <div class="contact-item">
            <div class="contact-icon">
              <span>🕒</span>
            </div>
            <h4>服務時間</h4>
            <p>週一至週五 09:00-18:00</p>
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
      imagesLoaded: {
        founderStory: true,
      },
    };
  },
  mounted() {
    // 頁面載入時的動畫效果可以在這裡添加
    this.initAnimations();
  },
  methods: {
    initAnimations() {
      // 可以添加滾動動畫或其他互動效果
      console.log('About page animations initialized');
    },
    handleImageError(imageKey) {
      this.imagesLoaded[imageKey] = false;
    },
    handleImageLoad(imageKey) {
      this.imagesLoaded[imageKey] = true;
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

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

/* Hero Section */
.hero-section {
  background: linear-gradient(-45deg, #667eea, #764ba2, #667eea, #764ba2);
  background-size: 400% 400%;
  animation: gradientShift 8s ease-in-out infinite;
  color: white;
  padding: 100px 0;
  text-align: center;
  margin: 0;
  width: 100vw;
  position: relative;
  left: 50%;
  right: 50%;
  margin-left: -50vw;
  margin-right: -50vw;
  overflow: hidden;
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

.page-title {
  font-size: 3.5rem;
  font-weight: 700;
  margin-bottom: 24px;
  letter-spacing: -0.02em;
}

.hero-subtitle {
  font-size: 1.3rem;
  opacity: 0.9;
  font-weight: 300;
  letter-spacing: 0.02em;
}

/* Section 通用樣式 */
.section-title {
  font-size: 2.8rem;
  text-align: center;
  margin-bottom: 60px;
  color: #333;
  position: relative;
  font-weight: 600;
  letter-spacing: -0.02em;
}

.section-title::after {
  content: '';
  width: 100px;
  height: 4px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  position: absolute;
  bottom: -15px;
  left: 50%;
  transform: translateX(-50%);
  border-radius: 2px;
}

/* 品牌故事 */
.brand-story {
  padding: 100px 0;
  background: #f8f9fa;
  margin: 0;
  width: 100vw;
  position: relative;
  left: 50%;
  right: 50%;
  margin-left: -50vw;
  margin-right: -50vw;
}

.story-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 80px;
  align-items: center;
  max-width: 1400px;
  margin: 0 auto;
}

.story-text p {
  font-size: 1.2rem;
  line-height: 1.8;
  margin-bottom: 24px;
  color: #555;
  font-weight: 400;
}

.story-image img {
  width: 100%;
  max-height: 630px;
  object-fit: cover;
  border-radius: 10px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.1);
}

/* 產品特色 */
.product-features {
  padding: 100px 0;
  background: white;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 40px;
  max-width: 1200px;
  margin: 0 auto;
}

.feature-card {
  text-align: center;
  padding: 50px 30px;
  border-radius: 20px;
  background: white;
  box-shadow: 0 10px 40px rgba(0,0,0,0.08);
  transition: all 0.3s ease;
  border: 1px solid rgba(0,0,0,0.05);
}

.feature-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 20px 60px rgba(0,0,0,0.12);
}

.feature-icon {
  width: 80px;
  height: 80px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 50%;
  margin: 0 auto 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  color: white;
}

.feature-card h3 {
  font-size: 1.3rem;
  margin-bottom: 15px;
  color: #333;
}

.feature-card p {
  color: #666;
  line-height: 1.6;
}

/* 使命區塊 */
.mission-section {
  padding: 100px 0;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  margin: 0;
  width: 100vw;
  position: relative;
  left: 50%;
  right: 50%;
  margin-left: -50vw;
  margin-right: -50vw;
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
  margin: 0;
  width: 100vw;
  position: relative;
  left: 50%;
  right: 50%;
  margin-left: -50vw;
  margin-right: -50vw;
}

.quality-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 30px;
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

.testimonials-slider {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 30px;
}

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
  margin: 0;
  width: 100vw;
  position: relative;
  left: 50%;
  right: 50%;
  margin-left: -50vw;
  margin-right: -50vw;
}

.contact-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 30px;
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

  .story-content {
    grid-template-columns: 1fr;
    text-align: center;
    gap: 40px;
  }

  .features-grid,
  .testimonials-slider {
    grid-template-columns: 1fr;
    gap: 30px;
  }

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
