import { useState } from 'react';
import { Syringe, Search, Calendar, Filter, CheckCircle, Clock, Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const mockVaccinations = [
  { id: 1, animal: 'بقرة حلوب 01', vaccine: 'لقاح الحمى القلاعية', date: '2024-05-10', status: 'completed' },
  { id: 2, animal: 'خروف ساردي', vaccine: 'لقاح طاعون المجترات', date: '2024-05-12', status: 'completed' },
  { id: 3, animal: 'ماعز ألبين', vaccine: 'لقاح الجدري', date: '2024-05-25', status: 'pending' },
  { id: 4, animal: 'دواجن - فوج 4', vaccine: 'لقاح نيوكاسل', date: '2024-05-28', status: 'pending' },
];

const Vaccinations = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="space-y-6 animate-slide-up">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">التلقيحات</h1>
          <p className="text-sm text-gray-500 mt-1">الرئيسية / الصحة الحيوانية / سجل التلقيحات</p>
        </div>
        <button 
          onClick={() => navigate('/veterinaire/vaccinations/add')}
          className="bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2.5 rounded-xl font-bold flex items-center gap-2 transition-all shadow-md text-sm"
        >
          <Plus size={18} />
          تسجيل تلقيح جديد
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-3">
          <div className="gov-card p-0 overflow-hidden">
            <div className="p-4 border-b border-gray-100 flex flex-col md:flex-row gap-4 justify-between items-center bg-gray-50/30">
              <div className="relative w-full md:w-80">
                <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input 
                  type="text" 
                  placeholder="ابحث عن حيوان أو لقاح..." 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-4 pr-10 py-2.5 border border-gray-200 rounded-xl outline-none focus:border-emerald-500 text-sm bg-white shadow-sm"
                />
              </div>
              <div className="flex gap-2">
                <button className="flex items-center gap-2 border border-gray-200 bg-white px-4 py-2.5 rounded-xl text-sm font-bold text-gray-600 hover:bg-gray-50">
                  <Filter size={16} />
                  كل الحالات
                </button>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-right border-collapse">
                <thead>
                  <tr className="bg-gray-50/80 text-gray-600 text-[10px] font-black uppercase tracking-[0.2em]">
                    <th className="p-4 border-b border-gray-100">الحيوان</th>
                    <th className="p-4 border-b border-gray-100">نوع اللقاح</th>
                    <th className="p-4 border-b border-gray-100">التاريخ</th>
                    <th className="p-4 border-b border-gray-100">الحالة</th>
                    <th className="p-4 border-b border-gray-100 text-center">الإجراءات</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {mockVaccinations.filter(v => v.animal.includes(searchTerm) || v.vaccine.includes(searchTerm)).map((item) => (
                    <tr key={item.id} className="hover:bg-gray-50/50 transition-colors">
                      <td className="p-4">
                        <span className="font-bold text-gray-800 text-sm">{item.animal}</span>
                      </td>
                      <td className="p-4">
                        <span className="text-sm font-bold text-gray-700">{item.vaccine}</span>
                      </td>
                      <td className="p-4 text-sm text-gray-400 font-bold">{item.date}</td>
                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          {item.status === 'completed' ? (
                            <span className="flex items-center gap-1.5 px-2.5 py-1 bg-emerald-50 text-emerald-700 rounded-full text-[10px] font-black uppercase border border-emerald-100">
                              <CheckCircle size={12} />
                              تم الإنجاز
                            </span>
                          ) : (
                            <span className="flex items-center gap-1.5 px-2.5 py-1 bg-amber-50 text-amber-700 rounded-full text-[10px] font-black uppercase border border-amber-100">
                              <Clock size={12} />
                              قيد الانتظار
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="p-4 text-center">
                        <button className="text-emerald-600 text-xs font-bold hover:underline">تعديل</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="gov-card p-6">
             <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
               <Calendar size={18} className="text-emerald-600" />
               تقويم التلقيحات
             </h3>
             <div className="space-y-4">
                <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-100">
                   <p className="text-[10px] font-black text-emerald-800 uppercase mb-1">اليوم</p>
                   <p className="text-xs font-bold text-emerald-600">لا توجد تلقيحات مبرمجة</p>
                </div>
                <div className="p-3 bg-amber-50 rounded-xl border border-amber-100">
                   <p className="text-[10px] font-black text-amber-800 uppercase mb-1">غداً</p>
                   <p className="text-xs font-bold text-amber-600">تلقيح 150 رأس من الدواجن</p>
                </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Vaccinations;
