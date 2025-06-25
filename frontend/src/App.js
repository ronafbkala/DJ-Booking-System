import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate, Navigate } from 'react-router-dom';

import Header from './components/Header';
import Footer from "./components/Footer";
import AboutUs from './components/AboutUs';
import LanguageSwitcher from './components/LanguageSwitcher';
import en from './locales/en.json';
import ar from './locales/ar.json';
import logo from './resources/djLogo.png';
import RealCalendar from './components/RealCalendar';
import Gallery from './components/Gallery';
import RoleSelector from './components/RoleSelector';
import AdminPanel from './components/AdminPanel';

import './Home.css';

function HomePage({ translations, language, isAdminLoggedIn }) {
    return (
        <>
            <Header logo={logo} />
            <h1 style={{ textAlign: 'center' }}>{translations.welcome}</h1>
            <RealCalendar translations={translations} language={language} isAdminLoggedIn={isAdminLoggedIn} />
        </>
    );
}

function App() {
    const [language, setLanguage] = useState('en');
    //const [page, setPage] = useState('home');
    const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
    const translations = language === 'en' ? en : ar;

    const navigate = useNavigate();

    return (
        <div className="app-wrapper">
            <div className="top-bar">
                <nav>
                    <button
                        onClick={() => navigate(isAdminLoggedIn ? '/admin-home' : '/user-home')}
                        className="button"
                    >
                        {language === 'en' ? 'Home' : 'الصفحة الرئيسية'}
                    </button>
                    <button
                        onClick={() => navigate('/about')}
                        className="button"
                    >
                        {translations.about}
                    </button>
                    <button
                        onClick={() => navigate('/gallery')}
                        className="button"
                    >
                        {translations.gallery_title}
                    </button>
                    {isAdminLoggedIn && (
                        <button
                            onClick={() => navigate('/admin-panel')}
                            className="button"
                        >
                            {translations.admin_button}
                        </button>
                    )}
                </nav>
                <LanguageSwitcher language={language} setLanguage={setLanguage} />
            </div>

            <div className="main-content">
                <Routes>
                    <Route path="/" element={<Navigate to="/admin" />} />
                    <Route
                        path="/admin"
                        element={<RoleSelector translations={translations} setIsAdminLoggedIn={setIsAdminLoggedIn} />}
                    />
                    <Route
                        path="/admin-panel"
                        element={<AdminPanel translations={translations} />}
                    />
                    <Route
                        path="/user-home"
                        element={<HomePage translations={translations} language={language} isAdminLoggedIn={false} />}
                    />

                    <Route
                        path="/admin-home"
                        element={<HomePage translations={translations} language={language} isAdminLoggedIn={true} />}
                    />

                    <Route
                        path="/about"
                        element={<AboutUs translations={translations} logo={logo} />}
                    />
                    <Route
                        path="/gallery"
                        element={<Gallery translations={translations} />}
                    />
                </Routes>
            </div>

            <Footer translations={translations} />
        </div>
    );
}

// 👇 Exportera appen med Router så useNavigate fungerar korrekt
export default function WrappedApp() {
    return (
        <Router>
            <App />
        </Router>
    );
}