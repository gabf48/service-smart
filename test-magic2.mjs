import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://mccnpqfxzxbshsozebzu.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1jY25wcWZ4enhic2hzb3plYnp1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzE5NzU1NDUsImV4cCI6MjA4NzU1MTU0NX0.NVjPgdwTr4RX34OXRtWcppBZta1kBawk2iadHqwUqN0';

const supabase = createClient(supabaseUrl, supabaseKey);

// Verify the magic link token with email
const { data, error } = await supabase.auth.verifyOtp({
  email: 'gabf48@gmail.com',
  token: '32d2f721b50d091a2fbe1c89dd84e7de05ae35ffdd6c6296e4173ab6',
  type: 'magiclink',
});

if (error) {
  console.error('Error:', error.message);
  process.exit(1);
}

console.log('Session:', JSON.stringify(data.session, null, 2));
