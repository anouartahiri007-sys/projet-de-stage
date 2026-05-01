import { Wallet, TrendingUp, Download, Eye, ArrowUpRight, DollarSign, CreditCard, Landmark } from 'lucide-react';

const Salary = () => {
  return (
    <div className="space-y-6 animate-slide-up pb-12">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">الأجر والتعويضات</h1>
          <p className="text-sm text-gray-500 mt-1">كشف الرواتب والتعويضات الشهرية</p>
        </div>
        <button className="flex items-center gap-2 bg-emerald-600 text-white px-5 py-2.5 rounded-xl font-bold hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-200 text-sm">
          <Download size={18} />
          تحميل آخر كشف أجر
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="gov-card p-6 bg-gradient-to-br from-emerald-600 to-emerald-800 text-white relative overflow-hidden group">
           <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16 group-hover:scale-150 transition-transform duration-700"></div>
           <div className="relative z-10">
              <p className="text-[10px] font-black uppercase tracking-[0.2em] opacity-80 mb-2">الصافي الشهري (Net)</p>
              <h2 className="text-3xl font-black mb-6">14,250.00 <span className="text-sm opacity-60">درهم</span></h2>
              <div className="flex items-center gap-2 text-[10px] font-bold bg-white/20 w-fit px-2 py-1 rounded-lg backdrop-blur-sm">
                 <TrendingUp size={12} />
                 +250.00 درهم عن الشهر الماضي
              </div>
           </div>
        </div>
        
        <div className="gov-card p-6 flex items-center gap-5">
           <div className="p-4 bg-blue-50 text-blue-600 rounded-2xl"><Landmark size={24} /></div>
           <div>
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">طريقة الصرف</p>
              <h3 className="text-sm font-bold text-gray-800">تحويل بنكي</h3>
              <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-0.5">BMCE Bank - ****5874</p>
           </div>
        </div>

        <div className="gov-card p-6 flex items-center gap-5">
           <div className="p-4 bg-purple-50 text-purple-600 rounded-2xl"><CreditCard size={24} /></div>
           <div>
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">التعويضات الخاصة</p>
              <h3 className="text-sm font-bold text-gray-800">2,450.00 درهم</h3>
              <p className="text-[10px] text-emerald-600 font-bold uppercase tracking-widest mt-0.5">مفصلة في الكشف</p>
           </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 gov-card overflow-hidden">
           <div className="p-6 border-b border-gray-100 bg-gray-50/30 flex items-center justify-between">
              <h3 className="font-bold text-gray-800">سجل الرواتب الأخيرة</h3>
              <button className="text-xs font-black text-emerald-600 uppercase tracking-widest hover:underline">عرض السجل الكامل</button>
           </div>
           <div className="overflow-x-auto">
              <table className="w-full text-right border-collapse">
                 <thead>
                    <tr className="bg-gray-50/50 text-[10px] font-black text-gray-400 uppercase tracking-widest">
                       <th className="p-4 border-b border-gray-100">الشهر / السنة</th>
                       <th className="p-4 border-b border-gray-100">الأجر الخام</th>
                       <th className="p-4 border-b border-gray-100">الاقتطاعات</th>
                       <th className="p-4 border-b border-gray-100">الصافي</th>
                       <th className="p-4 border-b border-gray-100 text-center">الإجراءات</th>
                    </tr>
                 </thead>
                 <tbody className="divide-y divide-gray-50">
                    {[
                       { month: 'أبريل 2024', gross: '18,500', ded: '4,250', net: '14,250' },
                       { month: 'مارس 2024', gross: '18,500', ded: '4,250', net: '14,250' },
                       { month: 'فبراير 2024', gross: '18,500', ded: '4,500', net: '14,000' },
                    ].map((row, i) => (
                       <tr key={i} className="hover:bg-gray-50/50 transition-all">
                          <td className="p-4 font-bold text-sm text-gray-800">{row.month}</td>
                          <td className="p-4 text-xs font-bold text-gray-500">{row.gross} درهم</td>
                          <td className="p-4 text-xs font-bold text-rose-500">-{row.ded} درهم</td>
                          <td className="p-4 text-sm font-black text-emerald-700">{row.net} درهم</td>
                          <td className="p-4 text-center">
                             <div className="flex items-center justify-center gap-1">
                                <button className="p-2 text-gray-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-all" title="عرض"><Eye size={16} /></button>
                                <button className="p-2 text-gray-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-all" title="تحميل"><Download size={16} /></button>
                             </div>
                          </td>
                       </tr>
                    ))}
                 </tbody>
              </table>
           </div>
        </div>

        <div className="lg:col-span-4 gov-card p-6 h-fit">
           <h3 className="font-bold text-gray-800 mb-6 flex items-center gap-2">
              <TrendingUp size={20} className="text-emerald-600" />
              توزيع التعويضات
           </h3>
           <div className="space-y-6">
              {[
                 { label: 'التعويض عن التدرج', value: '1,500.00', color: 'bg-emerald-500' },
                 { label: 'التعويض عن الأعباء', value: '650.00', color: 'bg-blue-500' },
                 { label: 'تعويضات أخرى', value: '300.00', color: 'bg-amber-500' },
              ].map((item, i) => (
                 <div key={i} className="space-y-2">
                    <div className="flex justify-between text-[10px] font-black text-gray-400 uppercase tracking-widest">
                       <span>{item.label}</span>
                       <span className="text-gray-700">{item.value} درهم</span>
                    </div>
                    <div className="w-full h-1.5 bg-gray-100 rounded-full">
                       <div className={`h-full ${item.color} rounded-full`} style={{ width: '70%' }}></div>
                    </div>
                 </div>
              ))}
           </div>
           
           <div className="mt-8 p-4 bg-blue-50 rounded-2xl border border-blue-100 flex items-start gap-3">
              <div className="mt-1 text-blue-600"><TrendingUp size={16} /></div>
              <p className="text-[10px] font-bold text-blue-800 leading-relaxed">
                ملاحظة: سيتم تطبيق الزيادة السنوية المبرمجة ابتداءً من شهر يوليوز القادم.
              </p>
           </div>
        </div>
      </div>
    </div>
  );
};

export default Salary;
