import { useState } from 'react'
import { User, Bell, Shield, Database, Palette, Save, CheckCircle, Eye, EyeOff } from 'lucide-react'

const TABS = [
  { key: 'compte', label: 'Compte', icon: <User size={16} /> },
  { key: 'notifications', label: 'Notifications', icon: <Bell size={16} /> },
  { key: 'securite', label: 'Sécurité', icon: <Shield size={16} /> },
  { key: 'systeme', label: 'Système', icon: <Database size={16} /> },
  { key: 'apparence', label: 'Apparence', icon: <Palette size={16} /> },
]

export default function Settings() {
  const [activeTab, setActiveTab] = useState('compte')
  const [saved, setSaved] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [notifs, setNotifs] = useState({
    candidatures: true, documents: true, concours: true,
    email: false, sms: false,
  })
  const [account, setAccount] = useState({
    name: 'Direction RH', email: 'rh@larache.ma',
    department: 'Direction des Ressources Humaines',
    phone: '+212 539-XX-XXXX', language: 'fr',
  })

  const handleSave = () => {
    setSaved(true)
    setTimeout(() => setSaved(false), 2500)
  }

  return (
    <div className="animate-slide-up space-y-6">
      <div>
        <h1 className="text-3xl font-extrabold text-[#152C4D] font-heading">Paramètres du système</h1>
        <p className="text-slate-500 mt-1">Configurez votre compte et les préférences de l'application.</p>
      </div>

      <div className="flex gap-6">
        {/* Sidebar Tabs */}
        <div className="w-52 flex-shrink-0">
          <div className="gov-card p-2 space-y-1">
            {TABS.map(t => (
              <button key={t.key} onClick={() => setActiveTab(t.key)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all text-left ${activeTab === t.key ? 'bg-[#152C4D] text-white' : 'text-slate-600 hover:bg-slate-100 hover:text-[#152C4D]'}`}>
                {t.icon} {t.label}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1">
          <div className="gov-card p-8">
            
            {/* ── Compte ── */}
            {activeTab === 'compte' && (
              <div className="space-y-6">
                <h2 className="text-xl font-bold text-[#152C4D] border-b border-slate-100 pb-4">Informations du compte</h2>
                <div className="grid grid-cols-2 gap-5">
                  {[
                    { label: 'Nom complet', key: 'name', placeholder: 'Votre nom' },
                    { label: 'Email', key: 'email', placeholder: 'email@larache.ma', type: 'email' },
                    { label: 'Département', key: 'department', placeholder: 'Département' },
                    { label: 'Téléphone', key: 'phone', placeholder: '+212 XXX-XXXXXX' },
                  ].map(f => (
                    <div key={f.key}>
                      <label className="block text-xs font-bold text-slate-500 mb-1.5 uppercase tracking-wider">{f.label}</label>
                      <input
                        type={f.type || 'text'}
                        value={(account as any)[f.key]}
                        onChange={e => setAccount(a => ({ ...a, [f.key]: e.target.value }))}
                        placeholder={f.placeholder}
                        className="form-input w-full"
                      />
                    </div>
                  ))}
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 mb-1.5 uppercase tracking-wider">Langue</label>
                  <select value={account.language} onChange={e => setAccount(a => ({...a, language: e.target.value}))} className="form-input">
                    <option value="fr">Français</option>
                    <option value="ar">العربية</option>
                  </select>
                </div>
              </div>
            )}

            {/* ── Notifications ── */}
            {activeTab === 'notifications' && (
              <div className="space-y-6">
                <h2 className="text-xl font-bold text-[#152C4D] border-b border-slate-100 pb-4">Préférences de notifications</h2>
                <div className="space-y-4">
                  {[
                    { key: 'candidatures', label: 'Nouvelles candidatures', desc: 'Être notifié à chaque nouvelle candidature reçue' },
                    { key: 'documents', label: 'Documents soumis', desc: 'Alerte lors de l\'upload d\'un document' },
                    { key: 'concours', label: 'Expirations de concours', desc: 'Rappel 48h avant la clôture d\'un concours' },
                    { key: 'email', label: 'Notifications par email', desc: 'Recevoir des emails récapitulatifs' },
                    { key: 'sms', label: 'Notifications SMS', desc: 'Alertes critiques par SMS' },
                  ].map(n => (
                    <div key={n.key} className="flex items-center justify-between py-4 border-b border-slate-50 last:border-0">
                      <div>
                        <p className="font-semibold text-[#152C4D]">{n.label}</p>
                        <p className="text-sm text-slate-400 mt-0.5">{n.desc}</p>
                      </div>
                      <button
                        onClick={() => setNotifs(prev => ({ ...prev, [n.key]: !prev[n.key as keyof typeof prev] }))}
                        className={`relative w-12 h-6 rounded-full transition-colors ${(notifs as any)[n.key] ? 'bg-[#3466A4]' : 'bg-slate-200'}`}
                      >
                        <span className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-all ${(notifs as any)[n.key] ? 'right-1' : 'left-1'}`} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ── Sécurité ── */}
            {activeTab === 'securite' && (
              <div className="space-y-6">
                <h2 className="text-xl font-bold text-[#152C4D] border-b border-slate-100 pb-4">Sécurité du compte</h2>
                <div className="space-y-5">
                  <div>
                    <label className="block text-xs font-bold text-slate-500 mb-1.5 uppercase tracking-wider">Mot de passe actuel</label>
                    <div className="relative">
                      <input type={showPassword ? 'text' : 'password'} placeholder="••••••••" className="form-input w-full pr-12" />
                      <button type="button" onClick={() => setShowPassword(s => !s)} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400">
                        {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                      </button>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-500 mb-1.5 uppercase tracking-wider">Nouveau mot de passe</label>
                      <input type="password" placeholder="Min. 8 caractères" className="form-input w-full" />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-500 mb-1.5 uppercase tracking-wider">Confirmation</label>
                      <input type="password" placeholder="Retaper le mot de passe" className="form-input w-full" />
                    </div>
                  </div>
                  <div className="bg-amber-50 border border-amber-100 rounded-2xl p-4 text-sm text-amber-700">
                    <span className="font-bold">Conseil de sécurité:</span> Utilisez un mot de passe d'au moins 12 caractères, avec des majuscules, chiffres et caractères spéciaux.
                  </div>
                </div>
              </div>
            )}

            {/* ── Système ── */}
            {activeTab === 'systeme' && (
              <div className="space-y-6">
                <h2 className="text-xl font-bold text-[#152C4D] border-b border-slate-100 pb-4">Informations système</h2>
                <div className="space-y-3">
                  {[
                    { label: 'Version HRIS', value: 'v2.0.0 Larache Edition' },
                    { label: 'Backend', value: 'Laravel 11 · PHP 8.3' },
                    { label: 'Frontend', value: 'React 19 · TypeScript · Vite' },
                    { label: 'Base de données', value: 'MySQL 8.0' },
                    { label: 'Authentification', value: 'JWT (tymon/jwt-auth)' },
                    { label: 'Stockage fichiers', value: 'Local · storage/app/documents' },
                    { label: 'Génération PDF', value: 'barryvdh/laravel-dompdf' },
                    { label: 'Serveur API', value: 'http://localhost:8000/api' },
                  ].map((info, i) => (
                    <div key={i} className="flex items-center justify-between py-3 px-4 rounded-xl bg-slate-50 border border-slate-100">
                      <span className="text-sm font-semibold text-slate-500">{info.label}</span>
                      <span className="text-sm font-bold text-[#152C4D] font-mono">{info.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ── Apparence ── */}
            {activeTab === 'apparence' && (
              <div className="space-y-6">
                <h2 className="text-xl font-bold text-[#152C4D] border-b border-slate-100 pb-4">Apparence &amp; Thème</h2>
                <div>
                  <label className="block text-xs font-bold text-slate-500 mb-3 uppercase tracking-wider">Thème de couleur</label>
                  <div className="flex gap-3">
                    {[
                      { name: 'Larache Blue', colors: ['bg-[#152C4D]', 'bg-[#3466A4]'] },
                      { name: 'Forest Green', colors: ['bg-emerald-800', 'bg-emerald-500'] },
                      { name: 'Royal Purple', colors: ['bg-purple-900', 'bg-purple-500'] },
                    ].map((t, i) => (
                      <button key={i} className={`flex flex-col items-center gap-2 p-4 rounded-2xl border-2 transition-all ${i === 0 ? 'border-[#3466A4] shadow-md' : 'border-slate-200 hover:border-slate-300'}`}>
                        <div className="flex gap-1">
                          {t.colors.map((c, j) => <div key={j} className={`w-6 h-6 rounded-full ${c}`} />)}
                        </div>
                        <span className="text-xs font-semibold text-slate-600">{t.name}</span>
                        {i === 0 && <span className="text-[10px] text-blue-600 font-bold">Actif</span>}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 mb-3 uppercase tracking-wider">Densité d'affichage</label>
                  <div className="flex gap-3">
                    {['Compact', 'Normal', 'Spacieux'].map((d, i) => (
                      <button key={i} className={`px-5 py-2.5 rounded-xl text-sm font-bold transition-all ${i === 1 ? 'bg-[#152C4D] text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}>
                        {d}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Save button */}
            <div className="mt-8 pt-6 border-t border-slate-100 flex items-center justify-between">
              {saved && (
                <div className="flex items-center gap-2 text-emerald-600 font-semibold text-sm animate-slide-up">
                  <CheckCircle size={18} /> Paramètres sauvegardés
                </div>
              )}
              <div className="ml-auto flex gap-3">
                <button className="btn-secondary">Réinitialiser</button>
                <button onClick={handleSave} className="btn-primary flex items-center gap-2">
                  <Save size={16} /> Sauvegarder les modifications
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
