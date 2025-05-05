import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import { translations } from './translations'

i18n
  .use(initReactI18next)
  .init({
    resources: {
      pt: {
        translation: translations.pt
      },
      en: {
        translation: translations.en
      }
    },
    lng: localStorage.getItem('i18nextLng') || 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  })

export default i18n 