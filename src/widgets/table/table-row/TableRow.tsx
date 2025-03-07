import { OutlayRowRequest, OutlayRowUpdateRequest, RowResponse, RowResponseWithAddInfo } from 'src/entities/works/types'
import { ChangeEventHandler, KeyboardEventHandler, useState } from 'react'
import DocumentIcon from '@icons/doc-icon.svg'
import styles from './TableRow.style.scss'
import { useAppDispatch } from 'src/shared'
import { actions } from 'src/entities/works'
import { createWork, updateWork } from "src/entities/works/operations"

const interactingWorkProps: (keyof RowResponse)[] = [
  'rowName',
  'salary',
  'equipmentCosts',
  'overheads',
  'estimatedProfit'
]

type Props = {
  work: RowResponseWithAddInfo
  refCallback: (ref: SVGSVGElement | null) => void
  bound?: {
    width: number
    height: number
  }
}


export function TableRow({ work, refCallback, bound }: Props) {
  const [state, setState] = useState({ ...work, isRaw: work._addInfo.isNew ?? false })
  const dispatch = useAppDispatch()

  const createRequest: OutlayRowUpdateRequest = {
    equipmentCosts: state.equipmentCosts,
    estimatedProfit: state.estimatedProfit,
    machineOperatorSalary: state.machineOperatorSalary,
    mainCosts: state.mainCosts,
    materials: state.materials,
    mimExploitation: state.mimExploitation,
    overheads: state.overheads,
    rowName: state.rowName,
    salary: state.salary,
    supportCosts: state.supportCosts
  }

  const createChangeHandler = (prop: keyof typeof state): ChangeEventHandler<HTMLInputElement> => {
    return (e) => setState((prev) => ({ ...prev, [prop]: e.target.value }))
  }

  const onEnterKeyDown: KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.key !== 'Enter') {
      return
    }
    if (work._addInfo.isNew) {
      dispatch(createWork({
        id: work.id, ...createRequest,
        parentId: state._addInfo.parent
      })).then(() => setState((prev) => ({ ...prev, isRaw: false })))
    } else {
      dispatch(updateWork({
        id: work.id, ...createRequest,
      })).then(() => setState((prev) => ({ ...prev, isRaw: false })))
    }

  }

  const createRawWork = () => {
    if (state.isRaw) {
      return
    }
    dispatch(actions.createNewWork({ parentId: work.id }))
  }

  return (
    <tr className={styles.tableRow} key={work.id} onDoubleClick={() => setState((prev) => ({ ...prev, isRaw: true }))}>
      <td className={styles.tableCell} style={{ paddingLeft: `${1.6 + work._addInfo.depth * 2}rem` }}>
        <DocumentIcon ref={refCallback} onClick={createRawWork} />
        {bound && <div
          className={styles.bound}
          style={{ ...bound, transform: `translate3d(${-bound.width}px,${-bound.height - 12}px, 0)` }}
        />}
      </td>
      {interactingWorkProps.map((workProp) => (
        <td key={workProp} className={styles.tableCell}>{state.isRaw ? <input
          onChange={createChangeHandler(workProp)}
          onKeyDown={onEnterKeyDown}
          value={state[workProp]}
          className={styles.input}
        /> : work[workProp]}</td>
      ))}
    </tr>
  )
}