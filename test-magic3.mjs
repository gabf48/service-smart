import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://mccnpqfxzxbshsozebzu.supabase.co';
const serviceRoleKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1jY25wcWZ4enhic2hzb3plYnp1Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3MTk3NTU0NSwiZXhwIjoyMDg3NTUxNTQ1fQ.ofR2PmlrlcPlHmQLe0ks106QjcxHX_MAdTa4mor8Ssg';

const supabase = createClient(supabaseUrl, serviceRoleKey);

// Generate a new magic link
const { data: linkData, error: linkError } = await supabase.auth.admin.generateLink({
  type: 'magiclink',
  email: 'gabf48@gmail.com',
});
if (linkError) {
  console.error('Error generating link:', linkError.message);
  process.exit(1);
}

const token = linkData.properties?.action_link?.match(/token=([^&]+)/)?.[1];
console.log('Token:', token);

// Now verify with anon client
const supabaseAnon = createClient(supabaseUrl, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1jY25wcWZ4enhic2hzb3plYnp1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzE5NzU1NDUsImV4cCI6MjA4NzU1MTU0NX0.NVjPgdwTr4RX34OXRtWcppBZta1kBawk2iadHqwUqN0');

const { data, error } = await supabaseAnon.auth.verifyOtp({
  email: 'gabf48@gmail.com',
  token: token,
  type: 'magiclink',
});

if (error) {
  console.error('Error:', error.message);
  process.exit(1);
}

console.log('Session:', JSON.stringify(data.session, null, 2));
