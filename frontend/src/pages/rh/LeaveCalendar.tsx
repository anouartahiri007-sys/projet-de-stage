import { useState } from 'react';
import { Calendar as CalendarIcon, ChevronRight, ChevronLeft, User } from 'lucide-react';

const LeaveCalendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());

  // Simplified calendar mock
  const days = Array.from({ length: 31 }, (_, i) => i + 1);
  const events = [
    { day: 15, name: 'أحمد العلوي', type: 'إدارية' },
    { day: 20, name: 'فاطمة الزهراء', type: 'سنوية' },
    { day: 20, name: 'ياسين بومدين', type: 'سنوية' },
    { day: 22, name: 'محمد أمين', type: 'مرضية' },
  ];

  return (
    <div className="space-y-6 animate-slide-up">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">تقويم العطل</h1>
          <p className="text-sm text-gray-500 mt-1">الرئيسية / إدارة العطل / التقويم العام</p>
        </div>
        <div className="flex items-center gap-3 bg-white p-1 rounded-xl border border-gray-200 shadow-sm">
          <button className="p-2 hover:bg-gray-50 rounded-lg text-gray-500"><ChevronRight size={18} /></button>
          <span className="text-sm font-black text-emerald-800 px-4">ماي 2024</span>
          <button className="p-2 hover:bg-gray-50 rounded-lg text-gray-500"><ChevronLeft size={18} /></button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Calendar Grid */}
        <div className="lg:col-span-3">
          <div className="gov-card p-6">
            <div className="grid grid-cols-7 gap-px bg-gray-100 border border-gray-100 rounded-xl overflow-hidden">
              {['أحد', 'اثنين', 'ثلاثاء', 'أربعاء', 'خميس', 'جمعة', 'سبت'].map(day => (
                <div key={day} className="bg-gray-50 p-4 text-center text-xs font-black text-gray-400 uppercase tracking-widest">{day}</div>
              ))}
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={`empty-${i}`} className="bg-white min-h-[100px] p-2 opacity-50"></div>
              ))}
              {days.map(day => {
                const dayEvents = events.filter(e => e.day === day);
                return (
                  <div key={day} className={`bg-white min-h-[100px] p-2 border-r border-b border-gray-50 hover:bg-emerald-50/30 transition-colors group cursor-pointer ${day === 19 ? 'ring-2 ring-emerald-500 ring-inset bg-emerald-50/50' : ''}`}>
                    <span className={`text-sm font-black ${day === 19 ? 'text-emerald-700' : 'text-gray-400 group-hover:text-emerald-600'}`}>{day}</span>
                    <div className="mt-2 space-y-1">
                      {dayEvents.map((ev, idx) => (
                        <div key={idx} className={`text-[9px] font-bold p-1 rounded border leading-tight ${
                          ev.type === 'سنوية' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' :
                          ev.type === 'مرضية' ? 'bg-rose-50 text-rose-700 border-rose-100' : 'bg-blue-50 text-blue-700 border-blue-100'
                        }`}>
                          {ev.name}
                        </div>
                      ))}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        {/* Legend / Upcoming */}
        <div className="space-y-6">
          <div className="gov-card p-6">
            <h3 className="font-bold text-gray-800 mb-4 border-b border-gray-100 pb-2 flex items-center gap-2">
              <CalendarIcon size={18} className="text-emerald-600" />
              اليوم: 19 ماي
            </h3>
            <div className="space-y-4">
              <p className="text-xs text-gray-500 font-medium italic">لا توجد عطل مسجلة لهذا اليوم.</p>
            </div>
          </div>

          <div className="gov-card p-6">
            <h3 className="font-bold text-gray-800 mb-4 border-b border-gray-100 pb-2">أنواع العطل</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
                <span className="text-xs font-bold text-gray-600">عطلة سنوية</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                <span className="text-xs font-bold text-gray-600">عطلة إدارية</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-rose-500"></div>
                <span className="text-xs font-bold text-gray-600">عطلة مرضية</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeaveCalendar;
