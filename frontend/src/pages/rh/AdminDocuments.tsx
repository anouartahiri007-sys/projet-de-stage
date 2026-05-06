import { useState, useEffect } from 'react';
import { FileText, Search, Filter, Download, Plus, Folder, ChevronRight, Eye, Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useLang } from '../../context/LangContext';
import { api } from '../../lib/api';
import { toast } from 'react-hot-toast';

const mockDocs = [
  { id: 1, name: 'قرار التعيين - ياسين بومدين', nameFr: 'Décision de recrutement - Yassine', category: 'قرارات إدارية', catFr: 'Décisions', date: '2024-05-10', size: '1.2 MB', type: 'PDF' },
  { id: 2, name: 'شهادة العمل - خديجة أمزال', nameFr: 'Attestation de travail - Khadija', category: 'شهادات', catFr: 'Attestations', date: '2024-05-08', size: '450 KB', type: 'PDF' },
];

const AdminDocuments = () => {
  const { t, lang } = useLang();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [documents, setDocuments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    fetchDocuments();
  }, []);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);
    formData.append('document_type', 'RH_OFFICIAL');

    const toastId = toast.loading(lang === 'ar' ? 'جاري الرفع...' : 'Téléchargement...');
    setIsUploading(true);

    try {
      await api.post('/documents/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      toast.success(lang === 'ar' ? 'تم الرفع بنجاح' : 'Upload réussi', { id: toastId });
      fetchDocuments();
    } catch (error) {
      toast.error(lang === 'ar' ? 'فشل الرفع' : 'Échec de l\'upload', { id: toastId });
    } finally {
      setIsUploading(false);
    }
  };

  const getDocName = (doc: any) => {
    if (lang === 'ar') {
      const subject = doc.fonctionnaire || doc.candidat;
      const name = subject ? `${subject.nom} ${subject.prenom}` : '---';
      return `${t(doc.type) || doc.type} - ${name}`;
    } else {
      const subject = doc.fonctionnaire || doc.candidat;
      const name = subject ? `${subject.first_name} ${subject.last_name}` : '---';
      return `${t(doc.type) || doc.type} - ${name}`;
    }
  };

  const fetchDocuments = async () => {
    try {
      const [actsRes, docsRes] = await Promise.allSettled([
        api.get('/administrative-acts'),
        api.get('/documents')
      ]);
      
      const formattedActs = actsRes.status === 'fulfilled' ? actsRes.value.data.map((act: any) => ({
        ...act,
        isGenerated: true,
        displayName: getDocName(act),
        category: 'قرار إداري',
        catFr: 'Acte Admin'
      })) : [];

      const formattedDocs = docsRes.status === 'fulfilled' ? docsRes.value.data.map((doc: any) => ({
        ...doc,
        isGenerated: false,
        displayName: doc.name,
        category: doc.document_type === 'cert' ? 'شهادة' : 'وثيقة',
        catFr: doc.document_type === 'cert' ? 'Certificat' : 'Document'
      })) : [];

      setDocuments([...formattedActs, ...formattedDocs].sort((a, b) => 
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      ));
    } catch (err) {
      toast.error(t('fetchError') || 'Error fetching documents');
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = async (doc: any) => {
    const toastId = toast.loading(t('prepPdf') || 'Preparing file...');
    try {
      const endpoint = doc.isGenerated 
        ? `/administrative-acts/${doc.id}/pdf`
        : `/documents/${doc.id}/download`;
      
      const response = await api.get(endpoint, {
        responseType: 'blob'
      });
      
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      // Provide a default extension if doc.name doesn't have it
      let fileName = doc.isGenerated ? `${doc.type}_${doc.id}.pdf` : doc.name;
      if (!fileName.includes('.')) fileName += '.pdf';
      link.setAttribute('download', fileName);
      document.body.appendChild(link);
      link.click();
      link.parentNode?.removeChild(link);
      
      // Free memory
      setTimeout(() => window.URL.revokeObjectURL(url), 100);
      
      toast.success(t('downloaded') || 'Downloaded successfully', { id: toastId });
    } catch (error) {
      toast.error(t('error') || 'Download failed', { id: toastId });
    }
  };

  const handlePreview = async (doc: any) => {
    const toastId = toast.loading(t('prepPreview') || 'Loading preview...');
    
    // Open window immediately to avoid popup blocker
    const newWindow = window.open('', '_blank');
    if (newWindow) {
      newWindow.document.write('<html><body style="margin:0;display:flex;justify-content:center;align-items:center;height:100vh;background:#f3f4f6;font-family:sans-serif;"><h3>Loading PDF...</h3></body></html>');
    }

    try {
      const endpoint = doc.isGenerated 
        ? `/administrative-acts/${doc.id}/pdf`
        : `/documents/${doc.id}/download`;

      const response = await api.get(endpoint, {
        responseType: 'blob'
      });
      const blobType = typeof response.headers['content-type'] === 'string' ? response.headers['content-type'] : 'application/pdf';
      const blob = new Blob([response.data], { type: blobType });
      const url = window.URL.createObjectURL(blob);
      
      if (newWindow) {
        newWindow.location.href = url;
      } else {
        // Fallback if popup was still blocked
        window.open(url, '_blank');
      }
      toast.dismiss(toastId);
    } catch (error) {
      if (newWindow) newWindow.close();
      toast.error(t('error') || 'Preview failed', { id: toastId });
    }
  };



  return (
    <div className="animate-slide-up space-y-6" dir={lang === 'ar' ? 'rtl' : 'ltr'}>
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8">
        <div>
          <h1 className="text-4xl font-black text-[#003366] tracking-tight uppercase">
             {t('adminDocuments')}
          </h1>
          <nav className="flex items-center gap-3 text-xs font-black text-slate-400 mt-3 uppercase tracking-widest">
            <span className="hover:text-[#006241] cursor-pointer transition-colors" onClick={() => navigate('/dashboard')}>{t('dashboard')}</span>
            <ChevronRight size={14} className={lang === 'ar' ? 'rotate-180' : ''} />
            <span className="text-[#C5A059]">{t('adminDocuments')}</span>
          </nav>
        </div>
        
        <div className="flex gap-4">
          <input 
            type="file" 
            id="doc-upload" 
            className="hidden" 
            onChange={handleFileUpload}
            accept=".pdf,.doc,.docx"
          />
          <button 
            className="btn-primary" 
            disabled={isUploading}
            onClick={() => document.getElementById('doc-upload')?.click()}
          >
            {isUploading ? <Loader2 size={18} className="animate-spin" /> : <Plus size={18} />}
            {lang === 'ar' ? 'رفع وثيقة جديدة' : 'Nouveau Document'}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-1 space-y-6">
          <div className="gov-card p-8 border-b-4 border-b-[#0d5e3f]">
            <h3 className={`font-black text-[10px] text-gray-800 dark:text-white mb-6 flex items-center gap-2 uppercase tracking-[0.2em] ${lang === 'ar' ? 'text-right' : 'text-left'}`}>
              <Folder size={18} className="text-[#0d5e3f]" />
              {lang === 'ar' ? 'التصنيفات' : 'Catégories'}
            </h3>
            <div className="space-y-2">
              {[
                { label: lang === 'ar' ? 'كل الوثائق' : 'Tous les docs', count: 42, active: true },
                { label: lang === 'ar' ? 'قرارات إدارية' : 'Décisions', count: 15 },
                { label: lang === 'ar' ? 'شهادات العمل' : 'Attestations', count: 12 },
                { label: lang === 'ar' ? 'عقود التوظيف' : 'Contrats', count: 8 },
              ].map((cat, i) => (
                <div key={i} className={`flex items-center justify-between p-3.5 rounded-xl font-bold text-xs cursor-pointer transition-all border ${cat.active ? 'bg-emerald-50 text-[#0d5e3f] border-emerald-100' : 'text-gray-500 dark:text-gray-400 border-transparent hover:bg-gray-50 dark:hover:bg-slate-900'} ${lang === 'ar' ? 'flex-row' : 'flex-row-reverse'}`}>
                  <span>{cat.label}</span>
                  <span className={`text-[10px] px-2.5 py-0.5 rounded-full border ${cat.active ? 'bg-white border-emerald-100' : 'bg-gray-100 dark:bg-slate-700 border-transparent'}`}>{cat.count}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="lg:col-span-3">
          <div className="gov-card p-0 overflow-hidden">
            <div className={`p-6 border-b border-gray-100 dark:border-slate-700 flex flex-col md:flex-row gap-4 justify-between items-center bg-gray-50/30 dark:bg-slate-900/30 ${lang === 'ar' ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
              <div className="relative w-full md:w-80">
                <Search className={`absolute ${lang === 'ar' ? 'right-4' : 'left-4'} top-1/2 -translate-y-1/2 text-gray-400`} size={18} />
                <input 
                  type="text" 
                  placeholder={lang === 'ar' ? 'ابحث عن وثيقة...' : 'Rechercher un doc...'} 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className={`w-full ${lang === 'ar' ? 'pr-12 text-right' : 'pl-12 text-left'} py-2.5 bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-700 rounded-xl outline-none focus:ring-2 focus:ring-[#0d5e3f] text-sm transition-all`}
                />
              </div>
              <button className="flex items-center gap-2 border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-5 py-2.5 rounded-xl text-sm font-bold text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-slate-700 transition-all">
                <Filter size={16} />
                {t('filters')}
              </button>
            </div>

            <div className="divide-y divide-gray-100 dark:divide-slate-700">
              {loading ? (
                <div className="p-20 flex flex-col items-center justify-center gap-4">
                  <Loader2 className="w-10 h-10 text-[#0d5e3f] animate-spin" />
                  <p className="text-gray-500 font-bold">{t('loading') || 'Loading...'}</p>
                </div>
              ) : documents.length === 0 ? (
                <div className="p-20 text-center">
                  <FileText size={48} className="mx-auto text-gray-200 mb-4" />
                  <p className="text-gray-500 font-bold">{t('noDocuments') || 'No documents found'}</p>
                </div>
              ) : (
                documents.filter(d => d.displayName.toLowerCase().includes(searchTerm.toLowerCase())).map((doc) => (
                  <div key={`${doc.isGenerated ? 'act' : 'doc'}-${doc.id}`} className={`p-6 hover:bg-emerald-50/10 transition-all flex items-center justify-between group ${lang === 'ar' ? 'flex-row' : 'flex-row-reverse'}`}>
                    <div 
                      className={`flex items-center gap-5 cursor-pointer ${lang === 'ar' ? 'flex-row' : 'flex-row-reverse'}`}
                      onClick={() => handlePreview(doc)}
                    >
                      <div className={`w-14 h-14 rounded-2xl flex items-center justify-center border-2 transition-all group-hover:scale-110 shadow-sm ${doc.isGenerated ? 'bg-rose-50 text-rose-600 border-rose-100' : 'bg-blue-50 text-blue-600 border-blue-100'}`}>
                        <FileText size={26} />
                      </div>
                      <div className={lang === 'ar' ? 'text-right' : 'text-left'}>
                        <h3 className="font-bold text-gray-800 dark:text-white text-base mb-1 group-hover:text-[#0d5e3f] transition-colors">{doc.displayName}</h3>
                        <div className={`flex items-center gap-3 text-[10px] font-black text-gray-400 uppercase tracking-widest ${lang === 'ar' ? 'flex-row' : 'flex-row-reverse'}`}>
                          <span className="text-[#0d5e3f]">{lang === 'ar' ? doc.category : doc.catFr}</span>
                          <span className="w-1 h-1 bg-gray-200 rounded-full"></span>
                          <span>{new Date(doc.created_at).toLocaleDateString()}</span>
                          <span className="w-1 h-1 bg-gray-200 rounded-full"></span>
                          <span className={doc.isGenerated ? "text-rose-600" : "text-blue-600"}>{doc.isGenerated ? 'AUTO' : 'UPLOAD'}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button 
                        onClick={() => handlePreview(doc)}
                        className="p-3 text-slate-300 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all md:opacity-0 group-hover:opacity-100"
                        title={lang === 'ar' ? 'معاينة' : 'Aperçu'}
                      >
                        <Eye size={22} />
                      </button>
                      <button 
                        onClick={() => handleDownload(doc)}
                        className="p-3 text-slate-300 hover:text-[#0d5e3f] hover:bg-emerald-50 rounded-xl transition-all md:opacity-0 group-hover:opacity-100"
                        title={lang === 'ar' ? 'تحميل' : 'Télécharger'}
                      >
                        <Download size={22} />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDocuments;
