import { useState } from 'react';
import { ArrowRight, FilePlus, User, Calendar, Clock, FileText, Send, Check } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const IssueCertificate = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-slide-up pb-12">
      <div className="flex items-center justify-between">
        <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-gray-500 hover:text-gray-800 transition-colors font-bold text-sm">
          <ArrowRight size={20} />
          العودة للأرشيف
        </button>
        <h1 className="text-2xl font-bold text-gray-800">إنشاء شهادة طبية جديدة</h1>
      </div>

      <div className="gov-card p-8">
        {/* Steps */}
        <div className="flex items-center justify-between mb-12 relative">
           <div className="absolute top-1/2 left-0 w-full h-0.5 bg-gray-100 -translate-y-1/2 z-0"></div>
           {[1, 2, 3].map(i => (
              <div key={i} className={`relative z-10 w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all border-2 ${
                 step >= i ? 'bg-emerald-600 border-emerald-600 text-white shadow-lg shadow-emerald-200' : 'bg-white border-gray-200 text-gray-400'
              }`}>
                 {step > i ? <Check size={18} /> : i}
              </div>
           ))}
        </div>

        {step === 1 && (
           <div className="space-y-8 animate-slide-left">
              <div className="text-center space-y-2">
                 <h2 className="text-xl font-bold text-gray-800">اختيار المريض</h2>
                 <p className="text-sm text-gray-400">يرجى تحديد المريض المعني بالشهادة</p>
              </div>
              <div className="relative max-w-md mx-auto">
                 <User className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                 <select className="w-full pr-10 pl-4 py-3 bg-gray-50 border border-gray-100 rounded-xl outline-none focus:border-emerald-500 focus:bg-white transition-all text-sm font-bold appearance-none">
                    <option>سعاد الإدريسي (L123456)</option>
                    <option>محمد أمين الناصري (K987654)</option>
                    <option>أحمد العلوي (J321654)</option>
                 </select>
              </div>
              <div className="flex justify-center pt-6">
                 <button onClick={() => setStep(2)} className="px-10 py-3 bg-emerald-600 text-white rounded-xl font-bold hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-200">التالي</button>
              </div>
           </div>
        )}

        {step === 2 && (
           <div className="space-y-8 animate-slide-left">
              <div className="text-center space-y-2">
                 <h2 className="text-xl font-bold text-gray-800">تفاصيل الشهادة</h2>
                 <p className="text-sm text-gray-400">أدخل نوع الشهادة والبيانات الطبية المرتبطة بها</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                 <div className="space-y-2">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest mr-1">نوع الشهادة</label>
                    <select className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl outline-none focus:border-emerald-500 focus:bg-white transition-all text-sm font-bold">
                       <option>شهادة طبية للراحة</option>
                       <option>شهادة القدرة البدنية</option>
                       <option>شهادة طبية للخبرة</option>
                    </select>
                 </div>
                 <div className="space-y-2">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest mr-1">مدة الراحة (بالأيام)</label>
                    <input type="number" placeholder="0" className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl outline-none focus:border-emerald-500 focus:bg-white transition-all text-sm font-bold" />
                 </div>
                 <div className="space-y-2 md:col-span-2">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest mr-1">ملاحظات إضافية</label>
                    <textarea rows={4} className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl outline-none focus:border-emerald-500 focus:bg-white transition-all text-sm font-bold"></textarea>
                 </div>
              </div>
              <div className="flex justify-center gap-4 pt-6">
                 <button onClick={() => setStep(1)} className="px-8 py-3 border border-gray-200 text-gray-600 rounded-xl font-bold hover:bg-gray-50 transition-all">السابق</button>
                 <button onClick={() => setStep(3)} className="px-10 py-3 bg-emerald-600 text-white rounded-xl font-bold hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-200">التالي</button>
              </div>
           </div>
        )}

        {step === 3 && (
           <div className="space-y-8 animate-slide-left">
              <div className="text-center space-y-2">
                 <h2 className="text-xl font-bold text-gray-800">مراجعة وإصدار</h2>
                 <p className="text-sm text-gray-400">يرجى التأكد من صحة البيانات قبل الإصدار النهائي</p>
              </div>
              
              <div className="p-8 border-2 border-dashed border-gray-100 rounded-3xl bg-gray-50/30">
                 <div className="flex justify-between items-start mb-8">
                    <div className="flex items-center gap-3">
                       <div className="w-12 h-12 bg-white rounded-2xl shadow-sm flex items-center justify-center text-emerald-600 border border-gray-100">
                          <FileText size={24} />
                       </div>
                       <div>
                          <h4 className="font-bold text-gray-800">معاينة الشهادة</h4>
                          <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">شهادة طبية للراحة</p>
                       </div>
                    </div>
                    <span className="text-xs font-bold text-gray-400">2024-05-20</span>
                 </div>
                 
                 <div className="space-y-4">
                    <p className="text-sm text-gray-600 leading-relaxed italic border-r-4 border-emerald-500 pr-4">
                       "أنا الموقع أسفله الدكتور أحمد الببيطري، أشهد أن الحالة الصحية للمريض(ة) سعاد الإدريسي تستوجب راحة مدتها 5 أيام ابتداءً من تاريخ اليوم..."
                    </p>
                 </div>
              </div>

              <div className="flex justify-center gap-4 pt-6">
                 <button onClick={() => setStep(2)} className="px-8 py-3 border border-gray-200 text-gray-600 rounded-xl font-bold hover:bg-gray-50 transition-all">السابق</button>
                 <button onClick={() => navigate('/medical/certificates')} className="px-10 py-3 bg-emerald-600 text-white rounded-xl font-bold hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-200 flex items-center gap-2">
                    <Send size={18} />
                    إصدار وتحميل PDF
                 </button>
              </div>
           </div>
        )}
      </div>
    </div>
  );
};

export default IssueCertificate;
