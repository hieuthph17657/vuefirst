<template>
    <Button
      v-bind='$attrs'
      :class='{"p-0": isEmpty($attrs.label) && ($attrs.text || $attrs.text === "")}'>
      <AppIcon
        v-if='$props.icon'
        :class='$attrs.class + ($attrs.label? " p-button-icon-left": "")'
        :name='$props.icon'
        :size='$props.iconSize'/>
      <span
        v-if='!isEmpty($attrs.label)'
        class='p-button-label'>{{ $attrs.label }}</span>
    </Button>
  </template>
  
  <script>
  
  import { isEmpty } from 'lodash';
  
  export default {
    name: 'ButtonIcon',
  
    props: {
      icon: {
        type: String,
        default: '',
        required: true
      },
  
      iconSize: {
        type: String,
        default: '2',
      }
    },
  
    methods: { isEmpty },
  };
  </script>