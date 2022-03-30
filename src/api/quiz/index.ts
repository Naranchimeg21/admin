import { callGet, callPost } from '../baseInstance'

const getAllQuiz = async () => {
  return await callGet('/quiz')
}

const getQuizByPagination = async (
  page_number: number,
  group_number: number
) => {
  return await callPost('/quiz/by/pagination', { page_number, group_number })
}

export { getAllQuiz, getQuizByPagination }
