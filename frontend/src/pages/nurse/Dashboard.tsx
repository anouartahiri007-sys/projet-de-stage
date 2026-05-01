import { Users, ClipboardList, Activity, Syringe, Plus, Clock, AlertCircle, Bell, ArrowUpRight, TrendingUp, Calendar, User } from 'lucide-react';

const NurseDashboard = () => {
  const stats = [
    { label: 'إجمالي المرضى', value: '852', trend: '+12 هذا الشهر', icon: <Users size={24} />, color: 'emerald' },
    { label: 'الحالات تحت المتابعة', value: '36', trend: '+5 جديدة', icon: <ClipboardList size={24} />, color: 'amber' },
    { label: 'العلاجات المقدمة', value: '128', trend: '+18 هذا الأسبوع', icon: <Syringe size={24} />, color: 'blue' },
    { label: 'المؤشرات المسجلة', value: '214', trend: '+30 هذا الأسبوع', icon: <Activity size={24} />, color: 'purple' },
  ];

  const appointments = [
    { name: 'أحمد العلوي', time: '09:30', date: '20 ماي 2024', type: 'متابعة حالة', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=100&q=80' },
    { name: 'سمية أيت الطالب', time: '10:15', date: '20 ماي 2024', type: 'قياس المؤشرات', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80' },
    { name: 'الحسين مرابط', time: '11:00', date: '20 ماي 2024', type: 'تقديم علاج', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=100&q=80' },
    { name: 'نورة القاسمي', time: '12:00', date: '20 ماي 2024', type: 'متابعة حالة', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=100&q=80' },
    { name: 'رضوان الوهابي', time: '12:45', date: '20 ماي 2024', type: 'قياس المؤشرات', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80' },
  ];

  const followUpCases = [
    { name: 'فاطمة الزهراء الإدريسي', disease: 'ارتفاع ضغط الدم', severity: 'عالية', date: '18 ماي 2024', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=100&q=80' },
    { name: 'محمد أمين الناصري', disease: 'سكري من النوع 2', severity: 'متوسطة', date: '17 ماي 2024', avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=100&q=80' },
    { name: 'سعاد الحاجي', disease: 'فقر دم', severity: 'منخفضة', date: '16 ماي 2024', avatar: 'https://images.unsplash.com/photo-1554151228-14d9def656e4?auto=format&fit=crop&w=100&q=80' },
    { name: 'أحمد العلوي', disease: 'حساسية صدرية', severity: 'متوسطة', date: '15 ماي 2024', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=100&q=80' },
  ];

  const recentIndicators = [
    { patient: 'أحمد العلوي', type: 'ضغط الدم', value: '120/80', time: '09:00 - 20 ماي 2024' },
    { patient: 'سمية أيت الطالب', type: 'الحرارة', value: '36.7 °C', time: '10:15 - 20 ماي 2024' },
    { patient: 'الحسين مرابط', type: 'السكر', value: '1.20 g/L', time: '11:00 - 20 ماي 2024' },
    { patient: 'نورة القاسمي', type: 'الضغط', value: '110/70', time: '12:00 - 20 ماي 2024' },
  ];

  return (
    <div className="space-y-8 animate-slide-up pb-12">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <div key={i} className="gov-card p-6 flex items-center gap-5 group hover:scale-[1.02] transition-all">
            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shadow-inner group-hover:rotate-12 transition-transform ${stat.color === 'emerald' ? 'bg-emerald-50 text-emerald-600' :
                stat.color === 'amber' ? 'bg-amber-50 text-amber-600' :
                  stat.color === 'blue' ? 'bg-blue-50 text-blue-600' :
                    'bg-purple-50 text-purple-600'
              }`}>
              {stat.icon}
            </div>
            <div>
              <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-1">{stat.label}</p>
              <p className="text-2xl font-black text-gray-800">{stat.value}</p>
              <div className="flex items-center gap-1 text-[10px] font-bold text-emerald-600 mt-1">
                <ArrowUpRight size={10} />
                {stat.trend}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Appointments Section */}
        <div className="lg:col-span-4 gov-card overflow-hidden">
          <div className="p-5 border-b border-gray-100 flex items-center justify-between bg-gray-50/30">
            <h3 className="font-bold text-gray-800 flex items-center gap-2">
              <Calendar size={18} className="text-emerald-600" />
              جدول المواعيد
            </h3>
          </div>
          <div className="divide-y divide-gray-50">
            {appointments.map((appt, i) => (
              <div key={i} className="p-4 hover:bg-gray-50 transition-colors flex items-center justify-between group">
                <div className="flex items-center gap-3">
                  <img src={appt.avatar} className="w-10 h-10 rounded-full border-2 border-white shadow-sm" alt="" />
                  <div>
                    <h4 className="font-bold text-gray-800 text-sm group-hover:text-emerald-700 transition-colors">{appt.name}</h4>
                    <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest">{appt.type}</p>
                  </div>
                </div>
                <div className="text-left">
                  <p className="text-xs font-black text-emerald-600">{appt.time}</p>
                  <p className="text-[9px] text-gray-400 font-bold">{appt.date}</p>
                </div>
              </div>
            ))}
          </div>
          <button className="w-full py-3 text-[10px] font-black text-gray-500 uppercase tracking-widest hover:bg-gray-100 transition-all border-t border-gray-50">
            عرض جميع المواعيد
          </button>
        </div>

        {/* Follow-up Cases Section */}
        <div className="lg:col-span-4 gov-card overflow-hidden">
          <div className="p-5 border-b border-gray-100 flex items-center justify-between bg-gray-50/30">
            <h3 className="font-bold text-gray-800 flex items-center gap-2">
              <ClipboardList size={18} className="text-emerald-600" />
              الحالات تحت المتابعة
            </h3>
          </div>
          <div className="divide-y divide-gray-50">
            {followUpCases.map((caseItem, i) => (
              <div key={i} className="p-4 hover:bg-gray-50 transition-colors flex items-center gap-4 group">
                <span className={`px-2 py-0.5 rounded text-[8px] font-black uppercase tracking-widest ${caseItem.severity === 'عالية' ? 'bg-rose-50 text-rose-600 border border-rose-100' :
                    caseItem.severity === 'متوسطة' ? 'bg-amber-50 text-amber-600 border border-amber-100' :
                      'bg-emerald-50 text-emerald-600 border border-emerald-100'
                  }`}>
                  {caseItem.severity}
                </span>
                <div className="flex items-center gap-3 flex-1">
                  <img src={caseItem.avatar} className="w-10 h-10 rounded-full border-2 border-white shadow-sm" alt="" />
                  <div>
                    <h4 className="font-bold text-gray-800 text-sm group-hover:text-emerald-700 transition-colors">{caseItem.name}</h4>
                    <p className="text-[10px] text-gray-400 font-bold uppercase">{caseItem.disease}</p>
                    <p className="text-[9px] text-gray-300 font-bold mt-0.5">آخر متابعة: {caseItem.date}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <button className="w-full py-3 text-[10px] font-black text-gray-500 uppercase tracking-widest hover:bg-gray-100 transition-all border-t border-gray-50">
            عرض جميع الحالات
          </button>
        </div>

        {/* Quick Actions & Notifications */}
        <div className="lg:col-span-4 space-y-6">
          <div className="gov-card p-6">
            <h3 className="font-bold text-gray-800 mb-6 flex items-center gap-2">
              <TrendingUp size={18} className="text-emerald-600" />
              إجراءات سريعة
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <button className="flex flex-col items-center justify-center p-4 bg-gray-50 border border-gray-100 rounded-2xl hover:bg-emerald-50 hover:border-emerald-200 hover:shadow-lg transition-all group">
                <Activity className="text-emerald-600 mb-3 group-hover:scale-110 transition-transform" size={24} />
                <span className="text-xs font-bold text-gray-700">تسجيل مؤشر صحي</span>
              </button>
              <button className="flex flex-col items-center justify-center p-4 bg-gray-50 border border-gray-100 rounded-2xl hover:bg-emerald-50 hover:border-emerald-200 hover:shadow-lg transition-all group">
                <Plus className="text-emerald-600 mb-3 group-hover:scale-110 transition-transform" size={24} />
                <span className="text-xs font-bold text-gray-700">إضافة علاج جديد</span>
              </button>
              <button className="flex flex-col items-center justify-center p-4 bg-gray-50 border border-gray-100 rounded-2xl hover:bg-emerald-50 hover:border-emerald-200 hover:shadow-lg transition-all group">
                <Users className="text-emerald-600 mb-3 group-hover:scale-110 transition-transform" size={24} />
                <span className="text-xs font-bold text-gray-700">إضافة مريض جديد</span>
              </button>
              <button className="flex flex-col items-center justify-center p-4 bg-gray-50 border border-gray-100 rounded-2xl hover:bg-emerald-50 hover:border-emerald-200 hover:shadow-lg transition-all group">
                <ClipboardList className="text-emerald-600 mb-3 group-hover:scale-110 transition-transform" size={24} />
                <span className="text-xs font-bold text-gray-700">تتبع حالة</span>
              </button>
            </div>
          </div>

          <div className="gov-card p-6">
            <h3 className="font-bold text-gray-800 mb-6 flex items-center gap-2">
              <Bell size={18} className="text-emerald-600" />
              آخر الإشعارات
            </h3>
            <div className="space-y-6">
              {[
                { title: 'تم تحديث حالة المريض أحمد العلوي', time: 'منذ 5 دقائق', color: 'bg-emerald-500' },
                { title: 'تم تسجيل مؤشر صحي جديد', time: 'منذ 15 دقيقة', color: 'bg-blue-500' },
                { title: 'موعد متابعة مع المريض فاطمة الزهراء الإدريسي', time: 'منذ 30 دقيقة', color: 'bg-amber-500' },
              ].map((notif, i) => (
                <div key={i} className="flex gap-4 relative">
                  <div className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${notif.color}`}></div>
                  <div>
                    <h4 className="text-xs font-bold text-gray-700 leading-tight">{notif.title}</h4>
                    <p className="text-[10px] text-gray-400 font-bold mt-1">{notif.time}</p>
                  </div>
                </div>
              ))}
            </div>
            <button className="w-full mt-6 py-3 bg-gray-50 text-[10px] font-black text-gray-400 uppercase tracking-widest rounded-xl hover:bg-gray-100 transition-all">
              عرض جميع الإشعارات
            </button>
          </div>
        </div>

        {/* Recent Indicators Table */}
        <div className="lg:col-span-8 gov-card overflow-hidden h-fit">
          <div className="p-5 border-b border-gray-100 flex items-center justify-between bg-gray-50/30">
            <h3 className="font-bold text-gray-800 flex items-center gap-2">
              <Activity size={18} className="text-emerald-600" />
              آخر المؤشرات الصحية المسجلة
            </h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-right border-collapse">
              <thead>
                <tr className="bg-gray-50/50 text-[10px] font-black text-gray-400 uppercase tracking-widest">
                  <th className="p-4 border-b border-gray-100">المريض</th>
                  <th className="p-4 border-b border-gray-100">المؤشر</th>
                  <th className="p-4 border-b border-gray-100 text-center">القيمة</th>
                  <th className="p-4 border-b border-gray-100">التاريخ</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {recentIndicators.map((row, i) => (
                  <tr key={i} className="hover:bg-gray-50/50 transition-colors">
                    <td className="p-4 text-sm font-bold text-gray-800">{row.patient}</td>
                    <td className="p-4 text-xs font-bold text-gray-500">{row.type}</td>
                    <td className="p-4 text-center">
                      <span className="px-3 py-1 bg-emerald-50 text-emerald-700 rounded-lg text-xs font-black border border-emerald-100">
                        {row.value}
                      </span>
                    </td>
                    <td className="p-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">{row.time}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <button className="w-full py-3 text-[10px] font-black text-gray-500 uppercase tracking-widest hover:bg-gray-100 transition-all border-t border-gray-50">
            عرض جميع المؤشرات
          </button>
        </div>
      </div>
    </div>
  );
};

export default NurseDashboard;
