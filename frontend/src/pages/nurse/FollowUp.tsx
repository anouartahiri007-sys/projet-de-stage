import { useState } from 'react';
import { Activity, Search, Filter, ArrowUpRight, TrendingUp, User, Clock, CheckCircle, Plus, Edit } from 'lucide-react';

const NurseFollowUp = () => {
  const [search, setSearch] = useState('');

  const mockFollowUp = [
    { id: 1, name: 'فاطمة الزهراء الإدريسي', disease: 'ارتفاع ضغط الدم', progress: 65, lastCheck: '2024-05-18', severity: 'عالية', color: 'bg-rose-500' },
    { id: 2, name: 'محمد أمين الناصري', disease: 'سكري من النوع 2', progress: 40, lastCheck: '2024-05-17', severity: 'متوسطة', color: 'bg-amber-500' },
    { id: 3, name: 'سعاد الحاجي', disease: 'فقر دم', progress: 85, lastCheck: '2024-05-16', severity: 'منخفضة', color: 'bg-emerald-500' },
    { id: 4, name: 'أحمد العلوي', disease: 'حساسية صدرية', progress: 25, lastCheck: '2024-05-15', severity: 'متوسطة', color: 'bg-amber-500' },
  ];

  return (
    <div className="space-y-6 animate-slide-up pb-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">متابعة الحالات المرضية</h1>
          <p className="text-sm text-gray-500 mt-1">الرئيسية / الملف الطبي / المتابعة اليومية</p>
        </div>
      </div>

      <div className="gov-card p-0 overflow-hidden">
        <div className="p-6 border-b border-gray-100 flex flex-col md:flex-row gap-6 justify-between items-center bg-gray-50/30">
          <div className="relative w-full md:w-96">
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type="text" 
              placeholder="ابحث عن مريض للمتابعة..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-4 pr-10 py-3 border border-gray-200 rounded-xl outline-none focus:border-emerald-500 text-sm bg-white shadow-sm font-bold"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
          {mockFollowUp.filter(f => f.name.includes(search)).map((item) => (
            <div key={item.id} className="border border-gray-100 rounded-3xl p-6 hover:border-emerald-200 hover:shadow-xl hover:shadow-emerald-900/5 transition-all bg-white relative overflow-hidden group">
               <div className={`absolute top-0 left-0 w-2 h-full ${item.color.replace('bg-', 'bg-')} transition-colors`}></div>
               <div className="flex justify-between items-start mb-6">
                  <div className="flex items-center gap-4">
                     <div className="w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center text-gray-400 group-hover:bg-emerald-50 group-hover:text-emerald-600 transition-all shadow-inner">
                        <User size={24} />
                     </div>
                     <div>
                        <h3 className="font-bold text-gray-800 text-lg">{item.name}</h3>
                        <p className="text-xs text-emerald-600 font-bold">{item.disease}</p>
                     </div>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border ${
                     item.severity === 'عالية' ? 'bg-rose-50 text-rose-700 border-rose-100' : 
                     item.severity === 'متوسطة' ? 'bg-amber-50 text-amber-700 border-amber-100' :
                     'bg-emerald-50 text-emerald-700 border-emerald-100'
                  }`}>
                    {item.severity}
                  </span>
               </div>

               <div className="space-y-4">
                  <div className="flex justify-between text-[10px] font-black text-gray-400 uppercase tracking-widest">
                     <span>مستوى التحسن</span>
                     <span className="text-emerald-600 font-black">{item.progress}%</span>
                  </div>
                  <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                     <div className={`h-full ${item.color} rounded-full`} style={{ width: `${item.progress}%` }}></div>
                  </div>
                  
                  <div className="flex items-center justify-between pt-4 mt-4 border-t border-gray-50">
                     <div className="flex items-center gap-4 text-[10px] font-bold text-gray-400 uppercase">
                        <Clock size={12} className="text-emerald-500" />
                        آخر تحديث: {item.lastCheck}
                     </div>
                     <button className="text-xs font-black text-emerald-700 uppercase tracking-[0.2em] hover:underline flex items-center gap-2">
                        <Edit size={14} />
                        تحديث الحالة
                     </button>
                  </div>
               </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NurseFollowUp;
