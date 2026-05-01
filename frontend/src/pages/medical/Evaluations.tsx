import { Star, MessageSquare, TrendingUp, Award, CheckCircle } from 'lucide-react';

const Evaluations = () => {
  return (
    <div className="space-y-6 animate-slide-up pb-12">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">تقييمات الأداء</h1>
          <p className="text-sm text-gray-500 mt-1">سجل التقييمات السنوية والملاحظات الإدارية</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { label: 'آخر تنقيط', value: '18.5/20', desc: 'سنة 2023', color: 'emerald' },
          { label: 'الرتبة في المصلحة', value: 'أول 10%', desc: 'أداء متميز', color: 'blue' },
          { label: 'عدد الشهادات', value: '05', desc: 'تكوين مستمر', color: 'purple' },
        ].map((kpi, i) => (
          <div key={i} className="gov-card p-6 border-b-4 border-emerald-500">
             <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">{kpi.label}</p>
             <p className="text-2xl font-black text-gray-800">{kpi.value}</p>
             <p className="text-[10px] text-emerald-600 font-bold mt-1">{kpi.desc}</p>
          </div>
        ))}
      </div>

      <div className="gov-card overflow-hidden">
        <div className="p-6 border-b border-gray-100 bg-gray-50/30">
          <h3 className="font-bold text-gray-800">سجل التقييمات السنوية</h3>
        </div>
        <div className="divide-y divide-gray-50">
          {[
            { year: '2023', score: '18.5', status: 'ممتاز', feedback: 'التزام تام بالواجبات المهنية ومساهمة فعالة في تحسين جودة الخدمات الصحية.' },
            { year: '2022', score: '18.0', status: 'ممتاز', feedback: 'أداء مستقر ومتميز، تواصل جيد مع الزملاء والمرضى.' },
            { year: '2021', score: '17.5', status: 'جيد جداً', feedback: 'تطور ملحوظ في الأداء الإداري والطبي.' },
          ].map((evalItem, i) => (
            <div key={i} className="p-8 hover:bg-gray-50/50 transition-all group">
               <div className="flex flex-col md:flex-row gap-6 justify-between items-start">
                  <div className="space-y-4 flex-1">
                     <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-white shadow-sm border border-gray-100 rounded-2xl flex items-center justify-center text-emerald-600 font-black text-sm">
                           {evalItem.year}
                        </div>
                        <div>
                           <div className="flex items-center gap-2">
                              <h4 className="font-bold text-gray-800">التقييم السنوي لعام {evalItem.year}</h4>
                              <span className="px-2 py-0.5 bg-emerald-50 text-emerald-700 rounded text-[9px] font-black uppercase">{evalItem.status}</span>
                           </div>
                           <div className="flex items-center gap-1 mt-1 text-amber-500">
                              <Star size={14} fill="currentColor" />
                              <Star size={14} fill="currentColor" />
                              <Star size={14} fill="currentColor" />
                              <Star size={14} fill="currentColor" />
                              <Star size={14} fill="currentColor" />
                              <span className="text-xs font-bold text-gray-400 mr-2">({evalItem.score}/20)</span>
                           </div>
                        </div>
                     </div>
                     <div className="p-5 bg-gray-50 rounded-2xl border border-gray-100 relative group-hover:bg-white transition-colors">
                        <MessageSquare size={16} className="text-gray-300 absolute top-4 left-4" />
                        <p className="text-sm text-gray-600 leading-relaxed font-medium">
                           {evalItem.feedback}
                        </p>
                     </div>
                  </div>
                  <button className="px-5 py-2.5 bg-white border border-gray-200 text-gray-600 rounded-xl text-xs font-bold hover:bg-emerald-50 hover:text-emerald-700 hover:border-emerald-200 transition-all flex items-center gap-2 shrink-0">
                     <TrendingUp size={16} />
                     تحميل نسخة التقرير
                  </button>
               </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Evaluations;
