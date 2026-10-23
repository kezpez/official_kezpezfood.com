// Link to the restaurant's real Google Maps listing.
// With a Place ID, Google opens the exact place; otherwise it searches name + address.
export function googleMapsLink(restaurant) {
    if (!restaurant) return null
    const { name = '', address = '', place_id: placeId } = restaurant
    if (!placeId && !address) return null
    const query = encodeURIComponent(`${name} ${address}`.trim())
    return (
        `https://www.google.com/maps/search/?api=1&query=${query}` +
        (placeId ? `&query_place_id=${encodeURIComponent(placeId)}` : '')
    )
}
