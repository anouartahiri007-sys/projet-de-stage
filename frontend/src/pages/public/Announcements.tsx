import { useState, useEffect } from 'react';
import { Megaphone, Calendar, ChevronLeft } from 'lucide-react';

const Announcements = () => {
  return (
    <div className="max-w-[1400px] mx-auto px-4 md:px-8 py-16">
      <div className="flex justify-between items-end mb-12">
        <div className="text-right">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">إعلانات وطلبات عروض</h1>
          <div className="w-20 h-1 bg-yellow-500 rounded"></div>
        </div>
      </div>

      <div className="space-y-6">
        {[1, 2, 3, 4, 5].map((n) => (
          <div key={n} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col md:flex-row gap-6 items-center group hover:border-emerald-200 transition-colors">
            <div className="w-16 h-16 bg-emerald-50 text-[#0d5e3f] rounded-xl flex items-center justify-center shrink-0">
              <Megaphone size={28} />
            </div>
            <div className="flex-1 text-right w-full">
              <div className="flex flex-wrap items-center gap-4 mb-2">
                <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-xs font-bold">طلب عروض</span>
                <div className="flex items-center gap-2 text-gray-400 text-xs font-bold">
                  <Calendar size={14} />
                  <span>آخر أجل: 30 يونيو 2024</span>
                </div>
              </div>
              <h3 className="font-bold text-gray-800 text-lg group-hover:text-[#0d5e3f] transition-colors">
                طلب عروض رقم 2024/05: تزويد الجماعة بمعدات مكتبية ومعلوماتية
              </h3>
            </div>
            <button className="bg-gray-50 text-[#0d5e3f] px-6 py-3 rounded-xl font-bold text-sm flex items-center gap-2 hover:bg-[#0d5e3f] hover:text-white transition-all">
              تفاصيل الإعلان <ChevronLeft size={16} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Announcements;
