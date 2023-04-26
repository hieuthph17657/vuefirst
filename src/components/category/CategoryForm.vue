
<template>
      <Dialog
    v-if='category'
    v-bind='DEFAULT_DIALOG_CONFIG'
    v-model:visible='visible'
    :header='headerDialog'
    @hide='emits("hide-dialog")'
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
            for='categoryName'>Name</label>
          <InputText
            id='categoryName'
            v-model='category.name'
            v-trim
            :placeholder='"Name"'
          />
          <ValidateErrorMessage :errors='v$.name.$errors'/>
        </div>
          <div class='col field'>
          <label
            v-required
            for='description'>Description</label>
          <InputText
            id='description'
            v-model='category.description'
            v-trim
            :placeholder='"Description"'
          />
        </div>
      </div>
    </div>

    <template #footer>
      <DialogFooter/>
    </template>
  </Dialog>
  <Toast />
</template>

<script setup lang="ts">
//theme
import "primevue/resources/themes/lara-light-indigo/theme.css";
import "primevue/resources/primevue.min.css";
import Toast from 'primevue/toast';
import { useToast } from 'primevue/usetoast';
import { useField, useForm } from 'vee-validate';
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
const emits = defineEmits(['hide-dialog', 'reload']);

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

  const {
  mutate: saveCategoryMutate,
  onDone: saveCategoryDone,
  onError: saveCategoryError
} = saveCategoryGraphql();

function saveCategory() {
  assign(category.value, { groupId: selectedCategoryGroup.value ? Object.keys(selectedCategoryGroup.value)[0] : 0 });
  v$.value.$validate().then((isValid) => {
    if (isValid) {
      saveCategoryMutate({
        id: category.value.id,
        categoryInput: omit(category.value, ['id', 'ordinalNumber', '__typename'])
      });
    }
  }).catch((error) => {
    showError()
  });
}
const showSuccess = () => {
    toast.add({ severity: 'success', summary: 'Success Message', detail: 'Message Content', life: 3000 });
};
const showError = () => {
    toast.add({ severity: 'error', summary: 'Error Message', detail: 'Message Content', life: 3000 });
};

const categoryFormFooterButtons = {
  closeButton: {
    icon: 'close',
    label: "Close",
    text: true,
    severity: 'danger',
    type: 'button',
    command: () => emits('hide-dialog')
  },
  actionButton: {
    icon: 'check',
    label: 'Save',
    text: false,
    type: 'button',
    command: () => saveCategory()
  }
};
provide('dialogFooterButtons', categoryFormFooterButtons);

saveCategoryDone(() => {
  showSuccess();
  emits('reload');
  emits('hide-dialog');
});

saveCategoryError((error) => {
  showError();
});

</script>
<script lang="ts">
export default { name: 'CategoryForm' };
</script>