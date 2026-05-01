import { BarChart3, Download, FileText, Calendar, Filter, PieChart as PieIcon, ArrowUpRight } from 'lucide-react';

const HRReports = () => {
  const reports = [
    { title: 'التقرير السنوي للموارد البشرية 2023', date: '2024-01-15', size: '4.5 MB', type: 'PDF' },
    { title: 'إحصائيات الغياب والعطل - الربع الأول 2024', date: '2024-04-10', size: '2.1 MB', type: 'XLSX' },
    { title: 'تقرير توزيع كتلة الأجور حسب المصالح', date: '2024-05-05', size: '1.8 MB', type: 'PDF' },
    { title: 'مخطط التوظيف والاحتياجات المستقبلية', date: '2024-03-20', size: '3.2 MB', type: 'PDF' },
  ];

  return (
    <div className="space-y-6 animate-slide-up">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">تقارير الموارد البشرية</h1>
          <p className="text-sm text-gray-500 mt-1">الرئيسية / التقارير والإحصائيات / مركز التقارير</p>
        </div>
        <button className="bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2.5 rounded-xl font-bold flex items-center gap-2 transition-all shadow-md text-sm">
          <BarChart3 size={18} />
          توليد تقرير جديد
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Reports List */}
        <div className="lg:col-span-2 space-y-6">
          <div className="gov-card p-0 overflow-hidden">
            <div className="p-6 border-b border-gray-100 bg-gray-50/30">
              <h2 className="font-bold text-gray-800 flex items-center gap-2">
                <FileText size={20} className="text-emerald-600" />
                أحدث التقارير الجاهزة
              </h2>
            </div>
            <div className="divide-y divide-gray-100">
              {reports.map((report, idx) => (
                <div key={idx} className="p-6 hover:bg-emerald-50/20 transition-all flex items-center justify-between group">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-white border border-gray-100 text-emerald-600 rounded-2xl flex items-center justify-center shadow-sm group-hover:scale-110 transition-all">
                      <FileText size={22} />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-800 text-sm mb-1">{report.title}</h3>
                      <div className="flex items-center gap-3 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                        <span className="flex items-center gap-1"><Calendar size={12} /> {report.date}</span>
                        <span className="w-1 h-1 bg-gray-200 rounded-full"></span>
                        <span>{report.size}</span>
                        <span className="w-1 h-1 bg-gray-200 rounded-full"></span>
                        <span className="text-emerald-600">{report.type}</span>
                      </div>
                    </div>
                  </div>
                  <button className="p-2 text-gray-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-all opacity-0 group-hover:opacity-100">
                    <Download size={18} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Analytics Sidebar */}
        <div className="space-y-6">
          <div className="gov-card p-6 bg-emerald-900 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-2xl"></div>
            <div className="relative z-10">
              <h3 className="text-lg font-bold mb-6">ملخص المؤشرات</h3>
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between text-xs font-bold mb-2">
                    <span className="text-emerald-200">نسبة التغطية الصحية</span>
                    <span>94%</span>
                  </div>
                  <div className="w-full h-1.5 bg-white/10 rounded-full">
                    <div className="w-[94%] h-full bg-emerald-400 rounded-full"></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-xs font-bold mb-2">
                    <span className="text-emerald-200">رضا الموظفين</span>
                    <span>82%</span>
                  </div>
                  <div className="w-full h-1.5 bg-white/10 rounded-full">
                    <div className="w-[82%] h-full bg-blue-400 rounded-full"></div>
                  </div>
                </div>
              </div>
              <div className="mt-8 pt-6 border-t border-white/10">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-[10px] font-black uppercase text-emerald-300">معدل الدوران</p>
                    <p className="text-2xl font-black">2.4%</p>
                  </div>
                  <div className="p-2 bg-emerald-800 rounded-lg">
                    <ArrowUpRight size={20} className="text-emerald-400" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="gov-card p-6">
            <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
              <Filter size={18} className="text-emerald-600" />
              تصفية حسب
            </h3>
            <div className="space-y-3">
              <select className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-xs font-bold outline-none focus:border-emerald-500">
                <option>كل المصالح</option>
                <option>المصلحة الصحية</option>
                <option>المصلحة البيطرية</option>
              </select>
              <select className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-xs font-bold outline-none focus:border-emerald-500">
                <option>سنة 2024</option>
                <option>سنة 2023</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HRReports;
