import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://mccnpqfxzxbshsozebzu.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1jY25wcWZ4enhic2hzb3plYnp1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzE5NzU1NDUsImV4cCI6MjA4NzU1MTU0NX0.NVjPgdwTr4RX34OXRtWcppBZta1kBawk2iadHqwUqN0';

const supabase = createClient(supabaseUrl, supabaseKey);

const { data, error } = await supabase.auth.signInWithPassword({
  email: 'gabf48@gmail.com',
  password: 'testpass123'
});

if (error) {
  console.error('Error:', error.message);
  process.exit(1);
}

console.log('Session:', JSON.stringify(data.session, null, 2));
