import { useState } from 'react';
import { CalendarCheck, Search, Filter, ArrowUpRight } from 'lucide-react';

const mockLeaveBalance = [
  { id: 1, name: 'أحمد العلوي', total: 22, used: 5, remaining: 17, img: 'https://i.pravatar.cc/150?u=1' },
  { id: 2, name: 'فاطمة الزهراء بنعلي', total: 22, used: 12, remaining: 10, img: 'https://i.pravatar.cc/150?u=2' },
  { id: 3, name: 'محمد أمين الناصري', total: 22, used: 0, remaining: 22, img: 'https://i.pravatar.cc/150?u=3' },
  { id: 4, name: 'سمية آيت الطالب', total: 22, used: 15, remaining: 7, img: 'https://i.pravatar.cc/150?u=4' },
  { id: 5, name: 'رضوان الوهابي', total: 22, used: 8, remaining: 14, img: 'https://i.pravatar.cc/150?u=5' },
];

const LeaveBalance = () => {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="space-y-6 animate-slide-up">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">رصيد العطل</h1>
          <p className="text-sm text-gray-500 mt-1">الرئيسية / إدارة العطل / رصيد الموظفين</p>
        </div>
      </div>

      <div className="gov-card p-0 overflow-hidden">
        <div className="p-4 border-b border-gray-100 flex flex-col md:flex-row gap-4 justify-between items-center bg-gray-50/30">
          <div className="relative w-full md:w-80">
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type="text" 
              placeholder="ابحث عن موظف..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-4 pr-10 py-2.5 border border-gray-200 rounded-xl outline-none focus:border-emerald-500 text-sm bg-white"
            />
          </div>
          <button className="flex items-center gap-2 border border-gray-200 bg-white px-4 py-2.5 rounded-xl text-sm font-bold text-gray-600 hover:bg-gray-50 transition-all">
            <Filter size={16} />
            تصفية
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-right border-collapse">
            <thead>
              <tr className="bg-gray-50/80 text-gray-600 text-xs uppercase tracking-wider font-black">
                <th className="p-4 border-b border-gray-100">الموظف</th>
                <th className="p-4 border-b border-gray-100">الرصيد الإجمالي</th>
                <th className="p-4 border-b border-gray-100">المستخدم</th>
                <th className="p-4 border-b border-gray-100">المتبقي</th>
                <th className="p-4 border-b border-gray-100">نسبة الاستهلاك</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {mockLeaveBalance.filter(e => e.name.includes(searchTerm)).map((item) => (
                <tr key={item.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <img src={item.img} alt={item.name} className="w-9 h-9 rounded-xl border border-gray-200" />
                      <span className="font-bold text-gray-800 text-sm">{item.name}</span>
                    </div>
                  </td>
                  <td className="p-4 font-bold text-gray-600">{item.total} يوم</td>
                  <td className="p-4 font-bold text-amber-600">{item.used} يوم</td>
                  <td className="p-4">
                    <span className="px-3 py-1.5 bg-emerald-50 text-emerald-800 rounded-lg font-black text-sm border border-emerald-100">
                      {item.remaining} يوم
                    </span>
                  </td>
                  <td className="p-4 min-w-[150px]">
                    <div className="flex items-center gap-3">
                      <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div 
                          className={`h-full rounded-full ${
                            (item.used / item.total) > 0.7 ? 'bg-rose-500' :
                            (item.used / item.total) > 0.4 ? 'bg-amber-500' : 'bg-emerald-500'
                          }`}
                          style={{ width: `${(item.used / item.total) * 100}%` }}
                        ></div>
                      </div>
                      <span className="text-[10px] font-black text-gray-400">{Math.round((item.used / item.total) * 100)}%</span>
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

export default LeaveBalance;
