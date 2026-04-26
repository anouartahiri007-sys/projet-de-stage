import { useState } from 'react'
import { TrendingUp, Award, Star, ChevronRight, Plus, Target, CheckCircle } from 'lucide-react'

const AGENTS = [
  { id: 1, name: 'Dr. Youssef Fassi', grade: 'Médecin Chef', echelon: 4, nextPromo: '2025-10-01', performance: 96, status: 'active' },
  { id: 2, name: 'Inf. Sara Benali', grade: 'Infirmière Diplômée', echelon: 2, nextPromo: '2026-03-01', performance: 88, status: 'active' },
  { id: 3, name: 'Dr. Vet. Tâhir Lahrech', grade: 'Vétérinaire Principal', echelon: 3, nextPromo: '2025-07-01', performance: 91, status: 'active' },
  { id: 4, name: 'Admin. Nawal Chafik', grade: 'Attaché Municipal', echelon: 1, nextPromo: '2027-01-01', performance: 79, status: 'active' },
]

export default function Career() {
  const [activeTab, setActiveTab] = useState<'evaluations' | 'promotions' | 'objectifs'>('evaluations')

  const upcomingPromos = AGENTS.filter(a => {
    const days = Math.ceil((new Date(a.nextPromo).getTime() - Date.now()) / 86400000)
    return days < 180
  })

  return (
    <div className="animate-slide-up space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-extrabold text-[#152C4D] font-heading">Carrière & Évaluation</h1>
          <p className="text-slate-500 mt-1">Gestion des promotions, évaluations annuelles et plans de carrière du personnel.</p>
        </div>
        <button className="btn-primary flex items-center gap-2">
          <Plus size={17} /> Nouvelle évaluation
        </button>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-4 gap-4">
        {[
          { label: 'Promotions à venir', value: upcomingPromos.length, icon: <TrendingUp size={20} className="text-blue-500" />, bg: 'bg-blue-50' },
          { label: 'Évaluations annuelles', value: '18', icon: <Star size={20} className="text-yellow-500" />, bg: 'bg-yellow-50' },
          { label: 'Objectifs atteints', value: '76%', icon: <Target size={20} className="text-emerald-500" />, bg: 'bg-emerald-50' },
          { label: 'Score moyen', value: '88.5', icon: <Award size={20} className="text-purple-500" />, bg: 'bg-purple-50' },
        ].map((k, i) => (
          <div key={i} className="gov-card p-5 flex items-center gap-4">
            <div className={`w-11 h-11 ${k.bg} rounded-xl flex items-center justify-center`}>{k.icon}</div>
            <div>
              <p className="text-xs font-semibold text-slate-500 leading-tight">{k.label}</p>
              <p className="text-2xl font-extrabold text-[#152C4D]">{k.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-white rounded-2xl p-1 shadow-sm border border-slate-100 w-fit">
        {[
          { key: 'evaluations', label: 'Évaluations' },
          { key: 'promotions', label: 'Promotions' },
          { key: 'objectifs', label: 'Objectifs' },
        ].map(t => (
          <button key={t.key} onClick={() => setActiveTab(t.key as any)}
            className={`px-5 py-2.5 rounded-xl text-sm font-bold transition-all ${activeTab === t.key ? 'bg-[#152C4D] text-white shadow-sm' : 'text-slate-500 hover:text-[#152C4D]'}`}>
            {t.label}
          </button>
        ))}
      </div>

      {/* Evaluations Tab */}
      {activeTab === 'evaluations' && (
        <div className="gov-card overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                {['Agent', 'Grade / Fonction', 'Échelon', 'Performance', 'Prochaine Promo', 'Action'].map(h => (
                  <th key={h} className="px-6 py-4 text-xs font-bold text-[#152C4D] uppercase tracking-widest">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {AGENTS.map(agent => {
                const daysLeft = Math.ceil((new Date(agent.nextPromo).getTime() - Date.now()) / 86400000)
                const perf = agent.performance
                return (
                  <tr key={agent.id} className="hover:bg-slate-50/70 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#1E3E6E] to-[#3466A4] flex items-center justify-center text-white font-bold text-sm">
                          {agent.name.charAt(0)}
                        </div>
                        <span className="font-bold text-[#152C4D]">{agent.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-600 font-medium">{agent.grade}</td>
                    <td className="px-6 py-4">
                      <span className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-bold border border-blue-100">
                        Échelon {agent.echelon}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div className="w-24 h-2 bg-slate-100 rounded-full overflow-hidden">
                          <div style={{ width: `${perf}%` }} className={`h-full rounded-full ${perf >= 90 ? 'bg-emerald-500' : perf >= 75 ? 'bg-blue-500' : 'bg-amber-500'}`} />
                        </div>
                        <span className="text-sm font-bold text-[#152C4D]">{perf}%</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`text-xs font-semibold ${daysLeft < 90 ? 'text-amber-600' : 'text-slate-500'}`}>
                        {daysLeft < 90 ? `⚠ ${daysLeft}j` : new Date(agent.nextPromo).toLocaleDateString('fr-MA')}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <button className="text-xs font-bold text-[#3466A4] hover:underline flex items-center gap-1">
                        Évaluer <ChevronRight size={12} />
                      </button>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* Promotions Tab */}
      {activeTab === 'promotions' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {upcomingPromos.length === 0 ? (
            <div className="col-span-2 gov-card p-12 text-center">
              <CheckCircle size={40} className="text-emerald-400 mx-auto mb-3" />
              <p className="font-bold text-slate-600">Aucune promotion imminente</p>
            </div>
          ) : upcomingPromos.map(agent => {
            const daysLeft = Math.ceil((new Date(agent.nextPromo).getTime() - Date.now()) / 86400000)
            return (
              <div key={agent.id} className="gov-card p-6 flex items-center justify-between hover:-translate-y-0.5 transition-transform">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#1E3E6E] to-[#3466A4] flex items-center justify-center text-white font-bold text-lg">
                    {agent.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-bold text-[#152C4D]">{agent.name}</p>
                    <p className="text-sm text-slate-500">{agent.grade} — Échelon {agent.echelon} → {agent.echelon + 1}</p>
                    <p className="text-xs text-amber-600 font-semibold mt-1">⏱ {daysLeft} jours restants</p>
                  </div>
                </div>
                <button className="btn-primary text-xs py-2">Préparer arrêté</button>
              </div>
            )
          })}
        </div>
      )}

      {/* Objectifs Tab */}
      {activeTab === 'objectifs' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {AGENTS.map(agent => (
            <div key={agent.id} className="gov-card p-6">
              <div className="flex items-center gap-3 mb-5 pb-4 border-b border-slate-100">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#1E3E6E] to-[#3466A4] flex items-center justify-center text-white font-bold">
                  {agent.name.charAt(0)}
                </div>
                <div>
                  <p className="font-bold text-[#152C4D]">{agent.name}</p>
                  <p className="text-xs text-slate-400">{agent.grade}</p>
                </div>
                <span className="ml-auto text-lg font-extrabold text-emerald-600">{agent.performance}%</span>
              </div>
              <div className="space-y-3">
                {['Ponctualité & présence', 'Qualité du service rendu', 'Travail en équipe', 'Formation continue'].map((obj, i) => {
                  const val = Math.min(100, agent.performance + (i % 2 === 0 ? 2 : -5))
                  return (
                    <div key={i}>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="font-medium text-slate-600">{obj}</span>
                        <span className="font-bold text-[#152C4D]">{val}%</span>
                      </div>
                      <div className="w-full h-1.5 bg-slate-100 rounded-full">
                        <div style={{ width: `${val}%` }} className="h-full bg-[#3466A4] rounded-full transition-all duration-700" />
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
