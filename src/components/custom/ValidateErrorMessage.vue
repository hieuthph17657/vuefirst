<template>
    <div
      v-for='error of errors'
      :key='error.$uid'
      class='input-errors'>
      <small class='p-error'>{{ error.$message }}</small>
    </div>
  </template>
  
  <script setup lang="ts">
  
  import type { ErrorObject } from '@vuelidate/core';
  
  defineProps<{ errors: ErrorObject[] }>();
  
  </script>
  
  <script lang="ts">
  export default { name: 'ValidateErrorMessage' };
  </script>
  
  <style scoped>
  
  </style>