import { useState } from 'react';
import { FileText, Search, Download, Eye, Calendar, User, Filter } from 'lucide-react';

const NurseHealthReports = () => {
  const [search, setSearch] = useState('');

  const mockReports = [
    { id: 1, patient: 'فاطمة الزهراء الإدريسي', type: 'تقرير متابعة يومي', date: '2024-05-19', status: 'final' },
    { id: 2, patient: 'أحمد العلوي', type: 'تقرير العلامات الحيوية الأسبوعي', date: '2024-05-15', status: 'final' },
    { id: 3, patient: 'سمية أيت الطالب', type: 'تقرير العلاج الشهري', date: '2024-05-10', status: 'draft' },
  ];

  return (
    <div className="space-y-6 animate-slide-up pb-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">التقارير الصحية</h1>
          <p className="text-sm text-gray-500 mt-1">الرئيسية / الملف الطبي / أرشيف التقارير</p>
        </div>
      </div>

      <div className="gov-card p-0 overflow-hidden">
        <div className="p-6 border-b border-gray-100 flex flex-col md:flex-row gap-6 justify-between items-center bg-gray-50/30">
          <div className="relative w-full md:w-96">
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type="text" 
              placeholder="ابحث باسم المريض أو نوع التقرير..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-4 pr-10 py-3 border border-gray-200 rounded-xl outline-none focus:border-emerald-500 text-sm bg-white shadow-sm font-bold"
            />
          </div>
          <button className="flex items-center gap-2 border border-gray-200 bg-white px-5 py-3 rounded-xl text-sm font-bold text-gray-600 hover:bg-gray-50 transition-all font-heading">
             <Filter size={18} />
             تصفية حسب التاريخ
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-right border-collapse">
            <thead>
              <tr className="bg-gray-50 text-gray-600 text-[10px] font-black uppercase tracking-[0.2em]">
                <th className="p-4 border-b border-gray-100">المريض</th>
                <th className="p-4 border-b border-gray-100">نوع التقرير</th>
                <th className="p-4 border-b border-gray-100">التاريخ</th>
                <th className="p-4 border-b border-gray-100 text-center">الحالة</th>
                <th className="p-4 border-b border-gray-100 text-center">الإجراءات</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {mockReports.filter(r => r.patient.includes(search) || r.type.includes(search)).map((report) => (
                <tr key={report.id} className="hover:bg-emerald-50/20 transition-colors group">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                       <div className="w-8 h-8 bg-gray-50 rounded-lg flex items-center justify-center text-gray-400 group-hover:bg-emerald-50 group-hover:text-emerald-600 transition-all">
                          <User size={16} />
                       </div>
                       <span className="font-bold text-gray-800 text-sm">{report.patient}</span>
                    </div>
                  </td>
                  <td className="p-4 text-sm font-bold text-gray-700">{report.type}</td>
                  <td className="p-4 text-sm text-gray-400 font-bold">{report.date}</td>
                  <td className="p-4 text-center">
                    <span className={`px-2.5 py-0.5 rounded text-[8px] font-black uppercase tracking-widest ${
                      report.status === 'final' ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' : 'bg-gray-50 text-gray-400 border border-gray-100'
                    }`}>
                      {report.status === 'final' ? 'نهائي' : 'مسودة'}
                    </span>
                  </td>
                  <td className="p-4 text-center">
                    <div className="flex items-center justify-center gap-1 opacity-0 group-hover:opacity-100 transition-all">
                      <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-all" title="عرض"><Eye size={16} /></button>
                      <button className="p-2 text-emerald-600 hover:bg-emerald-50 rounded-lg transition-all" title="تحميل PDF"><Download size={16} /></button>
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

export default NurseHealthReports;
