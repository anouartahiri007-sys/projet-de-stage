import { useState } from 'react';
import { Star, Search, Filter, CheckCircle2, AlertCircle } from 'lucide-react';

const mockEvaluations = [
  { id: 1, name: 'أحمد العلوي', department: 'المصلحة الصحية', score: 18.5, lastEval: '2023-12-15', status: 'completed' },
  { id: 2, name: 'فاطمة الزهراء بنعلي', department: 'الموارد البشرية', score: 19.0, lastEval: '2023-12-20', status: 'completed' },
  { id: 3, name: 'محمد أمين الناصري', department: 'المصلحة البيطرية', score: 15.5, lastEval: '2023-11-30', status: 'completed' },
  { id: 4, name: 'سمية آيت الطالب', department: 'الكتابة العامة', score: 0, lastEval: '-', status: 'pending' },
  { id: 5, name: 'رضوان الوهابي', department: 'القسم التقني', score: 0, lastEval: '-', status: 'pending' },
];

const PerformanceEval = () => {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="space-y-6 animate-slide-up">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">تقييم الأداء</h1>
          <p className="text-sm text-gray-500 mt-1">الرئيسية / إدارة الأداء / تقييم الأداء</p>
        </div>
        <button className="bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2.5 rounded-xl font-bold flex items-center gap-2 transition-all shadow-md text-sm">
          <Star size={18} />
          بدء دورة تقييم جديدة
        </button>
      </div>

      <div className="gov-card p-0 overflow-hidden">
        <div className="p-4 border-b border-gray-100 flex flex-col md:flex-row gap-4 justify-between items-center bg-gray-50/30">
          <div className="relative w-full md:w-80">
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type="text" 
              placeholder="ابحث عن موظف للتقييم..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-4 pr-10 py-2.5 border border-gray-200 rounded-xl outline-none focus:border-emerald-500 text-sm bg-white"
            />
          </div>
          <div className="flex gap-2">
            <button className="flex items-center gap-2 border border-gray-200 bg-white px-4 py-2.5 rounded-xl text-sm font-bold text-gray-600 hover:bg-gray-50 transition-all">
              <Filter size={16} />
              كل المصالح
            </button>
            <select className="border border-gray-200 bg-white px-4 py-2.5 rounded-xl text-sm font-bold text-gray-600 outline-none focus:border-emerald-500">
              <option>دورة 2024</option>
              <option>دورة 2023</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-right border-collapse">
            <thead>
              <tr className="bg-gray-50/80 text-gray-600 text-xs uppercase tracking-wider">
                <th className="p-4 font-bold border-b border-gray-100">الموظف</th>
                <th className="p-4 font-bold border-b border-gray-100">المصلحة</th>
                <th className="p-4 font-bold border-b border-gray-100">النقطة (Score)</th>
                <th className="p-4 font-bold border-b border-gray-100">آخر تقييم</th>
                <th className="p-4 font-bold border-b border-gray-100">الحالة</th>
                <th className="p-4 font-bold border-b border-gray-100 text-center">الإجراءات</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {mockEvaluations.filter(e => e.name.includes(searchTerm)).map((evalItem) => (
                <tr key={evalItem.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 bg-emerald-50 text-emerald-600 rounded-lg flex items-center justify-center font-bold text-xs">
                        {evalItem.name.charAt(0)}
                      </div>
                      <span className="font-bold text-gray-800 text-sm">{evalItem.name}</span>
                    </div>
                  </td>
                  <td className="p-4 text-sm text-gray-500 font-medium">{evalItem.department}</td>
                  <td className="p-4">
                    {evalItem.status === 'completed' ? (
                      <span className="font-black text-emerald-700 text-lg">{evalItem.score} <span className="text-[10px] text-gray-400">/ 20</span></span>
                    ) : (
                      <span className="text-gray-300 font-bold">--</span>
                    )}
                  </td>
                  <td className="p-4 text-sm text-gray-400 font-medium">{evalItem.lastEval}</td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      {evalItem.status === 'completed' ? (
                        <span className="flex items-center gap-1.5 px-2.5 py-1 bg-emerald-50 text-emerald-700 rounded-full text-[10px] font-black uppercase border border-emerald-100">
                          <CheckCircle2 size={12} />
                          مكتمل
                        </span>
                      ) : (
                        <span className="flex items-center gap-1.5 px-2.5 py-1 bg-amber-50 text-amber-700 rounded-full text-[10px] font-black uppercase border border-amber-100">
                          <AlertCircle size={12} />
                          قيد الانتظار
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex justify-center">
                      <button className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
                        evalItem.status === 'completed' 
                        ? 'bg-gray-100 text-gray-600 hover:bg-gray-200' 
                        : 'bg-emerald-600 text-white hover:bg-emerald-700 shadow-sm shadow-emerald-100'
                      }`}>
                        {evalItem.status === 'completed' ? 'تعديل' : 'تقييم الآن'}
                      </button>
                    </div>
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

export default PerformanceEval;
