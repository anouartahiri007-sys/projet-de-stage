import { useState } from 'react';
import { History, Search, Filter, Download, Calendar } from 'lucide-react';

const mockHistory = [
  { id: 1, name: 'أحمد العلوي', year: 2023, score: 18.5, grade: 'ممتاز', observer: 'سعاد الإدريسي' },
  { id: 2, name: 'أحمد العلوي', year: 2022, score: 17.0, grade: 'جيد جداً', observer: 'سعاد الإدريسي' },
  { id: 3, name: 'فاطمة الزهراء بنعلي', year: 2023, score: 19.0, grade: 'ممتاز', observer: 'محمد العلمي' },
  { id: 4, name: 'محمد أمين الناصري', year: 2023, score: 15.5, grade: 'جيد', observer: 'سعاد الإدريسي' },
  { id: 5, name: 'رضوان الوهابي', year: 2022, score: 16.0, grade: 'جيد جداً', observer: 'محمد العلمي' },
];

const EvalHistory = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedYear, setSelectedYear] = useState('2023');

  return (
    <div className="space-y-6 animate-slide-up">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">تاريخ التقييمات</h1>
          <p className="text-sm text-gray-500 mt-1">الرئيسية / إدارة الأداء / أرشيف التقييمات</p>
        </div>
        <button className="bg-white border border-gray-200 text-gray-700 px-5 py-2.5 rounded-xl font-bold flex items-center gap-2 hover:bg-gray-50 transition-all text-sm shadow-sm">
          <Download size={18} className="text-emerald-600" />
          تصدير الأرشيف
        </button>
      </div>

      <div className="gov-card p-0 overflow-hidden">
        <div className="p-4 border-b border-gray-100 flex flex-col md:flex-row gap-4 justify-between items-center bg-gray-50/30">
          <div className="relative w-full md:w-80">
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type="text" 
              placeholder="ابحث في الأرشيف..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-4 pr-10 py-2.5 border border-gray-200 rounded-xl outline-none focus:border-emerald-500 text-sm bg-white"
            />
          </div>
          <div className="flex gap-2 items-center">
            <span className="text-xs font-bold text-gray-400 uppercase">السنة:</span>
            <select 
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              className="border border-gray-200 bg-white px-4 py-2.5 rounded-xl text-sm font-bold text-emerald-700 outline-none focus:border-emerald-500 shadow-sm"
            >
              <option value="2023">2023</option>
              <option value="2022">2022</option>
              <option value="2021">2021</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-right border-collapse">
            <thead>
              <tr className="bg-gray-50/80 text-gray-600 text-xs uppercase tracking-wider">
                <th className="p-4 font-bold border-b border-gray-100">الموظف</th>
                <th className="p-4 font-bold border-b border-gray-100">السنة</th>
                <th className="p-4 font-bold border-b border-gray-100">النقطة</th>
                <th className="p-4 font-bold border-b border-gray-100">التقدير</th>
                <th className="p-4 font-bold border-b border-gray-100">المقيم (Observer)</th>
                <th className="p-4 font-bold border-b border-gray-100 text-center">التقرير</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {mockHistory.filter(h => h.name.includes(searchTerm) && h.year.toString() === selectedYear).map((item) => (
                <tr key={item.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="p-4">
                    <span className="font-bold text-gray-800 text-sm">{item.name}</span>
                  </td>
                  <td className="p-4">
                    <span className="flex items-center gap-1.5 text-xs text-gray-500 font-bold">
                      <Calendar size={12} className="text-emerald-600" />
                      {item.year}
                    </span>
                  </td>
                  <td className="p-4">
                    <span className="font-black text-gray-700">{item.score}</span>
                  </td>
                  <td className="p-4">
                    <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${
                      item.grade === 'ممتاز' ? 'bg-emerald-100 text-emerald-700 border border-emerald-200' :
                      item.grade === 'جيد جداً' ? 'bg-blue-100 text-blue-700 border border-blue-200' :
                      'bg-slate-100 text-slate-700 border border-slate-200'
                    }`}>
                      {item.grade}
                    </span>
                  </td>
                  <td className="p-4 text-sm text-gray-500 font-medium">{item.observer}</td>
                  <td className="p-4 text-center">
                    <button className="text-emerald-600 hover:text-emerald-700 font-bold text-xs flex items-center gap-1 justify-center mx-auto">
                      <Download size={14} />
                      PDF
                    </button>
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

export default EvalHistory;
