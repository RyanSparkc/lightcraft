<template>
  <div
    id="productModal"
    ref="modalRef"
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
            class="btn-close btn-close-white"
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
                    ref="fileInputRef"
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
                  <label for="unit" class="form-label">單位</label>
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

              <!-- 新增產品規格編輯區塊 -->
              <div class="mb-3">
                <label class="form-label">📦 產品規格</label>
                <div
                  class="specifications-editor border rounded p-3"
                  style="background-color: #f8f9fa;"
                >
                  <div class="row">
                    <div class="col-md-6 mb-3">
                      <label for="spec-size" class="form-label">尺寸</label>
                      <input
                        id="spec-size"
                        type="text"
                        class="form-control"
                        placeholder="請輸入產品尺寸（長 x 寬 x 高）"
                        v-model="editProduct.specifications.size"
                      />
                    </div>
                    <div class="col-md-6 mb-3">
                      <label for="spec-weight" class="form-label">重量</label>
                      <input
                        id="spec-weight"
                        type="text"
                        class="form-control"
                        placeholder="請輸入產品重量"
                        v-model="editProduct.specifications.weight"
                      />
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-md-6 mb-3">
                      <label for="spec-material" class="form-label">材質</label>
                      <input
                        id="spec-material"
                        type="text"
                        class="form-control"
                        placeholder="請輸入產品材質"
                        v-model="editProduct.specifications.material"
                      />
                    </div>
                    <div class="col-md-6 mb-3">
                      <label for="spec-color" class="form-label">顏色</label>
                      <input
                        id="spec-color"
                        type="text"
                        class="form-control"
                        placeholder="請輸入可選顏色（多種請用逗號分隔）"
                        v-model="editProduct.specifications.color"
                      />
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-md-6 mb-0">
                      <label for="spec-origin" class="form-label">產地</label>
                      <input
                        id="spec-origin"
                        type="text"
                        class="form-control"
                        placeholder="請輸入產品產地"
                        v-model="editProduct.specifications.origin"
                      />
                    </div>
                  </div>
                  <small class="text-muted d-block mt-2">
                    💡 產品規格將顯示在商品詳細頁面，幫助顧客了解產品特色
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
            @click="emit('update-product', editProduct)"
          >
            確認
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import {
  ref, reactive, watch,
} from 'vue';
import axios from 'axios';
import useToastMessageStore from '@/stores/toastMessage';
import useModal from '@/composables/useModal';

// 環境變數
const {
  VITE_APP_URL,
  VITE_APP_PATH,
} = import.meta.env;

// Props 定義
const props = defineProps({
  tempProduct: {
    type: Object,
    default: () => ({}),
  },
  isNew: {
    type: Boolean,
    default: false,
  },
});

// Emits 定義
const emit = defineEmits(['update', 'update-product']);

// Stores
const toastStore = useToastMessageStore();

// 響應式數據
const { modalRef, openModal, closeModal } = useModal();
const fileInputRef = ref(null);

const status = reactive({
  fileUploading: false,
});

const editProduct = reactive({
  imageUrl: '',
  imagesUrl: [],
  title: '',
  category: '',
  unit: '',
  origin_price: 0,
  price: 0,
  description: '',
  content: '',
  is_enabled: 1,
  specifications: {
    size: '',
    weight: '',
    material: '',
    color: '',
    origin: '',
  },
  star: 0,
});

const isLoading = ref(true);
const hoverStar = ref(0);

// Modal 相關方法 (來自 useModal)

// 產品相關方法
const setStarRating = (star) => {
  editProduct.star = star;
};

const clearStarRating = () => {
  editProduct.star = 0;
};

const createImages = () => {
  editProduct.imagesUrl = [''];
};

const upLoadFile = () => {
  const uploadedFile = fileInputRef.value.files[0];
  const formData = new FormData();
  formData.append('file-to-upload', uploadedFile);
  const url = `${VITE_APP_URL}/api/${VITE_APP_PATH}/admin/upload`;

  status.fileUploading = true;

  axios.post(url, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
    .then((res) => {
      status.fileUploading = false;
      editProduct.imageUrl = res.data.imageUrl;
      fileInputRef.value.value = '';
      isLoading.value = false;
      toastStore.addMessage({
        title: '圖片上傳結果',
        content: res.data.message,
        style: 'success',
      });
    })
    .catch((err) => {
      status.fileUploading = false;
      toastStore.addMessage({
        title: '圖片上傳結果',
        content: err.response.data.message,
        style: 'danger',
      });
    });
};

// 初始化產品數據的函數
const initializeProductData = (product) => {
  // 清空當前數據
  Object.keys(editProduct).forEach((key) => {
    if (key === 'specifications') {
      editProduct.specifications = {
        size: '',
        weight: '',
        material: '',
        color: '',
        origin: '',
      };
    } else if (key === 'imagesUrl') {
      editProduct.imagesUrl = [];
    } else if (key === 'star') {
      editProduct.star = 0;
    } else if (typeof editProduct[key] === 'number') {
      editProduct[key] = 0;
    } else if (typeof editProduct[key] === 'string') {
      editProduct[key] = '';
    } else {
      editProduct[key] = null;
    }
  });

  // 複製新數據
  if (product && typeof product === 'object') {
    Object.keys(product).forEach((key) => {
      if (key === 'specifications') {
        editProduct.specifications = {
          size: product.specifications?.size || '',
          weight: product.specifications?.weight || '',
          material: product.specifications?.material || '',
          color: product.specifications?.color || '',
          origin: product.specifications?.origin || '',
        };
      } else if (key === 'imagesUrl') {
        editProduct.imagesUrl = Array.isArray(product.imagesUrl)
          ? [...product.imagesUrl]
          : [];
      } else {
        editProduct[key] = product[key];
      }
    });
  }

  // 確保必要的欄位存在
  if (!editProduct.specifications) {
    editProduct.specifications = {
      size: '',
      weight: '',
      material: '',
      color: '',
      origin: '',
    };
  }

  if (typeof editProduct.star === 'undefined') {
    editProduct.star = 0;
  }

  if (!Array.isArray(editProduct.imagesUrl)) {
    editProduct.imagesUrl = [];
  }

  if (!editProduct.imagesUrl.length) {
    editProduct.imagesUrl.push('');
  }
};

// 監聽 tempProduct 變化
watch(
  () => props.tempProduct,
  (newProduct) => {
    if (newProduct) {
      initializeProductData(newProduct);
    }
  },
  {
    immediate: true,
    deep: true,
  },
);

// 組件掛載時的初始化 (Modal 部分已移至 useModal)
watch(
  () => props.tempProduct,
  (newProduct) => {
    if (newProduct) {
      initializeProductData(newProduct);
    }
  },
  {
    immediate: true,
    deep: true,
  },
);

// 暴露方法給父組件使用
defineExpose({
  openModal,
  closeModal,
});
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
