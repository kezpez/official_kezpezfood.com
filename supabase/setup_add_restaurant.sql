-- Run this once in Supabase: Dashboard → SQL Editor → New query → paste → Run.
--
-- BEFORE RUNNING: if you will sign in to the Add Restaurant page with a
-- different email than kezpezfood@gmail.com, replace it below (3 places).

-- ─────────────────────────────────────────────────────────────
-- 1. Google Place ID column
-- ─────────────────────────────────────────────────────────────
alter table public.restaurants
    add column if not exists place_id text;

-- The same Google place can't be added twice by accident
create unique index if not exists restaurants_place_id_key
    on public.restaurants (place_id)
    where place_id is not null;

-- ─────────────────────────────────────────────────────────────
-- 2. Who can do what
--    Everyone can READ restaurants (your website needs this).
--    Only you, signed in, can ADD or EDIT them.
-- ─────────────────────────────────────────────────────────────
alter table public.restaurants enable row level security;

drop policy if exists "Anyone can read restaurants" on public.restaurants;
create policy "Anyone can read restaurants"
    on public.restaurants for select
    using (true);

drop policy if exists "Admin can add restaurants" on public.restaurants;
create policy "Admin can add restaurants"
    on public.restaurants for insert
    to authenticated
    with check ((auth.jwt() ->> 'email') = 'kezpezfood@gmail.com');

drop policy if exists "Admin can edit restaurants" on public.restaurants;
create policy "Admin can edit restaurants"
    on public.restaurants for update
    to authenticated
    using ((auth.jwt() ->> 'email') = 'kezpezfood@gmail.com')
    with check ((auth.jwt() ->> 'email') = 'kezpezfood@gmail.com');

-- ─────────────────────────────────────────────────────────────
-- 3. Let the admin page upload photos into your "images" bucket
-- ─────────────────────────────────────────────────────────────
drop policy if exists "Admin can upload restaurant photos" on storage.objects;
create policy "Admin can upload restaurant photos"
    on storage.objects for insert
    to authenticated
    with check (
        bucket_id = 'images'
        and (auth.jwt() ->> 'email') = 'kezpezfood@gmail.com'
    );

-- ─────────────────────────────────────────────────────────────
-- 4. Tidy up district typos that break the district filter
--    ("Koreatown " with a trailing space, "Koreantown")
-- ─────────────────────────────────────────────────────────────
update public.restaurants set district = trim(district)
    where district <> trim(district);
update public.restaurants set district = 'Koreatown'
    where district = 'Koreantown';
update public.restaurants set name = trim(name)
    where name <> trim(name);
