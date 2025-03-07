import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { createWork, pullWorks, updateWork } from "./operations"
import { RowResponse, RowResponseWithAddInfo, } from "./types"

type State = {
  worksMap: { [workId: string]: RowResponseWithAddInfo }
  worksOrder: string[]
}

const initialState: State = {
  worksMap: {},
  worksOrder: []
}

const newWork: Omit<RowResponse, 'id'> = {
  equipmentCosts: 0,
  estimatedProfit: 0,
  machineOperatorSalary: 0,
  mainCosts: 0,
  materials: 0,
  mimExploitation: 0,
  overheads: 0,
  rowName: "",
  salary: 0,
  supportCosts: 0,
  total: 0
}

export const slice = createSlice({
  name: 'entities/works',
  initialState,
  reducers: {
    createNewWork: (state, action: PayloadAction<{ parentId: string }>) => {
      const { worksMap, worksOrder } = state
      const id = `new-${Date.now()}`
      const parentId = action.payload.parentId
      const parentDepth = worksMap[parentId]._addInfo.depth

      worksMap[id] = {
        ...newWork, id, _addInfo: {
          depth: parentDepth + 1,
          parent: parentId,
          isNew: true
        }
      }

      const indexOfParentId = worksOrder.findIndex((id) => id === parentId)
      const worksAfterParent = worksOrder.slice(indexOfParentId + 1)

      const indexForNewWork = worksAfterParent
        .findIndex((workId) => state.worksMap[workId]._addInfo.depth <= parentDepth)

      if (indexForNewWork === -1) {
        worksOrder.push(id)
        return
      }

      worksOrder.splice(worksOrder.length - worksAfterParent.length + indexForNewWork, 0, id)
    }
  },
  extraReducers: builder => {
    builder.addCase(pullWorks.fulfilled, (state, { payload }) => {
      const [worksMap, worksOrder] = payload

      for (const id in worksMap) {
        state.worksMap[id] = { ...worksMap[id] }
      }

      state.worksOrder = worksOrder
    })
      .addCase(createWork.fulfilled, (state, { payload }) => {
        const { id: previousId, ...data } = payload
        const { worksMap, worksOrder } = state

        worksMap[data.current.id] = { ...data.current, _addInfo: { ...worksMap[previousId]._addInfo } }
        delete worksMap[data.current.id]._addInfo.isNew
        delete worksMap[previousId]

        const indexofPreviousId = worksOrder.findIndex((id) => id === previousId)
        worksOrder.splice(indexofPreviousId, 1, data.current.id)

        data.changed.forEach((changedWork) => {
          worksMap[changedWork.id] = { ...worksMap[changedWork.id], ...changedWork }
        })
      })
      .addCase(updateWork.fulfilled, (state, { payload }) => {
        const { current, changed } = payload
        const { worksMap } = state

        worksMap[current.id] = { ...worksMap[current.id], ...current }

        changed.forEach((changedWork) => {
          worksMap[changedWork.id] = { ...worksMap[changedWork.id], ...changedWork }
        })
      })
  },
})

