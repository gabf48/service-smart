export type AdminTemplateArgs = {
  name: string;
  email: string;
  phone?: string;
  reason?: string;
  description: string;
  attachments?: string[];
};

export type AutoReplyArgs = {
  name: string;
  email: string;
  phone?: string;
  reason?: string;
  description: string;
  siteUrl: string;
};