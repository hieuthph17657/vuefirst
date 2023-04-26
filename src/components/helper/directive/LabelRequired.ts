import type { DirectiveBinding } from 'vue';

export default {
  mounted(el: HTMLElement, binding: DirectiveBinding) {
    const value = binding.value;

    if (value || typeof value === 'undefined') {
      const span = document.createElement('span');
      span.className = 'required-mark';
      const asterisk = document.createTextNode('*');
      span.appendChild(asterisk);
      el.appendChild(span);
    }

  },
};
  