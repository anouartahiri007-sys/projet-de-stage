import { useState } from 'react';
import { Upload, Save, X, PawPrint } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const AddAnimal = () => {
  const navigate = useNavigate();

  return (
    <div className="space-y-6 max-w-4xl mx-auto animate-slide-up">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">إضافة حيوان جديد</h1>
        <p className="text-sm text-gray-500 mt-1">الرئيسية / الصحة الحيوانية / تسجيل حيوان</p>
      </div>

      <div className="gov-card p-8">
        <form className="space-y-8" onSubmit={e => e.preventDefault()}>
          
          {/* Photo Upload */}
          <div className="flex flex-col items-center justify-center p-8 border-2 border-dashed border-emerald-100 rounded-3xl bg-emerald-50/30 hover:bg-emerald-50 transition-all cursor-pointer group">
            <div className="w-20 h-20 bg-white text-emerald-600 rounded-2xl flex items-center justify-center mb-3 shadow-sm group-hover:scale-110 transition-transform">
              <Upload size={32} />
            </div>
            <p className="font-bold text-gray-700">اضغط لرفع صورة الحيوان</p>
            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-1">JPG, PNG (Max 5MB)</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-2">
              <label className="text-xs font-black text-gray-400 uppercase tracking-widest">اسم الحيوان / المعرف *</label>
              <input type="text" className="form-input" placeholder="مثال: بقرة حلوب 01" />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-black text-gray-400 uppercase tracking-widest">النوع *</label>
              <select className="form-input">
                <option>اختر النوع</option>
                <option>بقر</option>
                <option>غنم</option>
                <option>ماعز</option>
                <option>دواجن</option>
                <option>أخرى</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-black text-gray-400 uppercase tracking-widest">السلالة</label>
              <input type="text" className="form-input" placeholder="مثال: هولشتاين" />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-black text-gray-400 uppercase tracking-widest">العمر تقريبياً</label>
              <input type="text" className="form-input" placeholder="مثال: سنتين" />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-black text-gray-400 uppercase tracking-widest">المالك (مربي) *</label>
              <select className="form-input">
                <option>اختر المالك</option>
                <option>مزرعة الخير</option>
                <option>أحمد العلمي</option>
                <option>تعاونية الأمل</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-black text-gray-400 uppercase tracking-widest">الحالة عند التسجيل</label>
              <select className="form-input">
                <option>جيدة</option>
                <option>تحت العلاج</option>
                <option>مشتبه به</option>
              </select>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-black text-gray-400 uppercase tracking-widest">ملاحظات إضافية</label>
            <textarea className="form-input min-h-[120px]" placeholder="أضف أي تفاصيل أخرى عن حالة الحيوان أو السجل الطبي السابق..."></textarea>
          </div>

          <div className="flex gap-4 pt-6 border-t border-gray-100">
            <button className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 transition-all shadow-lg shadow-emerald-100 active:scale-95">
              <Save size={20} />
              حفظ السجل
            </button>
            <button 
              onClick={() => navigate('/veterinaire/animals')}
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

export default AddAnimal;
