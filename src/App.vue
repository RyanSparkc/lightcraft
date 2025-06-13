<template>
  <RouterView />
  <StagewiseToolbar v-if="isDevelopment" :config="stagewiseConfig" />
</template>

<script>
import { StagewiseToolbar } from '@stagewise/toolbar-vue';
import { VuePlugin } from '@stagewise-plugins/vue';

export default {
  components: {
    StagewiseToolbar,
  },
  data() {
    return {
      stagewiseConfig: {
        plugins: [VuePlugin],
      },
    };
  },
  computed: {
    isDevelopment() {
      return import.meta.env.DEV;
    },
  },
};
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
