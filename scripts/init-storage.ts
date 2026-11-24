/**
 * Initialize Supabase Storage bucket for service photos
 * Run with: npx tsx scripts/init-storage.ts
 */

import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

const supabase = createClient(supabaseUrl, serviceRoleKey);

async function initStorage() {
  console.log("Initializing Supabase Storage bucket: service-photos");

  // Create bucket
  const { data: bucket, error: bucketError } = await supabase.storage.createBucket("service-photos", {
    public: true,
    fileSizeLimit: 50 * 1024 * 1024, // 50MB
    allowedMimeTypes: ["image/png", "image/jpeg", "image/webp", "image/gif"],
  });

  if (bucketError) {
    if (bucketError.message.includes("already exists")) {
      console.log("Bucket 'service-photos' already exists");
    } else {
      console.error("Error creating bucket:", bucketError);
      return;
    }
  } else {
    console.log("Bucket created:", bucket);
  }

  // Set bucket to public
  const { error: publicError } = await supabase.storage.updateBucket("service-photos", {
    public: true,
  });

  if (publicError) {
    console.error("Error setting bucket public:", publicError);
  } else {
    console.log("Bucket set to public");
  }

  console.log("Storage initialization complete!");
}

initStorage().catch(console.error);