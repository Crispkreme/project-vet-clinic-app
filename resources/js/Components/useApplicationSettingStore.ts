import { create } from 'zustand';
import i18n from '@/Components/localizations/i18n';

export const Languages = {
  ENGLISH: 'en',
  JAPANESE: 'ja',
} as const;

export type Language = (typeof Languages)[keyof typeof Languages]; // Export the Language type

interface IApplicationSettingsStore {
  selectedLanguage: Language;
  setLanguage: (language: Language) => void;
}

export const useApplicationSettingsStore = create<IApplicationSettingsStore>()((set) => ({
    selectedLanguage: Languages.ENGLISH, // Default language
    setLanguage: (language: Language) => {
      set({ selectedLanguage: language });
      i18n.changeLanguage(language.toLocaleLowerCase());
    },
  }));