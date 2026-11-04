import { useState } from 'react'
import './MobileSearch.css'

const CITY_LABELS = { LA: 'Los Angeles', NYC: 'New York City' }
const PRICES = ['$', '$$', '$$$']

function SearchIcon() {
    return (
        <svg
            className="ms-search-icon"
            viewBox="0 0 24 24"
            width="20"
            height="20"
            aria-hidden="true"
        >
            <circle
                cx="11"
                cy="11"
                r="7"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
            />
            <line
                x1="16.5"
                y1="16.5"
                x2="21"
                y2="21"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
            />
        </svg>
    )
}

function CheckIcon() {
    return (
        <svg viewBox="0 0 16 16" width="12" height="12" aria-hidden="true">
            <path
                d="M3.5 8.5l3 3 6-7"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    )
}

/**
 * Mobile-only search: a pill search bar that drops down one filter card.
 * Uses the same filter state as the desktop bar on the home page.
 */
export default function MobileSearch({
    cuisines,
    cityDistrictMap,
    cuisine,
    setCuisine,
    city,
    setCity,
    district,
    setDistrict,
    price,
    setPrice,
    onSearch,
}) {
    const [open, setOpen] = useState(false)

    const summary = [cuisine, city && CITY_LABELS[city], district, price]
        .filter(Boolean)
        .join(' · ')

    // Districts are unique per city (NYC had "Nolita" twice)
    const districts = city ? [...new Set(cityDistrictMap[city] ?? [])] : []

    return (
        <div className={`mobile-search ${open ? 'is-open' : ''}`}>
            <button
                type="button"
                className="ms-pill"
                aria-expanded={open}
                aria-controls="ms-panel"
                onClick={() => setOpen(!open)}
            >
                <SearchIcon />
                <span className={summary ? 'ms-pill-value' : 'ms-pill-hint'}>
                    {summary || 'Search for a place to eat'}
                </span>
            </button>

            {open && (
                <div className="ms-panel" id="ms-panel">
                    <label className="ms-label" htmlFor="ms-cuisine">
                        Cuisine
                    </label>
                    <div className="ms-select-wrap">
                        <select
                            id="ms-cuisine"
                            className="ms-select"
                            value={cuisine}
                            onChange={(e) => setCuisine(e.target.value)}
                        >
                            <option value="">Any cuisine</option>
                            {cuisines.map((c) => (
                                <option key={c} value={c}>
                                    {c}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="ms-label" id="ms-city-label">
                        City
                    </div>
                    <div
                        className="ms-radios"
                        role="radiogroup"
                        aria-labelledby="ms-city-label"
                    >
                        {Object.keys(CITY_LABELS).map((c) => (
                            <label key={c} className="ms-radio">
                                <input
                                    type="radio"
                                    name="ms-city"
                                    value={c}
                                    checked={city === c}
                                    onChange={() => {
                                        setCity(c)
                                        setDistrict('')
                                    }}
                                />
                                <span className="ms-radio-dot" />
                                {CITY_LABELS[c]}
                            </label>
                        ))}
                    </div>

                    {city && (
                        <>
                            <label className="ms-label" htmlFor="ms-district">
                                District
                            </label>
                            <div className="ms-select-wrap">
                                <select
                                    id="ms-district"
                                    className="ms-select"
                                    value={district}
                                    onChange={(e) =>
                                        setDistrict(e.target.value)
                                    }
                                >
                                    <option value="">Any district</option>
                                    {districts.map((d) => (
                                        <option key={d} value={d}>
                                            {d}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </>
                    )}

                    <div className="ms-label" id="ms-price-label">
                        Price
                    </div>
                    <div
                        className="ms-chips"
                        role="group"
                        aria-labelledby="ms-price-label"
                    >
                        {PRICES.map((p) => (
                            <button
                                key={p}
                                type="button"
                                className={`ms-chip ${price === p ? 'is-selected' : ''}`}
                                aria-pressed={price === p}
                                onClick={() => setPrice(price === p ? '' : p)}
                            >
                                {price === p && (
                                    <span className="ms-chip-check">
                                        <CheckIcon />
                                    </span>
                                )}
                                {p}
                            </button>
                        ))}
                    </div>

                    <div className="ms-actions">
                        <button
                            type="button"
                            className="ms-btn ms-btn-back"
                            onClick={() => setOpen(false)}
                        >
                            Back
                        </button>
                        <button
                            type="button"
                            className="ms-btn ms-btn-search"
                            onClick={onSearch}
                        >
                            Search
                        </button>
                    </div>
                </div>
            )}
        </div>
    )
}
