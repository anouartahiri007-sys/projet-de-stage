import { useQuery } from '@tanstack/react-query'
import { api } from '../lib/api'
import {
  Users, FileText, BarChart3, ChevronRight, Activity,
  TrendingUp, UserPlus, Bell, Award, Calendar,
  ArrowUp, Clipboard
} from 'lucide-react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuthStore } from '../lib/auth'

// Mock recent activities (will be replaced by backend when /activities endpoint exists)
const RECENT_ACTIVITIES = [
  {
    id: 1, name: 'Dr. Youssef Fassi', desc: 'Promotion à l\'échelon 4 approuvée',
    time: 'Il y a 2h', tag: 'Carrière', tagColor: 'text-emerald-700 bg-emerald-50 border-emerald-100',
    employeeId: 1
  },
  {
    id: 2, name: 'Service de Médecine', desc: '12 nouveaux arrêtés générés',
    time: 'Il y a 5h', tag: 'Documents', tagColor: 'text-blue-700 bg-blue-50 border-blue-100',
    employeeId: null
  },
  {
    id: 3, name: 'Direction de l\'Hôpital', desc: 'Recrutement de 5 infirmiers lancé',
    time: 'Hier', tag: 'Recrutement', tagColor: 'text-orange-700 bg-orange-50 border-orange-100',
    employeeId: null
  },
  {
    id: 4, name: 'Admin Système', desc: 'Synchronisation de la base de données terminée',
    time: 'Il y a 2 jours', tag: 'Système', tagColor: 'text-slate-600 bg-slate-100 border-slate-200',
    employeeId: null
  },
]

const Dashboard = () => {
  const { user } = useAuthStore()
  const navigate = useNavigate()
  const currentHour = new Date().getHours()
  const greeting = currentHour < 12 ? 'Bonjour' : currentHour < 18 ? 'Bon après-midi' : 'Bonsoir'

  const { data: stats, isLoading: statsLoading } = useQuery({
    queryKey: ['dashboardStats'],
    queryFn: async () => {
      try {
        const res = await api.get('/dashboard/stats')
        return res.data
      } catch {
        // Return mock data if endpoint doesn't exist yet
        return {
          total_personnel: 1284,
          medecins: 312,
          infirmiers: 642,
          veterinaires: 58,
          concours_actifs: 4,
          candidatures_en_attente: 23,
        }
      }
    },
    staleTime: 5 * 60 * 1000,
  })

  const quickActions = [
    { icon: <FileText size={22} strokeWidth={1.5} />, label: 'Nouvel arrêté', onClick: () => navigate('/documents') },
    { icon: <Users size={22} strokeWidth={1.5} />, label: 'Répertoire personnel', onClick: () => navigate('/personnel') },
    { icon: <UserPlus size={22} strokeWidth={1.5} />, label: 'Lancer un concours', onClick: () => navigate('/recrutement') },
    { icon: <BarChart3 size={22} strokeWidth={1.5} />, label: 'Rapports & Stats', onClick: () => navigate('/rapports') },
    { icon: <Award size={22} strokeWidth={1.5} />, label: 'Carrière & Promo', onClick: () => navigate('/carriere') },
    { icon: <Clipboard size={22} strokeWidth={1.5} />, label: 'Formations', onClick: () => navigate('/formation') },
  ]

  return (
    <div className="animate-slide-up w-full space-y-8">

      {/* ── Hero Banner ─────────────────────────────────── */}
      <div className="relative w-full h-[280px] rounded-3xl overflow-hidden shadow-xl">
        {/* Larache coastal image */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Larache_main_square.jpg/1280px-Larache_main_square.jpg')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#152C4D]/95 via-[#152C4D]/75 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0d1e35]/50 to-transparent" />

        {/* Content */}
        <div className="relative h-full flex flex-col justify-center px-10 w-2/3">
          <p className="text-blue-300 text-sm font-semibold uppercase tracking-widest mb-2">
            {greeting}, {user?.name?.split(' ')[0] || 'Administrateur'}
          </p>
          <h1 className="text-4xl font-extrabold text-white font-heading leading-tight mb-2">
            Tableau de Bord RH
          </h1>
          <p className="text-blue-200 text-base font-medium mb-1">
            Système de Gestion des Ressources Humaines
          </p>
          <p className="text-blue-300/70 text-sm">
            Commune de Larache — Médecins, Infirmiers & Vétérinaires
          </p>
          <div className="flex items-center gap-2 mt-4">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-emerald-300 text-xs font-semibold">Système opérationnel</span>
          </div>
        </div>

        {/* Arabic caption */}
        <div className="absolute top-8 right-10 text-right">
          <h2 className="text-5xl font-bold text-white/80 drop-shadow-md" style={{ fontFamily: 'serif' }}>العرايش</h2>
          <p className="text-blue-200/60 mt-2 text-sm" style={{ fontFamily: 'serif' }}>مدينة الثقافة والتاريخ والبحر</p>
        </div>
      </div>

      {/* ── Stats Cards ─────────────────────────────── */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <StatCard
          icon={<Users size={22} className="text-white" />}
          bg="bg-[#3B82F6]"
          title="Total Personnel"
          value={statsLoading ? '—' : stats?.total_personnel?.toLocaleString('fr-MA') || '1 284'}
          trend="+3.2%"
          wide
        />
        <StatCard
          icon={<Activity size={22} className="text-white" />}
          bg="bg-[#10B981]"
          title="Médecins"
          value={statsLoading ? '—' : stats?.medecins || '312'}
          trend="+2.1%"
        />
        <StatCard
          icon={<Users size={22} className="text-white" />}
          bg="bg-[#8B5CF6]"
          title="Infirmiers"
          value={statsLoading ? '—' : stats?.infirmiers || '642'}
          trend="+3.8%"
        />
        <StatCard
          icon={<Users size={22} className="text-white" />}
          bg="bg-[#0D9488]"
          title="Vétérinaires"
          value={statsLoading ? '—' : stats?.veterinaires || '58'}
          trend="+1.7%"
        />
        <StatCard
          icon={<UserPlus size={22} className="text-white" />}
          bg="bg-[#F97316]"
          title="Concours actifs"
          value={statsLoading ? '—' : stats?.concours_actifs || '4'}
          trend="Live"
        />
        <StatCard
          icon={<Bell size={22} className="text-white" />}
          bg="bg-[#EC4899]"
          title="Candidatures"
          value={statsLoading ? '—' : stats?.candidatures_en_attente || '23'}
          trend="En attente"
        />
      </div>

      {/* ── Main Grid ───────────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

        {/* Activities */}
        <div className="lg:col-span-7">
          <div className="gov-card p-7 h-full flex flex-col">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-xl font-bold text-[#152C4D] font-heading">Activités récentes</h2>
              <Link to="/activites" className="text-sm font-semibold text-[#3466A4] hover:underline flex items-center gap-1">
                Tout voir <ChevronRight size={15} />
              </Link>
            </div>
            <div className="space-y-1 flex-1">
              {RECENT_ACTIVITIES.map(act => (
                <ActivityRow key={act.id} activity={act} onNavigate={() => act.employeeId && navigate(`/personnel/${act.employeeId}`)} />
              ))}
            </div>
          </div>
        </div>

        {/* Right column */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          
          {/* Quick Access */}
          <div className="gov-card p-6">
            <h2 className="text-xl font-bold text-[#152C4D] font-heading mb-5">Accès rapides</h2>
            <div className="grid grid-cols-2 gap-3">
              {quickActions.map((qa, i) => (
                <button
                  key={i}
                  onClick={qa.onClick}
                  className="flex flex-col items-center justify-center gap-3 p-5 rounded-2xl border border-slate-100 bg-white hover:border-blue-200 hover:shadow-md hover:bg-blue-50/30 transition-all group active:scale-95 h-28"
                >
                  <div className="text-[#3466A4] group-hover:text-[#1E3E6E] group-hover:scale-110 transition-all p-2.5 bg-blue-50 group-hover:bg-blue-100 rounded-xl">
                    {qa.icon}
                  </div>
                  <span className="text-[12px] font-bold text-[#152C4D] text-center leading-tight">{qa.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Calendar reminder / quote */}
          <div className="gov-card p-6 bg-gradient-to-br from-[#152C4D] to-[#1E3E6E] text-white flex-1 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Calendar size={16} className="text-blue-300" />
                <span className="text-xs text-blue-300 font-semibold uppercase tracking-widest">
                  {new Date().toLocaleDateString('fr-MA', { weekday: 'long', day: 'numeric', month: 'long' })}
                </span>
              </div>
              <p className="text-xl font-extrabold leading-snug">
                "Larache, porte de la Méditerranée"
              </p>
              <p className="text-blue-200/70 mt-2 text-sm" style={{ fontFamily: 'serif' }}>
                العرايش، بوابة البحر الأبيض المتوسط
              </p>
            </div>
            <div className="mt-4 pt-4 border-t border-white/10">
              <div className="flex items-center gap-2 text-blue-200 text-xs">
                <TrendingUp size={14} />
                <span>Productivité RH en hausse de <span className="text-emerald-400 font-bold">+12%</span> ce trimestre</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── Sub-components ───────────────────────────────────────────────────────────
function StatCard({ icon, bg, title, value, trend, wide }: any) {
  return (
    <div className={`gov-card p-5 flex items-center gap-3 hover:-translate-y-1 transition-transform duration-300 ${wide ? 'col-span-2 md:col-span-1' : ''}`}>
      <div className={`w-12 h-12 min-w-[48px] flex items-center justify-center rounded-2xl ${bg} shadow-lg`}>
        {icon}
      </div>
      <div className="min-w-0">
        <p className="text-[11px] font-semibold text-slate-500 leading-tight truncate">{title}</p>
        <div className="flex items-end gap-2 mt-0.5">
          <span className="text-2xl font-extrabold text-[#152C4D] leading-none">{value}</span>
        </div>
        <div className="flex items-center gap-1 mt-0.5">
          <ArrowUp size={10} className="text-emerald-500" />
          <span className="text-[10px] text-emerald-600 font-bold">{trend}</span>
        </div>
      </div>
    </div>
  )
}

function ActivityRow({ activity, onNavigate }: { activity: any, onNavigate: () => void }) {
  const initials = activity.name.split(' ').map((w: string) => w[0]).join('').substring(0, 2).toUpperCase()
  return (
    <div
      onClick={activity.employeeId ? onNavigate : undefined}
      className={`flex items-center justify-between py-4 px-3 -mx-1 border-b border-slate-50 last:border-0 rounded-xl transition-colors ${
        activity.employeeId ? 'hover:bg-blue-50/50 cursor-pointer' : 'hover:bg-slate-50/50'
      }`}
    >
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#1E3E6E] to-[#3466A4] flex items-center justify-center text-white font-bold text-sm shadow-sm flex-shrink-0">
          {initials}
        </div>
        <div>
          <p className="text-sm font-bold text-[#152C4D]">{activity.name}</p>
          <p className="text-xs text-slate-500 mt-0.5">{activity.desc}</p>
        </div>
      </div>
      <div className="flex items-center gap-4 flex-shrink-0 ml-4">
        <p className="text-xs text-slate-400 text-right">{activity.time}</p>
        <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold border ${activity.tagColor}`}>
          {activity.tag}
        </span>
        {activity.employeeId && <ChevronRight size={14} className="text-slate-300" />}
      </div>
    </div>
  )
}

export default Dashboard
