import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLang } from '../../context/LangContext';
import { api } from '../../lib/api';
import { toast } from 'react-hot-toast';
import { Plus, Edit, Trash2, FileText, Save } from 'lucide-react';

// Simple type definition for a Concours
interface Concours {
  id: number;
  title: string;
  description: string;
  date: string;
  lieu: string;
  status: string;
  positions_available: number;
}

const ConcoursPage = () => {
  const { t, lang } = useLang();
  const navigate = useNavigate();
  const [concoursList, setConcoursList] = useState<Concours[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchConcours = async () => {
    try {
      const res = await api.get('/concours');
      setConcoursList(res.data);
    } catch (err) {
      toast.error(err?.response?.data?.message || 'Erreur de chargement des concours');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchConcours();
  }, []);

  const downloadPdf = async (id: number) => {
    const toastId = toast.loading('Préparation du PDF...');
    try {
      const res = await api.get(`/concours/${id}/pdf`, { responseType: 'blob' });
      const blob = new Blob([res.data], { type: 'application/pdf' });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `concours_${id}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.parentNode?.removeChild(link);
      toast.success('PDF téléchargé', { id: toastId });
    } catch (e) {
      toast.error('Erreur de génération du PDF', { id: toastId });
    }
  };

  const deleteConcours = async (id: number) => {
    if (!window.confirm(lang === 'ar' ? 'هل تريد حذف هذا المنافسة؟' : 'Delete this concours?')) return;
    try {
      await api.delete(`/concours/${id}`);
      toast.success(lang === 'ar' ? 'تم حذف المنافسة' : 'Concours deleted');
      setConcoursList(prev => prev.filter(c => c.id !== id));
    } catch (e) {
      toast.error('Erreur lors de la suppression');
    }
  };

  return (
    <div className="max-w-6xl mx-auto py-8" dir={lang === 'ar' ? 'rtl' : 'ltr'}>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-black text-[#003366]">{lang === 'ar' ? 'Gestion des Concours' : 'Concours Management'}</h1>
        <button
          onClick={() => navigate('/rh/concours/create')}
          className="flex items-center gap-2 bg-[#003366] text-white px-4 py-2 rounded-xl hover:bg-[#002244] transition"
        >
          <Plus size={18} /> {lang === 'ar' ? 'إضافة مسابقة' : 'Add Concours'}
        </button>
      </div>

      {loading ? (
        <div className="text-center py-12">{lang === 'ar' ? 'جاري التحميل...' : 'Loading...'}</div>
      ) : (
        <table className="w-full table-auto bg-white shadow rounded-lg overflow-hidden">
          <thead className="bg-[#003366] text-white">
            <tr>
              <th className="p-3 text-left">{lang === 'ar' ? 'العنوان' : 'Title'}</th>
              <th className="p-3 text-left">{lang === 'ar' ? 'الوصف' : 'Description'}</th>
              <th className="p-3 text-left">{lang === 'ar' ? 'التاريخ' : 'Date'}</th>
              <th className="p-3 text-left">{lang === 'ar' ? 'المكان' : 'Location'}</th>
              <th className="p-3 text-left">{lang === 'ar' ? 'الوظائف المتاحة' : 'Positions'}</th>
              <th className="p-3 text-center">{lang === 'ar' ? 'الإجراءات' : 'Actions'}</th>
            </tr>
          </thead>
          <tbody>
            {concoursList.map(c => (
              <tr key={c.id} className="border-b">
                <td className="p-3">{c.title}</td>
                <td className="p-3">{c.description}</td>
                <td className="p-3">{new Date(c.date).toLocaleDateString()}</td>
                <td className="p-3">{c.lieu}</td>
                <td className="p-3 text-center">{c.positions_available}</td>
                <td className="p-3 flex justify-center gap-2">
                  <button onClick={() => downloadPdf(c.id)} className="text-[#003366] hover:text-[#001f4d]">
                    <FileText size={18} title={lang === 'ar' ? 'PDF' : 'PDF'} />
                  </button>
                  <button onClick={() => navigate(`/rh/concours/${c.id}/edit`)} className="text-emerald-600 hover:text-emerald-800">
                    <Edit size={18} />
                  </button>
                  <button onClick={() => deleteConcours(c.id)} className="text-red-600 hover:text-red-800">
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ConcoursPage;
