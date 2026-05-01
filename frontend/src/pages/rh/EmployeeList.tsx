import { useState, useEffect } from 'react';
import { Search, Filter, Plus, Eye, Edit, Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const mockEmployees = [
  { id: 1, name: 'ياسين بومدين', role: 'ممرض', department: 'المصلحة الصحية', status: 'نشط', img: 'https://i.pravatar.cc/150?u=1' },
  { id: 2, name: 'خديجة أمزال', role: 'طبيب عام', department: 'المصلحة الصحية', status: 'نشط', img: 'https://i.pravatar.cc/150?u=2' },
  { id: 3, name: 'يوسف المراكشي', role: 'طبيب بيطري', department: 'المصلحة البيطرية', status: 'في عطلة', img: 'https://i.pravatar.cc/150?u=3' },
  { id: 4, name: 'مريم الحاجي', role: 'إدارية', department: 'الكتابة العامة', status: 'نشط', img: 'https://i.pravatar.cc/150?u=4' },
  { id: 5, name: 'سفيان الرويسي', role: 'تقني معلومات', department: 'قسم المعلوميات', status: 'غير نشط', img: 'https://i.pravatar.cc/150?u=5' },
];

const EmployeeList = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">إدارة الموظفين</h1>
          <p className="text-sm text-gray-500 mt-1">الرئيسية / إدارة الموظفين / قائمة الموظفين</p>
        </div>
        <button 
          onClick={() => navigate('/rh/employees/add')}
          className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2.5 rounded-lg font-bold flex items-center gap-2 transition-colors shadow-sm"
        >
          <Plus size={18} />
          إضافة موظف جديد
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        {/* Filters */}
        <div className="p-4 border-b border-gray-100 flex flex-col md:flex-row gap-4 justify-between items-center bg-gray-50/50">
          <div className="relative w-full md:w-80">
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type="text" 
              placeholder="ابحث عن موظف..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-4 pr-10 py-2 border border-gray-200 rounded-lg outline-none focus:border-emerald-500 text-sm"
            />
          </div>
          <div className="flex items-center gap-2 w-full md:w-auto">
            <button className="flex items-center gap-2 border border-gray-200 bg-white px-4 py-2 rounded-lg text-sm font-bold text-gray-600 hover:bg-gray-50">
              <Filter size={16} />
              تصفية
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-right">
            <thead className="bg-gray-50 text-gray-600 text-sm">
              <tr>
                <th className="p-4 font-bold">الموظف</th>
                <th className="p-4 font-bold">الوظيفة</th>
                <th className="p-4 font-bold">المصلحة</th>
                <th className="p-4 font-bold">الحالة</th>
                <th className="p-4 font-bold text-center">الإجراءات</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {mockEmployees.filter(e => e.name.includes(search)).map((emp) => (
                <tr key={emp.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <img src={emp.img} alt={emp.name} className="w-10 h-10 rounded-full object-cover border border-gray-200" />
                      <div>
                        <p className="font-bold text-gray-800">{emp.name}</p>
                        <p className="text-xs text-gray-500">ID: #{emp.id}00</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 text-sm font-medium text-gray-700">{emp.role}</td>
                  <td className="p-4 text-sm font-medium text-gray-700">{emp.department}</td>
                  <td className="p-4">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${
                      emp.status === 'نشط' ? 'bg-emerald-100 text-emerald-700' :
                      emp.status === 'في عطلة' ? 'bg-amber-100 text-amber-700' :
                      'bg-red-100 text-red-700'
                    }`}>
                      {emp.status}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center justify-center gap-2">
                      <button className="p-1.5 text-blue-600 hover:bg-blue-50 rounded"><Eye size={16} /></button>
                      <button className="p-1.5 text-emerald-600 hover:bg-emerald-50 rounded"><Edit size={16} /></button>
                      <button className="p-1.5 text-red-600 hover:bg-red-50 rounded"><Trash2 size={16} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Pagination placeholder */}
        <div className="p-4 border-t border-gray-100 flex items-center justify-between text-sm text-gray-500">
          <span>عرض 1 إلى 5 من 248 موظف</span>
          <div className="flex gap-1">
            <button className="px-3 py-1 border border-gray-200 rounded hover:bg-gray-50">السابق</button>
            <button className="px-3 py-1 bg-emerald-600 text-white rounded">1</button>
            <button className="px-3 py-1 border border-gray-200 rounded hover:bg-gray-50">2</button>
            <button className="px-3 py-1 border border-gray-200 rounded hover:bg-gray-50">التالي</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeList;
