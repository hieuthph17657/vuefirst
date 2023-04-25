
<template>
      <Dialog
    v-if='category'
    v-bind='DEFAULT_DIALOG_CONFIG'
    v-model:visible='visible'
    :header='headerDialog'
    @hide='emits("hide-dialog.ts")'
  >
    <div class='p-fluid'>
      <!-- <div class='field'>
        <label
          v-required
          for='categoryGroup'>CategoryGroup</label>
        <TreeSelect
          v-model='selectedCategoryGroup'
          :empty-message='"Không được để trống"'
          :filter='true'
          input-id='categoryGroup'
          :options='categoryGroups'
          :placeholder='"categoryGroup"'
          show-clear
        />
        <ValidateErrorMessage :errors='v$.groupId.$errors'/>
      </div> -->

      <div class='formgrid grid'>
        <div class='col field'>
          <label
            v-required
            for='categoryCode'>Code</label>
          <InputText
            id='categoryCode'
            v-model='category.code'
            v-code
            :placeholder='"Code"'
          />
          <ValidateErrorMessage :errors='v$.code.$errors'/>
        </div>

        <div class='col field'>
          <label
            v-required
            for='categoryName'>Tên</label>
          <InputText
            id='categoryName'
            v-model='category.name'
            v-trim
            :placeholder='"Name"'
          />
          <!-- <ValidateErrorMessage :errors='v$.name.$errors'/> -->
        </div>
      </div>
    </div>

    <template #footer>
      <DialogFooter/>
    </template>
  </Dialog>
</template>

<script setup lang="ts">
//theme
import "primevue/resources/themes/lara-light-indigo/theme.css";
import "primevue/resources/primevue.min.css";
import Toast from 'primevue/toast';
import { useToast } from 'primevue/usetoast';
import { useField, useForm } from 'vee-validate';
import AutoComplete from "primevue/autocomplete"
import Button from "primevue/button"
import InputText from 'primevue/inputtext';
import Dialog from 'primevue/dialog';
import { DEFAULT_DIALOG_CONFIG } from '../../constants/index';


import { useVuelidate } from '@vuelidate/core';
import { helpers, required } from '@vuelidate/validators';
import { assign, isEmpty, omit, toLower } from 'lodash';
import { provide, ref } from 'vue';
// import { useI18n } from 'vue-i18n';

import { saveCategoryGraphql } from '../../api/graphql/category-graphql';
import ValidateErrorMessage from "../custom/ValidateErrorMessage.vue";
import DialogFooter from "../dialog/DialogFooter.vue";
// import { DEFAULT_DIALOG_CONFIG } from '@/constants';
// import { toastError, toastErrorData, toastSuccess } from '@/helpers/custom-toast-service';
// import { getStatuses, listToTree } from '@/helpers/utils';
import type { CategoryGroup, CategoryGroupInterface, CategoryInterface } from '../../model/category';

const { handleSubmit, resetForm } = useForm();
// const { value, errorMessage } = useField('value', validateField);
const toast = useToast();
const items = ref([]);



const props = withDefaults(defineProps<CategoryFormProps>(), {
  visibleDialog: false,
  item: undefined,
  //allCategoryGroup: () => []
});

interface CategoryFormProps {
  visibleDialog: boolean,
  item: CategoryInterface,
  //allCategoryGroup: CategoryGroup[]
}

const visible = ref(props.visibleDialog);
const category = ref(props.item);
const isCreate = isEmpty(category.value['id']);
const emits = defineEmits(['hide-dialog.ts', 'reload']);

const validateRules = {
  code: { required: helpers.withMessage("Không được để trống", required) },
  name: { required: helpers.withMessage("Không được để trống", required) },
//   groupId: { required: helpers.withMessage("Không được để trống", required) }
};

const v$ = useVuelidate(validateRules, category);

const categoryGroups = ref([]);
const selectedCategoryGroup = ref();

const headerDialog = isCreate ?
  "Create":"Edit";


// function validateField(value) {
//     if (!value) {
//         return 'Value is required.';
//     }

//     return true;
// }

const onSubmit = handleSubmit((values) => {
    if (values.value && values.value.length > 0) {
        toast.add({ severity: 'info', summary: 'Form Submitted', detail: values.value, life: 3000 });
        resetForm();
    }
});

// const search = (event) => {
//     items.value = [...Array(10).keys()].map((item) => event.query + '-' + item);
// };
</script>
<script lang="ts">
export default { name: 'CategoryForm' };
</script>