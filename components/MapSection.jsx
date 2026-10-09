import { MAP_EMBED_URL, MAP_VIEW_URL } from '../config.js';

export default function MapSection({ t }) {
  return (
    <section className="section section--sand" id="map" aria-labelledby="map-title">
      <div className="container map">
        <h2 id="map-title" className="section__title">
          {t.map.title}
        </h2>
        <p className="section__intro">{t.map.text}</p>

        <a
          className="btn btn--primary btn--large"
          href={MAP_VIEW_URL}
          target="_blank"
          rel="noopener noreferrer"
        >
          {t.map.open} <span aria-hidden="true">↗</span>
        </a>

        {/* The embed only appears if MAP_EMBED_URL is set in src/config.js */}
        {MAP_EMBED_URL && (
          <div className="map__frame">
            <iframe
              src={MAP_EMBED_URL}
              title={t.map.embedTitle}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>
        )}
      </div>
    </section>
  );
}
