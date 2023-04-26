<template>
    <a class='p-menuitem-link'>
      <AppIcon
        class='p-menuitem-icon'
        :name='icon'
        size='1.5'/>
      <span class='p-menuitem-text'>{{ label }}</span>
    </a>
  </template>
  
  <script setup>
  defineProps({
    icon: {
      type: [String, undefined],
      required: true
    },
    label: {
      type: [String, Function],
      required: true
    }
  });
  </script>
  
  <script>
  export default { name: 'MenuItem' };
  </script>
  
  <style scoped>
  
  </style>