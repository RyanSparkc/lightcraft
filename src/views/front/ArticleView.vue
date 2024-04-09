<template>
  <LoadingOverlay :active="isLoading" />
  <div class="container mtmd-5 mt-3">
    <nav aria-label="breadcrumb">
      <ol class="breadcrumb">
        <li class="breadcrumb-item">
          <RouterLink to="/articles">部落格列表</RouterLink>
        </li>
        <li class="breadcrumb-item active" aria-current="page">
          {{ article.title }}
        </li>
      </ol>
    </nav>
  </div>
  <div class="row justify-content-center">
    <article class="col-8">
      <h2>{{ article.title }}</h2>
      <p>
        <small class="text-muted">{{ $filters.date(article.create_at) }}</small> -
        <small class="text-muted">作者：{{ article.author }}</small>
      </p>
      <img :src="article.imageUrl" :alt="article.title" class="img-fluid mb-3">
      <div v-html="article.content"></div>
    </article>
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
          console.log(res);
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
