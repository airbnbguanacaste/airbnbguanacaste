import { directionsUrl } from '../utils/maps.js';

export default function PlaceCard({ place, t }) {
  const label = t.categories[place.category] ?? t.categories.other;
  const description = t.descriptions[place.category] ?? t.descriptions.other;

  return (
    <li className="card">
      {/* Optional photo: set "image" for a place in src/data/places.json */}
      {place.image && (
        <img className="card__image" src={place.image} alt="" loading="lazy" />
      )}
      <div className="card__body">
        <p className="card__category">
          <span className={`dot dot--${place.category}`} aria-hidden="true" />
          {label}
        </p>
        {/* Business names are never translated */}
        <h3 className="card__name">{place.name}</h3>
        <p className="card__text">{description}</p>
        <a
          className="btn btn--outline card__cta"
          href={directionsUrl(place)}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${t.card.directions}: ${place.name} (${t.card.opensInNewTab})`}
        >
          {t.card.directions} <span aria-hidden="true">↗</span>
        </a>
      </div>
    </li>
  );
}
