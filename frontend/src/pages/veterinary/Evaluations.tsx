import { Star, MessageSquare, TrendingUp, AlertCircle } from 'lucide-react';

const Evaluations = () => {
  const reviews = [
    { year: 2023, score: 18.5, grade: 'ممتاز', comment: 'أداء متميز في إدارة حملات التلقيح الإقليمية والتعامل مع الأوبئة.', reviewer: 'د. خالد الزياني' },
    { year: 2022, score: 17.0, grade: 'جيد جداً', comment: 'التزام مهني عالٍ ودقة في التقارير الصحية.', reviewer: 'د. خالد الزياني' },
  ];

  return (
    <div className="space-y-6 max-w-4xl mx-auto animate-slide-up">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">تقييماتي السنوية</h1>
        <p className="text-sm text-gray-500 mt-1">الرئيسية / الفضاء الشخصي / الأداء المهني</p>
      </div>

      {/* Latest Evaluation */}
      <div className="gov-card p-8 bg-emerald-900 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-48 h-48 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-8">
           <div className="text-center md:text-right">
              <p className="text-[10px] font-black uppercase tracking-[0.3em] text-emerald-300 mb-2">آخر تقييم (دورة 2023)</p>
              <h2 className="text-4xl font-black">18.5 <span className="text-lg opacity-40">/ 20</span></h2>
              <div className="mt-4 px-4 py-1.5 bg-emerald-800/50 rounded-full border border-emerald-700/50 inline-block">
                 <span className="text-xs font-black uppercase tracking-widest text-emerald-400">التقدير العام: ممتاز</span>
              </div>
           </div>
           
           <div className="p-6 bg-white/10 backdrop-blur rounded-3xl border border-white/10 max-w-sm">
              <div className="flex items-start gap-3">
                 <MessageSquare size={20} className="text-emerald-400 shrink-0" />
                 <p className="text-sm leading-relaxed text-emerald-100 italic">
                   "أظهر الطبيب كفاءة استثنائية في إدارة حالات الطوارئ الوبائية، خاصة خلال الأزمة الأخيرة. تقاريره دقيقة وتوصياته دائماً ما تكون عملية ومبنية على أسس علمية رصينة."
                 </p>
              </div>
              <div className="mt-4 pt-4 border-t border-white/5 text-left">
                 <p className="text-[10px] font-black uppercase tracking-widest text-emerald-400">المقيم: د. خالد الزياني</p>
              </div>
           </div>
        </div>
      </div>

      <div className="gov-card p-0 overflow-hidden">
        <div className="p-6 border-b border-gray-100 bg-gray-50/30">
           <h3 className="font-bold text-gray-800 flex items-center gap-2 uppercase text-xs tracking-widest">
              <TrendingUp size={18} className="text-emerald-600" />
              الأرشيف السنوي
           </h3>
        </div>
        <div className="divide-y divide-gray-100">
           {reviews.map((item, idx) => (
             <div key={idx} className="p-6 hover:bg-gray-50/50 transition-all flex items-center justify-between">
                <div>
                   <h4 className="font-bold text-gray-800">سنة {item.year}</h4>
                   <p className="text-xs text-gray-400 mt-1 font-bold">{item.grade}</p>
                </div>
                <div className="text-left flex items-center gap-8">
                   <div>
                      <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">النقطة</p>
                      <p className="text-lg font-black text-emerald-700">{item.score}</p>
                   </div>
                   <button className="px-4 py-2 border border-gray-200 rounded-xl text-xs font-bold text-gray-600 hover:bg-white transition-all">عرض التقرير</button>
                </div>
             </div>
           ))}
        </div>
      </div>
      
      <div className="p-4 bg-amber-50 border border-amber-100 rounded-2xl flex gap-3">
         <AlertCircle size={20} className="text-amber-600 shrink-0" />
         <p className="text-[11px] text-amber-800 font-medium">
           التقييمات السنوية تؤثر بشكل مباشر على وتيرة الترقيات والمنح التحفيزية. في حال وجود اعتراض على النقطة الممنوحة، يمكنك تقديم طلب تظلم عبر مصلحة الموارد البشرية.
         </p>
      </div>
    </div>
  );
};

export default Evaluations;
