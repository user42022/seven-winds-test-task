import { createSlice } from "@reduxjs/toolkit"
import { pullWorks } from "./operations"
import { RowResponseWithAddInfo, } from "./types"

type State = {
  worksMap: { [workId: string]: RowResponseWithAddInfo }
  worksOrder: string[]
}

const initialState: State = {
  worksMap: {},
  worksOrder: []
}

export const slice = createSlice({
  name: 'entities/works',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(pullWorks.fulfilled, (state, { payload }) => {
      const [worksMap, worksOrder] = payload

      for (const id in worksMap) {
        state.worksMap[id] = { ...worksMap[id] }
      }
      state.worksOrder = worksOrder
    })
  },
})

