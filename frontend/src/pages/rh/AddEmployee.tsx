import React, { useState, useEffect } from 'react';
import { 
  Save, X, User, Briefcase, Phone, Mail, 
  ShieldCheck, ChevronRight, MapPin, Users, Heart
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useLang } from '../../context/LangContext';
import { api } from '../../lib/api';
import { toast } from 'react-hot-toast';

const AddEmployee = () => {
  const navigate = useNavigate();
  const { t, lang } = useLang();
  const [loading, setLoading] = useState(false);
  const [nextMatricule, setNextMatricule] = useState('1961-...');

  const [formData, setFormData] = useState({
    nom: '',
    nom_ar: '',
    prenom: '',
    prenom_ar: '',
    date_naissance: '',
    lieu_naissance: '',
    lieu_naissance_ar: '',
    situation_familiale: 'Célibataire',
    nombre_enfants: 0,
    cnie: '',
    telephone: '',
    email_perso: '',
    recruitment_date: '',
    grade: '',
    echelon: '',
    date_grade: '',
    date_echelon: '',
    direction: '',
    role: 'Employee',
    sexe: 'Masculin'
  });

  useEffect(() => {
    fetchNextMatricule();
  }, []);

  const fetchNextMatricule = async () => {
    try {
      const res = await api.get('/fonctionnaires/next-matricule');
      setNextMatricule(res.data.matricule);
    } catch (err) {
      console.error("Failed to fetch matricule");
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post('/fonctionnaires', formData);
      toast.success(lang === 'ar' ? 'تم إنشاء الموظف بنجاح (الرقم: ' + nextMatricule + ')' : 'Employé créé avec succès (ID: ' + nextMatricule + ')');
      navigate('/rh/employees');
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Erreur');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="animate-premium-in space-y-12 max-w-6xl mx-auto pb-20" dir={lang === 'ar' ? 'rtl' : 'ltr'}>
      
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
        <div>
          <h1 className="text-4xl font-black text-[#003366] tracking-tight uppercase">
            {lang === 'ar' ? 'إضافة موظف جديد' : 'Ajouter un employé'}
          </h1>
          <nav className="flex items-center gap-3 text-xs font-black text-slate-400 mt-3 uppercase tracking-widest">
            <span className="hover:text-[#006241] cursor-pointer" onClick={() => navigate('/dashboard')}>{t('dashboard')}</span>
            <ChevronRight size={14} className={lang === 'ar' ? 'rotate-180' : ''} />
            <span className="text-[#C5A059]">{nextMatricule}</span>
          </nav>
        </div>
        <button onClick={() => navigate('/rh/employees')} className="btn-secondary">
          <X size={18} /> {lang === 'ar' ? 'إلغاء' : 'Annuler'}
        </button>
      </div>

      <form id="add-employee-form" className="space-y-10" onSubmit={handleSubmit}>
        
        {/* Section 1: Identity & Bilingual Names */}
        <div className="gov-card p-12">
          <div className="flex items-center gap-4 mb-10">
             <div className="w-10 h-10 bg-[#006241]/10 text-[#006241] rounded-xl flex items-center justify-center shadow-sm"><User size={20}/></div>
             <h3 className="font-black text-[#003366] uppercase tracking-[0.2em] text-sm">{lang === 'ar' ? 'المعلومات الشخصية (ثنائية اللغة)' : 'Identité & Noms Bilingues'}</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
             {/* French Side */}
             <div className="space-y-2 p-6 bg-slate-50/50 rounded-2xl border border-slate-100">
                <p className="text-[9px] font-black text-blue-600 mb-4 tracking-widest">FRANÇAIS</p>
                <div className="space-y-4">
                  <div>
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Nom (Fr)</label>
                    <input type="text" name="nom" required className="input-gov" value={formData.nom} onChange={handleInputChange} />
                  </div>
                  <div>
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Prénom (Fr)</label>
                    <input type="text" name="prenom" required className="input-gov" value={formData.prenom} onChange={handleInputChange} />
                  </div>
                </div>
             </div>

             {/* Arabic Side */}
             <div className="space-y-2 p-6 bg-emerald-50/30 rounded-2xl border border-emerald-100">
                <p className="text-[9px] font-black text-emerald-600 mb-4 tracking-widest text-right">العربية</p>
                <div className="space-y-4">
                  <div className="text-right">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">الاسم العائلي</label>
                    <input type="text" name="nom_ar" required className="input-gov text-right" value={formData.nom_ar} onChange={handleInputChange} />
                  </div>
                  <div className="text-right">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">الاسم الشخصي</label>
                    <input type="text" name="prenom_ar" required className="input-gov text-right" value={formData.prenom_ar} onChange={handleInputChange} />
                  </div>
                </div>
             </div>

             {/* Common Identity Fields */}
             <div className="space-y-6">
                <div>
                   <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{lang === 'ar' ? 'الجنس' : 'Sexe'}</label>
                   <div className="flex gap-4 mt-2">
                      {['Masculin', 'Féminin'].map(s => (
                        <label key={s} className="flex-1 cursor-pointer">
                          <input type="radio" name="sexe" value={s} className="peer hidden" checked={formData.sexe === s} onChange={handleInputChange} />
                          <div className="py-3 bg-white border border-slate-100 rounded-xl text-center font-bold text-xs peer-checked:bg-[#003366] peer-checked:text-white transition-all">
                             {s === 'Masculin' ? (lang === 'ar' ? 'ذكر' : 'Masculin') : (lang === 'ar' ? 'أنثى' : 'Féminin')}
                          </div>
                        </label>
                      ))}
                   </div>
                </div>
                <div>
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{lang === 'ar' ? 'رقم البطاقة الوطنية' : 'CIN'}</label>
                  <input type="text" name="cnie" required className="input-gov" value={formData.cnie} onChange={handleInputChange} />
                </div>
             </div>

             {/* Birth Info */}
             <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-3 gap-8 pt-8 border-t border-slate-100">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{lang === 'ar' ? 'تاريخ الازدياد' : 'Date de Naissance'}</label>
                  <input type="date" name="date_naissance" required className="input-gov" value={formData.date_naissance} onChange={handleInputChange} />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Lieu de Naissance (Fr)</label>
                  <input type="text" name="lieu_naissance" required className="input-gov" value={formData.lieu_naissance} onChange={handleInputChange} />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">مكان الازدياد (بالعربية)</label>
                  <input type="text" name="lieu_naissance_ar" required className="input-gov text-right" value={formData.lieu_naissance_ar} onChange={handleInputChange} />
                </div>
             </div>
          </div>
        </div>

        {/* Section 2: Marital Status & Children */}
        <div className="gov-card p-12">
          <div className="flex items-center gap-4 mb-10">
             <div className="w-10 h-10 bg-rose-50 text-rose-600 rounded-xl flex items-center justify-center shadow-sm"><Heart size={20}/></div>
             <h3 className="font-black text-[#003366] uppercase tracking-[0.2em] text-sm">{lang === 'ar' ? 'الحالة العائلية' : 'Situation Familiale'}</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
             <div className="space-y-4">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{lang === 'ar' ? 'الحالة الاجتماعية' : 'État Civil'}</label>
                <div className="grid grid-cols-2 gap-4">
                   {['Célibataire', 'Marié', 'Divorcé', 'Veuf'].map(status => {
                     // Condition: Hide Veuf (أرمل) if Male (ذكر) as requested
                     if (formData.sexe === 'Masculin' && status === 'Veuf') return null;
                     return (
                       <label key={status} className="cursor-pointer">
                          <input type="radio" name="situation_familiale" value={status} className="peer hidden" checked={formData.situation_familiale === status} onChange={handleInputChange} />
                          <div className="py-4 bg-slate-50 border border-slate-100 rounded-2xl text-center font-black text-[10px] uppercase tracking-widest text-slate-400 peer-checked:bg-[#003366] peer-checked:text-white transition-all">
                             {status === 'Célibataire' ? (lang === 'ar' ? 'أعزب' : 'Célibataire') :
                              status === 'Marié' ? (lang === 'ar' ? 'متزوج' : 'Marié') :
                              status === 'Divorcé' ? (lang === 'ar' ? 'مطلق' : 'Divorcé') :
                              (lang === 'ar' ? 'أرمل' : 'Veuf')}
                          </div>
                       </label>
                     );
                   })}
                </div>
             </div>

             {(formData.situation_familiale === 'Marié' || formData.situation_familiale === 'Divorcé') && (
                <div className="space-y-4 animate-in fade-in slide-in-from-top-4 duration-500">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{lang === 'ar' ? 'عدد الأطفال' : 'Nombre d\'enfants'}</label>
                  <div className="flex items-center gap-6">
                     <input 
                       type="range" min="0" max="10" name="nombre_enfants" 
                       className="flex-1 accent-[#C5A059]" 
                       value={formData.nombre_enfants} 
                       onChange={handleInputChange} 
                     />
                     <span className="w-16 h-16 bg-[#003366] text-white rounded-2xl flex items-center justify-center font-black text-2xl shadow-xl shadow-blue-900/20">
                        {formData.nombre_enfants}
                     </span>
                  </div>
                </div>
             )}
          </div>
        </div>

        {/* Section 3: Administrative & Access */}
        <div className="gov-card p-12">
          <div className="flex items-center gap-4 mb-10">
             <div className="w-10 h-10 bg-[#C5A059]/10 text-[#C5A059] rounded-xl flex items-center justify-center shadow-sm"><Briefcase size={20}/></div>
             <h3 className="font-black text-[#003366] uppercase tracking-[0.2em] text-sm">{lang === 'ar' ? 'المعطيات الإدارية والوصول' : 'Données Admin & Accès'}</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
             <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{lang === 'ar' ? 'رقم التأجير (تلقائي)' : 'Matricule (Auto)'}</label>
                <div className="input-gov bg-slate-50 font-black text-[#003366] flex items-center">{nextMatricule}</div>
             </div>
             <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{lang === 'ar' ? 'تاريخ التوظيف' : 'Date de Recrutement'}</label>
                <input type="date" name="recruitment_date" required className="input-gov" value={formData.recruitment_date} onChange={handleInputChange} />
             </div>
             <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{lang === 'ar' ? 'الدرجة' : 'Grade'}</label>
                <input type="text" name="grade" required className="input-gov" value={formData.grade} onChange={handleInputChange} />
             </div>
             <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{lang === 'ar' ? 'الرتبة' : 'Échelon'}</label>
                <input type="text" name="echelon" required className="input-gov" value={formData.echelon} onChange={handleInputChange} />
             </div>
             <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{lang === 'ar' ? 'تاريخ مفعول الدرجة' : 'Date d\'effet Grade'}</label>
                <input type="date" name="date_grade" required className="input-gov" value={formData.date_grade} onChange={handleInputChange} />
             </div>
             <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{lang === 'ar' ? 'تاريخ مفعول الرتبة' : 'Date d\'effet Échelon'}</label>
                <input type="date" name="date_echelon" required className="input-gov" value={formData.date_echelon} onChange={handleInputChange} />
             </div>
             <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{lang === 'ar' ? 'مقر التعيين' : 'Affectation'}</label>
                <input type="text" name="direction" required className="input-gov" value={formData.direction} onChange={handleInputChange} />
             </div>
             <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{lang === 'ar' ? 'الهاتف' : 'Téléphone'}</label>
                <input type="tel" name="telephone" required className="input-gov" value={formData.telephone} onChange={handleInputChange} />
             </div>
             <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{lang === 'ar' ? 'البريد الشخصي' : 'Email Perso'}</label>
                <input type="email" name="email_perso" required className="input-gov" value={formData.email_perso} onChange={handleInputChange} />
             </div>
          </div>

          <div className="mt-10 p-8 bg-slate-50/50 rounded-3xl border border-dashed border-slate-200">
             <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-6">{lang === 'ar' ? 'الدور في النظام (Poste)' : 'Rôle Système (Poste)'}</label>
             <div className="flex flex-wrap gap-4">
                {['Admin', 'RH', 'Doctor', 'Nurse', 'Employee'].map((r) => (
                   <label key={r} className="cursor-pointer flex-1">
                      <input type="radio" name="role" value={r} className="peer hidden" checked={formData.role === r} onChange={handleInputChange} />
                      <div className="px-6 py-4 bg-white border border-slate-200 rounded-2xl peer-checked:bg-[#003366] peer-checked:text-white peer-checked:border-[#003366] font-black text-xs text-center transition-all shadow-sm">
                         {r}
                      </div>
                   </label>
                ))}
             </div>
          </div>
        </div>

        {/* Final Submission Button */}
        <button 
           type="submit"
           disabled={loading}
           className="w-full bg-gradient-to-r from-[#003366] via-[#004d33] to-[#006241] text-white py-10 rounded-[3.5rem] font-black text-2xl flex items-center justify-center gap-8 shadow-2xl shadow-emerald-900/20 transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50"
        >
           <Save size={32} />
           <span>{loading ? (lang === 'ar' ? 'جاري المعالجة...' : 'Traitement...') : (lang === 'ar' ? 'تأكيد البيانات وتثبيت الموظف' : 'Valider & Créer l\'employé')}</span>
        </button>

      </form>
    </div>
  );
};

export default AddEmployee;
