import React, { useState, useEffect } from 'react';
import { 
  FileText, Plus, Search, Filter, Eye, Download, 
  CheckCircle2, Clock, AlertCircle, MoreVertical,
  History, FileSignature, ChevronRight, ArrowRight
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { api } from '../../../lib/api';
import { useLang } from '../../../context/LangContext';
import { toast } from 'react-hot-toast';

const AdministrativeActs = () => {
  const navigate = useNavigate();
  const { t, lang } = useLang();
  const [acts, setActs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetchActs();
  }, []);

  const fetchActs = async () => {
    try {
      const res = await api.get('/administrative-acts');
      setActs(res.data);
    } catch (err) {
      toast.error(t('fetchError'));
    } finally {
      setLoading(false);
    }
  };

  const getStatusStyle = (status: string) => {
    switch (status) {
      case 'installed': return { bg: 'bg-emerald-50 text-emerald-700 border-emerald-100', icon: <CheckCircle2 size={12} />, label: t('installed') || 'معتمد' };
      case 'validated': return { bg: 'bg-blue-50 text-blue-700 border-blue-100', icon: <FileSignature size={12} />, label: t('validated') || 'مصادق عليه' };
      default: return { bg: 'bg-amber-50 text-amber-700 border-amber-100', icon: <Clock size={12} />, label: t('draft') || 'مسودة' };
    }
  };

  const handleDownloadPdf = async (id: number, type: string) => {
    const toastId = toast.loading(lang === 'ar' ? 'جاري تحضير الملف...' : 'Préparation du PDF...');
    try {
      const response = await api.get(`/administrative-acts/${id}/pdf`, {
        responseType: 'blob'
      });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `${type}_${id}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.parentNode?.removeChild(link);
      toast.success(lang === 'ar' ? 'تم التحميل' : 'Téléchargé', { id: toastId });
    } catch (error) {
      toast.error(lang === 'ar' ? 'فشل تحميل الملف' : 'Erreur lors du téléchargement', { id: toastId });
    }
  };

  const handleInstall = async (id: number) => {
    if (!window.confirm(lang === 'ar' ? 'هل أنت متأكد من اعتماد هذا القرار؟' : 'Confirmer l\'installation de cet acte ?')) return;
    
    const toastId = toast.loading(lang === 'ar' ? 'جاري الاعتماد...' : 'Installation en cours...');
    try {
      await api.post(`/administrative-acts/${id}/install`);
      toast.success(lang === 'ar' ? 'تم الاعتماد بنجاح' : 'Acte installé avec succès', { id: toastId });
      fetchActs();
    } catch (error) {
      toast.error(lang === 'ar' ? 'فشل الاعتماد' : 'Erreur d\'installation', { id: toastId });
    }
  };

  return (
    <div className="animate-premium-in space-y-10 pb-20" dir={lang === 'ar' ? 'rtl' : 'ltr'}>
      
      {/* Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8">
        <div>
          <h1 className="text-4xl font-black text-[#003366] tracking-tight uppercase">
             {t('administrativeActs')}
          </h1>
          <nav className="flex items-center gap-3 text-xs font-black text-slate-400 mt-3 uppercase tracking-widest">
            <span className="hover:text-[#006241] cursor-pointer transition-colors">{t('dashboard')}</span>
            <ChevronRight size={14} className={lang === 'ar' ? 'rotate-180' : ''} />
            <span className="text-[#C5A059]">{t('administrativeActs')}</span>
          </nav>
        </div>
        
        <button
          onClick={() => navigate('/rh/acts/new')}
          className="btn-primary"
        >
          <Plus size={20} />
          {lang === 'ar' ? 'إنشاء قرار جديد' : 'Nouveau Décision'}
        </button>
      </div>

      {/* Stats Quick Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
         {[
           { label: lang === 'ar' ? 'إجمالي القرارات' : 'Total Décisions', count: acts.length, color: 'blue', icon: <FileText size={24} /> },
           { label: lang === 'ar' ? 'قرارات معتمدة' : 'Décisions Installées', count: acts.filter(a => a.status === 'installed').length, color: 'emerald', icon: <CheckCircle2 size={24} /> },
           { label: lang === 'ar' ? 'مسودات قيد المعالجة' : 'Brouillons', count: acts.filter(a => a.status === 'draft').length, color: 'amber', icon: <History size={24} /> },
         ].map((stat, i) => (
           <div key={i} className="gov-card p-8 flex items-center justify-between group">
              <div>
                 <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{stat.label}</p>
                 <p className="text-3xl font-black text-[#003366]">{stat.count}</p>
              </div>
              <div className={`p-4 rounded-2xl bg-${stat.color}-50 text-${stat.color}-600 group-hover:scale-110 transition-transform`}>
                 {stat.icon}
              </div>
           </div>
         ))}
      </div>

      {/* Table Container */}
      <div className="gov-card overflow-hidden">
        <div className="p-10 border-b border-gray-50 bg-gray-50/30 flex flex-col lg:flex-row justify-between items-center gap-8">
           <div className="relative w-full lg:w-96 group">
              <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-[#C5A059] transition-colors" size={20} />
              <input 
                type="text" 
                placeholder={lang === 'ar' ? 'بحث عن قرار...' : 'Rechercher un acte...'}
                className="input-gov pl-14"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
           </div>
           
           <div className="flex items-center gap-4">
              <button className="flex items-center gap-3 px-6 py-4 bg-white border border-gray-100 rounded-2xl text-slate-500 font-bold hover:bg-gray-50 transition-all shadow-sm">
                 <Filter size={18} />
                 <span>{t('filter')}</span>
              </button>
           </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#F8FAFC]">
                <th className="px-10 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">{lang === 'ar' ? 'نوع القرار' : 'Type Acte'}</th>
                <th className="px-10 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">{lang === 'ar' ? 'المعني بالأمر' : 'Bénéficiaire'}</th>
                <th className="px-10 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">{lang === 'ar' ? 'الإصدار' : 'Version'}</th>
                <th className="px-10 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">{t('status')}</th>
                <th className="px-10 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">{t('actions')}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {loading ? (
                <tr><td colSpan={5} className="p-20 text-center text-slate-400 font-bold">{t('loading')}...</td></tr>
              ) : acts.length === 0 ? (
                <tr><td colSpan={5} className="p-20 text-center text-slate-400 font-bold">{lang === 'ar' ? 'لا توجد قرارات حالياً' : 'Aucun acte trouvé'}</td></tr>
              ) : acts.map((act) => {
                const status = getStatusStyle(act.status);
                const entity = act.fonctionnaire || act.candidat;
                return (
                  <tr key={act.id} className="group hover:bg-[#F8FAFC] transition-all">
                    <td className="px-10 py-8">
                       <div className="flex items-center gap-4">
                          <div className="w-10 h-10 bg-[#C5A059]/10 text-[#C5A059] rounded-xl flex items-center justify-center">
                             <FileText size={18} />
                          </div>
                          <div>
                             <h4 className="font-black text-[#003366] text-sm uppercase">{t(act.type) || act.type}</h4>
                             <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{new Date(act.created_at).toLocaleDateString()}</p>
                          </div>
                       </div>
                    </td>
                    <td className="px-10 py-8">
                       <div className="flex flex-col">
                          <span className="font-bold text-slate-700 text-sm">{entity?.nom} {entity?.prenom}</span>
                          <span className="text-[10px] font-black text-slate-300 uppercase tracking-tighter">{entity?.matricule || entity?.cin}</span>
                       </div>
                    </td>
                    <td className="px-10 py-8">
                       <div className="flex items-center gap-2">
                          <span className="px-3 py-1 bg-[#003366] text-white rounded-lg text-[10px] font-black tracking-widest">V{act.current_version}</span>
                          {act.versions_count > 1 && (
                            <span className="text-[10px] text-slate-400 font-bold">+{act.versions_count - 1} {lang === 'ar' ? 'تعديلات' : 'Edits'}</span>
                          )}
                       </div>
                    </td>
                    <td className="px-10 py-8">
                       <span className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest border ${status.bg}`}>
                          {status.icon}
                          {status.label}
                       </span>
                    </td>
                    <td className="px-10 py-8">
                        <div className="flex items-center gap-2">
                           <button 
                             onClick={(e) => { e.stopPropagation(); navigate(`/rh/acts/${act.type}/${act.id}`); }}
                             className="p-2 bg-white text-slate-400 hover:text-[#003366] hover:shadow-md rounded-lg border border-gray-100 transition-all"
                             title={lang === 'ar' ? 'تعديل' : 'Modifier'}
                           >
                              <Eye size={16} />
                           </button>
                           
                           <button 
                             onClick={(e) => { e.stopPropagation(); handleDownloadPdf(act.id, act.type); }}
                             className="p-2 bg-white text-slate-400 hover:text-emerald-600 hover:shadow-md rounded-lg border border-gray-100 transition-all"
                             title={lang === 'ar' ? 'تحميل PDF' : 'Télécharger PDF'}
                           >
                              <Download size={16} />
                           </button>

                           {act.status === 'validated' && (
                             <button 
                               onClick={(e) => { e.stopPropagation(); handleInstall(act.id); }}
                               className="p-2 bg-[#006241] text-white hover:bg-[#004d33] shadow-sm rounded-lg transition-all flex items-center gap-2 px-3"
                               title={lang === 'ar' ? 'اعتماد (Install)' : 'Installer'}
                             >
                                <CheckCircle2 size={14} />
                                <span className="text-[10px] font-black uppercase">{lang === 'ar' ? 'اعتماد' : 'Install'}</span>
                             </button>
                           )}

                           <button className="p-2 bg-white text-slate-400 hover:text-[#C5A059] rounded-lg border border-gray-100 transition-all">
                              <MoreVertical size={16} />
                           </button>
                        </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdministrativeActs;
