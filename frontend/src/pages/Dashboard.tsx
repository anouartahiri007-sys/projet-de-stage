import { useState, useEffect } from 'react';
import {
  Users, Activity, ClipboardList, Shield,
  ArrowUpRight, ArrowDownRight, Clock,
  FileText, Award, Star, Bell, ChevronRight,
  TrendingUp, Calendar
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const UserPlus = ({ size, className }: { size: number, className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><line x1="19" x2="19" y1="8" y2="14" /><line x1="22" x2="16" y1="11" y2="11" /></svg>
);

const RECENT_ACTIVITIES = [
  {
    id: 1, name: 'Dr. Youssef Fassi', desc: 'Promotion à l\'échelon 4 approuvée',
    time: 'Il y a 2h', tag: 'Carrière', tagColor: 'text-emerald-700 bg-emerald-50 border-emerald-100',
    icon: <Award size={14} />
  },
  {
    id: 2, name: 'Service de Médecine', desc: '12 nouveaux arrêtés générés',
    time: 'Il y a 5h', tag: 'Documents', tagColor: 'text-blue-700 bg-blue-50 border-blue-100',
    icon: <FileText size={14} />
  },
  {
    id: 3, name: 'Direction de l\'Hôpital', desc: 'Recrutement de 5 infirmiers lancé',
    time: 'Hier', tag: 'Recrutement', tagColor: 'text-amber-700 bg-amber-50 border-amber-100',
    icon: <UserPlus size={14} />
  },
  {
    id: 4, name: 'Admin Système', desc: 'Synchronisation de la base de données terminée',
    time: 'Il y a 2 jours', tag: 'Système', tagColor: 'text-slate-600 bg-slate-100 border-slate-200',
    icon: <Shield size={14} />
  }
];



import { useAuthStore } from '../lib/auth';

const Dashboard = () => {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const currentHour = new Date().getHours();
  const greeting = currentHour < 12 ? 'Bonjour' : currentHour < 18 ? 'Bon après-midi' : 'Bonsoir';

  const stats = [
    { label: 'Effectif Total', value: '1,284', trend: '+12', color: 'emerald', icon: <Users size={20} /> },
    { label: 'Consultations', value: '342', trend: '+5.4%', color: 'blue', icon: <Activity size={20} /> },
    { label: 'Documents Signés', value: '89', trend: '-2', color: 'amber', icon: <ClipboardList size={20} /> },
    { label: 'Recrutements', value: '15', trend: '+3', color: 'purple', icon: <UserPlus size={20} /> },
  ];

  const quickActions = [
    { icon: <FileText size={22} strokeWidth={1.5} />, label: 'Nouvel arrêté', onClick: () => navigate('/documents') },
    { icon: <Users size={22} strokeWidth={1.5} />, label: 'Répertoire personnel', onClick: () => navigate('/rh/employees') },
    { icon: <Calendar size={22} strokeWidth={1.5} />, label: 'Calendrier congés', onClick: () => navigate('/rh/leave-calendar') },
    { icon: <Award size={22} strokeWidth={1.5} />, label: 'Carrière & Promo', onClick: () => navigate('/rh/promotions') },
  ];

  return (
    <div className="animate-slide-up space-y-8 pb-12">

      {/* --- HERO / WELCOME --- */}
      <section className="bg-gradient-to-br from-[var(--primary-main)] to-[#1E3E6E] rounded-[2rem] p-8 md:p-12 text-white relative overflow-hidden shadow-2xl shadow-emerald-900/20">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>

        <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 backdrop-blur-md rounded-full text-xs font-bold uppercase tracking-wider mb-4 border border-white/10">
              <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></span>
              Système de Gestion des Ressources Humaines
            </div>
            <h1 className="text-4xl md:text-5xl font-black mb-2 tracking-tight">
              {greeting}, <span className="text-emerald-300">{user?.name || 'مستخدم'}</span>
            </h1>
            <p className="text-emerald-50/70 text-lg font-medium max-w-xl leading-relaxed">
              Commune de Larache — Médecins, Infirmiers & Vétérinaires
            </p>
          </div>
          <div className="bg-white/10 backdrop-blur-md p-4 rounded-3xl border border-white/20 flex items-center gap-4">
            <div className="text-right">
              <p className="text-[10px] font-black uppercase tracking-widest text-emerald-200">Statut Serveur</p>
              <span className="text-emerald-300 text-xs font-semibold">Système opérationnel</span>
            </div>
            <div className="w-12 h-12 bg-emerald-500 rounded-2xl flex items-center justify-center shadow-lg shadow-emerald-900/40">
              <Activity size={24} />
            </div>
          </div>
        </div>
      </section>

      {/* --- STATS GRID --- */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <div key={i} className="gov-card p-6 flex flex-col group hover:scale-[1.03] transition-transform">
            <div className="flex items-center justify-between mb-4">
              <div className={`p-4 rounded-2xl bg-${stat.color}-50 text-${stat.color}-600 group-hover:rotate-12 transition-transform`}>
                {stat.icon}
              </div>
              <div className={`flex items-center gap-1 text-xs font-black ${stat.trend.startsWith('+') ? 'text-emerald-600' : 'text-rose-500'}`}>
                {stat.trend.startsWith('+') ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                {stat.trend}
              </div>
            </div>
            <p className="text-xs font-bold text-slate-500 uppercase tracking-[0.15em] mb-1">{stat.label}</p>
            <p className="text-3xl font-black text-slate-800 dark:text-white">{stat.value}</p>
          </div>
        ))}
      </section>

      {/* --- MAIN CONTENT GRID --- */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

        {/* RECENT ACTIVITY */}
        <section className="lg:col-span-8 gov-card overflow-hidden">
          <div className="p-8 border-b border-slate-100 flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-[var(--primary-main)] dark:text-white font-heading">Activités récentes</h2>
              <p className="text-xs text-slate-500 font-bold uppercase tracking-widest mt-1">Dernières 48 heures</p>
            </div>
            <button className="text-sm font-bold text-[#3466A4] hover:underline flex items-center gap-1">
              Tout voir <ChevronRight size={16} />
            </button>
          </div>
          <div className="divide-y divide-slate-50">
            {RECENT_ACTIVITIES.map(activity => (
              <div key={activity.id} className="p-6 hover:bg-slate-50/50 transition-colors flex items-start gap-6 group">
                <div className={`w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 border border-slate-100 shadow-sm transition-transform group-hover:scale-110`}>
                  {activity.icon}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="font-bold text-slate-800 dark:text-white">{activity.name}</h3>
                    <span className="text-[10px] text-slate-400 font-bold uppercase">{activity.time}</span>
                  </div>
                  <p className="text-sm text-slate-500 font-medium">{activity.desc}</p>
                </div>
                <span className={`text-[9px] font-black uppercase px-2.5 py-1 rounded-full border ${activity.tagColor}`}>
                  {activity.tag}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* QUICK ACCESS & ANALYTICS */}
        <section className="lg:col-span-4 space-y-8">
          <div className="gov-card p-8">
            <h2 className="text-xl font-bold text-[var(--primary-main)] dark:text-white font-heading mb-5">Accès rapides</h2>
            <div className="grid grid-cols-2 gap-4">
              {quickActions.map((action, i) => (
                <button
                  key={i}
                  onClick={action.onClick}
                  className="flex flex-col items-center justify-center p-6 rounded-3xl border border-slate-100 bg-slate-50/50 hover:bg-emerald-50 hover:border-emerald-200 hover:text-emerald-700 transition-all group"
                >
                  <div className="mb-3 text-slate-400 group-hover:text-emerald-600 transition-colors">
                    {action.icon}
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-widest text-center leading-tight">
                    {action.label}
                  </span>
                </button>
              ))}
            </div>
          </div>

          <div className="gov-card p-8 bg-[#1E3E6E] text-white relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700"></div>
            <div className="flex items-center gap-3 mb-6">
              <TrendingUp size={20} className="text-emerald-400" />
              <h2 className="text-lg font-bold">Aperçu Analytique</h2>
            </div>
            <div className="space-y-6">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs font-bold text-slate-300">Larache, porte de la Méditerranée</span>
                  <span className="text-xs font-black text-emerald-400">+12%</span>
                </div>
                <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                  <div className="w-3/4 h-full bg-emerald-500 rounded-full"></div>
                </div>
              </div>
              <p className="text-[11px] text-slate-300 leading-relaxed font-medium">
                Productivité RH en hausse de <span className="text-emerald-400 font-bold">+12%</span> ce trimestre grâce à la dématérialisation des arrêtés.
              </p>
              <button onClick={() => navigate('/rh/reports')} className="w-full py-3 bg-white/10 hover:bg-white/20 rounded-xl text-xs font-black uppercase tracking-[0.15em] transition-all border border-white/10">
                Consulter les rapports
              </button>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
};

export default Dashboard;
