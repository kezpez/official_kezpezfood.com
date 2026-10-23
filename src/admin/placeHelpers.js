import loadGoogleMaps from '../google_maps/LoadGoogleMaps'

// Google Places (New) library: autocomplete widget + text search
export async function loadPlaces(apiKey) {
    await loadGoogleMaps(apiKey)
    return window.google.maps.importLibrary('places')
}

export const PLACE_FIELDS = [
    'id',
    'displayName',
    'formattedAddress',
    'location',
    'addressComponents',
]

// Rough city boxes for the two cities the site covers
export function guessCity(lat, lng) {
    if (lat > 40.45 && lat < 41.0 && lng > -74.3 && lng < -73.65) return 'nyc'
    if (lat > 33.6 && lat < 34.5 && lng > -118.95 && lng < -117.6) return 'la'
    return ''
}

// Prefer one of the district names already used on the site, so filters
// keep working ("Midtown Manhattan" → "Midtown"); else use Google's neighborhood.
export function guessDistrict(components = [], knownDistricts = []) {
    const parts = components.map((c) => ({
        text: c.longText || c.long_name || '',
        types: c.types || [],
    }))
    const known = knownDistricts.filter(Boolean)
    for (const p of parts) {
        const hit = known.find(
            (k) =>
                p.text.toLowerCase() === k.toLowerCase() ||
                p.text.toLowerCase().includes(k.toLowerCase())
        )
        if (hit) return hit
    }
    const pick = (type) => parts.find((p) => p.types.includes(type))?.text
    return pick('neighborhood') || pick('sublocality_level_1') || ''
}

// Turn a Google Place (already fetched) into the fields of a restaurants row
export function placeToFields(place, knownDistricts) {
    const lat = place.location?.lat()
    const lng = place.location?.lng()
    return {
        name: place.displayName || '',
        address: place.formattedAddress || '',
        lat,
        lng,
        place_id: place.id,
        city: guessCity(lat, lng),
        district: guessDistrict(place.addressComponents, knownDistricts),
    }
}

export const slugify = (s) =>
    s
        .toLowerCase()
        .normalize('NFD')
        .replace(/[̀-ͯ]/g, '')
        .replace(/[^a-z0-9]+/g, '_')
        .replace(/^_+|_+$/g, '')

// Shrink a phone photo to a web-friendly JPEG (max 1600px, ~85% quality)
export async function toWebJpeg(file, maxSide = 1600) {
    const bitmap = await createImageBitmap(file)
    const scale = Math.min(1, maxSide / Math.max(bitmap.width, bitmap.height))
    const canvas = document.createElement('canvas')
    canvas.width = Math.round(bitmap.width * scale)
    canvas.height = Math.round(bitmap.height * scale)
    canvas.getContext('2d').drawImage(bitmap, 0, 0, canvas.width, canvas.height)
    return new Promise((resolve, reject) =>
        canvas.toBlob(
            (b) => (b ? resolve(b) : reject(new Error('Could not read photo'))),
            'image/jpeg',
            0.85
        )
    )
}
