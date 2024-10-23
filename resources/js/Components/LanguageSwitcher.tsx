import React from "react";
import i18n from "./localizations/i18n";
import { useApplicationSettingsStore, Languages } from "./useApplicationSettingStore";
import { useTranslation } from "react-i18next";

const LanguageSwitcher = () => {
    const { t } = useTranslation();
    const { selectedLanguage, setLanguage } = useApplicationSettingsStore();

    const handleLanguageChange = (event: React.ChangeEvent<HTMLSelectElement>,) => {
        const selected = event.target.value;
        if (selected === Languages.ENGLISH || selected === Languages.JAPANESE) {
            setLanguage(selected);
            void i18n.changeLanguage(selected);
        };
    };

    return (
    <div className="flex flex-row items-center">
        <h3 className="mr-1">{t('selectLanguage')}</h3>
        <select
            value={selectedLanguage}
            onChange={handleLanguageChange}
            className=''
        >
            <option value={Languages.ENGLISH}>English</option>
            <option value={Languages.JAPANESE}>日本語</option>
        </select>
    </div>
    );
};

export default LanguageSwitcher;