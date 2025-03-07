import { createAsyncThunk } from "@reduxjs/toolkit"
import { createWorkRequest, getWorksRequest, removeWorkRequest, updateWorkRequest } from "./api"
import { flatResponseTree } from "./service"
import { OutlayRowRequest, OutlayRowUpdateRequest, RecalculatedRows } from "./types"

type Works = ReturnType<typeof flatResponseTree>

export const pullWorks = createAsyncThunk<Works>('entities/works/pullWorks', async () => {
  const data = await getWorksRequest()

  return flatResponseTree(data)
})

type WithId<T> = T & { id: string }

export const createWork = createAsyncThunk<WithId<RecalculatedRows>, WithId<OutlayRowRequest>>(
  'entities/works/createWork',
  async ({ id, ...body }) => {
    const data = await createWorkRequest(body)

    return { id, ...data }
  }
)

export const updateWork = createAsyncThunk<RecalculatedRows, WithId<OutlayRowUpdateRequest>>(
  'entities/works/updateWork',
  async ({ id, ...body }) => {
    const data = await updateWorkRequest({ body, id })

    return data
  }
)

export const removeWork = createAsyncThunk<WithId<RecalculatedRows>, string>(
  'entities/works/removeWork',
  async (id) => {
    const data = await removeWorkRequest(id)

    return {id, ...data}
  }
)