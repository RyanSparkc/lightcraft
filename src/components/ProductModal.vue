<template>
  <div
    id="productModal"
    ref="modal"
    class="modal fade"
    tabindex="-1"
    aria-labelledby="productModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-xl">
      <div class="modal-content border-0">
        <div class="modal-header bg-dark text-white">
          <h5 id="productModalLabel" class="modal-title">
            <span v-if="isNew">新增產品</span>
            <span v-else>編輯產品</span>
          </h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <div class="row">
            <div class="col-sm-4">
              <div class="mb-2">
                <div class="mb-3">
                  <label for="imageUrl" class="form-label">主要圖片網址</label>
                  <input
                    type="text"
                    class="form-control"
                    placeholder="主要圖片連結"
                    v-model="editProduct.imageUrl"
                  />
                </div>
                <div class="mb-3">
                  <label for="customFile" class="form-label"
                    >或 上傳圖片
                    <i
                      class="fas fa-spinner fa-spin"
                      v-if="status.fileUploading"
                    ></i>
                  </label>
                  <input
                    type="file"
                    id="customFile"
                    class="form-control"
                    ref="fileInput"
                    @change="upLoadFile"
                  />
                </div>
                <img class="img-fluid" :src="editProduct.imageUrl" alt="" />
              </div>
              <h3>新增多圖</h3>
              <div v-if="Array.isArray(editProduct.imagesUrl)">
                <div
                  class="mb-3"
                  v-for="(image, key) in editProduct.imagesUrl"
                  :key="key"
                >
                  <div class="mb-2">
                    <label for="imageUrl" class="form-label">圖片網址</label>
                    <input
                      type="text"
                      class="form-control"
                      placeholder="圖片連結"
                      v-model="editProduct.imagesUrl[key]"
                    />
                  </div>
                  <img class="img-fluid" :src="image" alt="" />
                </div>
                <div
                  v-if="!editProduct.imagesUrl.length ||
                  editProduct.imagesUrl[editProduct.imagesUrl.length - 1]"
                >
                  <button
                    class="btn btn-outline-primary btn-sm d-block w-100"
                    @click="editProduct.imagesUrl.push('')"
                  >
                    新增圖片
                  </button>
                </div>
                <div v-else>
                  <button
                    class="btn btn-outline-danger btn-sm d-block w-100"
                    @click="editProduct.imagesUrl.pop()"
                  >
                    刪除圖片
                  </button>
                </div>
              </div>
              <div v-else>
                <button
                  class="btn btn-outline-primary btn-sm d-block w-100"
                  @click="createImages"
                >
                  新增圖片
                </button>
              </div>
            </div>
            <div class="col-sm-8">
              <div class="mb-3">
                <label for="title" class="form-label">標題</label>
                <input
                  id="title"
                  type="text"
                  class="form-control"
                  placeholder="請輸入標題"
                  v-model="editProduct.title"
                />
              </div>

              <div class="row">
                <div class="mb-3 col-md-6">
                  <label for="category" class="form-label">分類</label>
                  <input
                    id="category"
                    type="text"
                    class="form-control"
                    placeholder="請輸入分類"
                    v-model="editProduct.category"
                  />
                </div>
                <div class="mb-3 col-md-6">
                  <label for="price" class="form-label">單位</label>
                  <input
                    id="unit"
                    type="text"
                    class="form-control"
                    placeholder="請輸入單位"
                    v-model="editProduct.unit"
                  />
                </div>
              </div>

              <div class="row">
                <div class="mb-3 col-md-6">
                  <label for="origin_price" class="form-label">原價</label>
                  <input
                    id="origin_price"
                    type="number"
                    min="0"
                    class="form-control"
                    placeholder="請輸入原價"
                    v-model.number="editProduct.origin_price"
                  />
                </div>
                <div class="mb-3 col-md-6">
                  <label for="price" class="form-label">售價</label>
                  <input
                    id="price"
                    type="number"
                    min="0"
                    class="form-control"
                    placeholder="請輸入售價"
                    v-model.number="editProduct.price"
                  />
                </div>
              </div>

              <!-- 新增星級評分選擇 -->
              <div class="mb-3">
                <label class="form-label">⭐ 產品評分</label>
                <div class="star-rating-selector">
                  <div class="d-flex align-items-center">
                    <div class="stars me-3">
                      <i
                        v-for="star in 5"
                        :key="star"
                        :class="star <= (editProduct.star || 0) ? 'fas fa-star text-warning' : 'far fa-star text-muted'"
                        class="star-clickable"
                        @click="setStarRating(star)"
                        @mouseover="hoverStar = star"
                        @mouseleave="hoverStar = 0"
                        :style="{
                          fontSize: '1.5rem',
                          cursor: 'pointer',
                          color: hoverStar >= star ? '#ffc107' : (star <= (editProduct.star || 0) ? '#ffc107' : '#6c757d')
                        }"
                      ></i>
                    </div>
                    <span class="text-muted">
                      {{ editProduct.star || 0 }} / 5 星
                    </span>
                    <button
                      type="button"
                      class="btn btn-outline-secondary btn-sm ms-2"
                      @click="clearStarRating"
                      title="清除評分"
                    >
                      清除
                    </button>
                  </div>
                  <small class="text-muted d-block mt-1">
                    點擊星星設定評分，或點擊「清除」移除評分
                  </small>
                </div>
              </div>

              <hr />

              <div class="mb-3">
                <label for="description" class="form-label">產品描述</label>
                <textarea
                  id="description"
                  type="text"
                  class="form-control"
                  placeholder="請輸入產品描述"
                  v-model="editProduct.description"
                >
                </textarea>
              </div>
              <div class="mb-3">
                <label for="content" class="form-label">說明內容</label>
                <textarea
                  id="content"
                  type="text"
                  class="form-control"
                  placeholder="請輸入說明內容"
                  v-model="editProduct.content"
                >
                </textarea>
              </div>
              <div class="mb-3">
                <div class="form-check">
                  <input
                    id="is_enabled"
                    class="form-check-input"
                    type="checkbox"
                    :true-value="1"
                    :false-value="0"
                    v-model="editProduct.is_enabled"
                  />
                  <label class="form-check-label" for="is_enabled"
                    >是否啟用</label
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
            @click="$emit('update-product', editProduct)"
          >
            確認
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from 'axios';
import { mapActions } from 'pinia';
import useToastMessageStore from '@/stores/toastMessage';

import modalMixin from '@/mixins/modalMixin';

const { VITE_APP_URL, VITE_APP_PATH } = import.meta.env;
export default {
  data() {
    return {
      status: {},
      modal: '',
      editProduct: {},
      isLoading: true,
      hoverStar: 0, // 滑鼠懸停的星星數量
    };
  },
  props: ['tempProduct', 'isNew'],
  emits: ['update', 'update-product'],
  mixins: [modalMixin],
  mounted() {
    this.editProduct = this.tempProduct;
  },
  watch: {
    tempProduct() {
      this.editProduct = this.tempProduct;
      if (!this.editProduct.imagesUrl) {
        this.editProduct.imagesUrl = [];
      }
      if (!this.editProduct.imagesUrl.length) {
        this.editProduct.imagesUrl.push('');
      }
      // 確保 star 欄位存在
      if (typeof this.editProduct.star === 'undefined') {
        this.editProduct.star = 0;
      }
    },
  },
  methods: {
    ...mapActions(useToastMessageStore, ['addMessage']),
    // 設定星級評分
    setStarRating(star) {
      this.editProduct.star = star;
    },
    // 清除星級評分
    clearStarRating() {
      this.editProduct.star = 0;
    },
    upLoadFile() {
      console.log(2);
      const upLoadFile = this.$refs.fileInput.files[0];
      const formData = new FormData();
      formData.append('file-to-upload', upLoadFile);
      const url = `${VITE_APP_URL}/api/${VITE_APP_PATH}/admin/upload`;
      this.status.fileUploading = true;
      axios.post(url, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
        .then((res) => {
          this.status.fileUploading = false;
          this.editProduct.imageUrl = res.data.imageUrl;
          this.$refs.fileInput.value = '';
          this.isLoading = false;
          this.addMessage({
            title: '圖片上傳結果',
            content: res.data.message,
            style: 'success',
          });
        })
        .catch((err) => {
          this.status.fileUploading = false;
          this.addMessage({
            title: '圖片上傳結果',
            content: err.response.data.message,
            style: 'danger',
          });
        });
    },
  },
};
</script>

<style scoped>
.star-rating-selector {
  background-color: #f8f9fa;
  border: 1px solid #dee2e6;
  border-radius: 0.375rem;
  padding: 1rem;
}

.star-clickable {
  transition: all 0.2s ease;
  margin-right: 2px;
}

.star-clickable:hover {
  transform: scale(1.1);
  filter: drop-shadow(0 0 4px rgba(255, 193, 7, 0.6));
}

.stars {
  line-height: 1;
}
</style>
