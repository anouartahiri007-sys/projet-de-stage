import { useState, useEffect } from 'react';

const About = () => {
  return (
    <div className="max-w-[1200px] mx-auto px-4 md:px-8 py-16">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold text-[#0d5e3f] mb-4">عن الجماعة</h1>
        <div className="w-20 h-1 bg-yellow-500 rounded mx-auto"></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-24">
        <div>
          <h2 className="text-2xl font-bold text-gray-800 mb-6 border-r-4 border-[#0d5e3f] pr-4">نبذة عن الجماعة</h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            تعتبر الجماعة الترابية لمدينة العرائش من أهم المؤسسات المحلية التي تسهر على تدبير الشأن العام المحلي، وتقديم الخدمات الأساسية للمواطنين في مجالات البنية التحتية، التعمير، الصحة، والثقافة.
          </p>
          <p className="text-gray-600 leading-relaxed">
            نعمل جاهدين من أجل تحسين جودة الحياة لساكنة المدينة من خلال مشاريع تنموية مستدامة، وتبني التكنولوجيا الحديثة لتقريب الإدارة من المواطن وتسهيل المساطر الإدارية.
          </p>
        </div>
        <div className="rounded-2xl overflow-hidden shadow-xl">
          <img src="https://images.unsplash.com/photo-1548678967-f1fc5d942e40?auto=format&fit=crop&q=80&w=1000" alt="About Commune" className="w-full h-full object-cover" />
        </div>
      </div>

      <div className="bg-gray-50 rounded-3xl p-12 mb-24">
        <h2 className="text-2xl font-bold text-gray-800 mb-10 text-center">كلمة رئيس الجماعة</h2>
        <div className="flex flex-col md:flex-row gap-8 items-center">
          <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-lg shrink-0">
            <img src="https://i.pravatar.cc/300?u=president" alt="President" className="w-full h-full object-cover" />
          </div>
          <div className="relative">
            <span className="text-6xl text-[#0d5e3f]/20 absolute -top-10 -right-10 font-serif">"</span>
            <p className="text-gray-700 italic leading-relaxed relative z-10">
              إن التزامنا اتجاه ساكنة هذه المدينة العريقة يضعنا أمام مسؤولية كبيرة للنهوض بكل القطاعات الحيوية. نحن نؤمن بأن الحكامة الجيدة والشفافية هما أساس النجاح، وندعو كافة المواطنين للمشاركة الفعالة في بناء مستقبل مدينتنا.
            </p>
            <h4 className="font-bold text-[#0d5e3f] mt-4">رئيس المجلس الجماعي</h4>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
