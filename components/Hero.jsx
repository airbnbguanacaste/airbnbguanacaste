export default function Hero({ t }) {
  return (
    <section className="hero">
      <div className="container hero__inner">
        <p className="eyebrow">{t.hero.eyebrow}</p>
        <h1 className="hero__title">{t.hero.title}</h1>
        <p className="hero__subtitle">{t.hero.subtitle}</p>
        <div className="hero__actions">
          <a className="btn btn--primary" href="#places">
            {t.hero.browse}
          </a>
          <a className="btn btn--ghost" href="#map">
            {t.hero.map}
          </a>
        </div>
      </div>
    </section>
  );
}
