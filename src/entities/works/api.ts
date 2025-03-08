import { api } from 'src/shared'
import { OutlayRowRequest, OutlayRowUpdateRequest, RecalculatedRows, TreeResponse } from './types'

export const getWorksRequest = async (): Promise<TreeResponse[]> => {
  const res = await fetch(`${api.BASE_URL}/${api.ENDPOINTS.row}/list`)

  if (res.status !== 200) {
    throw new Error('Ошибка запроса')
  }

  return await res.json()
}

export const createWorkRequest = async (body: OutlayRowRequest): Promise<RecalculatedRows> => {
  const res = await fetch(`${api.BASE_URL}/${api.ENDPOINTS.row}/create`, {
    method: 'POST',
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json'
    }
  })

  if (res.status !== 200 && res.status !== 201) {
    throw new Error('Ошибка запроса')
  }

  return await res.json()
}

export const updateWorkRequest = async ({ body, id }: { body: OutlayRowUpdateRequest, id: string }): Promise<RecalculatedRows> => {
  const res = await fetch(`${api.BASE_URL}/${api.ENDPOINTS.row}/${id}/update`, {
    method: 'POST',
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json'
    }
  })

  if (res.status !== 200 && res.status !== 201) {
    throw new Error('Ошибка запроса')
  }

  return await res.json()
}

export const removeWorkRequest = async (id: string): Promise<RecalculatedRows> => {
  const res = await fetch(`${api.BASE_URL}/${api.ENDPOINTS.row}/${id}/delete`, {
    method: 'DELETE',
  })

  if (res.status !== 200 && res.status !== 201) {
    throw new Error('Ошибка запроса')
  }

  return await res.json()
}