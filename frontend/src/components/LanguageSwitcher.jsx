import React from 'react';

function LanguageSwitcher({ language, setLanguage }) {
    return (
        <div className="language-switcher">
            <button
                className={`button ${language === 'en' ? 'active' : ''}`}
                onClick={() => setLanguage('en')}
            >
                English
            </button>
            <button
                className={`button ${language === 'ar' ? 'active' : ''}`}
                onClick={() => setLanguage('ar')}
            >
                عربي
            </button>
        </div>
    );
}

export default LanguageSwitcher;
