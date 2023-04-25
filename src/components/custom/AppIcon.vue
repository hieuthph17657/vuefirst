<!--
  Usage:
  <AppIcon name='cloud' size='2' color='red' />
  <AppIcon name='cloud' size='22' color='var(--primary-color)' />
  <AppIcon name='cloud' size='2' color='var(--green-400)' />

  props size unit default: rem

  list icons url: https://fonts.google.com/icons
-->

<template>
    <span class='custom-icon material-symbols-outlined'>{{ name }}</span>
  </template>
  
  <script setup>
  import { toNumber, trimEnd } from 'lodash';
  import { computed } from 'vue';
  
  const props = defineProps({
    name: {
      type: String,
      default: '',
      required: true
    },
    size: {
      type: String,
      default: '2'
    },
    color: {
      type: String,
      default: ''
    }
  });
  
  const fontSize = computed(() => {
    return !props.size.endsWith('rem') && toNumber(trimEnd(props.size, 'rem')) > 0 ? `${props.size}rem` : props.size;
  });
  
  </script>
  
  <script>
  export default { name: 'AppIcon' };
  </script>
  
  <style>
  .custom-icon {
    color: v-bind(color);
    font-weight: inherit;
    font-size: v-bind(fontSize);
  }
  </style>
  
  