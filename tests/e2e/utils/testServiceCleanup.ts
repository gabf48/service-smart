import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.PLAYWRIGHT_SUPABASE_URL;
const serviceRoleKey = process.env.PLAYWRIGHT_SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !serviceRoleKey) {
  console.warn("Missing Supabase env vars for test cleanup. Service cleanup will be skipped.");
}

async function safeDelete(supabase: any, table: string, query: any) {
  try {
    const { error } = await query;
    if (error && !error.message.includes("Could not find the table")) {
      console.warn(`Cleanup ${table}:`, error.message);
    }
  } catch (e) {
    // Ignore errors for missing tables
  }
}

export async function cleanupPlaywrightService(prefix = "PW") {
  if (!supabaseUrl || !serviceRoleKey) return;

  const supabase = createClient(supabaseUrl, serviceRoleKey, {
    auth: { persistSession: false },
  });

  try {
    // Delete test clients created by Playwright (name starts with prefix)
    const { data: testClients, error: clientsError } = await supabase
      .from("service_clients")
      .select("id")
      .ilike("name", `${prefix}%`);

    if (clientsError) {
      if (!clientsError.message.includes("Could not find the table")) {
        console.warn("Error fetching test clients:", clientsError.message);
      }
      return;
    }

    if (testClients && testClients.length > 0) {
      const clientIds = testClients.map(c => c.id);

      // Delete related data first (foreign key constraints)
      await safeDelete(supabase, "service_photos", supabase.from("service_photos").delete().in("client_id", clientIds));
      await safeDelete(supabase, "service_transactions", supabase.from("service_transactions").delete().in("client_id", clientIds));
      await safeDelete(supabase, "service_offers", supabase.from("service_offers").delete().in("client_id", clientIds));
      await safeDelete(supabase, "service_client_history", supabase.from("service_client_history").delete().in("client_id", clientIds));

      const { data: testDevices } = await supabase
        .from("service_devices")
        .select("id")
        .in("client_id", clientIds);

      if (testDevices && testDevices.length > 0) {
        const deviceIds = testDevices.map(d => d.id);
        await safeDelete(supabase, "service_device_components", supabase.from("service_device_components").delete().in("device_id", deviceIds));
        await safeDelete(supabase, "service_devices", supabase.from("service_devices").delete().in("id", deviceIds));
      }

      // Finally delete clients
      const { error: deleteError } = await supabase
        .from("service_clients")
        .delete()
        .in("id", clientIds);

      if (deleteError) {
        if (!deleteError.message.includes("Could not find the table")) {
          console.warn("Error deleting test clients:", deleteError.message);
        }
      } else {
        console.log(`Cleaned up ${clientIds.length} test clients with prefix "${prefix}"`);
      }
    }
  } catch (error) {
    // Silently ignore cleanup errors
  }
}

export async function cleanupPlaywrightServiceByClientId(clientIds: string[]) {
  if (!supabaseUrl || !serviceRoleKey || !clientIds.length) return;

  const supabase = createClient(supabaseUrl, serviceRoleKey, {
    auth: { persistSession: false },
  });

  try {
    // Delete related data
    await supabase.from("service_photos").delete().in("client_id", clientIds);
    await supabase.from("service_transactions").delete().in("client_id", clientIds);
    await supabase.from("service_offers").delete().in("client_id", clientIds);
    await supabase.from("service_client_history").delete().in("client_id", clientIds);

    const { data: testDevices } = await supabase
      .from("service_devices")
      .select("id")
      .in("client_id", clientIds);

    if (testDevices && testDevices.length > 0) {
      const deviceIds = testDevices.map(d => d.id);
      await supabase.from("service_device_components").delete().in("device_id", deviceIds);
      await supabase.from("service_devices").delete().in("id", deviceIds);
    }

    await supabase.from("service_clients").delete().in("id", clientIds);
    console.log(`Cleaned up ${clientIds.length} specific test clients`);
  } catch (error) {
    console.error("Service cleanup by ID error:", error);
  }
}