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
                  placeholder="請輸入作者名稱"
                />
              </div>
              <div class="mb-3">
                <label for="create_at">文章建立日期</label>
                <input
                  type="date"
                  class="form-control"
                  id="create_at"
                  v-model="createAt"
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
                      @click="removeTag(key)"
                    >
                      <i class="bi bi-x"></i>
                    </button>
                  </div>
                </div>
                <div
                  class="col-md-2 mb-1"
                  v-if="tempArticle.tag[tagLength - 1] || !tagLength"
                >
                  <button
                    class="btn btn-outline-primary btn-sm d-block w-100"
                    type="button"
                    @click="addTag"
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
            @click="emit('update-article', tempArticle)"
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
  ref, computed, watch, onMounted,
} from 'vue';
import { Modal } from 'bootstrap';
import axios from 'axios';
import useToastMessageStore from '@/stores/toastMessage';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

const { VITE_APP_URL, VITE_APP_PATH } = import.meta.env;

// Props 定義
const props = defineProps({
  article: {
    type: Object,
    default: () => ({}),
  },
  isNew: {
    type: Boolean,
    default: false,
  },
});

// Emits 定義
const emit = defineEmits(['update-article']);

// 響應式數據
const modal = ref(null);
const modalInstance = ref(null);
const fileInput = ref(null);
const tempArticle = ref({
  tag: [''],
});
const createAt = ref('');

// CKEditor 設置
const editor = ClassicEditor;
const editorConfig = {
  toolbar: ['heading', '|', 'bold', 'italic', 'link'],
};

// Store
const toastStore = useToastMessageStore();
const { addMessage } = toastStore;

// 計算屬性
const tagLength = computed(() => tempArticle.value?.tag?.length || 0);

// 標籤管理方法 (加強版)
const addTag = () => {
  if (!tempArticle.value.tag) {
    tempArticle.value.tag = [];
  }
  tempArticle.value.tag.push('');
};

const removeTag = (index) => {
  if (tempArticle.value.tag && index >= 0 && index < tempArticle.value.tag.length) {
    tempArticle.value.tag.splice(index, 1);

    // 確保至少有一個標籤輸入框
    if (tempArticle.value.tag.length === 0) {
      tempArticle.value.tag.push('');
    }
  }
};

// 檔案上傳方法 (優化版)
const upLoadFile = async () => {
  try {
    const uploadedFile = fileInput.value?.files[0];
    if (!uploadedFile) {
      addMessage({
        title: '檔案上傳失敗',
        content: '請選擇要上傳的檔案',
        style: 'warning',
      });
      return;
    }

    // 檔案類型驗證
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
    if (!allowedTypes.includes(uploadedFile.type)) {
      addMessage({
        title: '檔案類型錯誤',
        content: '請上傳 JPG、PNG、GIF 或 WebP 格式的圖片',
        style: 'danger',
      });
      return;
    }

    // 檔案大小驗證 (5MB)
    const maxSize = 5 * 1024 * 1024;
    if (uploadedFile.size > maxSize) {
      addMessage({
        title: '檔案過大',
        content: '圖片大小不能超過 5MB',
        style: 'danger',
      });
      return;
    }

    const formData = new FormData();
    formData.append('file-to-upload', uploadedFile);
    const url = `${VITE_APP_URL}/api/${VITE_APP_PATH}/admin/upload`;

    const response = await axios.post(url, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    tempArticle.value.image = response.data.imageUrl;
    fileInput.value.value = '';

    addMessage({
      title: '圖片上傳成功',
      content: response.data.message,
      style: 'success',
    });
  } catch (error) {
    addMessage({
      title: '圖片上傳失敗',
      content: error.response?.data?.message || '上傳過程中發生錯誤',
      style: 'danger',
    });
  }
};

// Modal 控制方法 (從 modalMixin 拆解而來)
const openModal = () => {
  modalInstance.value?.show();
};

const closeModal = () => {
  modalInstance.value?.hide();
};

// Watch 邏輯 (優化版)
watch(() => props.article, (newArticle) => {
  if (newArticle && Object.keys(newArticle).length > 0) {
    // 深拷貝防止直接修改 props
    tempArticle.value = {
      ...newArticle,
      tag: Array.isArray(newArticle.tag) && newArticle.tag.length > 0
        ? [...newArticle.tag]
        : [''],
      create_at: newArticle.create_at || Math.floor(Date.now() / 1000),
    };

    // 安全的日期轉換
    if (newArticle.create_at) {
      try {
        const date = new Date(newArticle.create_at * 1000);
        if (!Number.isNaN(date.getTime())) {
          const [dateString] = date.toISOString().split('T');
          createAt.value = dateString;
        } else {
          // 如果日期無效，使用當前日期
          const [currentDateString] = new Date().toISOString().split('T');
          createAt.value = currentDateString;
        }
      } catch (error) {
        console.warn('日期轉換錯誤:', error);
        const [currentDateString] = new Date().toISOString().split('T');
        createAt.value = currentDateString;
      }
    } else {
      // 如果沒有建立時間，使用當前日期
      const [currentDateString] = new Date().toISOString().split('T');
      createAt.value = currentDateString;
    }
  } else {
    // 重置為預設值
    tempArticle.value = {
      title: '',
      author: '',
      description: '',
      content: '',
      image: '',
      imageUrl: '',
      tag: [''],
      isPublic: false,
      create_at: Math.floor(Date.now() / 1000),
    };
    const [currentDateString] = new Date().toISOString().split('T');
    createAt.value = currentDateString;
  }
}, { immediate: true, deep: true });

// 日期雙向綁定 (優化版，防止無限循環)
let isUpdatingDate = false;
watch(createAt, (newDate) => {
  if (!isUpdatingDate && newDate) {
    try {
      const timestamp = new Date(newDate).getTime() / 1000;
      if (!Number.isNaN(timestamp)) {
        tempArticle.value.create_at = timestamp;
      }
    } catch (error) {
      console.warn('日期解析錯誤:', error);
    }
  }
});

// 監聽 create_at 變化，更新日期輸入框
watch(() => tempArticle.value.create_at, (newTimestamp) => {
  if (!isUpdatingDate && newTimestamp) {
    isUpdatingDate = true;
    try {
      const date = new Date(newTimestamp * 1000);
      if (!Number.isNaN(date.getTime())) {
        const [dateString] = date.toISOString().split('T');
        createAt.value = dateString;
      }
    } catch (error) {
      console.warn('時間戳轉換錯誤:', error);
    }
    // 下一個 tick 解除鎖定
    setTimeout(() => {
      isUpdatingDate = false;
    }, 0);
  }
});

// 生命週期
onMounted(() => {
  if (modal.value) {
    modalInstance.value = new Modal(modal.value, {
      backdrop: 'static',
      keyboard: false,
    });
  }
});

// 暴露方法供父組件調用
defineExpose({
  openModal,
  closeModal,
});
</script>

<style>
.ck-editor__editable_inline {
  min-height: 350px;
}
</style>
