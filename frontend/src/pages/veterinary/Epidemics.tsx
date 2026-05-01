import { useState } from 'react';
import { AlertTriangle, MapPin, Search, Filter, Bell, Info, ShieldAlert, Activity } from 'lucide-react';

const mockEpidemics = [
  { id: 1, name: 'الحمى القلاعية', region: 'المنطقة الجنوبية (أ)', cases: 12, severity: 'خطيرة', date: '2024-05-18', status: 'تحت الحصار' },
  { id: 2, name: 'طاعون المجترات الصغيرة', region: 'المنطقة الشمالية (ب)', cases: 4, severity: 'متوسطة', date: '2024-05-15', status: 'مراقب' },
  { id: 3, name: 'إنفلونزا الطيور (H5N1)', region: 'جماعة مدينة المستقبل', cases: 150, severity: 'حرجة', date: '2024-05-10', status: 'عزل تام' },
];

const Epidemics = () => {
  return (
    <div className="space-y-6 animate-slide-up pb-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 font-heading">الأوبئة والأمراض المعدية</h1>
          <p className="text-sm text-gray-500 mt-1">الرئيسية / الصحة الحيوانية / رصد الأوبئة والإنذار المبكر</p>
        </div>
        <div className="flex gap-3">
          <button className="bg-white border border-gray-200 text-gray-600 px-5 py-2.5 rounded-xl font-bold flex items-center gap-2 transition-all hover:bg-gray-50 text-sm">
             <Filter size={18} />
             تصفية الخريطة
          </button>
          <button className="bg-rose-600 hover:bg-rose-700 text-white px-5 py-2.5 rounded-xl font-bold flex items-center gap-2 transition-all shadow-md shadow-rose-200 text-sm">
            <Bell size={18} />
            إرسال تنبيه وبائي عاجل
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Map Visualization */}
        <div className="lg:col-span-8 gov-card p-0 overflow-hidden relative min-h-[550px] bg-slate-100 flex items-center justify-center">
           <div className="absolute inset-0 opacity-30 bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')]"></div>
           
           {/* Mock Map Background */}
           <div className="absolute inset-0 bg-[#E3E8EE] flex items-center justify-center">
              <svg className="w-full h-full opacity-10" viewBox="0 0 100 100">
                <path d="M10,10 Q30,40 50,10 T90,10" fill="none" stroke="currentColor" strokeWidth="0.5" />
                <path d="M10,90 Q40,60 10,10" fill="none" stroke="currentColor" strokeWidth="0.5" />
              </svg>
           </div>

           {/* Pulse Markers */}
           <div className="absolute top-[30%] left-[40%] group cursor-pointer">
              <div className="absolute inset-0 bg-rose-500 rounded-full animate-ping opacity-75 w-12 h-12 -m-4"></div>
              <div className="relative w-4 h-4 bg-rose-600 rounded-full border-2 border-white shadow-lg"></div>
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-white px-3 py-1.5 rounded-lg shadow-xl border border-gray-100 opacity-0 group-hover:opacity-100 transition-all pointer-events-none whitespace-nowrap z-20">
                 <p className="text-[10px] font-black text-rose-600 uppercase">بؤرة حرجة</p>
                 <p className="text-xs font-bold text-gray-800">إنفلونزا الطيور</p>
              </div>
           </div>

           <div className="absolute top-[60%] left-[70%] group cursor-pointer">
              <div className="absolute inset-0 bg-amber-500 rounded-full animate-ping opacity-75 w-8 h-8 -m-2"></div>
              <div className="relative w-4 h-4 bg-amber-600 rounded-full border-2 border-white shadow-lg"></div>
           </div>

           <div className="relative z-10 text-center pointer-events-none">
              <div className="p-6 bg-white/80 backdrop-blur rounded-3xl border border-white shadow-2xl inline-block max-w-[400px]">
                 <MapPin size={32} className="text-rose-600 mx-auto mb-4" />
                 <h3 className="text-lg font-black text-gray-800">خريطة الرصد الوبائي التفاعلية</h3>
                 <p className="text-xs text-gray-500 mt-2 font-medium">عرض حي للبؤر المسجلة في نفوذ الجماعة والمناطق المجاورة. يتم تحديث البيانات كل 15 دقيقة.</p>
              </div>
           </div>
           
           {/* Floating Legend */}
           <div className="absolute bottom-8 right-8 bg-white/95 backdrop-blur p-6 rounded-3xl shadow-2xl border border-white space-y-4 z-10">
              <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-2 border-b pb-2">مفاتيح الخريطة</h4>
              <div className="flex items-center gap-4">
                <div className="w-3 h-3 rounded-full bg-rose-600 animate-pulse ring-4 ring-rose-100"></div>
                <span className="text-[10px] font-black text-gray-700 uppercase tracking-widest">بؤرة حرجة (عزل تام)</span>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-3 h-3 rounded-full bg-amber-500 ring-4 ring-amber-100"></div>
                <span className="text-[10px] font-black text-gray-700 uppercase tracking-widest">منطقة تحت المراقبة</span>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-3 h-3 rounded-full bg-emerald-500 ring-4 ring-emerald-100"></div>
                <span className="text-[10px] font-black text-gray-700 uppercase tracking-widest">منطقة آمنة (مطهرة)</span>
              </div>
           </div>
        </div>

        {/* List of Epidemics */}
        <div className="lg:col-span-4 space-y-6">
           <div className="gov-card p-0 overflow-hidden">
              <div className="p-6 border-b border-gray-100 bg-gray-50/30 flex items-center justify-between">
                <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                  <ShieldAlert size={20} className="text-rose-600" />
                  البؤر النشطة
                </h2>
                <span className="px-2 py-0.5 bg-rose-50 text-rose-600 rounded text-[10px] font-black">03 حالات</span>
              </div>
              <div className="divide-y divide-gray-50">
                 {mockEpidemics.map((item) => (
                   <div key={item.id} className="p-5 hover:bg-gray-50/50 transition-all group cursor-pointer">
                      <div className="flex justify-between items-start mb-3">
                        <h4 className="font-bold text-gray-800 text-sm group-hover:text-rose-700 transition-colors">{item.name}</h4>
                        <span className={`px-2 py-1 rounded text-[8px] font-black uppercase tracking-widest border ${
                          item.severity === 'حرجة' ? 'bg-rose-100 text-rose-700 border-rose-200' : 
                          item.severity === 'خطيرة' ? 'bg-orange-100 text-orange-700 border-orange-200' :
                          'bg-amber-100 text-amber-700 border-amber-200'
                        }`}>
                          {item.severity}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                         <div className="flex items-center gap-3 text-[10px] font-bold text-gray-400 uppercase">
                            <span className="flex items-center gap-1"><MapPin size={10} /> {item.region}</span>
                            <span className="text-rose-600 font-black">{item.cases} حالة</span>
                         </div>
                         <span className="text-[9px] font-bold text-gray-400 italic">{item.status}</span>
                      </div>
                   </div>
                 ))}
              </div>
              <button className="w-full py-3 text-[10px] font-black text-gray-400 uppercase tracking-widest hover:bg-gray-50 border-t border-gray-50">
                 تحميل تقارير الاستقصاء الوبائي
              </button>
           </div>

           <div className="gov-card p-6 bg-slate-900 text-white relative overflow-hidden shadow-xl">
              <div className="absolute top-0 right-0 w-32 h-32 bg-rose-500/10 rounded-full blur-3xl"></div>
              <div className="flex items-center gap-3 mb-5">
                 <Activity size={20} className="text-rose-400" />
                 <h3 className="font-bold text-sm">توصيات خلية الأزمة</h3>
              </div>
              <div className="space-y-4">
                 <p className="text-[11px] text-slate-300 leading-relaxed font-medium">
                   1. تفعيل الحجر الصحي الفوري في شعاع 3 كلم من البؤرة H5N1.
                 </p>
                 <p className="text-[11px] text-slate-300 leading-relaxed font-medium">
                   2. منع نقل المواشي من وإلى المنطقة الشمالية (ب) حتى إشعار آخر.
                 </p>
              </div>
              <div className="mt-8 pt-6 border-t border-slate-800 flex justify-between items-center">
                 <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">تحديث: منذ 10 دقائق</span>
                 <button className="text-xs font-bold text-rose-400 hover:text-rose-300">متابعة التفاصيل</button>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default Epidemics;
