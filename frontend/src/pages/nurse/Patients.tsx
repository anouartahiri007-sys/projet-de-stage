import { useState } from 'react';
import { Search, Filter, Eye, User, Calendar, MapPin, Activity } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const NursePatients = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');

  const mockPatients = [
    { id: 1, name: 'فاطمة الزهراء الإدريسي', age: 34, status: 'مستقرة', lastCheck: '2024-05-18', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=100&q=80' },
    { id: 2, name: 'محمد أمين الناصري', age: 45, status: 'تحت الملاحظة', lastCheck: '2024-05-17', avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=100&q=80' },
    { id: 3, name: 'سعاد الحاجي', age: 29, status: 'مستقرة', lastCheck: '2024-05-16', avatar: 'https://images.unsplash.com/photo-1554151228-14d9def656e4?auto=format&fit=crop&w=100&q=80' },
    { id: 4, name: 'أحمد العلوي', age: 52, status: 'تحتاج رعاية', lastCheck: '2024-05-15', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=100&q=80' },
  ];

  return (
    <div className="space-y-6 animate-slide-up pb-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 font-heading tracking-tight">قائمة المرضى</h1>
          <p className="text-sm text-gray-500 mt-1">الرئيسية / الملف الطبي / المرضى</p>
        </div>
      </div>

      <div className="gov-card p-0 overflow-hidden">
        <div className="p-6 border-b border-gray-100 flex flex-col md:flex-row gap-6 justify-between items-center bg-gray-50/30">
          <div className="relative w-full md:w-96">
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type="text" 
              placeholder="ابحث باسم المريض أو رقم الملف..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-4 pr-10 py-3 border border-gray-200 rounded-xl outline-none focus:border-emerald-500 text-sm bg-white shadow-sm font-bold"
            />
          </div>
          <div className="flex gap-3">
             <button className="flex items-center gap-2 border border-gray-200 bg-white px-5 py-3 rounded-xl text-sm font-bold text-gray-600 hover:bg-gray-50 transition-all">
                <Filter size={18} />
                تصفية النتائج
             </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-right border-collapse">
            <thead>
              <tr className="bg-gray-50 text-gray-600 text-[10px] font-black uppercase tracking-[0.2em]">
                <th className="p-4 border-b border-gray-100">المريض</th>
                <th className="p-4 border-b border-gray-100">العمر</th>
                <th className="p-4 border-b border-gray-100">الحالة</th>
                <th className="p-4 border-b border-gray-100">آخر متابعة</th>
                <th className="p-4 border-b border-gray-100 text-center">الإجراءات</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {mockPatients.filter(p => p.name.includes(search)).map((patient) => (
                <tr key={patient.id} className="hover:bg-emerald-50/20 transition-colors group">
                  <td className="p-4">
                    <div className="flex items-center gap-4">
                      <img src={patient.avatar} alt={patient.name} className="w-12 h-12 rounded-2xl object-cover border-2 border-white shadow-sm group-hover:scale-105 transition-transform" />
                      <div>
                        <p className="font-bold text-gray-800 text-sm">{patient.name}</p>
                        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">ID: #{patient.id}MED</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 text-sm font-bold text-gray-700">{patient.age} سنة</td>
                  <td className="p-4">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border ${
                      patient.status === 'مستقرة' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' :
                      patient.status === 'تحت الملاحظة' ? 'bg-amber-50 text-amber-700 border-amber-100' :
                      'bg-rose-50 text-rose-700 border-rose-100'
                    }`}>
                      {patient.status}
                    </span>
                  </td>
                  <td className="p-4 text-sm text-gray-400 font-bold">{patient.lastCheck}</td>
                  <td className="p-4 text-center">
                    <div className="flex items-center justify-center gap-1 opacity-0 group-hover:opacity-100 transition-all">
                      <button className="p-2.5 text-blue-600 hover:bg-blue-50 rounded-xl transition-all" title="عرض التفاصيل">
                        <Eye size={20} />
                      </button>
                      <button className="p-2.5 text-emerald-600 hover:bg-emerald-50 rounded-xl transition-all" title="تتبع الحالة">
                        <Activity size={20} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div className="p-4 bg-gray-50/50 border-t border-gray-100 flex items-center justify-center">
           <button className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em] hover:text-emerald-700 transition-all">تحميل المزيد من السجلات</button>
        </div>
      </div>
    </div>
  );
};

export default NursePatients;
