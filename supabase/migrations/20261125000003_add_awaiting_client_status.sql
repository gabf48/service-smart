-- Add "Așteaptă client" status for cases where work is paused waiting for client input/action
INSERT INTO public.service_statuses (name, color, text_color, sort_order) VALUES
    ('Așteaptă client', '#fbbf24', '#000000', 7)
ON CONFLICT (name) DO NOTHING;