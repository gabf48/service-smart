-- Add device_id to service_transactions for per-device financial tracking
ALTER TABLE public.service_transactions
ADD COLUMN device_id UUID REFERENCES public.service_devices(id) ON DELETE SET NULL;

CREATE INDEX IF NOT EXISTS idx_service_transactions_device ON public.service_transactions(device_id);