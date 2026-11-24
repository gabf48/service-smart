-- Add status_id and updated_at to service_devices
-- This migration fixes the missing columns that the application code expects

ALTER TABLE public.service_devices
  ADD COLUMN IF NOT EXISTS status_id UUID REFERENCES public.service_statuses(id) ON DELETE SET NULL,
  ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW();

-- Index for status filtering
CREATE INDEX IF NOT EXISTS idx_service_devices_status ON public.service_devices(status_id);

-- RLS policies already allow INSERT/UPDATE for authenticated users
-- The existing policies "devices_insert" and "devices_update" use WITH CHECK (true) / USING (true)

-- Trigger for updated_at (already defined in initial migration)
-- CREATE TRIGGER trigger_service_devices_updated_at
--     BEFORE UPDATE ON public.service_devices
--     FOR EACH ROW EXECUTE FUNCTION public.update_service_updated_at();