<template>
  <div
    class="modal fade show"
    id="productModal"
    tabindex="-1"
    role="dialog"
    aria-labelledby="exampleModalLabel"
    aria-modal="true"
    ref="modal"
  >
    <div class="modal-dialog modal-xl" role="document">
      <div class="modal-content border-0">
        <div class="modal-header bg-dark text-white">
          <h5 class="modal-title" id="exampleModalLabel">
            <span>編輯貼文</span>
          </h5>
          <button
            type="button"
            class="btn-close btn-close-white"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <div class="row">
            <div class="col-sm-4">
              <div class="mb-3">
                <label for="title" class="form-label">標題</label>
                <input
                  type="text"
                  class="form-control"
                  id="title"
                  placeholder="請輸入標題"
                  v-model="tempArticle.title"
                />
              </div>
              <div class="mb-3">
                <label for="image" class="form-label">輸入圖片網址</label>
                <input
                  type="text"
                  class="form-control"
                  id="image"
                  v-model="tempArticle.image"
                  placeholder="請輸入圖片連結"
                />
              </div>
              <div class="mb-3">
                <label for="customFile" class="form-label">或 上傳圖片 </label>
                <input
                  type="file"
                  id="customFile"
                  class="form-control mb-1"
                  ref="fileInput"
                  @change="upLoadFile"
                />
                <img
                  class="img-fluid"
                  :src="tempArticle.image || tempArticle.imageUrl"
                  alt=""
                />
              </div>
              <div class="mb-3">
                <label for="author" class="form-label">作者</label>
                <input
                  type="text"
                  class="form-control"
                  id="author"
                  v-model="tempArticle.author"
                  placeholder="請輸入標題"
                />
              </div>
              <div class="mb-3">
                <label for="create_at">文章建立日期</label>
                <input
                  type="date"
                  class="form-control"
                  id="create_at"
                  v-model="create_at"
                />
              </div>
            </div>
            <div class="col-sm-8">
              <label for="tag" class="form-label">標籤</label>
              <div class="row gx-1 mb-3">
                <div
                  class="col-md-2 mb-1"
                  v-for="(tag, key) in tempArticle.tag"
                  :key="`tag-${key}`"
                >
                  <div class="input-group input-group-sm">
                    <input
                      type="text"
                      class="form-control form-control"
                      id="tag"
                      placeholder="請輸入標籤"
                      v-model="tempArticle.tag[key]"
                    />
                    <button
                      type="button"
                      class="btn btn-outline-danger"
                      @click="tempArticle.tag.splice(key, 1)"
                    >
                      <i class="bi bi-x"></i>
                    </button>
                  </div>
                </div>
                <div
                  class="col-md-2 mb-1"
                  v-if="tempArticle.tag[this.tagLength - 1] || !this.tagLength"
                >
                  <button
                    class="btn btn-outline-primary btn-sm d-block w-100"
                    type="button"
                    @click="tempArticle.tag.push('')"
                  >
                    新增標籤
                  </button>
                </div>
              </div>
              <div class="mb-3">
                <label for="description" class="form-label">文章描述</label>
                <textarea
                  type="text"
                  class="form-control"
                  id="description"
                  placeholder="請輸入文章描述"
                  v-model="tempArticle.description"
                ></textarea>
              </div>
              <div class="mb-3">
                <ckeditor
                  :editor="editor"
                  :config="editorConfig"
                  v-model="tempArticle.content"
                >
                </ckeditor>
              </div>
              <div class="mb-3">
                <div class="form-check">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    id="isPublic"
                    v-model="tempArticle.isPublic"
                  />
                  <label class="form-check-label" for="isPublic"
                    >是否公開</label
                  >
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-outline-secondary"
            data-bs-dismiss="modal"
          >
            取消
          </button>
          <button
            type="button"
            class="btn btn-primary"
            @click="$emit('update-article', tempArticle)"
          >
            確認
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import modalMixin from '@/mixins/modalMixin';
import { mapActions } from 'pinia';
import useToastMessageStore from '@/stores/toastMessage';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

const { VITE_APP_URL, VITE_APP_PATH } = import.meta.env;
export default {
  props: {
    article: Object,
    isNew: Boolean,
  },
  emits: ['update-article'],
  data() {
    return {
      modal: '',
      tempArticle: {
        tag: [''],
      },
      create_at: 0,
      editor: ClassicEditor,
      editorConfig: {
        toolbar: ['heading', '|', 'bold', 'italic', 'link'],
      },
    };
  },
  mixins: [modalMixin],
  methods: {
    ...mapActions(useToastMessageStore, ['addMessage']),
    upLoadFile() {
      const upLoadFile = this.$refs.fileInput.files[0];
      const formData = new FormData();
      formData.append('file-to-upload', upLoadFile);
      const url = `${VITE_APP_URL}/api/${VITE_APP_PATH}/admin/upload`;
      this.axios.post(url, formData)
        .then((res) => {
          this.tempArticle.image = res.data.imageUrl;
          this.$refs.fileInput.value = '';
          this.addMessage({
            title: '圖片上傳結果',
            content: res.data.message,
            style: 'success',
          });
        })
        .catch((err) => {
          this.addMessage({
            title: '圖片上傳結果',
            content: err.response.data.message,
            style: 'danger',
          });
        });
    },
  },
  watch: {
    article() {
      this.tempArticle = {
        ...this.article,
        tag: this.article.tag || [],
        create_at: this.article.create_at || 0,
      };
      [this.create_at] = new Date(this.tempArticle.create_at * 1000).toISOString().split('T');
    },
    create_at() {
      this.tempArticle.create_at = new Date(this.create_at).getTime() / 1000;
    },
  },
  computed: {
    tagLength() {
      return this.tempArticle.tag.length;
    },
  },

};
</script>
<style>
.ck-editor__editable_inline {
  min-height: 350px;
}
</style>
