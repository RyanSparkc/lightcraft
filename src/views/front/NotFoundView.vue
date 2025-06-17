<!-- eslint-disable max-len -->
<template>
  <div class="not-found-page">
    <!-- Hero Section -->
    <section
      class="hero-section bg-dark text-white position-relative overflow-hidden"
    >
      <div
        class="hero-bg position-absolute w-100 h-100"
        style="background: linear-gradient(135deg, #2c3e50 0%, #34495e 100%);"
      ></div>
      <div
        class="hero-overlay position-absolute w-100 h-100"
        style="background: rgba(0, 0, 0, 0.1);"
      ></div>

      <div class="container position-relative" style="min-height: 100vh;">
        <div
          class="row align-items-center justify-content-center text-center text-white"
          style="min-height: 100vh;"
        >
          <div class="col-lg-8 col-md-10">
            <div class="error-content">
              <!-- 燈泡動畫區域 -->
              <div class="lightbulb-container mb-4" @click="lightUp">
                <div class="lightbulb-wrapper position-relative d-inline-block">
                  <i
                    :class="[
                      'fas fa-lightbulb lightbulb-icon',
                      { 'lit': isLit, 'flickering': isFlickering }
                    ]"
                    style="font-size: 6rem; cursor: pointer; transition: all 0.3s ease;"
                  ></i>
                  <!-- 光暈效果 -->
                  <div
                    v-if="isLit"
                    class="light-glow position-absolute"
                    style="top: 50%; left: 50%; transform: translate(-50%, -50%);
                            width: 200px; height: 200px; border-radius: 50%;
                            background: radial-gradient(circle, rgba(255,193,7,0.3) 0%, transparent 70%);
                            animation: glow 2s ease-in-out infinite alternate;"
                  ></div>
                </div>
              </div>

              <!-- 錯誤訊息 -->
              <div class="error-message">
                <h1
                  class="display-1 fw-bold mb-3"
                  style="font-size: 8rem; color: #FFC107; text-shadow: 2px 2px 4px rgba(0,0,0,0.3);"
                >
                  404
                </h1>
                <h2
                  class="display-5 fw-bold mb-4"
                  style="text-shadow: 2px 2px 4px rgba(0,0,0,0.3);"
                >
                  {{ isLit ? '燈亮了！但頁面還是不在這裡' : '這裡的燈沒亮' }}
                </h2>
                <p
                  class="lead mb-5 fs-4"
                  style="text-shadow: 1px 1px 2px rgba(0,0,0,0.3);"
                >
                  {{ isLit ? '不過別擔心，我們幫您找到回家的路' : '您要找的頁面似乎不存在，試試點擊燈泡？' }}
                </p>
              </div>

              <!-- 操作按鈕 -->
              <div class="action-buttons">
                <router-link
                  to="/"
                  class="btn btn-warning btn-lg px-5 py-3 me-3 mb-3 fw-bold"
                  style="border-radius: 50px; box-shadow: 0 4px 15px rgba(255,193,7,0.3);"
                >
                  <i class="fas fa-home me-2"></i>回到首頁
                </router-link>
                <router-link
                  to="/products"
                  class="btn btn-outline-light btn-lg px-5 py-3 mb-3 fw-bold"
                  style="border-radius: 50px;"
                >
                  <i class="fas fa-lightbulb me-2"></i>瀏覽產品
                </router-link>
              </div>

              <!-- 提示文字 -->
              <div class="hint-text mt-4">
                <p class="mb-0 text-white">
                  <i class="fas fa-info-circle me-2 text-warning"></i>
                  {{ isLit ? '感謝您點亮這個頁面！' : '小提示：點擊上方的燈泡試試看' }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 建議頁面區塊 -->
    <section class="suggested-pages py-5 bg-light">
      <div class="container">
        <div class="row justify-content-center mb-5">
          <div class="col-lg-8 text-center">
            <h3 class="display-6 fw-bold text-dark mb-3">或許您在找這些？</h3>
            <p class="lead text-muted">探索我們的熱門頁面和產品</p>
          </div>
        </div>

        <div class="row g-4">
          <div class="col-lg-4 col-md-6">
            <div class="card border-0 h-100 shadow-sm hover-lift">
              <div class="card-body text-center p-4">
                <div class="mb-3">
                  <i class="fas fa-lightbulb fs-2" style="color: #FFC107;"></i>
                </div>
                <h5 class="card-title fw-bold">LED 燈泡</h5>
                <p class="card-text text-muted mb-4">節能環保，多種色溫選擇</p>
                <router-link to="/products" class="btn btn-warning">
                  查看產品
                </router-link>
              </div>
            </div>
          </div>

          <div class="col-lg-4 col-md-6">
            <div class="card border-0 h-100 shadow-sm hover-lift">
              <div class="card-body text-center p-4">
                <div class="mb-3">
                  <i
                    class="fas fa-info-circle fs-2"
                    style="color: #2C3E50;"
                  ></i>
                </div>
                <h5 class="card-title fw-bold">關於我們</h5>
                <p class="card-text text-muted mb-4">
                  了解 LightCraft 品牌故事
                </p>
                <router-link to="/about" class="btn btn-outline-dark">
                  了解更多
                </router-link>
              </div>
            </div>
          </div>

          <div class="col-lg-4 col-md-6">
            <div class="card border-0 h-100 shadow-sm hover-lift">
              <div class="card-body text-center p-4">
                <div class="mb-3">
                  <i class="fas fa-newspaper fs-2" style="color: #28a745;"></i>
                </div>
                <h5 class="card-title fw-bold">照明知識</h5>
                <p class="card-text text-muted mb-4">專業照明文章和技巧</p>
                <router-link to="/articles" class="btn btn-outline-success">
                  閱讀文章
                </router-link>
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
  name: 'NotFoundView',
  data() {
    return {
      isLit: false,
      isFlickering: false,
    };
  },
  methods: {
    lightUp() {
      if (this.isLit) {
        // 如果已經亮著，讓燈泡閃爍一下
        this.isFlickering = true;
        setTimeout(() => {
          this.isFlickering = false;
        }, 500);
        return;
      }

      // 點亮燈泡效果
      this.isFlickering = true;
      setTimeout(() => {
        this.isFlickering = false;
        this.isLit = true;
      }, 300);
    },
  },
  mounted() {
    // 頁面標題
    document.title = '404 - 頁面不存在 | LightCraft';
  },
};
</script>

<style lang="scss" scoped>
.not-found-page {
  min-height: 100vh;
}

.hero-section {
  min-height: 100vh;
}

.lightbulb-icon {
  color: #6c757d;
  transition: all 0.3s ease;

  &:hover {
    transform: scale(1.1);
  }

  &.lit {
    color: #FFC107;
    text-shadow: 0 0 20px rgba(255, 193, 7, 0.6);
    animation: pulse 2s infinite;
  }

  &.flickering {
    animation: flicker 0.5s ease-in-out;
  }
}

// 燈泡閃爍動畫
@keyframes flicker {
  0%, 50%, 100% {
    color: #6c757d;
    text-shadow: none;
  }
  25%, 75% {
    color: #FFC107;
    text-shadow: 0 0 20px rgba(255, 193, 7, 0.6);
  }
}

// 燈泡發光動畫
@keyframes pulse {
  0% {
    text-shadow: 0 0 20px rgba(255, 193, 7, 0.6);
  }
  50% {
    text-shadow: 0 0 30px rgba(255, 193, 7, 0.8);
  }
  100% {
    text-shadow: 0 0 20px rgba(255, 193, 7, 0.6);
  }
}

// 光暈動畫
@keyframes glow {
  0% {
    opacity: 0.4;
    transform: translate(-50%, -50%) scale(0.8);
  }
  100% {
    opacity: 0.6;
    transform: translate(-50%, -50%) scale(1.2);
  }
}

// 卡片懸停效果
.hover-lift {
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.12) !important;
  }
}

// 響應式調整
@media (max-width: 768px) {
  .lightbulb-icon {
    font-size: 4rem !important;
  }

  .display-1 {
    font-size: 5rem !important;
  }

  .hero-buttons .btn {
    display: block;
    width: 100%;
    margin-bottom: 1rem;
  }
}
</style>
