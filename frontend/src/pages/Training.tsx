import { useState } from 'react'
import { Plus, Calendar, Users, Clock, CheckCircle, BookOpen, Search, ChevronRight } from 'lucide-react'

const FORMATIONS = [
  { id: 1, title: 'Formation en soins intensifs', category: 'Médecine', duration: '3 jours', date: '2025-05-15', participants: 12, status: 'planifie', lieu: 'Centre Hospitalier Larache' },
  { id: 2, title: 'Hygiène et sécurité sanitaire', category: 'Santé publique', duration: '1 jour', date: '2025-04-28', participants: 8, status: 'en_cours', lieu: 'Salle de formation — Commune' },
  { id: 3, title: 'Législation vétérinaire marocaine', category: 'Vétérinaire', duration: '2 jours', date: '2025-03-10', participants: 5, status: 'termine', lieu: 'ONSSA Larache' },
  { id: 4, title: 'Gestion administrative & RH', category: 'Administration', duration: '4 jours', date: '2025-06-02', participants: 15, status: 'planifie', lieu: 'Commune de Larache — Bâtiment A' },
]

const statusCfg: any = {
  planifie: { label: 'Planifiée', cls: 'bg-blue-50 text-blue-700 border-blue-100' },
  en_cours: { label: 'En cours', cls: 'bg-amber-50 text-amber-700 border-amber-100' },
  termine: { label: 'Terminée', cls: 'bg-emerald-50 text-emerald-700 border-emerald-100' },
}

export default function Training() {
  const [search, setSearch] = useState('')
  const [showModal, setShowModal] = useState(false)

  const filtered = FORMATIONS.filter(f =>
    !search || f.title.toLowerCase().includes(search.toLowerCase()) || f.category.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="animate-slide-up space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-extrabold text-[#152C4D] font-heading">Formation & Développement</h1>
          <p className="text-slate-500 mt-1">Planificez et suivez les formations du personnel de la commune.</p>
        </div>
        <button onClick={() => setShowModal(true)} className="btn-primary flex items-center gap-2">
          <Plus size={17} /> Nouvelle formation
        </button>
      </div>

      <div className="grid grid-cols-4 gap-4">
        {[
          { label: 'Formations planifiées', value: FORMATIONS.filter(f => f.status === 'planifie').length, icon: <Calendar size={20} className="text-blue-500" />, bg: 'bg-blue-50' },
          { label: 'En cours', value: FORMATIONS.filter(f => f.status === 'en_cours').length, icon: <Clock size={20} className="text-amber-500" />, bg: 'bg-amber-50' },
          { label: 'Terminées', value: FORMATIONS.filter(f => f.status === 'termine').length, icon: <CheckCircle size={20} className="text-emerald-500" />, bg: 'bg-emerald-50' },
          { label: 'Participants total', value: FORMATIONS.reduce((s, f) => s + f.participants, 0), icon: <Users size={20} className="text-purple-500" />, bg: 'bg-purple-50' },
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

      <div className="gov-card p-4">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Rechercher une formation..." className="w-full pl-11 pr-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#3466A4]/30" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map(f => {
          const s = statusCfg[f.status]
          return (
            <div key={f.id} className="gov-card p-6 hover:-translate-y-1 transition-transform duration-200">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-bold text-[#3466A4] bg-blue-50 px-2.5 py-1 rounded-lg border border-blue-100">{f.category}</span>
                  </div>
                  <h3 className="font-extrabold text-[#152C4D] text-lg leading-tight">{f.title}</h3>
                </div>
                <span className={`ml-3 px-3 py-1 rounded-full text-xs font-bold border flex-shrink-0 ${s.cls}`}>{s.label}</span>
              </div>
              <div className="grid grid-cols-3 gap-3 text-xs text-slate-500 mb-4">
                <span className="flex items-center gap-1.5"><Calendar size={13} /> {new Date(f.date).toLocaleDateString('fr-MA')}</span>
                <span className="flex items-center gap-1.5"><Clock size={13} /> {f.duration}</span>
                <span className="flex items-center gap-1.5"><Users size={13} /> {f.participants} agents</span>
              </div>
              <p className="text-xs text-slate-400 mb-4 flex items-center gap-1.5">
                <BookOpen size={12} /> {f.lieu}
              </p>
              <button className="text-sm font-semibold text-[#3466A4] hover:underline flex items-center gap-1">
                Voir les participants <ChevronRight size={14} />
              </button>
            </div>
          )
        })}
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg animate-slide-up">
            <div className="flex items-center justify-between p-6 border-b border-slate-100">
              <h2 className="text-xl font-extrabold text-[#152C4D]">Planifier une formation</h2>
              <button onClick={() => setShowModal(false)} className="w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center">✕</button>
            </div>
            <div className="p-6 space-y-4">
              {['Titre de la formation', 'Catégorie', 'Lieu', 'Durée'].map(label => (
                <div key={label}>
                  <label className="block text-xs font-bold text-slate-500 mb-1.5 uppercase tracking-wider">{label}</label>
                  <input placeholder={label} className="form-input w-full" />
                </div>
              ))}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-500 mb-1.5 uppercase tracking-wider">Date</label>
                  <input type="date" className="form-input w-full" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 mb-1.5 uppercase tracking-wider">Nb. Participants</label>
                  <input type="number" min="1" placeholder="10" className="form-input w-full" />
                </div>
              </div>
              <div className="flex justify-end gap-3 pt-2">
                <button onClick={() => setShowModal(false)} className="btn-secondary">Annuler</button>
                <button onClick={() => setShowModal(false)} className="btn-primary flex items-center gap-2">
                  <Plus size={15} /> Créer la formation
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
