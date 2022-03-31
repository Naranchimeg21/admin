<script setup lang="ts">
import { reactive, onMounted } from 'vue'

// Api
import { getCategoryByPagination } from '../../api/category'

// Prime vue
import Button from 'primevue/button'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import ColumnGroup from 'primevue/columngroup'
import Tag from 'primevue/tag'

// Components
import CreateQuizDialog from '../../components/quiz/CreateQuizDialog.vue'
import CategoryTableDropDown from '../../components/category/CategoryTableDropDown.vue'

const state = reactive({
  open: false,
  pageNumber: 1,
  groupNumber: 10,
  allPages: null,
  loading: false,
  data: [],
})

function getTableData() {
  getCategoryByPagination(state.pageNumber, state.groupNumber)
    .then((response) => {
      if (response.status === 200) {
        let { data } = response

        state.allPages = data?.all_page
        state.data = data?.categories
      }
    })
    .catch((error) => console.log(error))
}

onMounted(() => {
  getTableData()
})
</script>

<template>
  <CreateQuizDialog
    :open="state.open"
    @close="state.open = false"
    @refresh-table="getTableData()"
  />
  <main class="w-full flex flex-col p-5">
    <div class="space-y-5">
      <Button
        label="Ангилал үүсгэх"
        class="p-button-outlined"
        @click="state.open = true"
      />

      <DataTable
        :value="state.data"
        class="w-full shadow-lg"
        filterDisplay="menu"
        :loading="state.loading"
        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
        :rowsPerPageOptions="[10, 20, 50]"
      >
        <Column field="name" header="Нэр" />
        <Column field="createdAt" header="Нийтэлсэн огноо" />
        <Column field="updatedAt" header="Засварласан огноо" />
        <Column>
          <template #body="{ data }">
            <CategoryTableDropDown :categoryId="data._id" />
          </template>
        </Column>
      </DataTable>
    </div>
  </main>
</template>
