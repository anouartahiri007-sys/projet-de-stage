import { useState } from 'react';
import { Syringe, Search, Filter, Plus, FileText, Download, User, Clock, Edit } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const NurseTreatments = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');

  const mockTreatments = [
    { id: 1, patient: 'الحسين مرابط', treatment: 'أنسولين سريع المفعول', dosage: '10 وحدات', date: '2024-05-20 09:00', nurse: 'فاطمة الزهراء' },
    { id: 2, patient: 'خديجة بوعزة', treatment: 'أملوديبين', dosage: '5 مغ', date: '2024-05-20 08:30', nurse: 'فاطمة الزهراء' },
    { id: 3, patient: 'أحمد العلوي', treatment: 'فنتولين بخاخ', dosage: 'بختان', date: '2024-05-19 22:00', nurse: 'سعاد العلمي' },
    { id: 4, patient: 'سمية أيت الطالب', treatment: 'حمض الفوليك', dosage: '5 مغ', date: '2024-05-19 09:00', nurse: 'فاطمة الزهراء' },
  ];

  return (
    <div className="space-y-6 animate-slide-up pb-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 font-heading">العلاجات المقدمة</h1>
          <p className="text-sm text-gray-500 mt-1">الرئيسية / الملف الطبي / سجل العلاجات</p>
        </div>
        <button 
          onClick={() => navigate('/nurse/treatments/add')}
          className="bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2.5 rounded-xl font-bold flex items-center gap-2 transition-all shadow-md text-sm"
        >
          <Plus size={18} />
          إضافة علاج جديد
        </button>
      </div>

      <div className="gov-card p-0 overflow-hidden">
        <div className="p-6 border-b border-gray-100 flex flex-col md:flex-row gap-6 justify-between items-center bg-gray-50/30">
          <div className="relative w-full md:w-96">
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type="text" 
              placeholder="ابحث باسم المريض أو نوع العلاج..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-4 pr-10 py-3 border border-gray-200 rounded-xl outline-none focus:border-emerald-500 text-sm bg-white shadow-sm font-bold"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-right border-collapse">
            <thead>
              <tr className="bg-gray-50 text-gray-600 text-[10px] font-black uppercase tracking-[0.2em]">
                <th className="p-4 border-b border-gray-100">المريض</th>
                <th className="p-4 border-b border-gray-100">العلاج</th>
                <th className="p-4 border-b border-gray-100 text-center">الجرعة</th>
                <th className="p-4 border-b border-gray-100">التاريخ والوقت</th>
                <th className="p-4 border-b border-gray-100 text-center">الإجراءات</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {mockTreatments.filter(t => t.patient.includes(search) || t.treatment.includes(search)).map((item) => (
                <tr key={item.id} className="hover:bg-emerald-50/20 transition-colors group">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                       <div className="w-9 h-9 bg-gray-50 rounded-xl flex items-center justify-center text-gray-400 group-hover:bg-emerald-50 group-hover:text-emerald-600 transition-all">
                          <User size={18} />
                       </div>
                       <span className="font-bold text-gray-800 text-sm">{item.patient}</span>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex flex-col">
                      <span className="text-sm font-bold text-gray-700">{item.treatment}</span>
                      <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">الممرض(ة): {item.nurse}</span>
                    </div>
                  </td>
                  <td className="p-4 text-center">
                    <span className="px-3 py-1 bg-blue-50 text-blue-700 rounded-lg text-[10px] font-black border border-blue-100 uppercase">
                      {item.dosage}
                    </span>
                  </td>
                  <td className="p-4 text-sm text-gray-400 font-bold">
                    <div className="flex items-center gap-2">
                       <Clock size={12} className="text-emerald-500" />
                       {item.date}
                    </div>
                  </td>
                  <td className="p-4 text-center">
                    <div className="flex items-center justify-center gap-1 opacity-0 group-hover:opacity-100 transition-all">
                      <button className="p-2.5 text-emerald-600 hover:bg-emerald-50 rounded-xl transition-all" title="تعديل"><Edit size={18} /></button>
                      <button className="p-2.5 text-blue-600 hover:bg-blue-50 rounded-xl transition-all" title="تحميل"><Download size={18} /></button>
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

export default NurseTreatments;
