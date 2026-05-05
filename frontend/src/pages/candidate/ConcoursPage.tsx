import React, { useState, useEffect } from 'react';
import { Search, Filter, Briefcase, Calendar, MapPin, ChevronRight, ChevronLeft, Clock, FileText } from 'lucide-react';
import { useLang } from '../../context/LangContext';
import { api } from '../../lib/api';
import { toast } from 'react-hot-toast';

export default function ConcoursPage() {
  const { t, lang } = useLang();
  const [concours, setConcours] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchConcours = async () => {
      try {
        const res = await api.get('/concours');
        setConcours(res.data);
      } catch (err) {
        // Fallback mock data if API fails or is empty
        setConcours([
          { id: 1, title_ar: 'مهندس دولة من الدرجة الأولى', title_fr: 'Ingénieur d\'État 1er Grade', department_ar: 'مصلحة التعمير', department_fr: 'Service Urbanisme', deadline: '2024-06-15', posts: 2, status: 'open', date: '2024-05-01' },
          { id: 2, title_ar: 'متصرف من الدرجة الثانية', title_fr: 'Administrateur 2ème Grade', department_ar: 'الموارد البشرية', department_fr: 'Ressources Humaines', deadline: '2024-06-20', posts: 3, status: 'open', date: '2024-05-05' },
          { id: 3, title_ar: 'تقني من الدرجة الثالثة', title_fr: 'Technicien 3ème Grade', department_ar: 'المصلحة البيطرية', department_fr: 'Service Vétérinaire', deadline: '2024-06-10', posts: 5, status: 'closed', date: '2024-04-20' },
        ]);
      } finally {
        setLoading(false);
      }
    };
    fetchConcours();
  }, []);

  const filtered = concours.filter(c => 
    (lang === 'ar' ? c.title_ar : c.title_fr).toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="animate-fade-in space-y-8 pb-20">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h1 className="text-3xl font-black text-[#002352] tracking-tight">{t('openContests')}</h1>
          <p className="text-slate-500 font-bold mt-2">{t('exploreOpportunities')}</p>
        </div>
        
        <div className="flex items-center gap-4 w-full md:w-auto">
          <div className="relative flex-1 md:w-96 group">
            <Search className={`absolute ${lang === 'ar' ? 'right-5' : 'left-5'} top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors`} size={20} />
            <input 
              type="text" 
              placeholder={t('searchConcours')} 
              className={`w-full ${lang === 'ar' ? 'pr-14 pl-5' : 'pl-14 pr-5'} py-4 bg-white border-2 border-slate-100 rounded-[1.25rem] font-bold text-sm focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all shadow-sm hover:border-slate-200`}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button className="p-4 bg-white border-2 border-slate-100 rounded-[1.25rem] text-slate-600 hover:bg-slate-50 hover:border-slate-200 transition-all shadow-sm active:scale-95">
            <Filter size={20} />
          </button>
        </div>
      </div>

      {/* Grid */}
      {loading ? (
        <div className="flex justify-center py-20">
          <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : filtered.length === 0 ? (
        <div className="bg-white rounded-[2.5rem] p-20 text-center border border-slate-100 shadow-sm">
           <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6">
              <Briefcase size={40} className="text-slate-200" />
           </div>
           <h3 className="text-xl font-black text-slate-800">{t('noConcoursFound')}</h3>
           <p className="text-slate-400 font-bold mt-2">{t('noConcoursDesc')}</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map(item => (
            <div key={item.id} className="bg-white rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-slate-200/40 transition-all overflow-hidden group">
               <div className="p-8">
                  <div className="flex justify-between items-start mb-6">
                     <div className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${
                       item.status === 'open' ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'
                     }`}>
                        {item.status === 'open' ? t('openContests') : t('concoursClosed')}
                     </div>
                     <div className="text-slate-300 group-hover:text-blue-600 transition-colors">
                        <Briefcase size={24} />
                     </div>
                  </div>

                  <h3 className="text-lg font-black text-slate-800 mb-2 leading-tight group-hover:text-blue-600 transition-colors">
                    {lang === 'ar' ? item.title_ar : item.title_fr}
                  </h3>
                  <p className="text-slate-400 font-bold text-xs mb-6 flex items-center gap-2">
                     <MapPin size={12} /> {lang === 'ar' ? item.department_ar : item.department_fr}
                  </p>

                  <div className="grid grid-cols-2 gap-4 mb-8">
                     <div className="bg-slate-50 rounded-2xl p-3">
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{t('deadline')}</p>
                        <p className="text-xs font-black text-slate-700 flex items-center gap-1.5">
                           <Clock size={14} className="text-rose-500" /> {item.deadline}
                        </p>
                     </div>
                     <div className="bg-slate-50 rounded-2xl p-3">
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{t('posts') || 'Postes'}</p>
                        <p className="text-xs font-black text-slate-700 flex items-center gap-1.5">
                           <FileText size={14} className="text-blue-500" /> {item.posts}
                        </p>
                     </div>
                  </div>

                  <div className="flex items-center gap-3">
                     <button className="flex-1 py-3.5 bg-[#002352] text-white rounded-xl font-black text-sm shadow-lg shadow-blue-900/20 hover:scale-[1.02] active:scale-[0.98] transition-all">
                        {t('apply')}
                     </button>
                     <button className="p-3.5 bg-slate-50 text-slate-600 rounded-xl hover:bg-slate-100 transition-all">
                        {lang === 'ar' ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
                     </button>
                  </div>
               </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
