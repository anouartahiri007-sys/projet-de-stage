import { useState } from 'react'
import { PawPrint, Plus, MapPin, Phone, CheckCircle, AlertTriangle, ChevronRight, Stethoscope } from 'lucide-react'

const VETS = [
  { id: 1, name: 'Dr. Khalid Ziani', specialite: 'Bovins & Ovins', zone: 'Nord Larache', phone: '+212 661-112233', status: 'actif', interventions_mois: 24 },
  { id: 2, name: 'Dr. Amal Bensaid', specialite: 'Animaux de compagnie', zone: 'Centre Ville', phone: '+212 662-223344', status: 'actif', interventions_mois: 18 },
  { id: 3, name: 'Dr. Rachid Mezouz', specialite: 'Hygiène alimentaire', zone: 'Marché Municipal', phone: '+212 663-334455', status: 'conge', interventions_mois: 0 },
]

const INTERVENTIONS = [
  { id: 1, type: 'Inspection sanitaire', lieu: 'Marché Municipal', date: '2025-04-22', vet: 'Dr. Khalid Ziani', result: 'conforme' },
  { id: 2, type: 'Vaccination bovine', lieu: 'Ferme El Khattabi', date: '2025-04-20', vet: 'Dr. Amal Bensaid', result: 'effectuee' },
  { id: 3, type: 'Contrôle abattoir', lieu: 'Abattoir Municipal', date: '2025-04-18', vet: 'Dr. Khalid Ziani', result: 'non_conforme' },
]

const resultCfg: any = {
  conforme: { label: 'Conforme', cls: 'bg-emerald-50 text-emerald-700 border-emerald-100' },
  effectuee: { label: 'Effectuée', cls: 'bg-blue-50 text-blue-700 border-blue-100' },
  non_conforme: { label: 'Non conforme', cls: 'bg-red-50 text-red-700 border-red-100' },
}

export default function Veterinary() {
  const [tab, setTab] = useState<'vets' | 'interventions'>('vets')

  return (
    <div className="animate-slide-up space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-extrabold text-[#152C4D] font-heading">Service Vétérinaire</h1>
          <p className="text-slate-500 mt-1">Gestion des vétérinaires et des interventions de la commune de Larache.</p>
        </div>
        <button className="btn-primary flex items-center gap-2"><Plus size={17} /> Nouvelle intervention</button>
      </div>

      <div className="grid grid-cols-4 gap-4">
        {[
          { label: 'Vétérinaires actifs', value: VETS.filter(v => v.status === 'actif').length, icon: <PawPrint size={20} className="text-teal-500" />, bg: 'bg-teal-50' },
          { label: 'Interventions ce mois', value: INTERVENTIONS.length, icon: <Stethoscope size={20} className="text-blue-500" />, bg: 'bg-blue-50' },
          { label: 'Inspections conformes', value: INTERVENTIONS.filter(i => i.result === 'conforme' || i.result === 'effectuee').length, icon: <CheckCircle size={20} className="text-emerald-500" />, bg: 'bg-emerald-50' },
          { label: 'Non conformités', value: INTERVENTIONS.filter(i => i.result === 'non_conforme').length, icon: <AlertTriangle size={20} className="text-red-500" />, bg: 'bg-red-50' },
        ].map((k, i) => (
          <div key={i} className="gov-card p-5 flex items-center gap-4">
            <div className={`w-11 h-11 ${k.bg} rounded-xl flex items-center justify-center`}>{k.icon}</div>
            <div>
              <p className="text-xs font-semibold text-slate-500 leading-tight">{k.label}</p>
              <p className="text-2xl font-extrabold text-[#152C4D]">{k.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="flex gap-1 bg-white rounded-2xl p-1 shadow-sm border border-slate-100 w-fit">
        {[{ key: 'vets', label: 'Équipe vétérinaire' }, { key: 'interventions', label: 'Interventions & Inspections' }].map(t => (
          <button key={t.key} onClick={() => setTab(t.key as any)}
            className={`px-5 py-2.5 rounded-xl text-sm font-bold transition-all ${tab === t.key ? 'bg-[#152C4D] text-white shadow-sm' : 'text-slate-500 hover:text-[#152C4D]'}`}>
            {t.label}
          </button>
        ))}
      </div>

      {tab === 'vets' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {VETS.map(vet => (
            <div key={vet.id} className="gov-card p-6 hover:-translate-y-1 transition-transform">
              <div className="flex items-center gap-4 mb-4 pb-4 border-b border-slate-100">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#0D9488] to-[#10B981] flex items-center justify-center text-white font-bold text-xl shadow-md">
                  {vet.name.charAt(3)}
                </div>
                <div>
                  <h3 className="font-extrabold text-[#152C4D]">{vet.name}</h3>
                  <p className="text-sm text-slate-500 mt-0.5">{vet.specialite}</p>
                  <span className={`inline-block mt-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold ${vet.status === 'actif' ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'}`}>
                    {vet.status === 'actif' ? '● Actif' : '● En congé'}
                  </span>
                </div>
              </div>
              <div className="space-y-2 text-sm text-slate-600">
                <p className="flex items-center gap-2"><MapPin size={14} className="text-slate-400" /> {vet.zone}</p>
                <p className="flex items-center gap-2"><Phone size={14} className="text-slate-400" /> {vet.phone}</p>
                <p className="flex items-center gap-2"><Stethoscope size={14} className="text-slate-400" /> {vet.interventions_mois} interventions ce mois</p>
              </div>
              <button className="mt-4 text-sm font-semibold text-[#3466A4] hover:underline flex items-center gap-1">
                Voir le dossier <ChevronRight size={14} />
              </button>
            </div>
          ))}
        </div>
      )}

      {tab === 'interventions' && (
        <div className="gov-card overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                {['Type d\'intervention', 'Lieu', 'Vétérinaire', 'Date', 'Résultat'].map(h => (
                  <th key={h} className="px-6 py-4 text-xs font-bold text-[#152C4D] uppercase tracking-widest">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {INTERVENTIONS.map(i => {
                const r = resultCfg[i.result]
                return (
                  <tr key={i.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4 font-bold text-[#152C4D]">{i.type}</td>
                    <td className="px-6 py-4 text-sm text-slate-600"><span className="flex items-center gap-1.5"><MapPin size={13} className="text-slate-400" />{i.lieu}</span></td>
                    <td className="px-6 py-4 text-sm text-slate-600 font-medium">{i.vet}</td>
                    <td className="px-6 py-4 text-sm text-slate-500">{new Date(i.date).toLocaleDateString('fr-MA')}</td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold border ${r.cls}`}>{r.label}</span>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
