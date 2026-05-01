import { useState } from 'react';
import { List, Search, Filter, Plus, FileSpreadsheet, Edit, Trash2 } from 'lucide-react';

const mockGrades = [
  { id: 1, title: 'متصرف من الدرجة الممتازة', scale: 'خارج السلم', compensations: '4,500 درهم' },
  { id: 2, title: 'متصرف من الدرجة الأولى', scale: 'السلم 11', compensations: '3,200 درهم' },
  { id: 3, title: 'متصرف من الدرجة الثانية', scale: 'السلم 10', compensations: '2,800 درهم' },
  { id: 4, title: 'طبيب من الدرجة الممتازة', scale: 'خارج السلم', compensations: '8,500 درهم' },
  { id: 5, title: 'طبيب من الدرجة الأولى', scale: 'الرقم الاستدلالي 509', compensations: '6,200 درهم' },
  { id: 6, title: 'ممرض مجاز من الدولة الدرجة الأولى', scale: 'السلم 10', compensations: '1,500 درهم' },
  { id: 7, title: 'تقني من الدرجة الثالثة', scale: 'السلم 9', compensations: '900 درهم' },
];

const Grades = () => {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="space-y-6 animate-slide-up">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">الدرجات والسلم</h1>
          <p className="text-sm text-gray-500 mt-1">الرئيسية / الحالة الإدارية / الدرجات والسلم</p>
        </div>
        <div className="flex gap-2">
          <button className="bg-white border border-gray-200 text-gray-700 px-4 py-2.5 rounded-xl font-bold flex items-center gap-2 hover:bg-gray-50 transition-all text-sm">
            <FileSpreadsheet size={18} className="text-emerald-600" />
            تصدير Excel
          </button>
          <button className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2.5 rounded-xl font-bold flex items-center gap-2 transition-all shadow-sm text-sm">
            <Plus size={18} />
            إضافة درجة
          </button>
        </div>
      </div>

      <div className="gov-card p-0 overflow-hidden">
        {/* Filters */}
        <div className="p-4 border-b border-gray-100 flex flex-col md:flex-row gap-4 justify-between items-center bg-gray-50/30">
          <div className="relative w-full md:w-80">
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type="text" 
              placeholder="ابحث عن درجة أو سلم..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-4 pr-10 py-2.5 border border-gray-200 rounded-xl outline-none focus:border-emerald-500 text-sm bg-white"
            />
          </div>
          <button className="flex items-center gap-2 border border-gray-200 bg-white px-4 py-2.5 rounded-xl text-sm font-bold text-gray-600 hover:bg-gray-50 transition-all">
            <Filter size={16} />
            تصفية النتائج
          </button>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-right border-collapse">
            <thead>
              <tr className="bg-gray-50/80 text-gray-600 text-xs uppercase tracking-wider">
                <th className="p-4 font-bold border-b border-gray-100">ID</th>
                <th className="p-4 font-bold border-b border-gray-100">الدرجة (Grade)</th>
                <th className="p-4 font-bold border-b border-gray-100">السلم (Scale)</th>
                <th className="p-4 font-bold border-b border-gray-100">التعويضات الشهرية</th>
                <th className="p-4 font-bold border-b border-gray-100 text-center">الإجراءات</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {mockGrades.filter(g => g.title.includes(searchTerm) || g.scale.includes(searchTerm)).map((grade) => (
                <tr key={grade.id} className="hover:bg-emerald-50/30 transition-colors group">
                  <td className="p-4 text-sm text-gray-500 font-medium">#{grade.id}</td>
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-emerald-50 text-emerald-600 rounded-lg flex items-center justify-center font-bold text-xs">
                        {grade.id}
                      </div>
                      <span className="font-bold text-gray-800 text-sm">{grade.title}</span>
                    </div>
                  </td>
                  <td className="p-4">
                    <span className="px-3 py-1 bg-slate-100 text-slate-700 rounded-full text-xs font-bold">
                      {grade.scale}
                    </span>
                  </td>
                  <td className="p-4 text-sm font-bold text-emerald-700">{grade.compensations}</td>
                  <td className="p-4">
                    <div className="flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"><Edit size={16} /></button>
                      <button className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"><Trash2 size={16} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Footer */}
        <div className="p-4 bg-gray-50/50 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500 font-bold uppercase tracking-widest">
          <span>إجمالي الدرجات: {mockGrades.length}</span>
          <span>آخر تحديث: {new Date().toLocaleDateString('ar-MA')}</span>
        </div>
      </div>
    </div>
  );
};

export default Grades;
