import { useEffect, useMemo, useRef, useState } from 'react'
import { supabase } from '../supabaseClient'
import GoogleMaps from '../google_maps/GoogleMaps'
import { googleMapsLink } from '../googleMapsLink'
import {
    loadPlaces,
    PLACE_FIELDS,
    placeToFields,
    slugify,
    toWebJpeg,
} from './placeHelpers'
import './AddRestaurant.css'

const apiKey = import.meta.env.VITE_GOOGLE_MAPS_KEY
const RATINGS = [
    '10/10',
    '9.5/10',
    '9/10',
    '8.5/10',
    '8/10',
    '7.5/10',
    '7/10',
    '6.5/10',
    '6/10',
    '5/10',
]
const CITY_NAMES = { nyc: 'New York', la: 'Los Angeles' }
const storageImage = (path) =>
    `${import.meta.env.VITE_SUPABASE_URL}/storage/v1/object/public/images/${path}.jpg`

const uniqueValues = (rows, key) =>
    [...new Set(rows.map((r) => (r[key] ?? '').trim()).filter(Boolean))].sort()

const EMPTY = {
    name: '',
    address: '',
    lat: '',
    lng: '',
    place_id: '',
    city: '',
    district: '',
    cuisine: '',
    price: '$$',
    rating: '',
    description: '',
    food_type: '',
    reel_url: '',
}

export default function AddRestaurant() {
    const [session, setSession] = useState(null)
    const [authReady, setAuthReady] = useState(false)

    useEffect(() => {
        document.title = 'Add restaurant · Kezpezfood'
        supabase.auth.getSession().then(({ data }) => {
            setSession(data.session)
            setAuthReady(true)
        })
        const { data } = supabase.auth.onAuthStateChange((_e, s) =>
            setSession(s)
        )
        return () => data.subscription.unsubscribe()
    }, [])

    if (!authReady) return <div className="admin-page">Loading…</div>
    if (!session) return <SignIn />
    return <AdminTools session={session} />
}

/* ───────────────────────── Sign in ───────────────────────── */

function SignIn() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [busy, setBusy] = useState(false)

    const submit = async (e) => {
        e.preventDefault()
        setBusy(true)
        setError('')
        const { error } = await supabase.auth.signInWithPassword({
            email,
            password,
        })
        if (error) setError(error.message)
        setBusy(false)
    }

    return (
        <div className="admin-page">
            <form className="admin-card admin-signin" onSubmit={submit}>
                <h1>Kezpezfood admin</h1>
                <p className="admin-muted">Sign in to add restaurants.</p>
                <label>
                    Email
                    <input
                        type="email"
                        autoComplete="username"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </label>
                <label>
                    Password
                    <input
                        type="password"
                        autoComplete="current-password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </label>
                {error && <p className="admin-error">{error}</p>}
                <button className="admin-btn" disabled={busy}>
                    {busy ? 'Signing in…' : 'Sign in'}
                </button>
            </form>
        </div>
    )
}

/* ───────────────────────── Main tools ───────────────────────── */

function AdminTools({ session }) {
    const [restaurants, setRestaurants] = useState([])
    const [tab, setTab] = useState('add')

    const refresh = async () => {
        const { data, error } = await supabase
            .from('restaurants')
            .select('*')
            .order('name')
        if (!error) setRestaurants(data ?? [])
    }
    useEffect(() => {
        refresh()
    }, [])

    const missingCount = restaurants.filter((r) => !r.place_id).length

    return (
        <div className="admin-page">
            <div className="admin-header">
                <div>
                    <h1>Kezpezfood admin</h1>
                    <p className="admin-muted">
                        Signed in as {session.user.email} ·{' '}
                        <button
                            className="admin-link"
                            onClick={() => supabase.auth.signOut()}
                        >
                            Sign out
                        </button>
                    </p>
                </div>
                <div className="admin-tabs">
                    <button
                        className={tab === 'add' ? 'active' : ''}
                        onClick={() => setTab('add')}
                    >
                        Add restaurant
                    </button>
                    <button
                        className={tab === 'link' ? 'active' : ''}
                        onClick={() => setTab('link')}
                    >
                        Link Place IDs{missingCount ? ` (${missingCount})` : ''}
                    </button>
                </div>
            </div>
            {tab === 'add' ? (
                <AddForm restaurants={restaurants} onSaved={refresh} />
            ) : (
                <LinkPlaceIds restaurants={restaurants} onChanged={refresh} />
            )}
        </div>
    )
}

/* ───────────────────────── Add form ───────────────────────── */

function AddForm({ restaurants, onSaved }) {
    const [form, setForm] = useState(EMPTY)
    const [photo, setPhoto] = useState(null)
    const photoUrl = useMemo(
        () => (photo ? URL.createObjectURL(photo) : null),
        [photo]
    )
    const [status, setStatus] = useState({ type: '', text: '' })
    const [saving, setSaving] = useState(false)
    const [placesError, setPlacesError] = useState('')
    const searchHost = useRef(null)
    const knownRef = useRef({ districts: [] })

    const cuisines = useMemo(
        () => uniqueValues(restaurants, 'cuisine'),
        [restaurants]
    )
    const districts = useMemo(
        () => uniqueValues(restaurants, 'district'),
        [restaurants]
    )
    const foodTypes = useMemo(
        () => uniqueValues(restaurants, 'food_type'),
        [restaurants]
    )
    knownRef.current.districts = districts

    const set = (key) => (e) =>
        setForm((f) => ({ ...f, [key]: e.target.value }))

    const duplicate = form.place_id
        ? restaurants.find((r) => r.place_id === form.place_id)
        : form.name
          ? restaurants.find(
                (r) =>
                    r.name?.trim().toLowerCase() ===
                        form.name.trim().toLowerCase() &&
                    (!form.city || r.city === form.city)
            )
          : null

    // Google autocomplete search box
    useEffect(() => {
        let el
        let cancelled = false
        let lastHandled = 0

        const applyPlace = async (place) => {
            if (Date.now() - lastHandled < 1500) return // ignore duplicate event
            lastHandled = Date.now()
            await place.fetchFields({ fields: PLACE_FIELDS })
            const fields = placeToFields(place, knownRef.current.districts)
            setForm((f) => ({ ...f, ...fields }))
            setStatus({ type: '', text: '' })
        }

        loadPlaces(apiKey)
            .then(({ PlaceAutocompleteElement }) => {
                if (cancelled || !searchHost.current) return
                el = new PlaceAutocompleteElement({
                    includedRegionCodes: ['us'],
                })
                el.setAttribute(
                    'placeholder',
                    'Search Google, e.g. “Konban NYC”'
                )
                el.addEventListener('gmp-select', (e) =>
                    applyPlace(e.placePrediction.toPlace())
                )
                el.addEventListener('gmp-placeselect', (e) =>
                    applyPlace(e.place)
                ) // older Maps versions
                searchHost.current.appendChild(el)
            })
            .catch((err) => {
                console.error(err)
                setPlacesError(
                    'Google search could not load. Check that "Places API (New)" is enabled for your Maps key.'
                )
            })
        return () => {
            cancelled = true
            el?.remove()
        }
    }, [])

    const uploadPhoto = async (city, name) => {
        const blob = await toWebJpeg(photo)
        const base = `${city}/${slugify(name)}`
        for (let n = 1; n <= 9; n++) {
            const path = `${base}_${n}`
            const { error } = await supabase.storage
                .from('images')
                .upload(`${path}.jpg`, blob, {
                    contentType: 'image/jpeg',
                    upsert: false,
                })
            if (!error) return path
            if (!/exist|duplicate/i.test(error.message)) throw error
        }
        throw new Error('A photo with this name already exists 9 times')
    }

    const save = async (e) => {
        e.preventDefault()
        if (!form.lat || !form.lng) {
            setStatus({
                type: 'error',
                text: 'Pick the restaurant from the Google search first so it gets a map pin.',
            })
            return
        }
        setSaving(true)
        setStatus({ type: '', text: 'Saving…' })
        try {
            const images = photo
                ? await uploadPhoto(form.city, form.name)
                : null

            const row = {
                ...form,
                name: form.name.trim(),
                district: form.district.trim(),
                cuisine: form.cuisine.trim(),
                lat: Number(form.lat),
                lng: Number(form.lng),
                rating: form.rating || null,
                food_type: form.food_type.trim() || null,
                reel_url: form.reel_url.trim() || null,
                place_id: form.place_id || null,
                images,
            }

            // Existing rows use text ids "0", "1", … so continue that numbering
            const nextId =
                Math.max(
                    -1,
                    ...restaurants
                        .map((r) => Number(r.id))
                        .filter(Number.isFinite)
                ) + 1
            let { error } = await supabase
                .from('restaurants')
                .insert({ ...row, id: String(nextId) })
            if (
                error &&
                /column "id"|non-DEFAULT|identity/i.test(error.message)
            ) {
                ;({ error } = await supabase.from('restaurants').insert(row)) // id is auto-generated
            }
            if (error) throw error

            setStatus({
                type: 'ok',
                text: `Saved ${row.name}! It's now live on the ${CITY_NAMES[row.city] || row.city} pages.`,
            })
            setForm(EMPTY)
            setPhoto(null)
            e.target.reset()
            onSaved()
        } catch (err) {
            console.error(err)
            const msg = /row-level security|permission|Unauthorized|403/i.test(
                err.message
            )
                ? `${err.message} — make sure you ran the SQL setup and are signed in with the admin email.`
                : err.message
            setStatus({ type: 'error', text: msg })
        }
        setSaving(false)
    }

    return (
        <form className="admin-grid" onSubmit={save}>
            <div className="admin-card">
                <h2>1. Find it on Google</h2>
                <div ref={searchHost} className="admin-search" />
                {placesError && <p className="admin-error">{placesError}</p>}
                {form.place_id && (
                    <p className="admin-muted">
                        {form.address}
                        <br />
                        <a
                            href={googleMapsLink(form)}
                            target="_blank"
                            rel="noreferrer"
                        >
                            Check it on Google Maps ↗
                        </a>
                    </p>
                )}
                {duplicate && (
                    <p className="admin-warning">
                        Heads up: “{duplicate.name}” ({duplicate.city}) is
                        already on your site.
                    </p>
                )}
                <div className="admin-map">
                    <GoogleMaps
                        restaurants={form.lat ? [form] : []}
                        apiKey={apiKey}
                    />
                </div>
            </div>

            <div className="admin-card">
                <h2>2. Your details</h2>
                <div className="admin-fields">
                    <label className="span-2">
                        Name
                        <input
                            value={form.name}
                            onChange={set('name')}
                            required
                        />
                    </label>
                    <label>
                        City
                        <select
                            value={form.city}
                            onChange={set('city')}
                            required
                        >
                            <option value="">Choose…</option>
                            <option value="nyc">NYC</option>
                            <option value="la">LA</option>
                        </select>
                    </label>
                    <label>
                        District
                        <input
                            list="admin-districts"
                            value={form.district}
                            onChange={set('district')}
                            placeholder="e.g. Koreatown"
                        />
                    </label>
                    <label>
                        Cuisine
                        <input
                            list="admin-cuisines"
                            value={form.cuisine}
                            onChange={set('cuisine')}
                            required
                            placeholder="e.g. Korean"
                        />
                    </label>
                    <label>
                        Price
                        <select value={form.price} onChange={set('price')}>
                            <option>$</option>
                            <option>$$</option>
                            <option>$$$</option>
                        </select>
                    </label>
                    <label>
                        Your rating
                        <select value={form.rating} onChange={set('rating')}>
                            <option value="">—</option>
                            {RATINGS.map((r) => (
                                <option key={r}>{r}</option>
                            ))}
                        </select>
                    </label>
                    <label>
                        Food type{' '}
                        <span className="admin-muted">(optional)</span>
                        <input
                            list="admin-foodtypes"
                            value={form.food_type}
                            onChange={set('food_type')}
                            placeholder="pizza, bagels…"
                        />
                    </label>
                    <label className="span-2">
                        Description
                        <textarea
                            rows={3}
                            value={form.description}
                            onChange={set('description')}
                            placeholder="What to order, why you love it…"
                        />
                    </label>
                    <label className="span-2">
                        Instagram reel link{' '}
                        <span className="admin-muted">(optional)</span>
                        <input
                            type="url"
                            value={form.reel_url}
                            onChange={set('reel_url')}
                            placeholder="https://www.instagram.com/reel/…"
                        />
                    </label>
                    <label className="span-2">
                        Photo
                        <input
                            type="file"
                            accept="image/*"
                            onChange={(e) =>
                                setPhoto(e.target.files?.[0] ?? null)
                            }
                        />
                    </label>
                    {photoUrl && (
                        <img
                            className="admin-photo-preview span-2"
                            src={photoUrl}
                            alt="Photo preview"
                        />
                    )}
                </div>

                <datalist id="admin-districts">
                    {districts.map((d) => (
                        <option key={d} value={d} />
                    ))}
                </datalist>
                <datalist id="admin-cuisines">
                    {cuisines.map((c) => (
                        <option key={c} value={c} />
                    ))}
                </datalist>
                <datalist id="admin-foodtypes">
                    {foodTypes.map((c) => (
                        <option key={c} value={c} />
                    ))}
                </datalist>

                {status.text && (
                    <p
                        className={
                            status.type === 'error'
                                ? 'admin-error'
                                : status.type === 'ok'
                                  ? 'admin-ok'
                                  : 'admin-muted'
                        }
                    >
                        {status.text}
                    </p>
                )}
                <button className="admin-btn" disabled={saving}>
                    {saving ? 'Saving…' : 'Save restaurant'}
                </button>
            </div>
        </form>
    )
}

/* ───────────────────── Link Place IDs to existing rows ───────────────────── */

function LinkPlaceIds({ restaurants, onChanged }) {
    const missing = restaurants.filter((r) => !r.place_id)
    const linked = restaurants.length - missing.length

    return (
        <div className="admin-card">
            <h2>Link existing restaurants to Google</h2>
            <p className="admin-muted">
                {linked} of {restaurants.length} linked. Click <b>Find</b>,
                check the address, then pick the right match. Restaurants with
                no map pin get their location filled in too.
            </p>
            {missing.length === 0 ? (
                <p className="admin-ok">All restaurants are linked 🎉</p>
            ) : (
                <ul className="admin-link-list">
                    {missing.map((r) => (
                        <LinkRow
                            key={r.id}
                            restaurant={r}
                            onChanged={onChanged}
                        />
                    ))}
                </ul>
            )}
        </div>
    )
}

function LinkRow({ restaurant: r, onChanged }) {
    const [matches, setMatches] = useState(null)
    const [msg, setMsg] = useState('')
    const [busy, setBusy] = useState(false)

    const find = async () => {
        setBusy(true)
        setMsg('')
        try {
            const { Place } = await loadPlaces(apiKey)
            const hasPin = Number.isFinite(Number(r.lat)) && r.lat !== null
            const { places } = await Place.searchByText({
                textQuery: `${r.name} ${r.district || ''} ${CITY_NAMES[r.city] || r.city || ''}`,
                fields: ['id', 'displayName', 'formattedAddress', 'location'],
                maxResultCount: 3,
                ...(hasPin
                    ? {
                          locationBias: {
                              lat: Number(r.lat),
                              lng: Number(r.lng),
                          },
                      }
                    : {}),
            })
            setMatches(places)
            if (!places.length) setMsg('No matches on Google.')
        } catch (err) {
            console.error(err)
            setMsg(
                'Search failed — check that "Places API (New)" is enabled for your Maps key.'
            )
        }
        setBusy(false)
    }

    const choose = async (place) => {
        setBusy(true)
        const update = { place_id: place.id }
        if (r.lat == null || r.lng == null) {
            update.lat = place.location.lat()
            update.lng = place.location.lng()
        }
        if (!r.address) update.address = place.formattedAddress
        const { data, error } = await supabase
            .from('restaurants')
            .update(update)
            .eq('id', r.id)
            .select()
        if (error)
            setMsg(
                /duplicate|unique/i.test(error.message)
                    ? 'That Google place is already linked to another restaurant.'
                    : error.message
            )
        else if (!data?.length)
            setMsg(
                'Not saved — make sure you ran the SQL setup and are signed in with the admin email.'
            )
        else onChanged()
        setBusy(false)
    }

    return (
        <li>
            <div className="admin-link-row">
                {r.images && (
                    <img
                        src={storageImage(r.images)}
                        alt=""
                        onError={(e) => (e.target.style.visibility = 'hidden')}
                    />
                )}
                <div>
                    <b>{r.name}</b>
                    <div className="admin-muted">
                        {[r.district, r.city?.toUpperCase()]
                            .filter(Boolean)
                            .join(', ')}{' '}
                        {r.lat == null && '· no map pin yet'}
                    </div>
                </div>
                <button
                    type="button"
                    className="admin-btn small"
                    onClick={find}
                    disabled={busy}
                >
                    {busy && !matches ? 'Searching…' : 'Find'}
                </button>
            </div>
            {matches?.length > 0 && (
                <div className="admin-matches">
                    {matches.map((p) => (
                        <button
                            type="button"
                            key={p.id}
                            onClick={() => choose(p)}
                            disabled={busy}
                        >
                            <b>{p.displayName}</b>
                            <span>{p.formattedAddress}</span>
                        </button>
                    ))}
                </div>
            )}
            {msg && <p className="admin-error">{msg}</p>}
        </li>
    )
}
