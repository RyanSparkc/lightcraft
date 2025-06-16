<template>
  <LoadingOverlay :active="isLoading" />

  <!-- 頁面標題區域 -->
  <PageHeader
    icon="fas fa-newspaper"
    icon-color="text-success"
    title="文章管理"
    subtitle="管理部落格文章，發布精彩內容與讀者分享"
  />

  <!-- 統計卡片 -->
  <div class="row mb-4">
    <div class="col-md-3 mb-3">
      <div class="card border-0 shadow-sm">
        <div class="card-body">
          <div class="d-flex align-items-center">
            <div class="flex-grow-1">
              <p class="text-muted mb-1 small">總文章數</p>
              <h4 class="mb-0 fw-bold">{{ articleStats.total }}</h4>
            </div>
            <div class="text-primary">
              <i class="fas fa-newspaper fa-2x"></i>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="col-md-3 mb-3">
      <div class="card border-0 shadow-sm">
        <div class="card-body">
          <div class="d-flex align-items-center">
            <div class="flex-grow-1">
              <p class="text-muted mb-1 small">已發布</p>
              <h4 class="mb-0 fw-bold text-success">
                {{ articleStats.published }}
              </h4>
            </div>
            <div class="text-success">
              <i class="fas fa-check-circle fa-2x"></i>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="col-md-3 mb-3">
      <div class="card border-0 shadow-sm">
        <div class="card-body">
          <div class="d-flex align-items-center">
            <div class="flex-grow-1">
              <p class="text-muted mb-1 small">草稿</p>
              <h4 class="mb-0 fw-bold text-warning">
                {{ articleStats.drafts }}
              </h4>
            </div>
            <div class="text-warning">
              <i class="fas fa-edit fa-2x"></i>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="col-md-3 mb-3">
      <div class="card border-0 shadow-sm">
        <div class="card-body">
          <div class="d-flex align-items-center">
            <div class="flex-grow-1">
              <p class="text-muted mb-1 small">本月新增</p>
              <h4 class="mb-0 fw-bold text-info">
                {{ articleStats.thisMonth }}
              </h4>
            </div>
            <div class="text-info">
              <i class="fas fa-plus-circle fa-2x"></i>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- 文章列表 -->
  <div class="card border-0 shadow-sm">
    <div class="card-header bg-white border-bottom">
      <div class="d-flex justify-content-between align-items-center">
        <h5 class="mb-0 fw-semibold">文章列表</h5>
        <div class="d-flex align-items-center gap-3">
          <span class="badge bg-light text-dark"
            >共 {{ articles.length }} 篇文章</span
          >
          <button
            class="btn btn-primary btn-sm"
            type="button"
            @click="openModal(true)"
          >
            <i class="fas fa-plus me-1"></i>
            建立新文章
          </button>
        </div>
      </div>
    </div>
    <div class="card-body p-0">
      <div class="table-responsive">
        <table class="table table-hover align-middle mb-0">
          <thead class="bg-light">
            <tr>
              <th class="border-0 ps-4">文章資訊</th>
              <th class="border-0 d-none d-md-table-cell">作者</th>
              <th class="border-0 d-none d-lg-table-cell">建立時間</th>
              <th class="border-0 d-none d-md-table-cell">狀態</th>
              <th class="border-0 pe-4">操作</th>
            </tr>
          </thead>
          <tbody>
            <template v-for="item in articles" :key="item.id">
              <tr class="border-bottom">
                <td class="ps-4">
                  <div class="d-flex align-items-start">
                    <div
                      class="avatar-sm rounded-circle bg-success bg-opacity-10 me-3 d-flex align-items-center justify-content-center flex-shrink-0"
                    >
                      <i class="fas fa-file-alt text-success"></i>
                    </div>
                    <div class="article-info">
                      <div class="text-dark fw-medium article-title">
                        {{ item.title }}
                      </div>
                      <small
                        class="text-muted article-description d-none d-sm-block"
                        >{{ item.description }}</small
                      >
                      <!-- 手機版顯示狀態和作者信息 -->
                      <div class="d-block d-md-none mt-1">
                        <small class="text-muted me-2">{{ item.author }}</small>
                        <span
                          :class="item.isPublic
                            ? 'badge bg-success bg-opacity-10 text-success'
                            : 'badge bg-warning bg-opacity-10 text-warning'"
                          style="font-size: 0.65rem;"
                        >
                          {{ item.isPublic ? '已發布' : '草稿' }}
                        </span>
                      </div>
                    </div>
                  </div>
                </td>
                <td class="d-none d-md-table-cell">
                  <div class="d-flex align-items-center">
                    <div
                      class="avatar-xs rounded-circle bg-primary bg-opacity-10 me-2 d-flex align-items-center justify-content-center"
                    >
                      <i class="fas fa-user text-primary"></i>
                    </div>
                    <span class="text-dark fw-medium">{{ item.author }}</span>
                  </div>
                </td>
                <td class="d-none d-lg-table-cell">
                  <div class="text-dark fw-medium">
                    {{ $filters.date(item.create_at) }}
                  </div>
                </td>
                <td class="d-none d-md-table-cell">
                  <span
                    :class="item.isPublic
                      ? 'badge bg-success bg-opacity-10 text-success'
                      : 'badge bg-warning bg-opacity-10 text-warning'"
                  >
                    <i
                      :class="item.isPublic
                        ? 'fas fa-eye me-1'
                        : 'fas fa-eye-slash me-1'"
                    ></i>
                    {{ item.isPublic ? '已發布' : '草稿' }}
                  </span>
                </td>
                <td class="pe-4">
                  <div class="btn-group">
                    <button
                      type="button"
                      class="btn btn-outline-primary btn-sm"
                      @click="getArticle(item.id)"
                      title="編輯文章"
                    >
                      <i class="fas fa-edit"></i>
                      <span class="d-none d-md-inline ms-1">編輯</span>
                    </button>
                    <button
                      type="button"
                      class="btn btn-outline-danger btn-sm"
                      @click="openDelArticleModal(item)"
                      title="刪除文章"
                    >
                      <i class="fas fa-trash"></i>
                      <span class="d-none d-md-inline ms-1">刪除</span>
                    </button>
                  </div>
                </td>
              </tr>
            </template>
          </tbody>
        </table>
      </div>
    </div>
  </div>

  <ArticleModal
    ref="articleModal"
    :article="tempArticle"
    :is-new="isNew"
    @update-article="updateArticle"
  ></ArticleModal>
  <DelModal
    ref="delModal"
    :item="tempArticle"
    @del-item="delArticle"
  ></DelModal>
</template>

<script>
import { mapActions } from 'pinia';
import useToastMessageStore from '@/stores/toastMessage';
import ArticleModal from '@/components/ArticleModal.vue';
import DelModal from '@/components/DelModal.vue';
import PageHeader from '@/components/PageHeader.vue';

const { VITE_APP_URL, VITE_APP_PATH } = import.meta.env;

export default {
  components: {
    DelModal,
    ArticleModal,
    PageHeader,
  },
  data() {
    return {
      articles: [],
      currentPage: 1,
      isLoading: false,
      isNew: false,
      tempArticle: {},
    };
  },
  computed: {
    articleStats() {
      const stats = {
        total: this.articles.length,
        published: 0,
        drafts: 0,
        thisMonth: 0,
      };

      const currentMonth = new Date().getMonth();
      const currentYear = new Date().getFullYear();

      this.articles.forEach((article) => {
        // 統計發布狀態
        if (article.isPublic) {
          stats.published += 1;
        } else {
          stats.drafts += 1;
        }

        // 統計本月新增
        const articleDate = new Date(article.create_at * 1000);
        if (
          articleDate.getMonth() === currentMonth
          && articleDate.getFullYear() === currentYear
        ) {
          stats.thisMonth += 1;
        }
      });

      return stats;
    },
  },
  methods: {
    ...mapActions(useToastMessageStore, ['addMessage']),
    getArticles(page = 1) {
      this.currentPage = page;
      this.isLoading = true;
      const url = `${VITE_APP_URL}/api/${VITE_APP_PATH}/admin/articles?page=${page}`;
      this.axios.get(url).then((res) => {
        this.articles = res.data.articles;
        this.isLoading = false;
        this.addMessage({
          title: '取得文章成功',
          content: `共有${res.data.articles.length}篇文章`,
          style: 'success',
        });
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
    getArticle(id) {
      this.isLoading = true;
      const url = `${VITE_APP_URL}/api/${VITE_APP_PATH}/admin/article/${id}`;
      this.axios.get(url).then((res) => {
        this.isLoading = false;
        this.openModal(false, res.data.article);
        this.isNew = false;
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
    openModal(isNew, item) {
      if (isNew) {
        this.tempArticle = {
          create_at: new Date().getTime() / 1000,
          tag: [''],
          isPublic: false,
        };
        this.isNew = true;
      } else {
        this.tempArticle = { ...item };
        this.isNew = false;
      }
      this.$refs.articleModal.openModal();
    },
    updateArticle(item) {
      this.isLoading = true;
      this.tempArticle = { ...item };
      let url = `${VITE_APP_URL}/api/${VITE_APP_PATH}/admin/article`;
      let httpMethod = 'post';
      let status = '新增貼文';
      if (!this.isNew) {
        url = `${VITE_APP_URL}/api/${VITE_APP_PATH}/admin/article/${this.tempArticle.id}`;
        httpMethod = 'put';
        status = '更新貼文';
      }
      this.axios[httpMethod](url, { data: this.tempArticle })
        .then((res) => {
          this.isLoading = false;
          this.addMessage({
            title: status,
            content: res.data.message,
            style: 'success',
          });
          this.getArticles(this.currentPage);
          this.$refs.articleModal.closeModal();
        })
        .catch((err) => {
          this.isLoading = false;
          this.addMessage({
            title: status,
            content: err.response.data.message,
            style: 'danger',
          });
        });
    },
    openDelArticleModal(item) {
      this.tempArticle = { ...item };
      this.$refs.delModal.openModal();
    },
    delArticle() {
      this.isLoading = true;
      const url = `${VITE_APP_URL}/api/${VITE_APP_PATH}/admin/article/${this.tempArticle.id}`;
      this.axios.delete(url).then((res) => {
        this.isLoading = false;
        this.addMessage({
          title: '刪除貼文',
          content: res.data.message,
          style: 'success',
        });
        this.getArticles(this.currentPage);
        this.$refs.delModal.closeModal();
      }).catch((err) => {
        this.isLoading = false;
        this.addMessage({
          title: '刪除貼文',
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
/* 頭像樣式 */
.avatar-sm {
  width: 40px;
  height: 40px;
  font-size: 1rem;
}

.avatar-xs {
  width: 24px;
  height: 24px;
  font-size: 0.75rem;
}

/* 表格懸停效果 */
.table-hover tbody tr:hover {
  background-color: var(--bs-gray-50);
}

/* 卡片陰影 */
.card {
  transition: all 0.3s ease;
}

.card:hover {
  transform: translateY(-2px);
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15) !important;
}

/* 按鈕組樣式 */
.btn-group .btn {
  border-radius: 0.375rem;
  margin-right: 0.25rem;
}

.btn-group .btn:last-child {
  margin-right: 0;
}

/* 徽章樣式 */
.badge {
  font-weight: 500;
  padding: 0.5em 0.75em;
}

/* 響應式處理 */
@media (max-width: 768px) {
  .btn-group {
    display: flex;
    flex-direction: row;
    gap: 0.25rem;
  }

  .btn-group .btn {
    margin-right: 0;
    font-size: 0.75rem;
    padding: 0.375rem 0.5rem;
    min-width: 36px;
    height: 36px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .table td {
    padding: 0.75rem 0.5rem;
  }

  .avatar-sm {
    width: 32px;
    height: 32px;
    font-size: 0.875rem;
  }

  /* 文章信息區域優化 */
  .article-info {
    min-width: 0; /* 允許 flex 子元素縮小 */
    flex: 1;
  }

  .article-title {
    font-size: 0.9rem;
    line-height: 1.3;
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    text-overflow: ellipsis;
    max-height: 2.6rem;
  }

  /* 表格水平滾動優化 */
  .table-responsive {
    border-radius: 0.375rem;
  }

  .table {
    margin-bottom: 0;
    min-width: 500px; /* 確保最小寬度 */
  }
}

/* 文字截斷樣式 */
.article-title {
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  text-overflow: ellipsis;
  max-width: 300px;
}

.article-description {
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  text-overflow: ellipsis;
  max-width: 300px;
  line-height: 1.4;
  max-height: 2.8rem;
}

/* 表格內容對齊優化 */
.table td {
  vertical-align: middle;
}

/* 手機版特殊處理 */
@media (max-width: 576px) {
  .article-title {
    font-size: 0.85rem;
    max-width: 200px;
  }

  .btn-group .btn {
    font-size: 0.7rem;
    padding: 0.3rem 0.4rem;
    min-width: 32px;
    height: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .table {
    font-size: 0.85rem;
    min-width: 450px;
  }

  .avatar-sm {
    width: 28px;
    height: 28px;
    font-size: 0.75rem;
  }
}
</style>
