import { applyStyles } from 'src/shared'
import styles from './Navbar.style.scss'
import NavItemIcon from '@icons/nav-item.svg'
import { ReactNode } from 'react'

const navItems = [
  'По проекту',
  'Объекты',
  'РД',
  'МТО',
  'СМР',
  'График',
  'МиМ',
  'Рабочие',
  'Капвложения',
  'Бюджет',
  'Финансирование',
  'Панорамы',
  'Камеры',
  'Поручения',
  'Контрагенты',
]

function NavItem({selected, children}: {selected: boolean, children: ReactNode}) {
  const className = applyStyles([styles.navItem, selected ? styles.navItemSelected : ''])

  return <li className={className}><NavItemIcon />{children}</li>
}

export function Navbar() {

  return (
    <nav className={styles.navbar}>
      <ul>
        {navItems.map((item, idx) => <NavItem key={idx} selected={item === 'СМР'}>{item}</NavItem>)}
      </ul>
    </nav>
  )
}