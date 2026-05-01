import { PieChart, BarChart3, TrendingUp, Users, Calendar, ArrowUpRight, ArrowDownRight, Activity } from 'lucide-react';

const Statistics = () => {
  return (
    <div className="space-y-8 animate-slide-up pb-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 font-heading">الإحصائيات والتحليلات</h1>
          <p className="text-sm text-gray-500 mt-1">الرئيسية / التقارير والإحصائيات / لوحة البيانات التحليلية</p>
        </div>
        <div className="bg-white p-2 rounded-xl border border-gray-200 shadow-sm flex gap-1">
          <button className="px-4 py-1.5 bg-emerald-50 text-emerald-700 rounded-lg text-xs font-bold">هذا الشهر</button>
          <button className="px-4 py-1.5 text-gray-500 rounded-lg text-xs font-bold hover:bg-gray-50">هذه السنة</button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'إجمالي الموظفين', value: '248', trend: '+12', icon: <Users size={20} />, color: 'emerald' },
          { label: 'الموظفون النشطون', value: '214', trend: '+8', icon: <Activity size={20} />, color: 'blue' },
          { label: 'طلبات العطل المعلقة', value: '18', trend: '+3 جديدة', icon: <Calendar size={20} />, color: 'amber' },
          { label: 'الترقيات هذا الشهر', value: '7', trend: '+2', icon: <TrendingUp size={20} />, color: 'purple' },
        ].map((stat, i) => (
          <div key={i} className="gov-card p-6 relative overflow-hidden group hover:scale-[1.02] transition-all">
            <div className={`absolute top-0 right-0 w-24 h-24 bg-${stat.color}-500/5 rounded-full -translate-y-1/2 translate-x-1/2`}></div>
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 bg-${stat.color}-50 text-${stat.color}-600 rounded-2xl`}>
                {stat.icon}
              </div>
              <span className={`text-[10px] font-black ${stat.trend.includes('جديدة') ? 'text-amber-600' : 'text-emerald-600'} bg-white px-2 py-1 rounded-lg border border-gray-100`}>
                {stat.trend}
              </span>
            </div>
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-1">{stat.label}</p>
            <p className="text-3xl font-black text-gray-800">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Distribution Chart Placeholder */}
        <div className="lg:col-span-8 gov-card p-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
              <BarChart3 size={20} className="text-emerald-600" />
              توزيع الموظفين حسب المصلحة
            </h2>
          </div>
          
          <div className="space-y-6">
            {[
              { label: 'المصلحة الصحية', value: 138, total: 248, color: 'bg-emerald-500' },
              { label: 'المصلحة البيطرية', value: 32, total: 248, color: 'bg-blue-500' },
              { label: 'الكتابة العامة', value: 28, total: 248, color: 'bg-amber-500' },
              { label: 'المصالح التقنية', value: 24, total: 248, color: 'bg-purple-500' },
              { label: 'المصالح الإدارية', value: 26, total: 248, color: 'bg-rose-500' },
            ].map((item, idx) => (
              <div key={idx} className="space-y-2">
                <div className="flex justify-between text-sm font-bold">
                  <span className="text-gray-700">{item.label}</span>
                  <span className="text-gray-400">{item.value} موظف</span>
                </div>
                <div className="w-full h-2.5 bg-gray-100 rounded-full overflow-hidden">
                  <div 
                    className={`h-full rounded-full ${item.color} transition-all duration-1000`} 
                    style={{ width: `${(item.value / item.total) * 100}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Roles Distribution PieChart Placeholder */}
        <div className="lg:col-span-4 gov-card p-8 flex flex-col">
          <h2 className="text-lg font-bold text-gray-800 mb-8 flex items-center gap-2">
            <PieChart size={20} className="text-emerald-600" />
            نسبة الأدوار
          </h2>
          
          <div className="flex-1 flex flex-col items-center justify-center">
            {/* Visual Pie Chart Placeholder */}
            <div className="relative w-48 h-48 rounded-full border-[16px] border-emerald-500 flex items-center justify-center mb-8 shadow-inner">
               <div className="absolute inset-0 border-[16px] border-blue-500 rounded-full" style={{ clipPath: 'polygon(50% 50%, 50% 0, 100% 0, 100% 50%)' }}></div>
               <div className="absolute inset-0 border-[16px] border-amber-500 rounded-full" style={{ clipPath: 'polygon(50% 50%, 100% 50%, 100% 100%, 50% 100%)' }}></div>
               <div className="text-center">
                 <p className="text-3xl font-black text-gray-800">248</p>
                 <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">إجمالي</p>
               </div>
            </div>

            <div className="w-full space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
                  <span className="text-xs font-bold text-gray-600">أطباء</span>
                </div>
                <span className="text-xs font-black text-gray-400">52</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                  <span className="text-xs font-bold text-gray-600">ممرضون</span>
                </div>
                <span className="text-xs font-black text-gray-400">86</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-amber-500"></div>
                  <span className="text-xs font-bold text-gray-600">بياطرة</span>
                </div>
                <span className="text-xs font-black text-gray-400">18</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Statistics;
