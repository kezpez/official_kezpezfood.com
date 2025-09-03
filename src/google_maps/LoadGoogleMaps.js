// // GoogleMaps.js
// import { useEffect, useState } from 'react'

// export default function GoogleMaps() {
//     const [loaded, setLoaded] = useState(false)

//     useEffect(() => {
//         // If already loaded, skip
//         if (window.google) {
//             setLoaded(true)
//             return
//         }

//         // Create script tag
//         const script = document.createElement('script')
//         script.src = `https://maps.googleapis.com/maps/api/js?key=${
//             import.meta.env.VITE_GOOGLE_MAPS_KEY
//         }`
//         script.async = true
//         script.onload = () => setLoaded(true)
//         document.body.appendChild(script)
//     }, [])

//     return loaded
// }
