import { renderHook } from '@testing-library/react-hooks'
import { useTranslation } from 'react-i18next'
// eslint-disable-next-line prettier/prettier

import i18n from '@/i18n'

import enTranslation from '../public/locales/en/common.json'
import frTranslation from '../public/locales/fr/common.json'

describe('Translations', () => {
  beforeAll(() => {
    i18n.addResourceBundle('en', 'common', enTranslation, true, true)
    i18n.addResourceBundle('fr', 'common', frTranslation, true, true)
  })

  describe('translations with renderHook', () => {
    test('renders the "Sign Up" translation in English', () => {
      i18n.changeLanguage('en')
      const { result } = renderHook(() => useTranslation())
      expect(result.current.t('signUp')).toBe('Sign Up')
    })

    test('renders the "Sign Up" translation in French', () => {
      i18n.changeLanguage('fr')
      const { result } = renderHook(() => useTranslation())
      expect(result.current.t('signUp')).toBe("S'inscrire")
    })

    test('renders the "English" translation in English', () => {
      i18n.changeLanguage('en')
      const { result } = renderHook(() => useTranslation())
      expect(result.current.t('english')).toBe('English')
    })

    test('renders the "English" translation in French', () => {
      i18n.changeLanguage('fr')
      const { result } = renderHook(() => useTranslation())
      expect(result.current.t('english')).toBe('Anglais')
    })

    test('renders the "Dark Mode" translation in English', () => {
      i18n.changeLanguage('en')
      const { result } = renderHook(() => useTranslation())
      expect(result.current.t('darkMode')).toBe('Dark Mode')
    })

    test('renders the "Dark Mode" translation in French', () => {
      i18n.changeLanguage('fr')
      const { result } = renderHook(() => useTranslation())
      expect(result.current.t('darkMode')).toBe('Mode sombre')
    })

    test('renders the "noResults" translation in English', () => {
      i18n.changeLanguage('en')
      const { result } = renderHook(() => useTranslation())
      expect(result.current.t('noResults')).toBe('No results found')
    })

    test('renders the "noResults" translation in French', () => {
      i18n.changeLanguage('fr')
      const { result } = renderHook(() => useTranslation())
      expect(result.current.t('noResults')).toBe('Aucun résultat trouvé')
    })

    test('renders the "newMessage" translation in English', () => {
      i18n.changeLanguage('en')
      const { result } = renderHook(() => useTranslation())
      expect(result.current.t('newMessage')).toBe('New Message')
    })

    test('renders the "newMessage" translation in French', () => {
      i18n.changeLanguage('fr')
      const { result } = renderHook(() => useTranslation())
      expect(result.current.t('newMessage')).toBe('Nouveau message')
    })
  })
})
