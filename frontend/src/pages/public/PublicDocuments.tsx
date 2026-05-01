import { useState, useEffect } from 'react';
import { FileDown, Download, Search } from 'lucide-react';

const PublicDocuments = () => {
  return (
    <div className="max-w-[1400px] mx-auto px-4 md:px-8 py-16">
      <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-12">
        <div className="text-right">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">الوثائق الرسمية</h1>
          <div className="w-20 h-1 bg-yellow-500 rounded"></div>
        </div>
        <div className="relative w-full md:w-80">
          <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input 
            type="text" 
            placeholder="ابحث عن وثيقة..." 
            className="w-full pl-4 pr-10 py-3 border border-gray-200 rounded-xl outline-none focus:border-[#0d5e3f] bg-gray-50"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[
          'القانون الأساسي للجماعة',
          'الهيكل التنظيمي للمصالح',
          'ميزانية سنة 2024 المصادق عليها',
          'تقرير أنشطة المجلس لسنة 2023',
          'دليل المساطر الإدارية للمواطن',
          'تصميم التهيئة لمدينة العرائش',
        ].map((doc, i) => (
          <div key={i} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-all group">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-emerald-50 text-[#0d5e3f] rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                <FileDown size={24} />
              </div>
              <div className="flex-1 text-right">
                <h3 className="font-bold text-gray-800 leading-tight">{doc}</h3>
                <span className="text-xs text-gray-400 font-bold uppercase">PDF · 2.4 MB</span>
              </div>
            </div>
            <button className="w-full bg-gray-50 text-gray-600 py-3 rounded-xl font-bold text-sm flex items-center justify-center gap-2 hover:bg-[#0d5e3f] hover:text-white transition-all">
              <Download size={16} /> تحميل الوثيقة
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PublicDocuments;
