// Loads the Google Maps JS API exactly once, no matter how many map
// components mount (or how many times React StrictMode re-runs effects).
let loaderPromise = null

export default function loadGoogleMaps(apiKey) {
    if (window.google?.maps) return Promise.resolve(window.google.maps)
    if (loaderPromise) return loaderPromise

    loaderPromise = new Promise((resolve, reject) => {
        const script = document.createElement('script')
        script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}`
        script.async = true
        script.onload = () => resolve(window.google.maps)
        script.onerror = () => {
            loaderPromise = null // allow a retry on the next mount
            reject(new Error('Google Maps failed to load – check the API key'))
        }
        document.head.appendChild(script)
    })

    return loaderPromise
}
