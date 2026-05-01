import { useState } from 'react';
import { Calendar as CalendarIcon, Clock, Search, Filter, ChevronLeft, ChevronRight, User } from 'lucide-react';

const NurseAppointments = () => {
  const appointments = [
    { id: 1, patient: 'أحمد العلوي', time: '09:30', type: 'متابعة حالة', status: 'confirmed' },
    { id: 2, patient: 'سمية أيت الطالب', time: '10:15', type: 'قياس المؤشرات', status: 'confirmed' },
    { id: 3, patient: 'الحسين مرابط', time: '11:00', type: 'تقديم علاج', status: 'pending' },
    { id: 4, patient: 'نورة القاسمي', time: '12:00', type: 'متابعة حالة', status: 'confirmed' },
    { id: 5, patient: 'رضوان الوهابي', time: '12:45', type: 'قياس المؤشرات', status: 'confirmed' },
  ];

  return (
    <div className="space-y-6 animate-slide-up pb-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 font-heading">المواعيد الطبية</h1>
          <p className="text-sm text-gray-500 mt-1">الرئيسية / الملف الطبي / جدول المواعيد</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Calendar Column */}
        <div className="lg:col-span-8 gov-card p-6 h-fit">
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
                             5 مواعيد
                          </div>
                       )}
                    </div>
                 )
              })}
           </div>
        </div>

        {/* Daily Schedule Column */}
        <div className="lg:col-span-4 space-y-6">
           <div className="gov-card overflow-hidden h-fit">
              <div className="p-5 border-b border-gray-100 bg-gray-50/30 flex items-center justify-between">
                 <h3 className="font-bold text-gray-800 text-sm">مواعيد اليوم (20 ماي)</h3>
                 <span className="bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-lg text-[10px] font-black uppercase">5 مواعيد</span>
              </div>
              <div className="divide-y divide-gray-50 max-h-[600px] overflow-y-auto">
                 {appointments.map(appt => (
                    <div key={appt.id} className="p-4 hover:bg-slate-50/50 transition-all group">
                       <div className="flex justify-between items-start mb-2">
                          <div className="flex items-center gap-3">
                             <div className="w-8 h-8 bg-gray-50 rounded-xl flex items-center justify-center text-gray-400 group-hover:bg-emerald-50 group-hover:text-emerald-600 transition-all">
                                <User size={16} />
                             </div>
                             <span className="font-bold text-gray-800 text-xs">{appt.patient}</span>
                          </div>
                          <span className={`text-[8px] font-black uppercase px-2 py-0.5 rounded-full border ${
                             appt.status === 'confirmed' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' : 'bg-amber-50 text-amber-700 border-amber-100'
                          }`}>
                             {appt.status === 'confirmed' ? 'مؤكد' : 'قيد الانتظار'}
                          </span>
                       </div>
                       <div className="flex items-center gap-4 text-[10px] text-gray-400 font-bold uppercase tracking-widest">
                          <span className="flex items-center gap-1"><Clock size={12} className="text-emerald-500" /> {appt.time}</span>
                          <span>{appt.type}</span>
                       </div>
                    </div>
                 ))}
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default NurseAppointments;
