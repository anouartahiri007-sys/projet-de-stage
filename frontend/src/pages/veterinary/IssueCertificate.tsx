import { useState } from 'react';
import { FilePlus, Save, X, AlertCircle, FileText } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const IssueCertificate = () => {
  const navigate = useNavigate();

  return (
    <div className="space-y-6 max-w-5xl mx-auto animate-slide-up">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">إصدار شهادة بيطرية</h1>
        <p className="text-sm text-gray-500 mt-1">الرئيسية / الصحة الحيوانية / مولد الشهادات</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="gov-card p-8">
            <form className="space-y-8" onSubmit={e => e.preventDefault()}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-black text-gray-400 uppercase tracking-widest">الحيوان المعني *</label>
                  <select className="form-input">
                    <option>اختر من القائمة</option>
                    <option>بقرة حلوب 01</option>
                    <option>خروف ساردي</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-black text-gray-400 uppercase tracking-widest">نوع الشهادة *</label>
                  <select className="form-input">
                    <option>شهادة صحية عامة</option>
                    <option>شهادة تلقيح</option>
                    <option>شهادة نقل حيوانات</option>
                    <option>شهادة ذبح</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-black text-gray-400 uppercase tracking-widest">الخلاصة الصحية *</label>
                <textarea className="form-input min-h-[120px]" placeholder="اكتب التقرير الصحي المختصر للحيوان..."></textarea>
              </div>

              <div className="p-5 bg-emerald-50 border border-emerald-100 rounded-2xl flex gap-4">
                <AlertCircle className="text-emerald-600 shrink-0" size={24} />
                <p className="text-xs text-emerald-800 leading-relaxed font-medium">
                  سيتم إنشاء شهادة رسمية تحمل التوقيع الرقمي للطبيب البيطري المعتمد. يمكنك تحميلها بصيغة PDF أو طباعتها مباشرة.
                </p>
              </div>

              <div className="flex gap-4 pt-6 border-t border-gray-100">
                <button className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 transition-all shadow-lg shadow-emerald-100 active:scale-95">
                  <FilePlus size={20} />
                  توليد الشهادة (PDF)
                </button>
                <button 
                  onClick={() => navigate('/veterinaire/certificates')}
                  className="px-10 bg-gray-100 hover:bg-gray-200 text-gray-600 py-4 rounded-2xl font-bold flex items-center justify-center gap-2 transition-all active:scale-95"
                >
                  <X size={20} />
                  إلغاء
                </button>
              </div>
            </form>
          </div>
        </div>

        <div className="lg:col-span-1">
           <div className="gov-card p-6 bg-slate-50 border-2 border-dashed border-slate-200 min-h-[400px] flex flex-col items-center justify-center text-center opacity-40">
              <FileText size={48} className="text-slate-300 mb-4" />
              <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">معاينة الشهادة</p>
              <p className="text-[10px] text-slate-400 mt-2">ستظهر هنا نسخة طبق الأصل للشهادة قبل إصدارها النهائي.</p>
           </div>
        </div>
      </div>
    </div>
  );
};

export default IssueCertificate;
