import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLang } from '../context/LangContext';
import { toast } from 'react-hot-toast';
import { 
  Plus, 
  UserPlus, 
  FileText, 
  CheckCircle2, 
  Clock, 
  Search, 
  Filter, 
  Mail 
} from 'lucide-react';

const CANDIDATES = (t: any) => [
  { id: 1, name: 'Amine Alaoui', position: t('nurse') || 'Infirmier', date: '2025-05-10', status: 'interview', email: 'a.alaoui@gmail.com' },
  { id: 2, name: 'Siham Berrada', position: t('doctor') || 'Médecin', date: '2025-05-12', status: 'new', email: 'siham.berr@outlook.com' },
  { id: 3, name: 'Omar Jabri', position: 'Technicien', date: '2025-05-08', status: 'rejected', email: 'o.jabri@yahoo.fr' },
];

const Recruitment = () => {
  const { t, lang } = useLang();
  const navigate = useNavigate();
  const [search, setSearch] = useState('');

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'interview': return t('interview');
      case 'new': return t('new');
      case 'rejected': return t('rejected');
      default: return status;
    }
  };

  const handleHireCandidate = (candidate: any) => {
    toast.success(lang === 'ar' ? `بدء إجراءات توظيف ${candidate.name}` : `Démarrage de la procédure de recrutement pour ${candidate.name}`);
    // Navigate to the Act creation page with recruitment type
    // We can pass candidate info via state or query params if the form supports it
    navigate('/rh/acts/create/recrutement', { state: { selectedCandidate: candidate } });
  };

  const handleContactCandidate = (candidate: any) => {
    toast.success(lang === 'ar' ? `تم إرسال بريد إلكتروني إلى ${candidate.name}` : `Email envoyé à ${candidate.name}`);
  };

  return (
    <div className="animate-slide-up space-y-6 pb-12" dir={lang === 'ar' ? 'rtl' : 'ltr'}>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className={lang === 'ar' ? 'text-right' : 'text-left'}>
          <h1 className="text-3xl font-extrabold text-[#1E3E6E] dark:text-white font-heading">{t('recruitmentManagement')}</h1>
          <p className="text-slate-500 mt-1 font-medium italic">{t('recruitmentDesc')}</p>
        </div>
        <button className="bg-[#0d5e3f] hover:bg-[#0a4a31] text-white flex items-center gap-2 px-5 py-2.5 rounded-lg font-bold shadow-lg shadow-emerald-900/10 active:scale-95 transition-all">
          <Plus size={18} /> {t('launchConcours')}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: t('candidatesMonth'), value: '154', icon: <UserPlus size={20} className="text-blue-500" />, bg: 'bg-blue-50' },
          { label: t('openConcours'), value: '3', icon: <FileText size={20} className="text-amber-500" />, bg: 'bg-amber-50' },
          { label: t('openPositions'), value: '12', icon: <CheckCircle2 size={20} className="text-emerald-500" />, bg: 'bg-emerald-50' },
          { label: t('avgTime'), value: '45j', icon: <Clock size={20} className="text-purple-500" />, bg: 'bg-purple-50' },
        ].map((kpi, i) => (
          <div key={i} className={`gov-card p-6 flex flex-col group hover:scale-[1.02] transition-transform ${lang === 'ar' ? 'text-right' : 'text-left'}`}>
            <div className={`p-3 rounded-xl w-fit mb-4 ${kpi.bg}`}>{kpi.icon}</div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">{kpi.label}</p>
            <p className="text-2xl font-black text-slate-800 dark:text-white mt-1">{kpi.value}</p>
          </div>
        ))}
      </div>

      <div className="gov-card overflow-hidden">
        <div className={`p-6 border-b border-slate-100 flex items-center justify-between ${lang === 'ar' ? 'flex-row' : 'flex-row-reverse'}`}>
          <h2 className="text-lg font-bold text-slate-800 dark:text-white">{t('pendingApplications')}</h2>
          <div className="flex gap-4">
            <div className="relative w-72 group">
              <Search className={`absolute ${lang === 'ar' ? 'right-4' : 'left-4'} top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors`} size={18} />
              <input 
                placeholder={t('searchCandidate')} 
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className={`w-full bg-white border border-slate-200 rounded-xl py-3 text-xs focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all ${lang === 'ar' ? 'pr-12 pl-4 text-right' : 'pl-12 pr-4 text-left'}`} 
              />
            </div>
            <button className="p-2 border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors"><Filter size={20} className="text-slate-400" /></button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className={`w-full ${lang === 'ar' ? 'text-right' : 'text-left'}`}>
            <thead>
              <tr className="bg-slate-50/50">
                {[t('candidate'), t('targetPosition'), t('submissionDate'), t('status'), t('actions')].map(h => (
                  <th key={h} className="p-4 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {CANDIDATES(t).filter(c => c.name.toLowerCase().includes(search.toLowerCase())).map(c => (
                <tr key={c.id} className="hover:bg-slate-50/30 transition-colors">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-slate-100 border-2 border-white flex items-center justify-center font-bold text-slate-400">{c.name.charAt(0)}</div>
                      <div>
                        <p className="text-sm font-bold text-slate-700">{c.name}</p>
                        <p className="text-[10px] text-slate-400 font-medium">{c.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 text-sm text-slate-600 font-bold">{c.position}</td>
                  <td className="p-4 text-xs text-slate-400 font-bold">{c.date}</td>
                  <td className="p-4">
                    <span className={`text-[10px] font-black uppercase px-2.5 py-1 rounded-lg border ${
                      c.status === 'interview' ? 'bg-blue-50 text-blue-700 border-blue-100' :
                      c.status === 'new' ? 'bg-amber-50 text-amber-700 border-amber-100' :
                      'bg-red-50 text-red-700 border-red-100'
                    }`}>
                      {getStatusLabel(c.status)}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center justify-center gap-2">
                      <button 
                        onClick={() => handleContactCandidate(c)}
                        className="p-2 hover:bg-slate-100 rounded-lg text-slate-400 hover:text-blue-600 transition-colors"
                        title={lang === 'ar' ? 'اتصال' : 'Contacter'}
                      >
                        <Mail size={16} />
                      </button>
                      <button 
                        onClick={() => handleHireCandidate(c)}
                        className="p-2 hover:bg-slate-100 rounded-lg text-slate-400 hover:text-emerald-600 transition-colors"
                        title={lang === 'ar' ? 'توظيف' : 'Recruter'}
                      >
                        <CheckCircle2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Recruitment;
