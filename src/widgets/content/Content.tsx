import { Navbar } from "./navbar"
import styles from './Content.style.scss'
import { Table } from "../table"

export function Content() {

  return (
    <main className={styles.content}>
      <Navbar />
      <div className={styles.workspace}><Table /></div>
    </main>
  )
}