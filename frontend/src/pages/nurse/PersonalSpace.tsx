import { Star, TrendingUp, Calendar, FileText, Bell, CheckCircle, Clock, Download, Plus, ArrowRight, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// --- Evaluations Page ---
export const NurseEvaluations = () => (
  <div className="space-y-6 animate-slide-up pb-12">
    <h1 className="text-2xl font-bold text-gray-800">تقييم الأداء</h1>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {[2023, 2022].map(year => (
        <div key={year} className="gov-card p-8 group hover:border-emerald-500 transition-all">
          <div className="flex justify-between items-start mb-6">
            <div className="p-4 bg-emerald-50 text-emerald-600 rounded-2xl group-hover:scale-110 transition-transform"><Star size={24} /></div>
            <span className="text-3xl font-black text-gray-200 group-hover:text-emerald-100 transition-colors">{year}</span>
          </div>
          <h3 className="text-xl font-bold text-gray-800 mb-2">التقييم السنوي {year}</h3>
          <p className="text-sm text-gray-400 mb-6 font-bold uppercase tracking-widest">تاريخ التقييم: 15 دجنبر {year}</p>
          <div className="flex justify-between items-center p-4 bg-gray-50 rounded-2xl">
             <span className="text-xs font-black text-gray-400 uppercase tracking-widest">النقطة النهائية</span>
             <span className="text-2xl font-black text-emerald-600">18.5 / 20</span>
          </div>
        </div>
      ))}
    </div>
  </div>
);

// --- Promotions Page ---
export const NursePromotions = () => (
  <div className="space-y-6 animate-slide-up pb-12">
    <h1 className="text-2xl font-bold text-gray-800 tracking-tight font-heading">سجل الترقيات</h1>
    <div className="gov-card overflow-hidden">
      <div className="p-8 space-y-12 relative">
        <div className="absolute top-0 right-12 bottom-0 w-0.5 bg-gray-100"></div>
        {[
          { title: 'الترقية إلى الدرجة الأولى', date: 'يونيو 2021', desc: 'بناءً على الكفاءة المهنية' },
          { title: 'ترقية في الرتبة (الرتبة 5)', date: 'يناير 2021', desc: 'أقدمية سنتين' },
          { title: 'الترسيم في الوظيفة', date: 'ماي 2018', desc: 'بعد انتهاء فترة التدريب' }
        ].map((item, i) => (
          <div key={i} className="relative pr-16 group">
            <div className="absolute right-[-6px] top-1 w-3 h-3 rounded-full bg-white border-4 border-emerald-500 group-hover:scale-150 transition-transform z-10"></div>
            <div>
              <span className="text-[10px] font-black text-emerald-600 uppercase tracking-[0.2em]">{item.date}</span>
              <h3 className="text-lg font-bold text-gray-800 mt-1">{item.title}</h3>
              <p className="text-sm text-gray-400 font-medium mt-1">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

// --- Leaves Page ---
export const NurseLeaves = () => {
  const navigate = useNavigate();
  return (
    <div className="space-y-6 animate-slide-up pb-12">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">العطل والغيابات</h1>
        <button className="bg-emerald-600 text-white px-6 py-2.5 rounded-xl font-bold flex items-center gap-2 hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-200 text-sm">
           <Plus size={18} />
           طلب عطلة جديدة
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
         {[
           { label: 'الرصيد السنوي', value: '22 يوم', color: 'emerald' },
           { label: 'رصيد مستهلك', value: '08 أيام', color: 'blue' },
           { label: 'قيد الطلب', value: '03 أيام', color: 'amber' }
         ].map((stat, i) => (
           <div key={i} className={`gov-card p-6 border-b-4 ${stat.color === 'emerald' ? 'border-emerald-500' : stat.color === 'blue' ? 'border-blue-500' : 'border-amber-500'}`}>
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">{stat.label}</p>
              <p className="text-2xl font-black text-gray-800">{stat.value}</p>
           </div>
         ))}
      </div>
      <div className="gov-card overflow-hidden">
         <div className="p-6 border-b border-gray-50 bg-gray-50/30 flex items-center justify-between">
            <h3 className="font-bold text-gray-800 text-sm">آخر الطلبات</h3>
         </div>
         <table className="w-full text-right">
            <thead>
               <tr className="text-[10px] font-black text-gray-400 uppercase tracking-widest bg-gray-50/50">
                  <th className="p-4">نوع العطلة</th>
                  <th className="p-4">الفترة</th>
                  <th className="p-4">المدة</th>
                  <th className="p-4 text-center">الحالة</th>
               </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
               {[
                 { type: 'عطلة سنوية', period: '2024/07/01 - 2024/07/15', duration: '15 يوم', status: 'pending' },
                 { type: 'عطلة إدارية', period: '2023/12/20 - 2023/12/27', duration: '07 أيام', status: 'approved' }
               ].map((item, i) => (
                 <tr key={i} className="text-sm font-bold text-gray-700">
                    <td className="p-4">{item.type}</td>
                    <td className="p-4 text-gray-400 font-medium">{item.period}</td>
                    <td className="p-4">{item.duration}</td>
                    <td className="p-4 text-center">
                       <span className={`px-2 py-0.5 rounded text-[8px] font-black uppercase ${item.status === 'approved' ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'}`}>
                          {item.status === 'approved' ? 'مقبول' : 'قيد المعالجة'}
                       </span>
                    </td>
                 </tr>
               ))}
            </tbody>
         </table>
      </div>
    </div>
  );
};

// --- Documents Page ---
export const NurseDocuments = () => (
  <div className="space-y-6 animate-slide-up pb-12">
    <h1 className="text-2xl font-bold text-gray-800">الأرشيف والوثائق الرقمية</h1>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {[
        { name: 'قرار الترسيم', size: '1.2 MB', date: '2018/05/12' },
        { name: 'كشف الأجر الأخير', size: '450 KB', date: '2024/05/01' },
        { name: 'شهادة العمل', size: '800 KB', date: '2024/01/10' },
        { name: 'قرار الترقية 2021', size: '1.5 MB', date: '2021/06/15' }
      ].map((doc, i) => (
        <div key={i} className="gov-card p-6 flex flex-col group hover:border-emerald-500 transition-all">
           <div className="p-4 bg-gray-50 rounded-2xl w-fit mb-6 text-gray-400 group-hover:bg-emerald-50 group-hover:text-emerald-600 transition-all">
              <FileText size={32} />
           </div>
           <h3 className="font-bold text-gray-800 mb-1 group-hover:text-emerald-700 transition-colors">{doc.name}</h3>
           <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-6">{doc.size} • {doc.date}</p>
           <button className="w-full py-3 border border-gray-100 rounded-xl text-[10px] font-black uppercase tracking-widest text-gray-500 hover:bg-emerald-600 hover:text-white hover:border-emerald-600 transition-all flex items-center justify-center gap-2">
              <Download size={14} />
              تحميل الملف
           </button>
        </div>
      ))}
    </div>
  </div>
);

// --- Notifications Page ---
export const NurseNotifications = () => (
  <div className="space-y-6 animate-slide-up pb-12">
    <h1 className="text-2xl font-bold text-gray-800">مركز الإشعارات</h1>
    <div className="gov-card divide-y divide-gray-50 overflow-hidden">
      {[
        { title: 'تمت المصادقة على طلب العطلة السنوية', desc: 'يمكنكم تحميل قرار العطلة من فضاء الوثائق.', date: 'منذ ساعتين', icon: <CheckCircle className="text-emerald-600" />, unread: true },
        { title: 'تنبيه: ميعاد فحص دوري للمريض أحمد العلوي', desc: 'يرجى مراجعة جدول المواعيد لليوم.', date: 'منذ 5 ساعات', icon: <Clock className="text-amber-600" />, unread: true },
        { title: 'رسالة جديدة من إدارة الموارد البشرية', desc: 'بخصوص تحديث البيانات المهنية السنوية.', date: 'أمس في 10:00', icon: <Bell className="text-blue-600" />, unread: false }
      ].map((n, i) => (
        <div key={i} className={`p-6 flex gap-6 hover:bg-gray-50 transition-all cursor-pointer relative ${n.unread ? 'bg-emerald-50/30' : ''}`}>
           {n.unread && <div className="absolute top-0 right-0 w-1 h-full bg-emerald-500"></div>}
           <div className="p-4 bg-white rounded-2xl shadow-sm border border-gray-100 h-fit">{n.icon}</div>
           <div className="flex-1">
              <div className="flex justify-between items-start mb-2">
                 <h3 className="font-bold text-gray-800">{n.title}</h3>
                 <span className="text-[10px] font-bold text-gray-400">{n.date}</span>
              </div>
              <p className="text-sm text-gray-500 leading-relaxed font-medium">{n.desc}</p>
           </div>
        </div>
      ))}
    </div>
  </div>
);
