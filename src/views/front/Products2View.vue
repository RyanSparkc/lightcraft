<template>
  <div class="container mt-md-5 mt-3 mb-7">
    <div class="row">
      <div class="col-md-4">
        <div class="accordion border border-bottom border-top-0 border-start-0
         border-end-0 mb-3" id="accordionExample">
          <div class="card border-0">
            <div class="card-header px-0 py-4 bg-white border border-bottom-0
             border-top border-start-0
               border-end-0 rounded-0" id="headingOne"
               data-bs-toggle="collapse" data-bs-target="#collapseOne">
              <div class="d-flex justify-content-between align-items-center pe-1">
                <h4 class="mb-0">
                  Lorem ipsum
                </h4>
                <i class="fas fa-chevron-down"></i>
              </div>
            </div>
            <div id="collapseOne" class="collapse show"
            aria-labelledby="headingOne" data-bs-parent="#accordionExample">
              <div class="card-body py-0">
                <ul class="list-unstyled">
                  <li>
                    <RouterLink class="py-2 d-block text-muted"
                    to="/products">全部</RouterLink>
                  </li>
                  <li v-for="item in categories" :key="item">
                    <RouterLink class="py-2 d-block text-muted"
                    :to="`/products?category=${item}`">{{item}}</RouterLink>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div class="card border-0">
            <div class="card-header px-0 py-4 bg-white border border-bottom-0 border-top
               border-start-0 border-end-0 rounded-0" id="headingTwo" data-bs-toggle="collapse"
              data-bs-target="#collapseTwo">
              <div class="d-flex justify-content-between align-items-center pe-1">
                <h4 class="mb-0">
                  Lorem ipsum
                </h4>
                <i class="fas fa-chevron-down"></i>
              </div>
            </div>
            <div id="collapseTwo" class="collapse"
            aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
              <div class="card-body py-0">
                <ul class="list-unstyled">
                  <li><a href="#" class="py-2 d-block text-muted">Lorem ipsum</a></li>
                  <li><a href="#" class="py-2 d-block text-muted">Lorem ipsum</a></li>
                  <li><a href="#" class="py-2 d-block text-muted">Lorem ipsum</a></li>
                  <li><a href="#" class="py-2 d-block text-muted">Lorem ipsum</a></li>
                  <li><a href="#" class="py-2 d-block text-muted">Lorem ipsum</a></li>
                </ul>
              </div>
            </div>
          </div>
          <div class="card border-0">
            <div class="card-header px-0 py-4 bg-white border border-bottom-0
               border-top border-start-0 border-end-0
                rounded-0" id="headingThree"
                 data-bs-toggle="collapse" data-bs-target="#collapseThree">
              <div class="d-flex justify-content-between align-items-center pe-1">
                <h4 class="mb-0">
                  Lorem ipsum
                </h4>
                <i class="fas fa-chevron-down"></i>
              </div>
            </div>
            <div id="collapseThree" class="collapse"
             aria-labelledby="headingThree" data-bs-parent="#accordionExample">
              <div class="card-body py-0">
                <ul class="list-unstyled">
                  <li><a href="#" class="py-2 d-block text-muted">Lorem ipsum</a></li>
                  <li><a href="#" class="py-2 d-block text-muted">Lorem ipsum</a></li>
                  <li><a href="#" class="py-2 d-block text-muted">Lorem ipsum</a></li>
                  <li><a href="#" class="py-2 d-block text-muted">Lorem ipsum</a></li>
                  <li><a href="#" class="py-2 d-block text-muted">Lorem ipsum</a></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-8">
        <div class="row">
          <div class="col-md-6" v-for="product in products" :key="product.id">
            <div class="card border-0 mb-4 position-relative position-relative">
              <img :src="product.imageUrl" class="card-img-top
               rounded-0 object-fit-cover" height="225" alt="...">
              <a href="#" class="text-dark">
                <i class="far fa-heart position-absolute" style="right: 16px; top: 16px"></i>
              </a>
              <div class="card-body p-0">
                <h4 class="mb-0 mt-3">
                  <RouterLink :to="`/product/${product.id}`">{{product.title}}</RouterLink>
                </h4>
                <p class="card-text mb-0">NT${{ product.price }} <span class="text-muted ">
                    <del>NT${{ product.origin_price }}</del></span></p>
                <p class="text-muted mt-3"></p>
              </div>
            </div>
          </div>
        </div>
        <nav class="d-flex justify-content-center">
          <ul class="pagination">
            <li class="page-item">
              <a class="page-link" href="#" aria-label="Previous">
                <span aria-hidden="true">&laquo;</span>
              </a>
            </li>
            <li class="page-item active"><a class="page-link" href="#">1</a></li>
            <li class="page-item"><a class="page-link" href="#">2</a></li>
            <li class="page-item"><a class="page-link" href="#">3</a></li>
            <li class="page-item">
              <a class="page-link" href="#" aria-label="Next">
                <span aria-hidden="true">&raquo;</span>
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
    <UserModal ref="userModal" :product="product" @add-to-cart="addToCart"></UserModal>
  </div>
</template>
<script>
import axios from 'axios';
import UserModal from '@/components/UserModal.vue';

const { VITE_APP_URL, VITE_APP_PATH } = import.meta.env;
export default {
  data() {
    return {
      loadingStatus: {
        loadingItem: '',
      },
      // 產品資料格式
      products: [],
      product: {},
      categories: ['衣服2', '衣服', '嬰兒連身衣', 'c', 'C', '測試分類', '測試分類2', '測試分類10'],
      cart: {},
      isLoading: true,
    };
  },
  watch: {
    // '$route.query': {
    //   handler() {
    //     this.getProducts();
    //   },
    //   deep: true,
    // },
    '$route.query': function () {
      this.getProducts();
    },
  },
  methods: {
    getProducts() {
      // console.log(this.$route);
      const { category = '' } = this.$route.query;
      axios
        .get(`${VITE_APP_URL}/api/${VITE_APP_PATH}/products?category=${category}`)
        .then((res) => {
          this.products = res.data.products;
          // console.log(res);
          this.isLoading = false;
        })
        .catch((err) => {
          alert(err.res.data.message);
        });
    },
    // 取得單一產品
    getProduct(id) {
      this.loadingStatus.loadingItem = id;
      axios
        .get(`${VITE_APP_URL}/api/${VITE_APP_PATH}/product/${id}`)
        .then((res) => {
          this.loadingStatus.loadingItem = '';
          this.product = res.data.product;

          this.$refs.userModal.openModal();
        })
        .catch((err) => {
          alert(err.res.data.message);
        });
    },
    // 加入購物車
    addToCart(productId, qty = 1) {
      this.loadingStatus.loadingItem = productId;
      const cart = {
        product_id: productId,
        qty,
      };
      // console.log(cart);
      this.$refs.userModal.hideModal();
      axios
        .post(`${VITE_APP_URL}/api/${VITE_APP_PATH}/cart`, { data: cart })
        .then((res) => {
          alert(res.data.message);
          this.loadingStatus.loadingItem = '';
          this.getCart();
        })
        .catch((err) => {
          alert(err.res.data.message);
        });
    },
    // 變更購物車數量
    changeCart(data, qty) {
      this.loadingStatus.loadingItem = data.id;
      const cart = {
        product_id: data.product_id,
        qty,
      };
      console.log(cart);
      axios
        .put(`${VITE_APP_URL}/api/${VITE_APP_PATH}/cart/${data.id}`, { data: cart })
        .then((res) => {
          alert(res.data.message);
          this.loadingStatus.loadingItem = '';
          this.getCart();
        })
        .catch((err) => {
          alert(err.res.data.message);
          this.loadingStatus.loadingItem = '';
        });
    },
  },
  mounted() {
    this.getProducts();
  },
  components: {
    UserModal,
  },
};
</script>
<style scoped>
img {
  object-fit: contain;
  max-width: 100%;
}

.primary-image {
  height: 300px;
}

.images {
  height: 150px;
}
</style>
