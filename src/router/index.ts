import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import CategoryView from '../views/category/index.vue'
import QuizView from '../views/quiz/index.vue'

import EditQuizView from '../views/quiz/edit/index.vue'
import MainTab from '../views/quiz/edit/MainTab.vue'
import QuestionTab from '../views/quiz/edit/QuestionTab.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/category',
      name: 'category',
      component: CategoryView,
    },
    {
      path: '/quiz',
      name: 'quiz',
      component: QuizView,
    },
    {
      path: '/quiz/edit/:id',
      name: 'quiz_edit',
      component: EditQuizView,
      redirect: {
        name: 'quiz_main',
      },
      children: [
        {
          path: 'main',
          name: 'quiz_main',
          component: MainTab,
        },
        {
          path: 'question',
          name: 'quiz_question',
          component: QuestionTab,
        },
      ],
    },
  ],
})

export default router
