import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { api } from '../../lib/api'
import {
  Search, Filter, Plus, MoreVertical, Eye, RefreshCw, X,
  User, Mail, Phone, MapPin, Briefcase, ChevronDown, CheckCircle
} from 'lucide-react'

// ─── Types ────────────────────────────────────────────────────────────────────
interface Employee {
  id: number
  first_name: string
  last_name: string
  cin: string
  email?: string
  grade?: string
  department?: string
  status?: string
  matricule?: string
}

// ─── Main Component ───────────────────────────────────────────────────────────
const EmployeeList = () => {
  const queryClient = useQueryClient()
  const navigate = useNavigate()

  // Filters
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [gradeFilter, setGradeFilter] = useState('all')
  const [showFilters, setShowFilters] = useState(false)

  // Modal
  const [showAddModal, setShowAddModal] = useState(false)
  const [addSuccess, setAddSuccess] = useState(false)
  const [addLoading, setAddLoading] = useState(false)
  const [addError, setAddError] = useState('')
  const [form, setForm] = useState({
    first_name: '', last_name: '', cin: '', email: '',
    grade: '', department: '', status: 'active', phone: '', address: ''
  })

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ['fonctionnaires'],
    queryFn: async () => {
      // Try the fonctionnaires endpoint (actual data in the system)
      const response = await api.get('/fonctionnaires')
      return response.data
    },
    retry: 1,
  })

  const employees: Employee[] = data?.data || data || []

  // Local filter
  const filtered = employees.filter((e: Employee) => {
    const q = search.toLowerCase()
    const matchSearch = !q ||
      `${e.first_name} ${e.last_name}`.toLowerCase().includes(q) ||
      (e.cin || '').toLowerCase().includes(q) ||
      (e.department || '').toLowerCase().includes(q)
    const matchStatus = statusFilter === 'all' || e.status === statusFilter
    const matchGrade = gradeFilter === 'all' || (e.grade || '').toLowerCase().includes(gradeFilter.toLowerCase())
    return matchSearch && matchStatus && matchGrade
  })

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault()
    setAddLoading(true)
    setAddError('')
    try {
      await api.post('/fonctionnaires', form)
      setAddSuccess(true)
      queryClient.invalidateQueries({ queryKey: ['fonctionnaires'] })
      setTimeout(() => { setShowAddModal(false); setAddSuccess(false) }, 1500)
    } catch (err: any) {
      setAddError(err?.response?.data?.message || 'Erreur lors de l\'ajout. Vérifiez les champs.')
    } finally {
      setAddLoading(false)
    }
  }

  const statuses = ['all', 'active', 'conge', 'retraite']
  const grades = ['all', 'Médecin', 'Infirmier', 'Vétérinaire', 'Technicien', 'Administrateur']

  return (
    <div className="animate-slide-up space-y-6">
      
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-extrabold text-[#152C4D] font-heading">Répertoire du Personnel</h1>
          <p className="text-slate-500 mt-1">Gérez l'ensemble du personnel médical, technique et administratif.</p>
        </div>
        <button
          onClick={() => { setShowAddModal(true); setAddError(''); setAddSuccess(false) }}
          className="btn-primary flex items-center gap-2"
        >
          <Plus size={18} />
          Ajouter un agent
        </button>
      </div>

      {/* Search & Filters */}
      <div className="gov-card p-4 space-y-3">
        <div className="flex gap-3 items-center">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={17} />
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Rechercher par nom, CIN, département..."
              className="w-full pl-11 pr-4 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#3466A4]/30 text-sm transition"
            />
          </div>
          <button
            onClick={() => setShowFilters(f => !f)}
            className={`btn-secondary flex items-center gap-2 ${showFilters ? 'bg-blue-50 border-blue-300 text-blue-700' : ''}`}
          >
            <Filter size={16} />
            Filtres avancés
            <ChevronDown size={14} className={`transition-transform ${showFilters ? 'rotate-180' : ''}`} />
          </button>
        </div>

        {/* Advanced Filters Panel */}
        {showFilters && (
          <div className="flex gap-4 pt-2 border-t border-slate-100 flex-wrap">
            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Statut</label>
              <div className="flex gap-2">
                {statuses.map(s => (
                  <button
                    key={s}
                    onClick={() => setStatusFilter(s)}
                    className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all capitalize ${
                      statusFilter === s ? 'bg-[#152C4D] text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {s === 'all' ? 'Tous' : s === 'active' ? 'Actif' : s === 'conge' ? 'En congé' : 'Retraité'}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Grade</label>
              <select
                value={gradeFilter}
                onChange={e => setGradeFilter(e.target.value)}
                className="px-3 py-1.5 text-xs border border-slate-200 rounded-lg focus:outline-none text-slate-700"
              >
                {grades.map(g => <option key={g} value={g}>{g === 'all' ? 'Tous les grades' : g}</option>)}
              </select>
            </div>
            <button
              onClick={() => { setSearch(''); setStatusFilter('all'); setGradeFilter('all') }}
              className="mt-auto text-xs text-red-500 hover:underline font-medium"
            >
              Réinitialiser
            </button>
          </div>
        )}
      </div>

      {/* Data Table */}
      <div className="gov-card overflow-hidden min-h-[420px] relative">
        
        {isLoading && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/80 backdrop-blur-sm z-10 gap-4">
            <RefreshCw className="animate-spin text-[#3466A4]" size={32} />
            <p className="text-[#152C4D] font-bold">Chargement des données...</p>
          </div>
        )}

        {isError && (
          <div className="absolute inset-0 flex flex-col items-center justify-center z-10 gap-4">
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-red-50 flex items-center justify-center mx-auto mb-3">
                <RefreshCw size={28} className="text-red-400" />
              </div>
              <p className="text-red-600 font-bold mb-1">Impossible de charger les données</p>
              <p className="text-slate-400 text-sm mb-4">Vérifiez que le serveur Laravel est démarré sur le port 8000</p>
              <button onClick={() => refetch()} className="btn-primary">Réessayer</button>
            </div>
          </div>
        )}

        <table className="w-full text-left">
          <thead className="bg-slate-50/80 border-b border-slate-200">
            <tr>
              <th className="px-6 py-4 text-xs font-bold text-[#152C4D] uppercase tracking-widest">Agent</th>
              <th className="px-6 py-4 text-xs font-bold text-[#152C4D] uppercase tracking-widest">Grade / Fonction</th>
              <th className="px-6 py-4 text-xs font-bold text-[#152C4D] uppercase tracking-widest">Département</th>
              <th className="px-6 py-4 text-xs font-bold text-[#152C4D] uppercase tracking-widest">Statut</th>
              <th className="px-6 py-4 text-xs font-bold text-[#152C4D] uppercase tracking-widest text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {!isLoading && !isError && filtered.length === 0 && (
              <tr>
                <td colSpan={5} className="text-center py-16 text-slate-400">
                  <User size={40} className="mx-auto mb-3 opacity-30" />
                  <p className="font-semibold">Aucun agent trouvé</p>
                  <p className="text-sm mt-1">Modifiez vos filtres ou ajoutez un nouvel agent.</p>
                </td>
              </tr>
            )}
            {filtered.map((emp: Employee) => (
              <EmployeeRow key={emp.id} emp={emp} onView={() => navigate(`/personnel/${emp.id}`)} />
            ))}
          </tbody>
        </table>

        {filtered.length > 0 && (
          <div className="px-6 py-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span>{filtered.length} agent(s) affiché(s)</span>
            <span className="text-slate-300">Sur {employees.length} au total</span>
          </div>
        )}
      </div>

      {/* ── Add Employee Modal ───────────────────────────────── */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto animate-slide-up">
            <div className="flex items-center justify-between p-6 border-b border-slate-100">
              <div>
                <h2 className="text-xl font-extrabold text-[#152C4D] font-heading">Ajouter un agent</h2>
                <p className="text-sm text-slate-500 mt-0.5">Remplissez les informations professionnelles</p>
              </div>
              <button onClick={() => setShowAddModal(false)} className="w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center transition-colors">
                <X size={18} />
              </button>
            </div>

            {addSuccess ? (
              <div className="flex flex-col items-center justify-center py-16 gap-4">
                <CheckCircle size={56} className="text-emerald-500" />
                <p className="text-xl font-bold text-[#152C4D]">Agent ajouté avec succès!</p>
              </div>
            ) : (
              <form onSubmit={handleAdd} className="p-6 space-y-5">
                {addError && (
                  <div className="bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3 rounded-xl">{addError}</div>
                )}
                <div className="grid grid-cols-2 gap-4">
                  <FormField label="Prénom *" icon={<User size={15}/>}>
                    <input required value={form.first_name} onChange={e => setForm(f => ({...f, first_name: e.target.value}))} placeholder="Prénom" className="form-input" />
                  </FormField>
                  <FormField label="Nom de famille *" icon={<User size={15}/>}>
                    <input required value={form.last_name} onChange={e => setForm(f => ({...f, last_name: e.target.value}))} placeholder="Nom" className="form-input" />
                  </FormField>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <FormField label="CIN *" icon={<Briefcase size={15}/>}>
                    <input required value={form.cin} onChange={e => setForm(f => ({...f, cin: e.target.value}))} placeholder="A123456" className="form-input" />
                  </FormField>
                  <FormField label="Email professionnel" icon={<Mail size={15}/>}>
                    <input type="email" value={form.email} onChange={e => setForm(f => ({...f, email: e.target.value}))} placeholder="agent@larache.ma" className="form-input" />
                  </FormField>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <FormField label="Grade / Fonction *" icon={<Briefcase size={15}/>}>
                    <select required value={form.grade} onChange={e => setForm(f => ({...f, grade: e.target.value}))} className="form-input">
                      <option value="">Sélectionner...</option>
                      {['Médecin', 'Infirmier(ère)', 'Vétérinaire', 'Technicien', 'Administrateur'].map(g => (
                        <option key={g}>{g}</option>
                      ))}
                    </select>
                  </FormField>
                  <FormField label="Département *" icon={<MapPin size={15}/>}>
                    <input required value={form.department} onChange={e => setForm(f => ({...f, department: e.target.value}))} placeholder="Ex: Santé, Vétérinaire..." className="form-input" />
                  </FormField>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <FormField label="Téléphone" icon={<Phone size={15}/>}>
                    <input value={form.phone} onChange={e => setForm(f => ({...f, phone: e.target.value}))} placeholder="+212 6XX-XXXXXX" className="form-input" />
                  </FormField>
                  <FormField label="Statut" icon={<Briefcase size={15}/>}>
                    <select value={form.status} onChange={e => setForm(f => ({...f, status: e.target.value}))} className="form-input">
                      <option value="active">Actif</option>
                      <option value="conge">En congé</option>
                      <option value="retraite">Retraité</option>
                    </select>
                  </FormField>
                </div>
                <FormField label="Adresse" icon={<MapPin size={15}/>}>
                  <input value={form.address} onChange={e => setForm(f => ({...f, address: e.target.value}))} placeholder="Adresse complète" className="form-input" />
                </FormField>

                <div className="flex justify-end gap-3 pt-2">
                  <button type="button" onClick={() => setShowAddModal(false)} className="btn-secondary">Annuler</button>
                  <button type="submit" disabled={addLoading} className="btn-primary flex items-center gap-2">
                    {addLoading ? <RefreshCw size={16} className="animate-spin" /> : <Plus size={16} />}
                    {addLoading ? 'Enregistrement...' : 'Ajouter l\'agent'}
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

// ─── Sub-components ───────────────────────────────────────────────────────────
function EmployeeRow({ emp, onView }: { emp: Employee, onView: () => void }) {
  const statusMap: any = {
    active: { label: 'Actif', cls: 'bg-emerald-50 text-emerald-700 border-emerald-100' },
    conge: { label: 'En congé', cls: 'bg-amber-50 text-amber-700 border-amber-100' },
    retraite: { label: 'Retraité', cls: 'bg-slate-100 text-slate-500 border-slate-200' },
  }
  const s = statusMap[emp.status || 'active'] || statusMap.active

  return (
    <tr className="hover:bg-slate-50/70 transition-colors group cursor-pointer" onClick={onView}>
      <td className="px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#1E3E6E] to-[#3466A4] flex items-center justify-center text-white text-sm font-bold shadow-sm flex-shrink-0">
            {emp.first_name?.charAt(0)}{emp.last_name?.charAt(0)}
          </div>
          <div>
            <p className="font-bold text-[#152C4D] leading-tight">{emp.first_name} {emp.last_name}</p>
            <p className="text-xs text-slate-400 font-mono mt-0.5">CIN: {emp.cin || '—'}</p>
          </div>
        </div>
      </td>
      <td className="px-6 py-4 text-sm text-slate-700 font-medium">{emp.grade || '—'}</td>
      <td className="px-6 py-4 text-sm text-slate-600">{emp.department || '—'}</td>
      <td className="px-6 py-4">
        <span className={`px-3 py-1 rounded-full text-[11px] font-bold border ${s.cls}`}>{s.label}</span>
      </td>
      <td className="px-6 py-4 text-right" onClick={e => e.stopPropagation()}>
        <div className="flex justify-end gap-1.5 opacity-0 group-hover:opacity-100 transition-all">
          <button onClick={onView} title="Voir le profil" className="p-2 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-600 transition-colors">
            <Eye size={16} />
          </button>
          <button title="Plus d'actions" className="p-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors">
            <MoreVertical size={16} />
          </button>
        </div>
      </td>
    </tr>
  )
}

function FormField({ label, icon, children }: { label: string, icon: React.ReactNode, children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-bold text-slate-600 flex items-center gap-1.5">
        <span className="text-slate-400">{icon}</span>{label}
      </label>
      {children}
    </div>
  )
}

export default EmployeeList
