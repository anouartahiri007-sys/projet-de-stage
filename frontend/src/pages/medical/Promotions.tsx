import { TrendingUp, Award, Calendar, CheckCircle, ChevronRight, Briefcase } from 'lucide-react';

const Promotions = () => {
  return (
    <div className="space-y-6 animate-slide-up pb-12">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">الترقيات والمسار المهني</h1>
          <p className="text-sm text-gray-500 mt-1">تتبع المسار المهني والترقيات المستقبلية</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Next Promotion Info */}
        <div className="lg:col-span-4 space-y-6">
           <div className="gov-card p-8 bg-emerald-900 text-white relative overflow-hidden shadow-xl shadow-emerald-900/20">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-3xl translate-x-16 -translate-y-16"></div>
              <div className="relative z-10">
                 <h3 className="font-bold mb-6 flex items-center gap-2">
                    <TrendingUp size={20} className="text-emerald-400" />
                    الترقية القادمة
                 </h3>
                 <div className="space-y-6">
                    <div>
                       <p className="text-[10px] font-black uppercase tracking-widest text-emerald-300/80 mb-1">الرتبة المستهدفة</p>
                       <p className="text-xl font-bold">الرتبة 12</p>
                    </div>
                    <div>
                       <p className="text-[10px] font-black uppercase tracking-widest text-emerald-300/80 mb-1">التاريخ المتوقع</p>
                       <p className="text-xl font-bold">يناير 2026</p>
                    </div>
                    <div className="pt-4">
                       <div className="flex justify-between text-[10px] font-black uppercase mb-2">
                          <span>نسبة الجاهزية</span>
                          <span>70%</span>
                       </div>
                       <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                          <div className="h-full bg-emerald-400 rounded-full" style={{ width: '70%' }}></div>
                       </div>
                    </div>
                 </div>
              </div>
           </div>

           <div className="gov-card p-6">
              <h3 className="font-bold text-gray-800 mb-6 flex items-center gap-2">
                 <Award size={20} className="text-emerald-600" />
                 شروط الترقي
              </h3>
              <div className="space-y-4">
                 {[
                    { label: 'الأقدمية في الرتبة', status: 'done' },
                    { label: 'النقطة السنوية (أكثر من 16)', status: 'done' },
                    { label: 'تكوين مستمر', status: 'pending' },
                 ].map((req, i) => (
                    <div key={i} className="flex items-center justify-between">
                       <span className="text-xs font-bold text-gray-600">{req.label}</span>
                       {req.status === 'done' ? (
                          <CheckCircle size={16} className="text-emerald-500" />
                       ) : (
                          <div className="w-4 h-4 rounded-full border-2 border-gray-100"></div>
                       )}
                    </div>
                 ))}
              </div>
           </div>
        </div>

        {/* History Section */}
        <div className="lg:col-span-8 gov-card overflow-hidden">
           <div className="p-6 border-b border-gray-100 bg-gray-50/30 flex items-center justify-between">
              <h3 className="font-bold text-gray-800">تاريخ الترقيات</h3>
           </div>
           <div className="p-0">
              {[
                 { title: 'الترقية إلى الرتبة 11', date: '01/01/2024', type: 'ترقية سريعة', icon: <TrendingUp className="text-emerald-500" /> },
                 { title: 'الترقية إلى الدرجة الممتازة', date: '15/06/2021', type: 'امتحان مهني', icon: <Award className="text-blue-500" /> },
                 { title: 'الترقية إلى الرتبة 10', date: '01/01/2021', type: 'بالأقدمية', icon: <Calendar className="text-purple-500" /> },
                 { title: 'الترقية إلى الرتبة 9', date: '01/01/2019', type: 'بالأقدمية', icon: <Briefcase className="text-amber-500" /> },
              ].map((promo, i) => (
                 <div key={i} className="p-6 border-b border-gray-50 last:border-0 hover:bg-gray-50/50 transition-all flex items-center justify-between group">
                    <div className="flex items-center gap-6">
                       <div className="p-3 bg-white shadow-sm border border-gray-100 rounded-2xl group-hover:scale-110 transition-transform">
                          {promo.icon}
                       </div>
                       <div>
                          <h4 className="font-bold text-gray-800 text-sm">{promo.title}</h4>
                          <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-1">{promo.type}</p>
                       </div>
                    </div>
                    <div className="text-left">
                       <p className="text-xs font-black text-emerald-700">{promo.date}</p>
                    </div>
                 </div>
              ))}
           </div>
        </div>
      </div>
    </div>
  );
};

export default Promotions;
