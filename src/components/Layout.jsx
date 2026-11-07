import { NavLink, Outlet } from 'react-router-dom'
import { BookOpen, LayoutDashboard, Headphones, Mic2, PenLine, BookText, ChartNoAxesColumn, Menu, X } from 'lucide-react'
import { useState } from 'react'
import { useAppStore } from '../store/useAppStore'

const links = [
  { to: '/', label: 'Overview', icon: LayoutDashboard },
  { to: '/vocabulary', label: 'Vocabulary', icon: BookOpen },
  { to: '/speaking', label: 'Speaking', icon: Mic2 },
  { to: '/listening', label: 'Listening', icon: Headphones },
  { to: '/reading', label: 'Reading', icon: BookText },
  { to: '/writing', label: 'Writing', icon: PenLine },
  { to: '/progress', label: 'My Progress', icon: ChartNoAxesColumn }
]

export default function Layout() {
  const [open, setOpen] = useState(false)
  const { user } = useAppStore()

  return (
    <div className="app-shell">
      <aside className={`sidebar ${open ? 'sidebar-open' : ''}`}>
        <div className="brand">
          <span className="brand-mark">w</span>
          <span>wordly<span className="brand-dot">.</span></span>
        </div>
        <div className="side-caption">LEARNING SPACE</div>
        <nav>
          {links.map(({ to, label, icon: Icon }) => (
            <NavLink onClick={() => setOpen(false)} end={to === '/'} key={to} to={to} className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
              <Icon size={18} />
              <span>{label}</span>
            </NavLink>
          ))}
        </nav>
        <div className="sidebar-bottom">
          <div className="sidebar-tip">
            <strong>C1 / B2 Masterclass</strong>
            <p>500+ professional words loaded locally.</p>
          </div>
        </div>
      </aside>

      <main className="main-area">
        <header className="topbar">
          <button className="mobile-menu" onClick={() => setOpen(!open)}><Menu /></button>
          <div className="breadcrumb">Learning Space <span>/</span> <b>English</b></div>
          <div className="top-user">
            <div className="avatar">{user?.name?.[0] || 'L'}</div>
            <div>
              <b>{user?.name}</b>
              <small>Personal account</small>
            </div>
          </div>
        </header>
        <div className="page-wrap"><Outlet /></div>
      </main>
    </div>
  )
}