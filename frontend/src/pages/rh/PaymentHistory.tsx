import { useState } from 'react';
import { ScrollText, Search, Filter, Download, FileText, Calendar } from 'lucide-react';

const mockPayments = [
  { id: 1, month: 'ماي 2024', date: '2024-05-25', total: '1,248,000', status: 'processing', employees: 248 },
  { id: 2, month: 'أبريل 2024', date: '2024-04-26', total: '1,242,500', status: 'completed', employees: 246 },
  { id: 3, month: 'مارس 2024', date: '2024-03-27', total: '1,238,000', status: 'completed', employees: 245 },
  { id: 4, month: 'فبراير 2024', date: '2024-02-26', total: '1,235,200', status: 'completed', employees: 245 },
];

const PaymentHistory = () => {
  const [selectedYear, setSelectedYear] = useState('2024');

  return (
    <div className="space-y-6 animate-slide-up">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">سجل الأداءات</h1>
          <p className="text-sm text-gray-500 mt-1">الرئيسية / التعويضات والأجور / تاريخ الدفع</p>
        </div>
        <div className="flex gap-2">
          <select 
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
            className="bg-white border border-gray-200 text-gray-700 px-4 py-2.5 rounded-xl font-bold text-sm outline-none focus:border-emerald-500 shadow-sm"
          >
            <option value="2024">سنة 2024</option>
            <option value="2023">سنة 2023</option>
          </select>
        </div>
      </div>

      <div className="gov-card p-0 overflow-hidden">
        <div className="p-6 border-b border-gray-100 bg-gray-50/30 flex items-center justify-between">
          <h2 className="font-bold text-gray-800 flex items-center gap-2 text-lg">
            <ScrollText size={22} className="text-emerald-600" />
            أرشيف الدفع الشهري
          </h2>
        </div>

        <div className="divide-y divide-gray-50">
          {mockPayments.map((payment) => (
            <div key={payment.id} className="p-6 hover:bg-gray-50/50 transition-all flex flex-col md:flex-row md:items-center justify-between gap-6 group">
              <div className="flex items-center gap-5">
                <div className="w-14 h-14 bg-white border-2 border-gray-100 text-emerald-600 rounded-2xl flex flex-col items-center justify-center shadow-sm group-hover:border-emerald-200 transition-colors">
                  <Calendar size={20} className="mb-0.5" />
                  <span className="text-[10px] font-black uppercase">{payment.month.split(' ')[0]}</span>
                </div>
                <div>
                  <h3 className="font-extrabold text-gray-800 text-lg">{payment.month}</h3>
                  <p className="text-xs text-gray-400 font-bold uppercase tracking-widest mt-1">تاريخ الإصدار: {payment.date}</p>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-8 md:gap-16">
                <div>
                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">إجمالي المبلغ</p>
                  <p className="text-xl font-black text-emerald-800">{payment.total} درهم</p>
                </div>
                <div>
                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">الموظفون</p>
                  <p className="text-xl font-black text-gray-700">{payment.employees}</p>
                </div>
                <div className="flex flex-col items-end">
                  <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest mb-3 border ${
                    payment.status === 'completed' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' : 'bg-blue-50 text-blue-700 border-blue-100 animate-pulse'
                  }`}>
                    {payment.status === 'completed' ? 'تم التنفيذ' : 'قيد المعالجة'}
                  </span>
                  <div className="flex gap-2">
                    <button className="p-2 text-gray-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-all" title="تحميل التقرير">
                      <Download size={18} />
                    </button>
                    <button className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all" title="عرض التفاصيل">
                      <FileText size={18} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="p-6 bg-gray-50/50 border-t border-gray-100 text-center">
          <button className="text-sm font-bold text-emerald-700 hover:underline">عرض المزيد من الأرشيف</button>
        </div>
      </div>
    </div>
  );
};

export default PaymentHistory;
