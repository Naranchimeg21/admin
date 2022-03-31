import { callGet, callPost } from '../baseInstance'

const createCategory = async (body: object) => {
  return await callPost('/category/create', body)
}

const getAllCategory = async () => {
  return await callGet('/category')
}

const getCategoryByPagination = async (
  page_number: number,
  group_number: number
) => {
  return await callPost('/category/by/pagination', {
    page_number,
    group_number,
  })
}

const getSingleCategory = async (quizId: string) => {
  return await callPost('/category/single', { quiz_id: quizId })
}

export {
  createCategory,
  getAllCategory,
  getCategoryByPagination,
  getSingleCategory,
}
