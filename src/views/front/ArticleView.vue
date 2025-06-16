<template>
  <LoadingOverlay :active="isLoading" />

  <!-- 面包屑導航 -->
  <div class="container mt-3">
    <nav aria-label="breadcrumb">
      <ol class="breadcrumb">
        <li class="breadcrumb-item">
          <RouterLink to="/" class="text-warning">
            <i class="fas fa-home me-1"></i>首頁
          </RouterLink>
        </li>
        <li class="breadcrumb-item">
          <RouterLink to="/articles" class="text-warning">文章專區</RouterLink>
        </li>
        <li class="breadcrumb-item active text-muted" aria-current="page">
          {{ article.title }}
        </li>
      </ol>
    </nav>
  </div>

  <div class="container my-4">
    <div class="row justify-content-center">
      <!-- 文章主內容 -->
      <article class="col-lg-8 col-md-10">
        <!-- 文章頭部 -->
        <div class="article-header mb-4">
          <!-- 分類標籤 -->
          <div class="mb-3">
            <span class="badge bg-warning text-dark me-2">
              <i class="fas fa-lightbulb me-1"></i>照明知識
            </span>
            <span class="badge bg-light text-dark border">精選文章</span>
          </div>

          <!-- 文章標題 -->
          <h1 class="display-5 fw-bold mb-4 text-dark">{{ article.title }}</h1>

          <!-- 文章資訊 -->
          <div
            class="article-meta d-flex flex-wrap align-items-center text-muted mb-4"
          >
            <div class="me-4 mb-2">
              <i class="fas fa-user me-2 text-warning"></i>
              <span>{{ article.author || '編輯部' }}</span>
            </div>
            <div class="me-4 mb-2">
              <i class="fas fa-calendar me-2 text-warning"></i>
              <span>{{ $filters.date(article.create_at) }}</span>
            </div>
            <div class="me-4 mb-2">
              <i class="fas fa-eye me-2 text-warning"></i>
              <span>{{ Math.floor(Math.random() * 1000) + 500 }} 次瀏覽</span>
            </div>
            <div class="mb-2">
              <i class="fas fa-clock me-2 text-warning"></i>
              <span>約 5 分鐘閱讀</span>
            </div>
          </div>
        </div>

        <!-- 文章圖片 -->
        <div
          class="article-image mb-4"
          v-if="article.imageUrl || article.image"
        >
          <img
            :src="article.imageUrl || article.image"
            :alt="article.title"
            class="img-fluid rounded shadow-sm"
            style="width: 100%; max-height: 400px; object-fit: cover;"
          />
        </div>

        <!-- 文章內容 -->
        <div class="article-content">
          <div class="content-body mb-5" v-html="article.content"></div>
        </div>

        <!-- 文章標籤 -->
        <div class="article-tags mb-4" v-if="article.tag && article.tag.length">
          <h6 class="text-muted mb-2">
            <i class="fas fa-tags me-2"></i>相關標籤：
          </h6>
          <span
            v-for="tag in article.tag"
            :key="tag"
            class="badge bg-light text-dark border me-2 mb-2"
          >
            #{{ tag }}
          </span>
        </div>

        <!-- 文章操作 -->
        <div
          class="article-actions d-flex justify-content-between align-items-center py-3 border-top border-bottom"
        >
          <div class="like-section">
            <button class="btn btn-outline-danger me-3">
              <i class="fas fa-heart me-1"></i>
              喜歡 ({{ Math.floor(Math.random() * 100) + 20 }})
            </button>
            <button class="btn btn-outline-warning">
              <i class="fas fa-bookmark me-1"></i>
              收藏
            </button>
          </div>
          <div class="nav-buttons">
            <RouterLink to="/articles" class="btn btn-warning">
              <i class="fas fa-arrow-left me-1"></i>
              返回文章列表
            </RouterLink>
          </div>
        </div>

        <!-- 相關產品推薦 -->
        <div class="related-products mt-5 d-none">
          <h4 class="mb-4">
            <i class="fas fa-lightbulb text-warning me-2"></i>
            相關推薦產品
          </h4>
          <div class="row g-3">
            <div class="col-md-6" v-for="i in 2" :key="i">
              <div class="card product-card">
                <div class="row g-0">
                  <div class="col-4">
                    <img
                      src="https://via.placeholder.com/120x120?text=燈泡"
                      class="img-fluid rounded-start h-100"
                      style="object-fit: cover;"
                      alt="產品圖片"
                    />
                  </div>
                  <div class="col-8">
                    <div class="card-body p-3">
                      <h6 class="card-title mb-2">
                        LED智能燈泡 {{ i === 1 ? 'A60' : 'G45' }}
                      </h6>
                      <p class="card-text text-muted small mb-2">
                        {{ i === 1 ? '9W 暖白光 3000K' : '6W 自然光 4000K' }}
                      </p>
                      <div
                        class="d-flex justify-content-between align-items-center"
                      >
                        <span class="text-warning fw-bold"
                          >NT$ {{ i === 1 ? '299' : '199' }}</span
                        >
                        <button class="btn btn-sm btn-warning">查看</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </article>

      <!-- 側邊欄 -->
      <aside class="col-lg-4 col-md-10 mt-lg-0 mt-5">
        <div class="sticky-top" style="top: 1rem;">
          <!-- 文章目錄 -->
          <div class="card mb-4">
            <div class="card-header bg-warning">
              <h6 class="mb-0 text-dark fw-bold">
                <i class="fas fa-list me-2"></i>文章目錄
              </h6>
            </div>
            <div class="card-body">
              <ul class="list-unstyled mb-0">
                <li class="mb-2">
                  <a href.prevent="" class="text-decoration-none">
                    <i class="fas fa-chevron-right text-warning me-2"></i>
                    什麼是 LED 燈泡？
                  </a>
                </li>
                <li class="mb-2">
                  <a href.prevent="" class="text-decoration-none">
                    <i class="fas fa-chevron-right text-warning me-2"></i>
                    LED 燈泡的優點
                  </a>
                </li>
                <li class="mb-2">
                  <a href.prevent="" class="text-decoration-none">
                    <i class="fas fa-chevron-right text-warning me-2"></i>
                    如何選擇合適的燈泡
                  </a>
                </li>
                <li class="mb-0">
                  <a href.prevent="" class="text-decoration-none">
                    <i class="fas fa-chevron-right text-warning me-2"></i>
                    安裝注意事項
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <!-- 廣告區塊 -->
          <div class="card">
            <div class="card-body text-center">
              <i
                class="fas fa-lightbulb text-warning"
                style="font-size: 3rem;"
              ></i>
              <h6 class="mt-3 mb-2">專業照明諮詢</h6>
              <p class="text-muted small mb-3">
                需要照明建議嗎？我們的專家團隊隨時為您服務
              </p>
              <button class="btn btn-warning btn-sm">
                <i class="fas fa-phone me-1"></i>
                立即諮詢
              </button>
            </div>
          </div>
        </div>
      </aside>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'pinia';
import useToastMessageStore from '@/stores/toastMessage';

const { VITE_APP_URL, VITE_APP_PATH } = import.meta.env;

export default {
  data() {
    return {
      isLoading: false,
      article: {},
      id: '',
    };
  },
  methods: {
    ...mapActions(useToastMessageStore, ['addMessage']),
    getArticle() {
      const url = `${VITE_APP_URL}/api/${VITE_APP_PATH}/article/${this.id}`;
      this.isLoading = true;
      this.axios.get(url)
        .then((res) => {
          this.article = res.data.article;
          this.isLoading = false;
        })
        .catch((err) => {
          this.isLoading = false;
          this.addMessage({
            title: '取得文章失敗',
            content: err.response.data.message,
            style: 'danger',
          });
        });
    },
  },
  mounted() {
    this.id = this.$route.params.id;
    this.getArticle();
  },
};
</script>

<style scoped>
.article-header {
  padding-bottom: 1rem;
  border-bottom: 1px solid #eee;
}

.article-meta > div {
  font-size: 0.9rem;
}

.article-content {
  line-height: 1.8;
  font-size: 1.1rem;
}

.content-body {
  color: #444;
}

.content-body h2,
.content-body h3,
.content-body h4 {
  color: #333;
  margin-top: 2rem;
  margin-bottom: 1rem;
}

.content-body p {
  margin-bottom: 1.5rem;
}

.content-body img {
  max-width: 100%;
  height: auto;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  margin: 1rem 0;
}

.product-card {
  transition: all 0.3s ease;
  border: 1px solid #e0e0e0;
}

.product-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 15px rgba(0,0,0,0.1);
}

.article-share .btn {
  font-size: 0.85rem;
}

.sticky-top {
  z-index: 1020;
}

@media (max-width: 991.98px) {
  .sticky-top {
    position: relative !important;
  }
}

.list-group-item {
  border-left: none;
  border-right: none;
}

.list-group-item:first-child {
  border-top: none;
}

.list-group-item:last-child {
  border-bottom: none;
}

.breadcrumb {
  background: none;
  padding: 0;
}

.breadcrumb-item + .breadcrumb-item::before {
  content: "›";
  color: #6c757d;
}
</style>
