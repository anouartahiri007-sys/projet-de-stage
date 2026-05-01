import { ArrowRight, Save, X, User, Activity, Clock, Calendar, Droplets, Thermometer, Heart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const RegisterVitalSign = () => {
  const navigate = useNavigate();

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-slide-up pb-12">
      <div className="flex items-center justify-between">
        <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-gray-500 hover:text-gray-800 transition-colors font-bold text-sm">
          <ArrowRight size={20} />
          العودة للقائمة
        </button>
        <h1 className="text-2xl font-bold text-gray-800">تسجيل مؤشر صحي جديد</h1>
      </div>

      <div className="gov-card p-8">
        <div className="flex items-center gap-4 mb-10 pb-6 border-b border-gray-100">
           <div className="w-16 h-16 bg-rose-50 text-rose-600 rounded-2xl flex items-center justify-center shadow-inner">
              <Activity size={32} />
           </div>
           <div>
              <h2 className="text-lg font-bold text-gray-800">بيانات القياس الحالي</h2>
              <p className="text-sm text-gray-400">أدخل نتائج القياسات الحيوية للمريض بدقة</p>
           </div>
        </div>

        <form className="space-y-8" onSubmit={(e) => { e.preventDefault(); navigate('/nurse/vitals'); }}>
           <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2">
                 <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest mr-1">اختيار المريض *</label>
                 <div className="relative">
                    <User className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <select className="w-full pr-10 pl-4 py-3 bg-gray-50 border border-gray-100 rounded-xl outline-none focus:border-emerald-500 focus:bg-white transition-all text-sm font-bold appearance-none">
                       <option>فاطمة الزهراء الإدريسي (L123456)</option>
                       <option>محمد أمين الناصري (K987654)</option>
                       <option>سعاد الحاجي (J321654)</option>
                    </select>
                 </div>
              </div>

              <div className="space-y-2">
                 <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest mr-1">نوع المؤشر *</label>
                 <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {[
                       { id: 'bp', label: 'ضغط الدم', icon: <Activity size={16} /> },
                       { id: 'temp', label: 'الحرارة', icon: <Thermometer size={16} /> },
                       { id: 'sugar', label: 'السكر', icon: <Droplets size={16} /> },
                       { id: 'pulse', label: 'النبض', icon: <Heart size={16} /> },
                    ].map(item => (
                       <label key={item.id} className="relative cursor-pointer group">
                          <input type="radio" name="indicator_type" className="peer hidden" defaultChecked={item.id === 'bp'} />
                          <div className="flex flex-col items-center justify-center p-3 border border-gray-100 rounded-xl bg-gray-50 peer-checked:bg-emerald-600 peer-checked:text-white transition-all hover:bg-gray-100">
                             {item.icon}
                             <span className="text-[10px] font-bold mt-1">{item.label}</span>
                          </div>
                       </label>
                    ))}
                 </div>
              </div>

              <div className="space-y-2">
                 <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest mr-1">قيمة القياس *</label>
                 <div className="relative">
                    <input type="text" required placeholder="مثلاً: 120/80، 37.5..." className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl outline-none focus:border-emerald-500 focus:bg-white transition-all text-sm font-bold" />
                 </div>
              </div>

              <div className="space-y-2">
                 <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest mr-1">تاريخ ووقت القياس *</label>
                 <div className="relative flex gap-3">
                    <input type="date" className="w-1/2 px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl outline-none focus:border-emerald-500 focus:bg-white transition-all text-sm font-bold" defaultValue={new Date().toISOString().split('T')[0]} />
                    <input type="time" className="w-1/2 px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl outline-none focus:border-emerald-500 focus:bg-white transition-all text-sm font-bold" defaultValue="09:30" />
                 </div>
              </div>

              <div className="space-y-2 md:col-span-2">
                 <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest mr-1">ملاحظات سريعة</label>
                 <textarea rows={3} placeholder="أي ملاحظات حول المريض وقت القياس..." className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl outline-none focus:border-emerald-500 focus:bg-white transition-all text-sm font-bold"></textarea>
              </div>
           </div>

           <div className="flex justify-end gap-4 pt-6">
              <button type="button" onClick={() => navigate(-1)} className="px-6 py-3 border border-gray-200 text-gray-600 rounded-xl font-bold flex items-center gap-2 hover:bg-gray-50 transition-all text-sm font-heading">
                 <X size={18} />
                 إلغاء
              </button>
              <button type="submit" className="px-8 py-3 bg-emerald-600 text-white rounded-xl font-bold flex items-center gap-2 hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-200 text-sm font-heading">
                 <Save size={18} />
                 حفظ القياس
              </button>
           </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterVitalSign;
