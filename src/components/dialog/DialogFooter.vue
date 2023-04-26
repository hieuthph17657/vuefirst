<template>
    <div class='flex flex-row justify-content-center py-1'>
      <ButtonIcon
        v-if='closeButton'
        v-bind='closeButton'
        @click='closeButton.command'/>
  
      <template v-if='otherButtons && otherButtons.length'>
        <ButtonIcon
          v-for='(button, index) in otherButtons'
          :key='index'
          v-bind='button'
          @click='button.command'/>
      </template>
  
      <ButtonIcon
        v-if='actionButton'
        v-bind='actionButton'
        @click='actionButton.command'/>
    </div>
  </template>
  
  <script setup lang="ts">
  import { inject } from 'vue';
  
  const {
    closeButton,
    otherButtons,
    actionButton
  } = inject('dialogFooterButtons', {
    closeButton: { command: Function, icon: 'delete', iconSize: "1"},
    otherButtons: [{ command: Function, icon: '' }],
    actionButton: { command: Function, icon: 'add' ,iconSize: "1"}
  });
  </script>
  
  <script lang="ts">
  export default { name: 'DialogFooter' };
  </script>