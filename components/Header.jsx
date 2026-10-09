export default function Header({ t, lang, onLangChange }) {
  return (
    <header className="header">
      <div className="container header__inner">
        <a className="brand" href="#top">
          {t.siteName}
        </a>

        <nav className="nav" aria-label="Main">
          <a href="#places">{t.nav.places}</a>
          <a href="#map">{t.nav.map}</a>
        </nav>

        <div className="lang" role="group" aria-label={t.languageLabel}>
          {['en', 'es'].map((code) => (
            <button
              key={code}
              type="button"
              className={`lang__btn${lang === code ? ' is-active' : ''}`}
              aria-pressed={lang === code}
              onClick={() => onLangChange(code)}
              lang={code}
            >
              {code.toUpperCase()}
            </button>
          ))}
        </div>
      </div>
    </header>
  );
}
