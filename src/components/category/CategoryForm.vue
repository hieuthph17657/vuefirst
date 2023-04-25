
<template>
    <div class="card flex justify-content-center">
        <form v-on:submit="onSubmit" class="flex flex-column gap-2">
            <label for="ac">Value</label>
            <AutoComplete v-model="value" :inputClass="{ 'p-invalid': errorMessage }" inputId="ac" :suggestions="items"
                          v-on:complete="search"
                          aria-describedby="ac-error" />
            <small class="p-error" id="ac-error">{{ errorMessage || '&nbsp;' }}</small>
            <Button type="submit" label="Submit" />
        </form>
        <Toast />
    </div>
</template>

<script setup>
//theme
import "primevue/resources/themes/lara-light-indigo/theme.css";
import "primevue/resources/primevue.min.css";
import { ref } from 'vue';
import Toast from 'primevue/toast';
import { useToast } from 'primevue/usetoast';
import { useField, useForm } from 'vee-validate';
import AutoComplete from "primevue/autocomplete"
import Button from "primevue/button"

const { handleSubmit, resetForm } = useForm();
const { value, errorMessage } = useField('value', validateField);
const toast = useToast();
const items = ref([]);

function validateField(value) {
    if (!value) {
        return 'Value is required.';
    }

    return true;
}

const onSubmit = handleSubmit((values) => {
    if (values.value && values.value.length > 0) {
        toast.add({ severity: 'info', summary: 'Form Submitted', detail: values.value, life: 3000 });
        resetForm();
    }
});

const search = (event) => {
    items.value = [...Array(10).keys()].map((item) => event.query + '-' + item);
};
</script>