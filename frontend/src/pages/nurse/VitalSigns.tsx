import { useState } from 'react';
import { Activity, Search, Filter, Plus, Download, User, Clock, Thermometer, Droplets, Heart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const NurseVitalSigns = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');

  const mockIndicators = [
    { id: 1, patient: 'فاطمة الزهراء الإدريسي', type: 'ضغط الدم', value: '130/85', status: 'warning', date: '2024-05-20 09:30' },
    { id: 2, patient: 'أحمد العلوي', type: 'الحرارة', value: '38.2 °C', status: 'danger', date: '2024-05-20 09:15' },
    { id: 3, patient: 'سمية أيت الطالب', type: 'السكر', value: '1.10 g/L', status: 'normal', date: '2024-05-20 08:45' },
    { id: 4, patient: 'الحسين مرابط', type: 'نبض القلب', value: '72 bpm', status: 'normal', date: '2024-05-20 08:00' },
  ];

  return (
    <div className="space-y-6 animate-slide-up pb-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">المؤشرات الصحية</h1>
          <p className="text-sm text-gray-500 mt-1">الرئيسية / الملف الطبي / قياس المؤشرات الحيوية</p>
        </div>
        <button 
          onClick={() => navigate('/nurse/vitals/register')}
          className="bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2.5 rounded-xl font-bold flex items-center gap-2 transition-all shadow-md text-sm"
        >
          <Plus size={18} />
          تسجيل مؤشر جديد
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: 'ضغط الدم', icon: <Activity className="text-rose-600" />, count: 12 },
          { label: 'الحرارة', icon: <Thermometer className="text-orange-600" />, count: 8 },
          { label: 'السكر', icon: <Droplets className="text-blue-600" />, count: 15 },
          { label: 'النبض', icon: <Heart className="text-rose-600" />, count: 10 },
        ].map((kpi, i) => (
          <div key={i} className="gov-card p-4 flex items-center gap-4 hover:shadow-lg transition-all group">
            <div className="p-3 bg-gray-50 rounded-2xl group-hover:bg-white group-hover:scale-110 transition-all shadow-inner">
               {kpi.icon}
            </div>
            <div>
               <p className="text-xs font-bold text-gray-800">{kpi.label}</p>
               <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest">{kpi.count} قياسات اليوم</p>
            </div>
          </div>
        ))}
      </div>

      <div className="gov-card p-0 overflow-hidden">
        <div className="p-6 border-b border-gray-100 flex flex-col md:flex-row gap-6 justify-between items-center bg-gray-50/30">
          <div className="relative w-full md:w-96">
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type="text" 
              placeholder="ابحث عن مريض أو نوع مؤشر..." 
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
                <th className="p-4 border-b border-gray-100">المؤشر</th>
                <th className="p-4 border-b border-gray-100 text-center">القيمة</th>
                <th className="p-4 border-b border-gray-100">التاريخ والوقت</th>
                <th className="p-4 border-b border-gray-100 text-center">الحالة</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {mockIndicators.filter(i => i.patient.includes(search) || i.type.includes(search)).map((item) => (
                <tr key={item.id} className="hover:bg-emerald-50/20 transition-colors group">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                       <div className="w-9 h-9 bg-gray-50 rounded-xl flex items-center justify-center text-gray-400 group-hover:bg-emerald-50 group-hover:text-emerald-600 transition-all">
                          <User size={18} />
                       </div>
                       <span className="font-bold text-gray-800 text-sm">{item.patient}</span>
                    </div>
                  </td>
                  <td className="p-4 text-sm font-bold text-gray-700">{item.type}</td>
                  <td className="p-4 text-center">
                    <span className="px-3 py-1 bg-white border border-gray-100 rounded-lg text-xs font-black text-gray-700 shadow-sm">
                      {item.value}
                    </span>
                  </td>
                  <td className="p-4 text-sm text-gray-400 font-bold">
                    <div className="flex items-center gap-2">
                       <Clock size={12} className="text-emerald-500" />
                       {item.date}
                    </div>
                  </td>
                  <td className="p-4 text-center">
                    <span className={`px-2 py-0.5 rounded text-[8px] font-black uppercase tracking-widest ${
                      item.status === 'normal' ? 'bg-emerald-50 text-emerald-600' :
                      item.status === 'warning' ? 'bg-amber-50 text-amber-600' :
                      'bg-rose-50 text-rose-600'
                    }`}>
                      {item.status === 'normal' ? 'طبيعي' : item.status === 'warning' ? 'تنبيه' : 'خطر'}
                    </span>
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

export default NurseVitalSigns;
