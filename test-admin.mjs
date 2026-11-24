import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://mccnpqfxzxbshsozebzu.supabase.co';
const serviceRoleKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1jY25wcWZ4enhic2hzb3plYnp1Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3MTk3NTU0NSwiZXhwIjoyMDg3NTUxNTQ1fQ.ofR2PmlrlcPlHmQLe0ks106QjcxHX_MAdTa4mor8Ssg';

const supabase = createClient(supabaseUrl, serviceRoleKey);

// Get user by email
const { data: users, error } = await supabase.auth.admin.listUsers();
if (error) {
  console.error('Error listing users:', error.message);
  process.exit(1);
}

const user = users.users.find(u => u.email === 'gabf48@gmail.com');
if (user) {
  console.log('User found:', user.id, user.email, user.role);
  
  // Generate a magic link
  const { data: linkData, error: linkError } = await supabase.auth.admin.generateLink({
    type: 'magiclink',
    email: 'gabf48@gmail.com',
  });
  if (linkError) {
    console.error('Error generating link:', linkError.message);
  } else {
    console.log('Magic link:', linkData.properties?.action_link);
  }
} else {
  console.log('User not found');
}
