import { useEffect, useRef, forwardRef, useImperativeHandle } from 'react'

const GoogleMaps = forwardRef(({ restaurants, apiKey }, ref) => {
    const mapRef = useRef(null)
    const mapInstance = useRef(null)
    const markersRef = useRef([])

    // Expose panToRestaurant to parent via ref
    useImperativeHandle(ref, () => ({
        panToRestaurant: (restaurant, zoomLevel = 15) => {
            if (!mapInstance.current || !restaurant.lat || !restaurant.lng)
                return
            mapInstance.current.panTo({
                lat: restaurant.lat,
                lng: restaurant.lng,
            })
            mapInstance.current.setZoom(zoomLevel)
        },
    }))

    // Load Google Maps API
    useEffect(() => {
        if (window.google && window.google.maps) return // Already loaded

        const script = document.createElement('script')
        script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}`
        script.async = true
        script.defer = true
        document.body.appendChild(script)

        script.onload = () => {
            if (window.google && window.google.maps) {
                mapInstance.current = new window.google.maps.Map(
                    mapRef.current,
                    {
                        center: { lat: 40.7128, lng: -74.006 }, // default NYC center
                        zoom: 12,
                    }
                )
            }
        }

        return () => {
            document.body.removeChild(script)
        }
    }, [apiKey])

    // Update markers when restaurants change
    useEffect(() => {
        if (!mapInstance.current || !restaurants) return

        // Clear old markers
        markersRef.current.forEach((m) => m.setMap(null))
        markersRef.current = []

        restaurants.forEach((restaurant) => {
            if (!restaurant.lat || !restaurant.lng) return

            const marker = new window.google.maps.Marker({
                position: { lat: restaurant.lat, lng: restaurant.lng },
                map: mapInstance.current,
                title: restaurant.name,
            })

            marker.addListener('click', () => {
                mapInstance.current.panTo(marker.getPosition())
                mapInstance.current.setZoom(15)
            })

            markersRef.current.push(marker)
        })

        // Fit map to all markers
        if (markersRef.current.length > 0) {
            const bounds = new window.google.maps.LatLngBounds()
            markersRef.current.forEach((m) => bounds.extend(m.getPosition()))
            mapInstance.current.fitBounds(bounds)
        }
    }, [restaurants])

    return <div ref={mapRef} style={{ width: '100%', height: '100%' }} />
})

export default GoogleMaps
