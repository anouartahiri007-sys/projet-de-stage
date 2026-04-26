import React, { useState, useRef, useEffect } from 'react'
import {
  Home, Users, UserPlus, TrendingUp, FolderOpen,
  GraduationCap, HeartPulse, PawPrint, BarChart3, Settings,
  Bell, Search, LogOut, UserCircle, Edit3,
  Cog, X, CheckCheck, AlertCircle, Info
} from 'lucide-react'
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom'
import { useAuthStore } from '../lib/auth'

// ─── Mock notification data ────────────────────────────────────────────────
const MOCK_NOTIFICATIONS = [
  { id: 1, type: 'success', title: 'Candidature acceptée', desc: 'Ahmed Bennani a été accepté au Concours N°12', time: 'Il y a 5 min', read: false },
  { id: 2, type: 'info', title: 'Nouveau document uploadé', desc: 'Fatima Zahra a soumis son dossier médical', time: 'Il y a 1h', read: false },
  { id: 3, type: 'warning', title: 'Concours expire bientôt', desc: 'Le concours Assistant Social expire dans 2 jours', time: 'Il y a 3h', read: false },
  { id: 4, type: 'info', title: 'Rapport mensuel généré', desc: 'Le rapport RH d\'Avril est disponible', time: 'Hier', read: true },
]

const MainLayout = () => {
  const [sidebarHovered, setSidebarHovered] = useState(false)
  const [notifOpen, setNotifOpen] = useState(false)
  const [profileOpen, setProfileOpen] = useState(false)
  const [notifications, setNotifications] = useState(MOCK_NOTIFICATIONS)
  const notifRef = useRef<HTMLDivElement>(null)
  const profileRef = useRef<HTMLDivElement>(null)
  const { user, logout } = useAuthStore()
  const navigate = useNavigate()

  const unreadCount = notifications.filter(n => !n.read).length

  // Close dropdowns on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) setNotifOpen(false)
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) setProfileOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const markAllRead = () => setNotifications(prev => prev.map(n => ({ ...n, read: true })))

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  const notifIcon: any = {
    success: <CheckCheck size={14} className="text-emerald-500" />,
    info: <Info size={14} className="text-blue-500" />,
    warning: <AlertCircle size={14} className="text-amber-500" />,
  }

  return (
    <div className="flex h-screen bg-govBackground text-primary-900 font-body overflow-hidden">
      
      {/* ── Smart Hover Sidebar ─────────────────────────────── */}
      <aside
        onMouseEnter={() => setSidebarHovered(true)}
        onMouseLeave={() => setSidebarHovered(false)}
        className={`bg-[#152C4D] text-white flex flex-col hidden md:flex rounded-br-3xl shadow-[4px_0_24px_rgba(0,0,0,0.15)] z-30 transition-all duration-300 ease-in-out flex-shrink-0 ${
          sidebarHovered ? 'w-68' : 'w-[72px]'
        }`}
        style={{ width: sidebarHovered ? '272px' : '72px' }}
      >
        {/* Brand */}
        <div className="p-4 flex items-center gap-3 overflow-hidden h-[80px] flex-shrink-0">
          <div className="w-10 h-10 min-w-[40px] bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-lg flex items-center justify-center shadow-lg border border-yellow-400/50">
            <span className="text-white font-bold text-lg font-serif">A</span>
          </div>
          <div className={`transition-all duration-300 overflow-hidden ${sidebarHovered ? 'opacity-100 w-auto' : 'opacity-0 w-0'}`}>
            <h1 className="text-base font-bold tracking-tight text-white leading-tight whitespace-nowrap">HRIS Larache</h1>
            <p className="text-[9px] text-blue-200 uppercase tracking-[0.15em] font-medium whitespace-nowrap">Portail Commune</p>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 py-2 px-2 space-y-0.5 overflow-y-auto overflow-x-hidden custom-scrollbar">
          <NavItem to="/dashboard"   icon={<Home size={20} />}          label="Tableau de bord"       collapsed={!sidebarHovered} />
          <NavItem to="/personnel"   icon={<Users size={20} />}         label="Personnel"             collapsed={!sidebarHovered} />
          <NavItem to="/recrutement" icon={<UserPlus size={20} />}      label="Recrutement"           collapsed={!sidebarHovered} />
          <NavItem to="/carriere"    icon={<TrendingUp size={20} />}    label="Carrière & Évaluation" collapsed={!sidebarHovered} />
          <NavItem to="/documents"   icon={<FolderOpen size={20} />}    label="Documents"             collapsed={!sidebarHovered} />
          <NavItem to="/formation"   icon={<GraduationCap size={20} />} label="Formation"             collapsed={!sidebarHovered} />
          <NavItem to="/sante"       icon={<HeartPulse size={20} />}    label="Santé & Médecine"      collapsed={!sidebarHovered} />
          <NavItem to="/veterinaire" icon={<PawPrint size={20} />}      label="Vétérinaire"           collapsed={!sidebarHovered} />
          <NavItem to="/rapports"    icon={<BarChart3 size={20} />}     label="Rapports & Stats"      collapsed={!sidebarHovered} />

          <div className="border-t border-white/10 my-2 mx-1" />

          <NavItem to="/parametres"  icon={<Settings size={20} />}     label="Paramètres"            collapsed={!sidebarHovered} />
        </nav>

        {/* Sidebar Footer */}
        <div className={`p-3 border-t border-white/10 transition-all duration-300 overflow-hidden ${sidebarHovered ? 'opacity-100' : 'opacity-0 h-0 p-0'}`}>
          <div className="text-center">
            <p className="text-[10px] text-blue-200/60 uppercase tracking-widest font-serif">Larache · Lixus</p>
            <p className="text-[8px] text-white/30 mt-0.5">ملتقى الحضارات</p>
          </div>
        </div>
      </aside>

      {/* ── Main Content ───────────────────────────────────── */}
      <div className="flex-1 flex flex-col overflow-hidden relative bg-[#F4F7FB]">

        {/* Top Header */}
        <header className="h-20 px-8 flex items-center justify-between z-20 relative bg-[#F4F7FB] border-b border-slate-200/60">
          {/* Search */}
          <div className="relative hidden md:block w-[400px]">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={17} />
            <input
              type="text"
              placeholder="Rechercher (employé, dossier, service...)"
              className="w-full bg-white pl-11 pr-5 py-3 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-600/20 text-sm text-slate-600 border border-slate-200 transition-shadow"
            />
          </div>

          <div className="flex items-center gap-4 ml-auto">
            
            {/* ── Notification Bell ─────────────── */}
            <div className="relative" ref={notifRef}>
              <button
                onClick={() => { setNotifOpen(o => !o); setProfileOpen(false) }}
                className="relative w-10 h-10 rounded-full bg-white shadow-sm border border-slate-200 flex items-center justify-center text-slate-500 hover:border-blue-300 hover:text-blue-600 transition-all"
              >
                <Bell size={20} />
                {unreadCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 w-5 h-5 bg-red-500 border-2 border-[#F4F7FB] rounded-full flex items-center justify-center text-[10px] text-white font-bold">
                    {unreadCount}
                  </span>
                )}
              </button>

              {/* Notification Dropdown */}
              {notifOpen && (
                <div className="absolute right-0 top-12 w-96 bg-white rounded-2xl shadow-2xl border border-slate-100 z-50 overflow-hidden animate-slide-up">
                  <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
                    <h3 className="font-bold text-[#152C4D] text-base">Notifications</h3>
                    <div className="flex items-center gap-2">
                      {unreadCount > 0 && (
                        <button onClick={markAllRead} className="text-xs text-blue-600 hover:underline font-medium">
                          Tout marquer lu
                        </button>
                      )}
                      <button onClick={() => setNotifOpen(false)} className="text-slate-400 hover:text-slate-600">
                        <X size={16} />
                      </button>
                    </div>
                  </div>
                  <div className="max-h-[360px] overflow-y-auto divide-y divide-slate-50">
                    {notifications.map(n => (
                      <div key={n.id} className={`flex gap-3 px-5 py-4 hover:bg-slate-50 cursor-pointer transition-colors ${!n.read ? 'bg-blue-50/40' : ''}`}>
                        <div className="mt-1 w-6 h-6 rounded-full bg-white shadow-sm border border-slate-100 flex items-center justify-center flex-shrink-0">
                          {notifIcon[n.type]}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className={`text-sm font-bold text-[#152C4D] ${!n.read ? '' : 'font-medium'}`}>{n.title}</p>
                          <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">{n.desc}</p>
                          <p className="text-[10px] text-slate-400 mt-1 font-medium">{n.time}</p>
                        </div>
                        {!n.read && <div className="w-2 h-2 rounded-full bg-blue-500 mt-2 flex-shrink-0" />}
                      </div>
                    ))}
                  </div>
                  <div className="px-5 py-3 border-t border-slate-100 text-center">
                    <Link to="/activites" onClick={() => setNotifOpen(false)} className="text-sm font-semibold text-blue-600 hover:underline">
                      Voir toutes les notifications
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* ── Profile Dropdown ──────────────── */}
            <div className="relative" ref={profileRef}>
              <button
                onClick={() => { setProfileOpen(o => !o); setNotifOpen(false) }}
                className="flex items-center gap-3 bg-white rounded-full pl-3 pr-1 py-1 shadow-sm border border-slate-200 hover:border-blue-300 transition-all"
              >
                <div className="text-right hidden sm:block">
                  <p className="text-sm font-bold text-[#152C4D] leading-tight">{user?.name || 'Direction RH'}</p>
                  <p className="text-[11px] text-slate-500 capitalize">{user?.role?.replace('_', ' ') || 'Admin'}</p>
                </div>
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#1E3E6E] to-[#3466A4] flex items-center justify-center text-white font-bold text-sm shadow-sm">
                  {user?.name?.charAt(0).toUpperCase() || 'A'}
                </div>
              </button>

              {/* Profile Dropdown Menu */}
              {profileOpen && (
                <div className="absolute right-0 top-12 w-52 bg-white rounded-2xl shadow-2xl border border-slate-100 z-50 overflow-hidden animate-slide-up">
                  <div className="px-4 py-3 border-b border-slate-100 bg-slate-50/50">
                    <p className="text-sm font-bold text-[#152C4D]">{user?.name || 'Administrateur RH'}</p>
                    <p className="text-xs text-slate-500 truncate">{user?.email || 'admin@larache.ma'}</p>
                  </div>
                  <div className="py-1">
                    <DropdownItem icon={<UserCircle size={15} />} label="Voir le profil" onClick={() => { navigate('/profil'); setProfileOpen(false) }} />
                    <DropdownItem icon={<Edit3 size={15} />} label="Modifier le profil" onClick={() => { navigate('/profil/edit'); setProfileOpen(false) }} />
                    <DropdownItem icon={<Cog size={15} />} label="Paramètres" onClick={() => { navigate('/parametres'); setProfileOpen(false) }} />
                  </div>
                  <div className="border-t border-slate-100 py-1">
                    <DropdownItem icon={<LogOut size={15} />} label="Déconnexion" onClick={handleLogout} danger />
                  </div>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto px-8 py-8 custom-scrollbar relative z-0">
          <Outlet />
        </main>

        {/* Footer */}
        <footer className="bg-white border-t border-slate-200/80 px-8 py-3 flex items-center justify-between flex-shrink-0">
          <p className="text-xs text-slate-400">
            © {new Date().getFullYear()} <span className="font-semibold text-[#152C4D]">Commune de Larache</span> — Système HRIS • Direction des Ressources Humaines
          </p>
          <div className="flex items-center gap-4">
            <a href="#" className="text-xs text-slate-400 hover:text-[#3466A4] transition-colors">Politique de confidentialité</a>
            <a href="#" className="text-xs text-slate-400 hover:text-[#3466A4] transition-colors">Aide & Support</a>
            <span className="text-xs text-slate-300">v2.0.0</span>
          </div>
        </footer>
      </div>
    </div>
  )
}

// ─── NavItem ──────────────────────────────────────────────────────────────────
function NavItem({ icon, label, to, collapsed }: { icon: React.ReactNode, label: string, to: string, collapsed: boolean }) {
  const location = useLocation()
  const isDashboard = to === '/dashboard' && (location.pathname === '/' || location.pathname === '/dashboard')
  const isActive = isDashboard || (to !== '/dashboard' && location.pathname.startsWith(to))

  return (
    <Link
      to={to}
      title={collapsed ? label : undefined}
      className={`flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-200 font-medium group ${
        isActive ? 'bg-[#1E3E6E] text-white' : 'text-blue-100 hover:text-white hover:bg-white/10'
      }`}
    >
      <div className={`flex-shrink-0 ${isActive ? 'text-white' : 'text-blue-200'}`}>{icon}</div>
      <span className={`text-[13.5px] leading-none tracking-tight whitespace-nowrap transition-all duration-300 overflow-hidden ${collapsed ? 'opacity-0 w-0' : 'opacity-100'}`}>
        {label}
      </span>
    </Link>
  )
}

// ─── DropdownItem ─────────────────────────────────────────────────────────────
function DropdownItem({ icon, label, onClick, danger }: { icon: React.ReactNode, label: string, onClick: () => void, danger?: boolean }) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm font-medium transition-colors text-left ${
        danger ? 'text-red-500 hover:bg-red-50' : 'text-slate-700 hover:bg-slate-50 hover:text-[#152C4D]'
      }`}
    >
      {icon}
      {label}
    </button>
  )
}

export default MainLayout
