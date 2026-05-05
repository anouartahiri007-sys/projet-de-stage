import React, { useState } from 'react';
import { HelpCircle, ChevronDown, ChevronUp, Search, MessageSquare, Phone, Mail } from 'lucide-react';
import { useLang } from '../../context/LangContext';

const FAQS = (t: any) => [
  { q: t('faqQ1') || 'Comment soumettre ma candidature ?', a: t('faqA1') || 'Vous pouvez soumettre votre candidature en choisissant un concours dans la section "Concours Ouverts", puis en cliquant sur "Postuler".' },
  { q: t('faqQ2') || 'Quels sont les documents requis ?', a: t('faqA2') || 'Généralement, vous devez fournir un CV mis à jour, une copie de votre diplôme et une copie de votre carte d\'identité nationale (CIN) en format PDF.' },
  { q: t('faqQ3') || 'Puis-je modifier ma candidature après soumission ?', a: t('faqA3') || 'Non, une fois la candidature soumise, elle ne peut plus être modifiée. Assurez-vous de bien vérifier toutes vos informations avant de confirmer.' },
  { q: t('faqQ4') || 'Comment savoir si ma candidature a été acceptée ?', a: t('faqA4') || 'Vous recevrez une notification sur votre tableau de bord et par email. Vous pouvez également suivre l\'état de vos candidatures dans la section "Mes Candidatures".' },
  { q: t('faqQ5') || 'J\'ai oublié mon code de candidat, que faire ?', a: t('faqA5') || 'Utilisez l\'option "Mot de passe oublié" sur la page de connexion pour réinitialiser votre code via votre adresse email enregistrée.' },
];

export default function FAQPage() {
  const { t, lang } = useLang();
  const faqs = FAQS(t);
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <div className="animate-fade-in space-y-12 pb-20 max-w-4xl mx-auto">
      <div className="text-center space-y-4">
        <div className="w-20 h-20 bg-blue-50 text-blue-600 rounded-[2rem] flex items-center justify-center mx-auto shadow-inner">
           <HelpCircle size={40} />
        </div>
        <h1 className="text-4xl font-black text-[#002352] tracking-tight">{t('faq')}</h1>
        <p className="text-slate-500 font-bold max-w-xl mx-auto leading-relaxed">{t('faqSubtitle') || 'Vous avez des questions ? Nous avons les réponses. Parcourez notre foire aux questions pour en savoir plus.'}</p>
      </div>

      <div className="space-y-4">
        {faqs.map((faq, idx) => (
          <div key={idx} className={`bg-white rounded-[2rem] border transition-all overflow-hidden ${openIdx === idx ? 'border-blue-200 shadow-xl shadow-blue-900/5' : 'border-slate-100 shadow-sm'}`}>
            <button 
              onClick={() => setOpenIdx(openIdx === idx ? null : idx)}
              className="w-full p-8 flex items-center justify-between text-right gap-6"
              dir={lang === 'ar' ? 'rtl' : 'ltr'}
            >
              <h3 className={`text-lg font-black transition-colors ${openIdx === idx ? 'text-blue-600' : 'text-slate-800'}`}>
                {faq.q}
              </h3>
              <div className={`p-2 rounded-xl transition-all ${openIdx === idx ? 'bg-blue-600 text-white rotate-180' : 'bg-slate-50 text-slate-400'}`}>
                <ChevronDown size={20} />
              </div>
            </button>
            {openIdx === idx && (
              <div className="px-8 pb-8 animate-slide-down">
                <div className="pt-6 border-t border-slate-50 text-slate-500 font-bold leading-relaxed">
                  {faq.a}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="bg-[#002352] rounded-[3rem] p-12 text-white shadow-2xl shadow-blue-900/40 relative overflow-hidden">
         <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2"></div>
         <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className={lang === 'ar' ? 'text-right' : 'text-left'}>
               <h2 className="text-3xl font-black mb-4">{t('stillHaveQuestions') || 'Encore des questions ?'}</h2>
               <p className="text-blue-200/60 font-bold">{t('contactSupportDesc') || 'Si vous n\'avez pas trouvé la réponse que vous cherchez, n\'hésitez pas à nous contacter directement.'}</p>
            </div>
            <div className="flex flex-wrap gap-4">
               <button className="flex items-center gap-3 px-8 py-4 bg-white text-[#002352] rounded-2xl font-black text-sm hover:scale-[1.05] transition-all">
                  <Mail size={20} />
                  {t('contactEmail') || 'Support Email'}
               </button>
               <button className="flex items-center gap-3 px-8 py-4 bg-white/10 text-white border border-white/20 rounded-2xl font-black text-sm hover:bg-white/20 transition-all">
                  <MessageSquare size={20} />
                  {t('chatWithUs') || 'Chat Direct'}
               </button>
            </div>
         </div>
      </div>
    </div>
  );
}
