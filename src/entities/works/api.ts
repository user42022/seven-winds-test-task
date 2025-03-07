import { api } from "src/shared"
import { TreeResponse } from "./types"

export const getWorks = async (): Promise<TreeResponse[]> => {
  const res = await fetch(`${api.BASE_URL}/${api.ENDPOINTS.row}/list`)

  if (res.status !== 200) {
    throw new Error('Ошибка запроса')
  }

  return await res.json()

}