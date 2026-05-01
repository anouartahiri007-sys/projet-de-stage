import { useState, useEffect } from 'react';
import {
  User, FileText, Search, Bell, LogOut, Activity,
  ChevronRight, Calendar, MapPin, CheckCircle,
  Clock, XCircle, Upload, Plus, Filter, Loader2
} from 'lucide-react';
import { useAuthStore } from '../lib/auth';
import { useNavigate } from 'react-router-dom';
import { api } from '../lib/api';
import { toast } from 'react-hot-toast';

const APP_STATUS = {
  pending: { label: 'En cours', color: 'text-amber-600', bg: 'bg-amber-50 border-amber-200', icon: Clock },
  accepted: { label: 'Acceptée', color: 'text-emerald-600', bg: 'bg-emerald-50 border-emerald-200', icon: CheckCircle },
  rejected: { label: 'Rejetée', color: 'text-red-600', bg: 'bg-red-50 border-red-200', icon: XCircle },
};

export default function CandidatePortal() {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'home' | 'concours' | 'mes-demandes' | 'profil'>('home');

  const [concours, setConcours] = useState<any[]>([]);
  const [candidatures, setCandidatures] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [applyingTo, setApplyingTo] = useState<number | null>(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [resConcours, resCandidatures] = await Promise.all([
        api.get('/concours'),
        api.get('/candidatures/my')
      ]);
      setConcours(resConcours.data);
      setCandidatures(resCandidatures.data);
    } catch (err) {
      toast.error('Erreur de chargement des données');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleApply = async (concoursId: number) => {
    setApplyingTo(concoursId);
    try {
      await api.post(`/concours/${concoursId}/apply`);
      toast.success('Candidature soumise avec succès !');
      fetchData(); // Refresh candidatures
    } catch (err: any) {
      toast.error(err.response?.data?.error || 'Erreur lors de la candidature');
    } finally {
      setApplyingTo(null);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans" dir="rtl">
      {/* Topbar Nav */}
      <header className="bg-white border-b border-slate-200 h-16 sticky top-0 z-50 px-4 md:px-8 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-8 h-10 bg-[#0d5e3f] rounded flex items-center justify-center font-bold text-white text-[10px]">شعار</div>
          <h1 className="font-black text-slate-800 text-sm md:text-base tracking-tight uppercase">Portail Candidat <span className="text-[#0d5e3f]">Larache</span></h1>
        </div>

        <div className="flex items-center gap-4">
          <button className="p-2 text-slate-400 hover:text-[#0d5e3f] transition-colors relative">
            <Bell size={20} />
            <span className="absolute top-1 left-1 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
          </button>

          <div className="h-8 w-[1px] bg-slate-200 mx-2"></div>

          <div className="flex items-center gap-3">
            <div className="hidden md:block text-left">
              <p className="text-xs font-black text-slate-800">{user?.name}</p>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Candidat</p>
            </div>
            <button onClick={handleLogout} className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-rose-600 hover:bg-rose-50 font-bold text-xs transition-all">
              <LogOut size={18} /> Déconnexion
            </button>
          </div>
        </div>
      </header>

      {/* Main Layout */}
      <div className="flex flex-1 max-w-[1400px] mx-auto w-full">

        {/* Sidebar */}
        <aside className="hidden lg:flex w-64 flex-col border-l border-slate-200 bg-white p-6 space-y-2 shrink-0">
          {[
            { id: 'home', label: 'Tableau de bord', icon: <Activity size={18} /> },
            { id: 'concours', label: 'Concours ouverts', icon: <Search size={18} /> },
            { id: 'mes-demandes', label: 'Mes candidatures', icon: <FileText size={18} /> },
            { id: 'profil', label: 'Mon profil & CV', icon: <User size={18} /> },
          ].map(item => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id as any)}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${activeTab === item.id ? 'bg-[#0d5e3f] text-white shadow-lg shadow-emerald-900/20' : 'text-slate-500 hover:bg-slate-50'}`}
            >
              {item.icon}
              {item.label}
            </button>
          ))}
        </aside>

        {/* Content */}
        <main className="flex-1 p-4 md:p-8 overflow-y-auto">

          {loading ? (
            <div className="flex justify-center items-center h-64">
              <Loader2 className="animate-spin text-[#0d5e3f]" size={48} />
            </div>
          ) : (
            <div className="w-full">
              {activeTab === 'home' && (
                <div className="space-y-8 animate-slide-up">
                  <section className="bg-gradient-to-br from-[#1E3E6E] to-[#3466A4] rounded-[2rem] p-8 text-white relative overflow-hidden shadow-xl">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                    <div className="relative z-10">
                      <h2 className="text-3xl font-black mb-3">Bonjour, {user?.name?.split(' ')[0]}</h2>
                      <p className="text-slate-300 text-lg max-w-2xl font-medium">Bienvenue sur votre portail candidat sécurisé. Découvrez les concours ouverts et suivez l'avancement de vos candidatures en temps réel.</p>
                    </div>
                  </section>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {[
                      { label: 'Candidatures actives', value: candidatures.filter(a => a.status === 'pending').length, color: 'amber' },
                      { label: 'Concours disponibles', value: concours.length, color: 'blue' },
                      { label: 'Acceptées', value: candidatures.filter(a => a.status === 'accepted').length, color: 'emerald' },
                    ].map((stat, i) => (
                      <div key={i} className="gov-card p-6 flex flex-col">
                        <p className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-1">{stat.label}</p>
                        <p className={`text-4xl font-black text-${stat.color}-600`}>{stat.value}</p>
                      </div>
                    ))}
                  </div>

                  <section className="space-y-6">
                    <div className="flex items-center justify-between">
                      <h3 className="text-xl font-extrabold text-[#0d5e3f] dark:text-white font-heading">Activités Récentes</h3>
                    </div>
                    {candidatures.length === 0 ? (
                      <div className="gov-card p-8 text-center bg-slate-50/50 border-dashed border-2">
                        <p className="font-bold text-slate-400">Aucune activité récente à afficher.</p>
                        <button onClick={() => setActiveTab('concours')} className="mt-3 text-[#3466A4] font-semibold text-sm hover:underline">Explorer les opportunités</button>
                      </div>
                    ) : (
                      <div className="gov-card p-6 divide-y divide-slate-100">
                        {candidatures.slice(0, 3).map(app => (
                          <div key={app.id} className="py-4 first:pt-0 last:pb-0 flex items-center justify-between">
                            <div>
                              <p className="font-bold text-slate-800">{app.concours?.title}</p>
                              <p className="text-xs text-slate-500">Soumise le {new Date(app.created_at).toLocaleDateString()}</p>
                            </div>
                            <span className={`text-xs font-bold px-3 py-1 rounded-full border ${APP_STATUS[app.status as keyof typeof APP_STATUS]?.bg} ${APP_STATUS[app.status as keyof typeof APP_STATUS]?.color}`}>
                              {APP_STATUS[app.status as keyof typeof APP_STATUS]?.label}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}
                  </section>
                </div>
              )}

              {activeTab === 'concours' && (
                <div className="space-y-8 animate-slide-up">
                  <div>
                    <h2 className="text-3xl font-black text-[#0d5e3f] dark:text-white tracking-tight">Concours Ouverts</h2>
                    <p className="text-slate-500 mt-1 font-medium italic">Découvrez les opportunités et rejoignez la commune.</p>
                  </div>

                  <div className="flex flex-col md:flex-row gap-4">
                    <div className="relative flex-1">
                      <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                      <input placeholder="Rechercher par titre ou service..." className="form-input w-full pl-4 pr-12 h-12 text-sm" />
                    </div>
                    <button className="flex items-center justify-center gap-2 px-6 h-12 bg-white border border-slate-200 rounded-2xl font-bold text-slate-600 hover:bg-slate-50 transition-colors">
                      <Filter size={18} /> Filtres
                    </button>
                  </div>

                  {concours.length === 0 ? (
                    <div className="gov-card p-20 text-center">
                      <Search size={48} className="mx-auto text-slate-200 mb-6" />
                      <h3 className="text-2xl font-extrabold text-[#0d5e3f] dark:text-white mb-2">Aucun concours trouvé</h3>
                      <p className="text-slate-500 max-w-md mx-auto font-medium">Il n'y a actuellement aucun concours ouvert correspondant à votre recherche. Revenez plus tard !</p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {concours.map(c => {
                        const hasApplied = candidatures.some(a => a.concours_id === c.id);
                        return (
                          <div key={c.id} className="gov-card p-6 hover:border-[#0d5e3f] transition-all group flex flex-col justify-between">
                            <div>
                              <div className="flex justify-between items-start mb-4">
                                <span className={`text-[10px] font-black uppercase px-2 py-1 rounded-lg border tracking-widest ${c.status === 'open' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-red-50 text-red-600 border-red-100'}`}>
                                  {c.status === 'open' ? 'Ouvert' : 'Fermé'}
                                </span>
                                <span className="text-[10px] font-bold text-slate-400">Réf: #{c.id}</span>
                              </div>
                              <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-2 group-hover:text-[#0d5e3f] transition-colors">{c.title}</h3>

                              <div className="space-y-2 mb-6 mt-4">
                                <div className="flex items-center gap-2 text-xs text-slate-600 font-medium">
                                  <Calendar size={14} className="text-slate-300" /> Ouvert le : {new Date(c.publication_date).toLocaleDateString('fr-MA')}
                                </div>
                                <div className="flex items-center gap-2 text-xs text-rose-500 font-bold">
                                  <Clock size={14} /> Clôture : {new Date(c.closing_date).toLocaleDateString('fr-MA')}
                                </div>
                                <div className="flex items-center gap-2 text-xs text-slate-600 font-medium">
                                  <User size={14} className="text-slate-300" /> Postes : {c.positions_available}
                                </div>
                              </div>
                            </div>

                            <div className="pt-4 border-t border-slate-50 flex items-center justify-between">
                              <button className="text-sm font-bold text-slate-500 hover:text-[#0d5e3f] dark:text-white transition-colors">Détails</button>
                              {hasApplied ? (
                                <span className="flex items-center gap-1.5 text-xs font-bold text-emerald-600 bg-emerald-50 px-4 py-2 rounded-xl border border-emerald-100">
                                  <CheckCircle size={16} /> Déjà postulé
                                </span>
                              ) : c.status === 'open' ? (
                                <button
                                  onClick={() => handleApply(c.id)}
                                  disabled={applyingTo === c.id}
                                  className="bg-[#0d5e3f] text-white px-6 py-2.5 rounded-xl font-bold text-sm shadow-lg shadow-emerald-900/10 hover:scale-[1.03] active:scale-95 transition-all disabled:opacity-50"
                                >
                                  {applyingTo === c.id ? <Loader2 className="animate-spin inline" size={16} /> : 'Postuler'}
                                </button>
                              ) : (
                                <span className="text-sm font-bold text-red-500">Concours fermé</span>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              )}

              {activeTab === 'mes-demandes' && (
                <div className="space-y-8 animate-slide-up">
                  <div>
                    <h2 className="text-3xl font-black text-[#0d5e3f] dark:text-white tracking-tight">Mes Candidatures</h2>
                    <p className="text-slate-500 mt-1 font-medium italic">Suivez l'état d'avancement de vos dossiers.</p>
                  </div>

                  <div className="space-y-4">
                    {candidatures.length === 0 ? (
                      <div className="gov-card p-12 text-center text-slate-500 font-bold">
                        Aucune candidature trouvée.
                      </div>
                    ) : candidatures.map(app => {
                      const statusInfo = APP_STATUS[app.status as keyof typeof APP_STATUS] || APP_STATUS.pending;
                      const StatusIcon = statusInfo.icon;
                      return (
                        <div key={app.id} className="gov-card p-6 flex flex-col md:flex-row items-center gap-6 group hover:border-slate-200 transition-all">
                          <div className={`w-16 h-16 rounded-2xl flex items-center justify-center shrink-0 border ${statusInfo.bg}`}>
                            <StatusIcon size={32} className={statusInfo.color} />
                          </div>

                          <div className="flex-1 text-right md:text-right">
                            <div className="flex flex-wrap items-center gap-3 mb-1">
                              <h3 className="text-lg font-extrabold text-[#0d5e3f] dark:text-white">{app.concours?.title || 'Concours non trouvé'}</h3>
                              <span className={`text-[9px] font-black uppercase px-2.5 py-1 rounded-full border ${statusInfo.bg} ${statusInfo.color}`}>
                                {statusInfo.label}
                              </span>
                            </div>
                            <div className="flex flex-wrap items-center gap-4 text-xs font-bold text-slate-400">
                              <span>Appliqué le: {new Date(app.created_at).toLocaleDateString('fr-MA')}</span>
                              {app.concours?.closing_date && (
                                <span>Clôture: {new Date(app.concours.closing_date).toLocaleDateString('fr-MA')}</span>
                              )}
                              <span>Réf: APP-{app.id}</span>
                            </div>
                          </div>

                          <div className="shrink-0">
                            <button className="flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-indigo-600 transition-colors uppercase tracking-widest">
                              Voir les détails <ChevronRight size={14} />
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {activeTab === 'profil' && (
                <div className="space-y-8 animate-slide-up pb-12">
                  <div>
                    <h2 className="text-3xl font-black text-[#0d5e3f] dark:text-white tracking-tight">Mon Profil</h2>
                    <p className="text-slate-500 mt-1 font-medium italic">Gérez vos informations personnelles et vos documents.</p>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 space-y-6">
                      {/* Basic Info */}
                      <div className="gov-card p-8">
                        <h3 className="text-xl font-extrabold text-[#0d5e3f] dark:text-white mb-6 border-b border-slate-100 pb-4">Informations Générales</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">CIN / Passport</label>
                            <p className="font-semibold text-slate-800 text-lg">{user?.cin || 'Non renseigné'}</p>
                          </div>
                          <div>
                            <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">Téléphone</label>
                            <p className="font-semibold text-slate-800 text-lg">Non renseigné</p>
                          </div>
                          <div className="md:col-span-2">
                            <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">Adresse</label>
                            <p className="font-semibold text-slate-800 text-lg">Non renseignée</p>
                          </div>
                        </div>
                        <button className="mt-8 px-6 py-2.5 bg-slate-100 text-slate-700 rounded-xl font-bold text-sm hover:bg-slate-200 transition-all">Modifier les infos</button>
                      </div>

                      {/* Cursus */}
                      <div className="gov-card p-8">
                        <div className="flex items-center justify-between mb-6 border-b border-slate-100 pb-4">
                          <h3 className="text-xl font-extrabold text-[#0d5e3f] dark:text-white">Parcours & Diplômes</h3>
                          <button className="text-[#0d5e3f] hover:bg-emerald-50 p-2 rounded-lg transition-all"><Plus size={20} /></button>
                        </div>
                        <div className="text-center py-8">
                          <FileText size={48} className="mx-auto text-slate-100 mb-4" />
                          <p className="font-bold text-slate-500 text-sm">Aucun diplôme renseigné.</p>
                          <p className="text-slate-400 text-xs mt-1 font-medium">Ajoutez votre parcours académique pour renforcer votre candidature.</p>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-6">
                      {/* CV Upload */}
                      <div className="gov-card p-8 bg-white text-center">
                        <h3 className="text-lg font-bold text-slate-800 mb-6">Mon CV Principal</h3>
                        <div className="border-2 border-dashed border-slate-200 rounded-3xl p-8 mb-6 bg-slate-50 group hover:border-[#0d5e3f] hover:bg-emerald-50 transition-all cursor-pointer">
                          <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-slate-400 mx-auto mb-4 shadow-sm group-hover:scale-110 group-hover:text-[#0d5e3f] transition-all">
                            <Upload size={28} />
                          </div>
                          <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Glissez votre CV ici</p>
                          <p className="text-[10px] text-slate-400 mt-2 font-medium">Format PDF (Max 5MB)</p>
                        </div>
                        <div className="p-4 bg-emerald-50 border border-emerald-100 rounded-2xl flex items-center gap-3">
                          <div className="p-2 bg-white rounded-xl text-emerald-600"><FileText size={18} /></div>
                          <div className="text-right">
                            <p className="text-xs font-bold text-slate-700 truncate w-32">CV_Alaoui_2024.pdf</p>
                            <p className="text-[10px] text-emerald-600/70 font-bold uppercase tracking-widest">Mis à jour le 12/04/2026</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
