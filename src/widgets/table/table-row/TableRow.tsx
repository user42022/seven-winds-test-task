import { RowResponse, RowResponseWithAddInfo } from 'src/entities/works/types'
import { ChangeEventHandler, useState } from 'react'
import DocumentIcon from '@icons/doc-icon.svg'
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
  const [state, setState] = useState({ ...work, isRaw: false })

  const createHandler = (prop: keyof typeof state): ChangeEventHandler<HTMLInputElement> => {
    return (e) => setState((prev) => ({ ...prev, [prop]: e.target.value }))
  }

  return (
    <tr className={styles.tableRow} key={work.id} onDoubleClick={() => setState((prev) => ({ ...prev, isRaw: true }))}>
      <td className={styles.tableCell} style={{ paddingLeft: `${1.6 + work._addInfo.depth * 2}rem` }}>
        <DocumentIcon ref={refCallback} />
        {bound && <div
          className={styles.bound}
          style={{ ...bound, transform: `translate3d(${-bound.width}px,${-bound.height - 12}px, 0)` }}
        />}
      </td>
      {interactingWorkProps.map((workProp) => (
        <td key={workProp} className={styles.tableCell}>{state.isRaw ? <input
          onChange={createHandler(workProp)}
          value={state[workProp]}
          className={styles.input}
        /> : work[workProp]}</td>
      ))}
    </tr>
  )
}