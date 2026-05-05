import { useState, useEffect } from 'react';
import {
  User, Shield, Bell, Database, Globe,
  Palette, Layout, Minimize2, Check,
  RefreshCw, Save, Smartphone, Lock
} from 'lucide-react';
import { toast } from 'react-hot-toast';
import { useLang } from '../context/LangContext';

const TABS = (t: any) => [
  { key: 'profil', label: t('myProfile'), icon: <User size={18} /> },
  { key: 'apparence', label: t('appearance'), icon: <Palette size={18} /> },
  { key: 'notifications', label: t('notifications'), icon: <Bell size={18} /> },
  { key: 'securite', label: t('security'), icon: <Shield size={18} /> },
  { key: 'systeme', label: t('system'), icon: <Database size={18} /> },
];

const THEMES = (t: any) => [
  { id: 'Emerald City', label: 'Vert Émeraude', primary: '#0D9488', accent: '#0D9488', bg: '#F0FDFA', desc: 'Thème officiel E-RH' },
  { id: 'Forest Green', label: 'Vert Forêt', primary: '#064E3B', accent: '#10B981', bg: '#D1FAE5', desc: 'Naturel & apaisant' },
  { id: 'Royal Purple', label: 'Violet Royal', primary: '#4C1D95', accent: '#8B5CF6', bg: '#EDE9FE', desc: 'Moderne & distingué' },
  { id: 'Ocean Blue', label: 'Bleu Océan', primary: '#1E3E6E', accent: '#3466A4', bg: '#F1F5F9', desc: 'Sérieux & professionnel' },
];

const DENSITIES = (t: any) => [
  { id: 'Compact', label: 'Compact', icon: <Minimize2 size={15} />, desc: 'Plus de données visibles' },
  { id: 'Normal', label: 'Normal', icon: <Layout size={15} />, desc: 'Équilibre parfait' },
];

export default function Settings() {
  const { t, lang, setLang } = useLang();
  const [activeTab, setActiveTab] = useState('apparence');
  const [theme, setTheme] = useState('Emerald City');
  const [density, setDensity] = useState('Normal');
  const [loading, setLoading] = useState(false);
  const [account, setAccount] = useState({
    name: 'Souad El Idrissi',
    email: 'souad.idrissi@commune-larache.ma',
    role: 'Administrateur RH',
    department: 'Division des Ressources Humaines',
    twoFactor: true
  });

  const handleSave = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast.success(t('success'));
    }, 800);
  };

  return (
    <div className="animate-slide-up space-y-6 pb-12" dir={lang === 'ar' ? 'rtl' : 'ltr'}>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className={lang === 'ar' ? 'text-right' : 'text-left'}>
          <h1 className="text-3xl font-black text-[#1E3E6E] dark:text-white tracking-tight">{t('settings')}</h1>
          <p className="text-slate-500 mt-1 font-medium italic">{t('settingsDesc')}</p>
        </div>
        <button
          onClick={handleSave}
          disabled={loading}
          className="bg-[#0d5e3f] hover:bg-[#0a4a31] text-white flex items-center gap-2 px-6 py-2.5 rounded-xl font-bold shadow-xl shadow-emerald-900/10 active:scale-95 transition-transform"
        >
          {loading ? <RefreshCw size={18} className="animate-spin" /> : <Save size={18} />}
          {loading ? t('saving') || 'Enregistrement...' : t('save') || 'Sauvegarder'}
        </button>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        <div className="lg:w-64 shrink-0">
          <div className="gov-card p-2 space-y-1">
            {TABS(t).map(tab => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${activeTab === tab.key ? 'bg-[#1E3E6E] text-white shadow-lg' : 'text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800'}`}
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
                <div className={`flex items-center gap-4 mb-8 ${lang === 'ar' ? 'flex-row' : 'flex-row-reverse'}`}>
                  <div className="p-3 rounded-2xl bg-teal-50 text-teal-600"><Palette size={24} /></div>
                  <div className={lang === 'ar' ? 'text-right' : 'text-left'}>
                    <h2 className="text-xl font-bold text-slate-800 dark:text-white">{t('visualCustomization')}</h2>
                    <p className="text-slate-500 dark:text-slate-400 text-xs mt-1 font-medium">{t('visualCustomizationDesc')}</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className={lang === 'ar' ? 'text-right' : 'text-left'}>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.18em] mb-4">{t('colorTheme')}</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {THEMES(t).map(t_theme => (
                        <button
                          key={t_theme.id}
                          onClick={() => { setTheme(t_theme.id); toast.success(`Thème ${t_theme.label} appliqué ✨`) }}
                          className={`flex flex-col p-4 rounded-2xl border-2 transition-all text-right group ${theme === t_theme.id ? 'border-[#0d5e3f] bg-teal-50/10' : 'border-slate-100 hover:border-slate-200'}`}
                        >
                          <div className={`flex justify-between items-center mb-3 ${lang === 'ar' ? 'flex-row-reverse' : 'flex-row'}`}>
                            {theme === t_theme.id ? <Check size={14} className="text-teal-600" /> : <div className="w-3 h-3 rounded-full" style={{ backgroundColor: t_theme.primary }} />}
                          </div>
                          <p className="text-xs font-black text-slate-800 dark:text-white">{t_theme.label}</p>
                          <p className="text-[10px] text-slate-400 font-bold mt-1">{t_theme.desc}</p>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className={lang === 'ar' ? 'text-right' : 'text-left'}>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.18em] mb-4">{t('displayDensity')}</p>
                    <div className="space-y-3">
                      {DENSITIES(t).map(d => (
                        <button
                          key={d.id}
                          onClick={() => { setDensity(d.id); toast.success(`Mode ${d.label} activé`) }}
                          className={`w-full flex items-center gap-4 p-4 rounded-2xl border-2 transition-all ${density === d.id ? 'border-[#0d5e3f] bg-teal-50/10' : 'border-slate-100 hover:border-slate-200'}`}
                        >
                          <div className={`p-2 rounded-lg ${density === d.id ? 'bg-teal-600 text-white' : 'bg-slate-100 text-slate-400'}`}>{d.icon}</div>
                          <div className={lang === 'ar' ? 'text-right' : 'text-left'}>
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
              <div className={`flex items-center gap-4 mb-8 ${lang === 'ar' ? 'flex-row' : 'flex-row-reverse'}`}>
                <div className="p-3 rounded-2xl bg-indigo-50 text-indigo-600"><User size={24} /></div>
                <div className={lang === 'ar' ? 'text-right' : 'text-left'}>
                  <h2 className="text-xl font-bold text-slate-800 dark:text-white">{t('accountInfo')}</h2>
                  <p className="text-slate-500 dark:text-slate-400 text-xs mt-1 font-medium">{t('accountInfoDesc')}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  { label: t('fullName'), key: 'name', placeholder: 'Votre nom et prénom' },
                  { label: t('professionalEmail'), key: 'email', placeholder: 'email@commune.ma' },
                  { label: t('department'), key: 'department', placeholder: 'Ex: Division RH' },
                  { label: t('phone'), key: 'phone', placeholder: '+212 6XX-XXXXXX' },
                ].map(field => (
                  <div key={field.key} className={`space-y-2 ${lang === 'ar' ? 'text-right' : 'text-left'}`}>
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">{field.label}</label>
                    <input
                      type="text"
                      defaultValue={(account as any)[field.key]}
                      className={`form-input w-full ${lang === 'ar' ? 'text-right' : 'text-left'}`}
                      placeholder={field.placeholder}
                    />
                  </div>
                ))}

                <div className={`space-y-2 ${lang === 'ar' ? 'text-right' : 'text-left'}`}>
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">{t('interfaceLanguage')}</label>
                  <select
                    value={lang}
                    onChange={e => { const lng = e.target.value as any; setLang(lng); toast.success(lng === 'ar' ? 'تم تغيير اللغة' : 'Langue modifiée') }}
                    className={`form-input w-full appearance-none bg-slate-50 ${lang === 'ar' ? 'text-right' : 'text-left'}`}
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
                <div className={`flex items-center gap-4 mb-8 ${lang === 'ar' ? 'flex-row' : 'flex-row-reverse'}`}>
                  <div className="p-3 rounded-2xl bg-red-50 text-red-600"><Shield size={24} /></div>
                  <div className={lang === 'ar' ? 'text-right' : 'text-left'}>
                    <h2 className="text-xl font-bold text-slate-800 dark:text-white">{t('accountSecurity')}</h2>
                    <p className="text-slate-500 dark:text-slate-400 text-xs mt-1 font-medium">{t('accountSecurityDesc')}</p>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className={`flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100 ${lang === 'ar' ? 'flex-row' : 'flex-row-reverse'}`}>
                    <div className="flex items-center gap-4">
                      <div className="p-2 bg-white rounded-xl shadow-sm text-slate-400"><Smartphone size={20} /></div>
                      <div className={lang === 'ar' ? 'text-right' : 'text-left'}>
                        <p className="text-sm font-bold text-slate-800">{t('twoFactorAuth')}</p>
                        <p className="text-[10px] text-slate-400 font-bold">{t('twoFactorAuthDesc')}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => setAccount(a => ({ ...a, twoFactor: !a.twoFactor }))}
                      className={`w-12 h-6 rounded-full relative transition-all ${account.twoFactor ? 'bg-emerald-500' : 'bg-slate-200'}`}
                    >
                      <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${account.twoFactor ? (lang === 'ar' ? 'left-1' : 'right-7') : (lang === 'ar' ? 'left-7' : 'right-1')}`} />
                    </button>
                  </div>

                  <div className={`flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100 ${lang === 'ar' ? 'flex-row' : 'flex-row-reverse'}`}>
                    <div className="flex items-center gap-4">
                      <div className="p-2 bg-white rounded-xl shadow-sm text-slate-400"><Lock size={20} /></div>
                      <div className={lang === 'ar' ? 'text-right' : 'text-left'}>
                        <p className="text-sm font-bold text-slate-800">{t('changePassword')}</p>
                        <p className="text-[10px] text-slate-400 font-bold">{t('lastModified')} : il y a 3 mois</p>
                      </div>
                    </div>
                    <button className="text-xs font-black text-indigo-600 hover:underline uppercase tracking-widest">{lang === 'ar' ? 'تعديل' : 'Modifier'}</button>
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
