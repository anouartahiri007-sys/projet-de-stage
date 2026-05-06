import { 
  Users, Activity, ClipboardList, 
  ArrowUpRight, ArrowDownRight, 
  FileText, Award, ChevronRight,
  TrendingUp, Calendar, CheckCircle2, AlertCircle,
  FilePlus, UserPlus as UserPlusIcon, Download, History,
  Zap, Bell, Search, Star, BarChart3
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../lib/auth';
import { useLang } from '../context/LangContext';

const RECENT_ACTIVITIES = (t: any, lang: string) => [
  {
    id: 1, name: lang === 'ar' ? 'ياسين بومدين' : 'Yassine Boumediane', desc: lang === 'ar' ? 'تم تحديث ملفه الإداري (وضعية الموظف)' : 'Dossier administratif mis à jour (Statut)',
    time: '2h', tag: lang === 'ar' ? 'إداري' : 'Admin', tagColor: 'text-emerald-700 bg-emerald-50',
    icon: <History size={14} />
  },
  {
    id: 2, name: lang === 'ar' ? 'قسم الموارد البشرية' : 'Service RH', desc: lang === 'ar' ? 'إصدار 12 وثيقة إدارية جديدة' : '12 nouveaux documents générés',
    time: '5h', tag: lang === 'ar' ? 'وثائق' : 'Documents', tagColor: 'text-blue-700 bg-blue-50',
    icon: <FileText size={14} />
  },
  {
    id: 3, name: lang === 'ar' ? 'مصلحة التعمير' : 'Service Urbanisme', desc: lang === 'ar' ? 'طلب تعيين جديد قيد المعالجة' : 'Nouvelle nomination en cours',
    time: '1d', tag: lang === 'ar' ? 'التعيينات' : 'Nominations', tagColor: 'text-amber-700 bg-amber-50',
    icon: <Star size={14} />
  }
];

const PENDING_TASKS = (lang: string) => [
  { id: 1, title: lang === 'ar' ? 'المصادقة على القرارات الإدارية 2025' : 'Validation des actes administratifs 2025', priority: 'high', date: 'اليوم' },
  { id: 2, title: lang === 'ar' ? 'مراجعة ملفات الموظفين الجدد' : 'Revue des dossiers des nouveaux agents', priority: 'medium', date: 'غداً' },
  { id: 3, title: lang === 'ar' ? 'تحديث قاعدة بيانات المصلحة التقنية' : 'Mise à jour base de données Service Technique', priority: 'low', date: '25 ماي' },
];

const Dashboard = () => {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const { t, lang } = useLang();
  
  const stats = [
    { label: lang === 'ar' ? 'إجمالي الموظفين' : 'Effectif Total', value: '1,284', trend: '+12%', color: 'emerald', icon: <Users size={24} /> },
    { label: lang === 'ar' ? 'الطلبات المعلقة' : 'Demandes en attente', value: '89', trend: '-5%', color: 'blue', icon: <ClipboardList size={24} /> },
    { label: lang === 'ar' ? 'ميزانية الموارد' : 'Budget RH', value: '4.2M', trend: '+2%', color: 'amber', icon: <TrendingUp size={24} /> },
    { label: lang === 'ar' ? 'القرارات النشطة' : 'Actes Actifs', value: '156', trend: '+8%', color: 'purple', icon: <FileText size={24} /> },
  ];

  return (
    <div className="animate-premium-in space-y-12 pb-20" dir={lang === 'ar' ? 'rtl' : 'ltr'}>

      {/* --- EXECUTIVE WELCOME HERO --- */}
      <section className="relative rounded-[3.5rem] p-12 md:p-16 text-white overflow-hidden shadow-2xl bg-gradient-to-br from-[#003366] via-[#004d33] to-[#006241] border border-white/10">
        <div className="absolute inset-0 pattern-moroccan opacity-10 mix-blend-overlay"></div>
        <div className="absolute -top-20 -right-20 w-[600px] h-[600px] bg-white/5 rounded-full blur-[150px]"></div>
        
        <div className="relative z-10 flex flex-col lg:flex-row justify-between items-center gap-12">
          <div className={lang === 'ar' ? 'text-right' : 'text-left'}>
            <div className="inline-flex items-center gap-3 px-5 py-2.5 bg-white/10 backdrop-blur-2xl rounded-2xl text-[10px] font-black uppercase tracking-[0.3em] mb-8 border border-white/20">
              <span className="w-2.5 h-2.5 bg-emerald-400 rounded-full animate-pulse shadow-[0_0_15px_#34d399]"></span>
              {lang === 'ar' ? 'نظام التدبير الموحد' : 'Système de Gestion Unifié'}
            </div>
            <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tight leading-tight">
              {t('welcome')}, <br />
              <span className="text-[#C5A059]">{user?.name || (lang === 'ar' ? 'سعاد الإدريسي' : 'Souad Idrissi')}</span>
            </h1>
            <p className="text-emerald-50/70 text-xl font-medium max-w-2xl leading-relaxed">
               {lang === 'ar' 
                 ? 'لوحة القيادة المركزية لتدبير الموارد البشرية. تتبع أداء الموظفين والقرارات الإدارية بكفاءة عالية.'
                 : 'Tableau de bord central des RH. Suivi des performances et actes administratifs avec une efficacité optimale.'
               }
            </p>
          </div>
          
          <div className="grid grid-cols-2 gap-5 w-full lg:w-auto shrink-0">
             <button onClick={() => navigate('/rh/employees/add')} className="flex flex-col items-center justify-center gap-4 p-8 bg-white/10 backdrop-blur-md rounded-[2.5rem] border border-white/20 hover:bg-white/20 transition-all group shadow-2xl">
                <div className="w-14 h-14 bg-[#C5A059] rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                   <UserPlusIcon size={28} />
                </div>
                <span className="text-[10px] font-black uppercase tracking-widest">{t('addEmployee')}</span>
             </button>
             <button onClick={() => navigate('/rh/acts')} className="flex flex-col items-center justify-center gap-4 p-8 bg-white/10 backdrop-blur-md rounded-[2.5rem] border border-white/20 hover:bg-white/20 transition-all group shadow-2xl">
                <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                   <FileText size={28} />
                </div>
                <span className="text-[10px] font-black uppercase tracking-widest">{lang === 'ar' ? 'قرار إداري' : 'Acte Admin'}</span>
             </button>
          </div>
        </div>
      </section>

      {/* --- KPI STATS GRID --- */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {stats.map((stat, i) => (
          <div key={i} className="gov-card p-10 flex flex-col group">
            <div className="flex items-center justify-between mb-8">
              <div className={`p-5 rounded-2xl bg-${stat.color}-50 text-${stat.color}-600 group-hover:scale-110 transition-transform duration-500`}>
                {stat.icon}
              </div>
              <div className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-[10px] font-black ${stat.trend.startsWith('+') ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-500'}`}>
                {stat.trend.startsWith('+') ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                {stat.trend}
              </div>
            </div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.25em] mb-2">{stat.label}</p>
            <p className="text-4xl font-black text-[#003366]">{stat.value}</p>
          </div>
        ))}
      </section>

      {/* --- MAIN DASHBOARD CONTENT --- */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">

        {/* RECENT ACTIVITY & TASKS */}
        <div className="lg:col-span-8 space-y-10">
           
           {/* Pending Tasks Queue */}
           <section className="gov-card overflow-hidden">
              <div className="p-10 border-b border-gray-50 flex items-center justify-between">
                 <h2 className="text-2xl font-black text-[#003366]">{lang === 'ar' ? 'قائمة المهام العاجلة' : 'File des tâches urgentes'}</h2>
                 <button className="p-3 bg-[#F8FAFC] text-slate-400 hover:text-[#006241] rounded-2xl transition-all">
                    <Zap size={20} />
                 </button>
              </div>
              <div className="p-6 space-y-4">
                 {PENDING_TASKS(lang).map(task => (
                    <div key={task.id} className="flex items-center justify-between p-6 rounded-3xl border border-transparent hover:border-emerald-100 hover:bg-emerald-50/20 transition-all group cursor-pointer">
                       <div className="flex items-center gap-6">
                          <div className={`w-3.5 h-3.5 rounded-full ${task.priority === 'high' ? 'bg-rose-500 shadow-[0_0_12px_#f43f5e]' : task.priority === 'medium' ? 'bg-amber-500 shadow-[0_0_12px_#f59e0b]' : 'bg-blue-500 shadow-[0_0_12px_#3b82f6]'}`}></div>
                          <span className="font-bold text-slate-700 text-lg">{task.title}</span>
                       </div>
                       <div className="flex items-center gap-6">
                          <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest">{task.date}</span>
                          <ChevronRight size={20} className={`text-slate-200 group-hover:text-[#006241] transition-all ${lang === 'ar' ? 'rotate-180' : ''}`} />
                       </div>
                    </div>
                 ))}
              </div>
           </section>

           {/* Live Activity Feed */}
           <section className="gov-card overflow-hidden">
              <div className="p-10 border-b border-gray-50 flex items-center justify-between">
                 <h2 className="text-2xl font-black text-[#003366]">{t('recentActivities')}</h2>
                 <button onClick={() => navigate('/rh/eval-history')} className="text-[10px] font-black uppercase tracking-widest text-[#C5A059] hover:underline flex items-center gap-2">
                    {t('showAll')} <ChevronRight size={18} className={lang === 'ar' ? 'rotate-180' : ''} />
                 </button>
              </div>
              <div className="divide-y divide-gray-50">
                {RECENT_ACTIVITIES(t, lang).map(activity => (
                  <div key={activity.id} className="p-10 hover:bg-[#F8FAFC] transition-all flex items-start gap-10 group">
                    <div className="w-16 h-16 rounded-3xl bg-white border border-gray-100 shadow-xl flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-500 text-[#006241]">
                      {activity.icon}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="font-black text-[#003366] text-xl">{activity.name}</h3>
                        <span className="text-[10px] text-slate-300 font-black uppercase tracking-widest">{activity.time}</span>
                      </div>
                      <p className="text-slate-500 font-medium mb-4 leading-relaxed">{activity.desc}</p>
                      <span className={`text-[10px] font-black uppercase px-4 py-2 rounded-xl border tracking-[0.15em] ${activity.tagColor}`}>
                        {activity.tag}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
           </section>
        </div>

        {/* SIDEBAR QUICK ACCESS & INSIGHTS */}
        <div className="lg:col-span-4 space-y-10">
           
           {/* Direct Actions Grid */}
           <section className="gov-card p-10">
              <h2 className="text-xl font-black text-[#003366] mb-10">{t('quickAccess')}</h2>
              <div className="grid grid-cols-2 gap-5">
                 {[
                   { label: t('employees'), icon: <Users size={28} />, path: '/rh/employees', color: 'emerald' },
                   { label: t('administrativeActs'), icon: <FileText size={28} />, path: '/rh/acts', color: 'amber' },
                   { label: t('statistics'), icon: <BarChart3 size={28} />, path: '/rh/statistics', color: 'blue' },
                   { label: t('documents'), icon: <FileText size={28} />, path: '/rh/documents', color: 'slate' },
                 ].map((item, i) => (
                   <button
                     key={i}
                     onClick={() => navigate(item.path)}
                     className="flex flex-col items-center justify-center gap-4 p-8 rounded-[2.5rem] border border-gray-100 bg-[#F8FAFC] hover:bg-white hover:border-[#C5A059] hover:shadow-2xl hover:shadow-blue-900/10 transition-all group"
                   >
                     <div className="text-slate-300 group-hover:text-[#C5A059] transition-colors">
                        {item.icon}
                     </div>
                     <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 group-hover:text-[#003366] transition-colors text-center">
                        {item.label}
                     </span>
                   </button>
                 ))}
              </div>
           </section>

           {/* Executive Briefing Card */}
           <section className="relative rounded-[3rem] p-10 text-white overflow-hidden bg-[#003366] shadow-2xl">
              <div className="absolute top-0 right-0 w-48 h-48 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
              <div className="relative z-10 space-y-8">
                 <div className="w-16 h-16 bg-[#C5A059] rounded-2xl flex items-center justify-center shadow-2xl">
                    <TrendingUp size={32} />
                 </div>
                 <div>
                    <h3 className="text-2xl font-black mb-4">{t('overview')}</h3>
                    <p className="text-blue-100/70 text-sm leading-relaxed font-bold">
                       {lang === 'ar' 
                         ? 'تمت معالجة جميع ملفات الموظفين لهذا الأسبوع. نلاحظ تحسناً في الكفاءة الإدارية بنسبة 15% بعد تفعيل موديول العقود الجديد.'
                         : 'Tous les dossiers des agents traités cette semaine. Efficacité administrative en hausse de 15% via le nouveau module.'
                       }
                    </p>
                 </div>
                 <button onClick={() => navigate('/rh/statistics')} className="w-full py-4 bg-white/10 hover:bg-white text-white hover:text-[#003366] rounded-2xl text-[10px] font-black uppercase tracking-[0.25em] transition-all border border-white/10">
                    {lang === 'ar' ? 'عرض الإحصائيات' : 'Voir les statistiques'}
                 </button>
              </div>
           </section>

           {/* System Integrity Check */}
           <section className="bg-emerald-50 rounded-[3rem] p-8 border border-emerald-100 flex items-center gap-8">
              <div className="w-16 h-16 bg-white rounded-[1.5rem] flex items-center justify-center text-emerald-600 shadow-xl">
                 <CheckCircle2 size={32} />
              </div>
              <div>
                 <p className="text-[10px] font-black text-emerald-700/50 uppercase tracking-widest mb-1">{t('statut')}</p>
                 <h4 className="text-emerald-700 font-black text-xl">{t('systemOk')}</h4>
              </div>
           </section>
        </div>

      </div>
    </div>
  );
};

export default Dashboard;
