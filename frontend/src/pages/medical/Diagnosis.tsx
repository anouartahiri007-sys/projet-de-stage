import { useState } from 'react';
import { ClipboardList, Search, Filter, Plus, FileText, Download, User, Calendar } from 'lucide-react';

const mockDiagnosis = [
  { id: 1, patient: 'الحسين مرابط', disease: 'سكري نوع 2', notes: 'تم تعديل العلاج، متابعة بعد أسبوعين', date: '2024-05-18' },
  { id: 2, patient: 'خديجة بوعزة', disease: 'ارتفاع ضغط الدم', notes: 'تحسن ملحوظ، الاستمرار على العلاج الحالي', date: '2024-05-17' },
  { id: 3, patient: 'أحمد العلوي', disease: 'حساسية صدرية', notes: 'وصف دواء مضاد للحساسية', date: '2024-05-15' },
];

const Diagnosis = () => {
  const [search, setSearch] = useState('');

  return (
    <div className="space-y-6 animate-slide-up pb-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">التشخيصات والملاحظات الطبية</h1>
          <p className="text-sm text-gray-500 mt-1">الرئيسية / الملف الطبي / التشخيصات</p>
        </div>
        <button className="bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2.5 rounded-xl font-bold flex items-center gap-2 transition-all shadow-md text-sm">
          <Plus size={18} />
          إضافة تشخيص جديد
        </button>
      </div>

      <div className="gov-card p-0 overflow-hidden">
        <div className="p-6 border-b border-gray-100 flex flex-col md:flex-row gap-6 justify-between items-center bg-gray-50/30">
          <div className="relative w-full md:w-96">
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type="text" 
              placeholder="ابحث باسم المريض أو التشخيص..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-4 pr-10 py-3 border border-gray-200 rounded-xl outline-none focus:border-emerald-500 text-sm bg-white shadow-sm"
            />
          </div>
          <div className="flex gap-3">
             <button className="flex items-center gap-2 border border-gray-200 bg-white px-5 py-3 rounded-xl text-sm font-bold text-gray-600 hover:bg-gray-50 transition-all">
                <Filter size={18} />
                تاريخي
             </button>
             <button className="flex items-center gap-2 border border-gray-200 bg-white px-5 py-3 rounded-xl text-sm font-bold text-gray-600 hover:bg-gray-50 transition-all">
                <Download size={18} />
                تصدير
             </button>
          </div>
        </div>

        <div className="divide-y divide-gray-100">
          {mockDiagnosis.filter(d => d.patient.includes(search) || d.disease.includes(search)).map((item) => (
            <div key={item.id} className="p-8 hover:bg-gray-50/50 transition-all flex flex-col md:flex-row md:items-center justify-between gap-6 group">
               <div className="flex items-start gap-6">
                  <div className="w-14 h-14 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                     <ClipboardList size={24} />
                  </div>
                  <div className="space-y-1">
                     <div className="flex items-center gap-3">
                        <h3 className="font-bold text-gray-800 text-lg">{item.patient}</h3>
                        <span className="px-2 py-0.5 bg-gray-100 text-gray-500 rounded text-[9px] font-black uppercase tracking-widest">{item.date}</span>
                     </div>
                     <p className="text-emerald-700 font-bold text-sm">{item.disease}</p>
                     <p className="text-gray-500 text-sm mt-2 leading-relaxed max-w-2xl">{item.notes}</p>
                  </div>
               </div>
               <div className="flex items-center gap-2">
                  <button className="p-3 text-gray-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-xl transition-all" title="تعديل">
                     <FileText size={20} />
                  </button>
                  <button className="p-3 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all" title="تحميل">
                     <Download size={20} />
                  </button>
               </div>
            </div>
          ))}
        </div>

        <div className="p-4 bg-gray-50/50 border-t border-gray-100 flex items-center justify-center">
           <button className="text-xs font-black text-gray-400 uppercase tracking-[0.3em] hover:text-emerald-700 transition-all">تحميل المزيد من التشخيصات</button>
        </div>
      </div>
    </div>
  );
};

export default Diagnosis;
