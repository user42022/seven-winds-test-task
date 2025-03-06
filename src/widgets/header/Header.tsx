import styles from './Header.style.scss'
import MenuIcon from '@icons/menu.svg'
import BackArrow from '@icons/back-arrow.svg'
import { applyStyles } from 'src/shared'
import DropdownIcon from '@icons/dropdown-arrow.svg'

export function Header() {

  return (
    <header className={styles.header}>
      <nav className={styles.controls}>
        <MenuIcon />
        <BackArrow />
        <div className={applyStyles([styles.mode, styles.modeSelected])}>Просмотр</div>
        <div className={styles.mode}>Управление</div>
      </nav>
      <div className={styles.dropdown}>
        <div className={styles.project}>
          <p>Название проекта</p>
          <p className={styles.projectAbbreviation}>Аббревиатура</p>
        </div>
        <DropdownIcon />
      </div>
      <h1 className={styles.title}>Строительно-монтажные работы</h1>
    </header>
  )
}