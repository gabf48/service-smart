-- Check current policies
SELECT schemaname, tablename, policyname, permissive, roles, cmd, qual, with_check
FROM pg_policies
WHERE schemaname = 'public' 
AND tablename IN ('service_clients', 'service_devices', 'service_photos', 'service_device_components', 'service_client_history', 'service_offers', 'service_transactions')
ORDER BY tablename, policyname;
