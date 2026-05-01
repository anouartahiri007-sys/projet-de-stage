import { useState } from 'react';
import { Activity, Search, Filter, AlertTriangle, CheckCircle, Clock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const mockHealthCases = [
  { id: 1, animal: 'بقرة حلوب 01', disease: 'حمى قلاعية', severity: 'خطيرة', date: '2024-05-18', status: 'تحت العلاج' },
  { id: 2, animal: 'خروف ساردي', disease: 'التهاب رئوي', severity: 'متوسطة', date: '2024-05-17', status: 'مستقرة' },
  { id: 3, animal: 'ماعز ألبين', disease: 'طفيليات خارجية', severity: 'منخفضة', date: '2024-05-16', status: 'تم العلاج' },
  { id: 4, animal: 'دواجن - فوج 4', disease: 'إنفلونزا الطيور', severity: 'متوسطة', date: '2024-05-15', status: 'تحت المراقبة' },
];

const HealthSituations = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="space-y-6 animate-slide-up">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">الحالات الصحية</h1>
          <p className="text-sm text-gray-500 mt-1">الرئيسية / الصحة الحيوانية / متابعة الحالات</p>
        </div>
        <button 
          onClick={() => navigate('/veterinaire/health/register')}
          className="bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2.5 rounded-xl font-bold flex items-center gap-2 transition-all shadow-md text-sm"
        >
          <Activity size={18} />
          تسجيل حالة جديدة
        </button>
      </div>

      <div className="gov-card p-0 overflow-hidden">
        <div className="p-4 border-b border-gray-100 flex flex-col md:flex-row gap-4 justify-between items-center bg-gray-50/30">
          <div className="relative w-full md:w-80">
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type="text" 
              placeholder="ابحث عن حالة أو حيوان..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-4 pr-10 py-2.5 border border-gray-200 rounded-xl outline-none focus:border-emerald-500 text-sm bg-white shadow-sm"
            />
          </div>
          <button className="flex items-center gap-2 border border-gray-200 bg-white px-4 py-2.5 rounded-xl text-sm font-bold text-gray-600 hover:bg-gray-50">
            <Filter size={16} />
            تصفية النتائج
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-right border-collapse">
            <thead>
              <tr className="bg-gray-50/80 text-gray-600 text-[10px] font-black uppercase tracking-[0.2em]">
                <th className="p-4 border-b border-gray-100">الحيوان</th>
                <th className="p-4 border-b border-gray-100">المرض / الحالة</th>
                <th className="p-4 border-b border-gray-100">درجة الخطورة</th>
                <th className="p-4 border-b border-gray-100">التاريخ</th>
                <th className="p-4 border-b border-gray-100">الوضعية</th>
                <th className="p-4 border-b border-gray-100 text-center">الإجراءات</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {mockHealthCases.filter(c => c.animal.includes(searchTerm) || c.disease.includes(searchTerm)).map((item) => (
                <tr key={item.id} className="hover:bg-gray-50/50 transition-colors group">
                  <td className="p-4">
                    <span className="font-bold text-gray-800 text-sm">{item.animal}</span>
                  </td>
                  <td className="p-4">
                    <span className="text-sm font-bold text-gray-700">{item.disease}</span>
                  </td>
                  <td className="p-4">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border ${
                      item.severity === 'خطيرة' ? 'bg-rose-50 text-rose-700 border-rose-100' :
                      item.severity === 'متوسطة' ? 'bg-amber-50 text-amber-700 border-amber-100' :
                      'bg-emerald-50 text-emerald-700 border-emerald-100'
                    }`}>
                      {item.severity}
                    </span>
                  </td>
                  <td className="p-4 text-sm text-gray-400 font-bold">{item.date}</td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      {item.status === 'تم العلاج' ? <CheckCircle size={14} className="text-emerald-500" /> : <Clock size={14} className="text-amber-500" />}
                      <span className="text-xs font-bold text-gray-600">{item.status}</span>
                    </div>
                  </td>
                  <td className="p-4 text-center">
                    <button className="text-emerald-600 text-xs font-bold hover:underline">عرض التفاصيل</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default HealthSituations;
