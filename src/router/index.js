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
        component: () => import('@/views/front/Products2View.vue'),
      },
      {
        path: 'product/:id',
        component: () => import('@/views/front/ProductView.vue'),
      },
      {
        path: 'cart',
        component: () => import('@/views/front/CartView.vue'),
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
      {
        path: 'cart-list',
        component: () => import('@/views/dashboard/CartListView.vue'),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  linkActiveClass: 'active',
  routes,
});

export default router;
