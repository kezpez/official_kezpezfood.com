// Builds a public URL for a file in the Supabase "images" storage bucket.
// Accepts either a bare path ("nyc/konban_1") or one that already has an
// extension ("nyc/konban_1.png"); only bare paths get ".jpg" appended.
const BUCKET_URL = `${import.meta.env.VITE_SUPABASE_URL}/storage/v1/object/public/images/`

export function storageImage(path) {
    if (!path) return null
    if (/^https?:\/\//.test(path)) return path
    const clean = path.trim().replace(/^\/+/, '')
    const hasExtension = /\.(jpe?g|png|webp|gif|avif)$/i.test(clean)
    return BUCKET_URL + encodeURI(hasExtension ? clean : `${clean}.jpg`)
}
