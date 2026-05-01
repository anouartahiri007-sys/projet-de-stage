import { useState, useEffect } from 'react';
import { Route, TrendingUp, Award, Target, ChevronRight, Star, Briefcase } from 'lucide-react';

const Career = () => {
  return (
    <div className="animate-slide-up space-y-6 pb-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-[var(--primary-main)] dark:text-white font-heading">Gestion de Carrière</h1>
          <p className="text-slate-500 mt-1 font-medium italic">Suivi des évolutions, promotions et parcours professionnels des agents.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="gov-card p-8 bg-gradient-to-br from-indigo-900 to-slate-900 text-white overflow-hidden relative">
          <div className="absolute top-0 right-0 p-8 opacity-10">
            <TrendingUp size={120} />
          </div>
          <h2 className="text-2xl font-bold mb-4">Plan de Promotion 2025</h2>
          <p className="text-indigo-100/70 mb-8 leading-relaxed">
            Consultez les critères d'éligibilité et les listes prévisionnelles pour les prochaines commissions paritaires.
          </p>
          <div className="flex gap-4">
            <button className="px-6 py-2.5 bg-indigo-500 hover:bg-indigo-400 rounded-xl font-bold text-sm transition-all shadow-lg shadow-indigo-900/40">
              Voir les listes
            </button>
            <button className="px-6 py-2.5 bg-white/10 hover:bg-white/20 rounded-xl font-bold text-sm transition-all border border-white/10">
              Guide pratique
            </button>
          </div>
        </div>

        <div className="gov-card p-8 flex flex-col justify-center">
          <div className="flex items-center gap-4 mb-6">
            <div className="p-3 bg-amber-50 text-amber-600 rounded-2xl"><Award size={32} /></div>
            <div>
              <h2 className="text-xl font-bold text-slate-800 dark:text-white">Médailles & Distinctions</h2>
              <p className="text-slate-500 text-xs font-medium">Reconnaissance de l'engagement et de l'ancienneté</p>
            </div>
          </div>
          <p className="text-slate-600 text-sm leading-relaxed mb-6">
            Gérez les dossiers de candidatures aux distinctions honorifiques et médailles du travail pour les agents de la commune.
          </p>
          <button className="w-full py-3 border-2 border-slate-100 hover:border-amber-200 hover:bg-amber-50 rounded-2xl text-slate-700 font-bold text-sm transition-all flex items-center justify-center gap-2">
            Ouvrir la session 2025 <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Career;
