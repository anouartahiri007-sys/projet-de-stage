import React, { useState, useEffect } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { api } from '../../lib/api'
import {
  ArrowLeft, Mail, Phone, MapPin, Calendar, Award, TrendingUp,
  RefreshCw, Edit3, Save, X, Briefcase, Shield, FileText,
  Clock, CheckCircle, XCircle, AlertCircle, User
} from 'lucide-react'
import { Link, useParams } from 'react-router-dom'
import WorkflowVisualizer from '../workflows/WorkflowVisualizer'

// ─── Types ────────────────────────────────────────────────────────────────────
type WorkflowStatus = 'completed' | 'current' | 'upcoming' | 'error'

interface EmployeeData {
  id?: number
  first_name?: string
  last_name?: string
  cin?: string
  email?: string
  phone?: string
  address?: string
  birth_date?: string
  grade?: string
  department?: string
  matricule?: string
  status?: string
  recruitment_date?: string
  user?: { name?: string; email?: string }
}

const MOCK_WORKFLOW: { name: string; label: string; status: WorkflowStatus; date?: string }[] = [
  { name: 'initiated',             label: 'Promotion initiée',               status: 'completed', date: 'Oct 12, 2024' },
  { name: 'regional_review',       label: 'Revue Directorate Régionale',      status: 'completed', date: 'Oct 20, 2024' },
  { name: 'provincial_approval',   label: 'Approbation Provinciale',          status: 'current',   date: 'En cours' },
  { name: 'ministry_finalization', label: 'Finalisation Ministère',           status: 'upcoming' },
  { name: 'realized',              label: 'Promotion Réalisée',               status: 'upcoming' },
]

type Tab = 'profil' | 'carriere' | 'documents' | 'historique'

const EmployeeProfile = () => {
  const { id } = useParams()
  const queryClient = useQueryClient()
  const [activeTab, setActiveTab] = useState<Tab>('profil')
  const [editMode, setEditMode] = useState(false)
  const [editData, setEditData] = useState<EmployeeData>({})

  const { data: employee, isLoading, isError } = useQuery<EmployeeData>({
    queryKey: ['fonctionnaire', id],
    queryFn: async () => {
      const res = await api.get(`/fonctionnaires/${id}`)
      return (res.data?.data || res.data) as EmployeeData
    },
    enabled: !!id,
  })

  // Sync editData when employee loads (TanStack Query v5 — no onSuccess)
  useEffect(() => {
    if (employee) setEditData(employee)
  }, [employee])

  const updateMutation = useMutation({
    mutationFn: async (payload: Partial<EmployeeData>) => {
      const res = await api.patch(`/fonctionnaires/${id}`, payload)
      return res.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['fonctionnaire', id] })
      queryClient.invalidateQueries({ queryKey: ['fonctionnaires'] })
      setEditMode(false)
    },
  })

  if (isLoading) return (
    <div className="flex flex-col items-center justify-center h-80 animate-slide-up gap-4">
      <RefreshCw className="animate-spin text-[#3466A4]" size={36} />
      <p className="text-[#152C4D] font-bold">Chargement du dossier...</p>
    </div>
  )

  if (isError || !employee) return (
    <div className="p-8 animate-slide-up">
      <Link to="/personnel" className="inline-flex items-center text-slate-500 hover:text-[#3466A4] mb-6 font-medium gap-2 transition-colors">
        <ArrowLeft size={18} /> Retour au répertoire
      </Link>
      <div className="bg-red-50 border border-red-100 text-red-600 p-8 rounded-2xl text-center">
        <AlertCircle size={36} className="mx-auto mb-3 opacity-60" />
        <p className="font-bold text-lg">Dossier de l'agent non trouvé</p>
        <p className="text-sm text-red-400 mt-1">Vérifiez que l'API /fonctionnaires/{'{id}'} est disponible.</p>
      </div>
    </div>
  )

  const tabs: { key: Tab, label: string, icon: React.ReactNode }[] = [
    { key: 'profil',     label: 'Profil',     icon: <User size={16} /> },
    { key: 'carriere',   label: 'Carrière',   icon: <TrendingUp size={16} /> },
    { key: 'documents',  label: 'Documents',  icon: <FileText size={16} /> },
    { key: 'historique', label: 'Historique', icon: <Clock size={16} /> },
  ]

  const firstName = employee.first_name || employee.user?.name || 'Agent'
  const lastName  = employee.last_name || ''
  const name     = `${firstName} ${lastName}`.trim()
  const initials = `${firstName.charAt(0)}${lastName.charAt(0) || ''}`.toUpperCase()

  return (
    <div className="animate-slide-up space-y-6">
      {/* Back */}
      <Link to="/personnel" className="inline-flex items-center text-slate-500 hover:text-[#3466A4] font-medium gap-2 transition-colors text-sm">
        <ArrowLeft size={16} /> Retour au répertoire du personnel
      </Link>

      {/* Hero Card */}
      <div className="bg-gradient-to-r from-[#152C4D] to-[#1E3E6E] rounded-3xl p-8 text-white relative overflow-hidden shadow-xl">
        <div className="absolute inset-0 bg-cover bg-center opacity-5" style={{ backgroundImage: "url('https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Larache_main_square.jpg/1280px-Larache_main_square.jpg')" }} />
        <div className="relative flex items-center gap-8 flex-wrap">
          {/* Avatar */}
          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-yellow-400 to-yellow-600 flex items-center justify-center text-3xl font-extrabold text-white shadow-xl border-4 border-white/20 flex-shrink-0">
            {initials || 'AG'}
          </div>
          {/* Info */}
          <div className="flex-1 min-w-0">
            <h1 className="text-3xl font-extrabold tracking-tight">{name}</h1>
            <p className="text-blue-200 text-lg mt-1 font-medium">{employee.grade || 'Grade non défini'}</p>
            <div className="flex flex-wrap items-center gap-3 mt-3 text-xs">
              {employee.matricule && <span className="bg-white/10 px-3 py-1 rounded-full font-mono">Mat: {employee.matricule}</span>}
              {employee.cin       && <span className="bg-white/10 px-3 py-1 rounded-full font-mono">CIN: {employee.cin}</span>}
              {employee.department && <span className="bg-white/10 px-3 py-1 rounded-full">{employee.department}</span>}
              <span className={`px-3 py-1 rounded-full font-bold ${
                employee.status === 'active'  ? 'bg-emerald-500/20 text-emerald-300' :
                employee.status === 'conge'   ? 'bg-amber-500/20 text-amber-300' :
                                                'bg-slate-500/20 text-slate-300'
              }`}>
                {employee.status === 'active' ? '● Actif' : employee.status === 'conge' ? '● En congé' : '● Retraité'}
              </span>
            </div>
          </div>
          {/* Edit Actions */}
          <div className="flex flex-col gap-2">
            {!editMode ? (
              <button onClick={() => { setEditMode(true); setEditData(employee) }}
                className="flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-xl text-sm font-medium transition-all border border-white/20">
                <Edit3 size={15} /> Modifier
              </button>
            ) : (
              <div className="flex gap-2 flex-wrap">
                <button onClick={() => updateMutation.mutate(editData)} disabled={updateMutation.isPending}
                  className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded-xl text-sm font-medium transition-all">
                  {updateMutation.isPending ? <RefreshCw size={14} className="animate-spin" /> : <Save size={14} />}
                  Sauvegarder
                </button>
                <button onClick={() => setEditMode(false)}
                  className="flex items-center gap-2 bg-white/10 text-white px-4 py-2 rounded-xl text-sm font-medium">
                  <X size={14} /> Annuler
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-white rounded-2xl p-1 shadow-sm border border-slate-100 w-fit">
        {tabs.map(t => (
          <button key={t.key} onClick={() => setActiveTab(t.key)}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold transition-all ${
              activeTab === t.key ? 'bg-[#152C4D] text-white shadow-sm' : 'text-slate-500 hover:text-[#152C4D] hover:bg-slate-50'
            }`}>
            {t.icon} {t.label}
          </button>
        ))}
      </div>

      {/* ── Profil ─────────────────────────────────────── */}
      {activeTab === 'profil' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="gov-card p-6 space-y-5">
            <h3 className="font-bold text-[#152C4D] text-lg border-b border-slate-100 pb-3">Informations personnelles</h3>
            <ProfileField label="Email professionnel" icon={<Mail size={16} />}
              value={editMode ? editData.email : employee.email} editable={editMode}
              onChange={(v: string) => setEditData(d => ({ ...d, email: v }))} />
            <ProfileField label="Téléphone" icon={<Phone size={16} />}
              value={editMode ? editData.phone : employee.phone} editable={editMode}
              onChange={(v: string) => setEditData(d => ({ ...d, phone: v }))} />
            <ProfileField label="Adresse" icon={<MapPin size={16} />}
              value={editMode ? editData.address : employee.address} editable={editMode}
              onChange={(v: string) => setEditData(d => ({ ...d, address: v }))} placeholder="Adresse de résidence" />
            <ProfileField label="Date de naissance" icon={<Calendar size={16} />}
              value={employee.birth_date ? new Date(employee.birth_date).toLocaleDateString('fr-MA') : '—'}
              editable={false} />
          </div>
          <div className="gov-card p-6 space-y-5">
            <h3 className="font-bold text-[#152C4D] text-lg border-b border-slate-100 pb-3">Informations professionnelles</h3>
            <ProfileField label="Grade / Fonction" icon={<Briefcase size={16} />}
              value={editMode ? editData.grade : employee.grade} editable={editMode}
              onChange={(v: string) => setEditData(d => ({ ...d, grade: v }))} />
            <ProfileField label="Département" icon={<MapPin size={16} />}
              value={editMode ? editData.department : employee.department} editable={editMode}
              onChange={(v: string) => setEditData(d => ({ ...d, department: v }))} />
            <ProfileField label="Matricule" icon={<Shield size={16} />}
              value={employee.matricule || '—'} editable={false} />
            <ProfileField label="Date de recrutement" icon={<Calendar size={16} />}
              value={employee.recruitment_date ? new Date(employee.recruitment_date).toLocaleDateString('fr-MA') : '—'}
              editable={false} />
          </div>
        </div>
      )}

      {/* ── Carrière ────────────────────────────────────── */}
      {activeTab === 'carriere' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <StatCard icon={<Award size={24} className="text-blue-500" />}    label="Échelon actuel"   value="Échelon 3" bg="bg-blue-50" />
            <StatCard icon={<TrendingUp size={24} className="text-emerald-500" />} label="Prochaine promotion" value="Oct 2025"  bg="bg-emerald-50" />
            <StatCard icon={<Calendar size={24} className="text-purple-500" />} label="Années de service" value="8 ans"     bg="bg-purple-50" />
          </div>
          <div className="gov-card p-6">
            <h3 className="font-bold text-[#152C4D] text-lg mb-6 flex items-center gap-2">
              <TrendingUp size={20} className="text-[#3466A4]" />
              Workflow actif : Promotion de grade
              <span className="ml-2 px-2.5 py-0.5 bg-amber-50 text-amber-700 text-[10px] font-bold rounded-full uppercase">En revue</span>
            </h3>
            <WorkflowVisualizer steps={MOCK_WORKFLOW} />
            <div className="mt-8 pt-6 border-t border-slate-100 flex justify-end gap-3">
              <button className="btn-secondary">Voir le journal d'audit</button>
              <button className="btn-primary flex items-center gap-2">
                <CheckCircle size={16} /> Approuver l'étape (Admin)
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Documents ───────────────────────────────────── */}
      {activeTab === 'documents' && (
        <div className="gov-card p-6 space-y-4">
          <h3 className="font-bold text-[#152C4D] text-lg border-b border-slate-100 pb-3">Documents officiels</h3>
          {[
            { name: 'Arrêté de recrutement', date: '2016-01-15', status: 'disponible' },
            { name: 'Attestation de travail 2024', date: '2024-01-01', status: 'disponible' },
            { name: 'Fiche de paie — Mars 2025', date: '2025-03-31', status: 'disponible' },
            { name: 'Contrat de promotion — Échelon 3', date: '2023-07-01', status: 'en_attente' },
          ].map((doc, i) => (
            <div key={i} className="flex items-center justify-between py-3 px-4 rounded-xl hover:bg-slate-50 border border-slate-100 transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center">
                  <FileText size={18} className="text-blue-500" />
                </div>
                <div>
                  <p className="font-semibold text-[#152C4D] text-sm">{doc.name}</p>
                  <p className="text-xs text-slate-400">{new Date(doc.date).toLocaleDateString('fr-MA')}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className={`text-xs font-bold px-3 py-1 rounded-full ${doc.status === 'disponible' ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'}`}>
                  {doc.status === 'disponible' ? '✓ Disponible' : '⏳ En attente'}
                </span>
                {doc.status === 'disponible' && (
                  <button className="text-xs text-blue-600 hover:underline font-medium">Télécharger</button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ── Historique ──────────────────────────────────── */}
      {activeTab === 'historique' && (
        <div className="gov-card p-6">
          <h3 className="font-bold text-[#152C4D] text-lg mb-6">Historique des modifications</h3>
          <div className="relative pl-6 space-y-6 border-l-2 border-slate-100">
            {[
              { label: 'Promotion à l\'échelon 3 approuvée', by: 'Direction RH', date: 'Oct 2023', icon: <CheckCircle size={16} className="text-emerald-500" /> },
              { label: 'Mise à jour des coordonnées personnelles', by: 'Admin Système', date: 'Juin 2023', icon: <Edit3 size={16} className="text-blue-500" /> },
              { label: 'Congé annuel accordé (30 jours)', by: 'Direction RH', date: 'Juil 2022', icon: <AlertCircle size={16} className="text-amber-500" /> },
              { label: 'Dossier de recrutement créé', by: 'Système', date: 'Jan 2016', icon: <XCircle size={16} className="text-slate-400" /> },
            ].map((item, i) => (
              <div key={i} className="relative">
                <div className="absolute -left-9 w-5 h-5 bg-white rounded-full border-2 border-slate-200 flex items-center justify-center">
                  {item.icon}
                </div>
                <p className="font-semibold text-[#152C4D] text-sm">{item.label}</p>
                <p className="text-xs text-slate-400 mt-0.5">Par {item.by} — {item.date}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

// ─── Sub-components ───────────────────────────────────────────────────────────
function ProfileField({ label, icon, value, editable, onChange, placeholder }: {
  label: string, icon: React.ReactNode, value?: string, editable: boolean,
  onChange?: (v: string) => void, placeholder?: string
}) {
  return (
    <div className="flex items-start gap-3">
      <div className="mt-0.5 text-slate-400 flex-shrink-0">{icon}</div>
      <div className="flex-1 min-w-0">
        <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">{label}</p>
        {editable ? (
          <input
            value={value || ''}
            onChange={e => onChange?.(e.target.value)}
            placeholder={placeholder || label}
            className="form-input"
          />
        ) : (
          <p className="text-sm text-[#152C4D] font-semibold truncate">
            {value || <span className="text-slate-300 font-normal italic">Non renseigné</span>}
          </p>
        )}
      </div>
    </div>
  )
}

function StatCard({ icon, label, value, bg }: { icon: React.ReactNode, label: string, value: string, bg: string }) {
  return (
    <div className="gov-card p-5 flex items-center gap-4">
      <div className={`w-12 h-12 ${bg} rounded-xl flex items-center justify-center`}>{icon}</div>
      <div>
        <p className="text-xs text-slate-500 font-semibold uppercase tracking-wider">{label}</p>
        <p className="text-xl font-extrabold text-[#152C4D] mt-0.5">{value}</p>
      </div>
    </div>
  )
}

export default EmployeeProfile
