import { useState, useEffect } from 'react';
import { FileText, FilePlus, Search, Filter, Download, Eye, Clock, FileCheck } from 'lucide-react';

const Documents = () => {
  return (
    <div className="animate-slide-up space-y-6 pb-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-[var(--primary-main)] dark:text-white font-heading">Gestion Documentaire</h1>
          <p className="text-slate-500 mt-1 font-medium italic">Archive et génération de documents administratifs pour les agents.</p>
        </div>
        <button className="btn-primary flex items-center gap-2 px-5 py-2.5 shadow-lg shadow-emerald-900/10">
          <FilePlus size={18} /> Générer un document
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-1 space-y-6">
          <div className="gov-card p-6">
            <h2 className="text-sm font-black text-slate-400 uppercase tracking-widest mb-4">Catégories</h2>
            <div className="space-y-2">
              {[
                { label: 'Attestations de travail', count: 142 },
                { label: 'Décisions de nomination', count: 58 },
                { label: 'Feuilles de notation', count: 890 },
                { label: 'Dossiers médicaux', count: 312 },
                { label: 'Actes administratifs', count: 1.200 },
              ].map((cat, i) => (
                <button key={i} className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 text-sm font-bold text-slate-600 transition-colors group">
                  <span className="group-hover:text-[var(--primary-main)]">{cat.label}</span>
                  <span className="bg-slate-100 text-slate-500 px-2 py-0.5 rounded-lg text-[10px]">{cat.count}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="lg:col-span-3">
          <div className="gov-card overflow-hidden">
            <div className="p-6 border-b border-slate-100 flex items-center justify-between">
              <h2 className="text-lg font-bold text-slate-800 dark:text-white">Documents Récents</h2>
              <div className="relative w-64">
                <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                <input placeholder="Rechercher un document..." className="form-input w-full pl-4 pr-10 text-xs" />
              </div>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-slate-50/50">
                    {['Nom du document', 'Agent', 'Date', 'Statut', 'Actions'].map(h => (
                      <th key={h} className="p-4 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {[1, 2, 3, 4, 5].map(n => (
                    <tr key={n} className="hover:bg-slate-50/30 transition-colors">
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-blue-50 text-blue-600 rounded-lg"><FileText size={18} /></div>
                          <span className="text-sm font-bold text-slate-700">Attestation de Salaire_#{n}042</span>
                        </div>
                      </td>
                      <td className="p-4 text-sm text-slate-500 font-medium">Ahmed El Mansouri</td>
                      <td className="p-4 text-xs text-slate-400 font-bold">24/04/2025</td>
                      <td className="p-4">
                        <span className="text-[10px] font-black uppercase px-2 py-1 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-100">Signé</span>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          <button className="p-2 hover:bg-slate-100 rounded-lg text-slate-400 hover:text-blue-600 transition-colors"><Eye size={16} /></button>
                          <button className="p-2 hover:bg-slate-100 rounded-lg text-slate-400 hover:text-emerald-600 transition-colors"><Download size={16} /></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Documents;
