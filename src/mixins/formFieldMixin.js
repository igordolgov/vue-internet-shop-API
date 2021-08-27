// Миксины позволяют инкапсулировать одну функциональность,
// чтобы можно было использовать её в разных компонентах.
import BaseFormField from '@/components/BaseFormField.vue';

export default {
  props: ['title', 'error', 'placeholder', 'value'],
  components: {
    BaseFormField,
  },
  computed: {
    dataValue: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit('input', value);
      },
    },
  },
};
