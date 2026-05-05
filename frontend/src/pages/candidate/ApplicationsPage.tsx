import React, { useState, useEffect } from 'react';
import { FileText, CheckCircle, Clock, XCircle, AlertCircle, ChevronRight, ChevronLeft, Eye, Download } from 'lucide-react';
import { useLang } from '../../context/LangContext';
import { api } from '../../lib/api';
import { toast } from 'react-hot-toast';

export default function ApplicationsPage() {
  const { t, lang } = useLang();
  const [applications, setApplications] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const res = await api.get('/candidatures/my');
        setApplications(res.data);
      } catch (err) {
        // Fallback mock data
        setApplications([
          { id: 1, title_ar: 'مهندس دولة من الدرجة الأولى', title_fr: 'Ingénieur d\'État 1er Grade', status: 'pending', date: '2024-05-10', ref: 'APP-2024-001' },
          { id: 2, title_ar: 'متصرف من الدرجة الثانية', title_fr: 'Administrateur 2ème Grade', status: 'accepted', date: '2024-04-25', ref: 'APP-2024-042' },
          { id: 3, title_ar: 'تقني من الدرجة الثالثة', title_fr: 'Technicien 3ème Grade', status: 'rejected', date: '2024-03-15', ref: 'APP-2023-115' },
        ]);
      } finally {
        setLoading(false);
      }
    };
    fetchApplications();
  }, []);

  const getStatusStyle = (status: string) => {
    switch (status) {
      case 'accepted': return { icon: CheckCircle, color: 'text-emerald-600', bg: 'bg-emerald-50', border: 'border-emerald-100', label: t('accepted') || 'Acceptée' };
      case 'rejected': return { icon: XCircle, color: 'text-rose-600', bg: 'bg-rose-50', border: 'border-rose-100', label: t('rejected') || 'Rejetée' };
      default: return { icon: Clock, color: 'text-amber-600', bg: 'bg-amber-50', border: 'border-amber-100', label: t('pending') || 'En cours' };
    }
  };

  return (
    <div className="animate-fade-in space-y-8 pb-20">
      <div>
        <h1 className="text-3xl font-black text-[#002352] tracking-tight">{t('myCandidacies')}</h1>
        <p className="text-slate-500 font-bold mt-2">{t('activeApplications')}</p>
      </div>

      {loading ? (
        <div className="flex justify-center py-20">
          <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : applications.length === 0 ? (
        <div className="bg-white rounded-[2.5rem] p-20 text-center border border-slate-100 shadow-sm">
           <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6">
              <FileText size={40} className="text-slate-200" />
           </div>
           <h3 className="text-xl font-black text-slate-800">{t('noApplicationsFound') || 'Aucune candidature trouvée'}</h3>
           <p className="text-slate-400 font-bold mt-2">{t('noApplicationsDesc') || 'Vous n\'avez pas encore soumis de candidature.'}</p>
        </div>
      ) : (
        <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-right" dir={lang === 'ar' ? 'rtl' : 'ltr'}>
              <thead>
                <tr className="bg-slate-50/80 border-b border-slate-100">
                  <th className="px-8 py-6 text-[11px] font-black text-slate-400 uppercase tracking-widest text-center">{t('ref') || 'Réf'}</th>
                  <th className="px-8 py-6 text-[11px] font-black text-slate-400 uppercase tracking-widest text-right">{t('contest')}</th>
                  <th className="px-8 py-6 text-[11px] font-black text-slate-400 uppercase tracking-widest text-center">{t('submissionDate')}</th>
                  <th className="px-8 py-6 text-[11px] font-black text-slate-400 uppercase tracking-widest text-center">{t('status')}</th>
                  <th className="px-8 py-6 text-[11px] font-black text-slate-400 uppercase tracking-widest text-center">{t('actions')}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {applications.map(app => {
                  const style = getStatusStyle(app.status);
                  const Icon = style.icon;
                  return (
                    <tr key={app.id} className="hover:bg-slate-50/50 transition-colors group">
                      <td className="px-8 py-6">
                        <span className="px-3 py-1 bg-slate-100 text-slate-500 rounded-lg text-[10px] font-black">{app.ref}</span>
                      </td>
                      <td className="px-8 py-6">
                        <p className="font-black text-slate-800 group-hover:text-blue-600 transition-colors">
                          {lang === 'ar' ? app.title_ar : app.title_fr}
                        </p>
                      </td>
                      <td className="px-8 py-6 text-center text-sm font-bold text-slate-500">
                        {app.date}
                      </td>
                      <td className="px-8 py-6 text-center">
                        <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full border ${style.bg} ${style.color} ${style.border}`}>
                           <Icon size={14} />
                           <span className="text-xs font-black">{style.label}</span>
                        </div>
                      </td>
                      <td className="px-8 py-6">
                        <div className="flex items-center justify-center gap-2">
                           <button className="p-2.5 bg-slate-50 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all" title={t('viewDetails')}>
                              <Eye size={18} />
                           </button>
                           <button className="p-2.5 bg-slate-50 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-xl transition-all" title={t('download')}>
                              <Download size={18} />
                           </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
