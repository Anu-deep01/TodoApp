import apiClient from '../interface/apiClient'
import API_ENDPOINTS from '../interface/apiEndpoints'

export const SignUp = async (payload: any) => {
  try {
    const response = await apiClient.post(API_ENDPOINTS.SIGNUP, payload)
    return response.data
  } catch (error) {
    return error
  }
}

export const LogIn = async (payload: any) => {
  try {
    const response = await apiClient.post(API_ENDPOINTS.LOGIN, payload)
    return response.data
  } catch (error) {
    return error
  }
}

export const ProtectedRoute = async () => {
  try {
    const response = await apiClient.get(API_ENDPOINTS.PROTECTED)
    return response.data
  } catch (error) {
    return error
  }
}

export const GetTodosByUserId = async (userId: string) => {
  try {
    const response = await apiClient.get(`${API_ENDPOINTS.GET_TODOS}/${userId}`)
    return response.data
  } catch (error) {
    return error
  }
}

export const CreateTodo = async (payload: any) => {
  try {
    const response = await apiClient.post(API_ENDPOINTS.CREATE_TODOS, payload)
    return response.data
  } catch (error) {
    return error
  }
}

export const UpdateTodo = async (payload: any) => {
  try {
    const response = await apiClient.patch(API_ENDPOINTS.UPDATE_TODOS, payload)
    return response.data
  } catch (error) {
    return error
  }
}

export const DeleteTodo = async (todoId: string) => {
  try {
    const response = await apiClient.delete(`${API_ENDPOINTS.DELETE_TODOS}/
      ${todoId}`)
    return response.data
  } catch (error) {
    return error
  }
}
