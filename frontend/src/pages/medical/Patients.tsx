import { useState } from 'react';
import { Search, Filter, Plus, Eye, Edit, Trash2, UserPlus, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const mockPatients = [
  { id: 1, name: 'سعاد الإدريسي', cin: 'L123456', age: 45, gender: 'أنثى', status: 'مستقرة', lastVisit: '2024-05-15', img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80' },
  { id: 2, name: 'محمد أمين الناصري', cin: 'K987654', age: 32, gender: 'ذكر', status: 'تحت العلاج', lastVisit: '2024-05-18', img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=100&q=80' },
  { id: 3, name: 'خديجة بوعزة', cin: 'M456123', age: 58, gender: 'أنثى', status: 'مستقرة', lastVisit: '2024-05-10', img: 'https://images.unsplash.com/photo-1554151228-14d9def656e4?auto=format&fit=crop&w=100&q=80' },
  { id: 4, name: 'الحسين مرابط', cin: 'P789456', age: 65, gender: 'ذكر', status: 'حرجة', lastVisit: '2024-05-12', img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80' },
  { id: 5, name: 'أحمد العلوي', cin: 'J321654', age: 29, gender: 'ذكر', status: 'مستقرة', lastCheck: '2024-05-05', img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=100&q=80' },
];

const Patients = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');

  return (
    <div className="space-y-6 animate-slide-up">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">المرضى والملفات الطبية</h1>
          <p className="text-sm text-gray-500 mt-1">الرئيسية / الملف الطبي / قائمة المرضى</p>
        </div>
        <button 
          onClick={() => navigate('/medical/patients/add')}
          className="bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2.5 rounded-xl font-bold flex items-center gap-2 transition-all shadow-md text-sm"
        >
          <UserPlus size={18} />
          إضافة ملف طبي جديد
        </button>
      </div>

      <div className="gov-card p-0 overflow-hidden">
        {/* Filters */}
        <div className="p-4 border-b border-gray-100 flex flex-col md:flex-row gap-4 justify-between items-center bg-gray-50/30">
          <div className="relative w-full md:w-80">
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type="text" 
              placeholder="ابحث باسم المريض أو CIN..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-4 pr-10 py-2.5 border border-gray-200 rounded-xl outline-none focus:border-emerald-500 text-sm bg-white shadow-sm"
            />
          </div>
          <div className="flex gap-2">
            <button className="flex items-center gap-2 border border-gray-200 bg-white px-4 py-2.5 rounded-xl text-sm font-bold text-gray-600 hover:bg-gray-50 transition-all">
              <Filter size={16} />
              كل الحالات
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-right border-collapse">
            <thead>
              <tr className="bg-gray-50/80 text-gray-600 text-[10px] font-black uppercase tracking-[0.2em]">
                <th className="p-4 border-b border-gray-100">المريض</th>
                <th className="p-4 border-b border-gray-100">العمر / الجنس</th>
                <th className="p-4 border-b border-gray-100">CIN</th>
                <th className="p-4 border-b border-gray-100">الحالة الصحية</th>
                <th className="p-4 border-b border-gray-100">آخر زيارة</th>
                <th className="p-4 border-b border-gray-100 text-center">الإجراءات</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {mockPatients.filter(a => a.name.includes(search) || a.cin.includes(search)).map((patient) => (
                <tr key={patient.id} className="hover:bg-emerald-50/20 transition-colors group">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <img src={patient.img} alt={patient.name} className="w-10 h-10 rounded-full object-cover border border-gray-100 shadow-sm" />
                      <div>
                        <p className="font-bold text-gray-800 text-sm">{patient.name}</p>
                        <p className="text-[10px] text-gray-400 font-bold uppercase">Patient ID: #{patient.id}MED</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="space-y-1">
                      <span className="text-sm font-bold text-gray-700">{patient.age} سنة</span>
                      <p className="text-[10px] text-gray-400 font-bold">{patient.gender}</p>
                    </div>
                  </td>
                  <td className="p-4 text-sm font-bold text-gray-600 tracking-wider">{patient.cin}</td>
                  <td className="p-4">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border ${
                      patient.status === 'مستقرة' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' : 
                      patient.status === 'حرجة' ? 'bg-rose-50 text-rose-700 border-rose-100' :
                      'bg-amber-50 text-amber-700 border-amber-100'
                    }`}>
                      {patient.status}
                    </span>
                  </td>
                  <td className="p-4 text-sm text-gray-400 font-bold">{patient.lastVisit || 'لا يوجد'}</td>
                  <td className="p-4 text-center">
                    <div className="flex items-center justify-center gap-1 opacity-0 group-hover:opacity-100 transition-all">
                      <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-all" title="تفاصيل"><Eye size={16} /></button>
                      <button className="p-2 text-emerald-600 hover:bg-emerald-50 rounded-lg transition-all" title="تعديل"><Edit size={16} /></button>
                      <button className="p-2 text-rose-600 hover:bg-rose-50 rounded-lg transition-all" title="حذف"><Trash2 size={16} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div className="p-4 bg-gray-50/50 border-t border-gray-100 flex items-center justify-between text-[10px] text-gray-400 font-black uppercase tracking-[0.2em]">
          <span>إجمالي المرضى: {mockPatients.length}</span>
          <span>الصفحة 1 من 5</span>
        </div>
      </div>
    </div>
  );
};

export default Patients;
