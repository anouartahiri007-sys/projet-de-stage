import { useState } from 'react';
import { Route, TrendingUp } from 'lucide-react';
import { useLang } from '../../context/LangContext';

const CareerPath = () => {
  const { t, lang } = useLang();
  const [selectedEmployee, setSelectedEmployee] = useState('أحمد العلوي');

  const careerSteps = [
    { year: '2024', event: lang === 'ar' ? 'ترقية إلى السلم 11' : 'Promotion au Grade 11', type: 'promotion', desc: lang === 'ar' ? 'بناءً على نتائج تقييم الأداء المتميزة.' : 'Basé sur les excellents résultats d\'évaluation.' },
    { year: '2022', event: lang === 'ar' ? 'تغيير المصلحة' : 'Changement de service', type: 'transfer', desc: lang === 'ar' ? 'الانتقال من قسم الكتابة العامة إلى المصلحة الصحية.' : 'Transfert du secrétariat général vers le service de santé.' },
    { year: '2020', event: lang === 'ar' ? 'التوظيف الرسمي' : 'Recrutement officiel', type: 'entry', desc: lang === 'ar' ? 'الالتحاق بالجماعة بصفة متصرف من الدرجة الثالثة.' : 'Entrée en tant qu\'administrateur de 3ème grade.' },
  ];

  return (
    <div className="animate-slide-up space-y-6" dir={lang === 'ar' ? 'rtl' : 'ltr'}>
      <div className={`flex flex-col md:flex-row justify-between items-start md:items-center gap-4 ${lang === 'ar' ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
        <div className="flex gap-2">
          <select 
            value={selectedEmployee}
            onChange={(e) => setSelectedEmployee(e.target.value)}
            className={`bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 text-gray-700 dark:text-gray-200 px-5 py-2.5 rounded-xl font-bold text-sm outline-none focus:ring-2 focus:ring-[#0d5e3f] shadow-sm min-w-[220px] ${lang === 'ar' ? 'text-right' : 'text-left'}`}
          >
            <option value="أحمد العلوي">أحمد العلوي</option>
            <option value="فاطمة الزهراء بنعلي">فاطمة الزهراء بنعلي</option>
            <option value="محمد أمين الناصري">محمد أمين الناصري</option>
          </select>
        </div>
        <div className={lang === 'ar' ? 'text-right' : 'text-left'}>
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white">{t('careerPath')}</h1>
          <p className="text-sm text-gray-500 mt-1">{t('home')} / {t('performanceEval')} / {t('careerPath')}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-1 space-y-6">
          <div className="gov-card p-8 text-center border-b-4 border-b-[#0d5e3f]">
            <div className="w-24 h-24 bg-emerald-50 text-[#0d5e3f] rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-xl border-4 border-white dark:border-slate-700">
              <TrendingUp size={44} />
            </div>
            <h2 className="text-xl font-black text-gray-800 dark:text-white uppercase tracking-tight">{selectedEmployee}</h2>
            <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest mt-2">{lang === 'ar' ? 'موظف رسمي منذ 2020' : 'Titulaire depuis 2020'}</p>
            
            <div className={`mt-10 pt-10 border-t border-gray-100 dark:border-slate-700 space-y-5 ${lang === 'ar' ? 'text-right' : 'text-left'}`}>
              <div className={`flex items-center justify-between ${lang === 'ar' ? 'flex-row' : 'flex-row-reverse'}`}>
                <span className="text-[10px] text-gray-400 font-black uppercase tracking-widest">{lang === 'ar' ? 'الرتبة الحالية' : 'Grade Actuel'}</span>
                <span className="text-sm font-black text-[#0d5e3f]">11</span>
              </div>
              <div className={`flex items-center justify-between ${lang === 'ar' ? 'flex-row' : 'flex-row-reverse'}`}>
                <span className="text-[10px] text-gray-400 font-black uppercase tracking-widest">{lang === 'ar' ? 'الأقدمية' : 'Ancienneté'}</span>
                <span className="text-sm font-black text-gray-700 dark:text-gray-200">4 {lang === 'ar' ? 'سنوات' : 'Ans'}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-3">
          <div className="gov-card p-10 relative overflow-hidden">
            <div className="pattern-moroccan absolute top-0 right-0 w-32 h-32 opacity-5"></div>
            <h3 className={`text-xl font-black text-gray-800 dark:text-white mb-12 flex items-center gap-3 uppercase tracking-widest relative z-10 ${lang === 'ar' ? 'text-right' : 'text-left'}`}>
              <Route size={26} className="text-[#0d5e3f]" />
              {lang === 'ar' ? 'المخطط الزمني للمسار المهني' : 'Timeline de Carrière'}
            </h3>

            <div className={`relative ${lang === 'ar' ? 'border-r-2 border-emerald-100 pr-10' : 'border-l-2 border-emerald-100 pl-10'} space-y-16`}>
              {careerSteps.map((step, idx) => (
                <div key={idx} className="relative group">
                  <div className={`absolute ${lang === 'ar' ? '-right-[51px]' : '-left-[51px]'} top-0 w-5 h-5 rounded-full border-4 border-white dark:border-slate-700 shadow-lg z-10 transition-transform group-hover:scale-125 ${
                    step.type === 'promotion' ? 'bg-emerald-500' :
                    step.type === 'transfer' ? 'bg-blue-500' : 'bg-[#0d5e3f]'
                  }`}></div>
                  
                  <div className={`flex flex-col md:flex-row md:items-center gap-3 mb-3 ${lang === 'ar' ? 'flex-row' : 'flex-row-reverse'}`}>
                    <span className="text-xl font-black text-[#0d5e3f]">{step.year}</span>
                    <span className={`w-fit px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-[0.2em] border ${
                      step.type === 'promotion' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' :
                      step.type === 'transfer' ? 'bg-blue-50 text-blue-700 border-blue-100' : 
                      'bg-emerald-50 text-[#0d5e3f] border-emerald-100'
                    }`}>
                      {step.type === 'promotion' ? (lang === 'ar' ? 'ترقية' : 'PROMOTION') : step.type === 'transfer' ? (lang === 'ar' ? 'تنقل' : 'MUTATION') : (lang === 'ar' ? 'تعيين' : 'RECRUTEMENT')}
                    </span>
                  </div>
                  
                  <h4 className={`text-lg font-black text-gray-800 dark:text-white mb-2 uppercase tracking-tight ${lang === 'ar' ? 'text-right' : 'text-left'}`}>{step.event}</h4>
                  <p className={`text-sm text-gray-400 leading-relaxed max-w-2xl font-medium ${lang === 'ar' ? 'text-right' : 'text-left'}`}>{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CareerPath;
