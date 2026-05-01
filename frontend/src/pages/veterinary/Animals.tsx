import { useState } from 'react';
import { Search, Filter, Plus, Eye, Edit, Trash2, PawPrint } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const mockAnimals = [
  { id: 1, name: 'بقرة حلوب 01', type: 'بقر', breed: 'هولشتاين', owner: 'مزرعة الخير', status: 'جيدة', lastCheck: '2024-05-15', img: 'https://images.unsplash.com/photo-1546445317-29f4545e9d53?auto=format&fit=crop&w=100&q=80' },
  { id: 2, name: 'خروف ساردي', type: 'غنم', breed: 'ساردي', owner: 'أحمد العلمي', status: 'تحت العلاج', lastCheck: '2024-05-18', img: 'https://images.unsplash.com/photo-1484557918186-7b4e59ad7335?auto=format&fit=crop&w=100&q=80' },
  { id: 3, name: 'دجاج لاحم - فوج 4', type: 'دواجن', breed: 'كوب 500', owner: 'ضيعة النخيل', status: 'جيدة', lastCheck: '2024-05-10', img: 'https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?auto=format&fit=crop&w=100&q=80' },
  { id: 4, name: 'ماعز ألبين', type: 'ماعز', breed: 'ألبين', owner: 'تعاونية الأمل', status: 'جيدة', lastCheck: '2024-05-12', img: 'https://images.unsplash.com/photo-1524024973431-2ad916746881?auto=format&fit=crop&w=100&q=80' },
  { id: 5, name: 'ثور تسمين 05', type: 'بقر', breed: 'ليموزين', owner: 'مزرعة الخير', status: 'جيدة', lastCheck: '2024-05-05', img: 'https://images.unsplash.com/photo-1570042225831-d98fa7577f1e?auto=format&fit=crop&w=100&q=80' },
];

const Animals = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');

  return (
    <div className="space-y-6 animate-slide-up">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">إدارة الحيوانات</h1>
          <p className="text-sm text-gray-500 mt-1">الرئيسية / الصحة الحيوانية / قائمة الحيوانات</p>
        </div>
        <button 
          onClick={() => navigate('/veterinaire/animals/add')}
          className="bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2.5 rounded-xl font-bold flex items-center gap-2 transition-all shadow-md text-sm"
        >
          <Plus size={18} />
          إضافة حيوان جديد
        </button>
      </div>

      <div className="gov-card p-0 overflow-hidden">
        {/* Filters */}
        <div className="p-4 border-b border-gray-100 flex flex-col md:flex-row gap-4 justify-between items-center bg-gray-50/30">
          <div className="relative w-full md:w-80">
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type="text" 
              placeholder="ابحث باسم الحيوان أو المالك..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-4 pr-10 py-2.5 border border-gray-200 rounded-xl outline-none focus:border-emerald-500 text-sm bg-white shadow-sm"
            />
          </div>
          <div className="flex gap-2">
            <button className="flex items-center gap-2 border border-gray-200 bg-white px-4 py-2.5 rounded-xl text-sm font-bold text-gray-600 hover:bg-gray-50 transition-all">
              <Filter size={16} />
              كل الأنواع
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-right border-collapse">
            <thead>
              <tr className="bg-gray-50/80 text-gray-600 text-[10px] font-black uppercase tracking-[0.2em]">
                <th className="p-4 border-b border-gray-100">الحيوان</th>
                <th className="p-4 border-b border-gray-100">النوع / السلالة</th>
                <th className="p-4 border-b border-gray-100">المالك</th>
                <th className="p-4 border-b border-gray-100">الحالة الصحية</th>
                <th className="p-4 border-b border-gray-100">آخر فحص</th>
                <th className="p-4 border-b border-gray-100 text-center">الإجراءات</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {mockAnimals.filter(a => a.name.includes(search) || a.owner.includes(search)).map((animal) => (
                <tr key={animal.id} className="hover:bg-emerald-50/20 transition-colors group">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <img src={animal.img} alt={animal.name} className="w-12 h-12 rounded-2xl object-cover border border-gray-100 shadow-sm" />
                      <div>
                        <p className="font-bold text-gray-800 text-sm">{animal.name}</p>
                        <p className="text-[10px] text-gray-400 font-bold uppercase">ID: #{animal.id}VET</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="space-y-1">
                      <span className="text-sm font-bold text-gray-700">{animal.type}</span>
                      <p className="text-[10px] text-gray-400 font-bold">{animal.breed}</p>
                    </div>
                  </td>
                  <td className="p-4 text-sm font-bold text-gray-600">{animal.owner}</td>
                  <td className="p-4">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border ${
                      animal.status === 'جيدة' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' : 'bg-amber-50 text-amber-700 border-amber-100'
                    }`}>
                      {animal.status}
                    </span>
                  </td>
                  <td className="p-4 text-sm text-gray-400 font-bold">{animal.lastCheck}</td>
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
          <span>إجمالي السجلات: {mockAnimals.length}</span>
          <span>الصفحة 1 من 12</span>
        </div>
      </div>
    </div>
  );
};

export default Animals;
