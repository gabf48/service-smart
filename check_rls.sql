-- Check current policies for DELETE
SELECT schemaname, tablename, policyname, cmd, roles, qual, with_check
FROM pg_policies
WHERE schemaname = 'public' 
AND tablename IN ('service_clients', 'service_devices')
AND cmd = 'DELETE'
ORDER BY tablename, policyname;
