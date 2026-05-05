import { useState } from 'react';
import {
  Users, Activity, Calendar, FileText,
  Clock, CheckCircle, AlertCircle, Plus,
  Search, TrendingUp, Bell, ChevronRight,
  ArrowUpRight, MapPin, UserCheck, Stethoscope,
  ClipboardList, FilePlus
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useLang } from '../../context/LangContext';

const APPOINTMENTS = (t: any, lang: string) => [
  { id: 1, time: '09:30', date: lang === 'ar' ? '20 ماي 2024' : '20 Mai 2024', title: lang === 'ar' ? 'فاطمة الزهراء الإدريسي' : 'Fatima-Zahra Idrissi', desc: lang === 'ar' ? 'استشارة عامة' : 'Consultation générale', img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80' },
  { id: 2, time: '10:15', date: lang === 'ar' ? '20 ماي 2024' : '20 Mai 2024', title: lang === 'ar' ? 'محمد أمين الناصري' : 'Mohammed Amine Nassiri', desc: lang === 'ar' ? 'متابعة حالة' : 'Suivi de cas', img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=100&q=80' },
  { id: 3, time: '11:00', date: lang === 'ar' ? '20 ماي 2024' : '20 Mai 2024', title: lang === 'ar' ? 'سعاد الحاجي' : 'Souad El Hajji', desc: lang === 'ar' ? 'ضغط الدم' : 'Tension artérielle', img: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=100&q=80' },
  { id: 4, time: '12:00', date: lang === 'ar' ? '20 ماي 2024' : '20 Mai 2024', title: lang === 'ar' ? 'رضوان الوهابي' : 'Redouane El Wahabi', desc: lang === 'ar' ? 'ألم في الظهر' : 'Douleur dorsale', img: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=100&q=80' },
  { id: 5, time: '12:45', date: lang === 'ar' ? '20 ماي 2024' : '20 Mai 2024', title: lang === 'ar' ? 'نورة القاسمي' : 'Nora El Kasmi', desc: lang === 'ar' ? 'استشارة عامة' : 'Consultation générale', img: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=100&q=80' },
];

const FOLLOW_UP = (t: any, lang: string) => [
  { id: 1, name: lang === 'ar' ? 'الحسين مرابط' : 'Lahcen Mourabit', desc: lang === 'ar' ? 'سكري نوع 2' : 'Diabète Type 2', time: lang === 'ar' ? 'آخر متابعة: 18 ماي 2024' : 'Dernier suivi: 18 Mai 2024', status: t('high'), color: 'bg-rose-50 text-rose-700 border-rose-100', img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80' },
  { id: 2, name: lang === 'ar' ? 'خديجة بوعزة' : 'Khadija Bouazza', desc: lang === 'ar' ? 'ارتفاع ضغط الدم' : 'Hypertension', time: lang === 'ar' ? 'آخر متابعة: 17 ماي 2024' : 'Dernier suivi: 17 Mai 2024', status: t('medium'), color: 'bg-amber-50 text-amber-700 border-amber-100', img: 'https://images.unsplash.com/photo-1554151228-14d9def656e4?auto=format&fit=crop&w=100&q=80' },
  { id: 3, name: lang === 'ar' ? 'أحمد العلوي' : 'Ahmed Alaoui', desc: lang === 'ar' ? 'حساسية صدرية' : 'Asthme', time: lang === 'ar' ? 'آخر متابعة: 15 ماي 2024' : 'Dernier suivi: 15 Mai 2024', status: t('low'), color: 'bg-emerald-50 text-emerald-700 border-emerald-100', img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=100&q=80' },
  { id: 4, name: lang === 'ar' ? 'سمية أيت الطالب' : 'Soumia Ait Taleb', desc: lang === 'ar' ? 'فقر دم' : 'Anémie', time: lang === 'ar' ? 'آخر متابعة: 15 ماي 2024' : 'Dernier suivi: 15 Mai 2024', status: t('medium'), color: 'bg-amber-50 text-amber-700 border-amber-100', img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80' },
];

const RECENT_DIAGNOSIS = (t: any, lang: string) => [
  { id: 1, name: lang === 'ar' ? 'الحسين مرابط - سكري نوع 2' : 'Lahcen Mourabit - Diabète Type 2', desc: lang === 'ar' ? 'تم تعديل العلاج، متابعة بعد أسبوعين' : 'Traitement ajusté, suivi dans 2 semaines', date: lang === 'ar' ? '18 ماي 2024' : '18 Mai 2024' },
  { id: 2, name: lang === 'ar' ? 'خديجة بوعزة - ارتفاع ضغط الدم' : 'Khadija Bouazza - Hypertension', desc: lang === 'ar' ? 'تحسن ملحوظ، الاستمرار على العلاج الحالي' : 'Amélioration notable, continuer le traitement actuel', date: lang === 'ar' ? '17 ماي 2024' : '17 Mai 2024' },
  { id: 3, name: lang === 'ar' ? 'أحمد العلوي - حساسية صدرية' : 'Ahmed Alaoui - Asthme', desc: lang === 'ar' ? 'وصف دواء مضاد للحساسية' : 'Prescription d\'un antihistaminique', date: lang === 'ar' ? '15 ماي 2024' : '15 Mai 2024' },
];

const MedicalDashboard = () => {
  const navigate = useNavigate();
  const { t, lang } = useLang();

  const stats = [
    { label: t('totalPatients'), value: '1,248', trend: lang === 'ar' ? '+2 هذا الشهر' : '+2 ce mois', bgColor: 'bg-emerald-50', textColor: 'text-emerald-600', icon: <Users size={20} /> },
    { label: t('appointmentsToday'), value: '8', trend: lang === 'ar' ? '8 قادمة' : '8 à venir', bgColor: 'bg-blue-50', textColor: 'text-blue-600', icon: <Calendar size={20} /> },
    { label: t('followUpCases'), value: '24', trend: lang === 'ar' ? '+5 جديدة' : '+5 nouveaux', bgColor: 'bg-orange-50', textColor: 'text-orange-600', icon: <ClipboardList size={20} /> },
    { label: t('medicalCertificates'), value: '15', trend: lang === 'ar' ? 'هذا الشهر' : 'Ce mois', bgColor: 'bg-teal-50', textColor: 'text-teal-600', icon: <FileText size={20} /> },
  ];

  const quickActions = [
    { icon: <FilePlus size={22} />, label: t('newMedicalFile'), onClick: () => navigate('/medical/patients/add') },
    { icon: <Stethoscope size={22} />, label: t('newDiagnosis'), onClick: () => navigate('/medical/diagnosis/add') },
    { icon: <FileText size={22} />, label: t('medicalCertificate'), onClick: () => navigate('/medical/certificates/issue') },
    { icon: <Calendar size={22} />, label: t('newAppointment'), onClick: () => navigate('/medical/appointments') },
  ];

  return (
    <div className={`animate-slide-up space-y-8 pb-12 ${lang === 'ar' ? 'font-arabic' : ''}`} dir={lang === 'ar' ? 'rtl' : 'ltr'}>

      {/* --- STATS GRID --- */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <div key={i} className={`gov-card p-6 flex flex-col group hover:scale-[1.03] transition-transform ${lang === 'ar' ? 'text-right' : 'text-left'}`}>
            <div className={`flex items-center justify-between mb-4 ${lang === 'ar' ? 'flex-row' : 'flex-row-reverse'}`}>
              <div className={`p-4 rounded-2xl ${stat.bgColor} ${stat.textColor} group-hover:rotate-12 transition-transform`}>
                {stat.icon}
              </div>
              <div className={`text-[10px] font-black ${stat.textColor} ${stat.bgColor} px-2 py-1 rounded-lg`}>
                {stat.trend}
              </div>
            </div>
            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">{stat.label}</p>
            <p className="text-3xl font-black text-slate-800 dark:text-white">{stat.value}</p>
          </div>
        ))}
      </section>

      {/* --- MAIN CONTENT GRID --- */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

        {/* APPOINTMENTS */}
        <section className={`lg:col-span-4 gov-card overflow-hidden ${lang === 'ar' ? 'text-right' : 'text-left'}`}>
          <div className={`p-6 border-b border-slate-100 flex items-center justify-between bg-gray-50/30 ${lang === 'ar' ? 'flex-row' : 'flex-row-reverse'}`}>
            <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
              <Calendar size={20} className="text-emerald-600" />
              {t('upcomingAppointments')}
            </h2>
          </div>
          <div className="divide-y divide-slate-50">
            {APPOINTMENTS(t, lang).map(item => (
              <div key={item.id} className={`p-4 hover:bg-slate-50/50 transition-colors flex items-center gap-4 ${lang === 'ar' ? 'flex-row' : 'flex-row-reverse'}`}>
                <div className="text-center min-w-[70px]">
                  <p className="text-sm font-black text-emerald-700">{item.time}</p>
                  <p className="text-[9px] text-gray-400 font-bold">{item.date.split(' ').slice(1).join(' ')}</p>
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-sm text-gray-800">{item.title}</h3>
                  <p className="text-xs font-bold text-gray-500">{item.desc}</p>
                </div>
                <img src={item.img} alt="" className="w-10 h-10 rounded-full object-cover border border-gray-100" />
              </div>
            ))}
          </div>
          <button className="w-full py-3 text-xs font-bold text-gray-500 hover:bg-gray-50 border-t border-gray-50">
            {t('viewAllAppointments')}
          </button>
        </section>

        {/* FOLLOW UP CASES */}
        <section className={`lg:col-span-4 gov-card overflow-hidden ${lang === 'ar' ? 'text-right' : 'text-left'}`}>
          <div className={`p-6 border-b border-slate-100 flex items-center justify-between bg-gray-50/30 ${lang === 'ar' ? 'flex-row' : 'flex-row-reverse'}`}>
            <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
              <Activity size={20} className="text-emerald-600" />
              {t('followUpCases')}
            </h2>
          </div>
          <div className="divide-y divide-slate-50">
            {FOLLOW_UP(t, lang).map(item => (
              <div key={item.id} className={`p-5 hover:bg-slate-50/50 transition-colors flex items-center justify-between ${lang === 'ar' ? 'flex-row' : 'flex-row-reverse'}`}>
                <div className={`flex items-center gap-4 ${lang === 'ar' ? 'flex-row' : 'flex-row-reverse'}`}>
                  <span className={`px-2 py-1 rounded text-[10px] font-black border ${item.color}`}>
                    {item.status}
                  </span>
                  <div>
                    <h3 className="font-bold text-sm text-gray-800">{item.name}</h3>
                    <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest">{item.desc}</p>
                    <p className="text-[9px] text-gray-300 font-bold mt-1">{item.time}</p>
                  </div>
                </div>
                <img src={item.img} alt="" className="w-10 h-10 rounded-full object-cover border border-gray-100" />
              </div>
            ))}
          </div>
          <button className="w-full py-3 text-xs font-bold text-gray-500 hover:bg-gray-50 border-t border-gray-50">
            {t('viewAllCases')}
          </button>
        </section>

        {/* QUICK ACTIONS & NOTIFICATIONS */}
        <section className="lg:col-span-4 space-y-8">
          <div className="gov-card p-6">
            <h2 className={`text-lg font-bold text-gray-800 mb-5 flex items-center gap-2 ${lang === 'ar' ? 'text-right' : 'text-left'}`}>
              <TrendingUp size={20} className="text-emerald-600" />
              {t('quickAccess')}
            </h2>
            <div className="grid grid-cols-2 gap-4">
              {quickActions.map((action, i) => (
                <button
                  key={i}
                  onClick={action.onClick}
                  className="flex flex-col items-center justify-center p-5 rounded-2xl border border-slate-50 bg-slate-50/50 hover:bg-emerald-50 hover:border-emerald-200 hover:text-emerald-700 transition-all group"
                >
                  <div className="mb-2 text-emerald-600">
                    {action.icon}
                  </div>
                  <span className="text-[10px] font-black uppercase text-center leading-tight">
                    {action.label}
                  </span>
                </button>
              ))}
            </div>
            <button className={`w-full mt-4 py-3 bg-gray-50 hover:bg-gray-100 rounded-xl text-xs font-bold text-gray-600 flex items-center justify-center gap-2 transition-all`}>
              <Search size={16} />
              {t('searchPatient')}
            </button>
          </div>

          <div className="gov-card p-6">
            <h2 className={`text-lg font-bold text-gray-800 mb-5 flex items-center gap-2 ${lang === 'ar' ? 'text-right' : 'text-left'}`}>
              <Bell size={20} className="text-emerald-600" />
              {t('recentNotifications')}
            </h2>
            <div className="space-y-4">
              {[
                { title: lang === 'ar' ? 'تم تأكيد موعد جديد للمريضة فاطمة الزهراء الإدريسي' : 'Nouveau rendez-vous confirmé pour Fatima-Zahra Idrissi', time: lang === 'ar' ? 'منذ 10 دقائق' : 'Il y a 10 min', type: 'success' },
                { title: lang === 'ar' ? 'تم إصدار شهادة طبية للمريض محمد أمين الناصري' : 'Certificat médical délivré pour Mohammed Amine Nassiri', time: lang === 'ar' ? 'منذ 1 ساعة' : 'Il y a 1 h', type: 'success' },
                { title: lang === 'ar' ? 'نتيجة تحليل مخبري متوفرة للمريض سعاد الحاجي' : 'Résultat d\'analyse disponible pour Souad El Hajji', time: lang === 'ar' ? 'منذ 3 ساعات' : 'Il y a 3 h', type: 'warning' },
              ].map((item, i) => (
                <div key={i} className={`flex gap-3 items-start ${lang === 'ar' ? 'text-right' : 'text-left'}`}>
                  <div className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${item.type === 'success' ? 'bg-emerald-500' : 'bg-amber-500'}`}></div>
                  <div>
                    <p className="text-xs font-bold text-gray-700 leading-relaxed">{item.title}</p>
                    <p className="text-[10px] text-gray-400 mt-0.5">{item.time}</p>
                  </div>
                </div>
              ))}
            </div>
            <button className="w-full mt-6 py-2.5 text-xs font-bold text-emerald-700 border border-emerald-100 rounded-lg hover:bg-emerald-50 transition-all">
              {t('viewAllNotifications')}
            </button>
          </div>
        </section>

        {/* RECENT DIAGNOSIS - FULL WIDTH AT BOTTOM */}
        <section className={`lg:col-span-12 gov-card overflow-hidden ${lang === 'ar' ? 'text-right' : 'text-left'}`}>
          <div className={`p-6 border-b border-slate-100 flex items-center justify-between bg-gray-50/30 ${lang === 'ar' ? 'flex-row' : 'flex-row-reverse'}`}>
            <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
              <ClipboardList size={20} className="text-emerald-600" />
              {t('recentDiagnosisNotes')}
            </h2>
          </div>
          <div className="divide-y divide-slate-50">
            {RECENT_DIAGNOSIS(t, lang).map(item => (
              <div key={item.id} className={`p-5 hover:bg-slate-50/50 transition-colors flex items-center justify-between ${lang === 'ar' ? 'flex-row' : 'flex-row-reverse'}`}>
                <div>
                  <h3 className="font-bold text-sm text-gray-800">{item.name}</h3>
                  <p className="text-xs text-gray-500 mt-1">{item.desc}</p>
                </div>
                <div className="flex items-center gap-6">
                  <p className="text-xs text-gray-400 font-bold">{item.date}</p>
                  <button className="p-2 text-emerald-600 hover:bg-emerald-50 rounded-lg transition-all">
                    <FileText size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>
          <button className="w-full py-3 text-xs font-bold text-emerald-700 hover:bg-emerald-50 border-t border-gray-50 transition-all uppercase tracking-widest">
            {t('viewAllDiagnosis')}
          </button>
        </section>
      </div>
    </div>
  );
};

export default MedicalDashboard;
