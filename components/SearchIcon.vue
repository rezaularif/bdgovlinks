<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="18"
    height="18"
    viewBox="0 0 18 18"
    aria-hidden="true"
    :class="classes"
    v-bind="otherAttrs"
  >
    <title>magnifier</title>
    <g fill="currentColor">
      <path
        d="M7.75 12.75C10.5114 12.75 12.75 10.5114 12.75 7.75C12.75 4.98858 10.5114 2.75 7.75 2.75C4.98858 2.75 2.75 4.98858 2.75 7.75C2.75 10.5114 4.98858 12.75 7.75 12.75Z"
        fill-opacity="0.3"
        stroke="none"
      />
      <path
        d="M15.25 15.25L11.285 11.285"
        stroke="currentColor"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
        fill="none"
      />
      <path
        d="M7.75 12.75C10.5114 12.75 12.75 10.5114 12.75 7.75C12.75 4.98858 10.5114 2.75 7.75 2.75C4.98858 2.75 2.75 4.98858 2.75 7.75C2.75 10.5114 4.98858 12.75 7.75 12.75Z"
        stroke="currentColor"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
        fill="none"
      />
    </g>
  </svg>
</template>

<script setup lang="ts">
import { computed, useAttrs } from 'vue';

defineOptions({
  inheritAttrs: false,
});

const attrs = useAttrs();

const classes = computed(() => {
  const list = [];
  if (typeof attrs.class === 'string') {
    list.push(attrs.class);
  }
  return list;
});

const otherAttrs = computed(() => {
  const { class: _class, ...rest } = attrs;
  return rest;
});
</script>
