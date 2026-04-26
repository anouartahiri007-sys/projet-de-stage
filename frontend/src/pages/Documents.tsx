import { useState } from 'react'
import {
  FolderOpen, Upload, Search, Download, FileText,
  File, Image, Trash2, Eye, CheckCircle, RefreshCw, X
} from 'lucide-react'

const MOCK_DOCUMENTS = [
  { id: 1, name: 'Arrêté de recrutement — Dr. Fassi', type: 'pdf', size: '245 KB', date: '2024-01-15', category: 'arrete', agent: 'Dr. Youssef Fassi' },
  { id: 2, name: 'Attestation de travail 2024 — Benali', type: 'pdf', size: '128 KB', date: '2024-03-01', category: 'attestation', agent: 'Sara Benali' },
  { id: 3, name: 'CIN — Ahmed Tazi', type: 'image', size: '1.2 MB', date: '2023-12-20', category: 'cin', agent: 'Ahmed Tazi' },
  { id: 4, name: 'Diplôme Médecine — Dr. Karimi', type: 'pdf', size: '3.4 MB', date: '2023-11-10', category: 'diplome', agent: 'Dr. Lina Karimi' },
  { id: 5, name: 'Contrat de promotion — Echelon 4', type: 'pdf', size: '198 KB', date: '2024-02-28', category: 'arrete', agent: 'Mouad Lahlou' },
  { id: 6, name: 'Rapport médical annuel 2024', type: 'pdf', size: '512 KB', date: '2024-04-01', category: 'rapport', agent: 'Service Santé' },
]

const CATEGORIES = [
  { key: 'all', label: 'Tous' },
  { key: 'arrete', label: 'Arrêtés' },
  { key: 'attestation', label: 'Attestations' },
  { key: 'cin', label: 'CIN / ID' },
  { key: 'diplome', label: 'Diplômes' },
  { key: 'rapport', label: 'Rapports' },
]

const typeIcon = (type: string) => {
  if (type === 'pdf') return <FileText size={20} className="text-red-500" />
  if (type === 'image') return <Image size={20} className="text-blue-500" />
  return <File size={20} className="text-slate-400" />
}

export default function Documents() {
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('all')
  const [showUpload, setShowUpload] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [uploadSuccess, setUploadSuccess] = useState(false)
  const [dragOver, setDragOver] = useState(false)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [docCategory, setDocCategory] = useState('attestation')

  const documents = MOCK_DOCUMENTS.filter(d => {
    const q = search.toLowerCase()
    const matchSearch = !q || d.name.toLowerCase().includes(q) || d.agent.toLowerCase().includes(q)
    const matchCat = category === 'all' || d.category === category
    return matchSearch && matchCat
  })

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedFile) return
    setUploading(true)
    await new Promise(r => setTimeout(r, 1500)) // simulate upload
    setUploadSuccess(true)
    setUploading(false)
    setTimeout(() => { setShowUpload(false); setUploadSuccess(false); setSelectedFile(null) }, 1500)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setDragOver(false)
    const file = e.dataTransfer.files[0]
    if (file) setSelectedFile(file)
  }

  return (
    <div className="animate-slide-up space-y-6">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-extrabold text-[#152C4D] font-heading">Gestion des Documents</h1>
          <p className="text-slate-500 mt-1">Archivage et gestion des documents administratifs et officiels.</p>
        </div>
        <button onClick={() => setShowUpload(true)} className="btn-primary flex items-center gap-2">
          <Upload size={17} /> Uploader un document
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4">
        {[
          { label: 'Total documents', value: MOCK_DOCUMENTS.length, color: 'text-blue-600', bg: 'bg-blue-50' },
          { label: 'Arrêtés officiels', value: MOCK_DOCUMENTS.filter(d => d.category === 'arrete').length, color: 'text-emerald-600', bg: 'bg-emerald-50' },
          { label: 'Attestations', value: MOCK_DOCUMENTS.filter(d => d.category === 'attestation').length, color: 'text-purple-600', bg: 'bg-purple-50' },
          { label: 'Taille totale', value: '5.7 MB', color: 'text-orange-600', bg: 'bg-orange-50' },
        ].map((s, i) => (
          <div key={i} className="gov-card p-5 flex items-center gap-3">
            <div className={`w-10 h-10 ${s.bg} rounded-xl flex items-center justify-center`}>
              <FolderOpen size={20} className={s.color} />
            </div>
            <div>
              <p className="text-xs font-semibold text-slate-500">{s.label}</p>
              <p className={`text-2xl font-extrabold ${s.color}`}>{s.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Category Tabs + Search */}
      <div className="gov-card p-4 space-y-3">
        <div className="flex gap-2 flex-wrap">
          {CATEGORIES.map(c => (
            <button key={c.key} onClick={() => setCategory(c.key)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${category === c.key ? 'bg-[#152C4D] text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}>
              {c.label}
            </button>
          ))}
        </div>
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Rechercher un document ou un agent..." className="w-full pl-11 pr-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#3466A4]/30" />
        </div>
      </div>

      {/* Documents List */}
      <div className="gov-card overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              <th className="px-6 py-4 text-xs font-bold text-[#152C4D] uppercase tracking-widest">Document</th>
              <th className="px-6 py-4 text-xs font-bold text-[#152C4D] uppercase tracking-widest">Agent</th>
              <th className="px-6 py-4 text-xs font-bold text-[#152C4D] uppercase tracking-widest">Catégorie</th>
              <th className="px-6 py-4 text-xs font-bold text-[#152C4D] uppercase tracking-widest">Taille</th>
              <th className="px-6 py-4 text-xs font-bold text-[#152C4D] uppercase tracking-widest">Date</th>
              <th className="px-6 py-4 text-xs font-bold text-[#152C4D] uppercase tracking-widest text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {documents.length === 0 ? (
              <tr><td colSpan={6} className="text-center py-16 text-slate-400">
                <FolderOpen size={40} className="mx-auto mb-3 opacity-30" />
                <p className="font-semibold">Aucun document trouvé</p>
              </td></tr>
            ) : documents.map(doc => (
              <tr key={doc.id} className="hover:bg-slate-50 transition-colors group">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center">{typeIcon(doc.type)}</div>
                    <div>
                      <p className="font-semibold text-[#152C4D] text-sm">{doc.name}</p>
                      <p className="text-xs text-slate-400 uppercase mt-0.5">{doc.type}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-slate-600 font-medium">{doc.agent}</td>
                <td className="px-6 py-4">
                  <span className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-bold border border-blue-100 capitalize">{doc.category}</span>
                </td>
                <td className="px-6 py-4 text-sm text-slate-500 font-mono">{doc.size}</td>
                <td className="px-6 py-4 text-sm text-slate-500">{new Date(doc.date).toLocaleDateString('fr-MA')}</td>
                <td className="px-6 py-4">
                  <div className="flex justify-end gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button title="Prévisualiser" className="p-2 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-600 transition-colors"><Eye size={15} /></button>
                    <button title="Télécharger" className="p-2 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-600 transition-colors"><Download size={15} /></button>
                    <button title="Supprimer" className="p-2 rounded-lg bg-red-50 hover:bg-red-100 text-red-500 transition-colors"><Trash2 size={15} /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Upload Modal */}
      {showUpload && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg animate-slide-up">
            <div className="flex items-center justify-between p-6 border-b border-slate-100">
              <h2 className="text-xl font-extrabold text-[#152C4D]">Uploader un document</h2>
              <button onClick={() => { setShowUpload(false); setSelectedFile(null) }} className="w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center">
                <X size={18} />
              </button>
            </div>
            {uploadSuccess ? (
              <div className="flex flex-col items-center justify-center py-16 gap-3">
                <CheckCircle size={52} className="text-emerald-500" />
                <p className="text-xl font-bold text-[#152C4D]">Document uploadé avec succès!</p>
              </div>
            ) : (
              <form onSubmit={handleUpload} className="p-6 space-y-5">
                <div
                  onDragOver={e => { e.preventDefault(); setDragOver(true) }}
                  onDragLeave={() => setDragOver(false)}
                  onDrop={handleDrop}
                  className={`border-2 border-dashed rounded-2xl p-10 text-center transition-all ${dragOver ? 'border-blue-400 bg-blue-50' : 'border-slate-200 hover:border-blue-300'}`}
                >
                  {selectedFile ? (
                    <div className="flex flex-col items-center gap-2">
                      <FileText size={36} className="text-emerald-500" />
                      <p className="font-bold text-[#152C4D]">{selectedFile.name}</p>
                      <p className="text-xs text-slate-400">{(selectedFile.size / 1024 / 1024).toFixed(2)} MB</p>
                      <button type="button" onClick={() => setSelectedFile(null)} className="text-xs text-red-500 hover:underline">Supprimer</button>
                    </div>
                  ) : (
                    <>
                      <Upload size={36} className="text-slate-300 mx-auto mb-3" />
                      <p className="font-semibold text-slate-600 mb-1">Glisser-déposer un fichier ici</p>
                      <p className="text-xs text-slate-400 mb-3">PDF, JPG, PNG — max 5 MB</p>
                      <label className="btn-secondary cursor-pointer text-sm">
                        <span>Parcourir...</span>
                        <input type="file" className="hidden" accept=".pdf,.jpg,.jpeg,.png" onChange={e => setSelectedFile(e.target.files?.[0] || null)} />
                      </label>
                    </>
                  )}
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1.5">Catégorie</label>
                  <select value={docCategory} onChange={e => setDocCategory(e.target.value)} className="form-input w-full">
                    {CATEGORIES.filter(c => c.key !== 'all').map(c => <option key={c.key} value={c.key}>{c.label}</option>)}
                  </select>
                </div>
                <div className="flex justify-end gap-3">
                  <button type="button" onClick={() => setShowUpload(false)} className="btn-secondary">Annuler</button>
                  <button type="submit" disabled={!selectedFile || uploading} className="btn-primary flex items-center gap-2">
                    {uploading ? <RefreshCw size={15} className="animate-spin" /> : <Upload size={15} />}
                    {uploading ? 'Upload en cours...' : 'Uploader le document'}
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
