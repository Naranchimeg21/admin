<script setup lang="ts">
import { reactive, onMounted } from 'vue'

// Vue Router
import { RouterLink } from 'vue-router'

// Api
import { getQuizByPagination } from '../../api/quiz'

// Components
import Button from 'primevue/button'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import ColumnGroup from 'primevue/columngroup'

const state = reactive({
  pageNumber: 1,
  groupNumber: 10,
  allPages: null,
  loading: false,
  data: [],
})

function getTableData() {
  getQuizByPagination(state.pageNumber, state.groupNumber)
    .then((response) => {
      if (response.status === 200) {
        let { data } = response

        state.allPages = data.all_page
        state.data = data.quizes
      }
    })
    .catch((error) => console.log(error))
}

onMounted(() => {
  getTableData()
})
</script>

<template>
  <main class="h-full flex flex-col p-5">
    <div class="space-y-5">
      <RouterLink to="/quiz/create">
        <Button>Асуулга үүсгэх</Button>
      </RouterLink>

      <DataTable
        :value="state.data"
        class="w-full"
        filterDisplay="menu"
        :loading="state.loading"
        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
        :rowsPerPageOptions="[10, 20, 50]"
      >
        <Column field="name" header="Vin"></Column>
        <Column field="participation_method" header="Year"></Column>
        <Column field="start_date" header="Brand"></Column>
        <Column field="time_limit_by_minutes" header="Color"></Column>
      </DataTable>
    </div>
  </main>
</template>
