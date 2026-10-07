// Pinged daily by a Vercel cron (see vercel.json) so the free-tier Supabase
// project never sits idle long enough to be paused.
export async function GET(request) {
    const secret = process.env.CRON_SECRET
    if (secret && request.headers.get('authorization') !== `Bearer ${secret}`) {
        return new Response('Unauthorized', { status: 401 })
    }

    const url = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL
    const key =
        process.env.SUPABASE_ANON_KEY || process.env.VITE_SUPABASE_ANON_KEY

    const res = await fetch(`${url}/rest/v1/restaurants?select=id&limit=1`, {
        headers: { apikey: key, Authorization: `Bearer ${key}` },
    })

    return Response.json(
        { ok: res.ok, status: res.status },
        { status: res.ok ? 200 : 502 }
    )
}
