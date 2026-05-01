import { Shield, Award, Calendar, Briefcase, Info, UserCheck } from 'lucide-react';

const NurseAdminStatus = () => {
  return (
    <div className="space-y-6 animate-slide-up pb-12">
      <div>
        <h1 className="text-2xl font-bold text-gray-800 font-heading">الحالة الإدارية</h1>
        <p className="text-sm text-gray-500 mt-1">الفضاء الشخصي / الوضعية الإدارية والمهنية</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Main Status Card */}
        <div className="lg:col-span-8 space-y-6">
           <div className="gov-card p-8 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-32 h-32 bg-emerald-500/5 rounded-full -translate-x-16 -translate-y-16"></div>
              
              <div className="flex items-center gap-6 mb-10">
                 <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center shadow-inner">
                    <UserCheck size={32} />
                 </div>
                 <div>
                    <h2 className="text-xl font-black text-gray-800 tracking-tight">ممرضة - الدرجة الأولى</h2>
                    <p className="text-sm text-emerald-600 font-bold uppercase tracking-widest mt-1">رقم التأجير: 1234567</p>
                 </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                 {[
                    { label: 'السلم', value: 'السلم 10', icon: <Award className="text-blue-500" /> },
                    { label: 'الرتبة', value: 'الرتبة 05', icon: <Briefcase className="text-purple-500" /> },
                    { label: 'تاريخ الترسيم', value: '12 ماي 2018', icon: <Calendar className="text-amber-500" /> },
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
                    { title: 'ترقية في الدرجة (الدرجة الأولى)', date: '15/06/2021', status: 'منجزة', color: 'text-emerald-600 bg-emerald-50' },
                    { title: 'الترسيم في الوظيفة العمومية', date: '12/05/2018', status: 'منجزة', color: 'text-emerald-600 bg-emerald-50' },
                    { title: 'الالتحاق بالجماعة (متدربة)', date: '12/05/2017', status: 'منجزة', color: 'text-emerald-600 bg-emerald-50' },
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
                 <h3 className="font-bold text-sm">تنبيهات إدارية</h3>
              </div>
              <p className="text-xs text-emerald-100/80 leading-relaxed font-medium mb-6">
                أنتِ حالياً في الرتبة 5 من السلم 10. الترقية القادمة للرتبة 6 مبرمجة في يناير 2025 بناءً على الأقدمية.
              </p>
              <button className="w-full py-3 bg-emerald-500 hover:bg-emerald-400 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all">
                تحميل السجل الإداري الكامل
              </button>
           </div>

           <div className="gov-card p-6">
              <h3 className="font-bold text-gray-800 mb-6 flex items-center gap-2 text-sm">
                 <Shield size={18} className="text-emerald-600" />
                 التغطية الصحية والتقاعد
              </h3>
              <div className="space-y-4">
                 <div className="flex justify-between items-center pb-4 border-b border-gray-50">
                    <span className="text-xs text-gray-400 font-bold">نظام التقاعد</span>
                    <span className="text-xs font-black text-gray-700">CMR</span>
                 </div>
                 <div className="flex justify-between items-center pb-4 border-b border-gray-50">
                    <span className="text-xs text-gray-400 font-bold">التغطية الصحية</span>
                    <span className="text-xs font-black text-gray-700">CNOPS</span>
                 </div>
                 <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-400 font-bold">رقم الانخراط</span>
                    <span className="text-xs font-black text-gray-700">854-7859-12</span>
                 </div>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default NurseAdminStatus;
