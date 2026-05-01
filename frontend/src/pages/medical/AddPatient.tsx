import { ArrowRight, Save, X, User, Phone, MapPin, Calendar, ClipboardList } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const AddPatient = () => {
  const navigate = useNavigate();

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-slide-up pb-12">
      <div className="flex items-center justify-between">
        <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-gray-500 hover:text-gray-800 transition-colors font-bold text-sm">
          <ArrowRight size={20} />
          العودة للقائمة
        </button>
        <h1 className="text-2xl font-bold text-gray-800">إنشاء ملف طبي جديد</h1>
      </div>

      <div className="gov-card p-8">
        <div className="flex items-center gap-4 mb-10 pb-6 border-b border-gray-100">
           <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center">
              <User size={32} />
           </div>
           <div>
              <h2 className="text-lg font-bold text-gray-800">المعلومات الشخصية للمريض</h2>
              <p className="text-sm text-gray-400">يرجى إدخال جميع البيانات المطلوبة بدقة</p>
           </div>
        </div>

        <form className="space-y-8" onSubmit={(e) => { e.preventDefault(); navigate('/medical/patients'); }}>
           <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2">
                 <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest mr-1">الاسم الكامل</label>
                 <div className="relative">
                    <User className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <input type="text" required placeholder="مثلاً: محمد أمين" className="w-full pr-10 pl-4 py-3 bg-gray-50 border border-gray-100 rounded-xl outline-none focus:border-emerald-500 focus:bg-white transition-all text-sm font-bold" />
                 </div>
              </div>

              <div className="space-y-2">
                 <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest mr-1">رقم البطاقة الوطنية (CIN)</label>
                 <div className="relative">
                    <ClipboardList className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <input type="text" required placeholder="مثلاً: L123456" className="w-full pr-10 pl-4 py-3 bg-gray-50 border border-gray-100 rounded-xl outline-none focus:border-emerald-500 focus:bg-white transition-all text-sm font-bold" />
                 </div>
              </div>

              <div className="space-y-2">
                 <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest mr-1">العمر</label>
                 <div className="relative">
                    <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <input type="number" required placeholder="مثلاً: 35" className="w-full pr-10 pl-4 py-3 bg-gray-50 border border-gray-100 rounded-xl outline-none focus:border-emerald-500 focus:bg-white transition-all text-sm font-bold" />
                 </div>
              </div>

              <div className="space-y-2">
                 <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest mr-1">الجنس</label>
                 <select className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl outline-none focus:border-emerald-500 focus:bg-white transition-all text-sm font-bold appearance-none">
                    <option>ذكر</option>
                    <option>أنثى</option>
                 </select>
              </div>

              <div className="space-y-2">
                 <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest mr-1">رقم الهاتف</label>
                 <div className="relative">
                    <Phone className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <input type="tel" placeholder="+212 600-000000" className="w-full pr-10 pl-4 py-3 bg-gray-50 border border-gray-100 rounded-xl outline-none focus:border-emerald-500 focus:bg-white transition-all text-sm font-bold" />
                 </div>
              </div>

              <div className="space-y-2 md:col-span-2">
                 <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest mr-1">العنوان</label>
                 <div className="relative">
                    <MapPin className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <input type="text" placeholder="العنوان الكامل للمريض" className="w-full pr-10 pl-4 py-3 bg-gray-50 border border-gray-100 rounded-xl outline-none focus:border-emerald-500 focus:bg-white transition-all text-sm font-bold" />
                 </div>
              </div>

              <div className="space-y-2 md:col-span-2">
                 <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest mr-1">التاريخ المرضي المسبق</label>
                 <textarea rows={4} placeholder="ذكر الأمراض المزمنة، العمليات السابقة، الحساسية..." className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl outline-none focus:border-emerald-500 focus:bg-white transition-all text-sm font-bold"></textarea>
              </div>
           </div>

           <div className="flex justify-end gap-4 pt-6">
              <button type="button" onClick={() => navigate(-1)} className="px-6 py-3 border border-gray-200 text-gray-600 rounded-xl font-bold flex items-center gap-2 hover:bg-gray-50 transition-all text-sm">
                 <X size={18} />
                 إلغاء
              </button>
              <button type="submit" className="px-8 py-3 bg-emerald-600 text-white rounded-xl font-bold flex items-center gap-2 hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-200 text-sm">
                 <Save size={18} />
                 حفظ الملف الطبي
              </button>
           </div>
        </form>
      </div>
    </div>
  );
};

export default AddPatient;
