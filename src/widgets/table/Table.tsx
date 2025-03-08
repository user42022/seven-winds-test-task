import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { pullWorks } from 'src/entities/works/operations'
import { worksMap, worksOrder } from 'src/entities/works/selectors'
import { useAppDispatch } from 'src/shared'
import { useFirstRender } from 'src/shared/hooks'
import { collectRef } from './Table.service'
import { TableRow } from './table-row'
import styles from './Table.style.scss'

const headers = [
  'Уровень',
  'Наименование работ',
  'Основная з/п',
  'Оборудование',
  'Накладные расходы',
  'Сметная прибыль',
]

export function Table() {

  const map = useSelector(worksMap)
  const order = useSelector(worksOrder)
  const dispatch = useAppDispatch()
  const isFirstRender = useFirstRender()
  const iconsRef = useRef<Record<string, SVGSVGElement>>({})
  const [bounds, setBounds] = useState<{ [id: string]: { width: number, height: number } }>({})

  useEffect(() => {
    if (isFirstRender) {
      dispatch(pullWorks())
    }
  }, [map, order])

  useLayoutEffect(() => {
    for (const id in iconsRef.current) {
      const childRef = iconsRef.current[id]
      const parentId = map[id]._addInfo.parent

      if (!parentId) {
        continue
      }

      const parentRef = iconsRef.current[parentId]

      const calculatedHeight = childRef.getBoundingClientRect().top -
        parentRef.getBoundingClientRect().top -
        parentRef.getBoundingClientRect().height / 2

      const calculatedWidth = childRef.getBoundingClientRect().left -
        parentRef.getBoundingClientRect().left -
        parentRef.getBoundingClientRect().width / 2
      setBounds(prev => ({ ...prev, [id]: { width: calculatedWidth, height: calculatedHeight } }))
    }
  }, [map, order])

  return (
    <table className={styles.table}>
      <thead >
        <tr className={styles.tableRow}>
          {headers.map((header) => <th key={header} className={styles.tableHeader}>{header}</th>)}
        </tr>
      </thead>
      <tbody>
        {
          order.map((workId) => (
            <TableRow key={workId} work={map[workId]} refCallback={(collectRef(iconsRef, workId))} bound={bounds[workId]} />
          ))
        }
      </tbody>
    </table>
  )
}