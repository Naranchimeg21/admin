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

const updateCategory = async (categoryId: string, name: string) => {
  return await callPost('/category/update', { category_id: categoryId, name })
}

const deleteCategory = async (categoryId: string) => {
  return await callPost('/category/delete', { category_id: categoryId })
}

export {
  createCategory,
  getAllCategory,
  getCategoryByPagination,
  getSingleCategory,
  updateCategory,
  deleteCategory,
}
