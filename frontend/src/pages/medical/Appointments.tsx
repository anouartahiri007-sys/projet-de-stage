import { useState } from 'react';
import { Calendar as CalendarIcon, Clock, Plus, Search, Filter, ChevronLeft, ChevronRight, User } from 'lucide-react';

const mockAppointments = [
  { id: 1, patient: 'سعاد الإدريسي', time: '09:30', type: 'استشارة عامة', status: 'confirmed' },
  { id: 2, patient: 'محمد أمين الناصري', time: '10:15', type: 'متابعة حالة', status: 'pending' },
  { id: 3, patient: 'خديجة بوعزة', time: '11:00', type: 'ضغط الدم', status: 'confirmed' },
  { id: 4, patient: 'رضوان الوهابي', time: '12:00', type: 'ألم في الظهر', status: 'cancelled' },
];

const Appointments = () => {
  return (
    <div className="space-y-6 animate-slide-up">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">إدارة المواعيد</h1>
          <p className="text-sm text-gray-500 mt-1">الرئيسية / الملف الطبي / المواعيد</p>
        </div>
        <button className="bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2.5 rounded-xl font-bold flex items-center gap-2 transition-all shadow-md text-sm">
          <Plus size={18} />
          إضافة موعد جديد
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Calendar View Placeholder */}
        <div className="lg:col-span-8 gov-card p-6">
           <div className="flex items-center justify-between mb-8 pb-4 border-b border-gray-100">
              <h2 className="font-bold text-gray-800 flex items-center gap-2">
                 <CalendarIcon size={20} className="text-emerald-600" />
                 تقويم المواعيد - ماي 2024
              </h2>
              <div className="flex items-center gap-4">
                 <button className="p-2 hover:bg-gray-50 rounded-lg border border-gray-100"><ChevronRight size={18} /></button>
                 <span className="font-black text-xs uppercase tracking-widest text-emerald-700">ماي 2024</span>
                 <button className="p-2 hover:bg-gray-50 rounded-lg border border-gray-100"><ChevronLeft size={18} /></button>
              </div>
           </div>
           
           <div className="grid grid-cols-7 gap-2">
              {['أحد', 'اثنين', 'ثلاثاء', 'أربعاء', 'خميس', 'جمعة', 'سبت'].map(day => (
                 <div key={day} className="text-center text-[10px] font-black text-gray-400 uppercase py-2 tracking-widest">{day}</div>
              ))}
              {Array.from({ length: 31 }).map((_, i) => {
                 const day = i + 1;
                 const hasAppt = [20, 21, 24].includes(day);
                 return (
                    <div key={i} className={`h-24 p-2 border border-gray-50 rounded-2xl transition-all cursor-pointer relative ${day === 20 ? 'bg-emerald-50 border-emerald-100 ring-2 ring-emerald-500/10' : 'hover:bg-gray-50/50'}`}>
                       <span className={`text-xs font-bold ${day === 20 ? 'text-emerald-700' : 'text-gray-400'}`}>{day}</span>
                       {hasAppt && (
                          <div className="mt-2 space-y-1">
                             <div className="h-1.5 w-full bg-emerald-500/20 rounded-full"></div>
                             <div className="h-1.5 w-2/3 bg-blue-500/20 rounded-full"></div>
                          </div>
                       )}
                       {day === 20 && (
                          <div className="absolute bottom-2 left-2 right-2 px-2 py-1 bg-emerald-600 text-white text-[8px] font-black rounded-lg text-center truncate">
                             8 مواعيد
                          </div>
                       )}
                    </div>
                 )
              })}
           </div>
        </div>

        {/* List View */}
        <div className="lg:col-span-4 space-y-6">
           <div className="gov-card overflow-hidden">
              <div className="p-5 border-b border-gray-100 bg-gray-50/30 flex items-center justify-between">
                 <h3 className="font-bold text-gray-800 text-sm">مواعيد اليوم (20 ماي)</h3>
                 <span className="bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-lg text-[10px] font-black uppercase">8 مواعيد</span>
              </div>
              <div className="divide-y divide-gray-50 max-h-[500px] overflow-y-auto">
                 {mockAppointments.map(appt => (
                    <div key={appt.id} className="p-4 hover:bg-slate-50/50 transition-all group">
                       <div className="flex justify-between items-start mb-2">
                          <div className="flex items-center gap-3">
                             <div className="w-8 h-8 bg-gray-50 rounded-xl flex items-center justify-center text-gray-400 group-hover:bg-emerald-50 group-hover:text-emerald-600 transition-all">
                                <User size={16} />
                             </div>
                             <span className="font-bold text-gray-800 text-xs">{appt.patient}</span>
                          </div>
                          <span className={`text-[8px] font-black uppercase px-2 py-0.5 rounded-full border ${
                             appt.status === 'confirmed' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' :
                             appt.status === 'pending' ? 'bg-amber-50 text-amber-700 border-amber-100' :
                             'bg-rose-50 text-rose-700 border-rose-100'
                          }`}>
                             {appt.status === 'confirmed' ? 'مؤكد' : appt.status === 'pending' ? 'قيد الانتظار' : 'ملغي'}
                          </span>
                       </div>
                       <div className="flex items-center gap-4 text-[10px] text-gray-400 font-bold uppercase tracking-widest">
                          <span className="flex items-center gap-1"><Clock size={12} className="text-emerald-500" /> {appt.time}</span>
                          <span>{appt.type}</span>
                       </div>
                    </div>
                 ))}
              </div>
              <button className="w-full py-3 text-[10px] font-black text-gray-400 hover:bg-gray-50 uppercase tracking-[0.2em] transition-all">
                 عرض كل تفاصيل اليوم
              </button>
           </div>
           
           <div className="p-5 bg-emerald-900 text-white rounded-3xl relative overflow-hidden shadow-xl">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-2xl"></div>
              <div className="relative z-10">
                 <h4 className="font-bold text-sm mb-2">إحصائيات الأسبوع</h4>
                 <div className="space-y-4 mt-6">
                    <div className="flex justify-between items-center">
                       <span className="text-xs text-emerald-200">المواعيد المنجزة</span>
                       <span className="text-lg font-black">42</span>
                    </div>
                    <div className="h-1 bg-emerald-800 rounded-full overflow-hidden">
                       <div className="h-full bg-emerald-400" style={{ width: '85%' }}></div>
                    </div>
                 </div>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default Appointments;
