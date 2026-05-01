import { useState, useEffect } from 'react';

const News = () => {
  return (
    <div className="max-w-[1400px] mx-auto px-4 md:px-8 py-16">
      <div className="flex justify-between items-end mb-12">
        <div className="text-right">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">أخبار ومستجدات الجماعة</h1>
          <div className="w-20 h-1 bg-yellow-500 rounded"></div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {[1, 2, 3, 4, 5, 6].map((n) => (
          <div key={n} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow group cursor-pointer border border-gray-100">
            <div className="relative h-60 overflow-hidden">
              <img 
                src={`https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&q=80&w=800&v=${n}`} 
                alt="News" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-4 right-4 bg-[#0d5e3f] text-white px-3 py-1 rounded text-xs font-bold shadow-md">نشاط رسمي</div>
            </div>
            <div className="p-6 text-right">
              <span className="text-xs text-gray-400 font-bold mb-2 block">24 مايو 2024</span>
              <h3 className="font-bold text-gray-800 text-lg mb-3 leading-tight group-hover:text-[#0d5e3f] transition-colors">
                تقرير عن أشغال الدورة العادية للمجلس الجماعي لشهر ماي
              </h3>
              <p className="text-sm text-gray-500 line-clamp-3 leading-relaxed mb-4">
                عقد المجلس الجماعي دورته العادية لشهر ماي برئاسة السيد الرئيس وبحضور أغلبية الأعضاء، حيث تمت المصادقة على مجموعة من النقط المدرجة...
              </p>
              <button className="text-[#0d5e3f] font-bold text-sm hover:underline">اقرأ المزيد</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default News;
