<template>
  <div class="hero-section">
    <div class="hero-background"></div>
    <div class="container">
      <div class="row align-items-center py-5 justify-content-between">
        <div class="col-lg-8">
          <h1 class="hero-title mb-3">{{ title }}</h1>
          <p class="hero-subtitle mb-0">{{ subtitle }}</p>
        </div>
        <div class="col-lg-2 d-none d-lg-block">
          <div class="hero-icon">
            <i :class="iconClass"></i>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HeroSection',
  props: {
    title: {
      type: String,
      required: true,
    },
    subtitle: {
      type: String,
      required: true,
    },
    iconClass: {
      type: String,
      default: 'fas fa-lightbulb',
    },
  },
};
</script>

<style scoped>
/* Banner 樣式 */
.hero-section {
  position: relative;
  background: #ffc107;
  color: #333;
  overflow: hidden;
  margin-bottom: 2rem;
}

.hero-background {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image:
    radial-gradient(circle at 25% 25%, rgba(255, 255, 255, 0.1) 0%, transparent 50%),
    radial-gradient(circle at 75% 75%, rgba(255, 255, 255, 0.1) 0%, transparent 50%);
  background-size: 100px 100px;
}

.hero-title {
  font-size: 3rem;
  font-weight: 700;
  margin: 0;
  color: #333;
}

.hero-subtitle {
  font-size: 1.2rem;
  opacity: 0.9;
  color: #333;
}

.hero-icon {
  font-size: 4rem;
  opacity: 0.3;
  text-align: center;
  color: #333;
}

/* 響應式調整 */
@media (max-width: 768px) {
  .hero-title {
    font-size: 2.5rem;
  }
  .hero-subtitle {
    font-size: 1rem;
  }
  .hero-icon {
    font-size: 3rem;
  }
}
</style>
