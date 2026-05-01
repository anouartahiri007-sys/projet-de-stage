import { Shield, Award, Calendar, Briefcase, ChevronRight, Info } from 'lucide-react';

const AdminStatus = () => {
  return (
    <div className="space-y-6 animate-slide-up pb-12">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">الحالة الإدارية</h1>
        <p className="text-sm text-gray-500 mt-1">الفضاء الشخصي / الوضعية الإدارية الحالية</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Main Status Card */}
        <div className="lg:col-span-8 space-y-6">
           <div className="gov-card p-8 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-32 h-32 bg-emerald-500/5 rounded-full -translate-x-16 -translate-y-16"></div>
              
              <div className="flex items-center gap-6 mb-10">
                 <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center shadow-inner">
                    <Shield size={32} />
                 </div>
                 <div>
                    <h2 className="text-xl font-black text-gray-800 tracking-tight">طبيب رئيس - الدرجة الممتازة</h2>
                    <p className="text-sm text-emerald-600 font-bold uppercase tracking-widest mt-1">رقم التأجير: 1245876</p>
                 </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                 {[
                    { label: 'السلم', value: 'خارج السلم', icon: <Award className="text-blue-500" /> },
                    { label: 'الرتبة', value: 'الرتبة 11', icon: <Briefcase className="text-purple-500" /> },
                    { label: 'تاريخ الترسيم', value: '12 ماي 2012', icon: <Calendar className="text-amber-500" /> },
                 ].map((item, i) => (
                    <div key={i} className="p-5 rounded-2xl bg-gray-50 border border-gray-100 group hover:bg-white hover:border-emerald-200 hover:shadow-lg transition-all">
                       <div className="mb-3 p-2 w-fit bg-white rounded-lg shadow-sm group-hover:scale-110 transition-transform">
                          {item.icon}
                       </div>
                       <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">{item.label}</p>
                       <p className="text-sm font-black text-gray-800">{item.value}</p>
                    </div>
                 ))}
              </div>
           </div>

           <div className="gov-card p-8">
              <h3 className="text-lg font-bold text-gray-800 mb-6">المسار الإداري</h3>
              <div className="space-y-6">
                 {[
                    { title: 'ترقية في الرتبة (الرتبة 11)', date: '01/01/2024', status: 'منجزة', color: 'text-emerald-600 bg-emerald-50' },
                    { title: 'ترقية في الدرجة (الدرجة الممتازة)', date: '15/06/2021', status: 'منجزة', color: 'text-emerald-600 bg-emerald-50' },
                    { title: 'تعيين في منصب طبيب رئيس', date: '10/02/2018', status: 'منجزة', color: 'text-emerald-600 bg-emerald-50' },
                 ].map((item, i) => (
                    <div key={i} className="flex items-center justify-between p-4 rounded-xl border border-gray-50 hover:bg-gray-50 transition-all cursor-default">
                       <div className="flex items-center gap-4">
                          <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                          <div>
                             <h4 className="text-sm font-bold text-gray-800">{item.title}</h4>
                             <p className="text-[10px] text-gray-400 font-bold mt-0.5">{item.date}</p>
                          </div>
                       </div>
                       <span className={`px-2 py-1 rounded-lg text-[8px] font-black uppercase ${item.color}`}>
                          {item.status}
                       </span>
                    </div>
                 ))}
              </div>
           </div>
        </div>

        {/* Info Sidebar */}
        <div className="lg:col-span-4 space-y-6">
           <div className="gov-card p-6 bg-emerald-900 text-white shadow-xl shadow-emerald-900/20">
              <div className="flex items-center gap-3 mb-6">
                 <div className="p-2 bg-white/10 rounded-lg"><Info size={20} /></div>
                 <h3 className="font-bold">تنبيهات إدارية</h3>
              </div>
              <p className="text-xs text-emerald-100/80 leading-relaxed font-medium mb-6">
                أنت مؤهل للترقية القادمة في الرتبة ابتداءً من يناير 2026. يرجى التأكد من تحديث ملف التقييم السنوي.
              </p>
              <button className="w-full py-3 bg-emerald-500 hover:bg-emerald-400 rounded-xl text-xs font-black uppercase tracking-widest transition-all">
                تحميل السجل الإداري (PDF)
              </button>
           </div>

           <div className="gov-card p-6">
              <h3 className="font-bold text-gray-800 mb-6">الوضعية الحالية</h3>
              <div className="space-y-4">
                 <div className="flex justify-between items-center pb-4 border-b border-gray-50">
                    <span className="text-xs text-gray-400 font-bold">الوضعية</span>
                    <span className="text-xs font-black text-emerald-600">في حالة نشاط</span>
                 </div>
                 <div className="flex justify-between items-center pb-4 border-b border-gray-50">
                    <span className="text-xs text-gray-400 font-bold">المصلحة</span>
                    <span className="text-xs font-black text-gray-700">الصحة الجماعية</span>
                 </div>
                 <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-400 font-bold">المقر</span>
                    <span className="text-xs font-black text-gray-700">العرائش</span>
                 </div>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default AdminStatus;
