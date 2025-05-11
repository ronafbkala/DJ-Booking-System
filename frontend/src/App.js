import React, { useState } from 'react';
import Header from './components/Header';
import Footer from "./components/Footer";
//import Calendar from './components/Calendar';
import AboutUs from './components/AboutUs';
import LanguageSwitcher from './components/LanguageSwitcher';
import en from './locales/en.json';
import ar from './locales/ar.json';
import logo from './resources/djLogo.png';
import RealCalendar from './components/RealCalendar';
import Gallery from './components/Gallery';



import './Home.css';


function App() {
    const [language, setLanguage] = useState('en');
    const [page, setPage] = useState('home');
    const translations = language === 'en' ? en : ar;

    return (
        <div className="app-wrapper">
            <div className="top-bar">
                <nav>
                    <button
                        onClick={() => setPage('home')}
                        className={`button ${page === 'home' ? 'active' : ''}`}
                    >
                        {language === 'en' ? 'Home' : 'الصفحة الرئيسية'}
                    </button>
                    <button
                        onClick={() => setPage('about')}
                        className={`button ${page === 'about' ? 'active' : ''}`}
                    >
                        {translations.about}
                    </button>
                    <button
                        onClick={() => setPage('gallery')}
                        className={`button ${page === 'gallery' ? 'active' : ''}`}
                    >
                        {translations.gallery_title}
                    </button>
                </nav>
                <LanguageSwitcher language={language} setLanguage={setLanguage} />
            </div>

            <div className="main-content">
                {page === 'home' && (
                    <>
                        <Header logo={logo} />
                        <h1 style={{ textAlign: 'center' }}>{translations.welcome}</h1>
                        <RealCalendar translations={translations} language={language} />
                    </>
                )}

                {page === 'about' && (
                    <AboutUs translations={translations} logo={logo} />
                )}

                {page === 'gallery' && (
                    <Gallery translations={translations} />
                )}
            </div>

            <Footer translations={translations} />
        </div>
    );
}

export default App;
