import { useState } from 'react'
import { Plus, Search, AlertTriangle, CheckCircle, Clock, ChevronRight, Stethoscope, Pill, Thermometer } from 'lucide-react'

const CONSULTATIONS = [
  { id: 1, patient: 'Dr. Youssef Fassi', type: 'Bilan annuel', date: '2025-04-20', status: 'normal', notes: 'Aucune anomalie détectée. Apte au service.' },
  { id: 2, patient: 'Inf. Sara Benali', type: 'Contrôle médical', date: '2025-04-18', status: 'suivi', notes: 'Suivi tensionnel recommandé. Réévaluation dans 3 mois.' },
  { id: 3, patient: 'Admin. Mouad Lahlou', type: 'Aptitude au travail', date: '2025-03-30', status: 'inapte', notes: 'Congé médical prescrit pour 30 jours.' },
  { id: 4, patient: 'Inf. Fatima Zitounni', type: 'Bilan annuel', date: '2025-03-15', status: 'normal', notes: 'Aucune anomalie détectée. Apte au service.' },
]

const statusCfg: any = {
  normal: { label: 'Normal', cls: 'bg-emerald-50 text-emerald-700 border-emerald-100', icon: <CheckCircle size={14} className="text-emerald-500" /> },
  suivi: { label: 'Sous suivi', cls: 'bg-amber-50 text-amber-700 border-amber-100', icon: <Clock size={14} className="text-amber-500" /> },
  inapte: { label: 'Inapte', cls: 'bg-red-50 text-red-700 border-red-100', icon: <AlertTriangle size={14} className="text-red-500" /> },
}

export default function Health() {
  const [search, setSearch] = useState('')
  const [tab, setTab] = useState<'consultations' | 'vaccins' | 'absences'>('consultations')

  const filtered = CONSULTATIONS.filter(c =>
    !search || c.patient.toLowerCase().includes(search.toLowerCase()) || c.type.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="animate-slide-up space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-extrabold text-[#152C4D] font-heading">Santé & Médecine du Travail</h1>
          <p className="text-slate-500 mt-1">Suivi médical, aptitudes et vaccination du personnel communal.</p>
        </div>
        <button className="btn-primary flex items-center gap-2"><Plus size={17} /> Nouvelle consultation</button>
      </div>

      <div className="grid grid-cols-4 gap-4">
        {[
          { label: 'Consultations (Jan–Avr)', value: CONSULTATIONS.length, icon: <Stethoscope size={20} className="text-blue-500" />, bg: 'bg-blue-50' },
          { label: 'Agents aptes', value: CONSULTATIONS.filter(c => c.status === 'normal').length, icon: <CheckCircle size={20} className="text-emerald-500" />, bg: 'bg-emerald-50' },
          { label: 'Sous surveillance', value: CONSULTATIONS.filter(c => c.status === 'suivi').length, icon: <AlertTriangle size={20} className="text-amber-500" />, bg: 'bg-amber-50' },
          { label: 'Agents inaptes', value: CONSULTATIONS.filter(c => c.status === 'inapte').length, icon: <Thermometer size={20} className="text-red-500" />, bg: 'bg-red-50' },
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

      <div className="flex gap-1 bg-white rounded-2xl p-1 shadow-sm border border-slate-100 w-fit">
        {[{ key: 'consultations', label: 'Consultations' }, { key: 'vaccins', label: 'Vaccinations' }, { key: 'absences', label: 'Congés médicaux' }].map(t => (
          <button key={t.key} onClick={() => setTab(t.key as any)}
            className={`px-5 py-2.5 rounded-xl text-sm font-bold transition-all ${tab === t.key ? 'bg-[#152C4D] text-white shadow-sm' : 'text-slate-500 hover:text-[#152C4D]'}`}>
            {t.label}
          </button>
        ))}
      </div>

      {tab === 'consultations' && (
        <>
          <div className="gov-card p-4">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
              <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Rechercher un agent ou type de consultation..." className="w-full pl-11 pr-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#3466A4]/30" />
            </div>
          </div>
          <div className="gov-card overflow-hidden">
            <table className="w-full text-left">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  {['Agent', 'Type de consultation', 'Date', 'Résultat', 'Notes', ''].map(h => (
                    <th key={h} className="px-6 py-4 text-xs font-bold text-[#152C4D] uppercase tracking-widest">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filtered.map(c => {
                  const s = statusCfg[c.status]
                  return (
                    <tr key={c.id} className="hover:bg-slate-50 transition-colors">
                      <td className="px-6 py-4 font-bold text-[#152C4D]">{c.patient}</td>
                      <td className="px-6 py-4 text-sm text-slate-600 font-medium">{c.type}</td>
                      <td className="px-6 py-4 text-sm text-slate-500">{new Date(c.date).toLocaleDateString('fr-MA')}</td>
                      <td className="px-6 py-4">
                        <span className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border w-fit ${s.cls}`}>{s.icon}{s.label}</span>
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-500 max-w-xs truncate">{c.notes}</td>
                      <td className="px-6 py-4">
                        <button className="text-xs text-[#3466A4] font-semibold hover:underline flex items-center gap-1">Détails <ChevronRight size={12} /></button>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </>
      )}

      {tab === 'vaccins' && (
        <div className="gov-card p-8 text-center">
          <Pill size={40} className="text-slate-300 mx-auto mb-4" />
          <p className="font-bold text-slate-500">Programme de vaccination en cours de mise en place</p>
          <p className="text-sm text-slate-400 mt-1">Grippe saisonnière, Hépatite B — Campagne prévue pour Juin 2025</p>
        </div>
      )}

      {tab === 'absences' && (
        <div className="gov-card overflow-hidden">
          <div className="p-6 border-b border-slate-100">
            <h3 className="font-bold text-[#152C4D]">Congés médicaux actifs</h3>
          </div>
          <div className="divide-y divide-slate-100">
            {[
              { agent: 'Admin. Mouad Lahlou', start: '2025-04-01', end: '2025-05-01', motif: 'Repos médical prescrit', jours: 30 },
              { agent: 'Inf. Karim Alaoui', start: '2025-04-15', end: '2025-04-22', motif: 'Fracture — Membre inférieur', jours: 7 },
            ].map((c, i) => (
              <div key={i} className="flex items-center justify-between px-6 py-4 hover:bg-slate-50">
                <div>
                  <p className="font-bold text-[#152C4D]">{c.agent}</p>
                  <p className="text-sm text-slate-500 mt-0.5">{c.motif}</p>
                  <p className="text-xs text-slate-400 mt-1">
                    {new Date(c.start).toLocaleDateString('fr-MA')} → {new Date(c.end).toLocaleDateString('fr-MA')}
                  </p>
                </div>
                <span className="px-3 py-1.5 bg-red-50 text-red-700 border border-red-100 rounded-full text-xs font-bold">{c.jours} jours</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
