<script setup lang="ts">
import { reactive, onMounted, ref } from 'vue'

// Api
import { getQuizByPagination, deleteQuiz } from '../../api/quiz'

// Store
import store from '../../store'

// Prime vue
import Button from 'primevue/button'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import ColumnGroup from 'primevue/columngroup'
import Tag from 'primevue/tag'

// Components
import CreateQuizDialog from '../../components/quiz/CreateQuizDialog.vue'
import QuizTableDropDown from '../../components/quiz/QuizTableDropDown.vue'
import ConfirmDialog from '../../components/global/ConfirmDialog.vue'

const state = reactive({
  open: false,
  confirmIsOpen: false,
  pageNumber: 1,
  groupNumber: 10,
  allPages: null,
  loading: false,
  data: [],
})

const selectedQuiz = ref(null)

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

function destroyQuiz() {
  deleteQuiz(selectedQuiz.value)
    .then((response) => {
      if (response.status === 200) {
        store.setMessage({
          type: 'success',
          text: response.data,
          open: true,
        })
      }

      getTableData()

      state.confirmIsOpen = false
    })
    .catch((error) => {
      console.log(error)
    })
}

onMounted(() => {
  getTableData()
})
</script>

<template>
  <main>
    <CreateQuizDialog
      :open="state.open"
      @close="state.open = false"
      @refresh-table="getTableData()"
    />
    <ConfirmDialog
      :open="state.confirmIsOpen"
      @close="state.confirmIsOpen = false"
      @submit="destroyQuiz"
      title="Устгах"
      paragraph="Та устгахдаа итгэлтэй байна уу!"
    />
    <div class="w-full flex flex-col p-5">
      <div class="space-y-5">
        <Button
          label="Асуулга үүсгэх"
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
          <Column field="participation_method" header="Оролцооны арга" />
          <Column field="start_date" header="Эхлэх огноо" />
          <Column field="end_date" header="Дуусах огноо" />
          <Column field="time_limit_by_minutes" header="Үргэлжлэх хугацаа" />
          <Column field="is_published" header="Нийтэлсэн эсэх">
            <template #body="{ data }">
              <Tag v-if="data.is_published" value="Тийм" />
              <Tag v-else value="Үгүй" severity="warning" />
            </template>
          </Column>
          <Column field="use_points" header="Оноотой эсэх">
            <template #body="{ data }">
              <Tag v-if="data.use_points" value="Тийм" />
              <Tag v-else value="Үгүй" severity="warning" />
            </template>
          </Column>
          <Column>
            <template #body="{ data }">
              <QuizTableDropDown
                :quizId="data._id"
                @confirm-delete="
                  ;[(state.confirmIsOpen = true), (selectedQuiz = data._id)]
                "
              />
            </template>
          </Column>
        </DataTable>
      </div>
    </div>
  </main>
</template>
