import { useState } from 'react';
import { 
  Users, Activity, Calendar, FileText, 
  Clock, CheckCircle, AlertCircle, Plus, 
  Search, TrendingUp, Bell, ChevronRight,
  ArrowUpRight, MapPin, UserCheck, Stethoscope,
  ClipboardList, FilePlus
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const APPOINTMENTS = [
  { id: 1, time: '09:30', date: '20 ماي 2024', title: 'فاطمة الزهراء الإدريسي', desc: 'استشارة عامة', img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80' },
  { id: 2, time: '10:15', date: '20 ماي 2024', title: 'محمد أمين الناصري', desc: 'متابعة حالة', img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=100&q=80' },
  { id: 3, time: '11:00', date: '20 ماي 2024', title: 'سعاد الحاجي', desc: 'ضغط الدم', img: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=100&q=80' },
  { id: 4, time: '12:00', date: '20 ماي 2024', title: 'رضوان الوهابي', desc: 'ألم في الظهر', img: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=100&q=80' },
  { id: 5, time: '12:45', date: '20 ماي 2024', title: 'نورة القاسمي', desc: 'استشارة عامة', img: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=100&q=80' },
];

const FOLLOW_UP = [
  { id: 1, name: 'الحسين مرابط', desc: 'سكري نوع 2', time: 'آخر متابعة: 18 ماي 2024', status: 'عالية', color: 'bg-rose-50 text-rose-700 border-rose-100', img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80' },
  { id: 2, name: 'خديجة بوعزة', desc: 'ارتفاع ضغط الدم', time: 'آخر متابعة: 17 ماي 2024', status: 'متوسطة', color: 'bg-amber-50 text-amber-700 border-amber-100', img: 'https://images.unsplash.com/photo-1554151228-14d9def656e4?auto=format&fit=crop&w=100&q=80' },
  { id: 3, name: 'أحمد العلوي', desc: 'حساسية صدرية', time: 'آخر متابعة: 15 ماي 2024', status: 'منخفضة', color: 'bg-emerald-50 text-emerald-700 border-emerald-100', img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=100&q=80' },
  { id: 4, name: 'سمية أيت الطالب', desc: 'فقر دم', time: 'آخر متابعة: 15 ماي 2024', status: 'متوسطة', color: 'bg-amber-50 text-amber-700 border-amber-100', img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80' },
];

const RECENT_DIAGNOSIS = [
  { id: 1, name: 'الحسين مرابط - سكري نوع 2', desc: 'تم تعديل العلاج، متابعة بعد أسبوعين', date: '18 ماي 2024' },
  { id: 2, name: 'خديجة بوعزة - ارتفاع ضغط الدم', desc: 'تحسن ملحوظ، الاستمرار على العلاج الحالي', date: '17 ماي 2024' },
  { id: 3, name: 'أحمد العلوي - حساسية صدرية', desc: 'وصف دواء مضاد للحساسية', date: '15 ماي 2024' },
];

const MedicalDashboard = () => {
  const navigate = useNavigate();

  const stats = [
    { label: 'إجمالي المرضى', value: '1,248', trend: '+2 هذا الشهر', bgColor: 'bg-emerald-50', textColor: 'text-emerald-600', icon: <Users size={20} /> },
    { label: 'المواعيد اليوم', value: '8', trend: '8 قادمة', bgColor: 'bg-blue-50', textColor: 'text-blue-600', icon: <Calendar size={20} /> },
    { label: 'الحالات قيد المتابعة', value: '24', trend: '+5 جديدة', bgColor: 'bg-orange-50', textColor: 'text-orange-600', icon: <ClipboardList size={20} /> },
    { label: 'الشواهد الطبية', value: '15', trend: 'هذا الشهر', bgColor: 'bg-teal-50', textColor: 'text-teal-600', icon: <FileText size={20} /> },
  ];

  const quickActions = [
    { icon: <FilePlus size={22} />, label: 'ملف طبي جديد', onClick: () => navigate('/medical/patients/add') },
    { icon: <Stethoscope size={22} />, label: 'تشخيص جديد', onClick: () => navigate('/medical/diagnosis/add') },
    { icon: <FileText size={22} />, label: 'شهادة طبية', onClick: () => navigate('/medical/certificates/issue') },
    { icon: <Calendar size={22} />, label: 'موعد جديد', onClick: () => navigate('/medical/appointments') },
  ];

  return (
    <div className="animate-slide-up space-y-8 pb-12">
      
      {/* --- STATS GRID --- */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <div key={i} className="gov-card p-6 flex flex-col group hover:scale-[1.03] transition-transform">
            <div className="flex items-center justify-between mb-4">
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
        <section className="lg:col-span-4 gov-card overflow-hidden">
          <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-gray-50/30">
            <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
              <Calendar size={20} className="text-emerald-600" />
              المواعيد القادمة
            </h2>
          </div>
          <div className="divide-y divide-slate-50">
            {APPOINTMENTS.map(item => (
              <div key={item.id} className="p-4 hover:bg-slate-50/50 transition-colors flex items-center gap-4">
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
            عرض جميع المواعيد
          </button>
        </section>

        {/* FOLLOW UP CASES */}
        <section className="lg:col-span-4 gov-card overflow-hidden">
          <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-gray-50/30">
            <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
              <Activity size={20} className="text-emerald-600" />
              الحالات قيد المتابعة
            </h2>
          </div>
          <div className="divide-y divide-slate-50">
            {FOLLOW_UP.map(item => (
              <div key={item.id} className="p-5 hover:bg-slate-50/50 transition-colors flex items-center justify-between">
                <div className="flex items-center gap-4">
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
            عرض جميع الحالات
          </button>
        </section>

        {/* QUICK ACTIONS & NOTIFICATIONS */}
        <section className="lg:col-span-4 space-y-8">
          <div className="gov-card p-6">
            <h2 className="text-lg font-bold text-gray-800 mb-5 flex items-center gap-2">
               <TrendingUp size={20} className="text-emerald-600" />
               إجراءات سريعة
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
            <button className="w-full mt-4 py-3 bg-gray-50 hover:bg-gray-100 rounded-xl text-xs font-bold text-gray-600 flex items-center justify-center gap-2 transition-all">
              <Search size={16} />
              بحث عن مريض
            </button>
          </div>

          <div className="gov-card p-6">
            <h2 className="text-lg font-bold text-gray-800 mb-5 flex items-center gap-2">
               <Bell size={20} className="text-emerald-600" />
               آخر الإشعارات
            </h2>
            <div className="space-y-4">
              {[
                { title: 'تم تأكيد موعد جديد للمريضة فاطمة الزهراء الإدريسي', time: 'منذ 10 دقائق', type: 'success' },
                { title: 'تم إصدار شهادة طبية للمريض محمد أمين الناصري', time: 'منذ 1 ساعة', type: 'success' },
                { title: 'نتيجة تحليل مخبري متوفرة للمريض سعاد الحاجي', time: 'منذ 3 ساعات', type: 'warning' },
              ].map((item, i) => (
                <div key={i} className="flex gap-3 items-start">
                   <div className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${item.type === 'success' ? 'bg-emerald-500' : 'bg-amber-500'}`}></div>
                   <div>
                      <p className="text-xs font-bold text-gray-700 leading-relaxed">{item.title}</p>
                      <p className="text-[10px] text-gray-400 mt-0.5">{item.time}</p>
                   </div>
                </div>
              ))}
            </div>
            <button className="w-full mt-6 py-2.5 text-xs font-bold text-emerald-700 border border-emerald-100 rounded-lg hover:bg-emerald-50 transition-all">
              عرض جميع الإشعارات
            </button>
          </div>
        </section>

        {/* RECENT DIAGNOSIS - FULL WIDTH AT BOTTOM */}
        <section className="lg:col-span-12 gov-card overflow-hidden">
          <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-gray-50/30">
            <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
              <ClipboardList size={20} className="text-emerald-600" />
              آخر التشخيصات والملاحظات
            </h2>
          </div>
          <div className="divide-y divide-slate-50">
            {RECENT_DIAGNOSIS.map(item => (
              <div key={item.id} className="p-5 hover:bg-slate-50/50 transition-colors flex items-center justify-between">
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
            عرض جميع التشخيصات
          </button>
        </section>
      </div>
    </div>
  );
};

export default MedicalDashboard;
