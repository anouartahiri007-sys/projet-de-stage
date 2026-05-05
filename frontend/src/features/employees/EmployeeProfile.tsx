import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, Mail, Phone, MapPin, 
  Award, Calendar, TrendingUp, ShieldCheck,
  Download, Edit3, Trash2, CheckCircle, 
  AlertCircle, Loader2, User, FileText,
  Clock as ClockIcon, FileCheck, Briefcase, ChevronLeft
} from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { api } from '../../lib/api';
import { toast } from 'react-hot-toast';
import { useLang } from '../../context/LangContext';

const EmployeeProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t, lang } = useLang();
  const [activeTab, setActiveTab] = useState('dossier');

  const { data: employee, isLoading, refetch } = useQuery({
    queryKey: ['employee', id],
    queryFn: async () => {
      const res = await api.get(`/fonctionnaires/${id}`);
      return res.data;
    },
    enabled: !!id
  });

  const handleEdit = () => {
    navigate(`/rh/employees/edit/${id}`);
  };

  const handleDelete = async () => {
    if (!window.confirm(lang === 'ar' ? 'هل أنت متأكد من حذف هذا الملف؟' : 'Êtes-vous sûr de vouloir supprimer ce dossier ?')) return;
    try {
      await api.delete(`/fonctionnaires/${id}`);
      toast.success(lang === 'ar' ? 'تم الحذف' : 'Supprimé');
      navigate('/rh/employees');
    } catch (err) {
      toast.error("Erreur");
    }
  };

  const generateDoc = async (type: string) => {
    toast.loading(lang === 'ar' ? 'جاري التحميل...' : 'Génération...', { id: 'doc' });
    try {
      // Assuming endpoints like /pdf/attestation/{id} exist (referenced in api.php)
      let url = '';
      if (type === 'work') url = `/pdf/attestation/${id}`;
      else if (type === 'salary') url = `/payrolls/generate/${id}`; // Example
      
      if (!url) {
        toast.error("Endpoint not ready", { id: 'doc' });
        return;
      }

      window.open(`http://localhost:8000/api${url}`, '_blank');
      toast.success(lang === 'ar' ? 'تمت العملية' : 'Terminé', { id: 'doc' });
    } catch (err) {
      toast.error("Erreur", { id: 'doc' });
    }
  };

  const timeline = [
    { label: lang === 'ar' ? 'ترقية إلى خارج السلم' : 'Promotion Hors Échelle', status: 'completed', date: '2024-01-12' },
    { label: lang === 'ar' ? 'اجتياز امتحان الكفاءة المهنية' : 'Examen d\'aptitude professionnelle', status: 'completed', date: '2023-11-20' },
    { label: lang === 'ar' ? 'تغيير التعيين لمصلحة الصحة' : 'Affectation au Service de Santé', status: 'completed', date: '2022-09-05' },
    { label: lang === 'ar' ? 'ترقية للرتبة 10' : 'Promotion à l\'Échelon 10', status: 'current', date: 'En cours' },
  ];

  if (isLoading) return (
    <div className="h-[60vh] flex flex-col items-center justify-center">
      <Loader2 className="animate-spin text-[#006241] mb-4" size={48} />
      <p className="text-[#003366] font-black">{t('loading')}</p>
    </div>
  );

  const tabs = [
    { key: 'dossier',    label: lang === 'ar' ? 'الملف الإداري' : 'Dossier Administratif', icon: <User size={18} /> },
    { key: 'carriere',   label: lang === 'ar' ? 'المسار المهني' : 'Carrière Professionnelle',   icon: <TrendingUp size={18} /> },
    { key: 'documents',  label: lang === 'ar' ? 'الوثائق والأرشيف' : 'Documents & Archives',  icon: <FileText size={18} /> },
  ];

  const statusStyle = employee?.status === 'active' 
    ? 'bg-emerald-50 text-emerald-700 border-emerald-100' 
    : 'bg-amber-50 text-amber-700 border-amber-100';

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 space-y-8 pb-20" dir={lang === 'ar' ? 'rtl' : 'ltr'}>
      
      {/* Header Profile Section */}
      <div className="bg-white rounded-[2.5rem] p-8 shadow-xl shadow-blue-900/5 border border-gray-50 flex flex-col lg:flex-row items-center lg:items-end justify-between gap-8">
        <div className="flex flex-col lg:flex-row items-center gap-8">
          <div className="relative group">
            <div className="w-32 h-32 rounded-[2.5rem] bg-gradient-to-br from-[#003366] to-[#006241] flex items-center justify-center text-white font-black text-5xl shadow-2xl shadow-emerald-900/20 group-hover:scale-105 transition-transform duration-500">
               {((lang === 'ar' ? employee?.nom_ar : employee?.nom) || 'E').charAt(0)}
            </div>
            <div className="absolute -bottom-2 -right-2 bg-white p-2 rounded-2xl shadow-lg border border-gray-100">
               <div className="w-4 h-4 bg-emerald-500 rounded-full animate-pulse"></div>
            </div>
          </div>
          
          <div className={lang === 'ar' ? 'text-right' : 'text-left'}>
            <button onClick={() => navigate('/rh/employees')} className="flex items-center gap-2 text-gray-400 font-black text-xs mb-4 hover:text-[#006241] transition-colors uppercase tracking-widest">
              <ArrowLeft size={16} className={lang === 'ar' ? 'rotate-180' : ''} />
              {lang === 'ar' ? 'الرجوع للائحة الموظفين' : 'Retour au répertoire'}
            </button>
            <h1 className="text-4xl font-black text-[#003366] tracking-tight mb-2">
              {lang === 'ar' && employee?.nom_ar ? `${employee.nom_ar} ${employee.prenom_ar}` : `${employee?.prenom} ${employee?.nom}`}
            </h1>
            <div className="flex flex-wrap items-center gap-3">
               <span className="text-[#006241] font-black bg-emerald-50 px-3 py-1 rounded-lg border border-emerald-100 text-sm">{employee?.role}</span>
               <span className="text-[#C5A059] font-black bg-amber-50 px-3 py-1 rounded-lg border border-amber-100 text-sm">{employee?.grade}</span>
               <span className="text-gray-400 font-bold text-xs uppercase tracking-wider">ID: {employee?.matricule}</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
           <span className={`inline-flex items-center gap-2 px-6 py-3 rounded-2xl border-2 font-black text-xs uppercase ${statusStyle}`}>
              <div className="w-2 h-2 rounded-full bg-current"></div>
              {employee?.status === 'active' ? t('active') : t('onLeave')}
           </span>
           <button 
             onClick={handleEdit}
             className="p-4 bg-white border border-gray-100 rounded-2xl text-gray-400 hover:text-[#006241] hover:border-emerald-100 transition-all shadow-sm group"
           >
              <Edit3 size={22} className="group-hover:scale-110 transition-transform" />
           </button>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="flex flex-wrap gap-2 bg-white/50 p-2 rounded-[1.5rem] border border-gray-100 w-fit backdrop-blur-sm">
        {tabs.map(tab => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`flex items-center gap-3 px-8 py-3.5 rounded-2xl text-sm font-black transition-all duration-300 ${activeTab === tab.key ? 'bg-[#003366] text-white shadow-xl shadow-blue-900/20 scale-105' : 'text-gray-400 hover:text-gray-600 hover:bg-white'}`}
          >
            {tab.icon}
            {tab.label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Content Area */}
        <div className="lg:col-span-8 space-y-8">
          
          {activeTab === 'dossier' && (
            <div className="bg-white rounded-[2.5rem] p-10 shadow-xl shadow-blue-900/5 border border-gray-50 animate-in fade-in slide-in-from-left-4 duration-500">
               <div className="flex items-center justify-between mb-10">
                  <h3 className="text-2xl font-black text-[#003366] flex items-center gap-4">
                    <ShieldCheck size={28} className="text-[#006241]" />
                    {lang === 'ar' ? 'المعطيات الإدارية والمهنية' : 'Informations Administratives'}
                  </h3>
                  <div className="w-12 h-1 bg-[#C5A059] rounded-full opacity-30"></div>
               </div>

               <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
                  <ProfileField label={lang === 'ar' ? 'رقم التأجير / بطاقة التعريف' : 'Matricule / CIN'} value={`${employee?.matricule || ''} / ${employee?.cnie || ''}`} icon={<Award size={18} />} />
                  <ProfileField label={lang === 'ar' ? 'البريد الإلكتروني المهني' : 'Email Professionnel'} value={employee?.email_perso} icon={<Mail size={18} />} />
                  <ProfileField label={lang === 'ar' ? 'رقم الهاتف' : 'Téléphone'} value={employee?.telephone} icon={<Phone size={18} />} />
                  <ProfileField label={lang === 'ar' ? 'المصلحة / القسم' : 'Service / Département'} value={employee?.direction} icon={<Briefcase size={18} />} />
                  <ProfileField label={lang === 'ar' ? 'مكان الازدياد' : 'Lieu de Naissance'} value={lang === 'ar' ? employee?.lieu_naissance_ar : employee?.lieu_naissance} icon={<MapPin size={18} />} />
                  <ProfileField label={lang === 'ar' ? 'تاريخ التوظيف' : 'Date de Recrutement'} value={employee?.recruitment_date} icon={<Calendar size={18} />} />
               </div>
            </div>
          )}

          {activeTab === 'carriere' && (
            <div className="space-y-8 animate-in fade-in slide-in-from-left-4 duration-500">
               <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <StatCard label={lang === 'ar' ? 'الدرجة الحالية' : 'Grade'} value={employee?.grade} icon={<Award size={24} />} color="emerald" />
                  <StatCard label={lang === 'ar' ? 'الرتبة' : 'Échelon'} value={employee?.echelon} icon={<TrendingUp size={24} />} color="blue" />
                  <StatCard label={lang === 'ar' ? 'الأقدمية بالسنوات' : 'Ancienneté'} value="12 سنة" icon={<Calendar size={24} />} color="amber" />
               </div>

               <div className="bg-white rounded-[2.5rem] p-10 shadow-xl shadow-blue-900/5 border border-gray-50">
                  <h3 className="text-2xl font-black text-[#003366] mb-10">{lang === 'ar' ? 'تتبع المسار المهني' : 'Timeline de Carrière'}</h3>
                  <div className="relative">
                    <div className={`absolute top-0 bottom-0 ${lang === 'ar' ? 'right-5' : 'left-5'} w-1 bg-gray-50 rounded-full`}></div>
                    <div className="space-y-12">
                       {timeline.map((item, i) => (
                         <div key={i} className="relative flex items-center gap-10 group">
                            <div className={`w-10 h-10 rounded-2xl border-4 border-white shadow-lg z-10 shrink-0 transition-all duration-300 group-hover:scale-110 ${
                              item.status === 'completed' ? 'bg-[#006241]' : 'bg-[#C5A059] animate-pulse'
                            } flex items-center justify-center text-white`}>
                               {item.status === 'completed' ? <CheckCircle size={20} /> : <ClockIcon size={20} />}
                            </div>
                            <div className="flex-1 bg-gray-50/50 p-5 rounded-2xl border border-transparent group-hover:border-emerald-100 group-hover:bg-white transition-all">
                               <p className="font-black text-gray-800 text-base">{item.label}</p>
                               <p className="text-xs text-gray-400 font-bold mt-1 uppercase tracking-widest">{item.date}</p>
                            </div>
                         </div>
                       ))}
                    </div>
                  </div>
               </div>
            </div>
          )}

          {activeTab === 'documents' && (
            <div className="bg-white rounded-[2.5rem] p-10 shadow-xl shadow-blue-900/5 border border-gray-100 animate-in fade-in slide-in-from-left-4 duration-500">
               <h3 className="text-2xl font-black text-[#003366] mb-10">{lang === 'ar' ? 'الأرشيف الرقمي' : 'Documents Archivés'}</h3>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    { name: 'قرار التعيين', date: '2012-05-15', size: '1.2 MB' },
                    { name: 'شهادة العمل 2024', date: '2024-02-01', size: '450 KB' },
                    { name: 'قرار الترقية في الرتبة', date: '2023-06-10', size: '890 KB' },
                    { name: 'بيان الالتزام', date: '2012-05-20', size: '2.1 MB' },
                  ].map((doc, i) => (
                    <div key={i} className="flex items-center justify-between p-5 rounded-2xl border border-gray-50 bg-gray-50/30 hover:bg-white hover:border-emerald-100 hover:shadow-lg transition-all group">
                       <div className="flex items-center gap-4">
                          <div className="p-3 bg-white rounded-xl text-[#006241] shadow-sm group-hover:scale-110 transition-transform">
                             <FileCheck size={24} />
                          </div>
                          <div>
                             <p className="font-black text-gray-800 text-sm">{doc.name}</p>
                             <p className="text-[10px] text-gray-400 font-bold uppercase mt-1">{doc.date} • {doc.size}</p>
                          </div>
                       </div>
                       <button className="p-2 text-gray-300 hover:text-[#006241] transition-colors">
                          <Download size={20} />
                       </button>
                    </div>
                  ))}
               </div>
            </div>
          )}
        </div>

        {/* Right Action Sidebar */}
        <div className="lg:col-span-4 space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
           <div className="bg-[#003366] rounded-[2.5rem] p-10 text-white shadow-2xl shadow-blue-900/30">
              <h3 className="text-xl font-black mb-8 flex items-center gap-3">
                 <FileText size={22} className="text-[#C5A059]" />
                 {lang === 'ar' ? 'إجراءات إدارية' : 'Actions Admin'}
              </h3>
              <div className="space-y-4">
                 <QuickAction label={lang === 'ar' ? 'شهادة العمل' : 'Attestation de travail'} onClick={() => generateDoc('work')} />
                 <QuickAction label={lang === 'ar' ? 'شهادة الأجرة' : 'Attestation de salaire'} onClick={() => generateDoc('salary')} />
                 <QuickAction label={lang === 'ar' ? 'قرار رخصة سنوية' : 'Décision de congé'} onClick={() => generateDoc('leave')} />
                 <QuickAction label={lang === 'ar' ? 'بطاقة الموظف' : 'Carte d\'employé'} onClick={() => generateDoc('card')} />
                 <div className="pt-6 mt-6 border-t border-white/10">
                    <button 
                      onClick={handleDelete}
                      className="w-full flex items-center justify-center gap-3 py-4 bg-rose-500/10 text-rose-100 hover:bg-rose-500 hover:text-white rounded-2xl font-black text-sm transition-all"
                    >
                       <Trash2 size={18} />
                       {lang === 'ar' ? 'حذف الملف' : 'Supprimer le dossier'}
                    </button>
                 </div>
              </div>
           </div>

           <div className="bg-white rounded-[2.5rem] p-10 border border-gray-100 shadow-xl shadow-blue-900/5">
              <h3 className="text-sm font-black text-gray-400 uppercase tracking-[0.2em] mb-8">{lang === 'ar' ? 'آخر الأنشطة' : 'Activités Récentes'}</h3>
              <div className="space-y-8">
                 {[
                   { text: 'تم تحديث الدرجة الإدارية', date: 'أمس', color: 'emerald' },
                   { text: 'تم تحميل شهادة العمل', date: 'منذ يومين', color: 'blue' },
                   { text: 'طلب عطلة سنوية مقبول', date: 'منذ 5 أيام', color: 'amber' },
                 ].map((act, i) => (
                   <div key={i} className="flex gap-5">
                      <div className={`w-2 h-2 rounded-full mt-2 bg-${act.color}-500 shadow-[0_0_8px] shadow-${act.color}-500`}></div>
                      <div>
                         <p className="text-sm font-black text-gray-800 leading-tight">{act.text}</p>
                         <p className="text-[10px] text-gray-400 font-bold mt-1 uppercase tracking-widest">{act.date}</p>
                      </div>
                   </div>
                 ))}
              </div>
           </div>
        </div>

      </div>
    </div>
  );
};

// --- Helper Components ---

const ProfileField = ({ label, value, icon }: any) => (
  <div className="space-y-2 group">
    <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-2 group-focus-within:text-[#006241] transition-colors">
      {icon} {label}
    </label>
    <div className="px-5 py-4 bg-gray-50/50 border border-transparent rounded-2xl font-black text-gray-700 group-hover:bg-white group-hover:border-emerald-100 group-hover:shadow-lg transition-all duration-300">
      {value}
    </div>
  </div>
);

const StatCard = ({ label, value, icon, color }: any) => {
  const colors: any = {
    emerald: 'bg-emerald-50 text-emerald-600 border-emerald-100',
    blue: 'bg-blue-50 text-blue-600 border-blue-100',
    amber: 'bg-amber-50 text-amber-600 border-amber-100'
  };
  return (
    <div className="bg-white p-8 rounded-[2rem] border border-gray-50 shadow-xl shadow-blue-900/5 flex flex-col items-center text-center gap-4 hover:scale-105 transition-transform duration-300">
       <div className={`p-4 rounded-[1.25rem] ${colors[color]} border shadow-sm`}>{icon}</div>
       <div>
          <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">{label}</p>
          <p className="text-xl font-black text-[#003366]">{value}</p>
       </div>
    </div>
  );
};

const QuickAction = ({ label, onClick }: any) => {
  const { lang } = useLang();
  return (
    <button 
      onClick={onClick}
      className="w-full flex items-center justify-between px-6 py-4 bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 rounded-2xl font-black text-sm transition-all group"
    >
       {label}
       <ChevronLeft size={18} className={`text-[#C5A059] group-hover:translate-x-${lang === 'ar' ? '1' : '-1'} transition-transform ${lang === 'ar' ? '' : 'rotate-180'}`} />
    </button>
  );
};

export default EmployeeProfile;
