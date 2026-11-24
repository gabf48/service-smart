import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://mccnpqfxzxbshsozebzu.supabase.co';
const serviceRoleKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1jY25wcWZ4enhic2hzb3plYnp1Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3MTk3NTU0NSwiZXhwIjoyMDg3NTUxNTQ1fQ.ofR2PmlrlcPlHmQLe0ks106QjcxHX_MAdTa4mor8Ssg';

const supabase = createClient(supabaseUrl, serviceRoleKey);

// Generate a magic link with localhost redirect
const { data: linkData, error: linkError } = await supabase.auth.admin.generateLink({
  type: 'magiclink',
  email: 'gabf48@gmail.com',
  options: {
    redirectTo: 'http://localhost:3000/auth/callback'
  }
});
if (linkError) {
  console.error('Error generating link:', linkError.message);
  process.exit(1);
}
console.log('Magic link:', linkData.properties?.action_link);
