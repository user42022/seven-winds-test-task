export type OutlayRowRequest = {
  equipmentCosts: number
  estimatedProfit: number
  machineOperatorSalary: number
  mainCosts: number
  materials: number
  mimExploitation: number
  overheads: number
  parentId: string
  rowName: string
  salary: number
  supportCosts: number
}

export type OutlayRowUpdateRequest = {
  equipmentCosts: number
  estimatedProfit: number
  machineOperatorSalary: number
  mainCosts: number
  materials: number
  mimExploitation: number
  overheads: number
  rowName: string
  salary: number
  supportCosts: number
}

export type RowResponse = {
  equipmentCosts: number
  estimatedProfit: number
  id: string
  machineOperatorSalary: number
  mainCosts: number
  materials: number
  mimExploitation: number
  overheads: number
  rowName: string
  salary: number
  supportCosts: number
  total: number
}

type AddInfo = {
  depth: number
  parent: null | string
}

export type RowResponseWithAddInfo = RowResponse & {_addInfo: AddInfo}

export type RecalculatedRows = {
  changed: RowResponse[]
  current: RowResponse
}

export type TreeResponse = RowResponse & {
  child: TreeResponse[]
}

