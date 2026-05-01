import { useState, useEffect } from 'react';
import { ShieldAlert } from 'lucide-react';

const roles = [
  { name: 'RH (موارد بشرية)', desc: 'وصول كامل للنظام وإدارة الموظفين', perms: { view: true, create: true, edit: true, delete: true } },
  { name: 'Médecin (طبيب)', desc: 'وصول للملفات الطبية وبعض الإحصائيات', perms: { view: true, create: true, edit: false, delete: false } },
  { name: 'Infirmière (ممرضة)', desc: 'إدارة المرضى والحالات', perms: { view: true, create: false, edit: false, delete: false } },
  { name: 'Vétérinaire (بيطري)', desc: 'وصول حصري للقسم البيطري', perms: { view: true, create: true, edit: true, delete: false } },
];

const RolesPermissions = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">الأدوار والصلاحيات (RBAC)</h1>
        <p className="text-sm text-gray-500 mt-1">الرئيسية / إدارة الموظفين / الأدوار والصلاحيات</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {roles.map((role, idx) => (
          <div key={idx} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center gap-3 mb-4 border-b border-gray-100 pb-4">
              <div className="w-10 h-10 bg-emerald-50 text-emerald-600 rounded-lg flex items-center justify-center">
                <ShieldAlert size={20} />
              </div>
              <div>
                <h2 className="font-bold text-gray-800 text-lg">{role.name}</h2>
                <p className="text-xs text-gray-500">{role.desc}</p>
              </div>
            </div>

            <div className="space-y-3">
              <h3 className="font-bold text-sm text-gray-700 mb-2">الصلاحيات:</h3>
              <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
                <span className="text-sm font-medium">عرض (View)</span>
                <input type="checkbox" checked={role.perms.view} readOnly className="w-4 h-4 text-emerald-600 rounded border-gray-300" />
              </div>
              <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
                <span className="text-sm font-medium">إنشاء (Create)</span>
                <input type="checkbox" checked={role.perms.create} readOnly className="w-4 h-4 text-emerald-600 rounded border-gray-300" />
              </div>
              <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
                <span className="text-sm font-medium">تعديل (Edit)</span>
                <input type="checkbox" checked={role.perms.edit} readOnly className="w-4 h-4 text-emerald-600 rounded border-gray-300" />
              </div>
              <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
                <span className="text-sm font-medium">حذف (Delete)</span>
                <input type="checkbox" checked={role.perms.delete} readOnly className="w-4 h-4 text-emerald-600 rounded border-gray-300" />
              </div>
            </div>

            <button className="w-full mt-6 bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 py-2 rounded-lg font-bold text-sm transition-colors">
              تعديل الصلاحيات
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RolesPermissions;
