import { OutlayRowUpdateRequest, RowResponse, RowResponseWithAddInfo } from 'src/entities/works/types'
import { ChangeEventHandler, KeyboardEventHandler, useState } from 'react'
import DocumentIcon from '@icons/doc-icon.svg'
import DeleteIcon from '@icons/delete.svg'
import { applyStyles, useAppDispatch } from 'src/shared'
import { actions } from 'src/entities/works'
import { createWork, removeWork, updateWork } from 'src/entities/works/operations'
import { NumericFormat } from 'react-number-format'
import styles from './TableRow.style.scss'

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
  const [controlsVisible, setControlsVisible] = useState(false)
  const dispatch = useAppDispatch()
  const [textType, ...numberType] = interactingWorkProps
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

  const handleSubmit: KeyboardEventHandler<HTMLInputElement> = (e) => {
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

  const handleCreateClick = () => {
    if (state.isRaw) {
      return
    }
    dispatch(actions.createNewWork({ parentId: work.id }))
  }

  const mouseEnterHandler = () => {
    if (state.isRaw) {
      return
    }
    setControlsVisible(true)
  }
  const mouseLeaveHandler = () => setControlsVisible(false)
  const handleRemoveWork = () => dispatch(removeWork(work.id))

  return (
    <tr className={styles.tableRow} key={work.id} onDoubleClick={() => setState((prev) => ({ ...prev, isRaw: true }))}>
      <td className={styles.tableCell} style={{ paddingLeft: `${1.6 + work._addInfo.depth * 2}rem` }}>
        <div className={applyStyles([styles.controls, controlsVisible ? styles.controlsVisible : ''])} onMouseLeave={mouseLeaveHandler}>
          <DocumentIcon ref={refCallback} onClick={handleCreateClick} onMouseEnter={mouseEnterHandler} />
          {controlsVisible && <DeleteIcon onClick={handleRemoveWork} />}
        </div>
        {bound && <div
          className={styles.bound}
          style={{ ...bound, transform: `translate3d(${-bound.width + 6}px,${-bound.height - 14}px, 0)` }}
        />}
      </td>
        <td className={styles.tableCell}>{state.isRaw ? <input
          onChange={createChangeHandler(textType)}
          onKeyDown={handleSubmit}
          value={state[textType]}
          className={styles.input}
        /> : work[textType]}</td>
      {numberType.map((workProp) => (
        <td key={workProp} className={styles.tableCell}>{state.isRaw ? <NumericFormat
          decimalScale={0}
          allowNegative
          onChange={createChangeHandler(workProp)}
          onKeyDown={handleSubmit}
          value={state[workProp]}
          className={styles.input}
        /> : work[workProp]}</td>
      ))}
    </tr>
  )
}