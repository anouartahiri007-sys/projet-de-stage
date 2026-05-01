import { BarChart3, TrendingUp, PawPrint, Activity, Syringe, FilePlus, Download, Filter, Calendar, PieChart, ArrowUpRight } from 'lucide-react';

const VetReports = () => {
  return (
    <div className="space-y-8 animate-slide-up pb-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 font-heading">التقارير والإحصائيات البيطرية</h1>
          <p className="text-sm text-gray-500 mt-1">الرئيسية / الصحة الحيوانية / مركز تحليل البيانات والتقارير</p>
        </div>
        <div className="flex gap-3">
          <button className="bg-white border border-gray-200 text-gray-600 px-5 py-2.5 rounded-xl font-bold flex items-center gap-2 transition-all hover:bg-gray-50 text-sm">
             <Calendar size={18} />
             تحديد الفترة
          </button>
          <button className="bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2.5 rounded-xl font-bold flex items-center gap-2 transition-all shadow-lg shadow-emerald-200 text-sm">
            <Download size={18} />
            تصدير التقرير التحليلي (PDF)
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'إجمالي الثروة الحيوانية', value: '1,248', trend: '+8.4%', icon: <PawPrint size={20} />, bgColor: 'bg-emerald-50', textColor: 'text-emerald-600' },
          { label: 'نسبة النجاح العلاجي', value: '92%', trend: '+2.1%', icon: <Activity size={20} />, bgColor: 'bg-blue-50', textColor: 'text-blue-600' },
          { label: 'تغطية التلقيحات', value: '78%', trend: '+5.4%', icon: <Syringe size={20} />, bgColor: 'bg-purple-50', textColor: 'text-purple-600' },
          { label: 'الشهادات الممنوحة', value: '156', trend: '+12%', icon: <FilePlus size={20} />, bgColor: 'bg-amber-50', textColor: 'text-amber-600' },
        ].map((stat, i) => (
          <div key={i} className="gov-card p-6 group hover:scale-[1.02] transition-all relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-gray-50 rounded-full translate-x-12 -translate-y-12 group-hover:scale-150 transition-transform duration-500"></div>
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-6">
                <div className={`p-4 ${stat.bgColor} ${stat.textColor} rounded-2xl group-hover:rotate-12 transition-transform`}>
                  {stat.icon}
                </div>
                <div className="flex items-center gap-1 text-[10px] font-black text-emerald-600 bg-emerald-50 px-2 py-1 rounded-lg">
                  <ArrowUpRight size={10} />
                  {stat.trend}
                </div>
              </div>
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-1">{stat.label}</p>
              <p className="text-3xl font-black text-gray-800">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Main Growth Chart */}
        <div className="lg:col-span-8 space-y-8">
          <div className="gov-card p-8">
            <div className="flex items-center justify-between mb-10">
              <div className="space-y-1">
                 <h2 className="text-lg font-black text-gray-800 flex items-center gap-2">
                   <BarChart3 size={20} className="text-emerald-600" />
                   تطور الوضع الصحي والتلقيحات
                 </h2>
                 <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">مقارنة بين عدد الحالات والتلقيحات المنجزة شهرياً</p>
              </div>
              <div className="flex gap-2">
                 <button className="px-4 py-2 bg-gray-50 text-gray-500 rounded-xl text-[10px] font-black uppercase tracking-widest border border-gray-100 hover:bg-gray-100 transition-all">6 أشهر</button>
                 <button className="px-4 py-2 bg-emerald-600 text-white rounded-xl text-[10px] font-black uppercase tracking-widest shadow-lg shadow-emerald-200 transition-all">سنة</button>
              </div>
            </div>
            
            {/* Visual Graph Mockup */}
            <div className="h-72 flex items-end justify-between gap-3 px-4 pt-10 relative">
               {/* Grid Lines */}
               <div className="absolute inset-x-0 top-10 border-t border-gray-50 flex justify-between items-center pr-2"><span className="text-[8px] text-gray-300 font-bold">100%</span></div>
               <div className="absolute inset-x-0 top-32 border-t border-gray-50 flex justify-between items-center pr-2"><span className="text-[8px] text-gray-300 font-bold">50%</span></div>
               <div className="absolute inset-x-0 bottom-8 border-t border-gray-100 flex justify-between items-center pr-2"><span className="text-[8px] text-gray-300 font-bold">0%</span></div>
               
               {[40, 60, 45, 80, 55, 90, 70, 85, 60, 75, 95, 80].map((h, i) => (
                 <div key={i} className="flex-1 flex flex-col items-center gap-4 group cursor-pointer relative z-10 h-full justify-end">
                    <div className="absolute bottom-20 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-[8px] font-bold px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-all pointer-events-none mb-2 z-20">
                       {h}%
                    </div>
                    <div className="w-full flex gap-1.5 items-end h-[80%]">
                       <div className="flex-1 bg-gradient-to-t from-emerald-600 to-emerald-400 rounded-t-lg group-hover:brightness-110 transition-all shadow-sm" style={{ height: `${h}%` }}></div>
                       <div className="flex-1 bg-gradient-to-t from-blue-500 to-blue-300 rounded-t-lg group-hover:brightness-110 transition-all shadow-sm" style={{ height: `${h*0.6}%` }}></div>
                    </div>
                    <span className="text-[9px] font-black text-gray-400 uppercase tracking-tighter">{['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'][i]}</span>
                 </div>
               ))}
            </div>

            <div className="mt-8 flex justify-center gap-8 border-t border-gray-50 pt-6">
               <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-emerald-500 rounded-full"></div>
                  <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">التلقيحات</span>
               </div>
               <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-blue-400 rounded-full"></div>
                  <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">الحالات الصحية</span>
               </div>
            </div>
          </div>
        </div>

        {/* Distribution & Legend */}
        <div className="lg:col-span-4 space-y-8">
          <div className="gov-card p-8">
            <h2 className="text-lg font-black text-gray-800 mb-8 flex items-center gap-2">
              <PieChart size={20} className="text-emerald-600" />
              توزيع الأمراض والأوبئة
            </h2>
            <div className="flex justify-center mb-8">
               <div className="relative w-40 h-40">
                  <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                     <circle cx="18" cy="18" r="15.9" fill="transparent" stroke="#F1F5F9" strokeWidth="4"></circle>
                     <circle cx="18" cy="18" r="15.9" fill="transparent" stroke="#10B981" strokeWidth="4" strokeDasharray="42 100"></circle>
                     <circle cx="18" cy="18" r="15.9" fill="transparent" stroke="#F43F5E" strokeWidth="4" strokeDasharray="28 100" strokeDashoffset="-42"></circle>
                     <circle cx="18" cy="18" r="15.9" fill="transparent" stroke="#3B82F6" strokeWidth="4" strokeDasharray="18 100" strokeDashoffset="-70"></circle>
                     <circle cx="18" cy="18" r="15.9" fill="transparent" stroke="#F59E0B" strokeWidth="4" strokeDasharray="12 100" strokeDashoffset="-88"></circle>
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center flex-col">
                     <span className="text-2xl font-black text-gray-800">100%</span>
                     <span className="text-[8px] font-black text-gray-400 uppercase tracking-widest">إجمالي الحالات</span>
                  </div>
               </div>
            </div>
            <div className="space-y-4">
              {[
                { label: 'حمى قلاعية', value: 42, color: 'bg-rose-500' },
                { label: 'التهاب رئوي', value: 28, color: 'bg-amber-500' },
                { label: 'طفيليات خارجية', value: 18, color: 'bg-blue-500' },
                { label: 'أمراض أخرى', value: 12, color: 'bg-emerald-500' },
              ].map((item, idx) => (
                <div key={idx} className="flex items-center justify-between group cursor-default">
                  <div className="flex items-center gap-3">
                     <div className={`w-2.5 h-2.5 ${item.color} rounded-full`}></div>
                     <span className="text-xs font-bold text-gray-600 group-hover:text-gray-900 transition-colors">{item.label}</span>
                  </div>
                  <span className="text-[10px] font-black text-gray-400">{item.value}%</span>
                </div>
              ))}
            </div>
          </div>
          
          <div className="gov-card p-6 bg-emerald-50 border border-emerald-100 rounded-3xl">
             <div className="flex items-start gap-4">
                <div className="p-2 bg-white rounded-xl text-emerald-600 shadow-sm"><Info size={18} /></div>
                <div>
                   <h4 className="text-xs font-black text-emerald-800 uppercase tracking-widest mb-1">تنبيه التقارير</h4>
                   <p className="text-[11px] text-emerald-600 leading-relaxed font-medium">
                     تم تحديث هذه البيانات بناءً على آخر 1,248 سجل بيطري تمت معالجته في النظام.
                   </p>
                </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VetReports;
