const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function setupBucket() {
  try {
    // First, list existing buckets
    const { data: buckets, error: listError } = await supabase.storage.listBuckets();
    
    if (listError) {
      console.error('Error listing buckets:', listError);
      return;
    }
    
    console.log('Existing buckets:', buckets.map(b => b.name));
    
    // Check if bucket exists
    const bucketExists = buckets.some(b => b.name === 'doll-trap');
    
    if (bucketExists) {
      console.log('✅ Bucket "doll-trap" already exists');
      return;
    }
    
    // Create bucket if it doesn't exist
    const { data, error } = await supabase.storage.createBucket('doll-trap', {
      public: true
    });
    
    if (error) {
      console.error('❌ Error creating bucket:', error);
      return;
    }
    
    console.log('✅ Bucket "doll-trap" created successfully');
    console.log('Bucket details:', data);
    
  } catch (error) {
    console.error('Unexpected error:', error);
  }
}

setupBucket();
