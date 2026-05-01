import { useState, useEffect, useRef } from 'react';
import { TrendingUp, Users, UserPlus, Download, RefreshCw, ChevronRight, Calendar, HeartPulse } from 'lucide-react'
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  PieChart, Pie, Cell, AreaChart, Area 
} from 'recharts'
import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'
import html2canvas from 'html2canvas'
import { toast } from 'react-hot-toast'

const STATS_HISTORY = [
  { month: 'Jan', personnel: 1190, recrutements: 5, budget: 450000 },
  { month: 'Fév', personnel: 1205, recrutements: 8, budget: 455000 },
  { month: 'Mar', personnel: 1220, recrutements: 3, budget: 460000 },
  { month: 'Avr', personnel: 1250, recrutements: 12, budget: 470000 },
  { month: 'Mai', personnel: 1265, recrutements: 7, budget: 475000 },
  { month: 'Juin', personnel: 1284, recrutements: 5, budget: 485000 },
]

const DEPARTMENTS = [
  { name: 'Médecine Générale', value: 312, color: '#1E3E6E' },
  { name: 'Infirmiers & Soins', value: 642, color: '#3466A4' },
  { name: 'Vétérinaires', value: 58, color: '#0D9488' },
  { name: 'Administration', value: 272, color: '#8B5CF6' },
]

export default function Reports() {
  const [period, setPeriod] = useState<'6m' | '12m' | 'ytd'>('6m')
  const [loading, setLoading] = useState(false)
  const chartsRef = useRef<HTMLDivElement>(null)

  const handleExportPDF = async () => {
    setLoading(true)
    try {
      const doc = new jsPDF('p', 'mm', 'a4')
      
      const logoUrl = '/logo_commune.jpg'
      try {
        doc.addImage(logoUrl, 'JPEG', 15, 10, 20, 20)
      } catch (e) {
        console.error('Logo not found', e)
      }

      doc.setFontSize(20)
      doc.setTextColor(30, 62, 110)
      doc.text('Rapport Analytique RH Mensuel', 40, 20)
      doc.setFontSize(9)
      doc.setTextColor(100)
      doc.text('Commune de Larache · Division des Ressources Humaines', 40, 26)
      doc.text(`Date d'export : ${new Date().toLocaleString('fr-MA')}`, 40, 31)

      doc.setDrawColor(240)
      doc.line(15, 38, 195, 38)

      doc.setFontSize(14)
      doc.setTextColor(30, 62, 110)
      doc.text('1. Indicateurs de Performance', 15, 50)
      
      autoTable(doc, {
        startY: 55,
        head: [['Indicateur', 'Valeur', 'Tendance']],
        body: [
          ['Effectif Total', '1 284 agents', '+3.2%'],
          ['Nouveaux Recrutements', '40 agents', '+12%'],
          ['Taux de Présence', '94.2%', '+1.1%'],
          ['Masse Salariale', '485,000 DH/mois', '+7.8%'],
        ],
        theme: 'striped',
        headStyles: { fillColor: [30, 62, 110], fontSize: 10, cellPadding: 3 },
        styles: { fontSize: 9, cellPadding: 2 }
      })

      let currentY = (doc as any).lastAutoTable.finalY + 15
      doc.text('2. Analyses Visuelles', 15, currentY)
      
      if (chartsRef.current) {
        const canvas = await html2canvas(chartsRef.current, { scale: 2 })
        const imgData = canvas.toDataURL('image/png')
        const imgProps = doc.getImageProperties(imgData)
        const pdfWidth = 180
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width
        doc.addImage(imgData, 'PNG', 15, currentY + 5, pdfWidth, pdfHeight)
        currentY += pdfHeight + 20
      }

      doc.addPage()
      doc.text('3. Répartition par Corps de Métier', 15, 20)
      
      autoTable(doc, {
        startY: 25,
        head: [['Département', 'Effectif', 'Pourcentage']],
        body: DEPARTMENTS.map(d => [d.name, d.value.toString(), `${Math.round((d.value/1284)*100)}%`]),
        theme: 'grid',
        headStyles: { fillColor: [52, 102, 164] }
      })

      const totalPages = doc.getNumberOfPages()
      for(let i = 1; i <= totalPages; i++) {
        doc.setPage(i)
        doc.setFontSize(8)
        doc.setTextColor(150)
        doc.text(`Document officiel · Page ${i}/${totalPages} · E-RH Larache`, 105, 285, { align: 'center' })
      }

      doc.save(`Rapport_HR_${Date.now()}.pdf`)
      toast.success('Rapport exporté avec succès !')
    } catch (err) {
      console.error(err)
      toast.error("Erreur lors de l'export du rapport.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="animate-slide-up space-y-6 pb-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-[var(--primary-main)] dark:text-white font-heading tracking-tight">Rapports & Statistiques</h1>
          <p className="text-slate-500 mt-1 font-medium">Analyse approfondie et pilotage des ressources humaines.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-1 shadow-sm">
            {(['6m', '12m', 'ytd'] as const).map(p => (
              <button 
                key={p} 
                onClick={() => setPeriod(p)} 
                className={`px-4 py-2 text-xs font-bold rounded-lg transition-all ${period === p ? 'bg-[var(--primary-main)] text-white shadow-md' : 'text-slate-500 hover:bg-slate-50'}`}
              >
                {p === '6m' ? '6 mois' : p === '12m' ? '12 mois' : 'YTD'}
              </button>
            ))}
          </div>
          <button 
            onClick={handleExportPDF} 
            disabled={loading}
            className="btn-primary flex items-center gap-2 px-5 py-2.5 shadow-lg shadow-blue-900/10 active:scale-95 transition-transform"
          >
            {loading ? <RefreshCw size={17} className="animate-spin" /> : <Download size={17} />}
            Exporter le Rapport
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: 'Effectif Total', value: '1 284', icon: <Users size={24} />, color: 'blue', trend: '+3.2%', desc: 'Agents actifs' },
          { label: 'Recrutements', value: '40', icon: <UserPlus size={24} />, color: 'emerald', trend: '+12%', desc: 'Derniers 6 mois' },
          { label: 'Masse Salariale', value: '485K', icon: <TrendingUp size={24} />, color: 'purple', trend: '+7.8%', desc: 'DH par mois (est.)' },
          { label: 'Taux de Présence', value: '94.2%', icon: <HeartPulse size={24} />, color: 'orange', trend: '+1.1%', desc: 'Moyenne annuelle' },
        ].map((kpi, i) => (
          <div key={i} className="gov-card p-6 flex flex-col group hover:border-blue-200 transition-all">
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-2xl bg-${kpi.color}-50 text-${kpi.color}-600 group-hover:scale-110 transition-transform`}>
                {kpi.icon}
              </div>
              <span className={`text-[11px] font-bold px-2 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-100`}>
                ↑ {kpi.trend}
              </span>
            </div>
            <p className="text-sm font-bold text-slate-500 uppercase tracking-widest">{kpi.label}</p>
            <p className="text-3xl font-black text-[var(--primary-main)] dark:text-white mt-1">{kpi.value}</p>
            <p className="text-xs text-slate-400 mt-2 font-medium">{kpi.desc}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6" ref={chartsRef}>
        <div className="lg:col-span-8 gov-card p-6 min-h-[400px] flex flex-col">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-xl font-bold text-[var(--primary-main)] dark:text-white">Évolution de l'Effectif</h2>
              <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mt-1">Projection sur le semestre actuel</p>
            </div>
            <div className="flex items-center gap-4 text-xs font-bold">
              <div className="flex items-center gap-1.5"><span className="w-3 h-3 bg-blue-600 rounded-full"></span> Personnel</div>
              <div className="flex items-center gap-1.5"><span className="w-3 h-3 bg-emerald-500 rounded-full"></span> Budget</div>
            </div>
          </div>
          <div className="flex-1 w-full min-h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={STATS_HISTORY} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorPers" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#1E3E6E" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#1E3E6E" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 12, fontWeight: 600, fill: '#94a3b8' }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fontWeight: 600, fill: '#94a3b8' }} />
                <Tooltip 
                  contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)', padding: '12px' }}
                  itemStyle={{ fontWeight: 700, fontSize: '12px' }}
                />
                <Area type="monotone" dataKey="personnel" stroke="#1E3E6E" strokeWidth={3} fillOpacity={1} fill="url(#colorPers)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="lg:col-span-4 gov-card p-6 flex flex-col">
          <h2 className="text-xl font-bold text-[var(--primary-main)] dark:text-white mb-2">Répartition par Corps</h2>
          <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mb-6">Distribution des agents</p>
          <div className="flex-1 flex flex-col justify-center">
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={DEPARTMENTS}
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {DEPARTMENTS.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="space-y-3 mt-4">
              {DEPARTMENTS.map((d, i) => (
                <div key={i} className="flex items-center justify-between text-xs font-bold">
                  <div className="flex items-center gap-2 text-slate-600">
                    <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: d.color }}></span>
                    {d.name}
                  </div>
                  <span className="text-[var(--primary-main)]">{Math.round((d.value/1284)*100)}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 gov-card p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold text-[var(--primary-main)] dark:text-white">Recrutements Mensuels</h2>
            <button className="text-xs font-bold text-[#3466A4] hover:underline">Détails annuels</button>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={STATS_HISTORY}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 11, fontWeight: 600, fill: '#94a3b8' }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fontWeight: 600, fill: '#94a3b8' }} />
                <Tooltip cursor={{ fill: '#f8fafc' }} contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }} />
                <Bar dataKey="recrutements" fill="#3466A4" radius={[4, 4, 0, 0]} barSize={30} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="gov-card p-6 bg-gradient-to-br from-[var(--primary-main)] to-[#1E3E6E] text-white">
          <h2 className="text-lg font-bold mb-6">Analyses Flash</h2>
          <div className="space-y-5">
            {[
              { label: 'Parité H/F', value: '42% / 58%', icon: <Users size={16} />, pct: 58 },
              { label: 'Moyenne d\'âge', value: '41.5 ans', icon: <Calendar size={16} />, pct: 75 },
              { label: 'Turn-over', value: '1.4%', icon: <RefreshCw size={16} />, pct: 15 },
            ].map((insight, i) => (
              <div key={i}>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2 text-xs font-bold opacity-80">
                    {insight.icon} {insight.label}
                  </div>
                  <span className="text-xs font-black">{insight.value}</span>
                </div>
                <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                  <div style={{ width: `${insight.pct}%` }} className="h-full bg-white rounded-full opacity-60" />
                </div>
              </div>
            ))}
          </div>
          <button className="w-full mt-10 py-3 bg-white/10 hover:bg-white/20 rounded-xl text-sm font-bold transition-all flex items-center justify-center gap-2 border border-white/10">
            Voir l'audit complet <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </div>
  )
}
