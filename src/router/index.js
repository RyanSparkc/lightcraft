import { createRouter, createWebHashHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    component: () => import('@/views/front/FrontView.vue'),
    children: [
      {
        path: '',
        component: () => import('@/views/front/HomeView.vue'),
      },
      {
        path: 'about',
        component: () => import('@/views/front/AboutView.vue'),
      },
      {
        path: 'products',
        component: () => import('@/views/front/ProductsView.vue'),
      },
      {
        path: 'product/:id',
        component: () => import('@/views/front/ProductView.vue'),
      },
      {
        path: 'cart',
        component: () => import('@/views/front/CartView.vue'),
      },
      {
        path: 'checkout',
        component: () => import('@/views/front/CheckoutLayout.vue'),
        children: [
          { path: '', redirect: 'address' },
          {
            path: 'address',
            component: () => import('@/views/front/CheckoutAddress.vue'),
          },
          {
            path: 'payment',
            component: () => import('@/views/front/CheckoutPayment.vue'),
          },
          {
            path: 'complete/:orderId?',
            component: () => import('@/views/front/CheckoutComplete.vue'),
          },
        ],
      },
      {
        path: 'order/:id',
        component: () => import('@/views/front/OrderDetailView.vue'),
      },
      {
        path: 'orders',
        component: () => import('@/views/front/OrdersListView.vue'),
      },
      {
        path: 'articles',
        component: () => import('@/views/front/ArticlesView.vue'),
      },
      {
        path: 'article/:id',
        component: () => import('@/views/front/ArticleView.vue'),
      },
    ],
  },
  {
    path: '/login',
    component: () => import('@/views/LoginView.vue'),
  },
  {
    path: '/admin',
    component: () => import('@/views/dashboard/DashboardView.vue'),
    children: [
      {
        path: 'order',
        component: () => import('@/views/dashboard/OrderView.vue'),
      },
      {
        path: 'products',
        component: () => import('@/views/dashboard/ProductsView.vue'),
      },
      {
        path: 'articles',
        component: () => import('@/views/dashboard/ArticleListView.vue'),
      },
      {
        path: 'coupon',
        component: () => import('@/views/dashboard/CouponView.vue'),
      },
    ],
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('@/views/front/NotFoundView.vue'),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  linkActiveClass: 'active',
  routes,
});

export default router;
