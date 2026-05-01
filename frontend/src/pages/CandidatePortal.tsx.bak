import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { api } from '../lib/api'
import {
  Search, Plus, CheckCircle, XCircle,
  Calendar, Briefcase, RefreshCw, FileText,
  Users, AlertCircle, ArrowRight
} from 'lucide-react'

interface Concours {
  id: number
  title: string
  department: string
  seats: number
  deadline: string
  status: string
  candidatures_count?: number
}

const statusConfig: any = {
  ouvert: { label: 'Ouvert', cls: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
  ferme: { label: 'Fermé', cls: 'bg-red-50 text-red-700 border-red-200' },
  en_cours: { label: 'En cours', cls: 'bg-blue-50 text-blue-700 border-blue-200' },
  termine: { label: 'Terminé', cls: 'bg-slate-100 text-slate-600 border-slate-200' },
}

export default function Recruitment() {
  const [showModal, setShowModal] = useState(false)
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [form, setForm] = useState({
    title: '', department: '', seats: '', deadline: '',
    description: '', required_documents: '', status: 'ouvert'
  })
  const [saving, setSaving] = useState(false)
  const [saveSuccess, setSaveSuccess] = useState(false)
  const [saveError, setSaveError] = useState('')

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ['concours'],
    queryFn: async () => {
      const res = await api.get('/concours')
      return res.data
    },
  })

  const concours: Concours[] = data?.data || data || []
  const filtered = concours.filter(c => {
    const q = search.toLowerCase()
    const matchSearch = !q || c.title?.toLowerCase().includes(q) || c.department?.toLowerCase().includes(q)
    const matchStatus = statusFilter === 'all' || c.status === statusFilter
    return matchSearch && matchStatus
  })

  const ouvertCount = concours.filter(c => c.status === 'ouvert').length
  const totalCandidatures = concours.reduce((sum, c) => sum + (c.candidatures_count || 0), 0)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true); setSaveError('')
    try {
      await api.post('/concours', { ...form, seats: parseInt(form.seats) })
      setSaveSuccess(true)
      refetch()
      setTimeout(() => { setShowModal(false); setSaveSuccess(false); setForm({ title: '', department: '', seats: '', deadline: '', description: '', required_documents: '', status: 'ouvert' }) }, 1500)
    } catch (err: any) {
      setSaveError(err?.response?.data?.message || 'Erreur lors de la création du concours.')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="animate-slide-up space-y-6">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-extrabold text-[#152C4D] font-heading">Recrutement & Concours</h1>
          <p className="text-slate-500 mt-1">Gérez les concours de recrutement et les candidatures de la commune.</p>
        </div>
        <button onClick={() => setShowModal(true)} className="btn-primary flex items-center gap-2">
          <Plus size={18} /> Nouveau concours
        </button>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: 'Concours ouverts', value: ouvertCount, icon: <CheckCircle size={22} className="text-emerald-500" />, bg: 'bg-emerald-50' },
          { label: 'Total candidatures', value: totalCandidatures, icon: <Users size={22} className="text-blue-500" />, bg: 'bg-blue-50' },
          { label: 'Total concours', value: concours.length, icon: <Briefcase size={22} className="text-purple-500" />, bg: 'bg-purple-50' },
        ].map((s, i) => (
          <div key={i} className="gov-card p-5 flex items-center gap-4">
            <div className={`w-12 h-12 ${s.bg} rounded-2xl flex items-center justify-center`}>{s.icon}</div>
            <div>
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">{s.label}</p>
              <p className="text-2xl font-extrabold text-[#152C4D]">{isLoading ? '—' : s.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="gov-card p-4 flex gap-3 items-center">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Rechercher un concours..." className="w-full pl-11 pr-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#3466A4]/30" />
        </div>
        <div className="flex gap-2">
          {['all', 'ouvert', 'en_cours', 'ferme', 'termine'].map(s => (
            <button key={s} onClick={() => setStatusFilter(s)} className={`px-3 py-2 rounded-xl text-xs font-bold transition-all ${statusFilter === s ? 'bg-[#152C4D] text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}>
              {s === 'all' ? 'Tous' : statusConfig[s]?.label || s}
            </button>
          ))}
        </div>
      </div>

      {/* Concours Grid / List */}
      {isLoading && (
        <div className="flex items-center justify-center h-40 gap-3">
          <RefreshCw className="animate-spin text-[#3466A4]" size={28} />
          <p className="font-semibold text-slate-500">Chargement des concours...</p>
        </div>
      )}

      {isError && (
        <div className="gov-card p-10 text-center">
          <AlertCircle size={36} className="text-red-400 mx-auto mb-3" />
          <p className="font-bold text-red-600 mb-2">Impossible de charger les concours</p>
          <button onClick={() => refetch()} className="btn-secondary">Réessayer</button>
        </div>
      )}

      {!isLoading && !isError && filtered.length === 0 && (
        <div className="gov-card p-14 text-center">
          <Briefcase size={48} className="text-slate-300 mx-auto mb-4" />
          <p className="font-bold text-slate-500 text-lg">Aucun concours trouvé</p>
          <p className="text-slate-400 text-sm mt-1">Créez votre premier concours de recrutement.</p>
          <button onClick={() => setShowModal(true)} className="btn-primary mt-4 inline-flex items-center gap-2">
            <Plus size={16} /> Créer un concours
          </button>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map(c => {
          const s = statusConfig[c.status] || statusConfig.ferme
          const daysLeft = Math.ceil((new Date(c.deadline).getTime() - Date.now()) / 86400000)
          return (
            <div key={c.id} className="gov-card p-6 hover:-translate-y-1 transition-all duration-200">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1 min-w-0">
                  <h3 className="font-extrabold text-[#152C4D] text-lg leading-tight">{c.title}</h3>
                  <p className="text-slate-500 text-sm mt-1">{c.department}</p>
                </div>
                <span className={`ml-3 px-3 py-1 rounded-full text-xs font-bold border flex-shrink-0 ${s.cls}`}>{s.label}</span>
              </div>
              <div className="flex items-center gap-4 text-xs text-slate-500 mb-5">
                <span className="flex items-center gap-1.5"><Users size={13} /> {c.seats} postes</span>
                <span className="flex items-center gap-1.5"><Calendar size={13} /> Clôture: {new Date(c.deadline).toLocaleDateString('fr-MA')}</span>
                {daysLeft > 0 && daysLeft < 30 && <span className="text-amber-600 font-semibold">⚠ {daysLeft}j restants</span>}
                {c.candidatures_count !== undefined && <span className="flex items-center gap-1.5"><FileText size={13} /> {c.candidatures_count} candidatures</span>}
              </div>
              <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                <button className="text-sm font-semibold text-[#3466A4] hover:underline flex items-center gap-1">
                  Voir les candidatures <ArrowRight size={14} />
                </button>
                {c.status === 'ouvert' && (
                  <span className="text-xs text-emerald-600 font-medium flex items-center gap-1">
                    <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" /> Accepte des candidatures
                  </span>
                )}
              </div>
            </div>
          )
        })}
      </div>

      {/* ── Modal: Nouveau concours ─── */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-xl max-h-[90vh] overflow-y-auto animate-slide-up">
            <div className="flex items-center justify-between p-6 border-b border-slate-100">
              <h2 className="text-xl font-extrabold text-[#152C4D]">Créer un nouveau concours</h2>
              <button onClick={() => setShowModal(false)} className="w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center">
                <XCircle size={18} />
              </button>
            </div>
            {saveSuccess ? (
              <div className="flex flex-col items-center justify-center py-16">
                <CheckCircle size={52} className="text-emerald-500 mb-3" />
                <p className="text-xl font-bold text-[#152C4D]">Concours créé avec succès!</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="p-6 space-y-4">
                {saveError && <div className="bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3 rounded-xl">{saveError}</div>}
                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1.5">Intitulé du concours *</label>
                  <input required value={form.title} onChange={e => setForm(f => ({...f, title: e.target.value}))} placeholder="Ex: Concours de recrutement — Médecin Généraliste" className="form-input w-full" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-600 mb-1.5">Département *</label>
                    <input required value={form.department} onChange={e => setForm(f => ({...f, department: e.target.value}))} placeholder="Ex: Santé Publique" className="form-input w-full" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-600 mb-1.5">Postes disponibles *</label>
                    <input required type="number" min="1" value={form.seats} onChange={e => setForm(f => ({...f, seats: e.target.value}))} placeholder="3" className="form-input w-full" />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1.5">Date limite de candidature *</label>
                  <input required type="date" value={form.deadline} onChange={e => setForm(f => ({...f, deadline: e.target.value}))} className="form-input w-full" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1.5">Description</label>
                  <textarea rows={3} value={form.description} onChange={e => setForm(f => ({...f, description: e.target.value}))} placeholder="Conditions, profil recherché..." className="form-input w-full resize-none" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1.5">Statut</label>
                  <select value={form.status} onChange={e => setForm(f => ({...f, status: e.target.value}))} className="form-input w-full">
                    <option value="ouvert">Ouvert</option>
                    <option value="en_cours">En cours</option>
                    <option value="ferme">Fermé</option>
                  </select>
                </div>
                <div className="flex justify-end gap-3 pt-2">
                  <button type="button" onClick={() => setShowModal(false)} className="btn-secondary">Annuler</button>
                  <button type="submit" disabled={saving} className="btn-primary flex items-center gap-2">
                    {saving ? <RefreshCw size={15} className="animate-spin" /> : <Plus size={15} />}
                    {saving ? 'Création...' : 'Créer le concours'}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
