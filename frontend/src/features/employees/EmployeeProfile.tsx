import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, Mail, Phone, MapPin, 
  Award, Calendar, TrendingUp, ShieldCheck,
  Download, Edit3, Trash2, CheckCircle, 
  XCircle, AlertCircle, Loader2, User, FileText,
  ChevronRight, Clock as ClockIcon
} from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { toast } from 'react-hot-toast';

const EmployeeProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('dossier');
  const [editData, setEditData] = useState<any>(null);

  const { data: employee, isLoading, isError } = useQuery({
    queryKey: ['employee', id],
    queryFn: async () => {
      const res = await axios.get(`http://localhost:8000/api/fonctionnaires/${id}`);
      return res.data;
    },
    enabled: !!id
  });

  const timeline = [
    { name: 'initiated',             label: 'Promotion initiée',               status: 'completed', date: 'Oct 12, 2024' },
    { name: 'regional_review',       label: 'Revue Directorate Régionale',      status: 'completed', date: 'Oct 20, 2024' },
    { name: 'ministerial_approval',  label: 'Approbation Ministérielle',       status: 'current' },
    { name: 'ministry_finalization', label: 'Finalisation Ministère',           status: 'upcoming' },
    { name: 'realized',              label: 'Promotion Réalisée',               status: 'upcoming' },
  ];

  if (isLoading) return (
    <div className="h-[60vh] flex flex-col items-center justify-center">
      <Loader2 className="animate-spin text-blue-600 mb-4" size={40} />
      <p className="text-[#152C4D] font-bold">Chargement du dossier agent...</p>
    </div>
  );

  if (isError || !employee) return (
    <div className="h-[60vh] flex flex-col items-center justify-center text-center">
      <div className="w-16 h-16 bg-rose-50 text-rose-500 rounded-2xl flex items-center justify-center mb-6">
        <AlertCircle size={32} />
      </div>
      <button onClick={() => navigate('/rh/employees')} className="flex items-center gap-2 text-blue-600 font-bold mb-4 hover:underline">
        <ArrowLeft size={18} /> Retour au répertoire
      </button>
      <p className="font-bold text-lg text-slate-800">Dossier de l'agent non trouvé</p>
      <p className="text-sm text-slate-400 mt-1 font-medium">Vérifiez que l'API est disponible ou que l'ID est correct.</p>
    </div>
  );

  const tabs = [
    { key: 'dossier',    label: 'Dossier Administratif', icon: <User size={16} /> },
    { key: 'carriere',   label: 'Carrière',   icon: <TrendingUp size={16} /> },
    { key: 'documents',  label: 'Documents',  icon: <FileText size={16} /> },
    { key: 'historique', label: 'Historique', icon: <ClockIcon size={16} /> },
  ];

  return (
    <div className="animate-slide-up space-y-8 pb-20">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div className="flex items-center gap-6">
          <div className="w-24 h-24 rounded-[2rem] bg-gradient-to-br from-blue-600 to-indigo-700 flex items-center justify-center text-white font-black text-3xl shadow-xl shadow-blue-900/20">
            {employee.name.charAt(0)}
          </div>
          <div>
            <button onClick={() => navigate('/rh/employees')} className="flex items-center gap-2 text-slate-400 font-bold text-xs mb-3 hover:text-blue-600 transition-colors uppercase tracking-widest">
              <ArrowLeft size={16} /> Retour au répertoire du personnel
            </button>
            <h1 className="text-4xl font-black text-[#152C4D] tracking-tight">{employee.name}</h1>
            <p className="text-blue-600 text-lg mt-1 font-bold">{employee.grade || 'Grade non défini'}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <span className={`text-xs font-black uppercase px-4 py-2 rounded-xl border-2 ${
            employee.status === 'active' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' : 
            employee.status === 'conge' ? 'bg-amber-50 text-amber-700 border-amber-100' : 
            'bg-slate-50 text-slate-400 border-slate-100'
          }`}>
            {employee.status === 'active' ? '● Actif' : employee.status === 'conge' ? '● En congé' : '● Retraité'}
          </span>
          <button className="p-3 bg-white border-2 border-slate-100 rounded-xl text-slate-400 hover:text-blue-600 hover:border-blue-100 transition-all shadow-sm">
            <Edit3 size={20} />
          </button>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex bg-white p-1.5 rounded-2xl border-2 border-slate-100 w-fit">
        {tabs.map(tab => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold transition-all ${activeTab === tab.key ? 'bg-[#152C4D] text-white shadow-lg' : 'text-slate-400 hover:text-slate-600'}`}
          >
            {tab.icon}
            {tab.label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column */}
        <div className="lg:col-span-8 space-y-8">
          
          {activeTab === 'dossier' && (
            <div className="gov-card p-8">
              <h3 className="text-xl font-bold text-[#152C4D] mb-8 flex items-center gap-3">
                <ShieldCheck size={22} className="text-blue-600" />
                Informations administratives
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
                <ProfileField label="Matricule / CIN" value={employee.cin} icon={<Award size={16} />} />
                <ProfileField label="Email professionnel" value={employee.email} icon={<Mail size={16} />} />
                <ProfileField label="Téléphone" value={employee.phone} icon={<Phone size={16} />} />
                <ProfileField label="Adresse" value={employee.address} icon={<MapPin size={16} />} />
                <ProfileField label="Département" value={employee.department} icon={<MapPin size={16} />} />
                <ProfileField label="Date de recrutement" value={employee.hiring_date} icon={<Calendar size={16} />} />
              </div>
            </div>
          )}

          {activeTab === 'carriere' && (
            <div className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <StatCard icon={<Award size={24} className="text-blue-500" />}    label="Échelon actuel"   value="Échelon 3" bg="bg-blue-50" />
                <StatCard icon={<TrendingUp size={24} className="text-emerald-500" />} label="Dernière Notation" value="18.5/20"  bg="bg-emerald-50" />
                <StatCard icon={<Calendar size={24} className="text-purple-500" />} label="Années de service" value="8 ans"     bg="bg-purple-50" />
              </div>

              <div className="gov-card p-8">
                <h3 className="text-xl font-bold text-[#152C4D] mb-8">Processus de Promotion en cours</h3>
                <div className="relative">
                  <div className="absolute top-0 bottom-0 right-4 w-[2px] bg-slate-100"></div>
                  <div className="space-y-10">
                    {timeline.map((item, i) => (
                      <div key={i} className="relative flex items-center gap-8 group">
                        <div className={`w-8 h-8 rounded-full border-4 border-white shadow-md z-10 shrink-0 transition-transform group-hover:scale-125 ${
                          item.status === 'completed' ? 'bg-emerald-500' : item.status === 'current' ? 'bg-blue-500 animate-pulse' : 'bg-slate-200'
                        }`}></div>
                        <div className="flex-1 text-right">
                          <p className={`font-bold text-sm ${item.status === 'completed' ? 'text-emerald-600' : 'text-slate-800'}`}>{item.label}</p>
                          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{item.date || 'En attente'}</p>
                        </div>
                        {item.status === 'current' && (
                          <button className="flex items-center gap-2 text-[10px] font-black uppercase text-blue-600 bg-blue-50 px-3 py-1.5 rounded-full border border-blue-100 hover:bg-blue-600 hover:text-white transition-all">
                            <CheckCircle size={16} /> Approuver l'étape (Admin)
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'documents' && (
            <div className="gov-card p-8">
              <h3 className="text-xl font-bold text-[#152C4D] mb-8">Archive des documents</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { name: 'Arrêté de recrutement', date: '2016-01-15', status: 'disponible' },
                  { name: 'Feuille de notation 2024', date: '2024-12-10', status: 'disponible' },
                  { name: 'Attestation de travail', date: '2025-02-01', status: 'disponible' },
                  { name: 'Contrat de promotion — Échelon 3', date: '2023-07-01', status: 'en_attente' },
                ].map((doc, i) => (
                  <div key={i} className="flex items-center justify-between p-4 rounded-2xl border-2 border-slate-50 hover:border-blue-100 hover:bg-blue-50/20 transition-all group">
                    <div className="flex items-center gap-4">
                      <div className="p-2.5 bg-white border border-slate-100 rounded-xl text-slate-400 shadow-sm group-hover:scale-110 transition-transform">
                        <FileText size={20} />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-slate-800">{doc.name}</p>
                        <p className="text-[10px] text-slate-400 font-bold uppercase">{doc.date}</p>
                      </div>
                    </div>
                    {doc.status === 'disponible' ? (
                      <button className="text-xs text-blue-600 hover:underline font-bold uppercase tracking-widest">Télécharger</button>
                    ) : (
                      <span className="text-[9px] font-black text-amber-600 uppercase bg-amber-50 px-2 py-1 rounded-lg">En attente</span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Column */}
        <div className="lg:col-span-4 space-y-8">
          <div className="gov-card p-8">
            <h3 className="text-lg font-bold text-[#152C4D] mb-6">Actions rapides</h3>
            <div className="space-y-3">
              <QuickAction label="Générer Attestation de travail" color="blue" />
              <QuickAction label="Générer Attestation de salaire" color="indigo" />
              <QuickAction label="Déclarer un départ en congé" color="amber" />
              <div className="pt-4 border-t border-slate-100">
                <button className="w-full flex items-center justify-center gap-2 py-3 bg-rose-50 text-rose-600 rounded-2xl font-bold text-sm hover:bg-rose-600 hover:text-white transition-all">
                  <Trash2 size={18} /> Supprimer le dossier
                </button>
              </div>
            </div>
          </div>

          <div className="gov-card p-8 bg-slate-50 border-dashed border-2 border-slate-200">
            <h3 className="text-sm font-black text-slate-400 uppercase tracking-widest mb-6">Activités Récentes</h3>
            <div className="space-y-6">
              {[
                { label: 'Promotion à l\'échelon 3 approuvée', by: 'Direction RH', date: 'Oct 2023', icon: <CheckCircle size={16} className="text-emerald-500" /> },
                { label: 'Mise à jour des coordonnées personnelles', by: 'Admin Système', date: 'Juin 2023', icon: <Edit3 size={16} className="text-blue-500" /> },
                { label: 'Congé annuel accordé (30 jours)', by: 'Direction RH', date: 'Juil 2022', icon: <AlertCircle size={16} className="text-amber-500" /> },
              ].map((act, i) => (
                <div key={i} className="flex gap-4">
                  <div className="shrink-0 mt-1">{act.icon}</div>
                  <div>
                    <p className="text-xs font-bold text-slate-800 leading-tight">{act.label}</p>
                    <p className="text-[10px] text-slate-400 font-medium mt-1">{act.by} • {act.date}</p>
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

// --- SUB COMPONENTS ---

const ProfileField = ({ label, value, icon }: any) => (
  <div className="space-y-1.5 group">
    <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] px-1 flex items-center gap-2">
      {icon} {label}
    </label>
    <div className="px-4 py-3 bg-slate-50 border-2 border-slate-50 group-hover:border-blue-100 group-hover:bg-white transition-all rounded-2xl font-bold text-slate-700">
      {value || <span className="text-slate-300 font-normal italic">Non renseigné</span>}
    </div>
  </div>
);

const StatCard = ({ icon, label, value, bg }: any) => (
  <div className="bg-white p-6 rounded-3xl border-2 border-slate-50 shadow-sm flex items-center gap-5 hover:scale-[1.03] transition-all">
    <div className={`p-4 rounded-2xl ${bg}`}>{icon}</div>
    <div className="text-right">
      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">{label}</p>
      <p className="text-xl font-black text-[#152C4D]">{value}</p>
    </div>
  </div>
);

const QuickAction = ({ label, color }: any) => (
  <button className={`w-full text-right px-4 py-3 bg-${color}-50 text-${color}-700 rounded-2xl font-bold text-sm border-2 border-transparent hover:border-${color}-200 transition-all flex items-center justify-between group`}>
    {label}
    <ChevronRight size={18} className={`group-hover:translate-x-1 transition-transform`} />
  </button>
);

const Clock = ({ size, className }: { size: number, className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
);

export default EmployeeProfile;
