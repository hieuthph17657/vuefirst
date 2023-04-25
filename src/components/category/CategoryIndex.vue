
<template>
    <div class="card">
        <DataTable :value="categories" paginator :rows="5" :rowsPerPageOptions="[5, 10, 20, 50]" tableStyle="min-width: 50rem">
            <Column field="name" header="Name" style="width: 25%"></Column>
            <Column field="code" header="Code" style="width: 25%"></Column>
            <Column field="description" header="Description" style="width: 25%"></Column>
            <Column field="status" header="Status" style="width: 25%"></Column>
        </DataTable>
    </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import ColumnGroup from 'primevue/columngroup';   // optional
import Row from 'primevue/row';                   // optional
import type {CategoryEdge,  CategoryInterface} from '../../model/category';

// import { CategoryService } from '@/service/CategoryService';
import { getCategoryGraphql } from '../../api/graphql/category-graphql';
import { assign, cloneDeep, find, get, toLower } from 'lodash';

const searchKeyword = ref('');
const totalRecords = ref(0);
const getCategoryLoading = ref(true);
const categories = ref([]);
const pageable = reactive({
  page: 0,
  size: 10,
  sort: [
    {
      property: 'server',
      direction: 'ASC'
    }
  ]
});
const searchParams = reactive({
  keyword: '',
  pageable: pageable
});
const {
  onResult: getCategoryResult,
  onError: getCategoryError,
  //refetch: getCategoryRefetch
} = getCategoryGraphql(searchParams);
console.log("searchParams",searchParams);

getCategoryResult((result) => {
  const { totalCount, edges } = get(result, 'data.categories', { totalCount: 0, edges: [] });
  console.log("totalCount",totalCount)
  totalRecords.value = totalCount;
  categories.value = edges.map((edge: CategoryEdge, index: number) => ({
    ...edge.node,
    ordinalNumber: pageable.page * pageable.size + index + 1
  }));
  getCategoryLoading.value = false;
});

getCategoryError((error) => {
  getCategoryLoading.value = false;
  //toastErrorData({ prefix: 'category.errors', error });
});


// onMounted(() => {
//     CategoryService.getCategorysMedium().then((data) => (category.value = data));
// });

const category = ref();

</script>