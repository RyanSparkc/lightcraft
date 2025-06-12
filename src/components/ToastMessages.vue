<template>
  <div
    aria-live="polite"
    aria-atomic="true"
    class="position-fixed top-0 end-0 p-3"
    style="z-index: 1055;"
  >
    <!-- Then put toasts within -->
    <transition-group name="move" tag="div" class="toast-wrapper" mode="out-in">
      <div
        v-for="(msg, key) in messages"
        :key="`toast-${key}`"
        class="toast show toast-message"
        role="alert"
        aria-live="assertive"
        aria-atomic="true"
      >
        <!-- Toast內容 -->
        <div class="toast-header">
          <span
            :class="`bg-${msg.style}`"
            class="d-inline-block p-2 rounded-circle me-2"
          ></span>
          <strong class="me-auto">{{msg.title}}</strong>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="toast"
            aria-label="Close"
            @click="removeMessage(key)"
          ></button>
        </div>
        <div class="toast-body" v-if="msg.content">
          {{msg.content}}
        </div>
      </div>
    </transition-group>
  </div>
</template>

<script>
import { mapState, mapActions } from 'pinia';
import useToastMessageStore from '@/stores/toastMessage';

export default {
  computed: {
    ...mapState(useToastMessageStore, ['messages']),
  },
  methods: {
    ...mapActions(useToastMessageStore, ['removeMessage']),
  },
};
</script>

<style>
/* 淡入和移動效果 */
.move-enter-active,
.move-leave-active {
  transition: opacity 0.5s ease, transform 0.5s ease;
}

.move-enter-from {
  opacity: 0;
  transform: translateY(50%);
}

.move-leave-to {
  opacity: 0;
  transform: translateY(0%);
}
</style>
