import { useEffect, useState } from 'react';
import places from './data/places.json';
import { translations } from './i18n.js';
import Header from './components/Header.jsx';
import Hero from './components/Hero.jsx';
import Directory from './components/Directory.jsx';
import MapSection from './components/MapSection.jsx';
import Footer from './components/Footer.jsx';

const STORAGE_KEY = 'explore-guanacaste-lang';

// English is the default. A guest's choice is remembered on their device.
function getInitialLang() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === 'en' || saved === 'es') return saved;
  } catch {
    // Storage can be blocked (private mode); just use the default.
  }
  return 'en';
}

export default function App() {
  const [lang, setLang] = useState(getInitialLang);
  const t = translations[lang];

  useEffect(() => {
    document.documentElement.lang = lang;
    document.title = t.siteName;
    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch {
      // ignore
    }
  }, [lang, t.siteName]);

  return (
    <>
      <Header t={t} lang={lang} onLangChange={setLang} />
      <main id="top">
        <Hero t={t} />
        <Directory places={places} t={t} />
        <MapSection t={t} />
      </main>
      <Footer t={t} />
    </>
  );
}
