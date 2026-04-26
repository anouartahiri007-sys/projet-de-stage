import { useState } from 'react'
import { TrendingUp, Users, UserPlus, FileText, PawPrint, HeartPulse, Download, RefreshCw } from 'lucide-react'

const STATS = {
  personnel: [
    { month: 'Jan', count: 1190 }, { month: 'Fév', count: 1205 }, { month: 'Mar', count: 1220 },
    { month: 'Avr', count: 1250 }, { month: 'Mai', count: 1265 }, { month: 'Juin', count: 1284 },
  ],
  recrutements: [5, 8, 3, 12, 7, 5],
  departments: [
    { name: 'Médecine Générale', count: 312, color: '#3B82F6' },
    { name: 'Infirmiers & Soins', count: 642, color: '#10B981' },
    { name: 'Vétérinaires', count: 58, color: '#0D9488' },
    { name: 'Administration', count: 272, color: '#8B5CF6' },
  ]
}

const maxCount = Math.max(...STATS.personnel.map(p => p.count))

export default function Reports() {
  const [period, setPeriod] = useState<'6m' | '12m' | 'ytd'>('6m')
  const [loading, setLoading] = useState(false)

  const handleExport = () => {
    setLoading(true)
    setTimeout(() => setLoading(false), 1500)
  }

  return (
    <div className="animate-slide-up space-y-6">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-extrabold text-[#152C4D] font-heading">Rapports & Statistiques</h1>
          <p className="text-slate-500 mt-1">Tableau de bord analytique des ressources humaines de la commune.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex bg-white rounded-xl border border-slate-200 overflow-hidden">
            {(['6m', '12m', 'ytd'] as const).map(p => (
              <button key={p} onClick={() => setPeriod(p)} className={`px-4 py-2 text-xs font-bold transition-all ${period === p ? 'bg-[#152C4D] text-white' : 'text-slate-500 hover:bg-slate-50'}`}>
                {p === '6m' ? '6 mois' : p === '12m' ? '12 mois' : 'Cette année'}
              </button>
            ))}
          </div>
          <button onClick={handleExport} className="btn-primary flex items-center gap-2">
            {loading ? <RefreshCw size={15} className="animate-spin" /> : <Download size={15} />}
            Exporter PDF
          </button>
        </div>
      </div>

      {/* KPI Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Total effectif', value: '1 284', icon: <Users size={22} className="text-blue-500" />, bg: 'bg-blue-50', trend: '+3.2%', positive: true },
          { label: 'Recrutements (6m)', value: '40', icon: <UserPlus size={22} className="text-emerald-500" />, bg: 'bg-emerald-50', trend: '+12%', positive: true },
          { label: 'Documents générés', value: '156', icon: <FileText size={22} className="text-purple-500" />, bg: 'bg-purple-50', trend: '+8%', positive: true },
          { label: 'Taux d\'activité', value: '94.2%', icon: <TrendingUp size={22} className="text-orange-500" />, bg: 'bg-orange-50', trend: '+1.1%', positive: true },
        ].map((kpi, i) => (
          <div key={i} className="gov-card p-5 flex items-center gap-4">
            <div className={`w-12 h-12 ${kpi.bg} rounded-2xl flex items-center justify-center flex-shrink-0`}>{kpi.icon}</div>
            <div>
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider leading-tight">{kpi.label}</p>
              <p className="text-2xl font-extrabold text-[#152C4D] leading-tight mt-0.5">{kpi.value}</p>
              <span className="text-[11px] font-bold text-emerald-600">↑ {kpi.trend}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Bar Chart: Évolution du personnel */}
        <div className="lg:col-span-8 gov-card p-6">
          <h2 className="text-lg font-bold text-[#152C4D] mb-6">Évolution du personnel — 6 derniers mois</h2>
          <div className="flex items-end gap-4 h-48">
            {STATS.personnel.map((p, i) => {
              const height = Math.round((p.count / maxCount) * 100)
              return (
                <div key={i} className="flex-1 flex flex-col items-center gap-2">
                  <span className="text-xs font-bold text-[#152C4D]">{p.count.toLocaleString()}</span>
                  <div className="w-full relative group cursor-pointer">
                    <div
                      style={{ height: `${height * 1.6}px` }}
                      className="w-full bg-gradient-to-t from-[#152C4D] to-[#3466A4] rounded-t-lg hover:from-[#1E3E6E] hover:to-[#3B82F6] transition-all duration-300 shadow-sm"
                    />
                  </div>
                  <span className="text-xs text-slate-500 font-medium">{p.month}</span>
                </div>
              )
            })}
          </div>
        </div>

        {/* Donut-style: Répartition par département */}
        <div className="lg:col-span-4 gov-card p-6">
          <h2 className="text-lg font-bold text-[#152C4D] mb-6">Répartition par corps</h2>
          <div className="space-y-4">
            {STATS.departments.map((dept, i) => {
              const total = STATS.departments.reduce((s, d) => s + d.count, 0)
              const pct = Math.round((dept.count / total) * 100)
              return (
                <div key={i}>
                  <div className="flex justify-between mb-1.5">
                    <span className="text-sm font-semibold text-slate-600">{dept.name}</span>
                    <span className="text-sm font-bold text-[#152C4D]">{dept.count} ({pct}%)</span>
                  </div>
                  <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                    <div style={{ width: `${pct}%`, backgroundColor: dept.color }} className="h-full rounded-full transition-all duration-700" />
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Tables section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent recruitments */}
        <div className="gov-card p-6">
          <h2 className="text-lg font-bold text-[#152C4D] mb-4">Recrutements récents</h2>
          <div className="space-y-3">
            {['Dr. Yasmine Berrada', 'Inf. Hassan El Fassi', 'Dr. Vet. Khalid Ziani', 'Admin. Sofia Taha'].map((name, i) => (
              <div key={i} className="flex items-center justify-between py-2.5 border-b border-slate-50 last:border-0">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#1E3E6E] to-[#3466A4] flex items-center justify-center text-white text-xs font-bold">
                    {name.charAt(0)}
                  </div>
                  <span className="font-semibold text-[#152C4D] text-sm">{name}</span>
                </div>
                <span className="text-xs text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full font-bold border border-emerald-100">Avr 2025</span>
              </div>
            ))}
          </div>
        </div>

        {/* Service performance */}
        <div className="gov-card p-6">
          <h2 className="text-lg font-bold text-[#152C4D] mb-4">Performance par service</h2>
          <div className="space-y-3">
            {[
              { name: 'Service de Médecine', score: 94, icon: <HeartPulse size={16} className="text-red-500" /> },
              { name: 'Service Vétérinaire', score: 88, icon: <PawPrint size={16} className="text-teal-500" /> },
              { name: 'Direction Administrative', score: 91, icon: <FileText size={16} className="text-blue-500" /> },
              { name: 'Service Infirmier', score: 96, icon: <Users size={16} className="text-purple-500" /> },
            ].map((svc, i) => (
              <div key={i} className="flex items-center gap-3 py-2">
                <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center">{svc.icon}</div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-semibold text-[#152C4D] truncate">{svc.name}</span>
                    <span className="text-sm font-bold text-emerald-600 ml-2">{svc.score}%</span>
                  </div>
                  <div className="w-full h-2 bg-slate-100 rounded-full">
                    <div style={{ width: `${svc.score}%` }} className="h-full bg-gradient-to-r from-[#3466A4] to-[#10B981] rounded-full" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
