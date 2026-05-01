import { useState } from 'react';
import { Activity, Save, X, AlertTriangle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const RegisterHealthCase = () => {
  const navigate = useNavigate();

  return (
    <div className="space-y-6 max-w-4xl mx-auto animate-slide-up">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">تسجيل حالة صحية</h1>
        <p className="text-sm text-gray-500 mt-1">الرئيسية / الصحة الحيوانية / تسجيل تشخيص</p>
      </div>

      <div className="gov-card p-8">
        <form className="space-y-8" onSubmit={e => e.preventDefault()}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-2">
              <label className="text-xs font-black text-gray-400 uppercase tracking-widest">اختيار الحيوان *</label>
              <select className="form-input">
                <option>اختر من القائمة</option>
                <option>بقرة حلوب 01</option>
                <option>خروف ساردي</option>
                <option>ماعز ألبين</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-black text-gray-400 uppercase tracking-widest">المرض / التشخيص *</label>
              <input type="text" className="form-input" placeholder="مثال: حمى قلاعية، التهاب رئوي..." />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-black text-gray-400 uppercase tracking-widest">درجة الخطورة *</label>
              <select className="form-input">
                <option>منخفضة</option>
                <option>متوسطة</option>
                <option>خطيرة</option>
                <option>حرجة</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-black text-gray-400 uppercase tracking-widest">تاريخ الاكتشاف *</label>
              <input type="date" className="form-input" />
            </div>
          </div>

          <div className="space-y-4">
            <label className="text-xs font-black text-gray-400 uppercase tracking-widest">الأعراض الملاحظة</label>
            <textarea className="form-input min-h-[100px]" placeholder="صف الأعراض التي يظهرها الحيوان..."></textarea>
          </div>

          <div className="space-y-4">
            <label className="text-xs font-black text-gray-400 uppercase tracking-widest">العلاج المقرر</label>
            <textarea className="form-input min-h-[100px]" placeholder="الأدوية، اللقاحات، أو التدابير الوقائية المتخذة..."></textarea>
          </div>

          <div className="p-5 bg-rose-50 border border-rose-100 rounded-2xl flex gap-4">
            <AlertTriangle className="text-rose-600 shrink-0" size={24} />
            <div>
              <p className="text-sm font-bold text-rose-800">تنبيه بخصوص الأوبئة</p>
              <p className="text-xs text-rose-600 leading-relaxed mt-1">
                إذا كانت الحالة تشير إلى مرض معدٍ أو وبائي، سيتم تلقائياً إخطار المصالح المركزية وتفعيل بروتوكول العزل في المنطقة المعنية.
              </p>
            </div>
          </div>

          <div className="flex gap-4 pt-6 border-t border-gray-100">
            <button className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 transition-all shadow-lg shadow-emerald-100 active:scale-95">
              <Save size={20} />
              حفظ التشخيص
            </button>
            <button 
              onClick={() => navigate('/veterinaire/health')}
              className="px-10 bg-gray-100 hover:bg-gray-200 text-gray-600 py-4 rounded-2xl font-bold flex items-center justify-center gap-2 transition-all active:scale-95"
            >
              <X size={20} />
              إلغاء
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterHealthCase;
