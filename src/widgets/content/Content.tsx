import { Navbar } from './navbar'
import { Table } from '../table'
import styles from './Content.style.scss'

export function Content() {

  return (
    <main className={styles.content}>
      <Navbar />
      <div className={styles.workspace}><Table /></div>
    </main>
  )
}