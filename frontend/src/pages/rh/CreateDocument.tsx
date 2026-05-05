import { useState } from 'react';
import { FilePlus, FileText, User, Send, AlertCircle } from 'lucide-react';
import { useLang } from '../../context/LangContext';

const CreateDocument = () => {
  const { t, lang } = useLang();
  const [docType, setDocType] = useState('');

  return (
    <div className="animate-slide-up space-y-6 max-w-6xl mx-auto" dir={lang === 'ar' ? 'rtl' : 'ltr'}>
      <div className={lang === 'ar' ? 'text-right' : 'text-left'}>
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">{lang === 'ar' ? 'إنشاء وثيقة إدارية' : 'Générer un document'}</h1>
        <p className="text-sm text-gray-500 mt-1">{t('home')} / {t('adminDocuments')} / {lang === 'ar' ? 'مولد الوثائق' : 'Générateur'}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="gov-card p-10 border-b-4 border-b-[#0d5e3f]">
            <form className="space-y-8" onSubmit={e => e.preventDefault()}>
              <div className={`grid grid-cols-1 md:grid-cols-2 gap-8 ${lang === 'ar' ? 'text-right' : 'text-left'}`}>
                <div className="space-y-3">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{lang === 'ar' ? 'نوع الوثيقة *' : 'Type de Document *'}</label>
                  <select 
                    value={docType}
                    onChange={(e) => setDocType(e.target.value)}
                    className={`w-full bg-gray-50 dark:bg-slate-900 border border-gray-200 dark:border-slate-700 rounded-xl px-5 py-3.5 outline-none focus:ring-2 focus:ring-[#0d5e3f] text-sm font-bold text-gray-700 dark:text-gray-200 shadow-sm transition-all ${lang === 'ar' ? 'text-right' : 'text-left'}`}
                  >
                    <option value="">{lang === 'ar' ? 'اختر نوع الوثيقة' : 'Choisir le type'}</option>
                    <option value="work_cert">{lang === 'ar' ? 'شهادة العمل' : 'Attestation de travail'}</option>
                    <option value="salary_cert">{lang === 'ar' ? 'شهادة الأجر' : 'Attestation de salaire'}</option>
                    <option value="leave_decision">{lang === 'ar' ? 'قرار عطلة' : 'Décision de congé'}</option>
                  </select>
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{lang === 'ar' ? 'الموظف المعني *' : 'Employé Concerné *'}</label>
                  <div className="relative">
                    <User className={`absolute ${lang === 'ar' ? 'right-4' : 'left-4'} top-1/2 -translate-y-1/2 text-gray-400`} size={18} />
                    <input 
                      type="text" 
                      placeholder={t('searchEmployee')} 
                      className={`w-full bg-gray-50 dark:bg-slate-900 border border-gray-200 dark:border-slate-700 rounded-xl ${lang === 'ar' ? 'pr-12 text-right' : 'pl-12 text-left'} py-3.5 outline-none focus:ring-2 focus:ring-[#0d5e3f] text-sm font-bold shadow-sm transition-all`}
                    />
                  </div>
                </div>
              </div>

              <div className={`space-y-3 ${lang === 'ar' ? 'text-right' : 'text-left'}`}>
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{lang === 'ar' ? 'معلومات إضافية (اختياري)' : 'Infos complémentaires (Optionnel)'}</label>
                <textarea 
                  className={`w-full bg-gray-50 dark:bg-slate-900 border border-gray-200 dark:border-slate-700 rounded-xl px-5 py-4 outline-none focus:ring-2 focus:ring-[#0d5e3f] text-sm min-h-[140px] shadow-sm transition-all ${lang === 'ar' ? 'text-right' : 'text-left'}`}
                  placeholder={lang === 'ar' ? 'أضف أي ملاحظات أو تفاصيل إضافية للوثيقة...' : 'Notes additionnelles...'}
                ></textarea>
              </div>

              <div className={`p-5 bg-emerald-50 dark:bg-emerald-900/10 border border-emerald-100 dark:border-emerald-900/20 rounded-2xl flex gap-4 ${lang === 'ar' ? 'flex-row' : 'flex-row-reverse'}`}>
                <AlertCircle className="text-[#0d5e3f] shrink-0" size={24} />
                <p className={`text-[11px] text-[#0d5e3f] dark:text-emerald-400 leading-relaxed font-bold ${lang === 'ar' ? 'text-right' : 'text-left'}`}>
                  {lang === 'ar' 
                    ? 'سيتم إنشاء الوثيقة بصيغة PDF قابلة للتحميل. تتضمن الوثيقة تلقائياً الترويسة الرسمية للجماعة، معلومات الموظف من قاعدة البيانات، والتوقيع الرقمي المعتمد.'
                    : 'Le document sera généré en format PDF téléchargeable. Il inclut automatiquement l\'en-tête officiel, les informations de la base de données et la signature numérique.'}
                </p>
              </div>

              <div className={`flex flex-col md:flex-row gap-4 pt-6 border-t border-gray-100 dark:border-slate-700 ${lang === 'ar' ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                <button className="flex-1 bg-[#0d5e3f] hover:bg-[#0a4a31] text-white py-4 rounded-xl font-extrabold flex items-center justify-center gap-2 transition-all shadow-lg shadow-emerald-900/10 active:scale-95 uppercase text-xs tracking-widest">
                  <FilePlus size={20} />
                  {lang === 'ar' ? 'توليد الوثيقة (PDF)' : 'Générer (PDF)'}
                </button>
                <button className="px-8 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 text-gray-700 dark:text-gray-200 py-4 rounded-xl font-extrabold flex items-center justify-center gap-2 transition-all hover:bg-gray-50 active:scale-95 uppercase text-xs tracking-widest">
                  <Send size={20} />
                  {lang === 'ar' ? 'إرسال عبر الإيميل' : 'Envoyer par Mail'}
                </button>
              </div>
            </form>
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="gov-card p-8 bg-slate-100 dark:bg-slate-900/50 flex flex-col items-center justify-center border-dashed border-4 border-slate-200 dark:border-slate-800 min-h-[450px] relative overflow-hidden group">
            <div className="pattern-moroccan absolute inset-0 opacity-5"></div>
            <div className="text-center space-y-6 relative z-10 group-hover:scale-110 transition-transform duration-500">
              <div className="w-24 h-24 bg-white dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto shadow-sm">
                <FileText size={48} className="text-slate-300" />
              </div>
              <div className="space-y-2">
                <p className="text-xs font-black text-gray-400 uppercase tracking-widest">{lang === 'ar' ? 'معاينة الوثيقة' : 'Aperçu du Doc'}</p>
                <p className="text-[10px] text-gray-400 max-w-[180px] mx-auto font-medium leading-relaxed">
                  {lang === 'ar' 
                    ? 'اختر نوع الوثيقة والموظف لمشاهدة المعاينة الفورية هنا.' 
                    : 'Sélectionnez un type de document pour prévisualiser ici.'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateDocument;
