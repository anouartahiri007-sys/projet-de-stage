import React, { useState, useEffect } from 'react';
import { 
  Save, X, User, Briefcase, Phone, Mail, 
  ShieldCheck, ChevronRight, MapPin, Users, Heart
} from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { useLang } from '../../context/LangContext';
import { api } from '../../lib/api';
import { toast } from 'react-hot-toast';

const EditEmployee = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t, lang } = useLang();
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

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
    sexe: 'Masculin',
    matricule: ''
  });

  useEffect(() => {
    fetchEmployeeData();
  }, [id]);

  const fetchEmployeeData = async () => {
    try {
      const res = await api.get(`/fonctionnaires/${id}`);
      const data = res.data;
      // Convert dates to YYYY-MM-DD for input fields
      const formatDate = (d: string) => d ? d.split('T')[0] : '';
      
      setFormData({
        ...data,
        date_naissance: formatDate(data.date_naissance),
        recruitment_date: formatDate(data.recruitment_date),
        date_grade: formatDate(data.date_grade),
        date_echelon: formatDate(data.date_echelon),
      });
    } catch (err) {
      toast.error("Erreur lors du chargement des données");
      navigate('/rh/employees');
    } finally {
      setFetching(false);
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
      await api.put(`/fonctionnaires/${id}`, formData);
      toast.success(lang === 'ar' ? 'تم تحديث بيانات الموظف بنجاح' : 'Données mises à jour avec succès');
      navigate('/rh/employees');
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Erreur');
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return (
      <div className="min-h-[400px] flex flex-col items-center justify-center gap-4">
        <div className="w-12 h-12 border-4 border-[#003366] border-t-transparent rounded-full animate-spin"></div>
        <p className="text-slate-400 font-black text-xs uppercase tracking-widest">{lang === 'ar' ? 'جاري تحميل البيانات...' : 'Chargement des données...'}</p>
      </div>
    );
  }

  return (
    <div className="animate-premium-in space-y-12 max-w-6xl mx-auto pb-20" dir={lang === 'ar' ? 'rtl' : 'ltr'}>
      
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
        <div>
          <h1 className="text-4xl font-black text-[#003366] tracking-tight uppercase">
            {lang === 'ar' ? 'تعديل بيانات موظف' : 'Modifier l\'employé'}
          </h1>
          <nav className="flex items-center gap-3 text-xs font-black text-slate-400 mt-3 uppercase tracking-widest">
            <span className="hover:text-[#006241] cursor-pointer" onClick={() => navigate('/dashboard')}>{t('dashboard')}</span>
            <ChevronRight size={14} className={lang === 'ar' ? 'rotate-180' : ''} />
            <span className="hover:text-[#006241] cursor-pointer" onClick={() => navigate('/rh/employees')}>{t('employees')}</span>
            <ChevronRight size={14} className={lang === 'ar' ? 'rotate-180' : ''} />
            <span className="text-[#C5A059]">{formData.matricule}</span>
          </nav>
        </div>
        <button onClick={() => navigate('/rh/employees')} className="btn-secondary">
          <X size={18} /> {lang === 'ar' ? 'إلغاء' : 'Annuler'}
        </button>
      </div>

      <form className="space-y-10" onSubmit={handleSubmit}>
        
        {/* Section 1: Identity */}
        <div className="gov-card p-12">
          <div className="flex items-center gap-4 mb-10">
             <div className="w-10 h-10 bg-[#006241]/10 text-[#006241] rounded-xl flex items-center justify-center shadow-sm"><User size={20}/></div>
             <h3 className="font-black text-[#003366] uppercase tracking-[0.2em] text-sm">{lang === 'ar' ? 'المعلومات الشخصية' : 'Identité'}</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
             <div className="space-y-4 p-6 bg-slate-50/50 rounded-2xl border border-slate-100">
                <p className="text-[9px] font-black text-blue-600 mb-2 tracking-widest uppercase">Français</p>
                <div>
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Nom</label>
                  <input type="text" name="nom" required className="input-gov" value={formData.nom} onChange={handleInputChange} />
                </div>
                <div>
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Prénom</label>
                  <input type="text" name="prenom" required className="input-gov" value={formData.prenom} onChange={handleInputChange} />
                </div>
             </div>

             <div className="space-y-4 p-6 bg-emerald-50/30 rounded-2xl border border-emerald-100 text-right">
                <p className="text-[9px] font-black text-emerald-600 mb-2 tracking-widest uppercase">العربية</p>
                <div>
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">الاسم العائلي</label>
                  <input type="text" name="nom_ar" required className="input-gov text-right" value={formData.nom_ar} onChange={handleInputChange} />
                </div>
                <div>
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">الاسم الشخصي</label>
                  <input type="text" name="prenom_ar" required className="input-gov text-right" value={formData.prenom_ar} onChange={handleInputChange} />
                </div>
             </div>

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
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">CIN</label>
                  <input type="text" name="cnie" required className="input-gov" value={formData.cnie} onChange={handleInputChange} />
                </div>
             </div>

             <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-3 gap-8 pt-8 border-t border-slate-100">
                <div>
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{lang === 'ar' ? 'تاريخ الازدياد' : 'Date de Naissance'}</label>
                  <input type="date" name="date_naissance" required className="input-gov" value={formData.date_naissance} onChange={handleInputChange} />
                </div>
                <div>
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Lieu (Fr)</label>
                  <input type="text" name="lieu_naissance" required className="input-gov" value={formData.lieu_naissance} onChange={handleInputChange} />
                </div>
                <div className="text-right">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">مكان الازدياد</label>
                  <input type="text" name="lieu_naissance_ar" required className="input-gov text-right" value={formData.lieu_naissance_ar} onChange={handleInputChange} />
                </div>
             </div>
          </div>
        </div>

        {/* Section 2: Administrative */}
        <div className="gov-card p-12">
          <div className="flex items-center gap-4 mb-10">
             <div className="w-10 h-10 bg-[#C5A059]/10 text-[#C5A059] rounded-xl flex items-center justify-center shadow-sm"><Briefcase size={20}/></div>
             <h3 className="font-black text-[#003366] uppercase tracking-[0.2em] text-sm">{lang === 'ar' ? 'المعطيات الإدارية' : 'Données Administratives'}</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
             <div>
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{lang === 'ar' ? 'رقم التأجير' : 'Matricule'}</label>
                <div className="input-gov bg-slate-50 font-black text-[#003366] flex items-center">{formData.matricule}</div>
             </div>
             <div>
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{lang === 'ar' ? 'تاريخ التوظيف' : 'Date de Recrutement'}</label>
                <input type="date" name="recruitment_date" required className="input-gov" value={formData.recruitment_date} onChange={handleInputChange} />
             </div>
             <div>
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{lang === 'ar' ? 'الدرجة' : 'Grade'}</label>
                <input type="text" name="grade" required className="input-gov" value={formData.grade} onChange={handleInputChange} />
             </div>
             <div>
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{lang === 'ar' ? 'الرتبة' : 'Échelon'}</label>
                <input type="text" name="echelon" required className="input-gov" value={formData.echelon} onChange={handleInputChange} />
             </div>
             <div>
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{lang === 'ar' ? 'مقر التعيين' : 'Affectation'}</label>
                <input type="text" name="direction" required className="input-gov" value={formData.direction} onChange={handleInputChange} />
             </div>
             <div>
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{lang === 'ar' ? 'الهاتف' : 'Téléphone'}</label>
                <input type="tel" name="telephone" required className="input-gov" value={formData.telephone} onChange={handleInputChange} />
             </div>
          </div>

          <div className="mt-10 p-8 bg-slate-50/50 rounded-3xl border border-dashed border-slate-200">
             <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-6">{lang === 'ar' ? 'الدور في النظام' : 'Rôle Système'}</label>
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

        {/* Action Button */}
        <button 
           type="submit"
           disabled={loading}
           className="w-full bg-[#003366] text-white py-8 rounded-[2.5rem] font-black text-xl flex items-center justify-center gap-6 shadow-2xl shadow-blue-900/20 hover:scale-[1.01] active:scale-[0.99] transition-all disabled:opacity-50"
        >
           <Save size={28} />
           <span>{loading ? (lang === 'ar' ? 'جاري الحفظ...' : 'Enregistrement...') : (lang === 'ar' ? 'حفظ التعديلات' : 'Enregistrer les modifications')}</span>
        </button>

      </form>
    </div>
  );
};

export default EditEmployee;
