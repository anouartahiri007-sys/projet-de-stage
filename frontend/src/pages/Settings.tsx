import { useState, useEffect } from 'react';
import { 
  User, Shield, Bell, Database, Globe, 
  Palette, Layout, Minimize2, Check, 
  RefreshCw, Save, Smartphone, Lock
} from 'lucide-react';
import { toast } from 'react-hot-toast';
import { useTranslation } from 'react-i18next';

const TABS = [
  { key: 'profil',   label: 'Mon Profil', icon: <User size={18} /> },
  { key: 'apparence', label: 'Apparence', icon: <Palette size={18} /> },
  { key: 'notifications', label: 'Notifications', icon: <Bell size={18} /> },
  { key: 'securite', label: 'Sécurité', icon: <Shield size={18} /> },
  { key: 'systeme', label: 'Système', icon: <Database size={18} /> },
];

const THEMES = [
  { id: 'Emerald City', label: 'Vert Émeraude', primary: '#0D9488', accent: '#0D9488', bg: '#F0FDFA', desc: 'Thème officiel E-RH' },
  { id: 'Forest Green', label: 'Vert Forêt',  primary: '#064E3B', accent: '#10B981', bg: '#D1FAE5', desc: 'Naturel & apaisant' },
  { id: 'Royal Purple', label: 'Violet Royal', primary: '#4C1D95', accent: '#8B5CF6', bg: '#EDE9FE', desc: 'Moderne & distingué' },
  { id: 'Ocean Blue',   label: 'Bleu Océan',  primary: '#1E3E6E', accent: '#3466A4', bg: '#F1F5F9', desc: 'Sérieux & professionnel' },
];

const DENSITIES = [
  { id: 'Compact',  label: 'Compact',  icon: <Minimize2 size={15} />, desc: 'Plus de données visibles' },
  { id: 'Normal',   label: 'Normal',   icon: <Layout    size={15} />, desc: 'Équilibre parfait' },
];

export default function Settings() {
  const { i18n } = useTranslation();
  const [activeTab, setActiveTab] = useState('apparence');
  const [theme, setTheme] = useState('Emerald City');
  const [density, setDensity] = useState('Normal');
  const [loading, setLoading] = useState(false);
  const [account, setAccount] = useState({
    name: 'Souad El Idrissi',
    email: 'souad.idrissi@commune-larache.ma',
    role: 'Administrateur RH',
    department: 'Division des Ressources Humaines',
    language: i18n.language || 'fr',
    twoFactor: true
  });

  const handleSave = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast.success('Paramètres sauvegardés !');
    }, 800);
  };

  return (
    <div className="animate-slide-up space-y-6 pb-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-black text-[var(--primary-main)] dark:text-white tracking-tight">Paramètres</h1>
          <p className="text-slate-500 mt-1 font-medium italic">Personnalisez votre espace de travail et gérez vos préférences.</p>
        </div>
        <button 
          onClick={handleSave}
          disabled={loading}
          className="btn-primary flex items-center gap-2 px-6 py-2.5 shadow-xl shadow-emerald-900/10 active:scale-95 transition-transform"
        >
          {loading ? <RefreshCw size={18} className="animate-spin" /> : <Save size={18} />}
          {loading ? 'Enregistrement...' : 'Sauvegarder'}
        </button>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        <div className="lg:w-64 shrink-0">
          <div className="gov-card p-2 space-y-1">
            {TABS.map(tab => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${activeTab === tab.key ? 'bg-[var(--primary-main)] text-white shadow-lg' : 'text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800'}`}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        <div className="flex-1 space-y-6">
          {activeTab === 'apparence' && (
            <div className="space-y-6">
              <div className="gov-card p-8">
                <div className="flex items-center gap-4 mb-8">
                  <div className="p-3 rounded-2xl bg-teal-50 text-teal-600"><Palette size={24} /></div>
                  <div>
                    <h2 className="text-xl font-bold text-slate-800 dark:text-white">Personnalisation visuelle</h2>
                    <p className="text-slate-500 dark:text-slate-400 text-xs mt-1 font-medium">Les changements s'appliquent instantanément sur toute l'application</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.18em] mb-4">Thème de couleur</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {THEMES.map(t => (
                        <button 
                          key={t.id}
                          onClick={() => { setTheme(t.id); toast.success(`Thème ${t.label} appliqué ✨`) }}
                          className={`flex flex-col p-4 rounded-2xl border-2 transition-all text-right group ${theme === t.id ? 'border-[var(--primary-main)] bg-teal-50/10' : 'border-slate-100 hover:border-slate-200'}`}
                        >
                          <div className="flex justify-between items-center mb-3">
                            {theme === t.id ? <Check size={14} className="text-teal-600" /> : <div className="w-3 h-3 rounded-full" style={{ backgroundColor: t.primary }} />}
                          </div>
                          <p className="text-xs font-black text-slate-800 dark:text-white">{t.label}</p>
                          <p className="text-[10px] text-slate-400 font-bold mt-1">{t.desc}</p>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.18em] mb-4">Densité d'affichage</p>
                    <div className="space-y-3">
                      {DENSITIES.map(d => (
                        <button 
                          key={d.id}
                          onClick={() => { setDensity(d.id); toast.success(`Mode ${d.label} activé`) }}
                          className={`w-full flex items-center gap-4 p-4 rounded-2xl border-2 transition-all ${density === d.id ? 'border-[var(--primary-main)] bg-teal-50/10' : 'border-slate-100 hover:border-slate-200'}`}
                        >
                          <div className={`p-2 rounded-lg ${density === d.id ? 'bg-teal-600 text-white' : 'bg-slate-100 text-slate-400'}`}>{d.icon}</div>
                          <div className="text-right">
                            <p className="text-xs font-black text-slate-800 dark:text-white">{d.label}</p>
                            <p className="text-[10px] text-slate-400 font-bold">{d.desc}</p>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'profil' && (
            <div className="gov-card p-8">
              <div className="flex items-center gap-4 mb-8">
                <div className="p-3 rounded-2xl bg-indigo-50 text-indigo-600"><User size={24} /></div>
                <div>
                  <h2 className="text-xl font-bold text-slate-800 dark:text-white">Informations du compte</h2>
                  <p className="text-slate-500 dark:text-slate-400 text-xs mt-1 font-medium">Coordonnées et préférences de votre compte administratif</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  { label: 'Nom complet', key: 'name', placeholder: 'Votre nom et prénom' },
                  { label: 'Email professionnel', key: 'email', placeholder: 'email@commune.ma' },
                  { label: 'Département', key: 'department', placeholder: 'Ex: Division RH' },
                  { label: 'Téléphone', key: 'phone', placeholder: '+212 6XX-XXXXXX' },
                ].map(field => (
                  <div key={field.key} className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">{field.label}</label>
                    <input 
                      type="text" 
                      defaultValue={(account as any)[field.key]}
                      className="form-input w-full"
                      placeholder={field.placeholder}
                    />
                  </div>
                ))}

                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Langue de l'interface</label>
                  <select 
                    value={account.language}
                    onChange={e => { const lng = e.target.value; setAccount(a => ({...a, language: lng})); i18n.changeLanguage(lng); toast.success(lng === 'ar' ? 'تم تغيير اللغة' : 'Langue modifiée') }}
                    className="form-input w-full appearance-none bg-slate-50"
                  >
                    <option value="fr">Français (officiel)</option>
                    <option value="ar">العربية (الأم)</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'securite' && (
            <div className="space-y-6">
              <div className="gov-card p-8">
                <div className="flex items-center gap-4 mb-8">
                  <div className="p-3 rounded-2xl bg-red-50 text-red-600"><Shield size={24} /></div>
                  <div>
                    <h2 className="text-xl font-bold text-slate-800 dark:text-white">Sécurité du compte</h2>
                    <p className="text-slate-500 dark:text-slate-400 text-xs mt-1 font-medium">Protégez votre accès aux données sensibles du RH</p>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100">
                    <div className="flex items-center gap-4">
                      <div className="p-2 bg-white rounded-xl shadow-sm text-slate-400"><Smartphone size={20} /></div>
                      <div>
                        <p className="text-sm font-bold text-slate-800">Authentification à deux facteurs (2FA)</p>
                        <p className="text-[10px] text-slate-400 font-bold">Ajoute une couche de sécurité via SMS ou App</p>
                      </div>
                    </div>
                    <button 
                      onClick={() => setAccount(a => ({...a, twoFactor: !a.twoFactor}))}
                      className={`w-12 h-6 rounded-full relative transition-all ${account.twoFactor ? 'bg-emerald-500' : 'bg-slate-200'}`}
                    >
                      <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${account.twoFactor ? 'right-7' : 'right-1'}`} />
                    </button>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100">
                    <div className="flex items-center gap-4">
                      <div className="p-2 bg-white rounded-xl shadow-sm text-slate-400"><Lock size={20} /></div>
                      <div>
                        <p className="text-sm font-bold text-slate-800">Changer le mot de passe</p>
                        <p className="text-[10px] text-slate-400 font-bold">Dernière modification : il y a 3 mois</p>
                      </div>
                    </div>
                    <button className="text-xs font-black text-indigo-600 hover:underline uppercase tracking-widest">Modifier</button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
