import { callGet, callPost, callDelete } from '../baseInstance'

const createQuiz = async (body: object) => {
  return await callPost('/quiz/create', body)
}

const getAllQuiz = async () => {
  return await callGet('/quiz')
}

const getQuizByPagination = async (
  page_number: number,
  group_number: number
) => {
  return await callPost('/quiz/by/pagination', { page_number, group_number })
}

const getSingleQuiz = async (quizId: string) => {
  return await callPost('/quiz/single', { quiz_id: quizId })
}

const deleteQuiz = async (quizId: string) => {
  return await callPost('/quiz/delete', { quiz_id: quizId })
}

export {
  createQuiz,
  getAllQuiz,
  getQuizByPagination,
  getSingleQuiz,
  deleteQuiz,
}
