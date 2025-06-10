<template>
  <LoadingOverlay :active="isLoading" />

  <!-- Hero Section -->
  <HeroSection
    title="文章專區"
    subtitle="探索照明世界的精彩知識，從選購指南到居家佈置靈感"
    icon-class="fas fa-lightbulb"
  />

  <div class="container my-5">
    <!-- 文章統計 -->
    <div class="row mb-4">
      <div class="col-12">
        <div class="d-flex justify-content-between align-items-center">
          <p class="text-muted mb-0">
            <i class="fas fa-newspaper me-2"></i>
            共 {{ articles.filter(article => article.isPublic).length }} 篇文章
          </p>
        </div>
      </div>
    </div>

    <!-- 文章列表 -->
    <div class="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
      <template v-for="article in articles" :key="article.id">
        <div class="col" v-if="article.isPublic">
          <div class="card h-100 article-card">
            <div class="position-relative">
              <img
                :src="article.imageUrl || article.image || 'https://via.placeholder.com/300x200?text=燈泡文章'"
                class="card-img-top"
                style="height: 200px; object-fit: cover;"
                :alt="article.title"
              />
              <div class="position-absolute top-0 end-0 m-2">
                <span class="badge bg-warning text-dark">
                  <i class="fas fa-star me-1"></i>精選
                </span>
              </div>
            </div>

            <div class="card-body d-flex flex-column">
              <div class="mb-3">
                <span class="badge bg-light text-dark border me-2">
                  <i class="fas fa-lightbulb me-1"></i>照明知識
                </span>
                <small class="text-muted">
                  <i class="fas fa-calendar me-1"></i>
                  {{ $filters.date(article.create_at) }}
                </small>
              </div>

              <h5 class="card-title mb-3">{{ article.title }}</h5>

              <div class="article-description text-muted mb-3 flex-grow-1" v-html="article.description"></div>

              <div class="d-flex justify-content-between align-items-center">
                <small class="text-muted">
                  <i class="fas fa-user me-1"></i>
                  {{ article.author || '編輯部' }}
                </small>
                <div class="article-actions">
                  <button class="btn btn-sm btn-outline-secondary me-2" disabled>
                    <i class="fas fa-eye me-1"></i>
                    {{ Math.floor(Math.random() * 500) + 100 }}
                  </button>
                  <button class="btn btn-sm btn-outline-secondary" disabled>
                    <i class="fas fa-heart me-1"></i>
                    {{ Math.floor(Math.random() * 50) + 10 }}
                  </button>
                </div>
              </div>
            </div>

            <div class="card-footer bg-transparent border-0 pt-0">
              <RouterLink
                class="btn btn-warning text-dark w-100 fw-bold"
                :to="`/article/${article.id}`"
              >
                <i class="fas fa-book-open me-2"></i>
                閱讀全文
              </RouterLink>
            </div>
          </div>
        </div>
      </template>
    </div>

    <!-- 空狀態 -->
    <div v-if="articles.filter(article => article.isPublic).length === 0" class="text-center py-5">
      <i class="fas fa-lightbulb text-muted" style="font-size: 4rem; opacity: 0.3;"></i>
      <h3 class="text-muted mt-3">暫無文章</h3>
      <p class="text-muted">精彩內容即將推出，敬請期待！</p>
    </div>

    <!-- 分頁 -->
    <div v-if="pagination.total_pages > 1" class="row mt-5">
      <div class="col-12">
        <nav aria-label="文章分頁">
          <ul class="pagination justify-content-center">
            <li class="page-item" :class="{ disabled: !pagination.has_pre }">
              <a class="page-link" href="#" @click.prevent="getArticles(pagination.current_page - 1)">
                <i class="fas fa-chevron-left"></i>
                上一頁
              </a>
            </li>
            <li class="page-item active">
              <span class="page-link">
                {{ pagination.current_page }} / {{ pagination.total_pages }}
              </span>
            </li>
            <li class="page-item" :class="{ disabled: !pagination.has_next }">
              <a class="page-link" href="#" @click.prevent="getArticles(pagination.current_page + 1)">
                下一頁
                <i class="fas fa-chevron-right"></i>
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'pinia';
import useToastMessageStore from '@/stores/toastMessage';
import HeroSection from '@/components/HeroSection.vue';

const { VITE_APP_URL, VITE_APP_PATH } = import.meta.env;

export default {
  components: {
    HeroSection,
  },
  data() {
    return {
      isLoading: false,
      articles: [],
      pagination: {},
    };
  },
  methods: {
    ...mapActions(useToastMessageStore, ['addMessage']),
    getArticles(page = 1) {
      const url = `${VITE_APP_URL}/api/${VITE_APP_PATH}/articles?page=${page}`;
      this.isLoading = true;
      this.axios(url)
        .then((res) => {
          this.articles = res.data.articles;
          this.pagination = res.data.pagination;
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
    this.getArticles();
  },
};
</script>

<style scoped>
.article-card {
  transition: all 0.3s ease;
  border: none;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
}

.article-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 25px rgba(0,0,0,0.15);
}

.article-description {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  line-height: 1.5;
}

.article-actions .btn {
  font-size: 0.75rem;
}

.pagination .page-link {
  color: #FFC107;
  border-color: #FFC107;
}

.pagination .page-item.active .page-link {
  background-color: #FFC107;
  border-color: #FFC107;
  color: #000;
}

.pagination .page-link:hover {
  color: #000;
  background-color: #FFE082;
  border-color: #FFC107;
}
</style>
