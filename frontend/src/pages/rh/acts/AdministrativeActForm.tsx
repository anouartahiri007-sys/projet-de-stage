import React, { useState, useEffect, useMemo } from 'react';
import { useParams, useNavigate, useSearchParams, useLocation } from 'react-router-dom';
import { 
  Save, ArrowLeft, User, Briefcase, 
  FileText, History, CheckCircle2, AlertCircle,
  ChevronRight, ArrowRight, UserPlus, Star, ShieldCheck,
  TrendingUp, Network, Check, FileCheck, Search, Plus
} from 'lucide-react';
import { api } from '../../../lib/api';
import { useLang } from '../../../context/LangContext';
import { toast } from 'react-hot-toast';

const AdministrativeActForm = () => {
  const { id, type: urlTypeParams } = useParams();
  const [searchParams] = useSearchParams();
  const location = useLocation();
  const urlType = urlTypeParams || searchParams.get('type') || '';
  const { t, lang } = useLang();
  const navigate = useNavigate();
  
  const [step, setStep] = useState(urlType ? 1 : 0); // 0 = Select Type, 1 = Select Employee, 2 = Form, 3 = Preview
  const [type, setType] = useState(urlType);
  const [employees, setEmployees] = useState<any[]>([]);
  const [candidates, setCandidates] = useState<any[]>([]);
  const [selectedEntity, setSelectedEntity] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  
  const [formData, setFormData] = useState<any>({});

  useEffect(() => {
    if (id) {
      fetchActDetails();
    } else {
      fetchEmployees();
      fetchCandidates();
      if (urlType) {
        setType(urlType);
        setStep(1);
      }
    }
  }, [id, urlType]);

  // Handle auto-selection from external navigation (e.g. Recruitment page)
  useEffect(() => {
    if (location.state?.selectedCandidate) {
       const candidate = location.state.selectedCandidate;
       // We set it as the selected entity and jump to step 2 (Form)
       setSelectedEntity(candidate);
       setStep(2);
    }
  }, [location.state]);

  const fetchActDetails = async () => {
    try {
      const res = await api.get(`/administrative-acts/${id}`);
      const act = res.data;
      setType(act.type);
      setSelectedEntity(act.fonctionnaire || act.candidat);
      setFormData(act.new_data || {});
      setStep(2); // Skip to data entry
    } catch (err) {
      toast.error(t('fetchError') || 'Erreur de chargement');
    }
  };

  const fetchEmployees = async () => {
    try {
      const res = await api.get('/fonctionnaires');
      // Handle both paginated and non-paginated responses
      setEmployees(res.data.data || res.data || []);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchCandidates = async () => {
    try {
      const res = await api.get('/candidatures');
      // Handle both paginated and non-paginated responses
      setCandidates(res.data.data || res.data || []);
    } catch (err) {
      console.error(err);
    }
  };

  const handleEntitySelect = (entity: any) => {
    setSelectedEntity(entity);
    setStep(2);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev: any) => ({ ...prev, [field]: value }));
  };

  const handleSave = async (status: 'draft' | 'validated' = 'draft') => {
    if (!selectedEntity) return toast.error(t('selectEmployeeError'));
    
    setLoading(true);
    try {
      const payload = {
        type,
        fonctionnaire_id: type !== 'recrutement' ? selectedEntity.id : null,
        candidat_id: type === 'recrutement' ? selectedEntity.id : null,
        new_data: formData,
        status: status
      };

      if (id) {
        await api.put(`/administrative-acts/${id}`, payload);
        toast.success(lang === 'ar' ? 'تم حفظ الإصدار الجديد بنجاح' : 'Nouvelle version enregistrée');
        navigate(`/rh/acts`);
      } else {
        await api.post('/administrative-acts', payload);
        toast.success(lang === 'ar' ? 'تم إنشاء القرار بنجاح' : 'Acte créé avec succès');
        navigate(`/rh/acts`);
      }
    } catch (err) {
      toast.error(t('saveError') || 'Erreur de sauvegarde');
    } finally {
      setLoading(false);
    }
  };

  const actTypes = [
    { id: 'recrutement', icon: <UserPlus />, color: 'emerald', label: t('recrutement') || 'Recrutement' },
    { id: 'nomination', icon: <Star />, color: 'amber', label: t('nomination') || 'Nomination' },
    { id: 'titularisation', icon: <ShieldCheck />, color: 'blue', label: t('titularisation') || 'Titularisation' },
    { id: 'notation', icon: <History />, color: 'purple', label: t('notation') || 'Notation' },
    { id: 'avancement', icon: <TrendingUp />, color: 'rose', label: t('avancement') || 'Avancement' },
    { id: 'reclassement', icon: <Network />, color: 'indigo', label: t('reclassement') || 'Reclassement' },
  ];

  // Search filter logic
  const filteredEntities = useMemo(() => {
    const list = type === 'recrutement' ? candidates : employees;
    if (!searchQuery) return list;
    return list.filter(e => {
      const searchStr = `${e.nom || e.last_name || ''} ${e.prenom || e.first_name || ''} ${e.matricule || e.cin || ''}`.toLowerCase();
      return searchStr.includes(searchQuery.toLowerCase());
    });
  }, [type, employees, candidates, searchQuery]);

  const renderDynamicForm = () => {
    switch (type) {
      case 'recrutement':
        return (
          <div className="space-y-12">
            {/* 1. Candidate Info (Read-only / Auto-filled) */}
            <div className="bg-[#F8FAFC] p-10 rounded-[2.5rem] border border-gray-100 shadow-sm relative overflow-hidden">
               <div className="absolute top-0 right-0 p-4 opacity-10"><UserPlus size={80}/></div>
               <h4 className="text-sm font-black text-[#003366] uppercase tracking-widest mb-8 flex items-center gap-3">
                 <User size={20} className="text-[#006241]" />
                 {lang === 'ar' ? '1. معلومات المرشح (تعبئة تلقائية)' : '1. Informations du candidat (Auto)'}
               </h4>
               <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-xs relative z-10">
                  <div className="space-y-1">
                     <span className="text-slate-400 font-bold block">{lang === 'ar' ? 'الاسم والنسب' : 'Nom & Prénom'}</span>
                     <span className="font-black text-[#003366] text-sm uppercase">{selectedEntity?.nom || selectedEntity?.last_name} {selectedEntity?.prenom || selectedEntity?.first_name}</span>
                  </div>
                  <div className="space-y-1">
                     <span className="text-slate-400 font-bold block">{lang === 'ar' ? 'بطاقة التعريف' : 'CIN'}</span>
                     <span className="font-black text-[#003366] text-sm">{selectedEntity?.cin}</span>
                  </div>
                  <div className="space-y-1">
                     <span className="text-slate-400 font-bold block">{lang === 'ar' ? 'تاريخ الازدياد' : 'Date de naissance'}</span>
                     <span className="font-black text-slate-600">{selectedEntity?.date_naissance || '---'}</span>
                  </div>
               </div>
            </div>

            {/* 2. Acte Info */}
            <div className="space-y-8">
               <h4 className="text-sm font-black text-[#003366] uppercase tracking-widest flex items-center gap-3">
                 <FileText size={20} className="text-[#C5A059]" />
                 {lang === 'ar' ? '2. معلومات القرار' : '2. Informations de l\'acte'}
               </h4>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{lang === 'ar' ? 'رقم القرار' : 'Référence Acte'}</label>
                    <input type="text" className="input-gov" placeholder=".../2026" value={formData.reference_acte || ''} onChange={(e) => handleInputChange('reference_acte', e.target.value)} />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{lang === 'ar' ? 'تاريخ القرار' : 'Date القرار'}</label>
                    <input type="date" className="input-gov" value={formData.date_acte || ''} onChange={(e) => handleInputChange('date_acte', e.target.value)} />
                  </div>
               </div>
            </div>

            {/* 3. Recruitment Details */}
            <div className="space-y-8">
               <h4 className="text-sm font-black text-[#003366] uppercase tracking-widest flex items-center gap-3">
                 <Briefcase size={20} className="text-emerald-600" />
                 {lang === 'ar' ? '3. معلومات التوظيف' : '3. Détails du recrutement'}
               </h4>
               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{lang === 'ar' ? 'تاريخ التوظيف' : 'Date Recrutement'}</label>
                    <input type="date" className="input-gov" value={formData.date_recrutement || ''} onChange={(e) => handleInputChange('date_recrutement', e.target.value)} />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{lang === 'ar' ? 'الدرجة عند التوظيف' : 'Grade'}</label>
                    <input type="text" className="input-gov" value={formData.grade_recrutement || ''} onChange={(e) => handleInputChange('grade_recrutement', e.target.value)} />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{lang === 'ar' ? 'السلم' : 'Échelle'}</label>
                    <input type="text" className="input-gov" value={formData.echelle_recrutement || ''} onChange={(e) => handleInputChange('echelle_recrutement', e.target.value)} />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{lang === 'ar' ? 'الرتبة' : 'Échelon'}</label>
                    <input type="text" className="input-gov" value={formData.echelon_recrutement || ''} onChange={(e) => handleInputChange('echelon_recrutement', e.target.value)} />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{lang === 'ar' ? 'الرقم الاستدلالي' : 'Indice'}</label>
                    <input type="text" className="input-gov" value={formData.indice_recrutement || ''} onChange={(e) => handleInputChange('indice_recrutement', e.target.value)} />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{lang === 'ar' ? 'المصلحة / القسم' : 'Affectation'}</label>
                    <input type="text" className="input-gov" value={formData.service_affectation || ''} onChange={(e) => handleInputChange('service_affectation', e.target.value)} />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{lang === 'ar' ? 'نوع التوظيف' : 'Type Recrutement'}</label>
                    <select className="input-gov" value={formData.type_recrutement || 'direct'} onChange={(e) => handleInputChange('type_recrutement', e.target.value)}>
                       <option value="direct">{lang === 'ar' ? 'توظيف مباشر' : 'Direct'}</option>
                       <option value="concours">{lang === 'ar' ? 'عن طريق مباراة' : 'Concours'}</option>
                    </select>
                  </div>
               </div>
            </div>

            {/* 4. Diploma Info */}
            <div className="space-y-8">
               <h4 className="text-sm font-black text-[#003366] uppercase tracking-widest flex items-center gap-3">
                 <ShieldCheck size={20} className="text-blue-600" />
                 {lang === 'ar' ? '4. معلومات الشهادة' : '4. Diplôme & Spécialité'}
               </h4>
               <div className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{lang === 'ar' ? 'الشهادة' : 'Diplôme'}</label>
                    <input type="text" className="input-gov" value={formData.diplome || ''} onChange={(e) => handleInputChange('diplome', e.target.value)} />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{lang === 'ar' ? 'التخصص' : 'Spécialité'}</label>
                    <input type="text" className="input-gov" value={formData.specialite || ''} onChange={(e) => handleInputChange('specialite', e.target.value)} />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{lang === 'ar' ? 'تاريخ الشهادة' : 'Date Diplôme'}</label>
                    <input type="date" className="input-gov" value={formData.date_diplome || ''} onChange={(e) => handleInputChange('date_diplome', e.target.value)} />
                  </div>
               </div>
            </div>

            {/* 5. Additional Decision Info */}
            <div className="space-y-8">
               <h4 className="text-sm font-black text-[#003366] uppercase tracking-widest flex items-center gap-3">
                 <AlertCircle size={20} className="text-amber-600" />
                 {lang === 'ar' ? '5. معلومات إضافية للقرار' : '5. Détails Décision'}
               </h4>
               <div className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{lang === 'ar' ? 'تاريخ سريان القرار' : 'Date d\'effet'}</label>
                    <input type="date" className="input-gov" value={formData.date_effet || ''} onChange={(e) => handleInputChange('date_effet', e.target.value)} />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{lang === 'ar' ? 'رقم المراسلة' : 'Num Télégramme'}</label>
                    <input type="text" className="input-gov" value={formData.num_telegramme || ''} onChange={(e) => handleInputChange('num_telegramme', e.target.value)} />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{lang === 'ar' ? 'تاريخ المراسلة' : 'Date Télégramme'}</label>
                    <input type="date" className="input-gov" value={formData.date_telegramme || ''} onChange={(e) => handleInputChange('date_telegramme', e.target.value)} />
                  </div>
               </div>
            </div>
          </div>
        );
      case 'nomination':
        return (
          <div className="space-y-12">
            {/* 1. Employee Info (Read-only / Auto-filled) */}
            <div className="bg-[#F8FAFC] p-10 rounded-[2.5rem] border border-gray-100 shadow-sm relative overflow-hidden">
               <div className="absolute top-0 right-0 p-4 opacity-10"><User size={80}/></div>
               <h4 className="text-sm font-black text-[#003366] uppercase tracking-widest mb-8 flex items-center gap-3">
                 <ShieldCheck size={20} className="text-[#006241]" />
                 {lang === 'ar' ? '1. معلومات الموظف (تعبئة تلقائية)' : '1. Informations du fonctionnaire (Auto)'}
               </h4>
               <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-xs relative z-10">
                  <div className="space-y-1">
                     <span className="text-slate-400 font-bold block">{lang === 'ar' ? 'الاسم والنسب' : 'Nom & Prénom'}</span>
                     <span className="font-black text-[#003366] text-sm uppercase">{selectedEntity?.nom} {selectedEntity?.prenom}</span>
                  </div>
                  <div className="space-y-1">
                     <span className="text-slate-400 font-bold block">{lang === 'ar' ? 'رقم التأجير' : 'Matricule'}</span>
                     <span className="font-black text-[#003366] text-sm">{selectedEntity?.matricule}</span>
                  </div>
                  <div className="space-y-1">
                     <span className="text-slate-400 font-bold block">{lang === 'ar' ? 'بطاقة التعريف' : 'CIN'}</span>
                     <span className="font-black text-[#003366] text-sm">{selectedEntity?.cnie}</span>
                  </div>
                  <div className="space-y-1">
                     <span className="text-slate-400 font-bold block">{lang === 'ar' ? 'الدرجة الحالية' : 'Grade actuel'}</span>
                     <span className="font-black text-emerald-700">{selectedEntity?.grade}</span>
                  </div>
                  <div className="space-y-1">
                     <span className="text-slate-400 font-bold block">{lang === 'ar' ? 'الرتبة الحالية' : 'Échelon actuel'}</span>
                     <span className="font-black text-amber-700">{selectedEntity?.echelon || '---'}</span>
                  </div>
                  <div className="space-y-1">
                     <span className="text-slate-400 font-bold block">{lang === 'ar' ? 'تاريخ التوظيف' : 'Recrutement'}</span>
                     <span className="font-black text-slate-600">{selectedEntity?.recruitment_date}</span>
                  </div>
               </div>
            </div>

            {/* 2. Acte Info */}
            <div className="space-y-8">
               <h4 className="text-sm font-black text-[#003366] uppercase tracking-widest flex items-center gap-3">
                 <FileText size={20} className="text-[#C5A059]" />
                 {lang === 'ar' ? '2. معلومات القرار (Acte administratif)' : '2. Informations de l\'acte'}
               </h4>
               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{lang === 'ar' ? 'رقم القرار' : 'Référence Acte'}</label>
                    <input type="text" className="input-gov" placeholder=".../2026" value={formData.acte_reference || ''} onChange={(e) => handleInputChange('acte_reference', e.target.value)} />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{lang === 'ar' ? 'تاريخ القرار' : 'Date Décision'}</label>
                    <input type="date" className="input-gov" value={formData.date_decision || ''} onChange={(e) => handleInputChange('date_decision', e.target.value)} />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{lang === 'ar' ? 'تاريخ المفعول' : 'Date d\'effet'}</label>
                    <input type="date" className="input-gov" value={formData.date_effet || ''} onChange={(e) => handleInputChange('date_effet', e.target.value)} />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{lang === 'ar' ? 'تاريخ الالتحاق' : 'Prise de service'}</label>
                    <input type="date" className="input-gov" value={formData.date_prise_service || ''} onChange={(e) => handleInputChange('date_prise_service', e.target.value)} />
                  </div>
               </div>
            </div>

            {/* 3. Nomination Data */}
            <div className="space-y-8">
               <h4 className="text-sm font-black text-[#003366] uppercase tracking-widest flex items-center gap-3">
                 <Plus size={20} className="text-[#006241]" />
                 {lang === 'ar' ? '3. معطيات التعيين / الترقية' : '3. Données de Nomination / Promotion'}
               </h4>
               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{lang === 'ar' ? 'نوع التعيين' : 'Type Nomination'}</label>
                    <select className="input-gov" value={formData.type_nomination || 'nomination'} onChange={(e) => handleInputChange('type_nomination', e.target.value)}>
                       <option value="nomination">{lang === 'ar' ? 'تعيين' : 'Nomination'}</option>
                       <option value="titularisation">{lang === 'ar' ? 'ترسيم' : 'Titularisation'}</option>
                       <option value="promotion">{lang === 'ar' ? 'ترقية' : 'Promotion'}</option>
                       <option value="affectation">{lang === 'ar' ? 'تعيين في منصب' : 'Affectation'}</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{lang === 'ar' ? 'الدرجة الجديدة' : 'Nouveau Grade'}</label>
                    <input type="text" className="input-gov" value={formData.nouveau_grade || ''} onChange={(e) => handleInputChange('nouveau_grade', e.target.value)} />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{lang === 'ar' ? 'الرتبة الجديدة' : 'Nouvel Échelon'}</label>
                    <input type="text" className="input-gov" value={formData.nouvel_echelon || ''} onChange={(e) => handleInputChange('nouvel_echelon', e.target.value)} />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{lang === 'ar' ? 'الرقم الاستدلالي' : 'Indice'}</label>
                    <input type="text" className="input-gov" value={formData.indice || ''} onChange={(e) => handleInputChange('indice', e.target.value)} />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{lang === 'ar' ? 'الوظيفة' : 'Poste / Fonction'}</label>
                    <input type="text" className="input-gov" value={formData.poste || ''} onChange={(e) => handleInputChange('poste', e.target.value)} />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{lang === 'ar' ? 'المصلحة / القسم' : 'Service / Direction'}</label>
                    <input type="text" className="input-gov" value={formData.service || ''} onChange={(e) => handleInputChange('service', e.target.value)} />
                  </div>
               </div>
            </div>

            {/* 4. Signature Info */}
            <div className="space-y-8">
               <h4 className="text-sm font-black text-[#003366] uppercase tracking-widest flex items-center gap-3">
                 <CheckCircle2 size={20} className="text-emerald-600" />
                 {lang === 'ar' ? '4. التوقيع والتاريخ' : '4. Signature & Date'}
               </h4>
               <div className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{lang === 'ar' ? 'مكان التحرير' : 'Lieu'}</label>
                    <input type="text" className="input-gov" value={formData.lieu_redaction || 'العرائش'} onChange={(e) => handleInputChange('lieu_redaction', e.target.value)} />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{lang === 'ar' ? 'تاريخ التحرير' : 'Date Rédaction'}</label>
                    <input type="date" className="input-gov" value={formData.date_redaction || new Date().toISOString().split('T')[0]} onChange={(e) => handleInputChange('date_redaction', e.target.value)} />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{lang === 'ar' ? 'الموقع' : 'Signataire'}</label>
                    <input type="text" className="input-gov" value={formData.signataire || 'رئيس جماعة العرائش'} onChange={(e) => handleInputChange('signataire', e.target.value)} />
                  </div>
               </div>
            </div>
          </div>
        );
      case 'titularisation':
        return (
          <div className="space-y-12">
            {/* 1. Employee Info (Read-only / Auto-filled) */}
            <div className="bg-[#F8FAFC] p-10 rounded-[2.5rem] border border-gray-100 shadow-sm relative overflow-hidden">
               <div className="absolute top-0 right-0 p-4 opacity-10"><ShieldCheck size={80}/></div>
               <h4 className="text-sm font-black text-[#003366] uppercase tracking-widest mb-8 flex items-center gap-3">
                 <User size={20} className="text-[#006241]" />
                 {lang === 'ar' ? '1. معلومات الموظف (تعبئة تلقائية)' : '1. Informations du fonctionnaire (Auto)'}
               </h4>
               <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-xs relative z-10">
                  <div className="space-y-1">
                     <span className="text-slate-400 font-bold block">{lang === 'ar' ? 'الاسم والنسب' : 'Nom & Prénom'}</span>
                     <span className="font-black text-[#003366] text-sm uppercase">{selectedEntity?.nom} {selectedEntity?.prenom}</span>
                  </div>
                  <div className="space-y-1">
                     <span className="text-slate-400 font-bold block">{lang === 'ar' ? 'رقم التأجير' : 'Matricule'}</span>
                     <span className="font-black text-[#003366] text-sm">{selectedEntity?.matricule}</span>
                  </div>
                  <div className="space-y-1">
                     <span className="text-slate-400 font-bold block">{lang === 'ar' ? 'بطاقة التعريف' : 'CIN'}</span>
                     <span className="font-black text-[#003366] text-sm">{selectedEntity?.cnie}</span>
                  </div>
                  <div className="space-y-1">
                     <span className="text-slate-400 font-bold block">{lang === 'ar' ? 'تاريخ الازدياد' : 'Date naissance'}</span>
                     <span className="font-black text-slate-600">{selectedEntity?.date_naissance}</span>
                  </div>
               </div>
            </div>

            {/* 2. Acte Info */}
            <div className="space-y-8">
               <h4 className="text-sm font-black text-[#003366] uppercase tracking-widest flex items-center gap-3">
                 <FileText size={20} className="text-[#C5A059]" />
                 {lang === 'ar' ? '2. معلومات القرار' : '2. Informations de l\'acte'}
               </h4>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{lang === 'ar' ? 'رقم القرار' : 'Référence Acte'}</label>
                    <input type="text" className="input-gov" placeholder=".../2026" value={formData.reference_acte || ''} onChange={(e) => handleInputChange('reference_acte', e.target.value)} />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{lang === 'ar' ? 'تاريخ القرار' : 'Date القرار'}</label>
                    <input type="date" className="input-gov" value={formData.date_acte || ''} onChange={(e) => handleInputChange('date_acte', e.target.value)} />
                  </div>
               </div>
            </div>

            {/* 3. Stage Info */}
            <div className="space-y-8">
               <h4 className="text-sm font-black text-[#003366] uppercase tracking-widest flex items-center gap-3">
                 <History size={20} className="text-blue-600" />
                 {lang === 'ar' ? '3. معلومات فترة التدريب' : '3. Informations du stage'}
               </h4>
               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{lang === 'ar' ? 'تاريخ الترسيم' : 'Date d\'effet'}</label>
                    <input type="date" className="input-gov" value={formData.date_effet || ''} onChange={(e) => handleInputChange('date_effet', e.target.value)} />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{lang === 'ar' ? 'تاريخ نهاية التدريب' : 'Fin stage'}</label>
                    <input type="date" className="input-gov" value={formData.date_titularisation || ''} onChange={(e) => handleInputChange('date_titularisation', e.target.value)} />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{lang === 'ar' ? 'مدة التدريب' : 'Durée stage'}</label>
                    <input type="text" className="input-gov" placeholder="12 شهر" value={formData.duree_stage || ''} onChange={(e) => handleInputChange('duree_stage', e.target.value)} />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{lang === 'ar' ? 'نتيجة التدريب' : 'Décision'}</label>
                    <select className="input-gov" value={formData.decision_stage || 'valide'} onChange={(e) => handleInputChange('decision_stage', e.target.value)}>
                       <option value="valide">{lang === 'ar' ? 'ناجح' : 'Succès'}</option>
                       <option value="echec">{lang === 'ar' ? 'غير ناجح' : 'Échec'}</option>
                    </select>
                  </div>
               </div>
            </div>

            {/* 4. Situation Comparison */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
               {/* Old Situation */}
               <div className="space-y-6">
                  <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-slate-300"></div> {lang === 'ar' ? 'الوضعية القديمة' : 'Ancienne Situation'}
                  </h4>
                  <div className="bg-[#F8FAFC] p-6 rounded-3xl border border-gray-100 space-y-4 shadow-inner">
                     <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1">
                           <label className="text-[8px] font-black text-slate-400 uppercase">Grade</label>
                           <input type="text" className="input-gov h-9 text-xs" value={formData.old_grade || selectedEntity?.grade || ''} onChange={(e) => handleInputChange('old_grade', e.target.value)} />
                        </div>
                        <div className="space-y-1">
                           <label className="text-[8px] font-black text-slate-400 uppercase">Échelle</label>
                           <input type="text" className="input-gov h-9 text-xs" value={formData.old_echelle || ''} onChange={(e) => handleInputChange('old_echelle', e.target.value)} />
                        </div>
                        <div className="space-y-1">
                           <label className="text-[8px] font-black text-slate-400 uppercase">Échelon</label>
                           <input type="text" className="input-gov h-9 text-xs" value={formData.old_echelon || selectedEntity?.echelon || ''} onChange={(e) => handleInputChange('old_echelon', e.target.value)} />
                        </div>
                        <div className="space-y-1">
                           <label className="text-[8px] font-black text-slate-400 uppercase">Indice</label>
                           <input type="text" className="input-gov h-9 text-xs" value={formData.old_indice || ''} onChange={(e) => handleInputChange('old_indice', e.target.value)} />
                        </div>
                     </div>
                  </div>
               </div>

               {/* New Situation */}
               <div className="space-y-6">
                  <h4 className="text-[10px] font-black text-emerald-600 uppercase tracking-widest flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-emerald-500"></div> {lang === 'ar' ? 'الوضعية الجديدة' : 'Nouvelle Situation'}
                  </h4>
                  <div className="bg-emerald-50/30 p-6 rounded-3xl border border-emerald-100 space-y-4 shadow-sm">
                     <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1">
                           <label className="text-[8px] font-black text-slate-400 uppercase">Grade</label>
                           <input type="text" className="input-gov h-9 text-xs" value={formData.new_grade || ''} onChange={(e) => handleInputChange('new_grade', e.target.value)} />
                        </div>
                        <div className="space-y-1">
                           <label className="text-[8px] font-black text-slate-400 uppercase">Échelle</label>
                           <input type="text" className="input-gov h-9 text-xs" value={formData.new_echelle || ''} onChange={(e) => handleInputChange('new_echelle', e.target.value)} />
                        </div>
                        <div className="space-y-1">
                           <label className="text-[8px] font-black text-slate-400 uppercase">Échelon</label>
                           <input type="text" className="input-gov h-9 text-xs" value={formData.new_echelon || ''} onChange={(e) => handleInputChange('new_echelon', e.target.value)} />
                        </div>
                        <div className="space-y-1">
                           <label className="text-[8px] font-black text-slate-400 uppercase">Indice</label>
                           <input type="text" className="input-gov h-9 text-xs" value={formData.new_indice || ''} onChange={(e) => handleInputChange('new_indice', e.target.value)} />
                        </div>
                     </div>
                  </div>
               </div>
            </div>

            {/* 5. Signature & Service */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm">
               <div className="space-y-2">
                 <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{lang === 'ar' ? 'المصلحة / القسم' : 'Affectation'}</label>
                 <input type="text" className="input-gov" value={formData.service_affectation || selectedEntity?.direction || ''} onChange={(e) => handleInputChange('service_affectation', e.target.value)} />
               </div>
               <div className="space-y-2">
                 <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{lang === 'ar' ? 'الموقع' : 'Signataire'}</label>
                 <input type="text" className="input-gov" value={formData.signataire || 'رئيس جماعة العرائش'} onChange={(e) => handleInputChange('signataire', e.target.value)} />
               </div>
            </div>
          </div>
        );
      case 'notation':
        // Calculate totals automatically
        const n_taches = parseFloat(formData.note_taches || 0);
        const n_rendement = parseFloat(formData.note_rendement || 0);
        const n_organisation = parseFloat(formData.note_organisation || 0);
        const n_comportement = parseFloat(formData.note_comportement || 0);
        const n_recherche = parseFloat(formData.note_recherche || 0);
        
        const total = n_taches + n_rendement + n_organisation + n_comportement + n_recherche;
        
        let mention = 'ضعيف';
        if (total >= 18) mention = 'ممتاز';
        else if (total >= 16) mention = 'جيد جداً';
        else if (total >= 14) mention = 'جيد';
        else if (total >= 10) mention = 'متوسط';

        let cadence = 'lent';
        if (total >= 16) cadence = 'rapide';
        else if (total >= 10) cadence = 'moyen';

        // Update formData with calculated values if they changed
        if (formData.note !== total || formData.mention !== mention || formData.rythme !== cadence) {
          setFormData((prev: any) => ({
            ...prev,
            note: total,
            mention: mention,
            rythme: cadence
          }));
        }

        return (
          <div className="space-y-12">
            {/* 1. Identity Display */}
            <div className="bg-[#F8FAFC] p-8 rounded-[2rem] border border-gray-100">
              <h4 className="text-sm font-black text-[#003366] uppercase tracking-widest mb-6 flex items-center gap-2">
                <User size={16} className="text-[#C5A059]" /> {lang === 'ar' ? '1. معلومات الموظف' : '1. Identité du fonctionnaire'}
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs">
                <div>
                   <span className="text-slate-400 block mb-1">CIN / Matricule</span>
                   <span className="font-bold text-[#003366]">{selectedEntity?.cnie || selectedEntity?.cin} / {selectedEntity?.matricule}</span>
                </div>
                <div>
                   <span className="text-slate-400 block mb-1">Date Naissance</span>
                   <span className="font-bold text-[#003366]">{selectedEntity?.date_naissance ? new Date(selectedEntity.date_naissance).toLocaleDateString() : '---'}</span>
                </div>
                <div>
                   <span className="text-slate-400 block mb-1">Grade / Poste</span>
                   <span className="font-bold text-[#003366]">{selectedEntity?.grade} / {selectedEntity?.poste}</span>
                </div>
                <div className="md:col-span-3 pt-2 border-t border-gray-200/50">
                   <span className="text-slate-400 block mb-1">Adresse</span>
                   <span className="font-bold text-[#003366]">{selectedEntity?.adresse || '---'}</span>
                </div>
              </div>
            </div>

            {/* 2. Scoring Details */}
            <div className="space-y-6">
              <h4 className="text-sm font-black text-[#003366] uppercase tracking-widest flex items-center gap-2">
                <Star size={16} className="text-[#C5A059]" /> {lang === 'ar' ? '2. عناصر التنقيط' : '2. Éléments de notation'}
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex justify-between">
                    <span>{lang === 'ar' ? 'إنجاز المهام' : 'Exécution des tâches'}</span>
                    <span className="text-[#C5A059]">/ 5</span>
                  </label>
                  <input type="number" min="0" max="5" step="0.5" className="input-gov" value={formData.note_taches || ''} onChange={(e) => handleInputChange('note_taches', e.target.value)} />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex justify-between">
                    <span>{lang === 'ar' ? 'المردودية' : 'Rendement'}</span>
                    <span className="text-[#C5A059]">/ 5</span>
                  </label>
                  <input type="number" min="0" max="5" step="0.5" className="input-gov" value={formData.note_rendement || ''} onChange={(e) => handleInputChange('note_rendement', e.target.value)} />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex justify-between">
                    <span>{lang === 'ar' ? 'القدرة على التنظيم' : 'Capacité d\'organisation'}</span>
                    <span className="text-[#C5A059]">/ 3</span>
                  </label>
                  <input type="number" min="0" max="3" step="0.5" className="input-gov" value={formData.note_organisation || ''} onChange={(e) => handleInputChange('note_organisation', e.target.value)} />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex justify-between">
                    <span>{lang === 'ar' ? 'السلوك المهني' : 'Comportement professionnel'}</span>
                    <span className="text-[#C5A059]">/ 4</span>
                  </label>
                  <input type="number" min="0" max="4" step="0.5" className="input-gov" value={formData.note_comportement || ''} onChange={(e) => handleInputChange('note_comportement', e.target.value)} />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex justify-between">
                    <span>{lang === 'ar' ? 'البحث والابتكار' : 'Recherche et innovation'}</span>
                    <span className="text-[#C5A059]">/ 3</span>
                  </label>
                  <input type="number" min="0" max="3" step="0.5" className="input-gov" value={formData.note_recherche || ''} onChange={(e) => handleInputChange('note_recherche', e.target.value)} />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{lang === 'ar' ? 'السنة' : 'Année'}</label>
                  <input type="number" className="input-gov" value={formData.annee || new Date().getFullYear()} onChange={(e) => handleInputChange('annee', e.target.value)} />
                </div>
              </div>
            </div>

            {/* 3. Summary Results */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
               <div className="bg-[#003366] p-6 rounded-3xl text-white shadow-xl flex flex-col justify-center items-center">
                  <span className="text-[10px] font-black uppercase tracking-widest opacity-60 mb-2">{lang === 'ar' ? 'المجموع' : 'Total Score'}</span>
                  <span className="text-4xl font-black">{total} <span className="text-xs opacity-50">/ 20</span></span>
               </div>
               <div className="bg-[#C5A059] p-6 rounded-3xl text-white shadow-xl flex flex-col justify-center items-center">
                  <span className="text-[10px] font-black uppercase tracking-widest opacity-80 mb-2">{lang === 'ar' ? 'الميزة' : 'Mention'}</span>
                  <span className="text-xl font-black uppercase tracking-tight">{mention}</span>
               </div>
               <div className="bg-white p-6 rounded-3xl text-[#003366] border border-gray-100 shadow-md flex flex-col justify-center items-center">
                  <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">{lang === 'ar' ? 'نسق الترقية' : 'Cadence'}</span>
                  <span className="text-xl font-black uppercase tracking-tight">{cadence === 'rapide' ? (lang === 'ar' ? 'سريع' : 'Rapide') : cadence === 'moyen' ? (lang === 'ar' ? 'متوسط' : 'Moyen') : (lang === 'ar' ? 'بطيء' : 'Lent')}</span>
               </div>
            </div>

            {/* 4. Additional Info */}
            <div className="space-y-6">
              <h4 className="text-sm font-black text-[#003366] uppercase tracking-widest flex items-center gap-2">
                <FileCheck size={16} className="text-[#C5A059]" /> {lang === 'ar' ? '3. التوقيعات والتاريخ' : '3. Signatures et Validation'}
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{lang === 'ar' ? 'مكان التحرير' : 'Lieu de rédaction'}</label>
                  <input type="text" className="input-gov" value={formData.lieu_redaction || 'العرائش'} onChange={(e) => handleInputChange('lieu_redaction', e.target.value)} />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{lang === 'ar' ? 'تاريخ القرار' : 'Date de l\'acte'}</label>
                  <input type="date" className="input-gov" value={formData.date_acte || new Date().toISOString().split('T')[0]} onChange={(e) => handleInputChange('date_acte', e.target.value)} />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{lang === 'ar' ? 'اسم الرئيس المباشر' : 'Nom Chef Direct'}</label>
                  <input type="text" className="input-gov" value={formData.nom_chef_direct || ''} onChange={(e) => handleInputChange('nom_chef_direct', e.target.value)} />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{lang === 'ar' ? 'اسم الوالي/العامل' : 'Nom du Directeur/Wali'}</label>
                  <input type="text" className="input-gov" value={formData.nom_directeur || ''} onChange={(e) => handleInputChange('nom_directeur', e.target.value)} />
                </div>
                <div className="col-span-1 md:col-span-2 space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{lang === 'ar' ? 'ملاحظات إضافية' : 'Observations'}</label>
                  <textarea className="input-gov min-h-[80px]" value={formData.commentaire || ''} onChange={(e) => handleInputChange('commentaire', e.target.value)} />
                </div>
              </div>
            </div>
          </div>
        );
      case 'avancement':
        return (
          <div className="space-y-12">
            {/* 1. Identity Display */}
            <div className="bg-[#F8FAFC] p-8 rounded-[2rem] border border-gray-100">
              <h4 className="text-sm font-black text-[#003366] uppercase tracking-widest mb-6 flex items-center gap-2">
                <User size={16} className="text-[#C5A059]" /> {lang === 'ar' ? '1. معلومات الموظف' : '1. Identité du fonctionnaire'}
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs">
                <div>
                   <span className="text-slate-400 block mb-1">CIN / Matricule</span>
                   <span className="font-bold text-[#003366]">{selectedEntity?.cnie || selectedEntity?.cin} / {selectedEntity?.matricule}</span>
                </div>
                <div>
                   <span className="text-slate-400 block mb-1">Date Naissance</span>
                   <span className="font-bold text-[#003366]">{selectedEntity?.date_naissance ? new Date(selectedEntity.date_naissance).toLocaleDateString() : '---'}</span>
                </div>
                <div>
                   <span className="text-slate-400 block mb-1">Grade Actuel</span>
                   <span className="font-bold text-[#003366]">{selectedEntity?.grade}</span>
                </div>
                <div>
                   <span className="text-slate-400 block mb-1">Échelon Actuel</span>
                   <span className="font-bold text-[#003366]">{selectedEntity?.echelon || '---'}</span>
                </div>
                <div className="md:col-span-2 pt-2 border-t border-gray-200/50">
                   <span className="text-slate-400 block mb-1">Affectation</span>
                   <span className="font-bold text-[#003366]">{selectedEntity?.direction || '---'}</span>
                </div>
              </div>
            </div>

            {/* 2. Promotion Details */}
            <div className="space-y-6">
              <h4 className="text-sm font-black text-[#003366] uppercase tracking-widest flex items-center gap-2">
                <TrendingUp size={16} className="text-[#C5A059]" /> {lang === 'ar' ? '2. معلومات الترقية' : '2. Détails de l\'avancement'}
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{lang === 'ar' ? 'الدرجة الجديدة' : 'Nouveau Grade'}</label>
                  <input type="text" className="input-gov" value={formData.nouveau_grade || ''} onChange={(e) => handleInputChange('nouveau_grade', e.target.value)} />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{lang === 'ar' ? 'الرتبة الجديدة' : 'Nouvel Échelon'}</label>
                  <input type="text" className="input-gov" value={formData.nouvel_echelon || ''} onChange={(e) => handleInputChange('nouvel_echelon', e.target.value)} />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{lang === 'ar' ? 'تاريخ المفعول' : 'Date d\'effet'}</label>
                  <input type="date" className="input-gov" value={formData.date_effet || ''} onChange={(e) => handleInputChange('date_effet', e.target.value)} />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{lang === 'ar' ? 'السنة' : 'Année'}</label>
                  <input type="number" className="input-gov" value={formData.annee || new Date().getFullYear()} onChange={(e) => handleInputChange('annee', e.target.value)} />
                </div>
              </div>
            </div>

            {/* 3. Justifications */}
            <div className="space-y-6">
              <h4 className="text-sm font-black text-[#003366] uppercase tracking-widest flex items-center gap-2">
                <FileText size={16} className="text-[#C5A059]" /> {lang === 'ar' ? '3. مبررات الترقية' : '3. Justifications'}
              </h4>
              <div className="space-y-6 bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm text-right">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{lang === 'ar' ? 'بيان مفصل عن المهام' : 'Missions détaillées'}</label>
                  <textarea className="input-gov min-h-[80px]" value={formData.description_missions || ''} onChange={(e) => handleInputChange('description_missions', e.target.value)} />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{lang === 'ar' ? 'رأي الرئيس المباشر' : 'Avis Supérieur Hiérarchique'}</label>
                  <textarea className="input-gov min-h-[80px]" value={formData.avis_superieur || ''} onChange={(e) => handleInputChange('avis_superieur', e.target.value)} />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{lang === 'ar' ? 'نظرة رئيس القسم' : 'Avis Chef de Division'}</label>
                  <textarea className="input-gov min-h-[80px]" value={formData.avis_chef || ''} onChange={(e) => handleInputChange('avis_chef', e.target.value)} />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{lang === 'ar' ? 'رأي السلطة الإدارية' : 'Avis Autorité Admin'}</label>
                  <textarea className="input-gov min-h-[80px]" value={formData.avis_admin || ''} onChange={(e) => handleInputChange('avis_admin', e.target.value)} />
                </div>
              </div>
            </div>

            {/* 4. Decision & Signatures */}
            <div className="space-y-6">
              <h4 className="text-sm font-black text-[#003366] uppercase tracking-widest flex items-center gap-2">
                <ShieldCheck size={16} className="text-[#C5A059]" /> {lang === 'ar' ? '4. القرار النهائي والتوقيع' : '4. Décision Finale'}
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm">
                <div className="col-span-1 md:col-span-2 p-6 bg-[#F8FAFC] rounded-2xl space-y-4">
                   <label className="flex items-center gap-4 cursor-pointer group">
                      <input 
                        type="radio" 
                        name="decision" 
                        value="propose" 
                        className="w-5 h-5 accent-[#006241]"
                        checked={formData.decision === 'propose'}
                        onChange={(e) => handleInputChange('decision', e.target.value)}
                      />
                      <span className="font-bold text-[#003366] group-hover:text-[#006241]">{lang === 'ar' ? 'يقترح ترقية المعني بالأمر' : 'Propose la promotion'}</span>
                   </label>
                   <label className="flex items-center gap-4 cursor-pointer group">
                      <input 
                        type="radio" 
                        name="decision" 
                        value="no_propose" 
                        className="w-5 h-5 accent-rose-600"
                        checked={formData.decision === 'no_propose'}
                        onChange={(e) => handleInputChange('decision', e.target.value)}
                      />
                      <span className="font-bold text-[#003366] group-hover:text-rose-600">{lang === 'ar' ? 'لا يقترح ترقية المعني بالأمر' : 'Ne propose pas la promotion'}</span>
                   </label>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{lang === 'ar' ? 'مكان التحرير' : 'Lieu de rédaction'}</label>
                  <input type="text" className="input-gov" value={formData.lieu_redaction || 'العرائش'} onChange={(e) => handleInputChange('lieu_redaction', e.target.value)} />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{lang === 'ar' ? 'تاريخ التحرير' : 'Date de rédaction'}</label>
                  <input type="date" className="input-gov" value={formData.date_acte || new Date().toISOString().split('T')[0]} onChange={(e) => handleInputChange('date_acte', e.target.value)} />
                </div>
              </div>
            </div>
          </div>
        );
      case 'reclassement':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Ancien Grade</label>
              <input type="text" className="input-gov" value={formData.ancien_grade || ''} onChange={(e) => handleInputChange('ancien_grade', e.target.value)} />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Nouveau Grade</label>
              <input type="text" className="input-gov" value={formData.nouveau_grade || ''} onChange={(e) => handleInputChange('nouveau_grade', e.target.value)} />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Motif</label>
              <input type="text" className="input-gov" value={formData.motif || ''} onChange={(e) => handleInputChange('motif', e.target.value)} />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Date</label>
              <input type="date" className="input-gov" value={formData.date || ''} onChange={(e) => handleInputChange('date', e.target.value)} />
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="animate-premium-in space-y-10 pb-20" dir={lang === 'ar' ? 'rtl' : 'ltr'}>
      {/* Header & Breadcrumb */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
        <div className="flex items-center gap-6">
          <button 
            onClick={() => navigate('/rh/acts')}
            className="p-4 rounded-2xl bg-white border border-gray-100 shadow-sm text-[#003366] hover:bg-slate-50 transition-all group"
          >
             <ArrowLeft size={24} className={`group-hover:-translate-x-1 transition-transform ${lang === 'ar' ? 'rotate-180 group-hover:translate-x-1' : ''}`} />
          </button>
          <div>
            <h1 className="text-4xl font-black text-[#003366] tracking-tight uppercase">
              {lang === 'ar' ? 'إنشاء قرار: ' : 'Créer Acte: '}
              <span className="text-[#C5A059]">{type ? actTypes.find(a => a.id === type)?.label : ''}</span>
            </h1>
            <nav className="flex items-center gap-2 mt-3 text-[10px] font-black uppercase tracking-widest text-slate-400">
               <span>Dashboard</span> <ChevronRight size={14} className={lang === 'ar' ? 'rotate-180' : ''}/>
               <span>Actes Administratifs</span> <ChevronRight size={14} className={lang === 'ar' ? 'rotate-180' : ''}/>
               <span className="text-[#003366]">Création</span>
            </nav>
          </div>
        </div>
        
        {/* Stepper Logic */}
        {type && (
          <div className="flex items-center gap-3 bg-white px-8 py-4 rounded-3xl shadow-sm border border-gray-100">
             {[1, 2, 3].map(s => (
               <div key={s} className="flex items-center gap-3">
                 <div className={`w-8 h-8 rounded-xl flex items-center justify-center font-black text-xs transition-all ${step >= s ? 'bg-[#003366] text-white shadow-lg' : 'bg-slate-100 text-slate-400'}`}>
                    {step > s ? <Check size={14} /> : s}
                 </div>
                 {s < 3 && <div className={`w-6 h-1 rounded-full ${step > s ? 'bg-[#C5A059]' : 'bg-slate-100'}`}></div>}
               </div>
             ))}
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* Main Content Area */}
        <div className="lg:col-span-8">
           <div className="gov-card p-12 min-h-[500px] flex flex-col justify-between">
              
              {/* Step 0: Select Type (if not in URL) */}
              {step === 0 && (
                <div className="space-y-10 animate-fade-in">
                   <h3 className="text-xl font-black text-[#003366]">{lang === 'ar' ? 'اختر نوع القرار الإداري' : 'Sélectionnez le type d\'acte'}</h3>
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {actTypes.map((act) => (
                        <button
                          key={act.id}
                          onClick={() => { setType(act.id); navigate(`/rh/acts/create/${act.id}`); setStep(1); }}
                          className={`p-6 rounded-[2rem] border-2 transition-all flex items-center gap-6 group hover:border-[#C5A059] bg-[#F8FAFC] ${lang === 'ar' ? 'flex-row-reverse text-right' : ''}`}
                        >
                           <div className={`w-14 h-14 bg-white rounded-2xl flex items-center justify-center shadow-md group-hover:scale-110 transition-transform text-${act.color}-600`}>
                              {act.icon}
                           </div>
                           <span className="text-sm font-black uppercase tracking-widest text-[#003366]">{act.label}</span>
                        </button>
                      ))}
                   </div>
                </div>
              )}

              {/* Step 1: Select Entity */}
              {step === 1 && (
                <div className="space-y-8 animate-fade-in">
                   <h3 className="text-xl font-black text-[#003366]">{type === 'recrutement' ? (lang === 'ar' ? 'اختر المرشح للتوظيف' : 'Sélectionner le candidat') : (lang === 'ar' ? 'اختر الموظف المعني' : 'Sélectionner l\'employé')}</h3>
                   
                   <div className="relative group">
                      <Search className={`absolute ${lang === 'ar' ? 'right-6' : 'left-6'} top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-[#C5A059] transition-colors`} size={20} />
                      <input 
                        type="text" 
                        placeholder={lang === 'ar' ? 'البحث بالاسم أو بطاقة التعريف...' : 'Recherche par nom ou CIN...'}
                        className={`w-full bg-white border-gray-100 rounded-2xl py-4 font-bold text-slate-700 focus:ring-2 focus:ring-[#C5A059] focus:border-transparent transition-all shadow-sm ${lang === 'ar' ? 'pr-14 pl-6 text-right' : 'pl-14 pr-6 text-left'}`}
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                   </div>

                   <div className="max-h-[400px] overflow-y-auto custom-scrollbar pr-4 space-y-4">
                      {filteredEntities.length === 0 ? (
                         <div className="text-center p-12 bg-[#F8FAFC] rounded-[2rem] border-2 border-dashed border-gray-200">
                            <UserPlus size={48} className="mx-auto text-slate-300 mb-4" />
                            <h4 className="text-slate-500 font-bold mb-6">{lang === 'ar' ? 'لا توجد بيانات متاحة' : 'Aucune donnée disponible'}</h4>
                            <button 
                              onClick={() => navigate(type === 'recrutement' ? '/rh/candidates/new' : '/rh/employees/new')}
                              className="btn-primary mx-auto"
                            >
                               <Plus size={18} /> {lang === 'ar' ? 'إضافة جديد' : 'Ajouter Nouveau'}
                            </button>
                         </div>
                      ) : (
                         filteredEntities.map((entity: any) => {
                           const person = type === 'recrutement' && entity.candidat ? entity.candidat : entity;
                           const displayName = `${person.nom || person.last_name || ''} ${person.prenom || person.first_name || ''}`.trim();
                           const displayId = person.matricule || person.cin || '---';
                           
                           return (
                             <button
                               key={entity.id}
                               onClick={() => handleEntitySelect(person)}
                               className="w-full flex items-center justify-between p-6 bg-white border border-gray-100 rounded-[2rem] hover:border-[#C5A059] hover:shadow-xl transition-all group"
                             >
                                <div className="flex items-center gap-5">
                                   <div className="w-12 h-12 rounded-xl bg-[#F8FAFC] flex items-center justify-center text-[#003366] shadow-sm"><User size={20}/></div>
                                   <div className={lang === 'ar' ? 'text-right' : 'text-left'}>
                                      <h4 className="font-black text-[#003366] group-hover:text-[#006241] transition-colors">{displayName}</h4>
                                      <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{displayId}</p>
                                   </div>
                                </div>
                                <ChevronRight size={20} className={`text-slate-300 group-hover:text-[#C5A059] transition-all ${lang === 'ar' ? 'rotate-180' : ''}`} />
                             </button>
                           );
                         })
                      )}
                   </div>
                </div>
              )}

              {/* Step 2: Dynamic Form */}
              {step === 2 && (
                <div className="space-y-10 animate-fade-in">
                   <div className={`flex items-center justify-between bg-[#F8FAFC] p-6 rounded-[2rem] ${lang === 'ar' ? 'flex-row-reverse' : ''}`}>
                      <div className={`flex items-center gap-4 ${lang === 'ar' ? 'flex-row-reverse' : ''}`}>
                         <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center text-[#003366]"><Briefcase size={20}/></div>
                         <div className={lang === 'ar' ? 'text-right' : 'text-left'}>
                            <h4 className="font-black text-[#003366]">{selectedEntity?.nom || selectedEntity?.last_name} {selectedEntity?.prenom || selectedEntity?.first_name}</h4>
                            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{selectedEntity?.matricule || selectedEntity?.cin}</p>
                         </div>
                      </div>
                      <button onClick={() => setStep(1)} className="text-[10px] font-black text-[#C5A059] uppercase hover:underline">{lang === 'ar' ? 'تغيير' : 'Changer'}</button>
                   </div>
                   
                   {renderDynamicForm()}
                </div>
              )}

              {/* Step 3: PDF Preview & Review */}
              {step === 3 && (
                <div className="space-y-10 animate-fade-in">
                   <h3 className="text-xl font-black text-[#003366]">{lang === 'ar' ? 'معاينة القرار الإداري' : 'Aperçu de la Décision'}</h3>
                   
                   <div className="bg-white border-2 border-[#003366]/10 rounded-[2rem] p-12 shadow-2xl relative overflow-hidden">
                      <div className="absolute inset-0 flex items-center justify-center opacity-[0.02] pointer-events-none">
                         <ShieldCheck size={400} />
                      </div>
                      
                      <div className="relative z-10 space-y-12">
                         <div className="text-center space-y-4 border-b border-gray-100 pb-8">
                            <img src="/logo.png" alt="Royaume du Maroc" className="h-16 mx-auto opacity-80" />
                            <h2 className="text-lg font-black text-[#003366] uppercase tracking-widest">
                               Décision de {actTypes.find(a => a.id === type)?.label}
                            </h2>
                            <p className="text-xs font-bold text-slate-400">Réf: {new Date().getFullYear()}/ACT-{Math.floor(Math.random() * 1000)}</p>
                         </div>
                         
                         <div className="space-y-6">
                            <p className="text-sm text-slate-700 leading-relaxed font-medium">
                               {lang === 'ar' ? 'تم اتخاذ القرار التالي بخصوص' : 'Il a été décidé ce qui suit concernant M./Mme'} <span className="font-black text-[#003366] uppercase">{selectedEntity?.nom || selectedEntity?.last_name} {selectedEntity?.prenom || selectedEntity?.first_name}</span>, {lang === 'ar' ? 'صاحب(ة) بطاقة التعريف' : 'titulaire de la CIN'} <span className="font-black text-[#003366]">{selectedEntity?.cin}</span>:
                            </p>
                            
                            <div className="grid grid-cols-2 gap-y-6 gap-x-10 bg-[#F8FAFC] p-8 rounded-2xl border border-gray-100">
                               {Object.entries(formData).map(([key, value]: any) => (
                                 <div key={key}>
                                    <span className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{key.replace('_', ' ')}</span>
                                    <span className="font-bold text-[#003366] text-sm">{value || '---'}</span>
                                 </div>
                               ))}
                            </div>
                         </div>
                         
                         <div className="pt-12 text-right">
                            <p className="text-xs font-bold text-slate-400 mb-8">{lang === 'ar' ? 'حرر بالعرائش في' : 'Fait à Larache, le'} {new Date().toLocaleDateString()}</p>
                            <div className="w-48 h-24 border-2 border-dashed border-gray-200 rounded-xl ml-auto flex items-center justify-center">
                               <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest">{lang === 'ar' ? 'التوقيع والختم' : 'Signature & Cachet'}</span>
                            </div>
                         </div>
                      </div>
                   </div>
                </div>
              )}

              {/* Navigation Buttons */}
               <div className={`pt-10 flex justify-between mt-auto ${lang === 'ar' ? 'flex-row-reverse' : ''}`}>
                  {step > (urlType ? 1 : 0) && <button onClick={() => setStep(step - 1)} className="btn-secondary px-8"><ArrowLeft size={18} className={lang === 'ar' ? 'rotate-180' : ''}/> {lang === 'ar' ? 'رجوع' : 'Retour'}</button>}
                  {step === 2 && <button onClick={() => setStep(3)} className={`btn-primary px-12 ${lang === 'ar' ? 'mr-auto' : 'ml-auto'}`}><FileText size={18}/> {lang === 'ar' ? 'معاينة القرار' : 'Aperçu'} <ArrowRight size={18} className={lang === 'ar' ? 'rotate-180' : ''}/></button>}
                 {step === 3 && (
                    <div className={`flex gap-4 ${lang === 'ar' ? 'mr-auto' : 'ml-auto'}`}>
                      <button onClick={() => setStep(2)} className="btn-secondary px-8 text-[#C5A059]">{lang === 'ar' ? 'تعديل' : 'Modifier'}</button>
                       <button onClick={() => handleSave('validated')} disabled={loading} className="btn-primary px-10 bg-[#006241]">✅ {lang === 'ar' ? 'اعتماد وإنشاء القرار' : 'Confirmer & Générer'}</button>
                   </div>
                 )}
              </div>
           </div>
        </div>

        {/* Sidebar Info */}
        <div className="lg:col-span-4 space-y-8">
           <div className="gov-card p-10 bg-[#003366] text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
              <div className="relative z-10 space-y-6">
                 <div className="w-12 h-12 bg-[#C5A059] rounded-2xl flex items-center justify-center shadow-xl"><AlertCircle size={24}/></div>
                 <h4 className="text-xl font-black">{lang === 'ar' ? 'دليل الإجراءات' : 'Guide de Procédure'}</h4>
                 <ul className="space-y-4 text-blue-100/70 text-xs font-bold leading-relaxed">
                    <li className="flex gap-3">
                       <span className="text-[#C5A059]">•</span>
                       {lang === 'ar' ? 'اختر الموظف أو المرشح بعناية.' : 'Sélectionnez soigneusement l\'employé.'}
                    </li>
                    <li className="flex gap-3">
                       <span className="text-[#C5A059]">•</span>
                       {lang === 'ar' ? 'قم بتعبئة جميع الحقول الإلزامية لتوليد قرار قانوني صحيح.' : 'Remplissez tous les champs obligatoires.'}
                    </li>
                    <li className="flex gap-3">
                       <span className="text-[#C5A059]">•</span>
                       {lang === 'ar' ? 'النظام يحتفظ بنسخة (Versioning) لكل تعديل تقوم به لضمان الشفافية.' : 'Le système garde une version de chaque modification (Versioning).'}
                    </li>
                 </ul>
              </div>
           </div>
        </div>

      </div>
    </div>
  );
};

export default AdministrativeActForm;
