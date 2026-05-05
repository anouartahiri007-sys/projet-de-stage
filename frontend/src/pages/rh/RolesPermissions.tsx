import { ShieldAlert, ShieldCheck } from 'lucide-react';
import { useLang } from '../../context/LangContext';

const roles = (t: any, lang: string) => [
  { name: 'RH', desc: lang === 'ar' ? 'وصول كامل للنظام وإدارة الموظفين' : 'Accès complet au système et gestion des employés', perms: { view: true, create: true, edit: true, delete: true } },
  { name: 'Médecin', desc: lang === 'ar' ? 'وصول للملفات الطبية وبعض الإحصائيات' : 'Accès aux dossiers médicaux et statistiques', perms: { view: true, create: true, edit: false, delete: false } },
  { name: 'Infirmière', desc: lang === 'ar' ? 'إدارة المرضى والحالات' : 'Gestion des patients et des cas', perms: { view: true, create: false, edit: false, delete: false } },
  { name: 'Vétérinaire', desc: lang === 'ar' ? 'وصول حصري للقسم البيطري' : 'Accès exclusif à la section vétérinaire', perms: { view: true, create: true, edit: true, delete: false } },
];

const RolesPermissions = () => {
  const { t, lang } = useLang();

  return (
    <div className="animate-slide-up space-y-6" dir={lang === 'ar' ? 'rtl' : 'ltr'}>
      <div className={lang === 'ar' ? 'text-right' : 'text-left'}>
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">{t('rolesPermissions')}</h1>
        <p className="text-sm text-gray-500 mt-1">{t('home')} / {t('employeeManagement')} / {t('rolesPermissions')}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {roles(t, lang).map((role, idx) => (
          <div key={idx} className={`gov-card p-6 border-b-4 border-b-[#0d5e3f] ${lang === 'ar' ? 'text-right' : 'text-left'}`}>
            <div className={`flex items-center gap-4 mb-6 border-b border-gray-100 dark:border-slate-700 pb-4 ${lang === 'ar' ? 'flex-row' : 'flex-row-reverse'}`}>
              <div className={`w-12 h-12 bg-emerald-50 text-[#0d5e3f] rounded-2xl flex items-center justify-center shrink-0`}>
                <ShieldAlert size={24} />
              </div>
              <div className="flex-1">
                <h2 className="font-extrabold text-gray-800 dark:text-white text-lg uppercase tracking-tight">{role.name}</h2>
                <p className="text-xs text-gray-400 font-bold">{role.desc}</p>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="font-black text-[10px] text-slate-400 uppercase tracking-[0.2em] mb-4">{lang === 'ar' ? 'الصلاحيات الممنوحة' : 'Permissions Accordées'}</h3>
              
              {[
                { key: 'view', label: lang === 'ar' ? 'عرض (View)' : 'Lecture' },
                { key: 'create', label: lang === 'ar' ? 'إنشاء (Create)' : 'Création' },
                { key: 'edit', label: lang === 'ar' ? 'تعديل (Edit)' : 'Modification' },
                { key: 'delete', label: lang === 'ar' ? 'حذف (Delete)' : 'Suppression' },
              ].map((perm) => (
                <div key={perm.key} className={`flex items-center justify-between p-3 rounded-xl border border-transparent transition-all ${role.perms[perm.key as keyof typeof role.perms] ? 'bg-emerald-50/50 border-emerald-100' : 'bg-gray-50 dark:bg-slate-900 border-gray-100 dark:border-slate-800 opacity-60'}`}>
                  <span className="text-xs font-bold text-slate-600 dark:text-slate-300 uppercase tracking-widest">{perm.label}</span>
                  {role.perms[perm.key as keyof typeof role.perms] ? (
                    <ShieldCheck size={18} className="text-emerald-600" />
                  ) : (
                    <div className="w-4.5 h-4.5 rounded-full border-2 border-slate-200"></div>
                  )}
                </div>
              ))}
            </div>

            <button className="w-full mt-8 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 text-slate-600 dark:text-slate-200 hover:bg-emerald-50 hover:text-[#0d5e3f] hover:border-emerald-200 py-3 rounded-xl font-black text-[10px] uppercase tracking-[0.2em] transition-all active:scale-[0.98]">
               {lang === 'ar' ? 'تعديل الصلاحيات' : 'Modifier les permissions'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RolesPermissions;
