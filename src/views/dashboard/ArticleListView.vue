<template>
  <LoadingOverlay :active="isLoading" />
  <!-- <div class="container"> -->
  <h2>文章列表</h2>
  <div class="text-end mt-4">
    <button class="btn btn-primary" @click="openModal(true)">
      建立新的文章
    </button>
  </div>
  <table class="table mt-4">
    <thead>
      <tr>
        <th>標題</th>
        <th>描述</th>
        <th>作者</th>
        <th width="120">建立時間</th>
        <th width="100">是否公開</th>
        <th width="120">編輯</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="item in articles" :key="item.id">
        <td>{{ item.title }}</td>
        <td>{{ item.description }}</td>
        <td>{{ item.author }}</td>
        <td>{{ $filters.date(item.create_at) }}</td>
        <td>
          <span v-if="item.isPublic" class="text-success">已上架</span>
          <span v-else>未上架</span>
        </td>
        <td>
          <div class="btn-group">
            <button
              type="button"
              class="btn btn-outline-primary
            btn-sm"
              @click="getArticle(item.id)"
            >
              編輯
            </button>
            <button
              type="button"
              class="btn btn-outline-danger btn-sm"
              @click="openDelArticleModal(item)"
            >
              刪除
            </button>
          </div>
        </td>
      </tr>
    </tbody>
  </table>
  <!-- </div> -->
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

const { VITE_APP_URL, VITE_APP_PATH } = import.meta.env;

export default {
  components: {
    DelModal,
    ArticleModal,
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
          content: `共有${res.data.articles.length}筆文章`,
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
