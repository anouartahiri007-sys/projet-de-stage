import { useState, useEffect } from 'react';
import { Upload, Save, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const AddEmployee = () => {
  const navigate = useNavigate();

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">إضافة موظف جديد</h1>
        <p className="text-sm text-gray-500 mt-1">الرئيسية / إدارة الموظفين / إضافة موظف</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
        <form className="space-y-8" onSubmit={e => e.preventDefault()}>
          
          {/* Photo Upload */}
          <div className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-gray-200 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer">
            <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mb-3">
              <Upload size={32} />
            </div>
            <p className="font-bold text-gray-700">اضغط لرفع صورة الموظف</p>
            <p className="text-xs text-gray-500 mt-1">JPG, PNG (Max 2MB)</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700">الاسم الكامل *</label>
              <input type="text" className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2.5 outline-none focus:border-emerald-500" placeholder="الاسم الكامل" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700">البريد الإلكتروني *</label>
              <input type="email" className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2.5 outline-none focus:border-emerald-500" placeholder="email@example.com" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700">رقم الهاتف</label>
              <input type="tel" className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2.5 outline-none focus:border-emerald-500" placeholder="06XXXXXXXX" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700">تاريخ التوظيف *</label>
              <input type="date" className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2.5 outline-none focus:border-emerald-500" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700">المصلحة *</label>
              <select className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2.5 outline-none focus:border-emerald-500">
                <option>اختر المصلحة</option>
                <option>المصلحة الصحية</option>
                <option>المصلحة البيطرية</option>
                <option>الكتابة العامة</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700">الدور (Role) *</label>
              <select className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2.5 outline-none focus:border-emerald-500">
                <option>اختر الدور</option>
                <option>Médecin</option>
                <option>Infirmière</option>
                <option>Vétérinaire</option>
                <option>RH</option>
                <option>Fonctionnaire</option>
              </select>
            </div>
          </div>

          <div className="flex gap-4 pt-4 border-t border-gray-100">
            <button className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white py-3 rounded-lg font-bold flex items-center justify-center gap-2 transition-colors">
              <Save size={20} />
              حفظ الموظف
            </button>
            <button 
              onClick={() => navigate('/rh/employees')}
              className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 rounded-lg font-bold flex items-center justify-center gap-2 transition-colors"
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

export default AddEmployee;
