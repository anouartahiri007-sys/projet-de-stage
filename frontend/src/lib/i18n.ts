import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'

const resources = {
  fr: {
    translation: {
      "dashboard": "Tableau de Bord",
      "personnel": "Gestion du Personnel",
      "training": "Formation & Dév.",
      "health": "Santé au Travail",
      "veterinary": "Service Vétérinaire",
      "reports": "Rapports & Analytique",
      "settings": "Paramètres",
      "logout": "Déconnexion",
      "welcome": "Bienvenue sur E-RH Larache",
      "search": "Rechercher...",
      "notifications": "Notifications",
      "view_all": "Voir tout",
      "save_changes": "Sauvegarder les modifications",
      "cancel": "Annuler",
    }
  },
  ar: {
    translation: {
      "dashboard": "لوحة القيادة",
      "personnel": "إدارة الموظفين",
      "training": "التكوين والتطوير",
      "health": "الصحة المهنية",
      "veterinary": "المصلحة البيطرية",
      "reports": "التقارير والتحليلات",
      "settings": "الإعدادات",
      "logout": "تسجيل الخروج",
      "welcome": "مرحبًا بكم في E-RH العرائش",
      "search": "بحث...",
      "notifications": "تنبيهات",
      "view_all": "عرض الكل",
      "save_changes": "حفظ التغييرات",
      "cancel": "إلغاء",
    }
  }
}

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'fr',
    interpolation: {
      escapeValue: false
    }
  })

export default i18n
