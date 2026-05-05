import { Search, Globe, FileCheck, Landmark, Building2, MapPin } from 'lucide-react';
import { useLang } from '../../context/LangContext';

const Services = () => {
  const { t, lang } = useLang();

  const servicesList = [
    { title: t('serviceCivilStatus'), desc: t('serviceCivilStatusDesc'), icon: <Globe size={28} /> },
    { title: t('serviceUrbanism'), desc: t('serviceUrbanismDesc'), icon: <Building2 size={28} /> },
    { title: t('serviceAdminCert'), desc: t('serviceAdminCertDesc'), icon: <FileCheck size={28} /> },
    { title: t('serviceTaxes'), desc: t('serviceTaxesDesc'), icon: <Landmark size={28} /> },
    { title: t('serviceTracking'), desc: t('serviceTrackingDesc'), icon: <Search size={28} /> },
    { title: t('serviceComplaints'), desc: t('serviceComplaintsDesc'), icon: <MapPin size={28} /> },
  ];

  return (
    <div className="max-w-[1400px] mx-auto px-4 md:px-8 py-16" dir={lang === 'ar' ? 'rtl' : 'ltr'}>
      <div className="text-center mb-16">
        <h1 className="text-3xl font-bold text-[#0d5e3f] mb-4">{t('servicesTitle')}</h1>
        <div className="w-20 h-1 bg-yellow-500 rounded mx-auto mb-6"></div>
        <p className="text-gray-500 max-w-2xl mx-auto">
          {t('servicesSubtitle')}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {servicesList.map((service, i) => (
          <div key={i} className={`bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-all group border-b-4 border-b-transparent hover:border-b-[#0d5e3f] ${lang === 'ar' ? 'text-right' : 'text-left'}`}>
            <div className={`w-14 h-14 bg-emerald-50 text-[#0d5e3f] rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform ${lang === 'ar' ? 'mr-0' : 'ml-0'}`}>
              {service.icon}
            </div>
            <h3 className="font-bold text-xl text-gray-800 mb-4">{service.title}</h3>
            <p className="text-gray-500 text-sm leading-relaxed mb-6">
              {service.desc}
            </p>
            <button className="bg-gray-50 text-[#0d5e3f] px-6 py-2 rounded-lg font-bold text-sm hover:bg-[#0d5e3f] hover:text-white transition-colors">
              {t('accessService')}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Services;
