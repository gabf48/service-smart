-- STORAGE BUCKET POLICIES FOR service-photos
-- These must be run via Supabase Dashboard > SQL Editor with service_role
-- OR created via Supabase Dashboard > Storage > Policies UI

-- 1. First ensure the bucket exists (run in Dashboard > Storage or via admin API):
-- INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
-- VALUES ('service-photos', 'service-photos', true, 10485760, ARRAY['image/*'])
-- ON CONFLICT (id) DO NOTHING;

-- 2. Enable RLS on storage.objects (if not already)
-- ALTER TABLE storage.objects ENABLE ROW LEVEL SECURITY;

-- 3. Policies - CREATE THESE IN DASHBOARD > STORAGE > service-photos > POLICIES:
-- ============================================================================

-- POLICY 1: Allow authenticated uploads
-- Name: "Allow authenticated uploads"
-- Operation: INSERT
-- Target roles: authenticated
-- WITH CHECK expression: bucket_id = 'service-photos'

-- POLICY 2: Allow authenticated reads
-- Name: "Allow authenticated reads"
-- Operation: SELECT
-- Target roles: authenticated
-- USING expression: bucket_id = 'service-photos'

-- POLICY 3: Allow authenticated updates (own files)
-- Name: "Allow authenticated updates"
-- Operation: UPDATE
-- Target roles: authenticated
-- USING expression: bucket_id = 'service-photos'
-- WITH CHECK expression: bucket_id = 'service-photos'

-- POLICY 4: Allow admin deletes
-- Name: "Allow admin deletes"
-- Operation: DELETE
-- Target roles: authenticated
-- USING expression:
--   bucket_id = 'service-photos' AND
--   auth.uid() IN (SELECT id FROM auth.users WHERE raw_user_meta_data->>'role' = 'admin')

-- ============================================================================
-- ALTERNATIVE: Run these with service_role key (admin access)
-- ============================================================================
-- CREATE POLICY "service_photos_upload" ON storage.objects
--   FOR INSERT TO authenticated
--   WITH CHECK (bucket_id = 'service-photos');
--
-- CREATE POLICY "service_photos_select" ON storage.objects
--   FOR SELECT TO authenticated
--   USING (bucket_id = 'service-photos');
--
-- CREATE POLICY "service_photos_update" ON storage.objects
--   FOR UPDATE TO authenticated
--   USING (bucket_id = 'service-photos')
--   WITH CHECK (bucket_id = 'service-photos');
--
-- CREATE POLICY "service_photos_delete" ON storage.objects
--   FOR DELETE TO authenticated
--   USING (
--     bucket_id = 'service-photos' AND
--     auth.uid() IN (
--       SELECT id FROM auth.users WHERE raw_user_meta_data->>'role' = 'admin'
--     )
--   );