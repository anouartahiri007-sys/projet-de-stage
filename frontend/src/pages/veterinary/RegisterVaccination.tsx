import { useState } from 'react';
import { Syringe, Save, X, Calendar } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const RegisterVaccination = () => {
  const navigate = useNavigate();

  return (
    <div className="space-y-6 max-w-4xl mx-auto animate-slide-up">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">تسجيل تلقيح جديد</h1>
        <p className="text-sm text-gray-500 mt-1">الرئيسية / الصحة الحيوانية / تسجيل عملية تلقيح</p>
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
              <label className="text-xs font-black text-gray-400 uppercase tracking-widest">نوع اللقاح *</label>
              <select className="form-input">
                <option>اختر نوع اللقاح</option>
                <option>لقاح الحمى القلاعية</option>
                <option>لقاح طاعون المجترات</option>
                <option>لقاح الجدري</option>
                <option>لقاح نيوكاسل</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-black text-gray-400 uppercase tracking-widest">تاريخ التلقيح *</label>
              <div className="relative">
                <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input type="date" className="form-input pr-10" />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-black text-gray-400 uppercase tracking-widest">رقم الدفعة (Batch No.)</label>
              <input type="text" className="form-input" placeholder="مثال: VAC-2024-001" />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-black text-gray-400 uppercase tracking-widest">ملاحظات / ردود فعل محتملة</label>
            <textarea className="form-input min-h-[120px]" placeholder="سجل أي ملاحظات عن عملية التلقيح أو حالة الحيوان بعدها..."></textarea>
          </div>

          <div className="flex gap-4 pt-6 border-t border-gray-100">
            <button className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 transition-all shadow-lg shadow-emerald-100 active:scale-95">
              <Save size={20} />
              حفظ عملية التلقيح
            </button>
            <button 
              onClick={() => navigate('/veterinaire/vaccinations')}
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

export default RegisterVaccination;
