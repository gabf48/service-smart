/**
 * Service Smart - TypeScript types pentru modulul Clienți & Service
 * Generat din schema Supabase (migrația 20261122000000_service_schema.sql)
 */

// ============================================================================
// LOOKUP TABLES (configurabile din UI)
// ============================================================================

export interface ServiceStatus {
  id: string;
  name: string;
  color: string;
  text_color: string;
  sort_order: number;
  created_at: string;
}

export interface ServicePartStatus {
  id: string;
  name: string;
  color: string;
  sort_order: number;
  created_at: string;
}

export interface ServiceTransactionType {
  id: string;
  name: 'Încasare' | 'Cheltuială';
  created_at: string;
}

export interface ServiceTransactionCategory {
  id: string;
  name: string;
  created_at: string;
}

export interface ServiceComponentType {
  id: string;
  key: ComponentTypeKey;
  label: string;
  icon: string;
  sort_order: number;
  created_at: string;
}

export type ComponentTypeKey =
  | 'cpu'
  | 'ram'
  | 'storage'
  | 'gpu'
  | 'display'
  | 'battery'
  | 'ports'
  | 'os'
  | 'chassis'
  | 'keyboard'
  | 'other';

// ============================================================================
// ENTITĂȚI PRINCIPALE
// ============================================================================

export interface ServiceClientBase {
  id: string;
  name: string;
  phone: string;
  email: string;
  address: string;
  problem: string;
  notes: string;
  status_id: string | null;
  created_at: string;
  updated_at: string;
  // Computed/aggregated (from queries)
  total_income?: number;
  total_expense?: number;
  profit?: number;
  device_count?: number;
  photo_count?: number;
}

export interface ServiceClient extends ServiceClientBase {
  status?: ServiceStatus; // joined
  devices?: string; // concatenated models
}

export interface ServiceDevice {
  id: string;
  client_id: string;
  model: string;
  mtm: string;
  mfg_yr: string;
  service_tag: string;
  express_service_code: string;
  serial_number: string;
  notes: string;
  status_id: string | null;
  created_at: string;
  // Computed
  offer_count?: number;
  component_count?: number;
  photo_count?: number;
  status?: ServiceStatus; // joined
}

export interface ServicePhoto {
  id: string;
  client_id: string;
  device_id: string | null;
  storage_path: string;
  file_name: string;
  file_size: number | null;
  mime_type: string | null;
  uploaded_at: string;
  device_model?: string; // joined
}

export interface ServiceDeviceComponent {
  id: string;
  device_id: string;
  component_type_key: ComponentTypeKey;
  component_data: Record<string, unknown>;
  created_at: string;
  updated_at: string;
  component_type?: ServiceComponentType; // joined
}

export interface ServiceClientHistory {
  id: string;
  client_id: string;
  action: string;
  details: string;
  created_at: string;
}

export interface ServiceOffer {
  id: string;
  device_id: string;
  client_id: string;
  product_name: string;
  price: string;
  store: string;
  link: string;
  image_url: string;
  category: string;
  part_number: string;
  quantity: number;
  notes: string;
  status_id: string | null;
  status?: ServicePartStatus; // joined
  device_model?: string; // joined
  created_at: string;
  updated_at: string;
}

export interface ServiceTransaction {
  id: string;
  client_id: string;
  device_id: string | null;
  type_id: string;
  type?: ServiceTransactionType; // joined
  amount: number;
  category_id: string | null;
  category?: ServiceTransactionCategory; // joined
  description: string;
  created_at: string;
  updated_at: string;
  device_model?: string; // joined
}

// ============================================================================
// COMPONENT DATA SCHEMAS (pentru component_data JSONB)
// ============================================================================

export interface CPUComponentData {
  model?: string;
  part_number?: string;
  cores?: string;
  freq?: number;
  gen?: string;
  socket?: string;
  notes?: string;
}

export interface RAMComponentData {
  total?: number;
  type?: string;
  speed?: number;
  part_number?: string;
  slots?: string;
  config?: string;
  notes?: string;
}

export interface StorageComponentData {
  drive1?: string;
  drive1_sn?: string;
  drive1_type?: string;
  drive2?: string;
  drive2_sn?: string;
  drive2_type?: string;
  slot_m2?: string;
  slot_sata?: string;
  notes?: string;
}

export interface GPUComponentData {
  model?: string;
  part_number?: string;
  type?: string;
  vram?: string;
  output?: string;
  notes?: string;
}

export interface DisplayComponentData {
  size?: number;
  resolution?: string;
  panel?: string;
  touch?: string;
  part_number?: string;
  condition?: string;
  notes?: string;
}

export interface BatteryComponentData {
  capacity?: number;
  cells?: string;
  health?: number;
  cycles?: number;
  runtime?: number;
  part_number?: string;
  notes?: string;
}

export interface PortsComponentData {
  usb_a?: string;
  usb_c?: string;
  hdmi?: string;
  audio?: string;
  lan?: string;
  other?: string;
  wifi?: string;
  notes?: string;
}

export interface OSComponentData {
  name?: string;
  license?: string;
  product_key?: string;
  bitlocker?: string;
  recovery?: string;
  notes?: string;
}

export interface ChassisComponentData {
  material?: string;
  color?: string;
  condition?: string;
  hinges?: string;
  weight?: number;
  serial?: string;
  notes?: string;
}

export interface KeyboardComponentData {
  layout?: string;
  backlight?: string;
  condition?: string;
  language?: string;
  manufacturer?: string;
  model?: string;
  pn?: string;
  oem_code?: string;
  mounting?: string;
  numpad?: string;
  compatibility?: string;
  notes?: string;
}

export interface OtherComponentData {
  notes?: string;
}

export type ComponentDataMap = {
  cpu: CPUComponentData;
  ram: RAMComponentData;
  storage: StorageComponentData;
  gpu: GPUComponentData;
  display: DisplayComponentData;
  battery: BatteryComponentData;
  ports: PortsComponentData;
  os: OSComponentData;
  chassis: ChassisComponentData;
  keyboard: KeyboardComponentData;
  other: OtherComponentData;
};

export type AnyComponentData = ComponentDataMap[keyof ComponentDataMap];

// ============================================================================
// FORM TYPES (pentru validare)
// ============================================================================

export interface CreateClientInput {
  name: string;
  phone: string;
  email?: string;
  address?: string;
  device?: string; // legacy, for initial device creation
  problem?: string;
  notes?: string;
  status_id?: string;
  uploaded_files?: File[];
}

export interface UpdateClientInput {
  name?: string;
  phone?: string;
  email?: string;
  address?: string;
  problem?: string;
  notes?: string;
  status_id?: string | null;
}

export interface CreateDeviceInput {
  client_id: string;
  model: string;
  mtm?: string;
  serial_number?: string;
  mfg_yr?: string;
  service_tag?: string;
  express_service_code?: string;
  notes?: string;
  status_id?: string;
}

export interface UpdateDeviceInput {
  model?: string;
  mtm?: string;
  serial_number?: string;
  mfg_yr?: string;
  service_tag?: string;
  express_service_code?: string;
  notes?: string;
  status_id?: string | null;
}

export interface CreateOfferInput {
  device_id: string;
  product: {
    Produs: string;
    Preț?: string;
    Magazin?: string;
    'Sursă / Link'?: string;
    Imagine?: string;
    Categorie?: string;
  };
  part_number?: string;
  status?: string;
  quantity?: number;
  notes?: string;
}

export interface UpdateOfferInput {
  status?: string;
  quantity?: number;
  notes?: string;
}

export interface CreateTransactionInput {
  client_id: string;
  device_id?: string;
  type: 'Încasare' | 'Cheltuială';
  amount: number;
  category?: string;
  description?: string;
}

export interface UpdateTransactionInput {
  type?: 'Încasare' | 'Cheltuială';
  amount?: number;
  category?: string;
  description?: string;
  device_id?: string | null;
}

export interface AddHistoryInput {
  client_id: string;
  details: string;
}

// ============================================================================
// QUERY RESULT TYPES (cu joined data)
// ============================================================================

export interface ClientListItem extends ServiceClientBase {
  // status per client eliminat - acum e per device
  devices: string;
  device_count: number;
  photo_count: number;
  total_income: number;
  total_expense: number;
  profit: number;
  // Device statuses pentru afișare în tabel
  device_statuses?: Array<{ id: string; model: string; status_id: string | null; status_name: string | null; status_color: string | null }>;
  // Device financials pentru expanded rows
  device_financials?: Record<string, { income: number; expense: number; profit: number }>;
}

export interface ClientDetail extends ServiceClientBase {
  // status eliminat de la client - acum e per device
  devices: (ServiceDevice & {
    offer_count: number;
    component_count: number;
    photo_count: number;
  })[];
  photos: ServicePhoto[];
  offers: (ServiceOffer & { device_model: string })[];
  transactions: (ServiceTransaction & { type: ServiceTransactionType; category: ServiceTransactionCategory | null; device?: { id: string; model: string } | null })[];
  history: ServiceClientHistory[];
  financial_summary: {
    total_income: number;
    total_expense: number;
    profit: number;
    transaction_count: number;
  };
  // Per-device financials (same logic as listClients)
  device_financials: Record<string, { income: number; expense: number; profit: number }>;
}

export interface DeviceWithDetails extends ServiceDevice {
  client_name: string;
  offer_count: number;
  components: ServiceDeviceComponent[];
  photos: ServicePhoto[];
}

export interface OfferWithDetails extends ServiceOffer {
  device_model: string;
  client_name: string;
  status: ServicePartStatus | undefined;
}

// ============================================================================
// FILTER & SORT TYPES
// ============================================================================

export interface ClientFilters {
  search?: string;
  status_names?: string[];
  amount_field?: 'profit' | 'income' | 'expense';
  min_amount?: number;
  max_amount?: number;
}

export interface ClientSortOption {
  field: 'name' | 'created_at' | 'updated_at' | 'profit' | 'total_income' | 'total_expense';
  direction: 'asc' | 'desc';
}

// ============================================================================
// UTILITY TYPES
// ============================================================================

export type ServiceTableName =
  | 'service_statuses'
  | 'service_part_statuses'
  | 'service_transaction_types'
  | 'service_transaction_categories'
  | 'service_component_types'
  | 'service_clients'
  | 'service_devices'
  | 'service_photos'
  | 'service_device_components'
  | 'service_client_history'
  | 'service_offers'
  | 'service_transactions'
  | 'service_schema_meta';

// Helper pentru a extrage tipul din component_data
export type ComponentDataForType<T extends ComponentTypeKey> = ComponentDataMap[T];

// Field definitions pentru formulare dinamice (mirror din DEVICE_COMPONENT_FIELDS Python)
export interface ComponentFieldSpec {
  key: string;
  label: string;
  placeholder: string;
  type: 'text' | 'number' | 'select';
  options?: string[] | { min: number; max: number; step: number };
}

export const COMPONENT_FIELD_SPECS: Record<ComponentTypeKey, ComponentFieldSpec[]> = {
  cpu: [
    { key: 'model', label: 'Model', placeholder: 'ex. Intel Core i5-8250U', type: 'text' },
    { key: 'part_number', label: 'Part Number / Serie', placeholder: 'ex. SR3LC, BX80684I58250U', type: 'text' },
    { key: 'cores', label: 'Nuclee / Fire', placeholder: 'ex. 4C/8T', type: 'text' },
    { key: 'freq', label: 'Frecvență (GHz)', placeholder: '', type: 'number', options: { min: 0.5, max: 6.0, step: 0.1 } },
    { key: 'gen', label: 'Generație', placeholder: '', type: 'select', options: ['', '6th', '7th', '8th', '9th', '10th', '11th', '12th', '13th', '14th', '15th'] },
    { key: 'socket', label: 'Socket', placeholder: '', type: 'select', options: ['', 'LGA 1700', 'LGA 1200', 'LGA 1151', 'AM5', 'AM4', 'BGA', 'Altele'] },
    { key: 'notes', label: 'Note', placeholder: 'ex. BGA, socketed, etc.', type: 'text' },
  ],
  ram: [
    { key: 'total', label: 'Total (GB)', placeholder: '', type: 'number', options: { min: 2, max: 128, step: 2 } },
    { key: 'type', label: 'Tip', placeholder: '', type: 'select', options: ['', 'DDR5 SO-DIMM', 'DDR4 SO-DIMM', 'DDR4 DIMM', 'DDR5 DIMM', 'LPDDR4X', 'LPDDR5X', 'Altele'] },
    { key: 'speed', label: 'Viteză (MHz)', placeholder: '', type: 'number', options: { min: 1600, max: 6400, step: 100 } },
    { key: 'part_number', label: 'Part Number / Serie', placeholder: 'ex. CT8G4SFRA266, KVR26S19S8/8', type: 'text' },
    { key: 'slots', label: 'Sloturi (ocupate/totale)', placeholder: 'ex. 2/2', type: 'text' },
    { key: 'config', label: 'Configurație', placeholder: 'ex. 2x8GB dual-channel', type: 'text' },
    { key: 'notes', label: 'Note', placeholder: '', type: 'text' },
  ],
  storage: [
    { key: 'drive1', label: 'Drive 1 (OS)', placeholder: 'ex. 512GB NVMe SSD', type: 'text' },
    { key: 'drive1_sn', label: 'Serie Drive 1', placeholder: 'ex. S4P7NF0R123456', type: 'text' },
    { key: 'drive1_type', label: 'Tip Drive 1', placeholder: '', type: 'select', options: ['', 'NVMe SSD', 'SATA SSD', 'HDD', 'eMMC', 'Altele'] },
    { key: 'drive2', label: 'Drive 2 (Data)', placeholder: 'ex. 1TB HDD / gol', type: 'text' },
    { key: 'drive2_sn', label: 'Serie Drive 2', placeholder: 'ex. WD-WCC123456789', type: 'text' },
    { key: 'drive2_type', label: 'Tip Drive 2', placeholder: '', type: 'select', options: ['', 'NVMe SSD', 'SATA SSD', 'HDD', 'eMMC', 'Altele', 'Gol'] },
    { key: 'slot_m2', label: 'Sloturi M.2', placeholder: 'ex. 2x M.2 2280', type: 'text' },
    { key: 'slot_sata', label: 'Sloturi SATA', placeholder: 'ex. 1x 2.5"', type: 'text' },
    { key: 'notes', label: 'Note', placeholder: '', type: 'text' },
  ],
  gpu: [
    { key: 'model', label: 'Model', placeholder: 'ex. Intel UHD 620 / NVIDIA MX150', type: 'text' },
    { key: 'part_number', label: 'Part Number / Serie', placeholder: 'ex. 900-1G123-2500-000', type: 'text' },
    { key: 'type', label: 'Tip', placeholder: '', type: 'select', options: ['', 'Integrat', 'Dedicat', 'Hybrid (Mux Switch)'] },
    { key: 'vram', label: 'VRAM', placeholder: 'ex. 2GB GDDR5 / Shared', type: 'text' },
    { key: 'output', label: 'Ieșiri video', placeholder: 'ex. HDMI, USB-C DP', type: 'text' },
    { key: 'notes', label: 'Note', placeholder: '', type: 'text' },
  ],
  display: [
    { key: 'size', label: 'Dimensiune (inch)', placeholder: '', type: 'number', options: { min: 10.0, max: 27.0, step: 0.1 } },
    { key: 'resolution', label: 'Rezoluție', placeholder: '', type: 'select', options: ['', '1366x768 HD', '1920x1080 FHD', '2560x1440 QHD', '3840x2160 4K', '2880x1800', '2560x1600', 'Altele'] },
    { key: 'panel', label: 'Panou', placeholder: '', type: 'select', options: ['', 'IPS 60Hz', 'IPS 120Hz', 'IPS 144Hz', 'IPS 165Hz', 'OLED 60Hz', 'OLED 90Hz', 'OLED 120Hz', 'TN', 'VA', 'Altele'] },
    { key: 'touch', label: 'Touchscreen', placeholder: '', type: 'select', options: ['', 'Da', 'Nu'] },
    { key: 'part_number', label: 'Part Number / Serie', placeholder: 'ex. LP156WF4-SPB1, B156HAN01.2', type: 'text' },
    { key: 'condition', label: 'Stare', placeholder: 'ex. Fără pixeli defecte, ușor uzușit', type: 'text' },
    { key: 'notes', label: 'Note', placeholder: '', type: 'text' },
  ],
  battery: [
    { key: 'capacity', label: 'Capacitate (Wh)', placeholder: '', type: 'number', options: { min: 20, max: 100, step: 1 } },
    { key: 'cells', label: 'Număr celule', placeholder: '', type: 'select', options: ['', '3 celule', '4 celule', '6 celule', 'Altele'] },
    { key: 'health', label: 'Stare sănătate (%)', placeholder: '', type: 'number', options: { min: 0, max: 100, step: 1 } },
    { key: 'cycles', label: 'Ciclu de încărcare', placeholder: '', type: 'number', options: { min: 0, max: 2000, step: 1 } },
    { key: 'runtime', label: 'Autonomie reală (h)', placeholder: '', type: 'number', options: { min: 0.5, max: 20.0, step: 0.5 } },
    { key: 'part_number', label: 'Part Number / Serie', placeholder: 'ex. L15C4PB0, SB10F46465', type: 'text' },
    { key: 'notes', label: 'Note', placeholder: 'ex. Se descarcă repede pe idle', type: 'text' },
  ],
  ports: [
    { key: 'usb_a', label: 'USB-A', placeholder: 'ex. 2x USB 3.1', type: 'text' },
    { key: 'usb_c', label: 'USB-C', placeholder: 'ex. 1x USB-C 3.1 (DP, PD)', type: 'text' },
    { key: 'hdmi', label: 'HDMI', placeholder: 'ex. 1x HDMI 1.4', type: 'text' },
    { key: 'audio', label: 'Audio', placeholder: 'ex. Combo jack 3.5mm', type: 'text' },
    { key: 'lan', label: 'LAN', placeholder: 'ex. GbE RJ45', type: 'text' },
    { key: 'other', label: 'Altele', placeholder: 'ex. SD card, Thunderbolt 3', type: 'text' },
    { key: 'wifi', label: 'WiFi / BT', placeholder: 'ex. Intel AC 8265, BT 4.2', type: 'text' },
    { key: 'notes', label: 'Note', placeholder: '', type: 'text' },
  ],
  os: [
    { key: 'name', label: 'Sistem operare', placeholder: 'ex. Windows 11 Pro 23H2', type: 'text' },
    { key: 'license', label: 'Licență', placeholder: '', type: 'select', options: ['', 'OEM', 'Retail', 'Digital', 'Volume', 'Altele'] },
    { key: 'product_key', label: 'Product Key / Licență', placeholder: 'ex. XXXXX-XXXXX-XXXXX-XXXXX-XXXXX', type: 'text' },
    { key: 'bitlocker', label: 'BitLocker', placeholder: '', type: 'select', options: ['', 'Activ', 'Inactiv', 'Nu se știe'] },
    { key: 'recovery', label: 'Recovery', placeholder: '', type: 'select', options: ['', 'Partition', 'USB', 'Cloud', 'Nu există'] },
    { key: 'notes', label: 'Note', placeholder: '', type: 'text' },
  ],
  chassis: [
    { key: 'material', label: 'Material', placeholder: '', type: 'select', options: ['', 'Aluminiu', 'Plastic', 'Magneziu', 'Compozit', 'Altele'] },
    { key: 'color', label: 'Culoare', placeholder: 'ex. Gri sideral', type: 'text' },
    { key: 'condition', label: 'Stare generală', placeholder: 'ex. Ușuri mici pe colțuri', type: 'text' },
    { key: 'hinges', label: 'Balamale', placeholder: '', type: 'select', options: ['', 'Strâmte', 'Ușor libere', 'Libere', 'Defecte'] },
    { key: 'weight', label: 'Greutate (kg)', placeholder: '', type: 'number', options: { min: 0.5, max: 5.0, step: 0.05 } },
    { key: 'serial', label: 'Serial / Service Tag', placeholder: 'ex. 5CD8451ABC, CND0123456', type: 'text' },
    { key: 'notes', label: 'Note', placeholder: '', type: 'text' },
  ],
  keyboard: [
    { key: 'layout', label: 'Layout', placeholder: '', type: 'select', options: ['', 'RO', 'US', 'UK', 'DE', 'FR', 'ES', 'IT', 'PT', 'Nordic', 'Altele'] },
    { key: 'backlight', label: 'Retroiluminare', placeholder: '', type: 'select', options: ['', 'Da (RGB)', 'Da (albă)', 'Nu'] },
    { key: 'condition', label: 'Stare', placeholder: '', type: 'select', options: ['', 'Perfectă', 'Ușor uzată', 'Taste lipse/blocate', 'Lichid'] },
    { key: 'language', label: 'Limba gravată', placeholder: '', type: 'select', options: ['', 'RO', 'US', 'US Intl', 'UK', 'DE', 'FR', 'ES', 'IT', 'Multilingv', 'Altele'] },
    { key: 'manufacturer', label: 'Producător', placeholder: 'ex. Lite-On, Sunrex, Chicony, Darfon', type: 'text' },
    { key: 'model', label: 'Model', placeholder: 'ex. SN2007B2A, KBD12345', type: 'text' },
    { key: 'pn', label: 'P/N (Part Number)', placeholder: 'ex. SG-B4091-XUA', type: 'text' },
    { key: 'oem_code', label: 'Cod OEM / FRU / DP/N / SPS', placeholder: 'ex. Dell DP/N: 0WF44R | Lenovo FRU: 5CB0X12345 | HP SPS: 918765-001 | Asus: KBXXXXXX', type: 'text' },
    { key: 'mounting', label: 'Tip montare', placeholder: '', type: 'select', options: ['', 'Cu ramă', 'Fără ramă (nituri plastic/palmrest)', 'Altele'] },
    { key: 'numpad', label: 'NumPad', placeholder: '', type: 'select', options: ['', 'Da', 'Nu'] },
    { key: 'compatibility', label: 'Compatibilitate', placeholder: 'ex. Compatibilă și cu DP/N WF44R', type: 'text' },
    { key: 'notes', label: 'Note', placeholder: 'ex. Touchpad inclus, tastatură retroiluminată', type: 'text' },
  ],
  other: [
    { key: 'notes', label: 'Note', placeholder: 'orice alte detalii...', type: 'text' },
  ],
};