import { useState, useEffect } from 'react';
import { Search, Globe, FileCheck, Landmark, Building2, MapPin } from 'lucide-react';

const Services = () => {
  return (
    <div className="max-w-[1400px] mx-auto px-4 md:px-8 py-16">
      <div className="text-center mb-16">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">الخدمات الإلكترونية</h1>
        <div className="w-20 h-1 bg-yellow-500 rounded mx-auto mb-6"></div>
        <p className="text-gray-500 max-w-2xl mx-auto">
          نقدم لكم مجموعة من الخدمات الإلكترونية لتسهيل مساطركم الإدارية دون الحاجة للتنقل
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {[
          { title: 'شواهد الحالة المدنية', desc: 'طلب عقود الازدياد والنسخ الكاملة للحالة المدنية عبر الإنترنت.', icon: <Globe size={28} /> },
          { title: 'رخص التعمير', desc: 'إيداع وتتبع طلبات رخص البناء والتعمير والموافقة عليها رقمياً.', icon: <Building2 size={28} /> },
          { title: 'الشواهد الإدارية', desc: 'طلب مختلف الشواهد الإدارية التي تدخل في اختصاصات الجماعة.', icon: <FileCheck size={28} /> },
          { title: 'الجبايات المحلية', desc: 'الاطلاع على الجبايات المحلية وأدائها بطريقة آمنة وسريعة.', icon: <Landmark size={28} /> },
          { title: 'تتبع الطلبات', desc: 'تتبع وضعية ملفاتكم المودعة لدى مختلف مصالح الجماعة.', icon: <Search size={28} /> },
          { title: 'الشكايات والمقترحات', desc: 'إيداع الشكايات المتعلقة بمصالح الجماعة وتتبع معالجتها.', icon: <MapPin size={28} /> },
        ].map((service, i) => (
          <div key={i} className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-all group border-b-4 border-b-transparent hover:border-b-[#0d5e3f]">
            <div className="w-14 h-14 bg-emerald-50 text-[#0d5e3f] rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              {service.icon}
            </div>
            <h3 className="font-bold text-xl text-gray-800 mb-4">{service.title}</h3>
            <p className="text-gray-500 text-sm leading-relaxed mb-6">
              {service.desc}
            </p>
            <button className="bg-gray-50 text-[#0d5e3f] px-6 py-2 rounded-lg font-bold text-sm hover:bg-[#0d5e3f] hover:text-white transition-colors">
              ولوج الخدمة
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Services;
