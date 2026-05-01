import { useState } from 'react';
import { Briefcase, UserCheck, UserX, Clock, Search, Filter } from 'lucide-react';

const mockStatuses = [
  { id: 1, name: 'أحمد العلوي', department: 'المصلحة الصحية', status: 'نشط', since: '2020-01-15' },
  { id: 2, name: 'فاطمة الزهراء بنعلي', department: 'الموارد البشرية', status: 'في عطلة', since: '2024-05-10' },
  { id: 3, name: 'محمد أمين الناصري', department: 'المصلحة البيطرية', status: 'نشط', since: '2022-03-20' },
  { id: 4, name: 'سمية آيت الطالب', department: 'الكتابة العامة', status: 'موقوف', since: '2024-04-01' },
  { id: 5, name: 'رضوان الوهابي', department: 'القسم التقني', status: 'نشط', since: '2021-11-05' },
];

const AdminStatus = () => {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="space-y-6 animate-slide-up">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">الوضعيات الإدارية</h1>
        <p className="text-sm text-gray-500 mt-1">الرئيسية / الحالة الإدارية / الوضعيات الإدارية</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="gov-card flex items-center gap-4 border-r-4 border-emerald-500">
          <div className="p-3 bg-emerald-50 text-emerald-600 rounded-2xl">
            <UserCheck size={24} />
          </div>
          <div>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">نشط</p>
            <p className="text-2xl font-black text-gray-800">214</p>
          </div>
        </div>
        <div className="gov-card flex items-center gap-4 border-r-4 border-amber-500">
          <div className="p-3 bg-amber-50 text-amber-600 rounded-2xl">
            <Clock size={24} />
          </div>
          <div>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">في عطلة</p>
            <p className="text-2xl font-black text-gray-800">18</p>
          </div>
        </div>
        <div className="gov-card flex items-center gap-4 border-r-4 border-rose-500">
          <div className="p-3 bg-rose-50 text-rose-600 rounded-2xl">
            <UserX size={24} />
          </div>
          <div>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">موقوف</p>
            <p className="text-2xl font-black text-gray-800">3</p>
          </div>
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
              <tr className="bg-gray-50/80 text-gray-600 text-xs uppercase tracking-wider">
                <th className="p-4 font-bold border-b border-gray-100">الموظف</th>
                <th className="p-4 font-bold border-b border-gray-100">المصلحة</th>
                <th className="p-4 font-bold border-b border-gray-100">الوضعية الحالية</th>
                <th className="p-4 font-bold border-b border-gray-100">منذ تاريخ</th>
                <th className="p-4 font-bold border-b border-gray-100 text-center">الإجراءات</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {mockStatuses.filter(s => s.name.includes(searchTerm)).map((item) => (
                <tr key={item.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 bg-gray-100 rounded-full flex items-center justify-center text-gray-500 font-bold text-xs border border-gray-200">
                        {item.name.charAt(0)}
                      </div>
                      <span className="font-bold text-gray-800 text-sm">{item.name}</span>
                    </div>
                  </td>
                  <td className="p-4 text-sm text-gray-600 font-medium">{item.department}</td>
                  <td className="p-4">
                    <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${
                      item.status === 'نشط' ? 'bg-emerald-100 text-emerald-700 border border-emerald-200' :
                      item.status === 'في عطلة' ? 'bg-amber-100 text-amber-700 border border-amber-200' :
                      'bg-rose-100 text-rose-700 border border-rose-200'
                    }`}>
                      {item.status}
                    </span>
                  </td>
                  <td className="p-4 text-sm text-gray-500 font-medium">{item.since}</td>
                  <td className="p-4 text-center">
                    <button className="text-emerald-600 text-xs font-bold hover:underline">تعديل الوضعية</button>
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

export default AdminStatus;
