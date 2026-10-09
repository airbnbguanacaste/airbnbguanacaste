import { useMemo, useState } from 'react';
import { CATEGORY_ORDER } from '../i18n.js';
import { filterPlaces } from '../utils/filter.js';
import PlaceCard from './PlaceCard.jsx';

export default function Directory({ places, t }) {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('all');

  // Only offer categories that actually have places, with their totals.
  const categories = useMemo(() => {
    const counts = {};
    places.forEach((p) => {
      counts[p.category] = (counts[p.category] || 0) + 1;
    });
    return CATEGORY_ORDER.filter((key) => counts[key]).map((key) => ({
      key,
      count: counts[key],
    }));
  }, [places]);

  const results = useMemo(
    () => filterPlaces(places, { query, category }),
    [places, query, category]
  );

  const clearAll = () => {
    setQuery('');
    setCategory('all');
  };

  return (
    <section className="section" id="places" aria-labelledby="places-title">
      <div className="container">
        <h2 id="places-title" className="section__title">
          {t.places.title}
        </h2>
        <p className="section__intro">{t.places.intro}</p>

        <div className="controls">
          <input
            className="search"
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t.places.searchPlaceholder}
            aria-label={t.places.searchLabel}
            autoComplete="off"
          />

          <div className="chips" role="group" aria-label={t.places.filtersLabel}>
            <button
              type="button"
              className={`chip${category === 'all' ? ' is-active' : ''}`}
              aria-pressed={category === 'all'}
              onClick={() => setCategory('all')}
            >
              {t.places.all} <span className="chip__count">{places.length}</span>
            </button>
            {categories.map(({ key, count }) => (
              <button
                key={key}
                type="button"
                className={`chip${category === key ? ' is-active' : ''}`}
                aria-pressed={category === key}
                onClick={() => setCategory(key)}
              >
                {t.categories[key]} <span className="chip__count">{count}</span>
              </button>
            ))}
          </div>
        </div>

        <p className="result-count" role="status" aria-live="polite">
          {t.places.count(results.length, places.length)}
        </p>

        {results.length > 0 ? (
          <ul className="grid">
            {results.map((place) => (
              <PlaceCard key={place.id} place={place} t={t} />
            ))}
          </ul>
        ) : (
          <div className="empty">
            <h3 className="empty__title">{t.places.emptyTitle}</h3>
            <p>{t.places.emptyText}</p>
            <button type="button" className="btn btn--outline" onClick={clearAll}>
              {t.places.clear}
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
