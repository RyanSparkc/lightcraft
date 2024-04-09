<template>
  <LoadingOverlay :active="isLoading" />
  <div class="container my-md-5 my-3">
    <h3>文章列表</h3>
    <div class="row row-cols-1 row-cols-md-2 g-4">
      <template v-for="article in articles" :key="article.id">
        <div class="col" v-if="article.isPublic">
          <div class="card">
            <img :src="article.imageUrl" class="card-img-top" />
            <div class="card-body">
              <h5 class="card-title">{{ article.title }}</h5>
              <div v-html="article.description"></div>
            </div>
            <div class="card-footer">
              <RouterLink v-if="article.isPublic" class="btn btn-outline-primary"
                :to="`/article/${article.id}`">
                文章頁面
              </RouterLink>
            </div>
          </div>
        </div>
      </template>
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
      articles: [],
      isNew: false,
      tempArticle: {},
      pagination: {},
    };
  },
  methods: {
    ...mapActions(useToastMessageStore, ['addMessage']),
    getArticles(page = 1) {
      console.log(2);
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
