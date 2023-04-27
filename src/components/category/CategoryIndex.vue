
<template>
  <div class='actions mr-3'>
    <Button icon="pi pi-plus" text raised rounded aria-label="Filter" @click='showCategoryFormDialog' />
  </div>
  <div class='align-items-center flex flex-wrap justify-content-between'>
    <span class='font-bold ml-2 text-primary text-white text-xl'></span>

    <span class='block p-input-icon-left'>
      <i class='pi pi-search' />
      <InputText v-model='searchKeyword' :placeholder='"search"' v-on:change="searchDatatable"
        @keyup.enter='searchDatatable' />
    </span>
  </div>
  <div class="card">
    <div>
      <Toast />
      <Tree :value="categoryGroups" selectionMode="checkbox" class="w-full md:w-30rem"></Tree>
    </div>
    <DataTable v-bind='DEFAULT_DATATABLE_CONFIG' lazy :loading='getCategoryLoading' :total-records='totalRecords'
      :value="categories" @page='onPage($event)' @sort='onSort($event)' tableStyle="min-width: 50rem">
      <Column field='ordinalNumber' header='#'>
      </Column>
      <Column field="name" header="Name" style="width: 25%" :sortable='true'></Column>
      <Column field="code" header="Code" style="width: 25%" :sortable='true'></Column>
      <Column field="description" header="Description" style="width: 25%" :sortable='true'></Column>
      <Column field="status" header="Status" style="width: 25%" :sortable='true'></Column>
      <Column header="Action" style="width: 25%">
        <template #body='{ data }'>
          <ButtonIcon v-tooltip.top='"Thao tác"' class='text-color' icon='list' rounded text
            @click='toggleActionMenu({ event: $event, data: data })' />
        </template>
      </Column>
    </DataTable>
    <Menu ref='menuAction' :model='menuActions' :popup='true'>
      <template #item='{ item: { icon, label } }'>
        <MenuItem :icon='icon' :label='label' />
      </template>
    </Menu>
  </div>
  <CategoryForm v-if='categoryFormVisible' :item='category' :all-category-group='parentCategoryGroups'
    :visible-dialog='categoryFormVisible' @hide-dialog='hideCategoryFormDialog' @reload='reload' />
  <Toast />
  <ConfirmDialog></ConfirmDialog>
</template>

<script setup lang="ts">
import "primevue/resources/themes/lara-light-indigo/theme.css";
import "primevue/resources/primevue.min.css";
import { reactive, ref } from 'vue';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import type { CategoryEdge, CategoryInterface } from '../../model/category';
import { Category, CategoryGroup, CategoryGroupInterface } from '../../model/category';
import MenuItem from "../custom/MenuItem.vue";
import { deleteCategoryGraphql, getCategoryGraphql } from '../../api/graphql/category-graphql';
import { getAllCategoryGroupGraphql } from "../../api/graphql/category-group-graphql";
import { assign, cloneDeep, find, get, toLower } from 'lodash';
import Button from 'primevue/button';
import CategoryForm from "./CategoryForm.vue";
import { useConfirm } from 'primevue/useconfirm';
import { DEFAULT_DATATABLE_CONFIG, DEFAULT_PAGE_SIZE } from '../../constants/index' //used
import InputText from 'primevue/inputtext';
import { useToast } from "primevue/usetoast";
import { listToTree } from '../helper/utils';

const categoryGroups = ref([]);
const parentCategoryGroups = ref<CategoryGroup[]>([]);
const { onResult: getAllCategoryGroupResult } = getAllCategoryGroupGraphql();
var parentCategoryGroupsView: CategoryGroup[] = [];

getAllCategoryGroupResult((response) => {
  parentCategoryGroups.value = get(response, 'data.allCategoryGroup', []);
  parentCategoryGroupsView = get(response, 'data.allCategoryGroup', []);
  mapTreeView()
});

function mapTreeView(){
  categoryGroups.value = listToTree(parentCategoryGroupsView.map((categoryGroup: CategoryGroupInterface) => ({
      key: categoryGroup.id,
      label: categoryGroup.name,
      data: categoryGroup.code,
      parentId: categoryGroup.parentId,
      children: []
    })), {
      id: 'key',
      parentId: 'parentId',
      children: 'children'
    });
} 

const category = ref<CategoryInterface>(new Category());
const categories = ref([]);
const searchKeyword = ref('');
const totalRecords = ref(0);
const getCategoryLoading = ref(true);

const pageable = reactive({
  page: 0,
  size: 100,
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
  refetch: getCategoryRefetch
} = getCategoryGraphql(searchParams);
console.log("searchParams", searchParams);

getCategoryResult((result) => {
  const { totalCount, edges } = get(result, 'data.categories', { totalCount: 0, edges: [] });
  console.log("totalCount", totalCount)
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

function reload() {
  assign(category.value, new Category());
  getCategoryRefetch(searchParams);
}

function onPage(event: { page: number, rows: number }) {
  const { page, rows } = event;
  assign(pageable, {
    page,
    size: rows,
  });
  assign(searchParams, pageable);
  reload();
}

function onSort(event: { sortField: string, sortOrder: number }) {
  const { sortField, sortOrder } = event;
  assign(pageable, {
    page: 0,
    sort: [
      {
        property: sortField,
        direction: sortOrder === 1 ? 'ASC' : 'DESC'
      }
    ]

  });
  assign(searchParams, pageable);
  reload();
}

function searchDatatable() {
  assign(searchParams, {
    keyword: searchKeyword.value,
    pageable: { page: 0 }
  });

  reload();
}

const categoryFormVisible = ref(false);

function showCategoryFormDialog() {
  categoryFormVisible.value = true;
}

function hideCategoryFormDialog() {
  categoryFormVisible.value = false;
  assign(category.value, new Category());
}

function editCategory() {
  categoryFormVisible.value = true;
}

const {
  mutate: deleteCategoryMutate,
  // onDone: deleteCategoryDone,
  // onError: deleteCategoryError
} = deleteCategoryGraphql();

const confirm = useConfirm();

function deleteCategory() {
  confirm.require({
    message: "Confirm delete",
    header: "Confirm",
    icon: 'pi pi-exclamation-triangle',
    accept: () => {
      deleteCategoryMutate({ id: category.value.id });
    }
  });
}

//actionTable
const menuAction = ref();
const menuActions = [
  {
    label: "Edit",
    icon: 'edit',
    command: () => {
      editCategory();
    }
  },
  {
    label: "Delete",
    icon: 'delete',
    command: () => {
      deleteCategory();
    }
  }
];

//onClick
function toggleActionMenu({ event, data }: { event: Event, data: CategoryInterface }) {
  menuAction.value.toggle(event);
  category.value = cloneDeep(data);
}

</script>