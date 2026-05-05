import { useState } from 'react';
import { FileText, Search, Filter, Download, Plus, Folder } from 'lucide-react';
import { useLang } from '../../context/LangContext';

const mockDocs = [
  { id: 1, name: 'قرار التعيين - ياسين بومدين', nameFr: 'Décision de recrutement - Yassine', category: 'قرارات إدارية', catFr: 'Décisions', date: '2024-05-10', size: '1.2 MB', type: 'PDF' },
  { id: 2, name: 'شهادة العمل - خديجة أمزال', nameFr: 'Attestation de travail - Khadija', category: 'شهادات', catFr: 'Attestations', date: '2024-05-08', size: '450 KB', type: 'PDF' },
];

const AdminDocuments = () => {
  const { t, lang } = useLang();
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="animate-slide-up space-y-6" dir={lang === 'ar' ? 'rtl' : 'ltr'}>
      <div className={`flex flex-col md:flex-row justify-between items-start md:items-center gap-4 ${lang === 'ar' ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
        <button className="bg-[#0d5e3f] hover:bg-[#0a4a31] text-white px-5 py-2.5 rounded-xl font-bold flex items-center gap-2 transition-all shadow-lg shadow-emerald-900/10 active:scale-95 text-sm">
          <Plus size={18} />
          {lang === 'ar' ? 'رفع وثيقة جديدة' : 'Télécharger un doc'}
        </button>
        <div className={lang === 'ar' ? 'text-right' : 'text-left'}>
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white">{t('adminDocuments')}</h1>
          <p className="text-sm text-gray-500 mt-1">{t('home')} / {t('adminDocuments')} / {t('adminDocuments')}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-1 space-y-6">
          <div className="gov-card p-8 border-b-4 border-b-[#0d5e3f]">
            <h3 className={`font-black text-[10px] text-gray-800 dark:text-white mb-6 flex items-center gap-2 uppercase tracking-[0.2em] ${lang === 'ar' ? 'text-right' : 'text-left'}`}>
              <Folder size={18} className="text-[#0d5e3f]" />
              {lang === 'ar' ? 'التصنيفات' : 'Catégories'}
            </h3>
            <div className="space-y-2">
              {[
                { label: lang === 'ar' ? 'كل الوثائق' : 'Tous les docs', count: 42, active: true },
                { label: lang === 'ar' ? 'قرارات إدارية' : 'Décisions', count: 15 },
                { label: lang === 'ar' ? 'شهادات العمل' : 'Attestations', count: 12 },
                { label: lang === 'ar' ? 'عقود التوظيف' : 'Contrats', count: 8 },
              ].map((cat, i) => (
                <div key={i} className={`flex items-center justify-between p-3.5 rounded-xl font-bold text-xs cursor-pointer transition-all border ${cat.active ? 'bg-emerald-50 text-[#0d5e3f] border-emerald-100' : 'text-gray-500 dark:text-gray-400 border-transparent hover:bg-gray-50 dark:hover:bg-slate-900'} ${lang === 'ar' ? 'flex-row' : 'flex-row-reverse'}`}>
                  <span>{cat.label}</span>
                  <span className={`text-[10px] px-2.5 py-0.5 rounded-full border ${cat.active ? 'bg-white border-emerald-100' : 'bg-gray-100 dark:bg-slate-700 border-transparent'}`}>{cat.count}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="lg:col-span-3">
          <div className="gov-card p-0 overflow-hidden">
            <div className={`p-6 border-b border-gray-100 dark:border-slate-700 flex flex-col md:flex-row gap-4 justify-between items-center bg-gray-50/30 dark:bg-slate-900/30 ${lang === 'ar' ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
              <div className="relative w-full md:w-80">
                <Search className={`absolute ${lang === 'ar' ? 'right-4' : 'left-4'} top-1/2 -translate-y-1/2 text-gray-400`} size={18} />
                <input 
                  type="text" 
                  placeholder={lang === 'ar' ? 'ابحث عن وثيقة...' : 'Rechercher un doc...'} 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className={`w-full ${lang === 'ar' ? 'pr-12 text-right' : 'pl-12 text-left'} py-2.5 bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-700 rounded-xl outline-none focus:ring-2 focus:ring-[#0d5e3f] text-sm transition-all`}
                />
              </div>
              <button className="flex items-center gap-2 border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-5 py-2.5 rounded-xl text-sm font-bold text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-slate-700 transition-all">
                <Filter size={16} />
                {t('filters')}
              </button>
            </div>

            <div className="divide-y divide-gray-100 dark:divide-slate-700">
              {mockDocs.filter(d => d.name.includes(searchTerm)).map((doc) => (
                <div key={doc.id} className={`p-6 hover:bg-emerald-50/10 transition-all flex items-center justify-between group ${lang === 'ar' ? 'flex-row' : 'flex-row-reverse'}`}>
                  <div className={`flex items-center gap-5 ${lang === 'ar' ? 'flex-row' : 'flex-row-reverse'}`}>
                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center border-2 transition-all group-hover:scale-110 shadow-sm ${
                      doc.type === 'PDF' ? 'bg-rose-50 text-rose-600 border-rose-100' : 'bg-blue-50 text-blue-600 border-blue-100'
                    }`}>
                      <FileText size={26} />
                    </div>
                    <div className={lang === 'ar' ? 'text-right' : 'text-left'}>
                      <h3 className="font-bold text-gray-800 dark:text-white text-base mb-1">{lang === 'ar' ? doc.name : doc.nameFr}</h3>
                      <div className={`flex items-center gap-3 text-[10px] font-black text-gray-400 uppercase tracking-widest ${lang === 'ar' ? 'flex-row' : 'flex-row-reverse'}`}>
                        <span className="text-[#0d5e3f]">{lang === 'ar' ? doc.category : doc.catFr}</span>
                        <span className="w-1 h-1 bg-gray-200 rounded-full"></span>
                        <span>{doc.date}</span>
                        <span className="w-1 h-1 bg-gray-200 rounded-full"></span>
                        <span>{doc.size}</span>
                      </div>
                    </div>
                  </div>
                  <button className="p-3 text-slate-300 hover:text-[#0d5e3f] hover:bg-emerald-50 rounded-xl transition-all opacity-0 group-hover:opacity-100">
                    <Download size={22} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDocuments;
