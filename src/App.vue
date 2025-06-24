<template>
  <RouterView />
  <StagewiseToolbar v-if="isDevelopment" :config="stagewiseConfig" />
</template>

<script setup>
import { ref, computed } from 'vue';
import { StagewiseToolbar } from '@stagewise/toolbar-vue';
import { VuePlugin } from '@stagewise-plugins/vue';

// Stagewise 配置
const stagewiseConfig = ref({
  plugins: [VuePlugin],
});

// 開發環境判斷
const isDevelopment = computed(() => import.meta.env.MODE === 'development');
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
