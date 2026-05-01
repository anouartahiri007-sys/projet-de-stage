import { ArrowRight, Save, X, User, Syringe, Clock, Calendar, FileText, Activity } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const AddTreatment = () => {
  const navigate = useNavigate();

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-slide-up pb-12">
      <div className="flex items-center justify-between">
        <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-gray-500 hover:text-gray-800 transition-colors font-bold text-sm">
          <ArrowRight size={20} />
          العودة للقائمة
        </button>
        <h1 className="text-2xl font-bold text-gray-800">إضافة علاج جديد للمريض</h1>
      </div>

      <div className="gov-card p-8">
        <div className="flex items-center gap-4 mb-10 pb-6 border-b border-gray-100">
           <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center shadow-inner">
              <Syringe size={32} />
           </div>
           <div>
              <h2 className="text-lg font-bold text-gray-800">تفاصيل العلاج المقدم</h2>
              <p className="text-sm text-gray-400">يرجى تسجيل بيانات الدواء أو التدخل التمريضي بدقة</p>
           </div>
        </div>

        <form className="space-y-8" onSubmit={(e) => { e.preventDefault(); navigate('/nurse/treatments'); }}>
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
                 <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest mr-1">نوع العلاج / الدواء *</label>
                 <div className="relative">
                    <Syringe className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <input type="text" required placeholder="مثلاً: أنسولين، أملوديبين..." className="w-full pr-10 pl-4 py-3 bg-gray-50 border border-gray-100 rounded-xl outline-none focus:border-emerald-500 focus:bg-white transition-all text-sm font-bold" />
                 </div>
              </div>

              <div className="space-y-2">
                 <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest mr-1">الجرعة *</label>
                 <div className="relative">
                    <Activity className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <input type="text" required placeholder="مثلاً: 10 وحدات، 5 مغ..." className="w-full pr-10 pl-4 py-3 bg-gray-50 border border-gray-100 rounded-xl outline-none focus:border-emerald-500 focus:bg-white transition-all text-sm font-bold" />
                 </div>
              </div>

              <div className="space-y-2">
                 <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest mr-1">المدة / التكرار</label>
                 <div className="relative">
                    <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <input type="text" placeholder="مثلاً: 3 مرات يومياً لمدة أسبوع" className="w-full pr-10 pl-4 py-3 bg-gray-50 border border-gray-100 rounded-xl outline-none focus:border-emerald-500 focus:bg-white transition-all text-sm font-bold" />
                 </div>
              </div>

              <div className="space-y-2 md:col-span-2">
                 <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest mr-1">ملاحظات إضافية (أعراض جانبية، رد فعل...)</label>
                 <textarea rows={4} placeholder="سجل هنا أي ملاحظات بخصوص استجابة المريض..." className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl outline-none focus:border-emerald-500 focus:bg-white transition-all text-sm font-bold"></textarea>
              </div>
           </div>

           <div className="flex justify-end gap-4 pt-6">
              <button type="button" onClick={() => navigate(-1)} className="px-6 py-3 border border-gray-200 text-gray-600 rounded-xl font-bold flex items-center gap-2 hover:bg-gray-50 transition-all text-sm">
                 <X size={18} />
                 إلغاء
              </button>
              <button type="submit" className="px-8 py-3 bg-emerald-600 text-white rounded-xl font-bold flex items-center gap-2 hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-200 text-sm font-heading">
                 <Save size={18} />
                 حفظ العلاج
              </button>
           </div>
        </form>
      </div>
    </div>
  );
};

export default AddTreatment;
