import { useState } from 'react';
import { FileText, Search, Download, Plus, Filter, FileCheck } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const mockCertificates = [
  { id: 'CERT-2487', animal: 'بقرة حلوب 01', owner: 'مزرعة الخير', date: '2024-05-19', type: 'شهادة صحية' },
  { id: 'CERT-2486', animal: 'خروف ساردي', owner: 'أحمد العلمي', date: '2024-05-18', type: 'شهادة تلقيح' },
  { id: 'CERT-2485', animal: 'ماعز ألبين', owner: 'تعاونية الأمل', date: '2024-05-15', type: 'شهادة صحية' },
  { id: 'CERT-2484', animal: 'دواجن - فوج 4', owner: 'ضيعة النخيل', date: '2024-05-10', type: 'شهادة ذبح' },
];

const Certificates = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="space-y-6 animate-slide-up">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">الشهادات البيطرية</h1>
          <p className="text-sm text-gray-500 mt-1">الرئيسية / الصحة الحيوانية / أرشيف الشهادات</p>
        </div>
        <button 
          onClick={() => navigate('/veterinaire/certificates/issue')}
          className="bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2.5 rounded-xl font-bold flex items-center gap-2 transition-all shadow-md text-sm"
        >
          <Plus size={18} />
          إصدار شهادة جديدة
        </button>
      </div>

      <div className="gov-card p-0 overflow-hidden">
        <div className="p-4 border-b border-gray-100 flex flex-col md:flex-row gap-4 justify-between items-center bg-gray-50/30">
          <div className="relative w-full md:w-80">
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type="text" 
              placeholder="ابحث برقم الشهادة أو اسم الحيوان..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-4 pr-10 py-2.5 border border-gray-200 rounded-xl outline-none focus:border-emerald-500 text-sm bg-white shadow-sm"
            />
          </div>
          <button className="flex items-center gap-2 border border-gray-200 bg-white px-4 py-2.5 rounded-xl text-sm font-bold text-gray-600 hover:bg-gray-50">
            <Filter size={16} />
            تصفية
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-right border-collapse">
            <thead>
              <tr className="bg-gray-50/80 text-gray-600 text-[10px] font-black uppercase tracking-[0.2em]">
                <th className="p-4 border-b border-gray-100">رقم الشهادة</th>
                <th className="p-4 border-b border-gray-100">الحيوان</th>
                <th className="p-4 border-b border-gray-100">المالك</th>
                <th className="p-4 border-b border-gray-100">النوع</th>
                <th className="p-4 border-b border-gray-100">التاريخ</th>
                <th className="p-4 border-b border-gray-100 text-center">الإجراءات</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {mockCertificates.filter(c => c.id.includes(searchTerm) || c.animal.includes(searchTerm)).map((item) => (
                <tr key={item.id} className="hover:bg-gray-50/50 transition-colors group">
                  <td className="p-4">
                    <span className="font-black text-emerald-700 text-sm">{item.id}</span>
                  </td>
                  <td className="p-4">
                    <span className="font-bold text-gray-800 text-sm">{item.animal}</span>
                  </td>
                  <td className="p-4 text-sm text-gray-600 font-medium">{item.owner}</td>
                  <td className="p-4">
                    <span className="px-2.5 py-1 bg-gray-100 text-gray-600 rounded-lg text-[10px] font-black uppercase border border-gray-200">
                      {item.type}
                    </span>
                  </td>
                  <td className="p-4 text-sm text-gray-400 font-bold">{item.date}</td>
                  <td className="p-4 text-center">
                    <div className="flex justify-center gap-2">
                       <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-all" title="معاينة"><FileCheck size={16} /></button>
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

export default Certificates;
