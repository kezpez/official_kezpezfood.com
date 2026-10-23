import {
    useEffect,
    useRef,
    useState,
    forwardRef,
    useImperativeHandle,
} from 'react'
import loadGoogleMaps from './LoadGoogleMaps'

// Supabase can return numeric/text columns as strings ("40.71"),
// and Google Maps only accepts real numbers.
const toLatLng = (r) => {
    const lat = Number(r?.lat)
    const lng = Number(r?.lng)
    return Number.isFinite(lat) && Number.isFinite(lng) && (lat || lng)
        ? { lat, lng }
        : null
}

const GoogleMaps = forwardRef(({ restaurants, apiKey }, ref) => {
    const mapRef = useRef(null)
    const mapInstance = useRef(null)
    const markersRef = useRef([])
    // State (not just a ref) so the marker effect re-runs once the map exists
    const [mapReady, setMapReady] = useState(false)

    // Expose panToRestaurant to parent via ref
    useImperativeHandle(ref, () => ({
        panToRestaurant: (restaurant, zoomLevel = 15) => {
            const pos = toLatLng(restaurant)
            if (!mapInstance.current || !pos) return
            mapInstance.current.panTo(pos)
            mapInstance.current.setZoom(zoomLevel)
        },
    }))

    // Load the API (once) and create the map for this component
    useEffect(() => {
        let cancelled = false

        loadGoogleMaps(apiKey)
            .then((maps) => {
                if (cancelled || !mapRef.current) return
                mapInstance.current = new maps.Map(mapRef.current, {
                    center: { lat: 40.7128, lng: -74.006 }, // default NYC center
                    zoom: 12,
                })
                setMapReady(true)
            })
            .catch((err) => console.error(err))

        return () => {
            cancelled = true
        }
    }, [apiKey])

    // Draw markers whenever the data changes OR the map becomes ready
    useEffect(() => {
        if (!mapReady || !mapInstance.current) return
        const maps = window.google.maps

        markersRef.current.forEach((m) => m.setMap(null))
        markersRef.current = []
        ;(restaurants || []).forEach((restaurant) => {
            const position = toLatLng(restaurant)
            if (!position) {
                console.warn(
                    'Restaurant has no valid lat/lng:',
                    restaurant.name
                )
                return
            }

            const marker = new maps.Marker({
                position,
                map: mapInstance.current,
                title: restaurant.name,
            })

            marker.addListener('click', () => {
                mapInstance.current.panTo(position)
                mapInstance.current.setZoom(15)
            })

            markersRef.current.push(marker)
        })

        // Fit map to all markers
        if (markersRef.current.length === 1) {
            mapInstance.current.setCenter(markersRef.current[0].getPosition())
            mapInstance.current.setZoom(15)
        } else if (markersRef.current.length > 1) {
            const bounds = new maps.LatLngBounds()
            markersRef.current.forEach((m) => bounds.extend(m.getPosition()))
            mapInstance.current.fitBounds(bounds)
        }
    }, [restaurants, mapReady])

    return <div ref={mapRef} style={{ width: '100%', height: '100%' }} />
})

GoogleMaps.displayName = 'GoogleMaps'

export default GoogleMaps
