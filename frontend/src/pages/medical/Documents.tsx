import { FileText, Download, Upload, Search, File, Folder } from 'lucide-react';

const Documents = () => {
  return (
    <div className="space-y-6 animate-slide-up pb-12">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">الوثائق والملفات الإدارية</h1>
          <p className="text-sm text-gray-500 mt-1">الأرشيف الرقمي للوثائق المهنية</p>
        </div>
        <button className="bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2.5 rounded-xl font-bold flex items-center gap-2 transition-all shadow-md text-sm">
          <Upload size={18} />
          رفع وثيقة جديدة
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Folders */}
        <div className="lg:col-span-3 space-y-4">
           <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mr-2">المجلدات</h3>
           {[
              { label: 'الوثائق الإدارية', count: 12, active: true },
              { label: 'الشواهد العلمية', count: 5, active: false },
              { label: 'تقارير الأداء', count: 8, active: false },
              { label: 'أرشيف الرواتب', count: 24, active: false },
           ].map((folder, i) => (
              <div key={i} className={`p-4 rounded-2xl flex items-center justify-between cursor-pointer transition-all ${folder.active ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-200' : 'bg-white border border-gray-100 text-gray-600 hover:bg-gray-50'}`}>
                 <div className="flex items-center gap-3">
                    <Folder size={18} className={folder.active ? 'text-emerald-200' : 'text-emerald-600'} />
                    <span className="text-sm font-bold">{folder.label}</span>
                 </div>
                 <span className={`text-[10px] font-black ${folder.active ? 'bg-white/20' : 'bg-gray-100'} px-2 py-0.5 rounded-lg`}>{folder.count}</span>
              </div>
           ))}
        </div>

        {/* Files List */}
        <div className="lg:col-span-9 space-y-6">
           <div className="gov-card p-0 overflow-hidden">
              <div className="p-4 border-b border-gray-100 bg-gray-50/30 flex items-center justify-between">
                 <div className="relative w-64">
                    <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                    <input type="text" placeholder="ابحث في الوثائق..." className="w-full pr-10 pl-4 py-2 bg-white border border-gray-200 rounded-xl outline-none focus:border-emerald-500 text-xs font-bold" />
                 </div>
              </div>
              <div className="divide-y divide-gray-50">
                 {[
                    { name: 'قرار التعيين الرسمي.pdf', size: '1.2 MB', date: '12/05/2015', type: 'PDF' },
                    { name: 'شهادة الدكتوراه في الطب.pdf', size: '2.5 MB', date: '20/07/2010', type: 'PDF' },
                    { name: 'مقرر الترقية في الدرجة 2021.pdf', size: '850 KB', date: '15/06/2021', type: 'PDF' },
                    { name: 'كشف الأجر - أبريل 2024.pdf', size: '450 KB', date: '30/04/2024', type: 'PDF' },
                 ].map((file, i) => (
                    <div key={i} className="p-4 hover:bg-gray-50/50 transition-all flex items-center justify-between group">
                       <div className="flex items-center gap-4">
                          <div className="w-10 h-10 bg-gray-50 text-gray-400 rounded-xl flex items-center justify-center group-hover:bg-emerald-50 group-hover:text-emerald-600 transition-all">
                             <File size={20} />
                          </div>
                          <div>
                             <h4 className="text-sm font-bold text-gray-800">{file.name}</h4>
                             <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-0.5">{file.size} • {file.date}</p>
                          </div>
                       </div>
                       <button className="p-2 text-gray-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-all" title="تحميل">
                          <Download size={18} />
                       </button>
                    </div>
                 ))}
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default Documents;
