-- Service Smart: Schema pentru modulul Clienți & Service
-- Migrație generată din service-smart-search (SQLite) adaptată pentru PostgreSQL/Supabase

-- ============================================================================
-- EXTENSII
-- ============================================================================
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ============================================================================
-- ENUM-URI (ca tabele lookup pentru flexibilitate)
-- ============================================================================

-- Statusuri client (configurabile din UI)
CREATE TABLE IF NOT EXISTS public.service_statuses (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL UNIQUE,
    color TEXT NOT NULL DEFAULT '#1f6feb',
    text_color TEXT NOT NULL DEFAULT '#ffffff',
    sort_order INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Statusuri piese (configurabile din UI)
CREATE TABLE IF NOT EXISTS public.service_part_statuses (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL UNIQUE,
    color TEXT NOT NULL DEFAULT '#1f6feb',
    sort_order INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Tipuri tranzacție (fixe)
CREATE TABLE IF NOT EXISTS public.service_transaction_types (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL UNIQUE, -- 'Încasare' | 'Cheltuială'
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Categorii tranzacție (configurabile)
CREATE TABLE IF NOT EXISTS public.service_transaction_categories (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL UNIQUE, -- 'Piese', 'Manoperă', 'Transport', 'Altele'
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Tipuri componente device (predefinite, extensibile)
CREATE TABLE IF NOT EXISTS public.service_component_types (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    key TEXT NOT NULL UNIQUE, -- 'cpu', 'ram', 'storage', etc.
    label TEXT NOT NULL,      -- '🔧 CPU / Procesor'
    icon TEXT NOT NULL,       -- emoji/icon
    sort_order INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================================================
-- TABELE PRINCIPALE
-- ============================================================================

-- Clienți
CREATE TABLE IF NOT EXISTS public.service_clients (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    phone TEXT NOT NULL,
    email TEXT NOT NULL DEFAULT '',
    address TEXT NOT NULL DEFAULT '',
    problem TEXT NOT NULL DEFAULT '',
    notes TEXT NOT NULL DEFAULT '',
    status_id UUID REFERENCES public.service_statuses(id) ON DELETE SET NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Dispozitive (un client poate avea mai multe)
CREATE TABLE IF NOT EXISTS public.service_devices (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    client_id UUID NOT NULL REFERENCES public.service_clients(id) ON DELETE CASCADE,
    model TEXT NOT NULL,
    mtm TEXT NOT NULL DEFAULT '',
    mfg_yr TEXT NOT NULL DEFAULT '',
    service_tag TEXT NOT NULL DEFAULT '',
    express_service_code TEXT NOT NULL DEFAULT '',
    serial_number TEXT NOT NULL DEFAULT '',
    notes TEXT NOT NULL DEFAULT '',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Poze (legate de client și opțional de device)
CREATE TABLE IF NOT EXISTS public.service_photos (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    client_id UUID NOT NULL REFERENCES public.service_clients(id) ON DELETE CASCADE,
    device_id UUID REFERENCES public.service_devices(id) ON DELETE SET NULL,
    storage_path TEXT NOT NULL, -- path în Supabase Storage (bucket: service-photos)
    file_name TEXT NOT NULL,
    file_size INTEGER,
    mime_type TEXT,
    uploaded_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Componente device (JSON flexibil per tip componentă)
CREATE TABLE IF NOT EXISTS public.service_device_components (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    device_id UUID NOT NULL REFERENCES public.service_devices(id) ON DELETE CASCADE,
    component_type_key TEXT NOT NULL REFERENCES public.service_component_types(key),
    component_data JSONB NOT NULL DEFAULT '{}',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    UNIQUE(device_id, component_type_key)
);

-- Istoric client (audit log)
CREATE TABLE IF NOT EXISTS public.service_client_history (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    client_id UUID NOT NULL REFERENCES public.service_clients(id) ON DELETE CASCADE,
    action TEXT NOT NULL,
    details TEXT NOT NULL DEFAULT '',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Oferte piese (legate de device și client)
CREATE TABLE IF NOT EXISTS public.service_offers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    device_id UUID NOT NULL REFERENCES public.service_devices(id) ON DELETE CASCADE,
    client_id UUID NOT NULL REFERENCES public.service_clients(id) ON DELETE CASCADE,
    product_name TEXT NOT NULL,
    price TEXT NOT NULL DEFAULT '',
    store TEXT NOT NULL DEFAULT '',
    link TEXT NOT NULL DEFAULT '',
    image_url TEXT NOT NULL DEFAULT '',
    category TEXT NOT NULL DEFAULT '',
    part_number TEXT NOT NULL DEFAULT '',
    quantity INTEGER NOT NULL DEFAULT 1,
    notes TEXT NOT NULL DEFAULT '',
    status_id UUID REFERENCES public.service_part_statuses(id) ON DELETE SET NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Tranzacții financiare per client
CREATE TABLE IF NOT EXISTS public.service_transactions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    client_id UUID NOT NULL REFERENCES public.service_clients(id) ON DELETE CASCADE,
    type_id UUID NOT NULL REFERENCES public.service_transaction_types(id),
    amount NUMERIC(12, 2) NOT NULL CHECK (amount > 0),
    category_id UUID REFERENCES public.service_transaction_categories(id),
    description TEXT NOT NULL DEFAULT '',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Metadate schema (pentru migrații interne)
CREATE TABLE IF NOT EXISTS public.service_schema_meta (
    key TEXT PRIMARY KEY,
    value TEXT NOT NULL,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================================================
-- INDEXURI
-- ============================================================================
CREATE INDEX IF NOT EXISTS idx_service_clients_status ON public.service_clients(status_id);
CREATE INDEX IF NOT EXISTS idx_service_clients_name_phone ON public.service_clients(name, phone);
CREATE INDEX IF NOT EXISTS idx_service_devices_client ON public.service_devices(client_id);
CREATE INDEX IF NOT EXISTS idx_service_photos_client ON public.service_photos(client_id);
CREATE INDEX IF NOT EXISTS idx_service_photos_device ON public.service_photos(device_id);
CREATE INDEX IF NOT EXISTS idx_service_components_device ON public.service_device_components(device_id);
CREATE INDEX IF NOT EXISTS idx_service_history_client ON public.service_client_history(client_id);
CREATE INDEX IF NOT EXISTS idx_service_offers_device ON public.service_offers(device_id);
CREATE INDEX IF NOT EXISTS idx_service_offers_client ON public.service_offers(client_id);
CREATE INDEX IF NOT EXISTS idx_service_transactions_client ON public.service_transactions(client_id);

-- ============================================================================
-- RLS (Row Level Security)
-- ============================================================================
ALTER TABLE public.service_statuses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.service_part_statuses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.service_transaction_types ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.service_transaction_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.service_component_types ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.service_clients ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.service_devices ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.service_photos ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.service_device_components ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.service_client_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.service_offers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.service_transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.service_schema_meta ENABLE ROW LEVEL SECURITY;

-- Policies: authenticated users can read all, admins can write
-- Lookup tables - read for all authenticated
CREATE POLICY "lookup_read_all" ON public.service_statuses FOR SELECT TO authenticated USING (true);
CREATE POLICY "lookup_read_all" ON public.service_part_statuses FOR SELECT TO authenticated USING (true);
CREATE POLICY "lookup_read_all" ON public.service_transaction_types FOR SELECT TO authenticated USING (true);
CREATE POLICY "lookup_read_all" ON public.service_transaction_categories FOR SELECT TO authenticated USING (true);
CREATE POLICY "lookup_read_all" ON public.service_component_types FOR SELECT TO authenticated USING (true);

-- Data tables - authenticated users can read all, create, and update
-- Admins can delete
CREATE POLICY "clients_read" ON public.service_clients
    FOR SELECT TO authenticated USING (true);

CREATE POLICY "clients_insert" ON public.service_clients
    FOR INSERT TO authenticated WITH CHECK (true);

CREATE POLICY "clients_update" ON public.service_clients
    FOR UPDATE TO authenticated USING (true) WITH CHECK (true);

CREATE POLICY "clients_delete" ON public.service_clients
    FOR DELETE TO authenticated
    USING (
        auth.uid() IN (
            SELECT id FROM auth.users WHERE raw_user_meta_data->>'role' = 'admin'
        )
    );

CREATE POLICY "devices_read" ON public.service_devices FOR SELECT TO authenticated USING (true);
CREATE POLICY "devices_insert" ON public.service_devices FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "devices_update" ON public.service_devices FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "devices_delete" ON public.service_devices
    FOR DELETE TO authenticated
    USING (
        auth.uid() IN (
            SELECT id FROM auth.users WHERE raw_user_meta_data->>'role' = 'admin'
        )
    );

CREATE POLICY "photos_read" ON public.service_photos FOR SELECT TO authenticated USING (true);
CREATE POLICY "photos_insert" ON public.service_photos FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "photos_update" ON public.service_photos FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "photos_delete" ON public.service_photos
    FOR DELETE TO authenticated
    USING (
        auth.uid() IN (
            SELECT id FROM auth.users WHERE raw_user_meta_data->>'role' = 'admin'
        )
    );

CREATE POLICY "components_read" ON public.service_device_components FOR SELECT TO authenticated USING (true);
CREATE POLICY "components_insert" ON public.service_device_components FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "components_update" ON public.service_device_components FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "components_delete" ON public.service_device_components
    FOR DELETE TO authenticated
    USING (
        auth.uid() IN (
            SELECT id FROM auth.users WHERE raw_user_meta_data->>'role' = 'admin'
        )
    );

CREATE POLICY "history_read" ON public.service_client_history FOR SELECT TO authenticated USING (true);
CREATE POLICY "history_insert" ON public.service_client_history FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "history_delete" ON public.service_client_history
    FOR DELETE TO authenticated
    USING (
        auth.uid() IN (
            SELECT id FROM auth.users WHERE raw_user_meta_data->>'role' = 'admin'
        )
    );

CREATE POLICY "offers_read" ON public.service_offers FOR SELECT TO authenticated USING (true);
CREATE POLICY "offers_insert" ON public.service_offers FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "offers_update" ON public.service_offers FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "offers_delete" ON public.service_offers
    FOR DELETE TO authenticated
    USING (
        auth.uid() IN (
            SELECT id FROM auth.users WHERE raw_user_meta_data->>'role' = 'admin'
        )
    );

CREATE POLICY "transactions_read" ON public.service_transactions FOR SELECT TO authenticated USING (true);
CREATE POLICY "transactions_insert" ON public.service_transactions FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "transactions_update" ON public.service_transactions FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "transactions_delete" ON public.service_transactions
    FOR DELETE TO authenticated
    USING (
        auth.uid() IN (
            SELECT id FROM auth.users WHERE raw_user_meta_data->>'role' = 'admin'
        )
    );

-- Service role can do everything
GRANT ALL ON ALL TABLES IN SCHEMA public TO service_role;

-- ============================================================================
-- TRIGGERS updated_at
-- ============================================================================
CREATE OR REPLACE FUNCTION public.update_service_updated_at()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END $$;

CREATE TRIGGER trigger_service_clients_updated_at
    BEFORE UPDATE ON public.service_clients
    FOR EACH ROW EXECUTE FUNCTION public.update_service_updated_at();

CREATE TRIGGER trigger_service_devices_updated_at
    BEFORE UPDATE ON public.service_devices
    FOR EACH ROW EXECUTE FUNCTION public.update_service_updated_at();

CREATE TRIGGER trigger_service_components_updated_at
    BEFORE UPDATE ON public.service_device_components
    FOR EACH ROW EXECUTE FUNCTION public.update_service_updated_at();

CREATE TRIGGER trigger_service_offers_updated_at
    BEFORE UPDATE ON public.service_offers
    FOR EACH ROW EXECUTE FUNCTION public.update_service_updated_at();

CREATE TRIGGER trigger_service_transactions_updated_at
    BEFORE UPDATE ON public.service_transactions
    FOR EACH ROW EXECUTE FUNCTION public.update_service_updated_at();

CREATE TRIGGER trigger_service_schema_meta_updated_at
    BEFORE UPDATE ON public.service_schema_meta
    FOR EACH ROW EXECUTE FUNCTION public.update_service_updated_at();

-- ============================================================================
-- DATE INITIALE (SEED)
-- ============================================================================

-- Statusuri client default
INSERT INTO public.service_statuses (name, color, text_color, sort_order) VALUES
    ('Nou', '#1f6feb', '#ffffff', 0),
    ('În diagnostic', '#d29922', '#ffffff', 1),
    ('Așteaptă piese', '#a371f7', '#ffffff', 2),
    ('În reparare', '#f0883e', '#ffffff', 3),
    ('Gata de ridicare', '#3fb950', '#ffffff', 4),
    ('Finalizat', '#238636', '#ffffff', 5),
    ('Anulat', '#f85149', '#ffffff', 6)
ON CONFLICT (name) DO NOTHING;

-- Statusuri piese default
INSERT INTO public.service_part_statuses (name, color, sort_order) VALUES
    ('De comandat', '#d29922', 0),
    ('Comandată', '#1f6feb', 1),
    ('Primită', '#a371f7', 2),
    ('Montată', '#238636', 3),
    ('Anulată', '#f85149', 4)
ON CONFLICT (name) DO NOTHING;

-- Tipuri tranzacție
INSERT INTO public.service_transaction_types (name) VALUES
    ('Încasare'),
    ('Cheltuială')
ON CONFLICT (name) DO NOTHING;

-- Categorii tranzacție
INSERT INTO public.service_transaction_categories (name) VALUES
    ('Piese'),
    ('Manoperă'),
    ('Transport'),
    ('Altele')
ON CONFLICT (name) DO NOTHING;

-- Tipuri componente device
INSERT INTO public.service_component_types (key, label, icon, sort_order) VALUES
    ('cpu', '🔧 CPU / Procesor', '🔧', 0),
    ('ram', '🧠 RAM / Memorie', '🧠', 1),
    ('storage', '💾 Stocare', '💾', 2),
    ('gpu', '🎮 GPU / Video', '🎮', 3),
    ('display', '🖥️ Display / Ecran', '🖥️', 4),
    ('battery', '🔋 Baterie', '🔋', 5),
    ('ports', '🔌 Porturi / Conectivitate', '🔌', 6),
    ('os', '💿 OS / Sistem', '💿', 7),
    ('chassis', '📦 Carcasă / Fizic', '📦', 8),
    ('keyboard', '⌨️ Tastatură', '⌨️', 9),
    ('other', '📝 Altele / Note libere', '📝', 10)
ON CONFLICT (key) DO NOTHING;