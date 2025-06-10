<template>
  <nav
    v-if="pagination.total_pages > 1"
    :aria-label="ariaLabel"
    class="pagination-wrapper"
  >
    <ul class="pagination justify-content-center mb-0">
      <li
        class="page-item"
        :class="{ disabled: !pagination.has_pre }"
      >
        <button
          class="page-link custom-page-link"
          @click="changePage(pagination.current_page - 1)"
          :disabled="!pagination.has_pre"
        >
          <i class="bi bi-chevron-left"></i>
          上一頁
        </button>
      </li>
      <li
        v-for="page in displayPages"
        :key="page"
        class="page-item"
        :class="{ active: page === pagination.current_page }"
      >
        <button
          class="page-link custom-page-link"
          :class="{ 'active-page': page === pagination.current_page }"
          @click="changePage(page)"
        >
          {{ page }}
        </button>
      </li>
      <li
        class="page-item"
        :class="{ disabled: !pagination.has_next }"
      >
        <button
          class="page-link custom-page-link"
          @click="changePage(pagination.current_page + 1)"
          :disabled="!pagination.has_next"
        >
          下一頁
          <i class="bi bi-chevron-right"></i>
        </button>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  name: 'PaginationComponent',
  emits: ['change-page'],
  props: {
    pagination: {
      type: Object,
      required: true,
      default: () => ({
        total_pages: 1,
        current_page: 1,
        has_pre: false,
        has_next: false,
      }),
    },
    ariaLabel: {
      type: String,
      default: '分頁導航',
    },
  },
  computed: {
    displayPages() {
      const pages = [];
      const totalPages = this.pagination.total_pages;
      const currentPage = this.pagination.current_page;

      for (let i = 1; i <= totalPages; i += 1) {
        if (
          i === 1
          || i === totalPages
          || (i >= currentPage - 2 && i <= currentPage + 2)
        ) {
          pages.push(i);
        }
      }
      return pages;
    },
  },
  methods: {
    changePage(page) {
      if (page >= 1 && page <= this.pagination.total_pages) {
        this.$emit('change-page', page);
      }
    },
  },
};
</script>

<style scoped>
/* 分頁樣式改善 */
.pagination-wrapper {
  margin-top: 3rem;
  margin-bottom: 4rem;
}

.pagination {
  gap: 0.25rem;
}

.custom-page-link {
  border: 2px solid #e9ecef;
  color: #6c757d;
  background-color: #fff;
  padding: 0.75rem 1rem;
  margin: 0 0.125rem;
  border-radius: 0.5rem;
  font-weight: 600;
  transition: all 0.2s ease;
  text-decoration: none;
  min-width: 50px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
}

.custom-page-link:hover:not(:disabled) {
  border-color: #ffc107;
  color: #ffc107;
  background-color: rgba(255, 193, 7, 0.1);
}

.custom-page-link.active-page,
.page-item.active .custom-page-link {
  background: #ffc107;
  border-color: transparent;
  color: #333;
}

.custom-page-link:disabled {
  color: #adb5bd;
  background-color: #f8f9fa;
  border-color: #e9ecef;
  cursor: not-allowed;
}

/* 響應式設計 */
@media (max-width: 768px) {
  .pagination-wrapper {
    margin-bottom: 3rem;
  }
}

@media (max-width: 576px) {
  .custom-page-link {
    padding: 0.5rem 0.75rem;
    font-size: 0.875rem;
    min-width: 40px;
  }
}
</style>
