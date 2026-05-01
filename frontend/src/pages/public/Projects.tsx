import { useState } from 'react';

const PROJECTS = [
  {
    id: 1,
    title: 'تهيئة وتطوير الفضاءات الخضراء بمركز المدينة',
    category: 'بنية تحتية',
    date: 'مارس 2024',
    status: 'في طور الإنجاز',
    progress: 100,
    description: 'مشروع يهدف إلى إعادة تأهيل الحدائق العمومية وتوسيع المساحات الخضراء بمركز المدينة، مع توفير أماكن استراحة عصرية للمواطنين.',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 2,
    title: 'تحديث نظام الإنارة العمومية بتقنية LED',
    category: 'تنمية مستدامة',
    date: 'فبراير 2024',
    status: 'مكتمل',
    progress: 65,
    description: 'تغيير المصابيح التقليدية بمصابيح LED موفرة للطاقة في جميع شوارع المدينة لتقليل استهلاك الكهرباء وتحسين جودة الإضاءة ليلاً.',
    image: 'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?auto=format&fit=crop&q=80&w=800'
  }
];

export default function Projects() {
  const [filter, setFilter] = useState('all');

  return (
    <div className="animate-fade-in py-12 px-4 md:px-8 max-w-[1400px] mx-auto" dir="rtl">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-black text-[#0d5e3f] mb-4">المشاريع والأنشطة</h1>
        <div className="w-24 h-1.5 bg-yellow-500 mx-auto rounded-full"></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {PROJECTS.map((project) => (
          <div key={project.id} className="bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-xl shadow-gray-200/50 group hover:-translate-y-2 transition-all duration-500">
            <div className="relative h-64 overflow-hidden">
              <img src={project.image} alt={project.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
              <div className="absolute top-4 left-4">
                <span className="bg-[#0d5e3f] text-white text-[10px] font-black px-3 py-1.5 rounded-lg uppercase tracking-wider">
                  {project.category}
                </span>
              </div>
            </div>
            
            <div className="p-8">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-2xl font-black text-gray-800 leading-tight group-hover:text-[#0d5e3f] transition-colors">
                  {project.title}
                </h3>
              </div>
              
              <p className="text-xs font-bold text-gray-400 mb-6 flex items-center gap-2">
                تاريخ البدء: {project.date}
              </p>
              
              <p className="text-gray-500 leading-relaxed font-medium mb-8">
                {project.description}
              </p>

              <div className="space-y-3">
                <div className="flex justify-between items-center text-sm">
                  <span className="font-bold text-[#0d5e3f]">{project.progress}%</span>
                  <span className="font-bold text-gray-400">نسبة الإنجاز</span>
                </div>
                <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-l from-emerald-400 to-emerald-600 rounded-full transition-all duration-1000"
                    style={{ width: `${project.progress}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
