import { createAsyncThunk } from "@reduxjs/toolkit"
import { getWorks } from "./api"
import { flatResponseTree } from "./service"

type Works = ReturnType<typeof flatResponseTree>

export const pullWorks = createAsyncThunk<Works>('entities/works', async () => {
  const data = await getWorks()

  return flatResponseTree(data)
})